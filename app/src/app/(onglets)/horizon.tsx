import { calculer, horizon, premierManque, reperes, soldesPasses, type Mouvement, type PointHorizon } from '@bankvi/moteur';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBasDEcran } from '@/composants/BasDEcran';
import { BoutonContour, BoutonPrincipal } from '@/composants/Boutons';
import { Segments } from '@/composants/Choix';
import { Avatar, BandeauEtat } from '@/composants/Contenu';
import { Courbe } from '@/composants/Courbe';
import { dateCourte, dateLongue, jourDansPhrase } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';
import { AUJOURDHUI, useParcours } from '@/parcours/store';
import { useEtat } from '@/registre/etat';
import { aVenir, iconeMouvement } from '@/registre/horizon';
import { ESSAIS_OFFERTS, useRegistre } from '@/registre/store';
import { motion, radius, size, space, type, useTheme } from '@/theme';

/** Le tracé de 300 ms n'a lieu qu'à la première ouverture du jour. */
let traceLe: string | null = null;

/** EC-23 Mon horizon : où en serai-je dans 3 jours, une semaine, un mois ? */
export default function Horizon() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const params = useLocalSearchParams<{ date?: string }>();
  const etat = useEtat();
  const parcours = useParcours();
  const pass = useRegistre((r) => r.pass);
  const essais = useRegistre((r) => r.essais);
  const prevusSaisis = useRegistre((r) => r.prevus);

  const [duree, setDuree] = useState<'30' | '90'>('30');
  const jours = duree === '90' && pass ? 90 : 30;
  const [tracer, setTracer] = useState(() => traceLe !== AUJOURDHUI);
  useEffect(() => {
    traceLe = AUJOURDHUI;
  }, []);

  const { points, rep, passe, calcul, manque } = useMemo(
    () => ({
      points: horizon(etat, jours).points,
      rep: reperes(etat),
      passe: soldesPasses(etat),
      calcul: calculer(etat),
      manque: premierManque(etat, jours),
    }),
    [etat, jours],
  );

  // Depuis la notification de découvert : le curseur s'ouvre sur la date concernée.
  const [curseur, setCurseur] = useState<number | null>(() => {
    if (!params.date) return null;
    const i = horizon(etat, 90).points.findIndex((p) => p.date === params.date);
    return i > 0 ? i : null;
  });
  const [hauteurBarre, setHauteurBarre] = useState<number>(size.actionBar);
  useBasDEcran(hauteurBarre + size.bottomNav);

  const choisirDuree = (d: '30' | '90') => {
    if (d === '90' && !pass) {
      router.push({ pathname: '/a-venir', params: { code: 'EC-41' } });
      return;
    }
    if (d === duree) return;
    setTracer(false);
    setDuree(d);
    if (curseur !== null && curseur > 30) setCurseur(null);
  };

  const ouvrirOrigine = (date: string) => router.push({ pathname: '/origine', params: { date } });

  const variable = parcours.typeRevenu === 'variable';
  const hypothese =
    calcul.manque !== undefined
      ? t('ec23.hypotheseManque')
      : variable
        ? t('ec23.hypotheseVariable', { montant: fcfa(parcours.montantRevenu ?? 0) })
        : t('ec23.hypothese');

  const liste = aVenir(points);
  const lecture = lectureCourbe(points, t);
  const essaisRestants = Math.max(0, ESSAIS_OFFERTS - essais);
  const simulationOuverte = pass || essaisRestants > 0;
  const hauteurCourbe = height < 600 ? 130 : height < 700 ? 150 : size.chartHeight;

  return (
    <View style={[styles.ecran, { backgroundColor: colors.bg.canvas, paddingTop: insets.top }]}>
      <View style={styles.barre}>
        <Text style={[type.appbar, { color: colors.text.primary }]} accessibilityRole="header">
          {t('ec23.titre')}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.contenu}>
        <Segments
          segments={[
            { valeur: '30', libelle: t('ec23.jours30') },
            { valeur: '90', libelle: t('ec23.jours90'), ...(pass ? {} : { mention: t('ec23.passPlus') }) },
          ]}
          valeur={jours === 90 ? '90' : '30'}
          onChoix={choisirDuree}
        />

        <View style={styles.reperes}>
          {([3, 7, 30] as const).map((n) => {
            const p = n === 3 ? rep.j3 : n === 7 ? rep.j7 : rep.j30;
            return (
              <Repere
                key={n}
                n={n}
                point={p}
                choisi={curseur === n}
                onPress={() => setCurseur((c) => (c === n ? null : n))}
                onLongPress={() => ouvrirOrigine(p.date)}
              />
            );
          })}
        </View>

        {manque ? (
          <View style={styles.bandeau}>
            <BandeauEtat variante="attention" texte={t('ec23.bandeau', { montant: fcfa(-manque.solde), jour: jourDansPhrase(manque.date, AUJOURDHUI) })} />
          </View>
        ) : null}

        <Text style={[type.subtitle, styles.titreGraphique, { color: colors.text.primary }]}>{t('ec23.graphique')}</Text>
        <Animated.View key={jours} entering={FadeIn.duration(motion.standard)}>
          <Courbe
            points={points}
            passe={passe}
            lecture={lecture}
            hauteur={hauteurCourbe}
            evenements
            curseur={curseur}
            onCurseur={setCurseur}
            onBulle={(i) => ouvrirOrigine(points[i]!.date)}
            tracer={tracer}
          />
        </Animated.View>
        <Text style={[type.caption, styles.hypothese, { color: colors.text.secondary }]}>{hypothese}</Text>

        <Text style={[type.captionMedium, styles.titreListe, { color: colors.text.secondary }]} accessibilityRole="header">
          {t('ec23.aVenir')}
        </Text>
        {liste.length === 0 ? (
          <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec23.aucun')}</Text>
        ) : (
          liste.map((m, k) => (
            <LigneEvenement
              key={`${m.id}@${m.date}`}
              m={m}
              icone={iconeMouvement(m, parcours.charges, prevusSaisis)}
              separateur={k < liste.length - 1}
              onPress={() => {
                const saisi = prevusSaisis.find((p) => p.prevu.id === m.id);
                if (saisi) router.push({ pathname: '/evenement', params: { id: m.id } });
                else router.push({ pathname: '/a-venir', params: { code: 'EC-39' } });
              }}
            />
          ))
        )}
      </ScrollView>

      {/* Barre d'action fixe : un seul bouton vert, et il fait une action réelle. */}
      <View
        onLayout={(e) => setHauteurBarre(Math.round(e.nativeEvent.layout.height))}
        style={[styles.barreAction, { backgroundColor: colors.bg.canvas, borderTopColor: colors.border.subtle }]}
      >
        <View style={styles.quarante}>
          {simulationOuverte ? (
            <BoutonContour libelle={t('ec23.evenement')} icone="add" onPress={() => router.push('/evenement')} />
          ) : (
            <BoutonPrincipal libelle={t('ec23.evenement')} icone="add" onPress={() => router.push('/evenement')} />
          )}
        </View>
        <View style={styles.soixante}>
          {simulationOuverte ? (
            <BoutonPrincipal libelle={t('ec23.puisJe')} onPress={() => router.push('/puis-je')} />
          ) : (
            <BoutonContour libelle={t('ec23.puisJe')} onPress={() => router.push('/puis-je')} />
          )}
          {!pass ? (
            <Text style={[type.caption, styles.mention, { color: colors.text.secondary }]}>
              {simulationOuverte ? t('ec23.essais', { count: essaisRestants }) : t('ec23.passPlus')}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

/** Repère gratuit : solde prévu à J+3, J+7, J+30. Jamais un nombre négatif seul. */
function Repere({ n, point, choisi, onPress, onLongPress }: { n: number; point: PointHorizon; choisi: boolean; onPress: () => void; onLongPress: () => void }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const negatif = point.solde < 0;
  const fond = negatif ? colors.status.warnBg : choisi ? colors.bg.selected : colors.bg.subtle;
  const fort = negatif ? colors.status.warnFg : choisi ? colors.text.onSelected : colors.text.primary;
  const doux = negatif ? colors.status.warnFg : choisi ? colors.text.onSelected : colors.text.secondary;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityState={{ selected: choisi }}
      accessibilityLabel={
        negatif
          ? t('ec23.lectureRepereManque', { n, date: dateLongue(point.date), montant: -point.solde })
          : t('ec23.lectureRepere', { n, date: dateLongue(point.date), montant: point.solde })
      }
      android_ripple={{ color: colors.action.ripple }}
      style={[styles.repere, { backgroundColor: fond }]}
    >
      <Text style={[type.captionMedium, { color: doux }]} numberOfLines={1}>
        {negatif ? t('ec23.manquerait') : t('ec23.dans', { count: n })}
      </Text>
      <Text style={[type.bodyStrong, styles.tabulaire, { color: fort }]} numberOfLines={1} adjustsFontSizeToFit>
        {nombre(Math.abs(point.solde))}
      </Text>
      <Text style={[type.caption, { color: doux }]} numberOfLines={1}>
        {t('ec23.unite', { date: dateCourte(point.date) })}
      </Text>
    </Pressable>
  );
}

function LigneEvenement({ m, icone, separateur, onPress }: { m: Mouvement; icone: Parameters<typeof Avatar>[0]['icone']; separateur: boolean; onPress: () => void }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const jour = jourDansPhrase(m.date, AUJOURDHUI);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('ec23.lectureLigne', { nom: m.nom, jour, signe: m.montant < 0 ? t('ec23.moins') : t('ec23.plus'), montant: Math.abs(m.montant) })}
      android_ripple={{ color: colors.action.ripple }}
      style={styles.ligne}
    >
      <Avatar {...(icone ? { icone } : {})} />
      <View style={[styles.ligneTexte, separateur ? { borderBottomWidth: 1, borderBottomColor: colors.border.subtle } : null]}>
        <Text style={styles.flex} numberOfLines={2}>
          <Text style={[type.bodyStrong, { color: colors.text.primary }]}>{m.nom}</Text>
          <Text style={[type.body, { color: colors.text.secondary }]}>{` · ${t('ec23.leJour', { jour })}`}</Text>
        </Text>
        <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>{`${m.montant > 0 ? '+' : ''}${fcfa(m.montant)}`}</Text>
      </View>
    </Pressable>
  );
}

