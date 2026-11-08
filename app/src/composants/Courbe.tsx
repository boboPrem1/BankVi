import type { PointHorizon } from '@bankvi/moteur';
import { useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { G, Line, Path, Polyline, Rect, Circle, Text as SvgText } from 'react-native-svg';

import { pasRond } from '@/format/axe';
import { dateCourte } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';
import { motion, radius, size, space, type, useTheme } from '@/theme';

interface Props {
  /** Le prévu, à partir d'aujourd'hui : en pointillés. */
  points: PointHorizon[];
  /** Phrase lue par TalkBack : le graphique entier en une phrase. */
  lecture: string;
  hauteur?: number;
  /** Première ligne de l'info-bulle (« Exemple » sur EC-02). */
  enTete?: string;
  /** Le réel des derniers jours, à gauche d'aujourd'hui : trait plein (EC-23). */
  passe?: { date: string; solde: number }[];
  /** Un point de 8 dp sur la courbe par jour qui porte un événement (EC-23). */
  evenements?: boolean;
  /** Deuxième série, en trait plein gris, sous le prévu (EC-25 « Sans cet achat »). */
  comparaison?: { points: PointHorizon[]; nom: string; nomPrevu: string };
  /**
   * Curseur piloté par l'écran : index dans `points`, ou null. Fourni, le curseur reste
   * après le glissement et l'info-bulle se touche (EC-23).
   */
  curseur?: number | null;
  onCurseur?: (i: number | null) => void;
  onBulle?: (i: number) => void;
  /** Tracé de 300 ms à l'arrivée ; faux pour un simple changement de durée. */
  tracer?: boolean;
}

const MARGE_HAUT = 20;
// 36 dp sous la zone : l'étiquette du point bas (souvent près de zéro), puis les dates.
const MARGE_BAS = 36;
const LARGEUR_BULLE = 184;

/**
 * Courbe de l'horizon (design system, graphiques) : le prévu en pointillés, par paliers
 * quotidiens sans lissage, le réel en trait plein, axe vertical à droite, trois étiquettes au plus.
 */
export function Courbe({ points, lecture, hauteur = size.chartHeight, enTete, passe = [], evenements, comparaison, curseur, onCurseur, onBulle, tracer = true }: Props) {
  const { colors } = useTheme();
  const [largeur, setLargeur] = useState(0);
  const [toucheLibre, setToucheLibre] = useState<number | null>(null);
  const [trace, setTrace] = useState(tracer ? 0 : 1);

  const pilote = onCurseur !== undefined;
  const touche = pilote ? (curseur ?? null) : toucheLibre;
  const changerTouche = (i: number | null) => (onCurseur ? onCurseur(i) : setToucheLibre(i));

  const d0 = passe.length;
  const total = d0 + points.length;
  const soldes = [...passe.map((p) => p.solde), ...points.map((p) => p.solde), ...(comparaison?.points.map((p) => p.solde) ?? [])];
  const max = Math.max(...soldes, 0);
  const min = Math.min(...soldes, 0);
  const pas = pasRond(max - min);
  const demi = pas / 2;
  const haut = Math.ceil((max * 1.02) / demi) * demi || pas;
  const bas = min < 0 ? Math.floor(min / demi) * demi : 0;
  const graduations: number[] = [];
  for (let v = Math.ceil(bas / pas) * pas; v <= haut; v += pas) graduations.push(v);

  // L'axe vertical, à droite, prend la largeur de son plus long libellé (12 sp, environ 7 dp par signe).
  const largeurAxe = Math.max(40, Math.max(...graduations.map((v) => nombre(v).length)) * 7 + 10);
  const zoneL = Math.max(0, largeur - largeurAxe);
  const zoneH = hauteur - MARGE_HAUT - MARGE_BAS;
  /** Abscisse d'un index global : le passé d'abord, puis le prévu. */
  const x = (k: number) => (total > 1 ? (k * zoneL) / (total - 1) : 0);
  const xp = (i: number) => x(d0 + i);
  const y = (v: number) => MARGE_HAUT + ((haut - v) * zoneH) / (haut - bas || 1);

  // Le tracé dévoile les jours un à un pendant l'animation (un masque SVG ne s'applique pas ici).
  const visibles = points.slice(0, Math.max(2, Math.ceil(trace * (points.length - 1)) + 1));
  const ligne = visibles.map((p, i) => `${xp(i)},${y(p.solde)}`).join(' ');
  const ligneSans = comparaison?.points.map((p, i) => `${xp(i)},${y(p.solde)}`).join(' ');
  // Le réel rejoint aujourd'hui en trait plein.
  const lignePasse = d0 > 0 ? [...passe.map((p, k) => `${x(k)},${y(p.solde)}`), `${xp(0)},${y(points[0]?.solde ?? 0)}`].join(' ') : '';
  const base = y(Math.max(bas, 0));
  const aire = `M${xp(0)},${base} ${visibles.map((p, i) => `L${xp(i)},${y(p.solde)}`).join(' ')} L${xp(visibles.length - 1)},${base} Z`;

  // Étiquettes directes : le départ, le point le plus bas, le premier revenu.
  const etiquettes = useMemo(() => {
    const e: { i: number; texte: string; dessous?: boolean }[] = [];
    if (points.length === 0) return e;
    e.push({ i: 0, texte: nombre(points[0]!.solde) });
    let iBas = 0;
    points.forEach((p, i) => {
      if (p.solde < points[iBas]!.solde) iBas = i;
    });
    const iRevenu = points.findIndex((p) => p.mouvements.some((m) => m.montant > 0 && m.origine === 'revenu-regulier'));
    // Sous le point, au-dessus des dates : le trait monte ou descend de part et d'autre du point bas.
    const place = y(points[iBas]!.solde) + 16 <= hauteur - 20;
    if (iBas > 0) e.push({ i: iBas, texte: nombre(points[iBas]!.solde), dessous: place });
    if (iRevenu > 0) {
      const revenu = points[iRevenu]!.mouvements.find((m) => m.montant > 0)!;
      e.push({ i: iRevenu, texte: `+${nombre(revenu.montant)}` });
    }
    // Si deux étiquettes se chevauchent, on garde le point le plus bas.
    const ty = (a: (typeof e)[number]) => (a.dessous ? y(points[a.i]!.solde) + 16 : y(points[a.i]!.solde) - 8);
    const chevauche = (a: (typeof e)[number], b: (typeof e)[number]) => Math.abs(xp(a.i) - xp(b.i)) < 64 && Math.abs(ty(a) - ty(b)) < 16;
    return e.filter((a, k) => !e.some((b, j) => j !== k && b.i === iBas && a.i !== iBas && chevauche(a, b)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, largeur, d0, comparaison]);

  // Tracé de gauche à droite en 300 ms, une seule fois ; immédiat si les animations sont réduites.
  useEffect(() => {
    if (largeur === 0 || !tracer) return;
    let fini = false;
    let image = 0;
    void AccessibilityInfo.isReduceMotionEnabled().then((reduit) => {
      if (reduit) {
        setTrace(1);
        return;
      }
      const debut = Date.now();
      const etape = () => {
        if (fini) return;
        const t = Math.min(1, (Date.now() - debut) / motion.emphasized);
        setTrace(1 - (1 - t) ** 3);
        if (t < 1) image = requestAnimationFrame(etape);
      };
      image = requestAnimationFrame(etape);
    });
    return () => {
      fini = true;
      cancelAnimationFrame(image);
    };
  }, [largeur, tracer]);

  // Dates de l'axe : début, milieu et fin, passé compris.
  const dateDe = (k: number) => (k < d0 ? passe[k]!.date : points[k - d0]!.date);
  const milieu = Math.floor((total - 1) / 2);
  const reperesAxe = total > 0 ? [0, milieu, total - 1] : [];
  const choisi = touche === null ? null : points[touche];
  const evenement = choisi?.mouvements[0];
  const sansChoisi = touche === null ? undefined : comparaison?.points[touche];

  // Le doigt ne se pose que sur le prévu : le réel se lit dans l'historique.
  const indexDepuis = (px: number) => Math.max(0, Math.min(points.length - 1, Math.round((px / (zoneL || 1)) * (total - 1)) - d0));

  const bulle = choisi ? (
    <>
      {enTete ? <Text style={[type.captionMedium, { color: colors.text.primary }]}>{enTete}</Text> : null}
      {comparaison && sansChoisi ? (
        <>
          <Text style={[type.caption, styles.tabulaire, { color: colors.text.primary }]}>{dateCourte(choisi.date)}</Text>
          <Text style={[type.caption, styles.tabulaire, { color: colors.text.secondary }]}>{`${comparaison.nom} : ${fcfa(sansChoisi.solde)}`}</Text>
          <Text style={[type.caption, styles.tabulaire, { color: colors.text.primary }]}>{`${comparaison.nomPrevu} : ${fcfa(choisi.solde)}`}</Text>
        </>
      ) : (
        <>
          <Text style={[type.caption, styles.tabulaire, { color: colors.text.primary }]}>{`${dateCourte(choisi.date)} · ${fcfa(choisi.solde)}`}</Text>
          {evenement ? (
            <Text style={[type.caption, styles.tabulaire, { color: colors.text.secondary }]}>
              {`${evenement.nom} ${evenement.montant > 0 ? '+' : ''}${fcfa(evenement.montant)}`}
            </Text>
          ) : null}
        </>
      )}
    </>
  ) : null;
  const gaucheBulle = touche === null ? 0 : Math.min(Math.max(xp(touche) - LARGEUR_BULLE / 2, 0), Math.max(0, largeur - LARGEUR_BULLE));

  return (
    <View style={{ height: hauteur }}>
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={lecture}
        onLayout={(e) => setLargeur(e.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={(e) => changerTouche(indexDepuis(e.nativeEvent.locationX))}
        onResponderMove={(e) => changerTouche(indexDepuis(e.nativeEvent.locationX))}
        onResponderRelease={() => (pilote ? undefined : setToucheLibre(null))}
        onResponderTerminate={() => (pilote ? undefined : setToucheLibre(null))}
        style={StyleSheet.absoluteFill}
      >
        {largeur > 0 ? (
          <Svg width={largeur} height={hauteur}>
            {graduations.map((v) => (
              <G key={v}>
                <Line x1={0} x2={zoneL} y1={y(v)} y2={y(v)} stroke={v === 0 && min < 0 ? colors.chart.zero : colors.chart.grid} strokeWidth={1} />
                <SvgText x={largeur} y={y(v) + 4} fontSize={12} fill={colors.text.tertiary} textAnchor="end" fontFeatureSettings="'tnum'">
                  {nombre(v)}
                </SvgText>
              </G>
            ))}
            {min < 0 ? <Rect x={0} y={y(0)} width={zoneL} height={y(bas) - y(0)} fill={colors.chart.lack} /> : null}
            {ligneSans ? (
              <Polyline points={ligneSans} fill="none" stroke={colors.chart.zero} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            ) : null}
            <G>
              {comparaison ? null : <Path d={aire} fill={colors.chart.area} />}
              {lignePasse ? (
                <Polyline points={lignePasse} fill="none" stroke={colors.chart.line} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              ) : null}
              <Polyline points={ligne} fill="none" stroke={colors.chart.line} strokeWidth={2} strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round" />
            </G>
            {evenements && trace === 1
              ? points.map((p, i) =>
                  i > 0 && p.mouvements.length > 0 ? (
                    <Circle key={p.date} cx={xp(i)} cy={y(p.solde)} r={4} fill={colors.chart.line} stroke={colors.bg.canvas} strokeWidth={2} />
                  ) : null,
                )
              : null}
            {etiquettes.map((e) => (
              <SvgText
                key={e.i}
                x={Math.min(Math.max(xp(e.i), 0), zoneL)}
                y={e.dessous ? y(points[e.i]!.solde) + 16 : y(points[e.i]!.solde) - 8}
                fontSize={12}
                fill={colors.text.primary}
                textAnchor={e.i === 0 && d0 === 0 ? 'start' : xp(e.i) > zoneL - 40 ? 'end' : 'middle'}
              >
                {e.texte}
              </SvgText>
            ))}
            {reperesAxe.map((k, n) => (
              <SvgText key={k} x={x(k)} y={hauteur - 6} fontSize={12} fill={colors.text.tertiary} textAnchor={n === 0 ? 'start' : n === 2 ? 'end' : 'middle'}>
                {dateCourte(dateDe(k))}
              </SvgText>
            ))}
            {/* Point d'aujourd'hui : rond de 8 dp, anneau de 2 dp couleur du fond. */}
            <Circle cx={xp(0) + (d0 === 0 ? 4 : 0)} cy={y(points[0]?.solde ?? 0)} r={5} fill={colors.chart.line} stroke={colors.bg.canvas} strokeWidth={2} />
            {touche !== null && choisi ? (
              <G>
                <Line x1={xp(touche)} x2={xp(touche)} y1={MARGE_HAUT} y2={MARGE_HAUT + zoneH} stroke={colors.chart.zero} strokeWidth={1} />
                <Circle cx={xp(touche)} cy={y(choisi.solde)} r={4} fill={colors.chart.line} />
              </G>
            ) : null}
          </Svg>
        ) : null}
      </View>
      {bulle && touche !== null ? (
        onBulle ? (
          <Pressable
            onPress={() => onBulle(touche)}
            accessibilityRole="button"
            android_ripple={{ color: colors.action.ripple }}
            style={[styles.bulle, { backgroundColor: colors.bg.elevated, left: gaucheBulle }]}
          >
            {bulle}
          </Pressable>
        ) : (
          <View pointerEvents="none" style={[styles.bulle, { backgroundColor: colors.bg.elevated, left: gaucheBulle }]}>
            {bulle}
          </View>
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bulle: {
    position: 'absolute',
    top: 0,
    width: LARGEUR_BULLE,
    paddingHorizontal: space.s3,
    paddingVertical: space.s2,
    borderRadius: radius.sm,
    elevation: 3,
  },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
