import type { DateISO } from "./dates";
import type { Etat, Montant, Pot, Recette, RecetteActive } from "./types";

const pot = (id: string, nom: string, valeur: number, quotidien = false, natures?: string[]): Pot => ({
  id,
  nom,
  regle: { type: "pourcentage", valeur },
  quotidien,
  ...(natures ? { natures } : {}),
});

/** Catalogue de 4 recettes, en données (REC-01, REC-02). */
export const CATALOGUE = {
  "50-30-20": {
    id: "50-30-20",
    nom: "50 / 30 / 20",
    pots: [
      pot("besoins", "Besoins", 50, true),
      pot("envies", "Envies", 30, true),
      pot("epargne-dettes", "Épargne et dettes", 20, false, ["epargne", "dette"]),
    ],
  },
  "70-20-10": {
    id: "70-20-10",
    nom: "70 / 20 / 10",
    pots: [
      pot("vie-courante", "Vie courante", 70, true),
      pot("epargne", "Épargne", 20, false, ["epargne"]),
      pot("dettes-dons", "Dettes ou dons", 10, false, ["dette", "solidarite"]),
    ],
  },
  "payez-vous-d-abord": {
    id: "payez-vous-d-abord",
    nom: "Payez-vous d'abord",
    pots: [pot("epargne", "Épargne", 20, false, ["epargne"]), pot("libre", "Libre", 80, true)],
  },
  "plancher-prudent": {
    id: "plancher-prudent",
    nom: "Revenu plancher prudent",
    surPlancher: true,
    pots: [
      pot("vie-courante", "Vie courante", 70, true),
      pot("imprevus", "Imprévus", 20, false, ["imprevu"]),
      pot("epargne", "Épargne", 10, false, ["epargne"]),
      { id: "le-reste", nom: "Le reste", regle: { type: "reste" }, quotidien: false },
    ],
  },
} satisfies Record<string, Recette>;

/** Vérifie une recette reçue ou ajustée : c'est de la donnée, jamais du code (REC-01, REC-04). */
export function erreursRecette(r: Recette): string[] {
  const erreurs: string[] = [];
  const pcts = r.pots.filter((p) => p.regle.type === "pourcentage");
  const somme = pcts.reduce((s, p) => s + (p.regle.type === "pourcentage" ? p.regle.valeur : 0), 0);
  const restes = r.pots.filter((p) => p.regle.type === "reste").length;
  if (pcts.length > 0 && somme !== 100) erreurs.push(`La somme des pourcentages est de ${somme} %`);
  if (restes > 1) erreurs.push("Un seul pot « Le reste » par recette");
  if (new Set(r.pots.map((p) => p.id)).size !== r.pots.length) erreurs.push("Deux pots portent le même identifiant");
  for (const p of r.pots) {
    if (p.regle.type !== "reste" && (!Number.isInteger(p.regle.valeur) || p.regle.valeur < 0)) {
      erreurs.push(`Valeur invalide pour ${p.nom}`);
    }
  }
  return erreurs;
}

/**
 * Répartit une base dans l'ordre : montants fixes, pourcentages, reste.
 * Chaque part s'arrondit à la baisse à 100 FCFA, et le dernier pot prend ce qu'il reste :
 * la somme des parts égale toujours la base.
 */
export function repartir(
  base: Montant,
  recette: Recette,
  fixeDejaVerse: Record<string, Montant> = {},
): Record<string, Montant> {
  const parts: Record<string, Montant> = {};
  let restant = base;
  for (const p of recette.pots) {
    if (p.regle.type !== "fixe") continue;
    const part = Math.min(restant, Math.max(0, p.regle.valeur - (fixeDejaVerse[p.id] ?? 0)));
    parts[p.id] = part;
    restant -= part;
  }
  const assiette = restant;
  const pcts = recette.pots.filter((p) => p.regle.type === "pourcentage");
  const reste = recette.pots.find((p) => p.regle.type === "reste");
  const dernier = reste ?? pcts[pcts.length - 1];
  for (const p of pcts) {
    if (p === dernier || p.regle.type !== "pourcentage") continue;
    const part = Math.floor((assiette * p.regle.valeur) / 100 / 100) * 100;
    parts[p.id] = part;
    restant -= part;
  }
  if (dernier) parts[dernier.id] = restant;
  return parts;
}

/** Ce qu'une base envoie dans les pots réservés, donc hors du chiffre du jour. */
export function partReservee(base: Montant, recette: Recette): Montant {
  const parts = repartir(base, recette);
  return recette.pots.filter((p) => !p.quotidien).reduce((s, p) => s + (parts[p.id] ?? 0), 0);
}

export function recetteActive(etat: Pick<Etat, "recettes">, date: DateISO): Recette | undefined {
  let active: RecetteActive | undefined;
  for (const r of etat.recettes ?? []) if (r.effetDepuis <= date) active = r;
  return active?.recette;
}

export type ChoixRecette = { recette: Recette; raison: "revenu-variable" | "charges" | "sans-charge"; chargesPct?: number };

/** La recette la plus proche, d'après des faits simples (EC-07). Ce n'est pas un conseil. */
export function recettePlusProche(entree: { variable: boolean; revenuMensuel: Montant; chargesMensuelles: Montant }): ChoixRecette {
  if (entree.variable) return { recette: CATALOGUE["plancher-prudent"], raison: "revenu-variable" };
  if (entree.chargesMensuelles === 0) return { recette: CATALOGUE["50-30-20"], raison: "sans-charge" };
  const chargesPct = Math.round((entree.chargesMensuelles * 100) / entree.revenuMensuel);
  return {
    recette: chargesPct >= 60 ? CATALOGUE["70-20-10"] : CATALOGUE["50-30-20"],
    raison: "charges",
    chargesPct,
  };
}
