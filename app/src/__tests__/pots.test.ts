import { CATALOGUE, calculer, type Ecriture, type Recette } from '@bankvi/moteur';

import { CAMILLE_REPONSES } from '@/demo/camille';
import { useParcours } from '@/parcours/store';
import { natureDe } from '@/registre/categories';
import { maintenant } from '@/registre/etat';
import { lienDe, lireLien } from '@/registre/partage';
import { lirePhrase, recetteDePhrase } from '@/registre/phrase';
import {
  aRanger,
  baseDe,
  chiffreAvecEcriture,
  etatDesPots,
  mouvementsDuPot,
  naturesLues,
  naturesUtilisees,
} from '@/registre/pots';
import { useRegistre } from '@/registre/store';

beforeEach(() => {
  useParcours.getState().reinitialiser();
  useRegistre.getState().reinitialiser();
});

describe('EC-27 et EC-28 : les pots de Camille le 6 décembre', () => {
  const decembre = (plus: Ecriture[] = []) => {
    useParcours.getState().modifier(CAMILLE_REPONSES);
    const r = useRegistre.getState();
    r.modifier({
      recettes: [{ recette: CATALOGUE['70-20-10'], effetDepuis: '2026-11-28' }],
    });
    r.remplir({
      ecritures: [
        { id: 's', at: '2026-11-28T08:00', type: 'revenu', poche: 'mixx', montant: 120000, prevu: { id: 'salaire', date: '2026-11-28' } },
        { id: 'c', at: '2026-12-06T07:00', type: 'comptage', poche: 'mixx', montant: 60000 },
        ...plus,
      ],
    });
  };

  it('les 3 pots et leurs cibles sur 70 / 20 / 10', () => {
    decembre();
    const etat = {
      ...useParcours.getState(),
      ...useRegistre.getState(),
      aujourdhui: '2026-12-06',
      poches: [
        { id: 'especes', nom: 'Espèces', genre: 'perso' as const },
        { id: 'mixx', nom: 'Mixx', genre: 'perso' as const },
      ],
      revenus: [{ type: 'regulier' as const, id: 'salaire', nom: 'Salaire', montant: 120000, jour: 28, depuis: '2026-11-28' }],
      prevus: [
        { id: 'loyer', nom: 'Loyer', montant: 60000, sens: 'sortie' as const, rythme: 'mensuel' as const, jour: 1, depuis: '2026-11-28' },
        { id: 'elec', nom: 'Électricité', montant: 8000, sens: 'sortie' as const, rythme: 'mensuel' as const, jour: 15, depuis: '2026-11-28' },
        { id: 'tontine', nom: 'Tontine', montant: 10000, sens: 'sortie' as const, rythme: 'mensuel' as const, jour: 20, depuis: '2026-11-28' },
      ],
    };

    expect(baseDe(etat)).toBe(120000);
    const res = etatDesPots(etat);
    expect(res).toBeDefined();
    expect(res!.rempli).toBe(true);

    const pots = res!.pots;
    expect(pots.map((p) => [p.pot.nom, p.cible, p.reste])).toEqual([
      ['Vie courante', 84000, 24000],
      ['Épargne', 24000, 24000],
      ['Dettes ou dons', 12000, 12000],
    ]);

    // Chiffre du jour : 200 FCFA
    const c = calculer(etat);
    expect(c.chiffre).toBe(200);

    // Déplacement de 12 000 FCFA d'Épargne vers Vie courante : chiffre monte à 800 FCFA
    const { avant, apres } = chiffreAvecEcriture(etat, {
      id: 'd1',
      at: '2026-12-06T08:00',
      type: 'deplacement',
      de: 'epargne',
      vers: 'vie-courante',
      montant: 12000,
    });
    expect(avant).toBe(200);
    expect(apres).toBe(800);
  });

  it('mouvements d’un pot', () => {
    decembre();
    const etat = {
      ...useParcours.getState(),
      ...useRegistre.getState(),
      aujourdhui: '2026-12-06',
      poches: [{ id: 'mixx', nom: 'Mixx', genre: 'perso' as const }],
      revenus: [],
      prevus: [],
    };
    const mots = { repartition: 'Répartition', deplacement: 'Déplacement' };
    const m = mouvementsDuPot(etat, CATALOGUE['70-20-10'], 'epargne', () => 'Dépense', mots);
    expect(m.length).toBeGreaterThanOrEqual(1);
    expect(m[0]!.libelle).toBe('Répartition');
    expect(m[0]!.montant).toBe(24000);
  });
});

