import { calculer, cycleDe, premierManque, type Etat, type Prevu } from '@bankvi/moteur';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonDestructif, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampCompact, ChampMontant, type RefSaisie } from '@/composants/Champs';
import { Puce, RangeePuces, Segments } from '@/composants/Choix';
import { Ecran } from '@/composants/Ecran';
import { FeuilleDate } from '@/composants/Feuilles';
import { dateLongueJour, jourDansPhrase } from '@/format/date';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI } from '@/parcours/store';
import { useEtat } from '@/registre/etat';
import { nouvelId, useRegistre, type PrevuSaisi } from '@/registre/store';
import { motion, size, space, type, useTheme } from '@/theme';

type Sens = 'sortie' | 'entree';
type Rythme = 'une-fois' | 'semaine' | '2-semaines' | 'mensuel';

/** Puces des événements courants, et la catégorie qui donne leur icône. */
const PUCES: Record<Sens, { cle: string; categorie: string }[]> = {
  sortie: [
    { cle: 'tontine', categorie: 'tontine' },
    { cle: 'ecole', categorie: 'ecole' },
    { cle: 'mariage', categorie: 'famille' },
    { cle: 'fete', categorie: 'sorties' },
    { cle: 'sante', categorie: 'sante' },
  ],
  entree: [
    { cle: 'salaire', categorie: 'salaire' },
    { cle: 'vente', categorie: 'vente' },
    { cle: 'pret', categorie: 'pret-rendu' },
    { cle: 'tontineRecue', categorie: 'autre-revenu' },
  ],
};
const PAR_DEFAUT: Record<Sens, string> = { sortie: 'imprevus', entree: 'autre-revenu' };
const RYTHMES: { valeur: Rythme; cle: 'uneFois' | 'semaine' | 'deuxSemaines' | 'mois' }[] = [
  { valeur: 'une-fois', cle: 'uneFois' },
  { valeur: 'semaine', cle: 'semaine' },
  { valeur: '2-semaines', cle: 'deuxSemaines' },
  { valeur: 'mensuel', cle: 'mois' },
];

function versPrevu(id: string, f: { nom: string; montant: number; sens: Sens; date: string; rythme: Rythme }): Prevu {
  const base = { id, nom: f.nom, montant: f.montant, sens: f.sens };
  if (f.rythme === 'mensuel') return { ...base, rythme: 'mensuel', jour: Number(f.date.slice(8, 10)), depuis: f.date };
  return { ...base, rythme: f.rythme, date: f.date };
}

function dateDe(p: Prevu): string {
  return p.rythme === 'mensuel' ? (p.depuis ?? AUJOURDHUI) : p.date;
}

