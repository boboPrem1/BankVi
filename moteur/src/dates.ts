/** Dates civiles au format AAAA-MM-JJ, sans heure ni fuseau : le calcul reste déterministe. */
export type DateISO = string;

const JOUR_MS = 86_400_000;

function versMs(d: DateISO): number {
  const [a, m, j] = d.split("-").map(Number) as [number, number, number];
  return Date.UTC(a, m - 1, j);
}

function depuisMs(ms: number): DateISO {
  return new Date(ms).toISOString().slice(0, 10);
}

export function ajouterJours(d: DateISO, n: number): DateISO {
  return depuisMs(versMs(d) + n * JOUR_MS);
}

/** Nombre de jours de `a` à `b` : positif si `b` est après `a`. */
export function ecartJours(a: DateISO, b: DateISO): number {
  return Math.round((versMs(b) - versMs(a)) / JOUR_MS);
}

export function joursDuMois(d: DateISO): number {
  const [a, m] = d.split("-").map(Number) as [number, number];
  return new Date(Date.UTC(a, m, 0)).getUTCDate();
}

export function jourDuMois(d: DateISO): number {
  return Number(d.slice(8, 10));
}

export function moisDe(d: DateISO): string {
  return d.slice(0, 7);
}

export function finDuMois(d: DateISO): DateISO {
  return `${moisDe(d)}-${String(joursDuMois(d)).padStart(2, "0")}`;
}

export function debutDuMois(d: DateISO): DateISO {
  return `${moisDe(d)}-01`;
}

/** Même mois décalé de `n` mois, le jour étant ramené au dernier jour du mois s'il n'existe pas. */
export function dansMois(d: DateISO, n: number, jour = jourDuMois(d)): DateISO {
  const [a, m] = d.split("-").map(Number) as [number, number];
  const debut = new Date(Date.UTC(a, m - 1 + n, 1));
  const base = depuisMs(debut.getTime());
  const j = Math.min(jour, joursDuMois(base));
  return `${moisDe(base)}-${String(j).padStart(2, "0")}`;
}

export function ecartMois(a: DateISO, b: DateISO): number {
  const [aa, am] = a.split("-").map(Number) as [number, number];
  const [ba, bm] = b.split("-").map(Number) as [number, number];
  return (ba - aa) * 12 + (bm - am);
}
