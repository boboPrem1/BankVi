import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { BAS_PIED, useBandeauBas } from './BandeauBas';

/**
 * Déclare la hauteur fixée en bas de l'écran (barre d'action, onglets) tant qu'il a le focus :
 * le bandeau « Annuler » se place 8 dp au-dessus, sans rien recouvrir.
 */
export function useBasDEcran(bas: number) {
  useFocusEffect(
    useCallback(() => {
      useBandeauBas.getState().fixerBas(bas);
      return () => useBandeauBas.getState().fixerBas(BAS_PIED);
    }, [bas]),
  );
}
