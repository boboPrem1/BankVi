import type { Mouvement, PointHorizon } from '@bankvi/moteur';

import type { NomIcone } from '@/icones/chemins';
import type { Charge } from '@/parcours/store';

import { categorie } from './categories';
import type { PrevuSaisi } from './store';

/** Ce qui arrive sur la durée affichée, dans l'ordre des dates (liste « À venir » d'EC-23). */
export function aVenir(points: PointHorizon[]): Mouvement[] {
  return points.slice(1).flatMap((p) => p.mouvements);
}

/** Icône de la catégorie : celle de la charge déclarée, de l'événement, ou du revenu. */
export function iconeMouvement(m: Mouvement, charges: Charge[], prevus: PrevuSaisi[]): NomIcone {
  const charge = charges.find((c) => c.id === m.id);
  if (charge) return charge.icone;
  const saisi = prevus.find((p) => p.prevu.id === m.id);
  if (saisi) return categorie(saisi.categorie)?.icone ?? 'receipt_long';
  return m.montant > 0 ? 'arrow_downward' : 'receipt_long';
}

/**
 * Les dépenses supposées d'aujourd'hui jusqu'à un point, par rythme : chaque jour retire
 * le chiffre en vigueur la veille (le rythme change à la date de référence).
 */
export function depensesSupposees(points: PointHorizon[], jusqua: number): { jours: number; chiffre: number }[] {
  const runs: { jours: number; chiffre: number }[] = [];
  for (let i = 1; i <= jusqua; i++) {
    const chiffre = points[i - 1]!.chiffre;
    const dernier = runs[runs.length - 1];
    if (dernier && dernier.chiffre === chiffre) dernier.jours += 1;
    else runs.push({ jours: 1, chiffre });
  }
  return runs.filter((r) => r.chiffre > 0);
}
