import { moisDe, type DateISO } from "./dates";
import { recetteActive, repartir } from "./recettes";
import type { Ecriture, Etat, Horodatage, Montant, Poche } from "./types";

/** Une ligne de partie double : la somme de toutes les lignes du registre vaut toujours 0. */
export interface Ligne {
  ecriture: string;
  compte: string;
  montant: Montant;
}

export interface Registre {
  soldes: Record<string, Montant>;
  /** Pots réservés seulement. Le pot du quotidien se déduit : poches perso moins réservés. */
  reserves: Record<string, Montant>;
  /** Occurrences confirmées ou ignorées, sous la forme id@date. */
  resolus: Set<string>;
  /** Revenus notés sur les poches perso, par mois, hors revenus réguliers confirmés. */
  notesParMois: Record<string, Montant>;
  /** Toutes les poches perso utilisées sont comptées à cette date au moins : ce qui la précède est clos. */
  closJusqua?: DateISO;
  lignes: Ligne[];
  ecritures: Ecriture[];
}

export const dateDe = (at: Horodatage): DateISO => at.slice(0, 10);
export const cleOccurrence = (id: string, date: DateISO): string => `${id}@${date}`;

function verifierMontant(e: Ecriture, m: Montant): void {
  if (!Number.isSafeInteger(m) || m < 0) throw new RangeError(`Montant invalide dans ${e.id} : ${m}`);
}

function verifier(e: Ecriture): void {
  if (e.type === "repartition") Object.values(e.parts).forEach((m) => verifierMontant(e, m));
  else if (e.type === "transfert") {
    verifierMontant(e, e.montant);
    verifierMontant(e, e.frais);
  } else if ("montant" in e) verifierMontant(e, e.montant);
}

/** Retire les doublons, les annulations et leurs cibles, puis trie par ordre d'effet. */
export function ecrituresActives(ecritures: Ecriture[]): Ecriture[] {
  const parId = new Map<string, Ecriture>();
  for (const e of ecritures) if (!parId.has(e.id)) parId.set(e.id, e);
  const annulees = new Set<string>();
  for (const e of parId.values()) if (e.type === "annulation") annulees.add(e.cible);
  return [...parId.values()]
    .filter((e) => e.type !== "annulation" && !annulees.has(e.id))
    .sort((a, b) => (a.at === b.at ? (a.id < b.id ? -1 : 1) : a.at < b.at ? -1 : 1));
}

