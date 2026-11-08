import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icone } from '@/icones/Icone';
import type { NomIcone } from '@/icones/chemins';
import { radius, size, space, type, useTheme } from '@/theme';

/** Rond de sélection : 20 dp, cercle de 2 dp, point de 10 dp si choisi. */
export function Radio({ choisi }: { choisi: boolean }) {
  const { colors } = useTheme();
  const couleur = choisi ? colors.border.focus : colors.border.control;
  return (
    <View style={[styles.radio, { borderColor: couleur }]}>
      {choisi ? <View style={[styles.point, { backgroundColor: couleur }]} /> : null}
    </View>
  );
}

interface CarteProps {
  titre: string;
  texte: string;
  choisi: boolean;
  onPress: () => void;
  position: number;
  total: number;
}

/** Carte de choix (EC-04, EC-09) : vert pâle et contour de 2 dp quand elle est choisie. */
export function CarteChoix({ titre, texte, choisi, onPress, position, total }: CarteProps) {
  const { colors } = useTheme();
  const couleurTexte = choisi ? colors.text.onSelected : undefined;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: choisi }}
      accessibilityLabel={`${titre}, ${texte}`}
      accessibilityHint={`${position} sur ${total}`}
      android_ripple={{ color: colors.action.ripple }}
      style={[
        styles.carte,
        {
          backgroundColor: choisi ? colors.bg.selected : colors.bg.elevated,
          borderColor: choisi ? colors.border.focus : colors.border.control,
          borderWidth: choisi ? 2 : 1,
          padding: choisi ? 15 : 16,
        },
      ]}
    >
      <Radio choisi={choisi} />
      <View style={styles.flex}>
        <Text style={[type.bodyStrong, { color: couleurTexte ?? colors.text.primary }]}>{titre}</Text>
        <Text style={[type.body, { color: couleurTexte ?? colors.text.secondary }]}>{texte}</Text>
      </View>
    </Pressable>
  );
}

interface PuceProps {
  libelle: string;
  onPress: () => void;
  icone?: NomIcone;
  choisie?: boolean;
  lecture?: string;
  role?: 'button' | 'radio';
}

/** Puce : pilule de 32 dp, zone tactile de 48 dp. Sélectionnée : fond vert pâle et `check`. */
export function Puce({ libelle, onPress, icone, choisie = false, lecture, role = 'button' }: PuceProps) {
  const { colors } = useTheme();
  const couleur = choisie ? colors.text.onSelected : colors.text.primary;
  const nomIcone = choisie ? 'check' : icone;
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole={role}
      accessibilityLabel={lecture ?? libelle}
      {...(role === 'radio' ? { accessibilityState: { checked: choisie } } : {})}
      android_ripple={{ color: colors.action.ripple }}
      style={[
        styles.puce,
        choisie
          ? { backgroundColor: colors.bg.selected, borderColor: colors.bg.selected }
          : { borderColor: colors.border.control },
      ]}
    >
      {nomIcone ? <Icone nom={nomIcone} couleur={couleur} taille={size.iconSmall} /> : null}
      <Text style={[type.bodyMedium, { color: couleur }]}>{libelle}</Text>
    </Pressable>
  );
}

export function RangeePuces({ children }: { children: React.ReactNode }) {
  return <View style={styles.rangee}>{children}</View>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  point: { width: 10, height: 10, borderRadius: 5 },
  carte: {
    minHeight: 72,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s4,
    overflow: 'hidden',
  },
  puce: {
    height: size.chip,
    borderRadius: radius.full,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s2,
    paddingHorizontal: space.s3,
    overflow: 'hidden',
  },
  rangee: { flexDirection: 'row', flexWrap: 'wrap', gap: space.s2 },
});
