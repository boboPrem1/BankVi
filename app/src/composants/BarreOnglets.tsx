import { router } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/tabs';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icone } from '@/icones/Icone';
import type { NomIcone } from '@/icones/chemins';
import { radius, size, space, type, useTheme } from '@/theme';

type Route = 'accueil' | 'horizon' | 'pots' | 'plus';

const ONGLETS: { route: Route; icone: NomIcone }[] = [
  { route: 'accueil', icone: 'today' },
  { route: 'horizon', icone: 'show_chart' },
  { route: 'pots', icone: 'savings' },
  { route: 'plus', icone: 'menu' },
];
const LIBELLES = { accueil: 'aujourdhui', horizon: 'horizon', pots: 'pots', plus: 'plus' } as const;

/**
 * Barre du bas (design system, navigation) : 72 dp, quatre onglets, l'actif sur une pastille
 * vert pâle de 56 × 32 dp avec l'icône pleine.
 */
export function Onglets({ actif, onOnglet, bas }: { actif: Route; onOnglet: (route: Route) => void; bas: number }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <View
      accessibilityRole="tablist"
      style={[styles.barre, { backgroundColor: colors.bg.canvas, borderTopColor: colors.border.subtle, paddingBottom: bas }]}
    >
      {ONGLETS.map((o) => {
        const choisi = o.route === actif;
        return (
          <Pressable
            key={o.route}
            accessibilityRole="tab"
            accessibilityState={{ selected: choisi }}
            accessibilityLabel={t(`onglets.${LIBELLES[o.route]}`)}
            onPress={() => onOnglet(o.route)}
            style={styles.onglet}
          >
            <View style={[styles.pastille, choisi ? { backgroundColor: colors.bg.selected } : null]}>
              <Icone nom={o.icone} plein={choisi} couleur={choisi ? colors.text.onSelected : colors.text.secondary} />
            </View>
            <Text style={[type.captionMedium, { color: choisi ? colors.text.primary : colors.text.secondary }]}>
              {t(`onglets.${LIBELLES[o.route]}`)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** La barre du navigateur d'onglets. */
export function BarreOnglets({ state, navigateToTab, insets }: BottomTabBarProps) {
  const courante = state.routes[state.index]?.name as Route;
  return (
    <Onglets
      actif={courante}
      bas={insets.bottom}
      onOnglet={(route) => {
        const r = state.routes.find((x) => x.name === route);
        if (r && route !== courante) navigateToTab(r.key);
      }}
    />
  );
}

/** La même barre, posée sur un écran de l'onglet Aujourd'hui hors du navigateur (EC-17). */
export function OngletsAujourdhui() {
  const insets = useSafeAreaInsets();
  return (
    <Onglets
      actif="accueil"
      bas={insets.bottom}
      onOnglet={(route) => (route === 'accueil' ? router.back() : router.dismissTo(`/${route}`))}
    />
  );
}

const styles = StyleSheet.create({
  barre: { flexDirection: 'row', borderTopWidth: 1 },
  onglet: { flex: 1, height: size.bottomNav, alignItems: 'center', justifyContent: 'center', rowGap: space.s1 },
  pastille: { width: 56, height: 32, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center' },
});
