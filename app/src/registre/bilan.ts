import { ecrituresActives, soldeAttendu, type Etat } from '@bankvi/moteur';

import type { Bilan } from './store';

/** Dernier comptage d'une poche avant un horodatage (le début de la période à détailler). */
export function dernierComptage(etat: Etat, poche: string, avant: string): string | undefined {
  return ecrituresActives(etat.ecritures)
    .filter((e) => e.type === 'comptage' && e.poche === poche && e.at < avant)
    .map((e) => e.at)
    .pop();
}

/**
 * Écart du bilan : solde attendu − solde compté, sur toutes les poches comptées.
 * Recalculé en direct : une dépense ajoutée pendant le bilan, datée juste avant le comptage,
 * fait baisser l'écart sans changer le solde compté (EC-20).
 */
export function ecartActuel(etat: Etat, bilan: Bilan): number {
  return Object.entries(bilan.compte).reduce((s, [poche, compte]) => s + soldeAttendu(etat, poche, bilan.at) - compte, 0);
}

/** Ce qui a déjà été noté depuis le dernier comptage, dans les poches comptées. */
export function dejaNote(etat: Etat, bilan: Bilan): number {
  return Object.keys(bilan.compte).reduce((s, poche) => {
    const depuis = dernierComptage(etat, poche, bilan.at) ?? '';
    return (
      s +
      ecrituresActives(etat.ecritures)
        .filter((e) => e.type === 'depense' && e.poche === poche && e.at > depuis && e.at < bilan.at)
        .reduce((x, e) => x + (e.type === 'depense' ? e.montant : 0), 0)
    );
  }, 0);
}
