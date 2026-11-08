/** Pas d'axe rond, à toute échelle : 1, 2, 2,5 ou 5 × 10ⁿ, pour 3 ou 4 graduations au plus. */
export function pasRond(etendue: number): number {
  const brut = Math.max(etendue, 100) / 3;
  const puissance = 10 ** Math.floor(Math.log10(brut));
  for (const m of [1, 2, 2.5, 5, 10]) {
    if (m * puissance >= brut) return Math.max(100, m * puissance);
  }
  return 10 * puissance;
}
