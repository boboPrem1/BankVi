import { router } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Icone } from '@/icones/Icone';
import { size, space, type, useTheme } from '@/theme';

interface Props {
  /** Barre du haut : absente sur EC-01. */
  barre?: boolean;
  titre?: string;
  onRetour?: () => void;
  pied?: ReactNode;
  children: ReactNode;
  /** Marges latérales : 24 dp au premier lancement, 16 dp sur les listes. */
  marge?: number;
  /** Contenu centré verticalement (EC-01). */
  centre?: boolean;
  /** Défilement du contenu ; le pied reste fixe au-dessus du clavier. */
  defile?: boolean;
  /** Élément fixe sous la barre du haut, hors du défilement (bandeau d'EC-02). */
  fixe?: ReactNode;
  /** `close` au lieu de `arrow_back` : tâche ouverte par-dessus (Noter, Mon bilan). */
  fermer?: boolean;
  /** Remplace l'icône de gauche (« Terminer » en mode « Ajouter une autre »). */
  gauche?: ReactNode;
  /** Élément fixe juste au-dessus du pied (bandeaux d'EC-13). */
  surPied?: ReactNode;
}

/**
 * Cadre commun : barre d'état transparente, barre du haut, contenu qui défile,
 * pied d'action fixe au-dessus de la barre de navigation et du clavier.
 */
export function Ecran({
  barre = true,
  titre,
  onRetour,
  pied,
  children,
  marge = size.gutterOnboarding,
  centre,
  defile = true,
  fixe,
  fermer,
  gauche,
  surPied,
}: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [hauteurPied, setHauteurPied] = useState(76);
  const [hauteurVue, setHauteurVue] = useState(0);
  const [hauteurContenu, setHauteurContenu] = useState(0);
  const [defileDessous, setDefileDessous] = useState(false);

  const retour = onRetour ?? (() => router.back());
  // Trait du haut du pied : seulement si le contenu passe dessous.
  const trait = defileDessous || hauteurContenu > hauteurVue + 1;

  return (
    <View style={[styles.ecran, { backgroundColor: colors.bg.canvas, paddingTop: insets.top }]}>
      {barre ? (
        <View style={styles.barre}>
          {gauche ?? (
            <Pressable
              onPress={retour}
              accessibilityRole="button"
              accessibilityLabel={fermer ? t('ec13.fermer') : t('commun.retour')}
              hitSlop={4}
              android_ripple={{ color: colors.action.ripple, borderless: true, radius: 24 }}
              style={styles.retour}
            >
              <Icone nom={fermer ? 'close' : 'arrow_back'} couleur={colors.text.primary} />
            </Pressable>
          )}
          {titre ? (
            <Text style={[type.appbar, { color: colors.text.primary, flex: 1 }]} numberOfLines={1} accessibilityRole="header">
              {titre}
            </Text>
          ) : null}
        </View>
      ) : null}
      {fixe ? <View style={{ paddingHorizontal: marge }}>{fixe}</View> : null}

      {defile ? (
        <KeyboardAwareScrollView
          style={styles.flex}
          bottomOffset={hauteurPied + space.s3}
          keyboardShouldPersistTaps="handled"
          onLayout={(e) => setHauteurVue(e.nativeEvent.layout.height)}
          onContentSizeChange={(_, h) => setHauteurContenu(h)}
          onScroll={(e) => {
            const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
            setDefileDessous(contentOffset.y + layoutMeasurement.height < contentSize.height - 1);
          }}
          scrollEventThrottle={64}
          contentContainerStyle={[{ paddingHorizontal: marge, paddingBottom: hauteurPied + space.s3 }, centre && styles.centre]}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View style={[styles.flex, { paddingHorizontal: marge, paddingBottom: hauteurPied }, centre && styles.centre]}>{children}</View>
      )}

      {pied ? (
        <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }} style={styles.piedConteneur}>
          <View
            onLayout={(e) => setHauteurPied(e.nativeEvent.layout.height)}
            style={[
              styles.pied,
              {
                backgroundColor: colors.bg.canvas,
                paddingHorizontal: marge,
                paddingBottom: space.s4 + insets.bottom,
                borderTopColor: trait ? colors.border.subtle : 'transparent',
              },
            ]}
          >
            {surPied ? <View style={styles.surPied}>{surPied}</View> : null}
            {pied}
          </View>
        </KeyboardStickyView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  flex: { flex: 1 },
  centre: { flexGrow: 1, justifyContent: 'center' },
  barre: { height: size.appBar, flexDirection: 'row', alignItems: 'center', paddingLeft: space.s1, columnGap: space.s1 },
  retour: { width: size.touchMin, height: size.touchMin, alignItems: 'center', justifyContent: 'center' },
  piedConteneur: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  pied: { paddingTop: space.s3, rowGap: space.s1, borderTopWidth: 1 },
  surPied: { marginBottom: space.s2 },
});
