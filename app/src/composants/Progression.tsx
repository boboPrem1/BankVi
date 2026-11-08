import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { radius, size, space, type, useTheme } from '@/theme';

/** Progression à trois segments du premier lancement : « Question 2 sur 3 ». */
export function Progression({ etape }: { etape: 1 | 2 | 3 }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={styles.bloc} accessible accessibilityLabel={t('commun.progression', { n: etape })}>
      <View style={styles.segments}>
        {[1, 2, 3].map((n) => (
          <View
            key={n}
            style={[styles.segment, { backgroundColor: n <= etape ? colors.action.primary : colors.border.subtle }]}
          />
        ))}
      </View>
      <Text style={[type.caption, { color: colors.text.secondary }]}>{t('commun.progression', { n: etape })}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bloc: { rowGap: space.s2, marginBottom: space.s4 },
  segments: { flexDirection: 'row', columnGap: space.s1 },
  segment: { flex: 1, height: size.progressHeight, borderRadius: radius.full },
});
