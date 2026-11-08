import { calculer, horizon, reperes, statutDuJour } from '@bankvi/moteur';
import { router } from 'expo-router';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBarreEtatClaire } from '@/composants/BarreEtatClaire';
import { Paysage } from '@/composants/Paysage';
import { jourDansPhrase } from '@/format/date';
import { nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI } from '@/parcours/store';
import { decaler, saisies, useEtat } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { artwork, size, space, type } from '@/theme';

const BLANC = artwork.text;
const DUREE = 5000;
const HERO_MAX = 64 / 48;

interface Fait {
  amorce: string;
  nombre: number;
  unite: string;
  detail: string;
  phrase?: string;
  icone?: 'warning';
}

/** EC-50 Mon statut : sa situation du jour comme un statut, quelques secondes, rien à remplir. */
export default function Statut() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const etat = useEtat();
  const ecritures = useRegistre((r) => r.ecritures);
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [lecteur, setLecteur] = useState(false);
  const appuiLong = useRef(false);
  useBarreEtatClaire();

  useEffect(() => {
    void AccessibilityInfo.isScreenReaderEnabled().then(setLecteur);
  }, []);

  const { faits, statut, soldes, phrase } = useMemo(() => {
    const calcul = calculer(etat);
    const s = statutDuJour(etat);
    const points = horizon(etat, 30).points;
    const jour = jourDansPhrase(calcul.reference, AUJOURDHUI);
    const phraseEtat = s.etat === 'suit' ? t('ec50.suit') : s.etat === 'resserre' ? t('ec50.resserre') : s.etat === 'serre' ? t('ec50.serre', { jour }) : '';
    const liste: Fait[] = [];
    // 1. Aujourd'hui, toujours.
    if (calcul.manque !== undefined) {
      liste.push({ amorce: t('ec50.manque'), nombre: calcul.manque, unite: t('commun.fcfa'), detail: t('ec50.manqueDetail', { jour }), icone: 'warning' });
    } else {
      liste.push({ amorce: t('ec50.aujourdhui'), nombre: calcul.chiffre, unite: t('commun.fcfa'), detail: t('ec50.jusqua', { jour }), phrase: phraseEtat });
    }
    // 2. À venir, toujours.
    const charge = points.flatMap((p) => p.mouvements).find((m) => m.montant < 0 && m.date > AUJOURDHUI);
    liste.push({
      amorce: t('ec50.dans7'),
      nombre: reperes(etat).j7.solde,
      unite: t('commun.fcfa'),
      detail: charge ? t('ec50.prochaineCharge', { nom: charge.nom, jour: jourDansPhrase(charge.date, AUJOURDHUI) }) : '',
    });
    // 3. Hier, s'il y a une saisie hier.
    const hier = decaler(AUJOURDHUI, -1);
    const depensesHier = saisies(ecritures).filter((e) => e.type === 'depense' && e.at.startsWith(hier));
    if (depensesHier.length > 0) {
      liste.push({
        amorce: t('ec50.hier'),
        nombre: depensesHier.reduce((x, e) => x + e.montant, 0),
        unite: t('commun.fcfa'),
        detail: t('ec50.depensesHier', { count: depensesHier.length }),
      });
    }
    // 4. Mes pots : seulement si une recette active a déjà reçu un revenu (pas encore possible ici).
    return { faits: liste, statut: s, soldes: points.map((p) => p.solde), phrase: phraseEtat || t('ec50.manque') };
  }, [etat, ecritures, t]);

  const fermer = () => {
    useRegistre.getState().modifier({ statutVu: true });
    router.back();
  };
  const suivant = () => (index + 1 >= faits.length ? fermer() : setIndex(index + 1));
  const precedent = () => setIndex(Math.max(0, index - 1));
  const fait = faits[index]!;

  return (
    <Animated.View entering={FadeIn.duration(300)} style={[styles.ecran, { backgroundColor: artwork.skies[statut.etat][0] }]}>
      <View style={StyleSheet.absoluteFill}>
        <Paysage
          largeur={width}
          hauteur={height}
          cadre="plein"
          soldes={soldes}
          progression={statut.soleil.ecoules / statut.soleil.total}
          etat={statut.etat}
          graine={Number(AUJOURDHUI.replaceAll('-', ''))}
          derive
        />
      </View>
      <Text style={styles.cache} accessibilityLabel={t('ec50.image', { phrase })} />

      {/* Zones de toucher : tiers gauche pour revenir, deux tiers droits pour avancer, appui long pour la pause. */}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <View style={styles.zones}>
          <Pressable
            style={styles.tiers}
            accessibilityRole="button"
            accessibilityLabel={t('ec50.precedent')}
            onPress={() => (appuiLong.current ? (appuiLong.current = false) : precedent())}
            onLongPress={() => {
              appuiLong.current = true;
              setPause(true);
            }}
            onPressOut={() => appuiLong.current && setPause(false)}
          />
          <Pressable
            style={styles.deuxTiers}
            accessibilityRole="button"
            accessibilityLabel={t('ec50.suivant')}
            onPress={() => (appuiLong.current ? (appuiLong.current = false) : suivant())}
            onLongPress={() => {
              appuiLong.current = true;
              setPause(true);
            }}
            onPressOut={() => appuiLong.current && setPause(false)}
          />
        </View>
      </View>

      <View style={[styles.haut, { paddingTop: insets.top + space.s3 }]} pointerEvents="box-none">
        <Segments key={index} n={faits.length} index={index} pause={pause || lecteur} onFin={suivant} />
        <View style={styles.outils}>
          <Pressable
            onPress={() => setPause(!pause)}
            accessibilityRole="button"
            accessibilityLabel={pause ? t('ec50.reprendre') : t('ec50.pause')}
            style={styles.outil}
          >
            <Icone nom={pause ? 'play_arrow' : 'pause'} couleur={BLANC} />
          </Pressable>
          <Pressable onPress={fermer} accessibilityRole="button" accessibilityLabel={t('ec50.fermer')} style={styles.outil}>
            <Icone nom="close" couleur={BLANC} />
          </Pressable>
        </View>
      </View>

      <View style={[styles.texte, { top: insets.top + 104 }]} pointerEvents="none" accessible accessibilityLiveRegion="polite">
        <View style={styles.ligne}>
          {fait.icone ? <Icone nom="warning" couleur={BLANC} /> : null}
          <Text style={[type.bodyLarge, { color: BLANC }]}>{fait.amorce}</Text>
        </View>
        <View style={styles.ligneChiffre}>
          <Text style={[type.hero, { color: BLANC }]} maxFontSizeMultiplier={HERO_MAX}>
            {nombre(fait.nombre)}
          </Text>
          <Text style={[type.subtitle, { color: BLANC }]}>{fait.unite}</Text>
        </View>
        {fait.detail ? <Text style={[type.bodyLarge, { color: BLANC }]}>{fait.detail}</Text> : null}
        {fait.phrase ? <Text style={[type.subtitle, styles.phrase, { color: BLANC }]}>{fait.phrase}</Text> : null}
      </View>

      <Text style={[type.caption, styles.aide, { color: BLANC, bottom: insets.bottom + space.s5 }]} pointerEvents="none">
        {t('ec50.aide')}
      </Text>
    </Animated.View>
  );
}

