import {
  CATALOGUE,
  calculer,
  datePremierEffet,
  ecrituresActives,
  rejouer,
  repartir,
  type Etat,
  type Pot,
  type Recette,
} from '@bankvi/moteur';

import { AUJOURDHUI } from '@/parcours/store';

import { useRegistre } from './store';

/** La recette adoptée en dernier : celle que montrent Mes pots et Ma recette, même avant son effet. */
export function recetteCourante(etat: Etat): { recette: Recette; effetDepuis: string } | undefined {
  return etat.recettes?.[etat.recettes.length - 1];
}

/** La recette du catalogue d'où vient une recette ajustée (« d'après 70 / 20 / 10 »). */
export function origineDe(r: Recette): Recette | undefined {
  const catalogue = CATALOGUE as Record<string, Recette>;
  if (catalogue[r.id]) return catalogue[r.id];
  const id = r.id.split('~')[1];
  return id ? catalogue[id] : undefined;
}

export const estDuCatalogue = (r: Recette) => (CATALOGUE as Record<string, Recette>)[r.id] === r;

/** Base de répartition : le revenu régulier, ou le plancher d'un revenu variable. */
export function baseDe(etat: Etat): number {
  return etat.revenus.reduce((s, r) => s + (r.type === 'regulier' ? r.montant : r.plancher), 0);
}

export interface EtatPot {
  pot: Pot;
  /** Rang de couleur : null pour « Le reste » ; au-delà de 6, gris. */
  couleur: number | null;
  reste: number;
  cible: number;
  quotidien: boolean;
}

/**
 * Ce que contient chaque pot. Les pots réservés viennent du registre rejoué ; le quotidien
 * est ce qui reste des poches perso, partagé entre les pots du quotidien selon leur cible.
 * La somme des pots égale toujours la somme des poches perso.
 */
export function etatDesPots(etat: Etat): { recette: Recette; effetDepuis: string; rempli: boolean; pots: EtatPot[] } | undefined {
  const courante = recetteCourante(etat);
  if (!courante) return undefined;
  const { recette, effetDepuis } = courante;
  const dateAuj = etat.aujourdhui ?? AUJOURDHUI;
  const reg = rejouer(etat, dateAuj);
  const perso = etat.poches.reduce((s, p) => (p.genre === 'perso' ? s + (reg.soldes[p.id] ?? 0) : s), 0);
  const reserves = recette.pots.filter((p) => !p.quotidien).reduce((s, p) => s + (reg.reserves[p.id] ?? 0), 0);
  const cibles = repartir(baseDe(etat), recette);
  const quotidiens = recette.pots.filter((p) => p.quotidien);
  const cibleQuotidien = quotidiens.reduce((s, p) => s + (cibles[p.id] ?? 0), 0);
  const libre = Math.max(0, perso - reserves);
  let couleur = 0;
  let partage = 0;
  const pots = recette.pots.map((pot) => {
    let reste = reg.reserves[pot.id] ?? 0;
    if (pot.quotidien) {
      const dernier = pot === quotidiens[quotidiens.length - 1];
      reste = dernier ? libre - partage : cibleQuotidien > 0 ? Math.floor((libre * (cibles[pot.id] ?? 0)) / cibleQuotidien / 100) * 100 : 0;
      partage += reste;
    }
    return { pot, couleur: pot.regle.type === 'reste' ? null : couleur++, reste, cible: cibles[pot.id] ?? 0, quotidien: pot.quotidien };
  });
  const rempli = reserves > 0 || effetDepuis <= dateAuj || ecrituresActives(etat.ecritures).some((e) => e.type === 'repartition');
  return { recette, effetDepuis, rempli, pots };
}

export interface MouvementPot {
  id: string;
  libelle: string;
  montant: number;
  sortie: boolean;
  /** Une saisie s'ouvre dans EC-18 ; une répartition ou un déplacement, non. */
  saisie: boolean;
}

