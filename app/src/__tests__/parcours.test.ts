import { calculer, horizon } from '@bankvi/moteur';

import { CAMILLE_REPONSES } from '@/demo/camille';
import { pasRond } from '@/format/axe';
import { etatDepuis, totalCharges } from '@/parcours/etat';
import { useParcours } from '@/parcours/store';

const reponses = () => ({ ...useParcours.getState(), ...CAMILLE_REPONSES });

describe('parcours de premier lancement', () => {
  beforeEach(() => useParcours.getState().reinitialiser());

  it('les réponses de Camille redonnent les chiffres d’EC-06', () => {
    const c = calculer(etatDepuis(reponses()));
    expect(c.soldesPerso).toBe(90000);
    expect(-c.mouvements.reduce((s, m) => (m.montant < 0 ? s + m.montant : s), 0)).toBe(18000);
    expect(c.resteAVivre).toBe(72000);
    expect(c.jours).toBe(22);
    expect(c.chiffre).toBe(3200);
    expect(totalCharges(reponses())).toBe(78000);
  });

  it('la courbe de Camille suit le tableau d’EC-06', () => {
    const p = horizon(etatDepuis(reponses()), 30).points;
    expect(p[0]!.solde).toBe(90000);
    expect(p[21]!.solde).toBe(4800);
    expect(p[22]!.solde).toBe(121600);
    expect(p[30]!.solde).toBe(50400);
  });

  it('une poche laissée vide n’est pas créée, « sans Mixx ni Flooz » les ignore', () => {
    const vide = etatDepuis({ ...reponses(), mixx: null });
    expect(vide.poches.map((p) => p.id)).toEqual(['especes']);
    const sans = etatDepuis({ ...reponses(), sansMobile: true });
    expect(sans.poches.map((p) => p.id)).toEqual(['especes']);
  });

  it('réinitialiser purge toutes les réponses', () => {
    useParcours.getState().modifier(CAMILLE_REPONSES);
    useParcours.getState().reinitialiser();
    const e = useParcours.getState();
    expect([e.especes, e.mixx, e.typeRevenu, e.montantRevenu, e.jourRevenu, e.charges.length, e.numero]).toEqual([
      null, null, null, null, null, 0, '',
    ]);
  });
});

describe('axe de la courbe', () => {
  it('garde 3 ou 4 graduations rondes, à toute échelle', () => {
    expect(pasRond(121600)).toBe(50000);
    expect(pasRond(90_580_900)).toBe(50_000_000);
    expect(pasRond(5000)).toBe(2000);
    for (const etendue of [1000, 72000, 121600, 2_500_000, 99_999_999]) {
      expect(Math.ceil(etendue / pasRond(etendue))).toBeLessThanOrEqual(3);
    }
  });
});
