import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { size, space, type, useTheme } from '@/theme';

/** Onglet dont les écrans ne sont pas encore construits (EC-23, EC-27, EC-37). */
export function OngletAVenir({ code }: { code: string }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.ecran, { backgroundColor: colors.bg.canvas, paddingTop: insets.top + space.s4 }]}>
      <Text style={[type.appbar, { color: colors.text.primary }]} accessibilityRole="header">
        {t('aVenir.titre', { code })}
      </Text>
      <Text style={[type.bodyLarge, { color: colors.text.secondary }]}>{t('aVenir.texte')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1, paddingHorizontal: size.gutterList, rowGap: space.s4 },
});