/** Ce qui est entré et sorti d'un pot, le plus récent en premier (EC-28). */
export function mouvementsDuPot(etat: Etat, recette: Recette, potId: string, libelleDe: (categorie?: string) => string, mots: { repartition: string; deplacement: string }): MouvementPot[] {
  const pot = recette.pots.find((p) => p.id === potId);
  if (!pot) return [];
  const dateAuj = etat.aujourdhui ?? AUJOURDHUI;
  const lues = new Set(recette.pots.filter((p) => !p.quotidien).flatMap((p) => p.natures ?? []));
  const liste: MouvementPot[] = [];
  for (const e of ecrituresActives(etat.ecritures)) {
    if (e.type === 'repartition' && e.parts[potId]) {
      liste.push({ id: e.id, libelle: mots.repartition, montant: e.parts[potId]!, sortie: false, saisie: false });
    }
    if (e.type === 'revenu') {
      const parts = repartir(e.montant, recette);
      const montant = parts[potId] ?? 0;
      if (montant > 0) {
        liste.push({ id: e.id, libelle: mots.repartition, montant, sortie: false, saisie: false });
      }
    }
    if (e.type === 'deplacement' && (e.de === potId || e.vers === potId)) {
      liste.push({ id: e.id, libelle: mots.deplacement, montant: e.montant, sortie: e.de === potId, saisie: false });
    }
    if (e.type === 'depense') {
      const lit = pot.quotidien ? !e.nature || !lues.has(e.nature) : !!e.nature && (pot.natures ?? []).includes(e.nature);
      if (lit && e.at.slice(0, 10) <= dateAuj) {
        liste.push({ id: e.id, libelle: libelleDe(e.categorie), montant: e.montant, sortie: true, saisie: true });
      }
    }
  }
  return liste.reverse().slice(0, 12);
}

/** Les natures qu'un pot lit : les siennes ; pour le quotidien, toutes celles qu'aucun autre ne lit. */
export function naturesLues(recette: Recette, pot: Pot, utilisees: string[]): string[] {
  if (!pot.quotidien || pot.natures?.length) return pot.natures ?? [];
  const autres = new Set(recette.pots.filter((p) => p !== pot).flatMap((p) => p.natures ?? []));
  return utilisees.filter((n) => !autres.has(n));
}

/**
 * Natures utilisées qu'aucun pot ne lit (EC-34). Un pot du quotidien sans liste lit tout
 * ce que les autres ne lisent pas : il n'y en a alors aucune.
 */
export function naturesNonRangees(recette: Recette, utilisees: string[]): string[] {
  if (recette.pots.some((p) => p.quotidien && !p.natures?.length)) return [];
  const lues = new Set(recette.pots.flatMap((p) => p.natures ?? []));
  return utilisees.filter((n) => !lues.has(n));
}

/** Natures des catégories réellement utilisées, et des charges déclarées. */
export function naturesUtilisees(etat: Etat, natureDe: (c?: string) => string | undefined, charges: { id: string }[]): string[] {
  const n = new Set<string>();
  for (const e of ecrituresActives(etat.ecritures)) if (e.type === 'depense' && e.nature) n.add(e.nature);
  for (const c of charges) {
    const x = natureDe(c.id);
    if (x) n.add(x);
  }
  return [...n];
}

/** Adopte une recette : elle agit au prochain cycle. Rend la fonction qui l'annule. */
export function adopter(etat: Etat, recette: Recette): () => void {
  const r = useRegistre.getState();
  const perso = estDuCatalogue(recette) || r.recettesPerso.some((x) => x.id === recette.id) ? r.recettesPerso : [...r.recettesPerso, recette];
  const avant = r.recettes;
  r.modifier({ recettesPerso: perso, recettes: [...avant, { recette, effetDepuis: datePremierEffet(etat) }] });
  return () => useRegistre.getState().modifier({ recettes: avant });
}

/** Le chiffre avant et après une écriture hypothétique (déplacement, répartition). */
export function chiffreAvecEcriture(etat: Etat, ecriture: Etat['ecritures'][number]): { avant: number; apres: number } {
  return { avant: calculer(etat).chiffre, apres: calculer({ ...etat, ecritures: [...etat.ecritures, ecriture] }).chiffre };
}

/** Une recette ajustée est une copie : l'original du catalogue reste intact (REC-06). */
export function idCopie(genre: 'ajustee' | 'ecrite' | 'recue', origine?: Recette): string {
  return `${genre}~${origine?.id ?? ''}~${Date.now().toString(36)}`;
}

/** Source affichée : le catalogue cite la sienne ; une copie dit d'où elle vient. */
export function sourceDe(r: Recette, t: (k: string) => string): string {
  const genre = r.id.split('~')[0];
  if (genre === 'ajustee') return t('ec30.ajustee');
  if (genre === 'ecrite') return t('ec30.ecrite');
  if (genre === 'recue') return t('ec30.recue');
  return (t as unknown as (k: string, o: object) => Record<string, string>)('ec08.sources', { returnObjects: true })[r.id] ?? '';
}

/** Natures à ranger avant d'adopter cette recette (EC-34) : vide, l'écran ne s'affiche pas. */
export function aRanger(etat: Etat, recette: Recette, charges: { id: string }[], natureDe: (c?: string) => string | undefined): string[] {
  return naturesNonRangees(recette, naturesUtilisees(etat, natureDe, charges));
}

/** Recette qui attend EC-34 avant d'être adoptée, avec le bandeau à montrer ensuite. */
export const enAttente: { recette: Recette | null; message: string } = { recette: null, message: '' };
