import { StyleSheet, Text, View } from 'react-native';

import { Icone } from '@/icones/Icone';
import type { NomIcone } from '@/icones/chemins';
import { radius, size, space, type, useTheme } from '@/theme';

/** Bulle de l'app : elle explique un fait. Coin haut gauche aplati, sans queue. */
export function Bulle({ texte, titre = false }: { texte: string; titre?: boolean }) {
  const { colors, scheme } = useTheme();
  return (
    <View style={[styles.bulle, { backgroundColor: colors.bg.bubbleApp }, scheme === 'light' && styles.e1]}>
      <Text style={[type.body, styles.tabulaire, { color: colors.text.primary }]} {...(titre ? { accessibilityRole: 'header' as const } : {})}>
        {texte}
      </Text>
    </View>
  );
}

/** Bulle de l'utilisateur : rappel de sa réponse, à droite, coin haut droit aplati, 80 % au plus. */
export function BulleUtilisateur({ texte }: { texte: string }) {
  const { colors, scheme } = useTheme();
  return (
    <View style={styles.droite}>
      <View style={[styles.bulle, styles.coinDroit, { backgroundColor: colors.bg.bubbleUser }, scheme === 'light' && styles.e1]}>
        <Text style={[type.body, styles.tabulaire, { color: colors.text.primary }]}>{texte}</Text>
      </View>
    </View>
  );
}

type Variante = 'info' | 'attention' | 'erreur';

/** Bandeau d'état : message fixe, deux lignes au plus. */
export function BandeauEtat({ texte, variante = 'info', icone, lecture }: { texte: string; variante?: Variante; icone?: NomIcone; lecture?: string }) {
  const { colors } = useTheme();
  const v = {
    info: { fond: colors.status.infoBg, texte: colors.status.infoFg, icone: 'info' as const },
    attention: { fond: colors.status.warnBg, texte: colors.status.warnFg, icone: 'warning' as const },
    erreur: { fond: colors.status.errorBg, texte: colors.status.errorFg, icone: 'error' as const },
  }[variante];
  return (
    <View
      style={[styles.bandeau, { backgroundColor: v.fond }]}
      accessible
      accessibilityLabel={lecture ?? texte}
      accessibilityLiveRegion={variante === 'erreur' ? 'assertive' : 'none'}
    >
      <Icone nom={icone ?? v.icone} couleur={v.texte} taille={size.iconSmall} />
      <Text style={[type.body, { color: v.texte, flexShrink: 1 }]}>{texte}</Text>
    </View>
  );
}

/** Avatar : cercle de 40 dp, icône de 24 dp ou initiale. */
export function Avatar({ icone, initiale }: { icone?: NomIcone; initiale?: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.avatar, { backgroundColor: colors.bg.subtle }]} importantForAccessibility="no-hide-descendants">
      {icone ? <Icone nom={icone} couleur={colors.text.secondary} /> : null}
      {initiale ? <Text style={[type.bodyStrong, { color: colors.text.secondary }]}>{initiale}</Text> : null}
    </View>
  );
}

/** Titre de question du premier lancement : déclaré comme titre pour TalkBack. */
export function Question({ texte, aide }: { texte: string; aide?: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.question}>
      <Text style={[type.title, { color: colors.text.primary }]} accessibilityRole="header">
        {texte}
      </Text>
      {aide ? <Text style={[type.body, { color: colors.text.secondary }]}>{aide}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bulle: {
    paddingHorizontal: space.s3,
    paddingVertical: space.s2,
    borderRadius: radius.md,
    borderTopLeftRadius: radius.xs,
  },
  e1: { elevation: 1, shadowColor: '#0B141A' },
  coinDroit: { borderTopLeftRadius: radius.md, borderTopRightRadius: radius.xs, maxWidth: '80%' },
  droite: { alignItems: 'flex-end' },
  tabulaire: { fontVariant: ['tabular-nums'] },
  bandeau: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s2,
    padding: space.s3,
    borderRadius: radius.sm,
  },
  avatar: { width: size.avatar, height: size.avatar, borderRadius: size.avatar / 2, alignItems: 'center', justifyContent: 'center' },
  question: { rowGap: space.s2, marginBottom: space.s5 },
});
