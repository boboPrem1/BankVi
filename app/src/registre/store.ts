import type { Ecriture, Prevu, Recette, RecetteActive } from '@bankvi/moteur';
import { create } from 'zustand';

import { AUJOURDHUI } from '@/parcours/store';

export type Origine = 'toi' | 'suggestion' | 'bilan';

/** Ce que le moteur n'a pas besoin de connaître : description, origine, groupe. */
export interface Meta {
  description?: string;
  origine: Origine;
  /** Saisies créées ensemble sur plusieurs dates (EC-16). */
  groupe?: string;
}

/** Ligne prévue saisie à une date future (EC-13, EC-15, EC-16) : elle nourrit l'horizon, jamais le réel. */
export interface PrevuSaisi {
  prevu: Prevu;
  sens: 'depense' | 'revenu';
  categorie: string;
  poche: string;
  meta: Meta;
}

/** Le reste d'un bilan, laissé sans détail : un repère dans l'historique. Le comptage porte déjà le solde. */
export interface NonDetaille {
  id: string;
  at: string;
  montant: number;
  depuis: string;
}

export interface Bilan {
  date: string;
  at: string;
  /** Solde attendu − solde compté, toutes poches comptées. */
  ecart: number;
  compte: Record<string, number>;
  /** Dépenses déjà notées depuis le dernier comptage. */
  dejaNote: number;
  chiffreAvant: number;
  termine: boolean;
}

export interface Registre {
  ecritures: Ecriture[];
  meta: Record<string, Meta>;
  prevus: PrevuSaisi[];
  nonDetailles: NonDetaille[];
  bilan: Bilan | null;
  statutVu: boolean;
  carteSauvegardeFermee: boolean;
  /** Montant laissé dans « Noter » : il reste jusqu'à la fermeture de l'app. */
  brouillon: number | null;
  recentes: string[];
  /** Pass Plus actif : 90 jours et simulations sans limite. Camille l'a, un nouveau compte non. */
  pass: boolean;
  /** Simulations faites sans pass : 3 offertes, sans recharge (EC-25). */
  essais: number;
  /** Recettes adoptées après le premier lancement, dans l'ordre (EC-08, EC-29, EC-32, EC-33). */
  recettes: RecetteActive[];
  /** Recettes qui ne sont pas au catalogue : ajustées, écrites, reçues. */
  recettesPerso: Recette[];
  /** Phrase d'EC-33, gardée jusqu'à la fermeture de l'app. */
  phrase: string;
  /** « Plus tard » sur EC-34 : les natures sont allées au pot du quotidien. */
  parDefaut: { nombre: number; pot: string } | null;
  /** Poches masquées (EC-38). */
  pochesMasquees: string[];
  /** Poche d'activité (EC-38) : null si inactive, sinon montant en FCFA. */
  soldeActivite: number | null;
  /** Alertes de l'utilisateur (EC-40). */
  alertes: { decouvert: boolean; pass: boolean };
  /** Rituel en pause après 5 jours ignorés (EC-40). */
  rituelEnPause: boolean;
  /** Inscrit à la liste d'attente Pass Pro (EC-42). */
  listeAttentePro: boolean;
  /** Apprentissage des habitudes (EC-43). */
  appris: { actif: boolean; faux: string[]; oublies: string[] };
  /** Catégories classées dans Mes natures (EC-44). */
  naturesClassees: Record<string, string>;
  /** Partage des statistiques d'usage anonymes (EC-45). */
  statistiquesUsage: boolean;
  /** Sécurité et verrouillage (EC-52). */
  securite: { verrouillage: boolean; email?: string };
  /** Suggestions masquées par l'utilisateur (EC-47). */
  suggestionsMasquees: string[];
  /** Libellés ou catégories sensibles déjà consenties (EC-48). */
  libellesSensiblesConsenties: string[];
  /** Masquage facultatif des montants à l'accueil (désactivé par défaut). */
  masquerMontants: boolean;