/** Segments du statut : le segment en cours se remplit en 5 s ; la pause l'arrête là où il est. */
const Segments = memo(function Segments({ n, index, pause, onFin }: { n: number; index: number; pause: boolean; onFin: () => void }) {
  // Recréé à chaque fait (clé = index) : la progression repart de zéro sans effet.
  const [progres, setProgres] = useState(0);
  const ecoule = useRef(0);
  const fin = useRef(onFin);
  useEffect(() => {
    fin.current = onFin;
  }, [onFin]);

  useEffect(() => {
    if (pause) return;
    let image = 0;
    let dernier = Date.now();
    const pas = () => {
      const maintenant = Date.now();
      ecoule.current += maintenant - dernier;
      dernier = maintenant;
      const p = Math.min(1, ecoule.current / DUREE);
      setProgres(p);
      if (p >= 1) fin.current();
      else image = requestAnimationFrame(pas);
    };
    image = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(image);
  }, [pause, index]);

  return (
    <View style={styles.segments} importantForAccessibility="no-hide-descendants">
      {Array.from({ length: n }, (_, i) => (
        <View key={i} style={styles.segment}>
          <View style={[styles.rempli, { width: `${(i < index ? 1 : i === index ? progres : 0) * 100}%` }]} />
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  zones: { flex: 1, flexDirection: 'row' },
  tiers: { flex: 1 },
  deuxTiers: { flex: 2 },
  haut: { position: 'absolute', left: 0, right: 0, paddingHorizontal: space.s3 },
  segments: { flexDirection: 'row', columnGap: space.s1 },
  segment: { flex: 1, height: 2, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.40)', overflow: 'hidden' },
  rempli: { height: 2, backgroundColor: artwork.text },
  outils: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: space.s1, marginRight: -space.s1 },
  outil: { width: size.touchMin, height: size.touchMin, alignItems: 'center', justifyContent: 'center' },
  texte: { position: 'absolute', left: space.s5, right: space.s5 },
  ligne: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  ligneChiffre: { flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', columnGap: space.s2 },
  phrase: { marginTop: space.s4 },
  aide: { position: 'absolute', left: space.s5, right: space.s5 },
  cache: { position: 'absolute', width: 1, height: 1, opacity: 0 },
});
