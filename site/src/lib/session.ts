export type OffreId = '30j' | '1an';

export interface OffreInfo {
  id: OffreId;
  duree: string;
  libelle: string;
  prix: number;
  expiration: string;
}

export const OFFRES: Record<OffreId, OffreInfo> = {
  '30j': {
    id: '30j',
    duree: '30 jours',
    libelle: 'Pass Plus 30 jours',
    prix: 1000,
    expiration: '6 décembre',
  },
  '1an': {
    id: '1an',
    duree: '1 an',
    libelle: 'Pass Plus 1 an',
    prix: 10000,
    expiration: '6 novembre 2027',
  },
};

export interface SessionSite {
  numero: string;
  offre: OffreId;
  reference: string;
}

const CLE_SESSION = 'bankvi_site_session';

export function formaterNumero(chiffres: string): string {
  return `+228 ${chiffres.replace(/(\d{2})(?=\d)/g, '$1 ')}`;
}

export function formaterFcfa(montant: number): string {
  return `${montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;
}

export function lireSession(): SessionSite | null {
  if (typeof window === 'undefined') return null;
  try {
    const brut = window.sessionStorage.getItem(CLE_SESSION);
    if (!brut) return null;
    return JSON.parse(brut) as SessionSite;
  } catch {
    return null;
  }
}

export function enregistrerSession(patch: Partial<SessionSite>): SessionSite {
  const courant = lireSession() ?? {
    numero: '90123456',
    offre: '30j' as OffreId,
    reference: 'FP-482913',
  };
  const suivant: SessionSite = { ...courant, ...patch };
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(CLE_SESSION, JSON.stringify(suivant));
  }
  return suivant;
}

export function viderSession(): void {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(CLE_SESSION);
  }
}