/** Rejoue le registre jusqu'à une date comprise. Le résultat ne dépend que des écritures. */
export function rejouer(etat: Pick<Etat, "poches" | "ecritures" | "revenus" | "recettes">, jusqua?: DateISO): Registre {
  const r: Registre = { soldes: {}, reserves: {}, resolus: new Set(), notesParMois: {}, lignes: [], ecritures: [] };
  const genre = new Map<string, Poche["genre"]>(etat.poches.map((p) => [p.id, p.genre]));
  for (const p of etat.poches) r.soldes[p.id] = 0;
  const fixes: Record<string, Montant> = {};
  const dernierComptage: Record<string, DateISO> = {};
  const utilisees = new Set<string>();

  const poster = (ecriture: string, compte: string, montant: Montant, contrepartie: string): void => {
    r.lignes.push({ ecriture, compte, montant }, { ecriture, compte: contrepartie, montant: -montant });
    if (compte in r.soldes) r.soldes[compte] = (r.soldes[compte] ?? 0) + montant;
    if (contrepartie in r.soldes) r.soldes[contrepartie] = (r.soldes[contrepartie] ?? 0) - montant;
  };

  const planchers = (date: DateISO): Montant =>
    etat.revenus.reduce((s, v) => (v.type === "variable" && v.depuis <= date ? s + v.plancher : s), 0);

  const remplirPots = (montant: Montant, date: DateISO): void => {
    const recette = recetteActive(etat, date);
    if (!recette || montant <= 0) return;
    const plancher = planchers(date);
    const mois = moisDe(date);
    let dansBase = montant;
    if (plancher > 0) {
      const dejaNote = r.notesParMois[mois] ?? 0;
      dansBase = Math.max(0, Math.min(montant, plancher - dejaNote));
    }
    const surplus = montant - dansBase;
    const parts = repartir(dansBase, recette, Object.fromEntries(
      recette.pots.map((p) => [p.id, fixes[`${mois}/${p.id}`] ?? 0]),
    ));
    for (const p of recette.pots) {
      const part = parts[p.id] ?? 0;
      if (p.regle.type === "fixe") fixes[`${mois}/${p.id}`] = (fixes[`${mois}/${p.id}`] ?? 0) + part;
      if (!p.quotidien && part > 0) r.reserves[p.id] = (r.reserves[p.id] ?? 0) + part;
    }
    const pourReste = recette.pots.find((p) => p.regle.type === "reste");
    if (surplus > 0 && pourReste && !pourReste.quotidien) {
      r.reserves[pourReste.id] = (r.reserves[pourReste.id] ?? 0) + surplus;
    }
  };

  const noter = (montant: Montant, date: DateISO): void => {
    const mois = moisDe(date);
    r.notesParMois[mois] = (r.notesParMois[mois] ?? 0) + montant;
  };

  for (const e of ecrituresActives(etat.ecritures)) {
    const date = dateDe(e.at);
    if (jusqua !== undefined && date > jusqua) continue;
    verifier(e);
    r.ecritures.push(e);
    if (e.type === "transfert") utilisees.add(e.de).add(e.vers);
    else if ("poche" in e) utilisees.add(e.poche);
    if (e.type === "comptage") {
      dernierComptage[e.poche] = date;
      // Ce qui est clos le reste : une poche utilisée plus tard ne rouvre rien.
      const dates = etat.poches.filter((p) => p.genre === "perso" && utilisees.has(p.id)).map((p) => dernierComptage[p.id]);
      if (dates.length > 0 && dates.every((d) => d !== undefined)) {
        const clos = (dates as DateISO[]).reduce((a, b) => (a < b ? a : b));
        if (!r.closJusqua || clos > r.closJusqua) r.closJusqua = clos;
      }
    }
    switch (e.type) {
      case "comptage": {
        const ecart = e.montant - (r.soldes[e.poche] ?? 0);
        // Un écart au comptage est du « Non détaillé » : il change le solde et compte sur le quotidien.
        if (ecart !== 0) poster(e.id, e.poche, ecart, `ecart:${e.poche}`);
        break;
      }
      case "depense": {
        poster(e.id, `depense:${e.categorie ?? "autre"}`, e.montant, e.poche);
        if (e.prevu) r.resolus.add(cleOccurrence(e.prevu.id, e.prevu.date));
        const recette = recetteActive(etat, date);
        const pot = recette?.pots.find((p) => !p.quotidien && e.nature && p.natures?.includes(e.nature));
        // Un pot dépassé reste à 0 : le dépassement prend sur le quotidien, sans jamais bloquer (POT-06).
        if (pot) r.reserves[pot.id] = Math.max(0, (r.reserves[pot.id] ?? 0) - e.montant);
        break;
      }
      case "revenu": {
        poster(e.id, e.poche, e.montant, `revenu:${e.categorie ?? "autre"}`);
        if (e.prevu) r.resolus.add(cleOccurrence(e.prevu.id, e.prevu.date));
        if (genre.get(e.poche) === "perso") {
          remplirPots(e.montant, date);
          const regulier = etat.revenus.some((s) => s.type === "regulier" && s.id === e.prevu?.id);
          if (!regulier) noter(e.montant, date);
        }
        break;
      }
      case "transfert": {
        poster(e.id, e.vers, e.montant, e.de);
        if (e.frais > 0) poster(e.id, "depense:frais-de-retrait", e.frais, e.de);
        const de = genre.get(e.de);
        const vers = genre.get(e.vers);
        // De l'activité vers le perso, c'est ce que la personne se verse : un revenu noté.
        if (de === "activite" && vers === "perso") {
          remplirPots(e.montant, date);
          noter(e.montant, date);
        } else if (de === "perso" && vers === "activite") {
          noter(-e.montant, date);
        }
        break;
      }
      case "deplacement": {
        // Seule la part virtuelle bouge, aucune poche réelle (EC-28).
        if (e.de in r.reserves) r.reserves[e.de] = Math.max(0, (r.reserves[e.de] ?? 0) - e.montant);
        const recette = recetteActive(etat, date);
        const vers = recette?.pots.find((p) => p.id === e.vers);
        if (vers && !vers.quotidien) r.reserves[e.vers] = (r.reserves[e.vers] ?? 0) + e.montant;
        break;
      }
      case "repartition": {
        for (const [pot, part] of Object.entries(e.parts)) r.reserves[pot] = (r.reserves[pot] ?? 0) + part;
        break;
      }
      case "prevu-ignore":
        r.resolus.add(cleOccurrence(e.prevu.id, e.prevu.date));
        break;
      case "annulation":
        break;
    }
  }
  return r;
}

/** Solde attendu d'une poche à un instant : dernier comptage, plus ou moins tout ce qui suit (EC-19, EC-20). */
export function soldeAttendu(etat: Pick<Etat, "poches" | "ecritures" | "revenus" | "recettes">, poche: string, avant: Horodatage): Montant {
  const ecritures = etat.ecritures.filter((e) => e.at < avant);
  return rejouer({ ...etat, ecritures }).soldes[poche] ?? 0;
}

/** Écart du bilan : ce qu'on attendait moins ce qu'on a compté, et ce qui reste à détailler. */
export function ecartDuBilan(attendu: Montant, compte: Montant, detaille: Montant = 0): { ecart: Montant; nonDetaille: Montant } {
  const ecart = attendu - compte;
  return { ecart, nonDetaille: ecart - detaille };
}

/** Le dernier montant de frais pour un transfert proche : mêmes poches, montant à 20 % près (POC-03). */
export function fraisSuggeres(ecritures: Ecriture[], de: string, vers: string, montant: Montant): Montant | undefined {
  const proches = ecrituresActives(ecritures).filter(
    (e) => e.type === "transfert" && e.de === de && e.vers === vers && e.frais > 0 &&
      Math.abs(e.montant - montant) * 5 <= montant,
  );
  const dernier = proches[proches.length - 1];
  return dernier?.type === "transfert" ? dernier.frais : undefined;
}
