import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Pressable, StyleSheet, Text } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { create } from 'zustand';

import { couleurs, motion, radius, space, type, useTheme } from '@/theme';

interface Annonce {
  id: number;
  texte: string;
  onAnnuler?: () => void;
}

interface Etat {
  annonce: Annonce | null;
  /** Hauteur de ce qui est fixé en bas de l'écran courant (pied, barre d'action, onglets), hors barre système. */
  bas: number;
  fixerBas: (bas: number) => void;
  montrer: (texte: string, onAnnuler?: () => void) => void;
  fermer: (id: number) => void;
}

let suivant = 1;

/** Par défaut : un pied d'action à bouton seul. */
export const BAS_PIED = 76;

export const useBandeauBas = create<Etat>()((set) => ({
  annonce: null,
  bas: BAS_PIED,
  fixerBas: (bas) => set({ bas }),
  montrer: (texte, onAnnuler) => set({ annonce: { id: suivant++, texte, ...(onAnnuler ? { onAnnuler } : {}) } }),
  fermer: (id) => set((e) => (e.annonce?.id === id ? { annonce: null } : e)),
}));

/** Raccourci pour les écrans : `annoncer('Recette adoptée.', annuler)`. */
export const annoncer = (texte: string, onAnnuler?: () => void) => useBandeauBas.getState().montrer(texte, onAnnuler);

/**
 * Bandeau bas, monté une seule fois dans la racine : il survit au changement d'écran
 * et reste jusqu'à la fin de son délai (10 s avec « Annuler », 4 s sinon).
 */
export function HoteBandeauBas() {
  const annonce = useBandeauBas((e) => e.annonce);
  const bas = useBandeauBas((e) => e.bas);
  const fermer = useBandeauBas((e) => e.fermer);
  const { scheme } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  // Bandeau inversé : fond sombre en clair, fond clair en sombre.
  const clair = couleurs('light');
  const fond = scheme === 'light' ? clair.text.primary : couleurs('dark').text.primary;
  const texte = scheme === 'light' ? clair.bg.canvas : clair.text.primary;
  const action = scheme === 'light' ? clair.action.primary : clair.text.link;

  useEffect(() => {
    if (!annonce) return;
    AccessibilityInfo.announceForAccessibility(annonce.texte);
    let actif = true;
    let minuterie: ReturnType<typeof setTimeout> | undefined;
    if (annonce.onAnnuler) {
      AccessibilityInfo.isScreenReaderEnabled()
        .then((lecteur) => {
          if (!actif) return;
          const delai = lecteur ? motion.undoDurationA11y : motion.undoDuration;
          minuterie = setTimeout(() => fermer(annonce.id), delai);
        })
        .catch(() => {
          if (!actif) return;
          minuterie = setTimeout(() => fermer(annonce.id), motion.undoDuration);
        });
    } else {
      minuterie = setTimeout(() => fermer(annonce.id), 4000);
    }
    return () => {
      actif = false;
      if (minuterie) clearTimeout(minuterie);
    };
  }, [annonce, fermer]);

  if (!annonce) return null;
  // 8 dp au-dessus du pied d'action ou de la barre du bas, et au-dessus du clavier s'il est ouvert.
  return (
    <KeyboardStickyView
      offset={{ closed: 0, opened: insets.bottom }}
      pointerEvents="box-none"
      style={[styles.hote, { bottom: insets.bottom + bas + space.s2 }]}
    >
      <Animated.View
        key={annonce.id}
        entering={FadeInDown.duration(motion.standard)}
        exiting={FadeOut.duration(motion.fast)}
        style={[styles.bandeau, { backgroundColor: fond }]}
        accessibilityLiveRegion="polite"
      >
        <Text style={[type.body, styles.texte, { color: texte }]}>{annonce.texte}</Text>
        {annonce.onAnnuler ? (
          <Pressable
            onPress={() => {
              annonce.onAnnuler?.();
              fermer(annonce.id);
            }}
            accessibilityRole="button"
            hitSlop={8}
            style={styles.action}
          >
            <Text style={[type.bodyMedium, { color: action }]}>{t('commun.annuler')}</Text>
          </Pressable>
        ) : null}
      </Animated.View>
    </KeyboardStickyView>
  );
}

const styles = StyleSheet.create({
  hote: { position: 'absolute', left: space.s2, right: space.s2 },
  bandeau: {
    minHeight: 48,
    borderRadius: radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: space.s4,
    paddingRight: space.s2,
    elevation: 3,
  },
  texte: { flex: 1, paddingVertical: space.s3 },
  action: { minHeight: 48, justifyContent: 'center', paddingHorizontal: space.s3 },
});
