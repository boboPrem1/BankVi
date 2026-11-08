import { create } from 'zustand';

import type { NomIcone } from '@/icones/chemins';

/** Date fictive des fiches : vendredi 6 novembre 2026. Tous les exemples en dépendent. */
export const AUJOURDHUI = '2026-11-06';

export type TypeRevenu = 'regulier' | 'variable';

export interface Charge {
  id: string;
  nom: string;
  icone: NomIcone;
  /** Accord du participe dans les annonces : « Électricité retirée ». */
  feminin: boolean;
  montant: number;
  jour: number;
}

export interface Parcours {
  // EC-03
  especes: number | null;
  mixx: number | null;
  flooz: number | null;
  sansMobile: boolean;
  // EC-04
  typeRevenu: TypeRevenu | null;
  montantRevenu: number | null;
  jourRevenu: number | null;
  // EC-05
  charges: Charge[];
  // EC-07 et EC-08
  recetteChoisie: string | null;
  recetteAdoptee: string | null;
  // EC-09
  preference: 'day' | 'evening';
  heure: { h: number; m: number };
  // EC-10 et EC-11
  numero: string;
  compte: boolean;

  modifier: (p: Partial<Omit<Parcours, 'modifier' | 'reinitialiser'>>) => void;
  reinitialiser: () => void;
}

const DEPART = {
  especes: null,
  mixx: null,
  flooz: null,
  sansMobile: false,
  typeRevenu: null,
  montantRevenu: null,
  jourRevenu: null,
  charges: [],
  recetteChoisie: null,
  recetteAdoptee: null,
  preference: 'day',
  heure: { h: 20, m: 0 },
  numero: '',
  compte: false,
} satisfies Omit<Parcours, 'modifier' | 'reinitialiser'>;

/**
 * Les réponses du premier lancement, en mémoire seulement : les écrans sont statiques,
 * rien n'est écrit sur le téléphone ni envoyé.
 */
export const useParcours = create<Parcours>()((set) => ({
  ...DEPART,
  modifier: (p) => set(p),
  reinitialiser: () => set(DEPART),
}));
