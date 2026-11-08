import type { NomIcone } from '@/icones/chemins';

export interface Categorie {
  id: string;
  nom: string;
  /** La nature sert à toutes les recettes : changer de recette ne demande aucune recatégorisation. */
  nature: string;
  sens: 'depense' | 'revenu';
  icone: NomIcone;
  /** Jamais prédite, et EC-48 au premier choix (non construit en P1 statique). */
  sensible?: boolean;
}

// Le design system ne fixe d'icône que pour quelques catégories (06-iconographie) ;
// les autres prennent celle de la charge libre, en attendant une liste complète.
const LIBRE: NomIcone = 'receipt_long';

const d = (id: string, nom: string, nature: string, icone: NomIcone = LIBRE, sensible = false): Categorie => ({
  id,
  nom,
  nature,
  sens: 'depense',
  icone,
  ...(sensible ? { sensible } : {}),
});
const r = (id: string, nom: string): Categorie => ({ id, nom, nature: 'Revenu', sens: 'revenu', icone: 'arrow_downward' });

/** Liste de départ d'EC-14 : 17 dépenses et 5 revenus. À vérifier en entretien. */
export const CATEGORIES: Categorie[] = [
  d('transport', 'Transport', 'Besoin'),
  d('dejeuner', 'Déjeuner', 'Besoin'),
  d('courses', 'Courses', 'Besoin'),
  d('loyer', 'Loyer', 'Besoin', 'home'),
  d('electricite', 'Électricité et eau', 'Besoin', 'bolt'),
  d('credit', 'Crédit téléphone', 'Besoin'),
  d('frais', 'Frais de retrait', 'Besoin'),
  d('sante', 'Santé', 'Besoin', LIBRE, true),
  d('ecole', 'École', 'Éducation', 'school'),
  d('sorties', 'Sorties', 'Envie'),
  d('habillement', 'Habillement', 'Envie'),
  d('tontine', 'Tontine', 'Tontine', 'groups'),
  d('famille', 'Famille', 'Soutien familial'),
  d('dons', 'Dons', 'Solidarité et dons'),
  d('epargne', 'Épargne', 'Épargne'),
  d('remboursement', 'Remboursement', 'Dette'),
  d('imprevus', 'Imprévus', 'Imprévu'),
  r('salaire', 'Salaire'),
  r('vente', 'Vente'),
  r('pret-rendu', 'Prêt rendu'),
  r('don-recu', 'Don reçu'),
  r('autre-revenu', 'Autre revenu'),
];

export const NATURES = ['Besoin', 'Éducation', 'Envie', 'Tontine', 'Soutien familial', 'Solidarité et dons', 'Épargne', 'Dette', 'Imprévu'];

export const categorie = (id: string | undefined): Categorie | undefined => CATEGORIES.find((c) => c.id === id);

/** Catégorie par défaut quand rien n'est déduit. */
export const PAR_DEFAUT = { depense: 'transport', revenu: 'autre-revenu' } as const;
