import { dansMois, debutDuMois, ecartJours, joursDuMois, type DateISO } from "./dates";
import { calculer, cycleDe, horizon, premierManque } from "./prevision";
import { partReservee, repartir } from "./recettes";
import { dateDe } from "./registre";
import type { Etat, Montant, Prevu, Recette, SourceRevenu } from "./types";

export type EtatStatut = "suit" | "resserre" | "serre" | "manque";

/** 90 % ou plus : ça suit. De 60 à 90 % : ça se resserre. Moins de 60 % : serré. Seuils à calibrer. */
export function classerStatut(chiffre: Montant, chiffreDebut: Montant): Exclude<EtatStatut, "manque"> {
  if (chiffreDebut <= 0) return chiffre > 0 ? "suit" : "serre";
  if (chiffre * 100 >= chiffreDebut * 90) return "suit";
  if (chiffre * 100 >= chiffreDebut * 60) return "resserre";
  return "serre";
}

function debutCycleCourant(etat: Etat): { debut: DateISO; total: number } {
  const d = etat.aujourdhui;
  const cycle = cycleDe(etat, d);
  const variable = etat.revenus.some((s) => s.type === "variable" && s.depuis <= d);
  const reguliers = etat.revenus.filter((s): s is Extract<SourceRevenu, { type: "regulier" }> => s.type === "regulier");
  if (variable || reguliers.length === 0) return { debut: debutDuMois(d), total: joursDuMois(d) };
  const passes = reguliers.map((s) => {
    const ceMois = dansMois(d, 0, s.jour);
    return ceMois <= d ? ceMois : dansMois(d, -1, s.jour);
  });
  const debut = passes.reduce((a, b) => (a > b ? a : b));
  return { debut, total: ecartJours(debut, cycle.reference) };
}

export interface Statut {
  etat: EtatStatut;
  chiffre: Montant;
  chiffreDebut: Montant;
  /** Position du soleil dans le paysage : jours écoulés sur jours du cycle (EC-50). */
  soleil: { ecoules: number; total: number };
}

/** L'état du statut du jour. Une dépense du premier jour ne change pas le chiffre de référence. */
export function statutDuJour(etat: Etat): Statut {
  const calcul = calculer(etat);
  const { debut, total } = debutCycleCourant(etat);
  const premiere = etat.ecritures.reduce<DateISO>((m, e) => (dateDe(e.at) < m ? dateDe(e.at) : m), etat.aujourdhui);
  const depart = debut > premiere ? debut : premiere;
  const ecritures = etat.ecritures.filter((e) => {
    const date = dateDe(e.at);
    if (date < depart) return true;
    return date === depart && e.type !== "depense" && e.type !== "transfert";
  });
  const chiffreDebut = calculer({ ...etat, aujourdhui: depart, ecritures }).chiffre;
  return {
    etat: calcul.manque !== undefined ? "manque" : classerStatut(calcul.chiffre, chiffreDebut),
    chiffre: calcul.chiffre,
    chiffreDebut,
    soleil: { ecoules: ecartJours(debut, etat.aujourdhui), total },
  };
}

export interface ResultatSimulation {
  avant: Montant;
  apres: Montant;
  jusqua: DateISO;
  /** Le chiffre ne bouge pas avant la référence si la dépense tombe après elle. */
  avantReferenceInchange: boolean;
  manque?: { montant: Montant; date: DateISO };
  ensuite?: { chiffre: Montant; depuis: DateISO; jusqua: DateISO; manque?: Montant };
}

