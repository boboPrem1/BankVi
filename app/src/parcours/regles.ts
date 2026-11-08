/** Jour du mois accepté par EC-04 et EC-05 : de 1 à 31 ; un mois plus court prend son dernier jour. */
export const jourValide = (j: number | null): j is number => j !== null && j >= 1 && j <= 31;

/** Lit un jour tapé au clavier : chiffres seulement, vide si rien. */
export const lireJour = (texte: string): number | null => {
  const c = texte.replace(/\D/g, '').slice(0, 2);
  return c === '' ? null : Number(c);
};
