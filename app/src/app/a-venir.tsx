import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { Ecran } from '@/composants/Ecran';
import { space, type, useTheme } from '@/theme';

/** Destination des liens vers des écrans hors du premier lancement (EC-32, conditions…). */
export default function AVenir() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { code } = useLocalSearchParams<{ code?: string }>();
  return (
    <Ecran titre={t('aVenir.titre', { code: code ?? '' })}>
      <Text style={[type.bodyLarge, { color: colors.text.secondary, marginTop: space.s4 }]}>{t('aVenir.texte')}</Text>
    </Ecran>
  );
}