describe('EC-33 : écrire une recette', () => {
  it('lit une phrase correcte et en fait une recette', () => {
    const lecture = lirePhrase('70 besoins, 20 épargne, 10 envies');
    expect(lecture.type).toBe('ok');
    if (lecture.type === 'ok') {
      const r = recetteDePhrase(lecture.pots, 'ma-recette');
      expect(r.nom).toBe('70 / 20 / 10');
      expect(r.pots).toHaveLength(3);
      expect(r.pots[0]!.nom).toBe('Besoins');
      expect(r.pots[0]!.quotidien).toBe(true);
      expect(r.pots[1]!.nom).toBe('Épargne');
      expect(r.pots[1]!.quotidien).toBe(false);
    }
  });

  it('signale une somme incomplète ou excessive', () => {
    const manque = lirePhrase('50 besoins, 30 épargne');
    expect(manque.type).toBe('somme');
    if (manque.type === 'somme') expect(manque.somme).toBe(80);

    const trop = lirePhrase('60 besoins, 30 épargne, 20 envies');
    expect(trop.type).toBe('somme');
    if (trop.type === 'somme') expect(trop.somme).toBe(110);
  });

  it('détecte le texte vide ou incompréhensible', () => {
    expect(lirePhrase('').type).toBe('vide');
    expect(lirePhrase('    ').type).toBe('vide');
    expect(lirePhrase('n importe quoi sans chiffres').type).toBe('incompris');
  });
});

describe('EC-34 : natures non rangées', () => {
  it('détecte les natures orphelines si une recette ne lit pas les dépenses réelles', () => {
    const recetteSansTransport: Recette = {
      id: 'test',
      nom: 'Test',
      pots: [
        { id: 'epargne', nom: 'Épargne', regle: { type: 'pourcentage', valeur: 100 }, quotidien: false, natures: ['epargne'] },
      ],
    };
    const etat = {
      ...useParcours.getState(),
      ...useRegistre.getState(),
      aujourdhui: '2026-11-06',
      poches: [{ id: 'especes', nom: 'Espèces', genre: 'perso' as const }],
      ecritures: [
        { id: 'd1', at: '2026-11-06T12:00', type: 'depense' as const, poche: 'especes', montant: 1000, nature: 'transport' },
      ],
      revenus: [],
      prevus: [],
    };

    const utilisees = naturesUtilisees(etat, natureDe, []);
    expect(utilisees).toContain('transport');

    const orphelines = aRanger(etat, recetteSansTransport, [], natureDe);
    expect(orphelines).toContain('transport');
  });
});

describe('EC-35 et EC-36 : partage et import de recette', () => {
  it('sérialise et désérialise fidèlement une recette', () => {
    const source = CATALOGUE['70-20-10'];
    const lien = lienDe(source);
    expect(lien.startsWith('bankvi://recette-recue?d=')).toBe(true);

    const brut = decodeURIComponent(lien.split('?d=')[1]!);
    const lue = lireLien(brut, 'recette-recue-1');
    expect(lue).toBeDefined();
    expect(lue!.nom).toBe(source.nom);
    expect(lue!.pots.length).toBe(source.pots.length);
    expect(lue!.pots[0]!.nom).toBe(source.pots[0]!.nom);
    expect(lue!.pots[0]!.regle).toEqual(source.pots[0]!.regle);
  });

  it('rejette les liens invalides, corrompus ou trop volumineux', () => {
    expect(lireLien(undefined, 'r1')).toBeUndefined();
    expect(lireLien('not a json', 'r1')).toBeUndefined();
    expect(lireLien(JSON.stringify({ n: '<script>alert(1)</script>', p: [] }), 'r1')).toBeUndefined();
  });
});
