import type { Pot, Recette } from '@bankvi/moteur';

/** Mots connus et nature lue (EC-33). Un autre mot donne un pot libre, sans nature. */
const MOTS: Record<string, string> = {
  besoin: 'besoin',
  besoins: 'besoin',
  epargne: 'epargne',
  plaisir: 'envie',
  plaisirs: 'envie',
  envie: 'envie',
  envies: 'envie',
  projet: 'projet',
  projets: 'projet',
};

const sansAccent = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export type Lecture =
  | { type: 'vide' }
  | { type: 'incompris' }
  | { type: 'somme'; somme: number; pots: { pct: number; nom: string }[] }
  | { type: 'ok'; pots: { pct: number; nom: string; nature?: string }[] };

/**
 * Lit « 45 besoins, 25 épargne » ou « 45 / 25 / 25 / 5 ». Déterministe, sans IA : il reconnaît
 * les nombres et les mots connus, ne devine jamais un nombre. Le texte reste du texte simple.
 */
export function lirePhrase(phrase: string): Lecture {
  const texte = phrase.trim();
  if (!texte) return { type: 'vide' };
  const morceaux = texte.split(/\s*(?:,|;|\/|\bet\b)\s*/).filter(Boolean);
  const pots: { pct: number; nom: string; nature?: string }[] = [];
  for (const m of morceaux) {
    const r = /^(\d{1,3})\s*%?\s*(.*)$/.exec(m.trim());
    if (!r) return { type: 'incompris' };
    const nom = r[2]!.replace(/[<>{}[\]`]/g, '').trim().slice(0, 24);
    const nature = MOTS[sansAccent(nom)];
    pots.push({ pct: Number(r[1]), nom: nom ? nom.charAt(0).toUpperCase() + nom.slice(1) : '', ...(nature ? { nature } : {}) });
  }
  if (pots.length === 0 || pots.length > 12) return { type: 'incompris' };
  const somme = pots.reduce((s, p) => s + p.pct, 0);
  if (somme !== 100) return { type: 'somme', somme, pots };
  return { type: 'ok', pots };
}

/** La recette d'une phrase comprise : besoins et envies forment le quotidien. */
export function recetteDePhrase(pots: { pct: number; nom: string; nature?: string }[], id: string): Recette {
  const quotidiens = pots.some((p) => p.nature === 'besoin' || p.nature === 'envie');
  const liste: Pot[] = pots.map((p, i) => ({
    id: `pot-${i + 1}`,
    nom: p.nom,
    regle: { type: 'pourcentage', valeur: p.pct },
    quotidien: quotidiens ? p.nature === 'besoin' || p.nature === 'envie' : i === 0,
    ...(p.nature ? { natures: [p.nature] } : {}),
  }));
  return { id, nom: pots.map((p) => p.pct).join(' / '), pots: liste };
}
