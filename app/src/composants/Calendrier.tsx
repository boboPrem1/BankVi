import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { dateLongueJour, nomMois } from '@/format/date';
import { Icone } from '@/icones/Icone';
import { motion, size, space, type, useTheme } from '@/theme';

const pad = (n: number) => String(n).padStart(2, '0');
export const moisDe = (date: string) => date.slice(0, 7);
export function moisDecale(mois: string, n: number): string {
  const [a, m] = mois.split('-').map(Number) as [number, number];
  const t = a * 12 + (m - 1) + n;
  return `${Math.floor(t / 12)}-${pad((t % 12) + 1)}`;
}

interface Props {
  mois: string;
  onMois: (mois: string) => void;
  aujourdhui: string;
  /** Mois atteignables, compris. */
  min: string;
  max: string;
  estChoisi: (date: string) => boolean;
  /** Bande de période entre deux dates comprises (EC-16, mode Période). */
  bande?: [string, string] | undefined;
  /** Jours hors d'atteinte : grisés, sans action (EC-25, 90 jours en avant au plus). */
  horsLimite?: ((date: string) => boolean) | undefined;
  onJour: (date: string) => void;
}

/**
 * Calendrier mensuel (design system, sélecteur de date) : semaine du lundi, cercles de 40 dp
 * dans des zones de 48 dp, aujourd'hui entouré, un point sous chaque date future.
 */
export function Calendrier({ mois, onMois, aujourdhui, min, max, estChoisi, bande, horsLimite, onJour }: Props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [a, m] = mois.split('-').map(Number) as [number, number];
  const premier = new Date(Date.UTC(a, m - 1, 1)).getUTCDay(); // 0 = dimanche
  const vides = (premier + 6) % 7;
  const nb = new Date(Date.UTC(a, m, 0)).getUTCDate();
  const cases: (string | null)[] = [...Array(vides).fill(null), ...Array.from({ length: nb }, (_, i) => `${mois}-${pad(i + 1)}`)];
  while (cases.length % 7) cases.push(null);

  const precedent = mois > min;
  const suivant = mois < max;

  return (
    <View>
      <View style={styles.entete}>
        <Fleche nom="chevron_left" actif={precedent} lecture={t('calendrier.precedent')} onPress={() => onMois(moisDecale(mois, -1))} />
        <Text style={[type.subtitle, styles.mois, { color: colors.text.primary }]} accessibilityRole="header">
          {nomMois(mois)}
        </Text>
        <Fleche nom="chevron_right" actif={suivant} lecture={t('calendrier.suivant')} onPress={() => onMois(moisDecale(mois, 1))} />
      </View>
      <View style={styles.semaine}>
        {(t('calendrier.jours', { returnObjects: true }) as string[]).map((j, i) => (
          <Text key={i} style={[type.caption, styles.jourSemaine, { color: colors.text.secondary }]} importantForAccessibility="no">
            {j}
          </Text>
        ))}
      </View>
      <Animated.View key={mois} entering={FadeIn.duration(motion.standard)} style={styles.grille}>
        {cases.map((date, i) => {
          if (!date) return <View key={`v${i}`} style={styles.case} />;
          const choisi = estChoisi(date);
          const futur = date > aujourdhui;
          const dansBande = bande && date >= bande[0] && date <= bande[1];
          const hors = horsLimite?.(date) ?? false;
          const lecture = `${dateLongueJour(date)}${futur ? `, ${t('calendrier.prevu')}` : ''}${choisi ? `, ${t('calendrier.selectionne')}` : ''}`;
          return (
            <View key={date} style={[styles.case, dansBande ? { backgroundColor: colors.bg.selected } : null]}>
              <Pressable
                onPress={() => onJour(date)}
                disabled={hors}
                accessibilityRole="button"
                accessibilityLabel={lecture}
                accessibilityState={{ selected: choisi, disabled: hors }}
                style={[
                  styles.rond,
                  choisi ? { backgroundColor: colors.action.primary } : null,
                  date === aujourdhui && !choisi ? { borderWidth: 1, borderColor: colors.border.focus } : null,
                ]}
              >
                <Text style={[type.bodyLarge, styles.chiffre, { color: choisi ? colors.text.onAction : hors ? colors.text.disabled : colors.text.primary }]}>
                  {Number(date.slice(8))}
                </Text>
                {futur && !choisi && !hors ?<View style={[styles.point, { backgroundColor: colors.text.tertiary }]} /> : null}
              </Pressable>
            </View>
          );
        })}
      </Animated.View>
      <View style={styles.legende} accessible accessibilityLabel={t('calendrier.legende')}>
        <View style={[styles.point, styles.pointLegende, { backgroundColor: colors.text.tertiary }]} />
        <Text style={[type.caption, { color: colors.text.secondary }]}>{t('calendrier.legende')}</Text>
      </View>
    </View>
  );
}

function Fleche({ nom, actif, lecture, onPress }: { nom: 'chevron_left' | 'chevron_right'; actif: boolean; lecture: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={!actif}
      accessibilityRole="button"
      accessibilityLabel={lecture}
      accessibilityState={{ disabled: !actif }}
      android_ripple={{ color: colors.action.ripple, borderless: true, radius: 24 }}
      style={styles.fleche}
    >
      <Icone nom={nom} couleur={actif ? colors.text.primary : colors.text.disabled} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  entete: { height: 48, flexDirection: 'row', alignItems: 'center' },
  mois: { flex: 1, textAlign: 'center' },
  fleche: { width: size.touchMin, height: size.touchMin, alignItems: 'center', justifyContent: 'center' },
  semaine: { flexDirection: 'row', marginTop: space.s2, marginBottom: space.s1 },
  jourSemaine: { flex: 1, textAlign: 'center' },
  grille: { flexDirection: 'row', flexWrap: 'wrap' },
  case: { width: `${100 / 7}%`, height: 48, alignItems: 'center', justifyContent: 'center' },
  rond: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  chiffre: { fontVariant: ['tabular-nums'] },
  point: { position: 'absolute', bottom: 3, width: 4, height: 4, borderRadius: 2 },
  legende: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2, marginTop: space.s2 },
  pointLegende: { position: 'relative', bottom: 0 },
});
