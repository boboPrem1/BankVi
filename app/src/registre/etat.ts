import { ecrituresActives, type Ecriture, type Etat } from '@bankvi/moteur';
import { useMemo } from 'react';

import { etatDepuis } from '@/parcours/etat';
import { AUJOURDHUI, useParcours, type Parcours } from '@/parcours/store';

import { categorie } from './categories';
import { useRegistre, type Meta, type Registre } from './store';

/**
 * L'heure réelle du téléphone, posée sur la date fictive des fiches (6 novembre 2026).
 * Jamais avant 07:05 : le comptage du premier lancement est daté de 07:00, et une saisie
 * d'avant ne changerait pas le solde.
 */
export function maintenant(): string {
  const d = new Date();
  const minutes = Math.max(7 * 60 + 5, d.getHours() * 60 + d.getMinutes());
  return `${AUJOURDHUI}T${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

export const heureDe = (at: string) => ({ h: Number(at.slice(11, 13)), m: Number(at.slice(14, 16)) });

/** Les réponses du premier lancement, plus tout ce qui a été noté depuis. */
export function etatComplet(p: Omit<Parcours, 'modifier' | 'reinitialiser'>, r: Pick<Registre, 'ecritures' | 'prevus'>): Etat {
  const base = etatDepuis(p);
  return {
    ...base,
    ecritures: [...base.ecritures, ...r.ecritures],
    prevus: [...base.prevus, ...r.prevus.map((x) => x.prevu)],
  };
}

export function useEtat(): Etat {
  const parcours = useParcours();
  const ecritures = useRegistre((r) => r.ecritures);
  const prevus = useRegistre((r) => r.prevus);
  return useMemo(() => etatComplet(parcours, { ecritures, prevus }), [parcours, ecritures, prevus]);
}

export type Saisie = Extract<Ecriture, { type: 'depense' | 'revenu' }>;

/** Dépenses et revenus encore actifs, les plus récents en premier. */
export function saisies(ecritures: Ecriture[]): Saisie[] {
  return ecrituresActives(ecritures)
    .filter((e): e is Saisie => e.type === 'depense' || e.type === 'revenu')
    .reverse();
}

/** « Taxi » : la description, sinon le nom de la catégorie. */
export function libelle(e: { categorie?: string }, meta?: Meta): string {
  return meta?.description || categorie(e.categorie)?.nom || (('type' in e && e.type === 'revenu') ? 'Revenu' : 'Dépense');
}

export interface Suggestion {
  sens: 'depense' | 'revenu';
  categorie: string;
  montant: number;
  description?: string;
  poche: string;
  confiance: number;
}

/**
 * Suggestions d'habitude (HAB-01 à HAB-04), en attendant le module d'habitudes du moteur :
 * la même saisie revenue plusieurs fois, et plus encore à la même heure de la journée.
 * La confiance reste sous 0,95 : une suggestion n'impose jamais un montant.
 */
export function suggestions(ecritures: Ecriture[], meta: Record<string, Meta>, sens: 'depense' | 'revenu', at: string): Suggestion[] {
  const { h, m } = heureDe(at);
  const minute = h * 60 + m;
  const groupes = new Map<string, { s: Omit<Suggestion, 'confiance'>; n: number; proche: boolean }>();
  for (const e of saisies(ecritures)) {
    if (e.type !== sens || !e.categorie || categorie(e.categorie)?.sensible) continue;
    const description = meta[e.id]?.description;
    const cle = `${e.categorie}|${e.montant}|${description ?? ''}`;
    const g = groupes.get(cle) ?? {
      s: { sens, categorie: e.categorie, montant: e.montant, poche: e.poche, ...(description ? { description } : {}) },
      n: 0,
      proche: false,
    };
    g.n += 1;
    const eh = heureDe(e.at);
    if (Math.abs(eh.h * 60 + eh.m - minute) <= 90) g.proche = true;
    groupes.set(cle, g);
  }
  return [...groupes.values()]
    .map((g) => ({ ...g.s, confiance: Math.min(0.9, 0.35 + 0.15 * g.n + (g.proche ? 0.15 : 0)) }))
    .filter((s) => s.confiance >= 0.5)
    .sort((a, b) => b.confiance - a.confiance)
    .slice(0, 3);
}

/** « en espèces », mais « en Mixx » : Mixx et Flooz sont des marques et gardent leur nom. */
export const pocheDansPhrase = (id: string, nom: string) => (id === 'especes' ? nom.toLowerCase() : nom);

/** Une minute avant un horodatage : ce qui est détaillé pendant le bilan précède le comptage. */
export function minuteAvant(at: string): string {
  const { h, m } = heureDe(at);
  const t = Math.max(0, h * 60 + m - 1);
  return `${at.slice(0, 11)}${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
}

/** Ajoute des jours à une date ISO, sans fuseau. */
export function decaler(date: string, jours: number): string {
  const [a, mo, j] = date.split('-').map(Number) as [number, number, number];
  const d = new Date(Date.UTC(a, mo - 1, j + jours));
  return d.toISOString().slice(0, 10);
}
