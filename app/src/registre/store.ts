import type { Ecriture, Prevu } from '@bankvi/moteur';
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

  /** Ajoute des écritures ; rend leurs identifiants. */
  ecrire: (entrees: { ecriture: DistributiveOmit<Ecriture, 'id'>; meta?: Meta }[]) => string[];
  /** Contre-écriture invisible : l'écriture reste au registre, sans effet (annulation, suppression). */
  annuler: (ids: string[]) => void;
  /** Remet une écriture annulée, sous un nouvel identifiant (« Annuler » d'une suppression). */
  retablir: (ids: string[]) => string[];
  modifier: (p: Partial<Pick<Registre, 'prevus' | 'nonDetailles' | 'bilan' | 'statutVu' | 'carteSauvegardeFermee' | 'brouillon'>>) => void;
  retenirCategorie: (id: string) => void;
  remplir: (r: Partial<Pick<Registre, 'ecritures' | 'meta' | 'prevus' | 'nonDetailles'>>) => void;
  reinitialiser: () => void;
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

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
  reinitialiser: () => set(VIDE),
}));
