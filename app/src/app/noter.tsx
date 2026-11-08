import { calculer, prevuProche, type Mouvement } from '@bankvi/moteur';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampCompact, ChampMontant, type RefSaisie } from '@/composants/Champs';
import { Puce } from '@/composants/Choix';
import { BandeauEtat } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { FeuilleCategorie, FeuilleDate, FeuillePoche } from '@/composants/Feuilles';
import { dateCourte, jourDansPhrase } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI, useParcours } from '@/parcours/store';
import { defaire, noter, remplacer, type Trace } from '@/registre/actions';
import { categorie, PAR_DEFAUT } from '@/registre/categories';
import { decaler, etatComplet, libelle, maintenant, minuteAvant, saisies, suggestions, useEtat, type Suggestion } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { radius, size, space, type, useTheme } from '@/theme';

type Sens = 'depense' | 'revenu';

/** EC-13 Ajout rapide : 2 taps avec une suggestion ; seul le montant est obligatoire. */
export default function Noter() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ retour?: string; date?: string }>();
  const depuisBilan = params.retour === 'bilan';
  const etat = useEtat();
  const registre = useRegistre();
  const refMontant = useRef<RefSaisie>(null);

  const derniere = saisies(registre.ecritures)[0];
  // Arrivée : une suggestion de confiance 0,7 à 0,95 est présélectionnée, sauf si un brouillon attend.
  const [depart] = useState(() => {
    const premiere = suggestions(registre.ecritures, registre.meta, 'depense', maintenant())[0];
    return registre.brouillon === null && premiere && premiere.confiance >= 0.7 ? premiere : null;
  });
  const [sens, setSens] = useState<Sens>('depense');
  const [montant, setMontant] = useState<number | null>(depart?.montant ?? registre.brouillon);
  const [cat, setCat] = useState<string>(depart?.categorie ?? PAR_DEFAUT.depense);
  const [poche, setPoche] = useState<string>(depart?.poche ?? derniere?.poche ?? 'especes');
  const [date, setDate] = useState<string>(params.date ?? AUJOURDHUI);
  const [description, setDescription] = useState(depart?.description ?? '');
  const [choisie, setChoisie] = useState<number | null>(depart ? 0 : null);
  const [feuille, setFeuille] = useState<'categorie' | 'poche' | 'date' | null>(null);
  const [serie, setSerie] = useState<{ count: number; total: number } | null>(depuisBilan ? { count: 0, total: 0 } : null);
  const [question, setQuestion] = useState<{ prevu: Mouvement; id: string; suite: () => void } | null>(null);

  const liste = useMemo(() => suggestions(registre.ecritures, registre.meta, sens, maintenant()), [registre.ecritures, registre.meta, sens]);

  const appliquer = (s: Suggestion, i: number) => {
    setMontant(s.montant);
    setCat(s.categorie);
    setPoche(s.poche);
    setDescription(s.description ?? '');
    setChoisie(i);
  };

  // Le montant reste en brouillon jusqu'à la fermeture de l'app.
  useEffect(() => () => useRegistre.getState().modifier({ brouillon: null }), []);
  const changerMontant = (v: number | null) => {
    setMontant(v);
    setChoisie(null);
    useRegistre.getState().modifier({ brouillon: v });
  };

  const changerSens = (s: Sens) => {
    if (s === sens) return;
    setSens(s);
    setCat(PAR_DEFAUT[s]);
    setChoisie(null);
    AccessibilityInfo.announceForAccessibility(s === 'depense' ? t('saisie.depense') : t('saisie.revenu'));
  };

  const futur = date > AUJOURDHUI;
  // Le comptage du premier lancement date d'aujourd'hui, 07:00 : toute date passée le précède.
  const avantComptage = date < AUJOURDHUI;
  const valide = montant !== null && montant > 0;
  const c = categorie(cat);
  const poches = etat.poches.map((p) => ({ id: p.id, nom: p.nom, solde: calculer(etat).soldes[p.id] ?? 0 }));
  const nomPoche = poches.find((p) => p.id === poche)?.nom ?? '';

  const enregistrer = (encore: boolean) => {
    if (!valide) return;
    const origine = choisie !== null ? 'suggestion' : 'toi';
    // Depuis le bilan, la dépense se place juste avant le comptage : le solde compté ne bouge pas, l'écart baisse.
    const bilan = useRegistre.getState().bilan;
    const at = depuisBilan && bilan && date === AUJOURDHUI ? minuteAvant(bilan.at) : undefined;
    const trace: Trace = noter({ sens, montant, categorie: cat, poche, description: description.trim() || undefined, dates: [date], origine, ...(at ? { at } : {}) });
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    useRegistre.getState().modifier({ brouillon: null });
    const apres = calculer(etatComplet(useParcours.getState(), useRegistre.getState()));
    AccessibilityInfo.announceForAccessibility(t(sens === 'depense' ? 'ec13.annonce' : 'ec13.annonceRevenu', { montant: apres.chiffre }));

    const suite = () => {
      if (encore || serie) {
        setSerie((s) => ({ count: (s?.count ?? 0) + 1, total: (s?.total ?? 0) + montant }));
        setMontant(null);
        setDescription('');
        setChoisie(null);
        refMontant.current?.focus();
      } else {
        router.back();
        annoncer(t(sens === 'depense' ? 'saisie.notee' : 'saisie.noteeRevenu'), () => defaire(trace));
      }
    };

    // Une saisie qui ressemble à une ligne prévue, même catégorie, à 7 jours près : on demande.
    const id = trace.ecritures[0];
    const proche = id && !futur ? prevuProche(etat, { type: sens, categorie: c?.nom.split(' ')[0] ?? cat, date }) : undefined;
    if (proche && id) setQuestion({ prevu: proche, id, suite });
    else suite();
  };

  const terminer = () => router.back();
  const choixDate = (d: string) => {
    setDate(d);
    setFeuille(null);
  };
  const raccourcis = [
    { d: AUJOURDHUI, l: t('ec13.aujourdhui') },
    { d: decaler(AUJOURDHUI, -1), l: t('ec13.hier') },
    { d: decaler(AUJOURDHUI, -2), l: t('ec13.avantHier') },
  ];
  const autre = !raccourcis.some((r) => r.d === date);

  return (
    <>
      <Ecran
        titre={t('ec13.titre')}
        fermer
        marge={size.gutterList}
        gauche={
          serie && serie.count > 0 ? (
            <View style={styles.terminer}>
              <BoutonTexte libelle={t('ec13.terminer')} onPress={terminer} />
            </View>
          ) : undefined
        }
        surPied={
          <>
            {serie && serie.count > 0 ? (
              <Text style={[type.body, styles.tabulaire, { color: colors.text.secondary }]} accessibilityLiveRegion="polite">
                {t(sens === 'depense' ? 'ec13.compteur' : 'ec13.compteurRevenu', { count: serie.count, montant: fcfa(serie.total) })}
              </Text>
            ) : null}
            {futur ? <BandeauEtat texte={t('ec13.prevu')} /> : avantComptage ? <BandeauEtat texte={t('ec13.avantComptage')} /> : null}
          </>
        }
        pied={
          <View style={styles.pied}>
            {!depuisBilan ? (
              <BoutonTexte libelle={t('ec13.ajouterAutre')} onPress={() => enregistrer(true)} />
            ) : null}
            <View style={styles.flex}>
              <BoutonPrincipal libelle={futur ? t('ec13.enregistrerPrevu') : t('ec13.enregistrer')} desactive={!valide} onPress={() => enregistrer(false)} />
            </View>
          </View>
        }
      >
        <View style={styles.choix} accessibilityRole="radiogroup">
          {(['depense', 'revenu'] as const).map((s) => (
            <Pressable
              key={s}
              onPress={() => changerSens(s)}
              accessibilityRole="radio"
              accessibilityState={{ checked: sens === s }}
              style={[
                styles.segment,
                sens === s ? { backgroundColor: colors.bg.selected } : { borderWidth: 1, borderColor: colors.border.control },
              ]}
            >
              {sens === s ? <Icone nom="check" couleur={colors.text.onSelected} taille={size.iconSmall} /> : null}
              <Text style={[type.bodyMedium, { color: sens === s ? colors.text.onSelected : colors.text.primary }]}>
                {s === 'depense' ? t('saisie.depense') : t('saisie.revenu')}
              </Text>
            </Pressable>
          ))}
        </View>

        <ChampMontant ref={refMontant} libelle={t('ec13.montant')} unite={t('commun.fcfa')} valeur={montant} onValeur={changerMontant} autoFocus />

        {/* Zone de hauteur fixe : rien ne bouge d'une saisie à l'autre. */}
        <View style={styles.zoneFixe}>
          {liste.length === 0 ? (
            <Text style={[type.caption, { color: colors.text.secondary }]}>{t('ec13.habitudes')}</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rangee} keyboardShouldPersistTaps="handled">
              {liste.map((s, i) => {
                const nom = s.description || categorie(s.categorie)?.nom || '';
                return (
                  <PuceLongue
                    key={`${s.categorie}-${s.montant}-${i}`}
                    libelle={t('ec13.suggestion', { libelle: nom, montant: nombre(s.montant) })}
                    lecture={t('ec13.lectureSuggestion', { libelle: nom, montant: s.montant })}
                    choisie={choisie === i}
                    onPress={() => appliquer(s, i)}
                    onLongPress={() => router.push({ pathname: '/a-venir', params: { code: 'EC-47' } })}
                  />
                );
              })}
            </ScrollView>
          )}
        </View>

        <View style={styles.rangeeFixe}>
          <PuceMenu libelle={c?.nom ?? ''} icone={c?.icone ?? 'receipt_long'} onPress={() => setFeuille('categorie')} />
          <PuceMenu libelle={nomPoche} icone={poche === 'especes' ? 'payments' : 'account_balance_wallet'} onPress={() => setFeuille('poche')} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rangee} style={styles.dates} keyboardShouldPersistTaps="handled">
          {raccourcis.map((r) => (
            <Puce key={r.d} role="radio" libelle={r.l} choisie={date === r.d} onPress={() => setDate(r.d)} />
          ))}
          {autre ? (
            <Puce role="radio" libelle={futur ? t('ec13.datePrevue', { date: dateCourte(date) }) : dateCourte(date)} choisie onPress={() => setFeuille('date')} />
          ) : null}
          <Puce libelle={t('ec13.autreDate')} onPress={() => setFeuille('date')} />
          <Puce
            libelle={t('ec13.plusieursDates')}
            onPress={() => {
              if (!valide) {
                refMontant.current?.focus();
                return;
              }
              router.push({
                pathname: '/plusieurs-dates',
                params: { sens, montant: String(montant), categorie: cat, poche, description: description.trim() },
              });
            }}
          />
        </ScrollView>

        <View style={styles.description}>
          <ChampCompact libelle={t('ec13.description')} value={description} onChangeText={setDescription} maxLength={40} returnKeyType="done" />
        </View>
      </Ecran>

      <FeuilleCategorie
        visible={feuille === 'categorie'}
        sens={sens}
        actuelle={cat}
        onFermer={() => setFeuille(null)}
        onChoix={(id) => {
          setCat(id);
          setFeuille(null);
        }}
      />
      <FeuillePoche
        visible={feuille === 'poche'}
        titre={t('ec13.poche')}
        poches={poches}
        actuelle={poche}
        onFermer={() => setFeuille(null)}
        onChoix={(id) => {
          setPoche(id);
          setFeuille(null);
        }}
      />
      <FeuilleDate visible={feuille === 'date'} date={date} onChoix={choixDate} onFermer={() => setFeuille(null)} />

      <FeuilleBasse
        visible={question !== null}
        titre={question ? t('ec13.cEstTon', { nom: question.prevu.nom.toLowerCase(), jour: jourDansPhrase(question.prevu.date, AUJOURDHUI) }) : ''}
        onFermer={() => {
          const q = question;
          setQuestion(null);
          q?.suite();
        }}
        pied={
          <View style={styles.boutonsQuestion}>
            <BoutonPrincipal
              libelle={t('ec13.oui')}
              onPress={() => {
                const q = question;
                if (!q) return;
                remplacer(q.id, { prevu: { id: q.prevu.id, date: q.prevu.date } });
                setQuestion(null);
                q.suite();
              }}
            />
            <BoutonTexte
              libelle={t('ec13.non')}
              onPress={() => {
                const q = question;
                setQuestion(null);
                q?.suite();
              }}
            />
          </View>
        }
      >
        <Text style={[type.body, { color: colors.text.secondary }]}>
          {question ? `${libelle({ categorie: cat })} · ${fcfa(Math.abs(question.prevu.montant))}` : ''}
        </Text>
      </FeuilleBasse>
    </>
  );
}

