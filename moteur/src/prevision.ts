import {
  ajouterJours,
  dansMois,
  ecartJours,
  ecartMois,
  finDuMois,
  jourDuMois,
  joursDuMois,
  moisDe,
  type DateISO,
} from "./dates";
import { partReservee, recetteActive } from "./recettes";
import { cleOccurrence, dateDe, rejouer, type Registre } from "./registre";
import type { Etat, Montant, Prevu, Recette, SourceRevenu } from "./types";

export interface Mouvement {
  id: string;
  nom: string;
  date: DateISO;
  /** Positif pour une entrée, négatif pour une sortie. */
  montant: Montant;
  origine: "prevu" | "revenu-regulier" | "saisie-future";
  /** Occurrence arrivée à sa date et pas encore confirmée : l'accueil demande (EC-18). */
  enAttente: boolean;
}

export interface Cycle {
  /** Date affichée : « jusqu'au 28 ». */
  reference: DateISO;
  jours: number;
  /** Dernier jour dont les prévus comptent dans ce cycle. */
  finPrevus: DateISO;
  /** Jour où le rythme se recalcule. */
  debutSuivant: DateISO;
}

export interface Calcul {
  date: DateISO;
  soldes: Record<string, Montant>;
  soldesPerso: Montant;
  reference: DateISO;
  jours: number;
  revenusAttendus: Montant;
  mouvements: Mouvement[];
  reserve: Montant;
  /** Part réservée des entrées encore attendues dans ce cycle. */
  reserveSurAttendu: Montant;
  resteAVivre: Montant;
  /** Reste divisé par les jours, avant l'arrondi. Nul si le reste est négatif. */
  chiffreBrut: Montant;
  chiffre: Montant;
  /** Présent si le reste est négatif : on affiche « il manque », jamais un chiffre négatif seul. */
  manque?: Montant;
  /** Ce que le chiffre doit à des occurrences pas encore confirmées. */
  enAttente: Mouvement[];
}

export interface PointHorizon {
  date: DateISO;
  /** Solde du matin, après les événements du jour. */
  solde: Montant;
  /** Le rythme supposé à partir de ce jour. */
  chiffre: Montant;
  mouvements: Mouvement[];
}

const arrondirCent = (m: Montant): Montant => Math.floor(m / 100) * 100;

/** Les occurrences d'un rythme entre deux dates comprises. */
function occurrences(p: Prevu, a: DateISO, b: DateISO): DateISO[] {
  const debut = p.depuis && p.depuis > a ? p.depuis : a;
  const fin = p.fin && p.fin < b ? p.fin : b;
  if (debut > fin) return [];
  const dates: DateISO[] = [];
  switch (p.rythme) {
    case "une-fois":
      if (p.date >= debut && p.date <= fin) dates.push(p.date);
      break;
    case "mensuel":
      for (let n = 0; n <= ecartMois(debut, fin); n++) {
        const d = dansMois(debut, n, p.jour);
        if (d >= debut && d <= fin) dates.push(d);
      }
      break;
    case "trimestre":
      for (let n = 0; n <= ecartMois(p.date, fin); n += 3) {
        const d = dansMois(p.date, n);
        if (d >= debut && d <= fin) dates.push(d);
      }
      break;
    case "semaine":
    case "2-semaines": {
      const pas = p.rythme === "semaine" ? 7 : 14;
      let d = p.date;
      if (d < debut) d = ajouterJours(d, Math.ceil(ecartJours(d, debut) / pas) * pas);
      for (; d <= fin; d = ajouterJours(d, pas)) dates.push(d);
      break;
    }
  }
  return dates;
}

function occurrencesRevenu(s: Extract<SourceRevenu, { type: "regulier" }>, a: DateISO, b: DateISO): DateISO[] {
  return occurrences({ id: s.id, nom: s.nom, montant: s.montant, sens: "entree", depuis: s.depuis, rythme: "mensuel", jour: s.jour }, a, b);
}

const LOIN_DANS_LE_PASSE = "2000-01-01";

const parDateEtId = (x: Mouvement, y: Mouvement): number =>
  x.date === y.date ? (x.id < y.id ? -1 : 1) : x.date < y.date ? -1 : 1;

