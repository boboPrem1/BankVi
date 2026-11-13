import { ecrituresActives } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { OngletsAujourdhui } from '@/composants/BarreOnglets';
import { useBasDEcran } from '@/composants/BasDEcran';
import { BoutonTexte } from '@/composants/Boutons';
import { moisDe, moisDecale } from '@/composants/Calendrier';
import { Puce } from '@/composants/Choix';
import { BulleSaisie, Repere } from '@/composants/Conversation';
import { FeuilleCategorie } from '@/composants/Feuilles';
import { dateLongueJour, heure, nomMois } from '@/format/date';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI, useParcours } from '@/parcours/store';
import { defaireRemplacement, remplacer } from '@/registre/actions';
import { categorie } from '@/registre/categories';
import { decaler, heureDe, libelle, pocheDansPhrase, useEtat } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

type Filtre = 'tout' | 'revenus' | 'depenses';

type Element =
  | { genre: 'saisie'; id: string; at: string; sens: 'depense' | 'revenu'; montant: number; categorie?: string; poche: string }
  | { genre: 'prevu'; id: string; at: string; sens: 'depense' | 'revenu'; montant: number; categorie: string; poche: string; nom: string }
  | { genre: 'comptage'; id: string; at: string; poche: string; montant: number }
  | { genre: 'transfert'; id: string; at: string; de: string; vers: string; montant: number; frais: number }
  | { genre: 'nonDetaille'; id: string; at: string; montant: number };