/** EC-26 Événement à venir : ce que l'app ne peut pas deviner. Une ligne prévue, jamais du réel. */
export default function Evenement() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const etat = useEtat();
  const refMontant = useRef<RefSaisie>(null);

  const existant = useRegistre.getState().prevus.find((p) => p.prevu.id === id);
  const [sens, setSens] = useState<Sens>(existant?.prevu.sens ?? 'sortie');
  const [nom, setNom] = useState(existant?.prevu.nom ?? '');
  const [montant, setMontant] = useState<number | null>(existant?.prevu.montant ?? null);
  const [date, setDate] = useState<string | null>(existant ? dateDe(existant.prevu) : null);
  const [rythme, setRythme] = useState<Rythme>(existant?.prevu.rythme === 'trimestre' ? 'une-fois' : (existant?.prevu.rythme ?? 'une-fois'));
  const [cat, setCat] = useState(existant?.categorie ?? PAR_DEFAUT.sortie);
  const [feuille, setFeuille] = useState(false);

  const passee = date !== null && date < AUJOURDHUI;
  const complet = nom.trim().length > 0 && montant !== null && montant >= 1 && date !== null && !passee;

  // Sans l'événement modifié : l'effet se lit par rapport à ce qui existe sans lui.
  const sansLui: Etat = useMemo(() => (existant ? { ...etat, prevus: etat.prevus.filter((p) => p.id !== existant.prevu.id) } : etat), [etat, existant]);

  const effet = useMemo(() => {
    if (!complet || montant === null || date === null) return null;
    const prevu = versPrevu('__evenement', { nom: nom.trim(), montant, sens, date, rythme });
    const copie: Etat = { ...sansLui, prevus: [...sansLui.prevus, prevu] };
    const avant = calculer(sansLui);
    const apres = calculer(copie);
    const manque = premierManque(copie);
    const manqueAvant = premierManque(sansLui);
    if (manque && (!manqueAvant || manque.date !== manqueAvant.date || manque.solde !== manqueAvant.solde)) {
      return { texte: t('ec26.manque', { montant: fcfa(-manque.solde), jour: jourDansPhrase(manque.date, AUJOURDHUI) }), manque: true };
    }
    if (date >= cycleDe(sansLui, AUJOURDHUI).debutSuivant && apres.chiffre === avant.chiffre) {
      return { texte: t('ec26.inchange', { jour: jourDansPhrase(avant.reference, AUJOURDHUI) }), manque: false };
    }
    return { texte: t('ec26.passerait', { montant: fcfa(apres.chiffre) }), manque: false };
  }, [complet, nom, montant, sens, date, rythme, sansLui, t]);

  const changerSens = (s: Sens) => {
    if (s === sens) return;
    setSens(s);
    // Le signe et les puces changent ; le nom, le montant et la date restent.
    if (!PUCES[s].some((p) => p.categorie === cat)) setCat(PAR_DEFAUT[s]);
  };

  const choisirPuce = (p: { cle: string; categorie: string }) => {
    setNom(t(`ec26.puces.${p.cle}` as 'ec26.puces.tontine'));
    setCat(p.categorie);
    refMontant.current?.focus();
  };

  const enregistrer = () => {
    if (!complet || montant === null || date === null) return;
    const reg = useRegistre.getState();
    const saisi: PrevuSaisi = {
      prevu: versPrevu(existant?.prevu.id ?? nouvelId('p'), { nom: nom.trim(), montant, sens, date, rythme }),
      sens: sens === 'sortie' ? 'depense' : 'revenu',
      categorie: cat,
      poche: existant?.poche ?? 'especes',
      meta: { ...(existant?.meta ?? { origine: 'toi' }), description: nom.trim() },
    };
    const avant = reg.prevus;
    reg.modifier({ prevus: existant ? avant.map((p) => (p.prevu.id === existant.prevu.id ? saisi : p)) : [...avant, saisi] });
    router.back();
    annoncer(t(existant ? 'ec26.modifie' : 'ec26.ajoute'), () => useRegistre.getState().modifier({ prevus: avant }));
  };

  const supprimer = () => {
    if (!existant) return;
    const reg = useRegistre.getState();
    const avant = reg.prevus;
    reg.modifier({ prevus: avant.filter((p) => p.prevu.id !== existant.prevu.id) });
    router.back();
    annoncer(t('ec26.supprime'), () => useRegistre.getState().modifier({ prevus: avant }));
  };

  return (
    <>
      <Ecran
        titre={existant ? t('ec26.titreModifier') : t('ec26.titre')}
        pied={
          <>
            <BoutonPrincipal libelle={existant ? t('ec26.enregistrer') : t('ec26.ajouter')} desactive={!complet} onPress={enregistrer} />
            {existant ? <BoutonDestructif libelle={t('ec26.supprimer')} onPress={supprimer} /> : null}
          </>
        }
      >
        <Segments
          segments={[
            { valeur: 'sortie', libelle: t('ec26.sortie') },
            { valeur: 'entree', libelle: t('ec26.entree') },
          ]}
          valeur={sens}
          onChoix={changerSens}
        />
        <View style={styles.puces}>
          <RangeePuces>
            {PUCES[sens].map((p) => (
              <Puce key={p.cle} libelle={t(`ec26.puces.${p.cle}` as 'ec26.puces.tontine')} onPress={() => choisirPuce(p)} />
            ))}
          </RangeePuces>
        </View>

        <ChampCompact libelle={t('ec26.nom')} value={nom} onChangeText={setNom} maxLength={30} returnKeyType="next" onSubmitEditing={() => refMontant.current?.focus()} />
        <View style={styles.champ}>
          <ChampMontant ref={refMontant} libelle={t('ec26.montant')} unite={t('commun.fcfa')} valeur={montant} onValeur={setMontant} />
        </View>

        <View style={styles.champ}>
          <Text style={[type.bodyMedium, { color: colors.text.secondary }]}>{t('ec26.date')}</Text>
          <Pressable
            onPress={() => setFeuille(true)}
            accessibilityRole="button"
            accessibilityLabel={t('ec26.lectureDate', { date: date ? dateLongueJour(date) : t('ec26.choisirDate') })}
            android_ripple={{ color: colors.action.ripple }}
            style={[styles.date, { borderBottomColor: passee ? colors.status.errorFg : colors.border.control }]}
          >
            <Icone nom="calendar_month" couleur={colors.text.secondary} />
            <Text style={[type.bodyLarge, styles.flex, { color: date ? colors.text.primary : colors.text.tertiary }]}>{date ? dateLongueJour(date) : t('ec26.choisirDate')}</Text>
            <Icone nom="chevron_right" couleur={colors.text.secondary} taille={size.iconSmall} />
          </Pressable>
          {passee ? (
            <View>
              <Text style={[type.body, styles.erreur, { color: colors.status.errorFg }]} accessibilityLiveRegion="assertive">
                {t('ec26.passee')}
              </Text>
              <View style={styles.lien}>
                <BoutonTexte libelle={t('ec26.noterSaisie')} onPress={() => router.replace({ pathname: '/noter', params: { date: date ?? AUJOURDHUI } })} />
              </View>
            </View>
          ) : null}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rythmes} style={styles.rangeeRythmes} accessibilityLabel={t('ec26.rythme')}>
          {RYTHMES.map((r) => (
            <Puce key={r.valeur} role="radio" libelle={t(`ec26.${r.cle}`)} choisie={rythme === r.valeur} onPress={() => setRythme(r.valeur)} />
          ))}
        </ScrollView>

        {effet ? (
          <Animated.View key={effet.texte} entering={FadeIn.duration(motion.standard)} style={styles.effet} accessibilityLiveRegion="polite">
            {effet.manque ? <Icone nom="warning" couleur={colors.status.warnFg} taille={size.iconSmall} /> : null}
            <Text style={[type.bodyLarge, styles.flex, styles.tabulaire, { color: effet.manque ? colors.status.warnFg : colors.text.primary }]}>{effet.texte}</Text>
          </Animated.View>
        ) : null}
      </Ecran>
      <FeuilleDate
        visible={feuille}
        date={date ?? AUJOURDHUI}
        onChoix={(d) => {
          setDate(d);
          setFeuille(false);
        }}
        onFermer={() => setFeuille(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  puces: { marginTop: space.s3, marginBottom: space.s4 },
  champ: { marginTop: space.s3 },
  date: { minHeight: size.compactField, flexDirection: 'row', alignItems: 'center', columnGap: space.s2, borderBottomWidth: 1 },
  erreur: { marginTop: space.s1 },
  lien: { alignSelf: 'flex-start', marginLeft: -space.s3 },
  rangeeRythmes: { flexGrow: 0, marginTop: space.s2, marginHorizontal: -size.gutterOnboarding },
  rythmes: { columnGap: space.s2, alignItems: 'center', height: 48, paddingHorizontal: size.gutterOnboarding },
  effet: { flexDirection: 'row', alignItems: 'flex-start', columnGap: space.s2, marginTop: space.s3 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
