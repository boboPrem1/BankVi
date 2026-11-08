import { calculer, horizon, reperes, simuler, type Etat } from '@bankvi/moteur';

import { CAMILLE_REPONSES } from '@/demo/camille';
import { etatDepuis } from '@/parcours/etat';
import { useParcours } from '@/parcours/store';

const camille = (): Etat => etatDepuis({ ...useParcours.getState(), ...CAMILLE_REPONSES });

/** Les chiffres d'exemple de 03-horizon, recalculés par le moteur. */
describe('Mon horizon (EC-23)', () => {
  beforeEach(() => useParcours.getState().reinitialiser());

  it('les trois repères de Camille', () => {
    const r = reperes(camille());
    expect([r.j3.date, r.j3.solde]).toEqual(['2026-11-09', 80400]);
    expect([r.j7.date, r.j7.solde]).toEqual(['2026-11-13', 67600]);
    expect([r.j30.date, r.j30.solde]).toEqual(['2026-12-06', 50400]);
  });

  it('point bas sur 30 et sur 90 jours', () => {
    const p30 = horizon(camille(), 30).points;
    const bas30 = p30.reduce((a, b) => (b.solde < a.solde ? b : a));
    expect([bas30.date, bas30.solde]).toEqual(['2026-11-27', 4800]);
    expect(p30[9]!.solde).toBe(53200);

    const p90 = horizon(camille(), 90).points;
    const bas90 = p90.reduce((a, b) => (b.solde < a.solde ? b : a));
    expect([bas90.date, bas90.solde]).toEqual(['2027-01-27', 1600]);
    expect([p90[90]!.date, p90[90]!.solde]).toEqual(['2027-02-04', 86100]);
  });

  it('la situation de manque, avec 9 500 FCFA aujourd’hui', () => {
    const e = etatDepuis({ ...useParcours.getState(), ...CAMILLE_REPONSES, especes: 9500, mixx: 0 });
    const p = horizon(e, 30).points;
    expect(p.find((x) => x.date === '2026-11-15')!.solde).toBe(1500);
    expect(p.find((x) => x.date === '2026-11-20')!.solde).toBe(-8500);
  });
});

describe('Puis-je me permettre ça ? (EC-25)', () => {
  beforeEach(() => useParcours.getState().reinitialiser());

  it('les quatre réponses de la fiche', () => {
    expect(simuler(camille(), { montant: 15000, date: '2026-11-06' }).apres).toBe(2500);
    expect(simuler(camille(), { montant: 60000, date: '2026-11-06' }).apres).toBe(500);
    const manque = simuler(camille(), { montant: 80000, date: '2026-11-06' });
    expect(manque.manque).toEqual({ montant: 8000, date: '2026-11-20' });
    const tard = simuler(camille(), { montant: 40000, date: '2026-12-03' });
    expect(tard.avantReferenceInchange).toBe(true);
    expect(tard.ensuite).toMatchObject({ chiffre: 100, jusqua: '2026-12-28' });
  });
});

describe('Événement à venir (EC-26)', () => {
  beforeEach(() => useParcours.getState().reinitialiser());

  it('Mariage, 20 000 FCFA le 14 novembre : 2 300 FCFA par jour', () => {
    const e = camille();
    const avec: Etat = { ...e, prevus: [...e.prevus, { id: 'm', nom: 'Mariage', montant: 20000, sens: 'sortie', rythme: 'une-fois', date: '2026-11-14' }] };
    expect(calculer(avec).chiffre).toBe(2300);
  });
});