/** Tous les mouvements prévus entre deux dates, hors occurrences déjà confirmées ou ignorées. */
function mouvementsEntre(etat: Etat, reg: Registre, a: DateISO, b: DateISO, enAttente: boolean): Mouvement[] {
  const liste: Mouvement[] = [];
  for (const p of etat.prevus) {
    for (const date of occurrences(p, a, b)) {
      if (reg.resolus.has(cleOccurrence(p.id, date))) continue;
      liste.push({ id: p.id, nom: p.nom, date, montant: p.sens === "sortie" ? 0 - p.montant : p.montant, origine: "prevu", enAttente });
    }
  }
  for (const s of etat.revenus) {
    if (s.type !== "regulier") continue;
    for (const date of occurrencesRevenu(s, a, b)) {
      if (reg.resolus.has(cleOccurrence(s.id, date))) continue;
      liste.push({ id: s.id, nom: s.nom, date, montant: s.montant, origine: "revenu-regulier", enAttente });
    }
  }
  return liste.sort(parDateEtId);
}

/** Une saisie datée après aujourd'hui agit comme un prévu : elle n'a pas encore bougé l'argent. */
function saisiesFutures(etat: Etat, a: DateISO, b: DateISO): Mouvement[] {
  const liste: Mouvement[] = [];
  const annulees = new Set(etat.ecritures.flatMap((e) => (e.type === "annulation" ? [e.cible] : [])));
  const vues = new Set<string>();
  for (const e of etat.ecritures) {
    if ((e.type !== "depense" && e.type !== "revenu") || annulees.has(e.id) || vues.has(e.id)) continue;
    vues.add(e.id);
    const date = dateDe(e.at);
    if (date < a || date > b) continue;
    const perso = etat.poches.find((p) => p.id === e.poche)?.genre === "perso";
    if (!perso) continue;
    liste.push({ id: e.id, nom: e.categorie ?? e.type, date, montant: e.type === "depense" ? 0 - e.montant : e.montant, origine: "saisie-future", enAttente: false });
  }
  return liste.sort(parDateEtId);
}

function aVariable(etat: Etat, date: DateISO): boolean {
  return etat.revenus.some((s) => s.type === "variable" && s.depuis <= date);
}

/** La période qui suit une date : jusqu'au prochain revenu régulier, ou jusqu'à la fin du mois. */
export function cycleDe(etat: Etat, d: DateISO): Cycle {
  const reguliers = etat.revenus.filter((s): s is Extract<SourceRevenu, { type: "regulier" }> => s.type === "regulier");
  if (aVariable(etat, d) || reguliers.length === 0) {
    const fin = finDuMois(d);
    return { reference: fin, jours: ecartJours(d, fin) + 1, finPrevus: fin, debutSuivant: ajouterJours(fin, 1) };
  }
  const prochains = reguliers.map((s) => {
    const depart = s.depuis > d ? s.depuis : ajouterJours(d, 1);
    return occurrencesRevenu(s, depart, dansMois(depart, 2))[0] as DateISO;
  });
  const reference = prochains.reduce((a, b) => (a < b ? a : b));
  return { reference, jours: ecartJours(d, reference), finPrevus: ajouterJours(reference, -1), debutSuivant: reference };
}

/** Le plus petit de : plancher au prorata des jours restants ; attendu au départ moins le déjà noté (PRV-02). */
function revenuVariableAttendu(etat: Etat, d: DateISO, notes: Montant): Montant {
  const dim = joursDuMois(d);
  const restants = dim - jourDuMois(d) + 1;
  let prorata = 0;
  let initial = 0;
  for (const s of etat.revenus) {
    if (s.type !== "variable" || s.depuis > finDuMois(d)) continue;
    prorata += Math.floor((s.plancher * restants) / dim);
    const mois = moisDe(s.depuis) === moisDe(d);
    initial += mois ? Math.floor((s.plancher * (dim - jourDuMois(s.depuis) + 1)) / dim) : s.plancher;
  }
  return Math.max(0, Math.min(prorata, initial - notes));
}

const somme = (m: Mouvement[]): Montant => m.reduce((s, x) => s + x.montant, 0);
const totalReserve = (r: Record<string, Montant>): Montant => Object.values(r).reduce((s, x) => s + x, 0);
const soldesPerso = (etat: Etat, soldes: Record<string, Montant>): Montant =>
  etat.poches.reduce((s, p) => (p.genre === "perso" ? s + (soldes[p.id] ?? 0) : s), 0);