/** EC-17 Historique : faire le point sur son mois, et remonter la conversation. */
export default function Historique() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const parcours = useParcours();
  const registre = useRegistre();
  const etat = useEtat();
  const [mois, setMois] = useState(moisDe(AUJOURDHUI));
  const [filtre, setFiltre] = useState<Filtre>('tout');
  const [filtreCategorie, setFiltreCategorie] = useState<string | null>(null);
  const [toutesCategories, setToutesCategories] = useState(false);
  const [corriger, setCorriger] = useState<{ id: string; sens: 'depense' | 'revenu'; categorie?: string } | null>(null);
  const nomPoche = (id: string) => etat.poches.find((p) => p.id === id)?.nom ?? id;
  useBasDEcran(size.bottomNav);

  const elements = useMemo<Element[]>(() => {
    const liste: Element[] = [];
    for (const e of ecrituresActives(etat.ecritures)) {
      if (e.type === 'depense' || e.type === 'revenu') {
        liste.push({ genre: 'saisie', id: e.id, at: e.at, sens: e.type, montant: e.montant, poche: e.poche, ...(e.categorie ? { categorie: e.categorie } : {}) });
      } else if (e.type === 'comptage') liste.push({ genre: 'comptage', id: e.id, at: e.at, poche: e.poche, montant: e.montant });
      else if (e.type === 'transfert') liste.push({ genre: 'transfert', id: e.id, at: e.at, de: e.de, vers: e.vers, montant: e.montant, frais: e.frais });
    }
    for (const n of registre.nonDetailles) liste.push({ genre: 'nonDetaille', id: n.id, at: n.at, montant: n.montant });
    for (const p of registre.prevus) {
      if (p.prevu.rythme !== 'une-fois') continue;
      liste.push({ genre: 'prevu', id: p.prevu.id, at: `${p.prevu.date}T12:00`, sens: p.sens, montant: p.prevu.montant, categorie: p.categorie, poche: p.poche, nom: p.meta.description || categorie(p.categorie)?.nom || '' });
    }
    return liste.filter((x) => x.at.startsWith(mois)).sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0));
  }, [etat.ecritures, registre.nonDetailles, registre.prevus, mois]);

  // Résumé : le réel seulement ; prévus, comptages et transferts entre poches en sont exclus.
  const reels = elements.filter((x): x is Extract<Element, { genre: 'saisie' }> => x.genre === 'saisie');
  const recus = reels.filter((x) => x.sens === 'revenu').reduce((s, x) => s + x.montant, 0);
  const parCategorie = new Map<string, number>();
  for (const x of reels) if (x.sens === 'depense') parCategorie.set(x.categorie ?? 'autre', (parCategorie.get(x.categorie ?? 'autre') ?? 0) + x.montant);
  for (const x of elements) {
    if (x.genre === 'transfert' && x.frais > 0) parCategorie.set('frais', (parCategorie.get('frais') ?? 0) + x.frais);
    if (x.genre === 'nonDetaille') parCategorie.set('__nd', (parCategorie.get('__nd') ?? 0) + x.montant);
  }
  const depenses = [...parCategorie.values()].reduce((s, v) => s + v, 0);
  const lignes = [...parCategorie.entries()].sort((a, b) => b[1] - a[1]);
  const attendu = parcours.typeRevenu === 'regulier' ? parcours.montantRevenu ?? 0 : parcours.typeRevenu === 'variable' ? parcours.montantRevenu ?? 0 : 0;
  const nomCategorie = (id: string) => (id === '__nd' ? t('ec17.nonDetaille') : categorie(id)?.nom ?? id);

  const visibles = elements.filter((x) => {
    if (filtreCategorie) return (x.genre === 'saisie' || x.genre === 'prevu') && x.categorie === filtreCategorie;
    if (filtre === 'tout') return true;
    if (x.genre !== 'saisie' && x.genre !== 'prevu') return false;
    return filtre === 'revenus' ? x.sens === 'revenu' : x.sens === 'depense';
  });

  const jourRepere = (date: string) =>
    date === AUJOURDHUI ? t('ec17.aujourdhui') : date === decaler(AUJOURDHUI, -1) ? t('ec17.hier') : dateLongueJour(date);

  const contenu: React.ReactNode[] = [];
  let jourCourant = '';
  for (const x of visibles) {
    const jour = x.at.slice(0, 10);
    if (jour !== jourCourant) {
      jourCourant = jour;
      contenu.push(<Repere key={`j-${jour}`} texte={jourRepere(jour)} />);
    }
    const { h, m } = heureDe(x.at);
    if (x.genre === 'saisie') {
      const meta = registre.meta[x.id];
      const lib = libelle({ categorie: x.categorie }, meta);
      const valeurs = { libelle: lib, montant: fcfa(x.montant), heure: heure(h, m) };
      contenu.push(
        <BulleSaisie
          key={x.id}
          sens={x.sens}
          texte={t(x.sens === 'revenu' ? 'saisie.bulleRevenu' : 'saisie.bulle', valeurs)}
          sousLigne={`${nomPoche(x.poche)} · ${categorie(x.categorie)?.nom ?? ''}`}
          groupe={!!meta?.groupe}
          lecture={`${t(x.sens === 'revenu' ? 'saisie.lectureRevenu' : 'saisie.lectureDepense', { ...valeurs, montant: x.montant })}, ${nomPoche(x.poche)}, ${categorie(x.categorie)?.nom ?? ''}`}
          actionLongue={t('saisie.changerCategorie')}
          onPress={() => router.push({ pathname: '/saisie/[id]', params: { id: x.id } })}
          onLongPress={() => setCorriger({ id: x.id, sens: x.sens, ...(x.categorie ? { categorie: x.categorie } : {}) })}
        />,
      );
    } else if (x.genre === 'prevu') {
      contenu.push(
        <BulleSaisie
          key={x.id}
          sens={x.sens}
          prevu
          texte={`${x.nom} · ${x.sens === 'depense' ? '−' : '+'}${fcfa(x.montant)} · ${t('saisie.prevu')}`}
          lecture={`${t('saisie.prevu')} : ${x.nom}, ${x.montant} francs CFA`}
          onPress={() => router.push({ pathname: '/saisie/[id]', params: { id: x.id } })}
        />,
      );
    } else if (x.genre === 'comptage') {
      contenu.push(
        <Repere key={x.id} texte={t('saisie.comptage', { montant: fcfa(x.montant), poche: pocheDansPhrase(x.poche, nomPoche(x.poche)) })} onPress={() => router.push({ pathname: '/saisie/[id]', params: { id: x.id } })} />,
      );
    } else if (x.genre === 'transfert') {
      contenu.push(
        <Repere
          key={x.id}
          icone="swap_vert"
          texte={t('saisie.transfert', { de: nomPoche(x.de), vers: nomPoche(x.vers), montant: fcfa(x.montant) })}
          onPress={() => router.push({ pathname: '/saisie/[id]', params: { id: x.id } })}
        />,
      );
    } else {
      contenu.push(<Repere key={x.id} texte={t('saisie.nonDetaille', { montant: fcfa(x.montant) })} onPress={() => router.push({ pathname: '/saisie/[id]', params: { id: x.id } })} />);
    }
  }

  const precedent = mois > moisDecale(moisDe(AUJOURDHUI), -12);
  const suivant = mois < moisDe(AUJOURDHUI);

  return (
    <View style={[styles.ecran, { backgroundColor: colors.bg.canvas, paddingTop: insets.top }]}>
      <View style={styles.barre}>
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel={t('commun.retour')} style={styles.icone}>
          <Icone nom="arrow_back" couleur={colors.text.primary} />
        </Pressable>
        <Text style={[type.appbar, { color: colors.text.primary }]} accessibilityRole="header">
          {t('ec17.titre')}
        </Text>
      </View>
      <ScrollView stickyHeaderIndices={[1]} contentContainerStyle={styles.defile}>
        <View style={styles.marges}>
          <View style={styles.mois}>
            <Pressable onPress={() => setMois(moisDecale(mois, -1))} disabled={!precedent} accessibilityRole="button" accessibilityLabel={t('calendrier.precedent')} style={styles.icone}>
              <Icone nom="chevron_left" couleur={precedent ? colors.text.primary : colors.text.disabled} />
            </Pressable>
            <Text style={[type.subtitle, styles.nomMois, { color: colors.text.primary }]}>{nomMois(mois)}</Text>
            <Pressable onPress={() => setMois(moisDecale(mois, 1))} disabled={!suivant} accessibilityRole="button" accessibilityLabel={t('calendrier.suivant')} style={styles.icone}>
              <Icone nom="chevron_right" couleur={suivant ? colors.text.primary : colors.text.disabled} />
            </Pressable>
          </View>
          {filtre !== 'depenses' ? (
            <LigneResume
              nom={t('ec17.revenus')}
              valeur={
                attendu > 0 && mois === moisDe(AUJOURDHUI)
                  ? t(parcours.typeRevenu === 'variable' ? 'ec17.revenusAuMoins' : 'ec17.revenusSur', { recu: fcfa(recus), attendu: fcfa(attendu) })
                  : fcfa(recus)
              }
            />
          ) : null}
          {filtre !== 'revenus' ? (
            <>
              <LigneResume nom={t('ec17.depenses')} valeur={fcfa(depenses)} />
              {(toutesCategories ? lignes : lignes.slice(0, 5)).map(([id, v]) => (
                <Pressable
                  key={id}
                  onPress={() => id !== '__nd' && setFiltreCategorie(id)}
                  accessibilityRole="button"
                  style={styles.ligneCategorie}
                >
                  <Text style={[type.body, { color: colors.text.primary }]}>{nomCategorie(id)}</Text>
                  <Text style={[type.body, styles.tabulaire, { color: colors.text.primary }]}>{fcfa(v)}</Text>
                </Pressable>
              ))}
              {lignes.length > 5 && !toutesCategories ? (
                <View style={styles.toutVoir}>
                  <BoutonTexte libelle={t('ec17.toutVoir')} onPress={() => setToutesCategories(true)} />
                </View>
              ) : null}
            </>
          ) : null}
        </View>

        {/* Filtre accroché sous la barre du haut. */}
        <View style={{ backgroundColor: colors.bg.canvas }}>
        <View style={styles.filtre} accessibilityRole="radiogroup">
          {(['tout', 'revenus', 'depenses'] as const).map((f) => (
            <Puce
              key={f}
              role="radio"
              libelle={t(`ec17.${f}`)}
              choisie={filtre === f && !filtreCategorie}
              onPress={() => {
                setFiltre(f);
                setFiltreCategorie(null);
              }}
            />
          ))}
          {filtreCategorie ? (
            <Pressable
              onPress={() => setFiltreCategorie(null)}
              accessibilityRole="button"
              accessibilityLabel={t('ec17.retirerFiltre', { nom: nomCategorie(filtreCategorie) })}
              style={[styles.puceFiltre, { backgroundColor: colors.bg.selected }]}
            >
              <Text style={[type.bodyMedium, { color: colors.text.onSelected }]}>{nomCategorie(filtreCategorie)}</Text>
              <Icone nom="close" couleur={colors.text.onSelected} taille={size.iconSmall} />
            </Pressable>
          ) : null}
        </View>
        </View>

        <View style={[styles.marges, styles.conversation]}>
          <Text style={styles.cache} accessibilityLiveRegion="polite">
            {t('ec17.resultats', { count: visibles.length })}
          </Text>
          {elements.length === 0 ? (
            <Text style={[type.body, { color: colors.text.secondary }]}>{mois === moisDe(AUJOURDHUI) ? t('ec17.vide') : t('ec17.moisVide')}</Text>
          ) : (
            contenu
          )}
        </View>
      </ScrollView>

      <FeuilleCategorie
        visible={corriger !== null}
        sens={corriger?.sens ?? 'depense'}
        actuelle={corriger?.categorie}
        onFermer={() => setCorriger(null)}
        onChoix={(id) => {
          if (!corriger) return;
          const ancienne = corriger.id;
          const nouvelle = remplacer(ancienne, { categorie: id });
          setCorriger(null);
          if (nouvelle) annoncer(t('saisie.corrigee'), () => defaireRemplacement(ancienne, nouvelle));
        }}
      />
      <OngletsAujourdhui />
    </View>
  );
}

