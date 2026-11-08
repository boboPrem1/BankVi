import type { Recette } from '@bankvi/moteur';
import { StyleSheet, View } from 'react-native';

import { radius, useTheme, type Colors } from '@/theme';

/** Couleur d'un pot : l'ordre est fixe (design system, couleurs des pots). */
export function couleurPot(colors: Colors, index: number): string {
  const cles = ['1', '2', '3', '4', '5', '6'] as const;
  return colors.pot[cles[index % cles.length]!];
}

/** Les pots à pourcentage, dans l'ordre : « Le reste » n'a ni couleur ni part fixe. */
export const potsEnPourcentage = (r: Recette) =>
  r.pots.flatMap((p) => (p.regle.type === 'pourcentage' ? [{ id: p.id, nom: p.nom, pct: p.regle.valeur }] : []));

/** Barre des pots : 8 dp, segments proportionnels, trou de 2 dp, bouts arrondis. Ignorée par TalkBack. */
export function BarrePots({ recette }: { recette: Recette }) {
  const { colors } = useTheme();
  const pots = potsEnPourcentage(recette).filter((p) => p.pct > 0);
  return (
    <View style={styles.barre} importantForAccessibility="no-hide-descendants" accessible={false}>
      {pots.map((p, i) => (
        <View key={p.id} style={{ flex: p.pct, height: 8, backgroundColor: couleurPot(colors, i), borderRadius: radius.full }} />
      ))}
    </View>
  );
}

export function Pastille({ couleur }: { couleur: string }) {
  return <View style={[styles.pastille, { backgroundColor: couleur }]} />;
}

const styles = StyleSheet.create({
  barre: { flexDirection: 'row', columnGap: 2, height: 8, borderRadius: radius.full, overflow: 'hidden' },
  pastille: { width: 12, height: 12, borderRadius: 6 },
});