function reserveSur(entrees: Montant, recette: Recette | undefined): Montant {
  return recette && entrees > 0 ? partReservee(entrees, recette) : 0;
}

/** Tout ce que l'accueil affiche pour aujourd'hui. */
export function calculer(etat: Etat): Calcul {
  const d = etat.aujourdhui;
  const reg = rejouer(etat, d);
  const cycle = cycleDe(etat, d);
  // Un comptage complet dit déjà la vérité sur l'argent : ce qui le précède ne compte plus (PRV-16).
  const attente = mouvementsEntre(etat, reg, reg.closJusqua ?? LOIN_DANS_LE_PASSE, d, true);
  const prevus = [
    ...attente,
    ...mouvementsEntre(etat, reg, ajouterJours(d, 1), cycle.finPrevus, false),
    ...saisiesFutures(etat, ajouterJours(d, 1), cycle.finPrevus),
  ];
  const attendus = aVariable(etat, d) ? revenuVariableAttendu(etat, d, reg.notesParMois[moisDe(d)] ?? 0) : 0;
  const perso = soldesPerso(etat, reg.soldes);
  const reserve = totalReserve(reg.reserves);
  const recette = recetteActive(etat, d);
  const entrees = prevus.reduce((s, m) => (m.montant > 0 ? s + m.montant : s), 0);
  const reserveSurAttendu = reserveSur(attendus, recette) + reserveSur(entrees, recette);
  const resteAVivre = perso + attendus + somme(prevus) - reserve - reserveSurAttendu;
  const chiffreBrut = resteAVivre > 0 ? Math.floor(resteAVivre / cycle.jours) : 0;
  return {
    date: d,
    soldes: reg.soldes,
    soldesPerso: perso,
    reference: cycle.reference,
    jours: cycle.jours,
    revenusAttendus: attendus,
    mouvements: prevus,
    reserve,
    reserveSurAttendu,
    resteAVivre,
    chiffreBrut,
    chiffre: arrondirCent(chiffreBrut),
    enAttente: attente,
    ...(resteAVivre < 0 ? { manque: -resteAVivre } : {}),
  };
}

export interface Recalcul {
  date: DateISO;
  /** Chiffre du cycle qui commence à cette date. */
  chiffre: Montant;
  /** Reste du cycle, négatif si charges et pots dépassent l'argent. */
  reste: Montant;
  reference: DateISO;
}

/**
 * La courbe : chaque jour on retire le chiffre du jour, on ajoute les événements,
 * et le rythme se recalcule à chaque nouveau cycle (PRV-03).
 */
export function horizon(etat: Etat, jours: number): { points: PointHorizon[]; recalculs: Recalcul[] } {
  const d0 = etat.aujourdhui;
  const reg = rejouer(etat, d0);
  const depart = calculer(etat);
  let solde = depart.soldesPerso;
  let chiffre = depart.chiffre;
  let reserve = depart.reserve;
  let cycle = cycleDe(etat, d0);
  let attendu = depart.revenusAttendus;
  let pasFaits = 0;
  let verse = 0;
  let reserveAttendu = reserveSur(attendu, recetteActive(etat, d0));
  const points: PointHorizon[] = [{ date: d0, solde, chiffre, mouvements: [] }];
  const recalculs: Recalcul[] = [];

  const lointain = ajouterJours(d0, jours);
  const planifies = [
    ...mouvementsEntre(etat, reg, ajouterJours(d0, 1), lointain, false),
    ...saisiesFutures(etat, ajouterJours(d0, 1), lointain),
  ];
  const parDate = new Map<DateISO, Mouvement[]>();
  for (const m of planifies) parDate.set(m.date, [...(parDate.get(m.date) ?? []), m]);

  for (let i = 1; i <= jours; i++) {
    const jour = ajouterJours(d0, i);
    solde -= chiffre;
    if (attendu > 0 && pasFaits < cycle.jours) {
      // Le revenu variable se répartit par jour, sans perdre un franc à l'arrondi.
      pasFaits += 1;
      const cumul = Math.floor((attendu * pasFaits) / cycle.jours);
      solde += cumul - verse;
      verse = cumul;
    }
    const duJour = [...(i === 1 ? depart.enAttente : []), ...(parDate.get(jour) ?? [])];
    solde += somme(duJour);
    const recetteDuJour = recetteActive(etat, jour);
    for (const m of duJour) if (m.montant > 0) reserve += reserveSur(m.montant, recetteDuJour);

    if (jour === cycle.debutSuivant) {
      reserve += reserveAttendu;
      cycle = cycleDe(etat, jour);
      attendu = aVariable(etat, jour) ? revenuVariableAttendu(etat, jour, 0) : 0;
      pasFaits = 0;
      verse = 0;
      const recette = recetteActive(etat, jour);
      reserveAttendu = reserveSur(attendu, recette);
      const fin = cycle.finPrevus;
      const suite = [
        ...mouvementsEntre(etat, reg, ajouterJours(jour, 1), fin, false),
        ...saisiesFutures(etat, ajouterJours(jour, 1), fin),
      ];
      const entrees = suite.reduce((s, m) => (m.montant > 0 ? s + m.montant : s), 0);
      const reste = solde + attendu + somme(suite) - reserve - reserveAttendu - reserveSur(entrees, recette);
      chiffre = reste > 0 ? arrondirCent(Math.floor(reste / cycle.jours)) : 0;
      recalculs.push({ date: jour, chiffre, reste, reference: cycle.reference });
    }
    points.push({ date: jour, solde, chiffre, mouvements: duJour });
  }
  return { points, recalculs };
}

