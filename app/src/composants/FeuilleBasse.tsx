import type { ReactNode } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { motion, radius, space, type, useTheme } from '@/theme';

interface Props {
  visible: boolean;
  /** Absent : la feuille n'a pas de titre (le calendrier porte le mois). */
  titre?: string;
  onFermer: () => void;
  /** Appelé quand la feuille est affichée : c'est là qu'un champ peut prendre le focus (l'autoFocus échoue dans une Modal Android). */
  onAffichee?: () => void;
  children: ReactNode;
  /** Bouton principal de la feuille : le seul vert visible, la feuille recouvre le pied. Absent : toucher suffit. */
  pied?: ReactNode;
  /**
   * Feuille posée par un écran de la pile (EC-24) plutôt que dans une Modal : un écran ouvert
   * depuis la feuille passe alors au-dessus, et le retour revient à la feuille.
   */
  sansModal?: boolean;
}

/**
 * Feuille basse, 90 % de l'écran au plus, contenu qui défile sous un titre fixe.
 * Une saisie en cours ne se perd pas par un glissement accidentel : seuls le voile
 * et le retour Android ferment (design system, feuille basse).
 */
export function FeuilleBasse({ visible, titre, onFermer, onAffichee, children, pied, sansModal }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const corps = (
      <KeyboardAvoidingView behavior="padding" style={styles.racine}>
        <Animated.View entering={FadeIn.duration(motion.emphasized)} style={[StyleSheet.absoluteFill, { backgroundColor: colors.bg.scrim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onFermer} accessibilityRole="button" accessibilityLabel="Fermer" />
        </Animated.View>
        <Animated.View
          entering={SlideInDown.duration(motion.emphasized)}
          style={[styles.feuille, { backgroundColor: colors.bg.elevated, paddingBottom: space.s4 + insets.bottom }]}
          accessibilityViewIsModal
        >
          <View style={[styles.poignee, { backgroundColor: colors.border.control }]} />
          {titre ? (
            <Text style={[type.subtitle, styles.titre, { color: colors.text.primary }]} accessibilityRole="header">
              {titre}
            </Text>
          ) : (
            <View style={styles.sansTitre} />
          )}
          <ScrollView style={styles.defile} contentContainerStyle={styles.contenu} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
          {pied ? <View style={styles.pied}>{pied}</View> : null}
        </Animated.View>
      </KeyboardAvoidingView>
  );
  if (sansModal) return visible ? corps : null;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onFermer}
      onShow={() => {
        setTimeout(() => onAffichee?.(), 50);
      }}
      statusBarTranslucent
      navigationBarTranslucent
    >
      {corps}
    </Modal>
  );
}

const styles = StyleSheet.create({
  racine: { flex: 1, justifyContent: 'flex-end' },
  feuille: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: space.s5,
    maxHeight: '90%',
    elevation: 8,
  },
  poignee: { alignSelf: 'center', width: 32, height: 4, borderRadius: radius.full, marginTop: space.s2 },
  titre: { marginTop: space.s3, marginBottom: space.s4 },
  sansTitre: { height: space.s2 },
  defile: { flexGrow: 0, flexShrink: 1 },
  contenu: { rowGap: space.s4 },
  pied: { marginTop: space.s5 },
});
