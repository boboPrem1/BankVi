import { router } from 'expo-router';

import { annoncer } from '@/composants/BandeauBas';

/**
 * Fin du premier lancement : l'accueil devient le seul écran de la pile,
 * et le retour Android ferme l'app au lieu de revenir dans le parcours.
 */
export function terminerParcours(message?: string) {
  if (router.canDismiss()) router.dismissAll();
  router.replace('/accueil');
  if (message) annoncer(message);
}
