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

/** Puce avec chevron bas : elle ouvre un choix (catégorie, poche). */
export function PuceMenu({ libelle, icone, onPress }: { libelle: string; icone: NomIcone; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={libelle}
      android_ripple={{ color: colors.action.ripple }}
      style={[styles.puce, styles.puceMenu, { borderColor: colors.border.control }]}
    >
      <Icone nom={icone} couleur={colors.text.primary} taille={size.iconSmall} />
      <Text style={[type.bodyMedium, { color: colors.text.primary }]} numberOfLines={1}>
        {libelle}
      </Text>
      <Icone nom="arrow_drop_down" couleur={colors.text.secondary} taille={size.iconSmall} />
    </Pressable>
  );
}

export function RangeePuces({ children }: { children: React.ReactNode }) {
  return <View style={styles.rangee}>{children}</View>;
}

export interface Segment<T extends string> {
  valeur: T;
  libelle: string;
  /** Petite mention sous le libellé (« Pass Plus »). */
  mention?: string;
  lecture?: string;
}

/**
 * Choix en deux segments (EC-23 « 30 jours | 90 jours », EC-26 « Sortie | Entrée ») :
 * pilule de 40 dp, contour de 1 dp, segment choisi en vert pâle avec `check`.
 */
export function Segments<T extends string>({ segments, valeur, onChoix }: { segments: Segment<T>[]; valeur: T; onChoix: (v: T) => void }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.segments, { borderColor: colors.border.control }]} accessibilityRole="radiogroup">
      {segments.map((s, i) => {
        const choisi = s.valeur === valeur;
        const couleur = choisi ? colors.text.onSelected : colors.text.primary;
        return (
          <Pressable
            key={s.valeur}
            onPress={() => onChoix(s.valeur)}
            accessibilityRole="radio"
            accessibilityState={{ checked: choisi }}
            accessibilityLabel={s.lecture ?? (s.mention ? `${s.libelle}, ${s.mention}` : s.libelle)}
            android_ripple={{ color: colors.action.ripple }}
            style={[
              styles.segment,
              i > 0 ? { borderLeftWidth: 1, borderLeftColor: colors.border.control } : null,
              choisi ? { backgroundColor: colors.bg.selected } : null,
            ]}
          >
            {choisi ? <Icone nom="check" couleur={couleur} taille={size.iconSmall} /> : null}
            <View style={styles.centre}>
              <Text style={[type.bodyMedium, { color: couleur }]} numberOfLines={1}>
                {s.libelle}
              </Text>
              {s.mention ? (
                <Text style={[type.caption, { color: colors.text.secondary }]} numberOfLines={1}>
                  {s.mention}
                </Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
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
  puceMenu: { maxWidth: 200 },
  segments: { flexDirection: 'row', minHeight: 40, borderWidth: 1, borderRadius: radius.full, overflow: 'hidden', alignSelf: 'flex-start' },
  segment: { minWidth: 120, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: space.s2, paddingHorizontal: space.s4 },
  centre: { alignItems: 'center' },
});
