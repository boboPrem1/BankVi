import { Children } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type GestureResponderEvent } from 'react-native';

import { Icone } from '@/icones/Icone';
import type { NomIcone } from '@/icones/chemins';
import { radius, size, space, type, useTheme } from '@/theme';

interface PrincipalProps {
  libelle: string;
  onPress: (e: GestureResponderEvent) => void;
  desactive?: boolean;
  /** Libellé pendant l'attente (« Envoi… ») : le cercle n'apparaît qu'après 300 ms. */
  chargement?: string | false;
  /** Lu par TalkBack quand le bouton est désactivé : il dit ce qui manque. */
  lectureDesactive?: string;
  /** Icône de 24 dp avant le libellé (barre d'action : `add`). */
  icone?: NomIcone;
}

/** Bouton principal : rectangle adouci (16 dp) de 48 dp. Un seul par écran. */
export function BoutonPrincipal({ libelle, onPress, desactive, chargement, lectureDesactive, icone }: PrincipalProps) {
  const { colors } = useTheme();
  const inactif = desactive || !!chargement;
  return (
    <Pressable
      onPress={onPress}
      disabled={inactif}
      accessibilityRole="button"
      accessibilityLabel={desactive && lectureDesactive ? lectureDesactive : (chargement || libelle)}
      accessibilityState={{ disabled: !!desactive, busy: !!chargement }}
      android_ripple={{ color: colors.action.ripple }}
      style={({ pressed }) => [
        styles.principal,
        {
          backgroundColor: desactive
            ? colors.action.disabled
            : pressed
              ? colors.action.primaryPressed
              : colors.action.primary,
        },
      ]}
    >
      {chargement ? <ActivityIndicator size={20} color={colors.text.onAction} /> : null}
      {icone && !chargement ? <Icone nom={icone} couleur={desactive ? colors.text.disabled : colors.text.onAction} /> : null}
      <Text
        style={[type.button, { color: desactive ? colors.text.disabled : colors.text.onAction }]}
        numberOfLines={2}
      >
        {chargement || libelle}
      </Text>
    </Pressable>
  );
}

/**
 * Bouton à contour : fond de l'écran, contour de 1 dp, texte de lien. Pour l'action secondaire
 * d'une barre à deux boutons (« Noter » à côté de « Faire mon bilan »).
 */
export function BoutonContour({ libelle, onPress, icone }: { libelle: string; onPress: () => void; icone?: NomIcone }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={libelle}
      android_ripple={{ color: colors.action.ripple }}
      style={[styles.principal, { borderWidth: 1, borderColor: colors.border.control, backgroundColor: colors.bg.canvas }]}
    >
      {icone ? <Icone nom={icone} couleur={colors.text.link} /> : null}
      <Text style={[type.button, { color: colors.text.link }]} numberOfLines={1}>
        {libelle}
      </Text>
    </Pressable>
  );
}

/** Bouton destructif : texte rouge, seulement pour une action destructive (« Supprimer »). */
export function BoutonDestructif({ libelle, onPress }: { libelle: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" android_ripple={{ color: colors.action.ripple }} style={styles.texte}>
      <Text style={[type.bodyMedium, { color: colors.status.errorFg, textAlign: 'center' }]}>{libelle}</Text>
    </Pressable>
  );
}

interface TexteProps {
  libelle: string;
  onPress: () => void;
  lecture?: string;
}

/** Bouton texte : 48 dp de haut, couleur de lien, sans fond. */
export function BoutonTexte({ libelle, onPress, lecture }: TexteProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={lecture ?? libelle}
      android_ripple={{ color: colors.action.ripple, borderless: false }}
      style={styles.texte}
    >
      <Text style={[type.bodyMedium, { color: colors.text.link, textAlign: 'center' }]}>{libelle}</Text>
    </Pressable>
  );
}

/** Deux boutons texte sur une ligne, chacun centré dans sa moitié (EC-01). */
export function DeuxBoutonsTexte({ children }: { children: React.ReactNode }) {
  // À 200 % de texte, les deux moitiés passent l'une sous l'autre.
  return (
    <View style={styles.deux}>
      {Children.map(children, (enfant) => (
        <View style={styles.moitie}>{enfant}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  principal: {
    minHeight: size.button,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: space.s2,
    paddingHorizontal: space.s5,
    overflow: 'hidden',
  },
  texte: {
    minHeight: size.touchMin,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.s3,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  deux: { flexDirection: 'row', flexWrap: 'wrap', columnGap: space.s2 },
  moitie: { flexGrow: 1, flexBasis: 140 },
});
