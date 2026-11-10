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

/** Identifiant de nature lu par les pots (moteur) : « Soutien familial » → `soutien-familial`. */
const IDS: Record<string, string> = {
  Besoin: 'besoin',
  Éducation: 'education',
  Envie: 'envie',
  Tontine: 'tontine',
  'Soutien familial': 'soutien-familial',
  'Solidarité et dons': 'solidarite',
  Épargne: 'epargne',
  Dette: 'dette',
  Imprévu: 'imprevu',
};
/** Natures ajoutées par une phrase de recette (EC-33) ; elles n'ont pas de catégorie. */
const AUTRES: Record<string, string> = { projet: 'projet', impot: 'impôt' };

/** La nature d'une catégorie, pour l'écriture : une dépense réduit le pot qui la lit. */
export const natureDe = (categorieId: string | undefined): string | undefined => {
  const c = categorie(categorieId);
  return c && c.sens === 'depense' ? IDS[c.nature] : undefined;
};

/** « soutien familial » : la nature en mots, pour les puces d'EC-28 et d'EC-34. */
export const libelleNature = (id: string): string =>
  (Object.entries(IDS).find(([, v]) => v === id)?.[0] ?? AUTRES[id] ?? id).toLowerCase();

/** Les catégories d'une nature, pour EC-34 : « Remboursement ». */
export const categoriesDeNature = (id: string): Categorie[] => CATEGORIES.filter((c) => c.sens === 'depense' && IDS[c.nature] === id);

/** Catégorie par défaut quand rien n'est déduit. */
export const PAR_DEFAUT = { depense: 'transport', revenu: 'autre-revenu' } as const;
