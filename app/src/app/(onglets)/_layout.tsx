import { Tabs } from 'expo-router/tabs';

import { BarreOnglets } from '@/composants/BarreOnglets';
import { useTheme } from '@/theme';

/** Les quatre onglets. Changement sans glissement ; le retour Android ferme l'app depuis l'accueil. */
export default function Onglets() {
  const { colors } = useTheme();
  return (
    <Tabs
      tabBar={(props) => <BarreOnglets {...props} />}
      backBehavior="history"
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.bg.canvas } }}
    >
      <Tabs.Screen name="accueil" />
      <Tabs.Screen name="horizon" />
      <Tabs.Screen name="pots" />
      <Tabs.Screen name="plus" />
    </Tabs>
  );
}