/** « Puis-je me permettre ça ? » : calcule sur une copie, aucune écriture n'est créée (EC-25). */
export function simuler(etat: Etat, depense: { montant: Montant; date: DateISO }): ResultatSimulation {
  const hypothese: Prevu = {
    id: "__simulation",
    nom: "Simulation",
    montant: depense.montant,
    sens: "sortie",
    rythme: "une-fois",
    date: depense.date,
  };
  const copie: Etat = { ...etat, prevus: [...etat.prevus, hypothese] };
  const avant = calculer(etat);
  const apres = calculer(copie);
  const resultat: ResultatSimulation = {
    avant: avant.chiffre,
    apres: apres.chiffre,
    jusqua: apres.reference,
    avantReferenceInchange: apres.chiffre === avant.chiffre && depense.date >= apres.reference,
  };
  if (apres.manque !== undefined) {
    const point = premierManque(copie);
    resultat.manque = { montant: apres.manque, date: point?.date ?? apres.reference };
  }
  if (depense.date >= cycleDe(etat, etat.aujourdhui).debutSuivant) {
    const suite = horizon(copie, ecartJours(etat.aujourdhui, depense.date) + 1).recalculs;
    const dernier = [...suite].reverse().find((r) => r.date <= depense.date);
    if (dernier) {
      resultat.ensuite = {
        chiffre: dernier.chiffre,
        depuis: dernier.date,
        jusqua: dernier.reference,
        ...(dernier.reste < 0 ? { manque: -dernier.reste } : {}),
      };
    }
  }
  return resultat;
}

/** À partir de quand une recette adoptée aujourd'hui agit : le prochain cycle, jamais avant (EC-27). */
export function datePremierEffet(etat: Etat): DateISO {
  return cycleDe(etat, etat.aujourdhui).debutSuivant;
}

export interface EffetRecette {
  depuis: DateISO;
  chiffre: Montant;
  /** Présent si les charges et les pots dépasseraient l'argent. */
  manque?: Montant;
}

/** Ce qu'il resterait par jour avec cette recette, à partir du prochain cycle (EC-07, EC-08). */
export function effetRecette(etat: Etat, recette?: Recette): EffetRecette {
  const depuis = datePremierEffet(etat);
  const copie: Etat = recette
    ? { ...etat, recettes: [...(etat.recettes ?? []), { recette, effetDepuis: depuis }] }
    : etat;
  const premier = horizon(copie, ecartJours(etat.aujourdhui, depuis)).recalculs[0];
  if (!premier) throw new Error("Aucun recalcul avant le prochain cycle");
  return {
    depuis,
    chiffre: premier.chiffre,
    ...(premier.reste < 0 ? { manque: -premier.reste } : {}),
  };
}

export interface RepartitionImmediate {
  parts: Record<string, Montant>;
  reserve: Montant;
  chiffreAvant: Montant;
  chiffreApres: Montant;
}

/** « Répartir mon argent maintenant » : la recette s'applique au reste à vivre, jamais à l'argent des charges (POT-12). */
export function repartirMaintenant(etat: Etat, recette: Recette): RepartitionImmediate | undefined {
  const c = calculer(etat);
  if (c.resteAVivre < 0) return undefined;
  const toutes = repartir(c.resteAVivre, recette);
  const parts = Object.fromEntries(
    recette.pots.filter((p) => !p.quotidien).map((p) => [p.id, toutes[p.id] ?? 0]),
  );
  const reserve = partReservee(c.resteAVivre, recette);
  return {
    parts,
    reserve,
    chiffreAvant: c.chiffre,
    chiffreApres: Math.floor((c.resteAVivre - reserve) / c.jours / 100) * 100,
  };
}

export interface LigneExplication {
  libelle: string;
  montant: Montant;
  date?: DateISO;
}

/** Chaque chiffre s'explique, jusqu'à sa saisie ou sa règle (PRV-08, EC-24). */
export function expliquer(etat: Etat): { lignes: LigneExplication[]; resteAVivre: Montant; jours: number; brut: Montant; chiffre: Montant } {
  const c = calculer(etat);
  const lignes: LigneExplication[] = etat.poches
    .filter((p) => p.genre === "perso" && (c.soldes[p.id] ?? 0) !== 0)
    .map((p) => ({ libelle: p.nom, montant: c.soldes[p.id] ?? 0 }));
  if (c.revenusAttendus > 0) lignes.push({ libelle: "Revenu encore attendu", montant: c.revenusAttendus });
  for (const m of c.mouvements) lignes.push({ libelle: m.nom, montant: m.montant, date: m.date });
  const reserve = c.reserve + c.reserveSurAttendu;
  if (reserve > 0) lignes.push({ libelle: "Réservé dans tes pots", montant: -reserve });
  return { lignes, resteAVivre: c.resteAVivre, jours: c.jours, brut: c.chiffreBrut, chiffre: c.chiffre };
}
