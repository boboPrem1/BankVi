import type { Ecriture, Etat, Poche, Prevu } from "../src";

export const POCHES: Poche[] = [
  { id: "especes", nom: "Espèces", genre: "perso" },
  { id: "mixx", nom: "Mixx", genre: "perso" },
  { id: "flooz", nom: "Flooz", genre: "perso" },
  { id: "activite", nom: "Activité", genre: "activite" },
];

export const charge = (id: string, nom: string, montant: number, jour: number, depuis = "2026-11-06"): Prevu => ({
  id,
  nom,
  montant,
  sens: "sortie",
  rythme: "mensuel",
  jour,
  depuis,
});

export const comptage = (id: string, poche: string, montant: number, at = "2026-11-06T07:00"): Ecriture => ({
  id,
  at,
  type: "comptage",
  poche,
  montant,
});

/** Camille, salariée, le vendredi 6 novembre 2026 (EC-04, EC-05, EC-06). */
export function camille(modif: Partial<Etat> = {}): Etat {
  return {
    aujourdhui: "2026-11-06",
    poches: POCHES,
    ecritures: [comptage("c-especes", "especes", 32000), comptage("c-mixx", "mixx", 58000)],
    revenus: [{ type: "regulier", id: "salaire", nom: "Salaire", montant: 120000, jour: 28, depuis: "2026-11-06" }],
    prevus: [
      charge("ecole", "École", 25000, 3),
      charge("loyer", "Loyer", 35000, 5),
      charge("electricite", "Électricité", 8000, 15),
      charge("tontine", "Tontine", 10000, 20),
    ],
    ...modif,
  };
}

/** Karim, indépendant, au revenu variable, le même jour. */
export function karim(modif: Partial<Etat> = {}): Etat {
  return {
    aujourdhui: "2026-11-06",
    poches: POCHES,
    ecritures: [comptage("k-especes", "especes", 45000), comptage("k-mixx", "mixx", 20000)],
    revenus: [{ type: "variable", id: "activite", nom: "Mon activité", plancher: 90000, depuis: "2026-11-06" }],
    prevus: [charge("loyer", "Loyer", 15000, 10), charge("telephone", "Téléphone", 6000, 18)],
    ...modif,
  };
}
