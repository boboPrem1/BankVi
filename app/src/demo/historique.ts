import { useRegistre, type Registre } from '@/registre/store';

type Entree = Parameters<Registre['ecrire']>[0][number];

const dep = (at: string, categorie: string, montant: number, description?: string): Entree => ({
  ecriture: { at, type: 'depense', poche: 'especes', montant, categorie },
  meta: { origine: 'toi', ...(description ? { description } : {}) },
});

/**
 * La semaine de Camille avant le 6 novembre, et sa matinée du 6 (README de 02-aujourdhui) :
 * de quoi voir des habitudes, l'historique et le fait « Hier » du statut.
 * Ce qui précède le comptage du 6 à 07:00 ne change pas les soldes.
 */
export function chargerSemaineDeCamille() {
  const jours = ['2026-11-02', '2026-11-03', '2026-11-04'];
  const entrees: Entree[] = jours.flatMap((j) => [dep(`${j}T08:10`, 'transport', 500, 'Taxi'), dep(`${j}T12:30`, 'dejeuner', 1000)]);
  entrees.push(
    dep('2026-11-05T08:12', 'transport', 500, 'Taxi'),
    dep('2026-11-05T12:40', 'dejeuner', 1000),
    dep('2026-11-05T18:20', 'courses', 1000),
    { ecriture: { at: '2026-11-05T20:00', type: 'comptage', poche: 'especes', montant: 32800 } },
    { ecriture: { at: '2026-11-06T08:00', type: 'revenu', poche: 'especes', montant: 2000, categorie: 'pret-rendu' }, meta: { origine: 'toi' } },
    dep('2026-11-06T08:12', 'transport', 500, 'Taxi'),
    dep('2026-11-06T08:30', 'courses', 300, 'Pain'),
  );
  useRegistre.getState().ecrire(entrees);
  // Le compte de Camille a le Pass Plus : on voit les 90 jours de l'horizon (choix de démonstration).
  useRegistre.getState().modifier({ pass: true });
}