  /** Ajoute des écritures ; rend leurs identifiants. */
  ecrire: (entrees: { ecriture: DistributiveOmit<Ecriture, 'id'>; meta?: Meta }[]) => string[];
  /** Contre-écriture invisible : l'écriture reste au registre, sans effet (annulation, suppression). */
  annuler: (ids: string[]) => void;
  /** Remet une écriture annulée, sous un nouvel identifiant (« Annuler » d'une suppression). */
  retablir: (ids: string[]) => string[];
  modifier: (p: Partial<Pick<Registre, 'prevus' | 'nonDetailles' | 'bilan' | 'statutVu' | 'carteSauvegardeFermee' | 'brouillon' | 'pass' | 'essais' | 'recettes' | 'recettesPerso' | 'phrase' | 'parDefaut' | 'pochesMasquees' | 'soldeActivite' | 'alertes' | 'rituelEnPause' | 'listeAttentePro' | 'appris' | 'naturesClassees' | 'statistiquesUsage' | 'securite' | 'suggestionsMasquees' | 'libellesSensiblesConsenties' | 'masquerMontants'>>) => void;
  retenirCategorie: (id: string) => void;
  remplir: (r: Partial<Pick<Registre, 'ecritures' | 'meta' | 'prevus' | 'nonDetailles'>>) => void;
  repartirDeZero: () => void;
  reinitialiser: () => void;
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/** Simulations offertes sans Pass Plus (EC-25). */
export const ESSAIS_OFFERTS = 3;

let compteur = 1;
export const nouvelId = (prefixe = 'e') => `${prefixe}-${Date.now().toString(36)}-${compteur++}`;

const VIDE = {
  ecritures: [] as Ecriture[],
  meta: {} as Record<string, Meta>,
  prevus: [] as PrevuSaisi[],
  nonDetailles: [] as NonDetaille[],
  bilan: null,
  statutVu: false,
  carteSauvegardeFermee: false,
  brouillon: null,
  recentes: [] as string[],
  pass: false,
  essais: 0,
  recettes: [] as RecetteActive[],
  recettesPerso: [] as Recette[],
  phrase: '',
  parDefaut: null,
  pochesMasquees: [] as string[],
  soldeActivite: null as number | null,
  alertes: { decouvert: true, pass: true },
  rituelEnPause: false,
  listeAttentePro: false,
  appris: { actif: true, faux: [] as string[], oublies: [] as string[] },
  naturesClassees: {} as Record<string, string>,
  statistiquesUsage: false,
  securite: { verrouillage: false },
  suggestionsMasquees: [] as string[],
  libellesSensiblesConsenties: [] as string[],
  masquerMontants: false,
};

/**
 * Le registre du jour, en mémoire seulement : les écrans sont statiques, rien n'est écrit
 * sur le téléphone. Il ne fait qu'ajouter : une correction annule, puis écrit de nouveau.
 */
export const useRegistre = create<Registre>()((set, get) => ({
  ...VIDE,
  ecrire: (entrees) => {
    const ids: string[] = [];
    const ecritures = [...get().ecritures];
    const meta = { ...get().meta };
    for (const { ecriture, meta: m } of entrees) {
      const id = nouvelId();
      ids.push(id);
      ecritures.push({ ...ecriture, id } as Ecriture);
      if (m) meta[id] = m;
    }
    set({ ecritures, meta });
    return ids;
  },
  annuler: (ids) =>
    set((r) => ({
      ecritures: [...r.ecritures, ...ids.map((cible) => ({ id: nouvelId('a'), at: `${AUJOURDHUI}T00:00`, type: 'annulation' as const, cible }))],
    })),
  retablir: (ids) => {
    const r = get();
    const copies = ids.flatMap((id) => {
      const e = r.ecritures.find((x) => x.id === id);
      return e ? [{ ecriture: e, meta: r.meta[id] }] : [];
    });
    return r.ecrire(copies.map(({ ecriture, meta }) => ({ ecriture: { ...ecriture }, ...(meta ? { meta } : {}) })));
  },
  modifier: (p) => set(p),
  retenirCategorie: (id) => set((r) => ({ recentes: [id, ...r.recentes.filter((x) => x !== id)].slice(0, 6) })),
  remplir: (p) => set(p),
  repartirDeZero: () =>
    set({
      ecritures: [],
      meta: {},
      prevus: [],
      nonDetailles: [],
      bilan: null,
      brouillon: null,
    }),
  reinitialiser: () => set(VIDE),
}));
