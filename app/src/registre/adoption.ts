import type { Etat, Recette } from '@bankvi/moteur';
import { router } from 'expo-router';

import { annoncer } from '@/composants/BandeauBas';
import { useParcours } from '@/parcours/store';

import { natureDe } from './categories';
import { aRanger, adopter, enAttente } from './pots';

/**
 * Adopte une recette nouvelle, en passant par EC-34 si une nature utilisée n'est lue par aucun
 * pot. Ensuite : Ma recette, avec le bandeau et son « Annuler ».
 */
export function adopterOuRanger(etat: Etat, recette: Recette, message: string) {
  if (aRanger(etat, recette, useParcours.getState().charges, natureDe).length > 0) {
    enAttente.recette = recette;
    enAttente.message = message;
    router.push('/natures');
    return;
  }
  const annuler = adopter(etat, recette);
  router.dismissTo('/recette');
  annoncer(message, annuler);
}