function LigneResume({ nom, valeur }: { nom: string; valeur: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.ligneResume}>
      <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{nom}</Text>
      <Text style={[type.bodyLarge, styles.tabulaire, styles.valeur, { color: colors.text.primary }]}>{valeur}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  barre: { height: size.appBar, flexDirection: 'row', alignItems: 'center', paddingLeft: space.s1, columnGap: space.s1 },
  icone: { width: size.touchMin, height: size.touchMin, alignItems: 'center', justifyContent: 'center' },
  defile: { paddingBottom: space.s5 },
  marges: { paddingHorizontal: size.gutterList },
  mois: { height: 48, flexDirection: 'row', alignItems: 'center', marginBottom: space.s2 },
  nomMois: { flex: 1, textAlign: 'center' },
  ligneResume: { minHeight: 24, flexDirection: 'row', justifyContent: 'space-between', columnGap: space.s2, flexWrap: 'wrap', marginBottom: space.s1 },
  valeur: { flexShrink: 1, textAlign: 'right' },
  ligneCategorie: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toutVoir: { alignItems: 'flex-start', marginLeft: -space.s3 },
  filtre: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: space.s2, paddingHorizontal: size.gutterList, paddingVertical: space.s2 },
  puceFiltre: { height: size.chip, borderRadius: 9999, flexDirection: 'row', alignItems: 'center', columnGap: space.s2, paddingHorizontal: space.s3 },
  conversation: { rowGap: space.s2, paddingTop: space.s2 },
  tabulaire: { fontVariant: ['tabular-nums'] },
  cache: { position: 'absolute', width: 1, height: 1, opacity: 0 },
});
