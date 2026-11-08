const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];
const MOIS_COURTS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const NBSP = ' ';

// Les dates restent des chaînes ISO, comme dans le moteur : jamais d'objet Date ni de fuseau.
const jour = (iso: string) => Number(iso.slice(8, 10));
const mois = (iso: string) => Number(iso.slice(5, 7)) - 1;
const jourEcrit = (iso: string) => (jour(iso) === 1 ? '1er' : String(jour(iso)));

/** Échéance dans une phrase : « 28 » pour le mois en cours, « 1er décembre » pour un autre mois. */
export function jourDansPhrase(date: string, aujourdhui: string): string {
  if (date.slice(0, 7) === aujourdhui.slice(0, 7)) return jourEcrit(date);
  return `${jourEcrit(date)}${NBSP}${MOIS[mois(date)]}`;
}

/** Date dans un graphique : « 6 nov. ». */
export function dateCourte(date: string): string {
  return `${jour(date)}${NBSP}${MOIS_COURTS[mois(date)]}`;
}

/** Date lue par TalkBack : « 27 novembre ». */
export function dateLongue(date: string): string {
  return `${jourEcrit(date)} ${MOIS[mois(date)]}`;
}

const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const majuscule = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const jourSemaine = (date: string) => {
  const [a, m, j] = date.split('-').map(Number) as [number, number, number];
  return JOURS[new Date(Date.UTC(a, m - 1, j)).getUTCDay()]!;
};

/** « Novembre 2026 ». */
export function nomMois(mois: string): string {
  return `${majuscule(MOIS[Number(mois.slice(5, 7)) - 1]!)} ${mois.slice(0, 4)}`;
}

/** « Samedi 7 novembre » : repères de l'historique, lecture du calendrier, date de l'accueil. */
export function dateLongueJour(date: string): string {
  return majuscule(`${jourSemaine(date)} ${dateLongue(date)}`);
}

/** « Vendredi 6 nov. » : valeur d'une ligne de détail. */
export function dateCourteJour(date: string): string {
  return majuscule(`${jourSemaine(date)} ${dateCourte(date)}`);
}

/** « mardi » : début d'une période de bilan. */
export function nomJour(date: string): string {
  return jourSemaine(date);
}

/** Heure au format 24 h : « 20 h », « 18 h 30 ». */
export function heure(h: number, m: number): string {
  return m === 0 ? `${h}${NBSP}h` : `${h}${NBSP}h${NBSP}${String(m).padStart(2, '0')}`;
}
