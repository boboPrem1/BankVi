import type { Etat } from '@bankvi/moteur';

import type { Parcours } from '@/parcours/store';

/** Les réponses de Camille au premier lancement : ce que « retrouve » un compte existant (EC-11). */
export const CAMILLE_REPONSES: Partial<Omit<Parcours, 'modifier' | 'reinitialiser'>> = {
  especes: 32000,
  mixx: 58000,
  flooz: null,
  sansMobile: false,
  typeRevenu: 'regulier',
  montantRevenu: 120000,
  jourRevenu: 28,
  charges: [
    { id: 'ecole', nom: 'École', icone: 'school', feminin: true, montant: 25000, jour: 3 },
    { id: 'loyer', nom: 'Loyer', icone: 'home', feminin: false, montant: 35000, jour: 5 },
    { id: 'electricite', nom: 'Électricité', icone: 'bolt', feminin: true, montant: 8000, jour: 15 },
    { id: 'tontine', nom: 'Tontine', icone: 'groups', feminin: true, montant: 10000, jour: 20 },
  ],
  preference: 'day',
  compte: true,
};

/**
 * Camille, salariée, le vendredi 6 novembre 2026 (fiches EC-04 à EC-06).
 * Écran de démonstration seulement : il disparaît quand le registre et EC-12 arrivent.
 */
export const CAMILLE: Etat = {
  aujourdhui: '2026-11-06',
  poches: [
    { id: 'especes', nom: 'Espèces', genre: 'perso' },
    { id: 'mixx', nom: 'Mixx', genre: 'perso' },
  ],
  ecritures: [
    { id: 'c-especes', at: '2026-11-06T07:00', type: 'comptage', poche: 'especes', montant: 32000 },
    { id: 'c-mixx', at: '2026-11-06T07:00', type: 'comptage', poche: 'mixx', montant: 58000 },
  ],
  revenus: [{ type: 'regulier', id: 'salaire', nom: 'Salaire', montant: 120000, jour: 28, depuis: '2026-11-06' }],
  prevus: [
    { id: 'ecole', nom: 'École', montant: 25000, sens: 'sortie', rythme: 'mensuel', jour: 3, depuis: '2026-11-06' },
    { id: 'loyer', nom: 'Loyer', montant: 35000, sens: 'sortie', rythme: 'mensuel', jour: 5, depuis: '2026-11-06' },
    { id: 'electricite', nom: 'Électricité', montant: 8000, sens: 'sortie', rythme: 'mensuel', jour: 15, depuis: '2026-11-06' },
    { id: 'tontine', nom: 'Tontine', montant: 10000, sens: 'sortie', rythme: 'mensuel', jour: 20, depuis: '2026-11-06' },
  ],
};
