const ESPACE_INSECABLE = ' ';
const MOINS = '−';

/**
 * « 12 500 » : entier, espace insécable pour les milliers, signe moins U+2212.
 * Écrit à la main plutôt qu'avec Intl : Hermes et les versions d'Android ne rendent pas
 * tous le même séparateur pour « fr ».
 */
export function nombre(montant: number): string {
  if (!Number.isInteger(montant)) throw new Error(`Montant non entier : ${montant}`);
  const chiffres = String(Math.abs(montant)).replace(/\B(?=(\d{3})+(?!\d))/g, ESPACE_INSECABLE);
  return montant < 0 ? MOINS + chiffres : chiffres;
}

/** « 12 500 FCFA », jamais coupé du nombre. */
export function fcfa(montant: number): string {
  return `${nombre(montant)}${ESPACE_INSECABLE}FCFA`;
}