/**
 * Une dépense ou un revenu qu'on note ressemble-t-il à une ligne prévue, à 7 jours près ?
 * L'app le demande alors en une touche, pour ne pas le compter deux fois (SAI-28).
 */
export function prevuProche(etat: Etat, saisie: { type: "depense" | "revenu"; categorie: string; date: DateISO }): Mouvement | undefined {
  const reg = rejouer(etat, etat.aujourdhui);
  const cle = saisie.categorie.trim().toLowerCase();
  const candidats = mouvementsEntre(etat, reg, ajouterJours(saisie.date, -7), ajouterJours(saisie.date, 7), false).filter(
    (m) => m.nom.trim().toLowerCase() === cle && (saisie.type === "depense" ? m.montant < 0 : m.montant > 0) && (!reg.closJusqua || m.date >= reg.closJusqua),
  );
  return candidats.reduce<Mouvement | undefined>(
    (proche, m) => (!proche || Math.abs(ecartJours(saisie.date, m.date)) < Math.abs(ecartJours(saisie.date, proche.date)) ? m : proche),
    undefined,
  );
}

/** Les repères de « Mon horizon » : J+3, J+7, J+30 (PRV-15). */
export function reperes(etat: Etat): { j3: PointHorizon; j7: PointHorizon; j30: PointHorizon } {
  const { points } = horizon(etat, 30);
  return { j3: points[3] as PointHorizon, j7: points[7] as PointHorizon, j30: points[30] as PointHorizon };
}

/**
 * Le réel des derniers jours, à gauche d'aujourd'hui sur la courbe (EC-23) : le solde perso
 * en fin de journée. Un jour n'apparaît que si chaque poche perso utilisée y était déjà
 * comptée, sinon son solde serait inventé. Du plus ancien au plus récent, aujourd'hui exclu.
 */
export function soldesPasses(etat: Etat, jours = 7): { date: DateISO; solde: Montant }[] {
  const utilisees = new Set(etat.ecritures.flatMap((e) => ("poche" in e ? [e.poche] : e.type === "transfert" ? [e.de, e.vers] : [])));
  const perso = etat.poches.filter((p) => p.genre === "perso" && utilisees.has(p.id)).map((p) => p.id);
  const passes: { date: DateISO; solde: Montant }[] = [];
  for (let i = jours; i >= 1; i--) {
    const date = ajouterJours(etat.aujourdhui, -i);
    const reg = rejouer(etat, date);
    const comptees = new Set(reg.ecritures.flatMap((e) => (e.type === "comptage" ? [e.poche] : [])));
    if (perso.length === 0 || !perso.every((p) => comptees.has(p))) continue;
    passes.push({ date, solde: soldesPerso(etat, reg.soldes) });
  }
  return passes;
}

/** La première date où le solde passe sous zéro, sur le reste du cycle. */
export function premierManque(etat: Etat, jours = 90): { date: DateISO; solde: Montant } | undefined {
  const point = horizon(etat, jours).points.find((p) => p.solde < 0);
  return point ? { date: point.date, solde: point.solde } : undefined;
}
