import type { PointHorizon } from '@bankvi/moteur';
import { useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, StyleSheet, Text, View } from 'react-native';
import Svg, { G, Line, Path, Polyline, Rect, Circle, Text as SvgText } from 'react-native-svg';

import { pasRond } from '@/format/axe';
import { dateCourte } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';
import { motion, radius, size, space, type, useTheme } from '@/theme';


interface Props {
  points: PointHorizon[];
  /** Phrase lue par TalkBack : le graphique entier en une phrase. */
  lecture: string;
  hauteur?: number;
  /** Première ligne de l'info-bulle (« Exemple » sur EC-02). */
  enTete?: string;
}

const MARGE_HAUT = 20;
// 36 dp sous la zone : l'étiquette du point bas (souvent près de zéro), puis les dates.
const MARGE_BAS = 36;


/**
 * Courbe de l'horizon (design system, graphiques) : une seule série en pointillés,
 * par paliers quotidiens sans lissage, axe vertical à droite, trois étiquettes au plus.
 */
export function Courbe({ points, lecture, hauteur = size.chartHeight, enTete }: Props) {
  const { colors } = useTheme();
  const [largeur, setLargeur] = useState(0);
  const [touche, setTouche] = useState<number | null>(null);
  const [trace, setTrace] = useState(0);

  const soldes = points.map((p) => p.solde);
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
  const x = (i: number) => (points.length > 1 ? (i * zoneL) / (points.length - 1) : 0);
  const y = (v: number) => MARGE_HAUT + ((haut - v) * zoneH) / (haut - bas || 1);

  // Le tracé dévoile les jours un à un pendant l'animation (un masque SVG ne s'applique pas ici).
  const visibles = points.slice(0, Math.max(2, Math.ceil(trace * (points.length - 1)) + 1));
  const ligne = visibles.map((p, i) => `${x(i)},${y(p.solde)}`).join(' ');
  const finAire = x(visibles.length - 1);
  const aire = `M0,${y(Math.max(bas, 0))} ${visibles.map((p, i) => `L${x(i)},${y(p.solde)}`).join(' ')} L${finAire},${y(Math.max(bas, 0))} Z`;

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
    const chevauche = (a: (typeof e)[number], b: (typeof e)[number]) =>
      Math.abs(x(a.i) - x(b.i)) < 64 && Math.abs(ty(a) - ty(b)) < 16;
    return e.filter((a, k) => !e.some((b, j) => j !== k && b.i === iBas && a.i !== iBas && chevauche(a, b)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, largeur]);

  // Tracé de gauche à droite en 300 ms, une seule fois ; immédiat si les animations sont réduites.
  useEffect(() => {
    if (largeur === 0) return;
    let fini = false;
    let image = 0;
    void AccessibilityInfo.isReduceMotionEnabled().then((reduit) => {
      if (reduit) {
        setTrace(1);
        return;
      }
      const debut = Date.now();
      const pas = () => {
        if (fini) return;
        const t = Math.min(1, (Date.now() - debut) / motion.emphasized);
        setTrace(1 - (1 - t) ** 3);
        if (t < 1) image = requestAnimationFrame(pas);
      };
      image = requestAnimationFrame(pas);
    });
    return () => {
      fini = true;
      cancelAnimationFrame(image);
    };
  }, [largeur]);

  const milieu = Math.floor((points.length - 1) / 2);
  const reperes = points.length > 0 ? [0, milieu, points.length - 1] : [];
  const choisi = touche === null ? null : points[touche];
  const evenement = choisi?.mouvements[0];

  const indexDepuis = (px: number) => Math.max(0, Math.min(points.length - 1, Math.round((px / (zoneL || 1)) * (points.length - 1))));

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={lecture}
      onLayout={(e) => setLargeur(e.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderTerminationRequest={() => false}
      onResponderGrant={(e) => setTouche(indexDepuis(e.nativeEvent.locationX))}
      onResponderMove={(e) => setTouche(indexDepuis(e.nativeEvent.locationX))}
      onResponderRelease={() => setTouche(null)}
      onResponderTerminate={() => setTouche(null)}
      style={{ height: hauteur }}
    >
      {largeur > 0 ? (
        <Svg width={largeur} height={hauteur}>
          {graduations.map((v) => (
            <G key={v}>
              <Line
                x1={0}
                x2={zoneL}
                y1={y(v)}
                y2={y(v)}
                stroke={v === 0 && min < 0 ? colors.chart.zero : colors.chart.grid}
                strokeWidth={1}
              />
              <SvgText x={largeur} y={y(v) + 4} fontSize={12} fill={colors.text.tertiary} textAnchor="end" fontFeatureSettings="'tnum'">
                {nombre(v)}
              </SvgText>
            </G>
          ))}
          {min < 0 ? (
            <Rect x={0} y={y(0)} width={zoneL} height={y(bas) - y(0)} fill={colors.chart.lack} />
          ) : null}
          <G>
            <Path d={aire} fill={colors.chart.area} />
            <Polyline
              points={ligne}
              fill="none"
              stroke={colors.chart.line}
              strokeWidth={2}
              strokeDasharray="6 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
          {etiquettes.map((e) => (
            <SvgText
              key={e.i}
              x={Math.min(Math.max(x(e.i), 0), zoneL)}
              y={e.dessous ? y(points[e.i]!.solde) + 16 : y(points[e.i]!.solde) - 8}
              fontSize={12}
              fill={colors.text.primary}
              textAnchor={e.i === 0 ? 'start' : x(e.i) > zoneL - 40 ? 'end' : 'middle'}
            >
              {e.texte}
            </SvgText>
          ))}
          {reperes.map((i, k) => (
            <SvgText
              key={i}
              x={x(i)}
              y={hauteur - 6}
              fontSize={12}
              fill={colors.text.tertiary}
              textAnchor={k === 0 ? 'start' : k === 2 ? 'end' : 'middle'}
            >
              {dateCourte(points[i]!.date)}
            </SvgText>
          ))}
          {/* Point d'aujourd'hui : rond de 8 dp, anneau de 2 dp couleur du fond. */}
          <Circle cx={x(0) + 4} cy={y(points[0]?.solde ?? 0)} r={5} fill={colors.chart.line} stroke={colors.bg.canvas} strokeWidth={2} />
          {touche !== null && choisi ? (
            <G>
              <Line x1={x(touche)} x2={x(touche)} y1={MARGE_HAUT} y2={MARGE_HAUT + zoneH} stroke={colors.chart.zero} strokeWidth={1} />
              <Circle cx={x(touche)} cy={y(choisi.solde)} r={4} fill={colors.chart.line} />
            </G>
          ) : null}
        </Svg>
      ) : null}
      {choisi ? (
        <View
          pointerEvents="none"
          style={[
            styles.bulle,
            { backgroundColor: colors.bg.elevated, left: Math.min(Math.max(x(touche!) - 80, 0), Math.max(0, largeur - 168)) },
          ]}
        >
          {enTete ? <Text style={[type.captionMedium, { color: colors.text.primary }]}>{enTete}</Text> : null}
          <Text style={[type.caption, styles.tabulaire, { color: colors.text.primary }]}>
            {`${dateCourte(choisi.date)} · ${fcfa(choisi.solde)}`}
          </Text>
          {evenement ? (
            <Text style={[type.caption, styles.tabulaire, { color: colors.text.secondary }]}>
              {`${evenement.nom} ${evenement.montant > 0 ? '+' : ''}${fcfa(evenement.montant)}`}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bulle: {
    position: 'absolute',
    top: 0,
    width: 168,
    paddingHorizontal: space.s3,
    paddingVertical: space.s2,
    borderRadius: radius.sm,
    elevation: 3,
  },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
