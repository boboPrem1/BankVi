import type { Ecriture } from '@bankvi/moteur';

import { AUJOURDHUI } from '@/parcours/store';

import { maintenant } from './etat';
import { nouvelId, useRegistre, type Meta, type Origine } from './store';

export interface Note {
  sens: 'depense' | 'revenu';
  montant: number;
  categorie: string;
  poche: string;
  description?: string | undefined;
  /** Dates ISO ; plusieurs dates forment un groupe (EC-16). */
  dates: string[];
  origine: Origine;
  /** Horodatage imposé : une dépense ajoutée pendant le bilan se place juste avant le comptage. */
  at?: string;
}

export interface Trace {
  ecritures: string[];
  prevus: string[];
}

/**
 * Note une saisie. Aujourd'hui ou avant : du réel. Après aujourd'hui : une ligne prévue,
 * jamais du réel, qui nourrit l'horizon (EC-15, EC-16).
 */
export function noter(n: Note): Trace {
  const r = useRegistre.getState();
  const groupe = n.dates.length > 1 ? nouvelId('g') : undefined;
  const meta: Meta = { origine: n.origine, ...(n.description ? { description: n.description } : {}), ...(groupe ? { groupe } : {}) };
  const passees = n.dates.filter((d) => d <= AUJOURDHUI);
  const futures = n.dates.filter((d) => d > AUJOURDHUI);
  const ecritures = r.ecrire(
    passees.map((d) => ({
      ecriture: {
        at: n.at ?? (d === AUJOURDHUI ? maintenant() : `${d}T12:00`),
        type: n.sens,
        poche: n.poche,
        montant: n.montant,
        categorie: n.categorie,
      },
      meta,
    })),
  );
  const prevus = futures.map((date) => ({
    prevu: {
      id: nouvelId('p'),
      nom: n.description || n.categorie,
      montant: n.montant,
      sens: n.sens === 'depense' ? ('sortie' as const) : ('entree' as const),
      rythme: 'une-fois' as const,
      date,
    },
    sens: n.sens,
    categorie: n.categorie,
    poche: n.poche,
    meta,
  }));
  if (prevus.length) r.modifier({ prevus: [...r.prevus, ...prevus] });
  return { ecritures, prevus: prevus.map((p) => p.prevu.id) };
}

/** « Annuler » d'une saisie : contre-écriture pour le réel, retrait pour le prévu. */
export function defaire(t: Trace) {
  const r = useRegistre.getState();
  if (t.ecritures.length) r.annuler(t.ecritures);
  if (t.prevus.length) r.modifier({ prevus: useRegistre.getState().prevus.filter((p) => !t.prevus.includes(p.prevu.id)) });
}

type Modifiable = Extract<Ecriture, { type: 'depense' | 'revenu' | 'transfert' }>;

/**
 * Corrige une écriture : l'ancienne est annulée, une nouvelle la remplace. L'utilisateur
 * ne voit que la valeur à jour (EC-18). Rend l'identifiant de la nouvelle.
 */
export function remplacer(id: string, patch: Partial<Modifiable>, metaPatch?: Partial<Meta>): string | undefined {
  const r = useRegistre.getState();
  const ancienne = r.ecritures.find((e) => e.id === id);
  if (!ancienne) return undefined;
  const { id: _ignore, ...reste } = { ...ancienne, ...patch } as Ecriture;
  void _ignore;
  const meta = r.meta[id] ? { ...r.meta[id], ...metaPatch } : metaPatch ? ({ origine: 'toi', ...metaPatch } as Meta) : undefined;
  r.annuler([id]);
  return r.ecrire([{ ecriture: reste, ...(meta ? { meta } : {}) }])[0];
}

/** « Annuler » d'une correction : la nouvelle disparaît, l'ancienne revient. */
export function defaireRemplacement(ancienne: string, nouvelle: string) {
  const r = useRegistre.getState();
  r.annuler([nouvelle]);
  r.retablir([ancienne]);
}
