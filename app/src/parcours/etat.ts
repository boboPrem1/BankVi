import { CATALOGUE, datePremierEffet, type Ecriture, type Etat, type Poche, type Prevu, type Recette } from '@bankvi/moteur';

import { useRegistre } from '@/registre/store';

import { AUJOURDHUI, type Parcours } from './store';

type Reponses = Omit<Parcours, 'modifier' | 'reinitialiser'>;

/** Traduit les réponses du parcours en état pour le moteur. Aucun calcul ici. */
export function etatDepuis(r: Reponses, recette?: Recette): Etat {
  const poches: Poche[] = [];
  const ecritures: Ecriture[] = [];
  const ajouter = (id: string, nom: string, montant: number | null) => {
    if (montant === null) return; // Vide : la poche n'est pas créée (EC-03).
    poches.push({ id, nom, genre: 'perso' });
    ecritures.push({ id: `comptage-${id}`, at: `${AUJOURDHUI}T07:00`, type: 'comptage', poche: id, montant });
  };
  ajouter('especes', 'Espèces', r.especes ?? 0);
  if (!r.sansMobile) {
    ajouter('mixx', 'Mixx', r.mixx);
    ajouter('flooz', 'Flooz', r.flooz);
  }

  const revenus: Etat['revenus'] = [];
  if (r.typeRevenu === 'regulier' && r.montantRevenu && r.jourRevenu) {
    revenus.push({ type: 'regulier', id: 'revenu', nom: 'Salaire', montant: r.montantRevenu, jour: r.jourRevenu, depuis: AUJOURDHUI });
  } else if (r.typeRevenu === 'variable') {
    revenus.push({ type: 'variable', id: 'revenu', nom: 'Mon activité', plancher: r.montantRevenu ?? 0, depuis: AUJOURDHUI });
  }

  const prevus: Prevu[] = r.charges.map((c) => ({
    id: c.id,
    nom: c.nom,
    montant: c.montant,
    sens: 'sortie',
    rythme: 'mensuel',
    jour: c.jour,
    depuis: AUJOURDHUI,
  }));

  const etat: Etat = { aujourdhui: AUJOURDHUI, poches, ecritures, revenus, prevus };
  // Une recette adoptée n'agit qu'à partir du prochain cycle, jamais avant (EC-27).
  const adoptee = recette ?? (r.recetteAdoptee ? recetteParId(r.recetteAdoptee) : undefined);
  return adoptee ? { ...etat, recettes: [{ recette: adoptee, effetDepuis: datePremierEffet(etat) }] } : etat;
}

/** Une recette du catalogue, ou une recette ajustée, écrite ou reçue. */
export function recetteParId(id: string): Recette | undefined {
  return (CATALOGUE as Record<string, Recette>)[id] ?? useRegistre.getState().recettesPerso.find((r) => r.id === id);
}

export const totalCharges = (r: Pick<Reponses, 'charges'>) => r.charges.reduce((s, c) => s + c.montant, 0);
