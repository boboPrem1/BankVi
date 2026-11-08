import '@/i18n';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { HoteBandeauBas } from '@/composants/BandeauBas';
import { useTheme } from '@/theme';

void SplashScreen.preventAutoHideAsync();

export default function Racine() {
  const { colors } = useTheme();

  // Aucun chargement à attendre : polices système, calculs locaux.
  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  return (
    <KeyboardProvider>
      {/* Bord à bord : barre d'état transparente, icônes sombres en clair, claires en sombre. */}
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg.canvas },
          // Écran suivant : il entre par la droite ; retour inverse, avec le geste prédictif d'Android.
          animation: 'slide_from_right',
          animationDuration: 300,
        }}
      >
        <Stack.Screen name="(onglets)" options={{ animation: 'fade' }} />
        {/* Noter monte du bas en 300 ms, le clavier déjà ouvert à la fin. */}
        <Stack.Screen name="noter" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="bilan/compter" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="bilan/resultat" options={{ animation: 'fade', gestureEnabled: false }} />
        <Stack.Screen name="statut" options={{ animation: 'fade' }} />
      </Stack>
      {/* Le bandeau bas survit au changement d'écran. */}
      <HoteBandeauBas />
    </KeyboardProvider>
  );
}
