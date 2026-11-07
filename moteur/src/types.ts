import type { DateISO } from "./dates";

/** Montants en FCFA, toujours en entiers. */
export type Montant = number;

export interface Poche {
  id: string;
  nom: string;
  /** Une poche d'activité reste hors du reste à vivre, sauf transfert vers une poche perso. */
  genre: "perso" | "activite";
}

/** Horodatage AAAA-MM-JJTHH:mm : il fixe l'ordre d'effet, pas la date de saisie. */
export type Horodatage = string;

export interface LienPrevu {
  id: string;
  date: DateISO;
}

interface BaseEcriture {
  /** Créé sur l'appareil : une même écriture reçue deux fois ne compte qu'une fois (DON-08). */
  id: string;
  at: Horodatage;
}

export type Ecriture =
  | (BaseEcriture & { type: "comptage"; poche: string; montant: Montant })
  | (BaseEcriture & {
      type: "depense";
      poche: string;
      montant: Montant;
      categorie?: string;
      nature?: string;
      prevu?: LienPrevu;
    })
  | (BaseEcriture & { type: "revenu"; poche: string; montant: Montant; categorie?: string; prevu?: LienPrevu })
  | (BaseEcriture & { type: "transfert"; de: string; vers: string; montant: Montant; frais: Montant })
  /** Correction invisible par contre-passation : l'écriture visée reste au registre, sans effet. */
  | (BaseEcriture & { type: "annulation"; cible: string })
  | (BaseEcriture & { type: "deplacement"; de: string; vers: string; montant: Montant })
  | (BaseEcriture & { type: "repartition"; parts: Record<string, Montant> })
  /** « Pas cette fois » : l'occurrence prévue ne compte plus, sans mouvement d'argent. */
  | (BaseEcriture & { type: "prevu-ignore"; prevu: LienPrevu });

export type Rythme =
  | { rythme: "mensuel"; jour: number }
  | { rythme: "une-fois"; date: DateISO }
  | { rythme: "semaine"; date: DateISO }
  | { rythme: "2-semaines"; date: DateISO }
  | { rythme: "trimestre"; date: DateISO };

export type Prevu = Rythme & {
  id: string;
  nom: string;
  montant: Montant;
  /** Une sortie réduit l'argent, une entrée l'augmente. */
  sens: "sortie" | "entree";
  /** Pas d'occurrence avant cette date, ni après `fin`. */
  depuis?: DateISO;
  fin?: DateISO;
};

export type SourceRevenu =
  | { type: "regulier"; id: string; nom: string; montant: Montant; jour: number; depuis: DateISO }
  | { type: "variable"; id: string; nom: string; plancher: Montant; depuis: DateISO };

export type ReglePot = { type: "pourcentage"; valeur: number } | { type: "fixe"; valeur: Montant } | { type: "reste" };

export interface Pot {
  id: string;
  nom: string;
  regle: ReglePot;
  /** Pot du quotidien : son contenu entre dans le chiffre du jour. Les autres sont réservés. */
  quotidien: boolean;
  /** Natures lues par ce pot. Une dépense sans pot réservé prend sur le quotidien. */
  natures?: string[];
}

export interface Recette {
  id: string;
  nom: string;
  pots: Pot[];
  /** Base « revenu le plus bas attendu » : ce qui dépasse le plancher va dans le pot « reste ». */
  surPlancher?: boolean;
}

export interface RecetteActive {
  recette: Recette;
  /** La recette s'applique à partir de cette date, jamais avant. */
  effetDepuis: DateISO;
}

export interface Etat {
  aujourdhui: DateISO;
  poches: Poche[];
  ecritures: Ecriture[];
  revenus: SourceRevenu[];
  /** Charges et événements à venir (EC-05, EC-26, EC-39). */
  prevus: Prevu[];
  /** Dans l'ordre d'adoption. */
  recettes?: RecetteActive[];
}
