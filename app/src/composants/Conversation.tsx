import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icone } from '@/icones/Icone';
import type { NomIcone } from '@/icones/chemins';
import { radius, space, type, useTheme } from '@/theme';

interface BulleProps {
  sens: 'depense' | 'revenu';
  texte: string;
  /** Lu par TalkBack : « Dépense : Taxi, 500 francs CFA, 8 h 12 ». */
  lecture: string;
  sousLigne?: string;
  groupe?: boolean;
  /** Ligne prévue : sans fond, contour pointillé ; le mot « Prévu » est écrit. */
  prevu?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  /** Action personnalisée qui remplace l'appui long pour TalkBack. */
  actionLongue?: string;
}

/**
 * Saisie en conversation (SAI-27) : l'argent qui sort part comme un message envoyé, à droite ;
 * l'argent qui entre arrive comme un message reçu, à gauche. Sans queue ni coche.
 */
export function BulleSaisie({ sens, texte, lecture, sousLigne, groupe, prevu, onPress, onLongPress, actionLongue }: BulleProps) {
  const { colors, scheme } = useTheme();
  const depense = sens === 'depense';
  return (
    <View style={[styles.rangee, { justifyContent: depense ? 'flex-end' : 'flex-start' }]}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={350}
        accessibilityRole="button"
        accessibilityLabel={lecture}
        accessibilityActions={actionLongue ? [{ name: 'longpress', label: actionLongue }] : undefined}
        onAccessibilityAction={() => onLongPress?.()}
        android_ripple={{ color: colors.action.ripple }}
        style={[
          styles.bulle,
          depense ? styles.coinDepense : styles.coinRevenu,
          prevu
            ? { borderWidth: 1, borderStyle: 'dashed', borderColor: colors.border.control }
            : { backgroundColor: depense ? colors.bg.bubbleUser : colors.bg.bubbleIncome },
          !prevu && scheme === 'light' ? styles.e1 : null,
        ]}
      >
        <Text style={[type.body, styles.tabulaire, { color: colors.text.primary }]}>{texte}</Text>
        {sousLigne ? (
          <View style={styles.sous}>
            {groupe ? <Icone nom="link" couleur={depense && !prevu ? colors.text.timeOnExpense : colors.text.secondary} taille={16} /> : null}
            <Text style={[type.caption, { color: depense && !prevu ? colors.text.timeOnExpense : colors.text.secondary }]}>{sousLigne}</Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

/** Repère neutre au centre : jour, comptage, transfert, « Non détaillé ». */
export function Repere({ texte, icone, onPress }: { texte: string; icone?: NomIcone; onPress?: () => void }) {
  const { colors } = useTheme();
  return (
    <View style={styles.centre}>
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole={onPress ? 'button' : 'text'}
        style={[styles.repere, { borderColor: colors.border.subtle }]}
      >
        {icone ? <Icone nom={icone} couleur={colors.text.secondary} taille={16} /> : null}
        <Text style={[type.caption, styles.tabulaire, { color: colors.text.secondary }]}>{texte}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rangee: { flexDirection: 'row' },
  bulle: {
    maxWidth: '80%',
    paddingHorizontal: space.s3,
    paddingVertical: space.s2 - 2,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  coinDepense: { borderTopRightRadius: radius.xs },
  coinRevenu: { borderTopLeftRadius: radius.xs },
  e1: { elevation: 1, shadowColor: '#0B141A' },
  tabulaire: { fontVariant: ['tabular-nums'] },
  sous: { flexDirection: 'row', alignItems: 'center', columnGap: space.s1 },
  centre: { alignItems: 'center' },
  repere: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s1,
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: space.s2,
    minHeight: 24,
  },
});
