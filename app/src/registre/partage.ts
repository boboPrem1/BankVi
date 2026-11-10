import { erreursRecette, type Pot, type Recette } from '@bankvi/moteur';

/**
 * Ce qui part dans un lien de recette : noms des pots, règles, natures lues. Jamais de montant
 * (sauf la valeur d'un pot fixe, qui est une règle), de revenu, de solde, de nom ni de numéro.
 */
interface Paquet {
  n: string;
  p: [nom: string, regle: 'p' | 'f' | 'r', valeur: number, quotidien: 0 | 1, natures: string[]][];
}

export function lienDe(r: Recette): string {
  const paquet: Paquet = {
    n: r.nom.slice(0, 40),
    p: r.pots.map((x) => [x.nom, x.regle.type === 'pourcentage' ? 'p' : x.regle.type === 'fixe' ? 'f' : 'r', x.regle.type === 'reste' ? 0 : x.regle.valeur, x.quotidien ? 1 : 0, x.natures ?? []]),
  };
  return `bankvi://recette-recue?d=${encodeURIComponent(JSON.stringify(paquet))}`;
}

const TEXTE = /^[^<>{}[\]`\\/:]{1,24}$/;
const NATURE = /^[a-z-]{1,24}$/;
const NOM = /^[^<>{}[\]`\:]{1,48}$/;

/**
 * Lit une recette reçue : entrée non fiable. Données seules, validées une à une ; texte simple
 * de 24 caractères au plus ; 12 pots au plus ; somme à 100 %. Sinon : undefined.
 */
export function lireLien(d: string | undefined, id: string): Recette | undefined {
  if (!d || d.length > 4000) return undefined;
  let brut: unknown;
  try {
    brut = JSON.parse(d);
  } catch {
    return undefined;
  }
  if (typeof brut !== 'object' || brut === null) return undefined;
  const { n, p } = brut as Record<string, unknown>;
  if (typeof n !== 'string' || !NOM.test(n) || !Array.isArray(p) || p.length === 0 || p.length > 12) return undefined;
  const pots: Pot[] = [];
  for (const [i, x] of p.entries()) {
    if (!Array.isArray(x) || x.length !== 5) return undefined;
    const [nom, regle, valeur, quotidien, natures] = x as unknown[];
    if (typeof nom !== 'string' || !TEXTE.test(nom)) return undefined;
    if (regle !== 'p' && regle !== 'f' && regle !== 'r') return undefined;
    if (typeof valeur !== 'number' || !Number.isInteger(valeur) || valeur < 0 || valeur > 100_000_000) return undefined;
    if (quotidien !== 0 && quotidien !== 1) return undefined;
    if (!Array.isArray(natures) || natures.length > 12 || !natures.every((m) => typeof m === 'string' && NATURE.test(m))) return undefined;
    pots.push({
      id: `pot-${i + 1}`,
      nom,
      regle: regle === 'r' ? { type: 'reste' } : { type: regle === 'p' ? 'pourcentage' : 'fixe', valeur },
      quotidien: quotidien === 1,
      ...(natures.length ? { natures: natures as string[] } : {}),
    });
  }
  const recette: Recette = { id, nom: n, pots };
  return erreursRecette(recette).length === 0 ? recette : undefined;
}

/** Deux recettes identiques : mêmes pots, mêmes règles. */
export const memeRecette = (a: Recette, b: Recette) =>
  a.pots.length === b.pots.length && a.pots.every((p, i) => p.nom === b.pots[i]!.nom && JSON.stringify(p.regle) === JSON.stringify(b.pots[i]!.regle));
