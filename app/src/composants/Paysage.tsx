import { useEffect } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { artwork, type EtatCiel } from '@/theme';

/** Cadrages de la maquette (accueil-statut.html), en dp pour un héros de 280 ou un écran de 800. */
const CADRES = {
  accueil: { ref: 280, r: 18, sunBase: 212, sunLift: 8, bMin: 60, bMax: 150, fTop: 186, fBot: 240, nTop: 212, nBot: 262, oiseaux: true },
  plein: { ref: 800, r: 32, sunBase: 500, sunLift: 60, bMin: 380, bMax: 440, fTop: 462, fBot: 610, nTop: 540, nBot: 690, oiseaux: true },
  miniature: { ref: 800, r: 70, sunBase: 500, sunLift: 60, bMin: 0, bMax: 0, fTop: 462, fBot: 610, nTop: 540, nBot: 690, oiseaux: false },
} as const;

/** Collines : la courbe à 30 jours, normalisée, échantillonnée tous les 3 jours et lissée. */
function colline(v: number[], W: number, H: number, top: number, bot: number, decalage: number): string {
  const lo = Math.min(...v);
  const hi = Math.max(...v);
  const ecart = hi - lo || 1;
  const pts: [number, number][] = [];
  for (let i = 0; i <= 30; i += 3) {
    const valeur = v[(i + decalage) % v.length] ?? lo;
    pts.push([-24 + (i / 30) * (W + 48), bot - ((valeur - lo) / ecart) * (bot - top)]);
  }
  let d = `M${pts[0]![0].toFixed(1)} ${pts[0]![1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[Math.max(0, i - 1)]!;
    const b = pts[i]!;
    const c = pts[i + 1]!;
    const e = pts[Math.min(pts.length - 1, i + 2)]!;
    d += ` C${(b[0] + (c[0] - a[0]) / 6).toFixed(1)} ${(b[1] + (c[1] - a[1]) / 6).toFixed(1)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(1)} ${(c[1] - (e[1] - b[1]) / 6).toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  }
  return `${d} L${W + 24} ${H} L-24 ${H} Z`;
}

/** 3 à 7 oiseaux, à droite, tirés de la date : le même jour donne la même image. */
function oiseaux(W: number, yMin: number, yMax: number, graine: number): string {
  let x = graine;
  const rnd = () => {
    x = (x * 1664525 + 1013904223) % 4294967296;
    return x / 4294967296;
  };
  const n = 3 + Math.floor(rnd() * 5);
  let d = '';
  for (let i = 0; i < n; i++) {
    const bx = W * (0.64 + (0.3 * (i + rnd() * 0.5)) / n);
    const by = yMin + rnd() * (yMax - yMin);
    const k = 3 + rnd() * 3;
    d += `M${(bx - k).toFixed(1)} ${by.toFixed(1)} Q${(bx - k / 2).toFixed(1)} ${(by - k).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)} Q${(bx + k / 2).toFixed(1)} ${(by - k).toFixed(1)} ${(bx + k).toFixed(1)} ${by.toFixed(1)} `;
  }
  return d;
}

interface Props {
  largeur: number;
  hauteur: number;
  cadre: keyof typeof CADRES;
  /** Soldes du matin sur 30 jours (horizon du moteur). */
  soldes: number[];
  /** Jours écoulés ÷ jours du cycle : le soleil arrive à droite le jour du revenu. */
  progression: number;
  etat: EtatCiel;
  /** La date, en nombre (20261106) : graine des oiseaux. */
  graine: number;
  /** Dérive très lente du soleil et des collines lointaines (statut seulement). */
  derive?: boolean;
}

/**
 * Le paysage du jour, calculé à partir des chiffres : ciel selon l'état, soleil selon le cycle,
 * collines selon la courbe. Décoratif pour TalkBack : ses informations sont écrites à côté.
 */
export function Paysage({ largeur: W, hauteur: H, cadre, soldes, progression, etat, graine, derive = false }: Props) {
  const g = CADRES[cadre];
  const k = H / g.ref;
  const [haut, bas] = artwork.skies[etat];
  const P = Math.min(1, Math.max(0, progression));
  const v = soldes.length > 1 ? soldes : [0, 0];

  const decalage = useSharedValue(0);
  useEffect(() => {
    if (!derive) return;
    let actif = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((reduit) => {
      if (!actif || reduit) return;
      decalage.value = withRepeat(withTiming(2, { duration: 5000, easing: Easing.inOut(Easing.sin) }), -1, true);
    });
    return () => {
      actif = false;
    };
  }, [derive, decalage]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateX: decalage.value }] }));

  const soleil = (
    <Circle cx={W * 0.06 + P * W * 0.88} cy={(g.sunBase - g.sunLift * Math.sin(Math.PI * P)) * k} r={g.r * k} fill={artwork.sun} />
  );

  return (
    <View style={{ width: W, height: H }} importantForAccessibility="no-hide-descendants" accessible={false} pointerEvents="none">
      <Svg width={W} height={H} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="ciel" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={haut} />
            <Stop offset="1" stopColor={bas} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={W} height={H} fill="url(#ciel)" />
      </Svg>
      <Animated.View style={[StyleSheet.absoluteFill, style]}>
        <Svg width={W} height={H}>
          {soleil}
          <Path d={colline(v, W, H, g.fTop * k, g.fBot * k, 7)} fill={artwork.hillFar} />
        </Svg>
      </Animated.View>
      <Svg width={W} height={H} style={StyleSheet.absoluteFill}>
        {g.oiseaux ? (
          <Path d={oiseaux(W, g.bMin * k, g.bMax * k, graine)} fill="none" stroke={artwork.detail} strokeWidth={1.5} strokeLinecap="round" />
        ) : null}
        <Path d={colline(v, W, H, g.nTop * k, g.nBot * k, 0)} fill={artwork.hillNear} />
      </Svg>
    </View>
  );
}