/** « Ton argent prévu sur 30 jours. 90 000 francs aujourd'hui, 4 800 au plus bas le 27 novembre, … » */
function lectureCourbe(points: PointHorizon[], t: ReturnType<typeof useTranslation>['t']): string {
  if (points.length === 0) return '';
  let iBas = 0;
  points.forEach((p, i) => {
    if (p.solde < points[iBas]!.solde) iBas = i;
  });
  const iRevenu = points.findIndex((p) => p.mouvements.some((m) => m.montant > 0 && m.origine === 'revenu-regulier'));
  const revenu = iRevenu > 0 ? points[iRevenu]!.mouvements.find((m) => m.montant > 0) : undefined;
  const dernier = points[points.length - 1]!;
  return t('ec23.lectureCourbe', {
    jours: points.length - 1,
    debut: points[0]!.solde,
    bas: points[iBas]!.solde,
    dateBas: dateLongue(points[iBas]!.date),
    revenu: revenu ? t('ec23.lectureRevenu', { solde: points[iRevenu]!.solde, nom: revenu.nom.toLowerCase(), jour: jourDansPhrase(revenu.date, AUJOURDHUI) }) : '',
    fin: dernier.solde,
    dateFin: dateLongue(dernier.date),
  });
}

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  flex: { flex: 1 },
  barre: { height: size.appBar, justifyContent: 'center', paddingHorizontal: size.gutterList },
  contenu: { paddingHorizontal: size.gutterList, paddingBottom: space.s3 },
  reperes: { flexDirection: 'row', columnGap: space.s2, marginTop: space.s3, marginBottom: space.s4 },
  repere: { flex: 1, minHeight: 80, borderRadius: radius.md, padding: space.s2, justifyContent: 'space-between', overflow: 'hidden' },
  bandeau: { marginBottom: space.s3 },
  titreGraphique: { marginBottom: space.s2 },
  hypothese: { marginTop: space.s2, marginBottom: space.s4 },
  titreListe: { marginBottom: space.s2 },
  ligne: { minHeight: size.rowOne, flexDirection: 'row', alignItems: 'center', columnGap: space.s4 },
  ligneTexte: { flex: 1, minHeight: size.rowOne, flexDirection: 'row', alignItems: 'center', columnGap: space.s3 },
  tabulaire: { fontVariant: ['tabular-nums'] },
  barreAction: { flexDirection: 'row', columnGap: space.s2, paddingHorizontal: size.gutterList, paddingVertical: space.s2, borderTopWidth: 1 },
  quarante: { flex: 4 },
  soixante: { flex: 6 },
  mention: { textAlign: 'center', marginTop: space.s1 },
});