/** Puce avec chevron bas : elle ouvre un choix (catégorie, poche). */
function PuceMenu({ libelle, icone, onPress }: { libelle: string; icone: Parameters<typeof Icone>[0]['nom']; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={libelle}
      android_ripple={{ color: colors.action.ripple }}
      style={[styles.puce, { borderColor: colors.border.control }]}
    >
      <Icone nom={icone} couleur={colors.text.primary} taille={size.iconSmall} />
      <Text style={[type.bodyMedium, { color: colors.text.primary }]} numberOfLines={1}>
        {libelle}
      </Text>
      <Icone nom="arrow_drop_down" couleur={colors.text.secondary} taille={size.iconSmall} />
    </Pressable>
  );
}

/** Suggestion : puce qui accepte aussi l'appui long (EC-47 Pourquoi cette suggestion). */
function PuceLongue({ libelle, lecture, choisie, onPress, onLongPress }: { libelle: string; lecture: string; choisie: boolean; onPress: () => void; onLongPress: () => void }) {
  const { colors } = useTheme();
  const couleur = choisie ? colors.text.onSelected : colors.text.primary;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={lecture}
      accessibilityState={{ selected: choisie }}
      android_ripple={{ color: colors.action.ripple }}
      style={[styles.puce, choisie ? { backgroundColor: colors.bg.selected, borderColor: colors.bg.selected } : { borderColor: colors.border.control }]}
    >
      {choisie ? <Icone nom="check" couleur={couleur} taille={size.iconSmall} /> : null}
      <Text style={[type.bodyMedium, styles.tabulaire, { color: couleur }]}>{libelle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  choix: { flexDirection: 'row', columnGap: space.s2, marginBottom: space.s3 },
  segment: {
    height: 40,
    paddingHorizontal: space.s4,
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s2,
  },
  zoneFixe: { height: 48, justifyContent: 'center', marginTop: space.s2 },
  rangee: { columnGap: space.s2, alignItems: 'center' },
  rangeeFixe: { height: 48, flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  dates: { height: 48, flexGrow: 0 },
  puce: {
    height: size.chip,
    borderRadius: radius.full,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s2,
    paddingHorizontal: space.s3,
    overflow: 'hidden',
    maxWidth: 200,
  },
  description: { marginTop: space.s4 },
  pied: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  terminer: { marginLeft: space.s1 },
  boutonsQuestion: { rowGap: space.s1 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
