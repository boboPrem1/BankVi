import { categorie } from '@/registre/categories';

const MOTS_SENSIBLES = [
  'sante',
  'medecin',
  'docteur',
  'hopital',
  'clinique',
  'pharmacie',
  'medicament',
  'maladie',
  'eglise',
  'mosquee',
  'temple',
  'dime',
  'offrande',
  'religion',
  'politique',
  'parti',
  'syndicat',
];

function normaliser(texte: string): string {
  return texte
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function estLibelleSensible(texte: string): boolean {
  const n = normaliser(texte);
  if (!n) return false;
  return MOTS_SENSIBLES.some((mot) => n.includes(mot));
}

export function estCategorieSensible(id: string): boolean {
  return Boolean(categorie(id)?.sensible);
}

export function cleSuggestion(categorieId: string, montant?: number, description?: string): string {
  const desc = description ? normaliser(description) : '';
  return `${categorieId}:${montant ?? 0}:${desc}`;
}

