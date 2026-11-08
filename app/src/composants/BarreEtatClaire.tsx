import { useFocusEffect } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { useCallback } from 'react';

/**
 * Sur un paysage (accueil, statut, fin du bilan), les icônes de la barre d'état passent en blanc,
 * quel que soit le thème, puis reviennent au réglage du thème en quittant l'écran.
 */
export function useBarreEtatClaire() {
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('light');
      return () => setStatusBarStyle('auto');
    }, []),
  );
}
