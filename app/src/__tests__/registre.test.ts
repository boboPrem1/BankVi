import { calculer } from '@bankvi/moteur';

import { CAMILLE_REPONSES } from '@/demo/camille';
import { useParcours } from '@/parcours/store';
import { defaire, defaireRemplacement, noter, remplacer } from '@/registre/actions';
import { dejaNote, ecartActuel } from '@/registre/bilan';
import { decaler, etatComplet, saisies, suggestions } from '@/registre/etat';
import { useRegistre } from '@/registre/store';

const KARIM = {
  especes: 45000,
  mixx: 20000,
  flooz: null,
  sansMobile: false,
  typeRevenu: 'variable' as const,
  montantRevenu: 90000,
  jourRevenu: null,
  charges: [
    { id: 'loyer', nom: 'Loyer', icone: 'home' as const, feminin: false, montant: 15000, jour: 10 },
    { id: 'telephone', nom: 'Téléphone', icone: 'receipt_long' as const, feminin: false, montant: 6000, jour: 18 },
  ],
  preference: 'evening' as const,
};

const etat = () => etatComplet(useParcours.getState(), useRegistre.getState());

beforeEach(() => {
  useParcours.getState().reinitialiser();
  useRegistre.getState().reinitialiser();
});

describe('EC-19 à EC-21 : le bilan de Karim', () => {
  it('45 000 au matin, Déjeuner 1 000, 41 500 comptés : 2 500 FCFA d’écart, 4 600 FCFA demain', () => {
    useParcours.getState().modifier(KARIM);
    noter({ sens: 'depense', montant: 1000, categorie: 'dejeuner', poche: 'especes', dates: ['2026-11-06'], origine: 'toi', at: '2026-11-06T12:30' });
    expect(calculer(etat()).chiffre).toBe(4700);

    const at = '2026-11-06T20:00';
    useRegistre.getState().ecrire([{ ecriture: { at, type: 'comptage', poche: 'especes', montant: 41500 } }]);
    const bilan = { date: '2026-11-06', at, ecart: 0, compte: { especes: 41500 }, dejaNote: 0, chiffreAvant: 4700, termine: false };
    expect(ecartActuel(etat(), bilan)).toBe(2500);
    expect(dejaNote(etat(), bilan)).toBe(1000);

    // Une dépense détaillée juste avant le comptage baisse l'écart sans changer le solde compté.
    noter({ sens: 'depense', montant: 1500, categorie: 'transport', poche: 'especes', dates: ['2026-11-06'], origine: 'bilan', at: '2026-11-06T19:59' });
    expect(ecartActuel(etat(), bilan)).toBe(1000);
    expect(calculer(etat()).soldes.especes).toBe(41500);

    expect(calculer({ ...etat(), aujourdhui: decaler('2026-11-06', 1) }).chiffre).toBe(4600);
  });
});

describe('EC-22 : transfert', () => {
  it('Mixx 58 000 vers Espèces, 20 000 et 500 de frais : Mixx 37 500, Espèces 52 000', () => {
    useParcours.getState().modifier(CAMILLE_REPONSES);
    useRegistre.getState().ecrire([{ ecriture: { at: '2026-11-06T09:00', type: 'transfert', de: 'mixx', vers: 'especes', montant: 20000, frais: 500 } }]);
    const c = calculer(etat());
    expect(c.soldes.mixx).toBe(37500);
    expect(c.soldes.especes).toBe(52000);
    expect(c.chiffre).toBe(3200);
  });
});

describe('EC-13 et EC-18 : noter, corriger, supprimer, toujours annulable', () => {
  beforeEach(() => useParcours.getState().modifier(CAMILLE_REPONSES));

  it('« Annuler » retire la saisie ; une date future reste un prévu, jamais du réel', () => {
    const trace = noter({ sens: 'depense', montant: 500, categorie: 'transport', poche: 'especes', dates: ['2026-11-06'], origine: 'toi', at: '2026-11-06T08:12' });
    expect(calculer(etat()).soldes.especes).toBe(31500);
    defaire(trace);
    expect(calculer(etat()).soldes.especes).toBe(32000);

    noter({ sens: 'depense', montant: 8000, categorie: 'sorties', poche: 'especes', dates: ['2026-11-10'], origine: 'toi' });
    expect(calculer(etat()).soldes.especes).toBe(32000);
    expect(useRegistre.getState().prevus).toHaveLength(1);
  });

  it('Taxi de 500 à 700 : Espèces passe de 31 500 à 31 300, et « Annuler » rétablit 500', () => {
    const [id] = noter({ sens: 'depense', montant: 500, categorie: 'transport', poche: 'especes', dates: ['2026-11-06'], origine: 'toi', at: '2026-11-06T08:12' }).ecritures;
    const nouvelle = remplacer(id!, { montant: 700 })!;
    expect(calculer(etat()).soldes.especes).toBe(31300);
    expect(saisies(useRegistre.getState().ecritures)).toHaveLength(1);
    defaireRemplacement(id!, nouvelle);
    expect(calculer(etat()).soldes.especes).toBe(31500);
  });

  it('Plusieurs dates : une ligne par date, reliées en groupe', () => {
    const trace = noter({ sens: 'depense', montant: 1000, categorie: 'dejeuner', poche: 'especes', dates: ['2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '2026-11-06'], origine: 'toi' });
    expect(trace.ecritures).toHaveLength(5);
    const groupes = new Set(trace.ecritures.map((i) => useRegistre.getState().meta[i]?.groupe));
    expect(groupes.size).toBe(1);
  });
});

describe('Suggestions d’habitude', () => {
  it('une saisie revenue souvent, à la même heure, est proposée ; jamais une catégorie sensible', () => {
    const r = useRegistre.getState();
    for (const j of ['2026-11-03', '2026-11-04', '2026-11-05']) {
      r.ecrire([
        { ecriture: { at: `${j}T08:10`, type: 'depense', poche: 'especes', montant: 500, categorie: 'transport' }, meta: { origine: 'toi', description: 'Taxi' } },
        { ecriture: { at: `${j}T10:00`, type: 'depense', poche: 'especes', montant: 2000, categorie: 'sante' }, meta: { origine: 'toi' } },
      ]);
    }
    const s = suggestions(useRegistre.getState().ecritures, useRegistre.getState().meta, 'depense', '2026-11-06T08:00');
    expect(s[0]).toMatchObject({ categorie: 'transport', montant: 500, description: 'Taxi' });
    expect(s[0]!.confiance).toBeGreaterThanOrEqual(0.7);
    expect(s.some((x) => x.categorie === 'sante')).toBe(false);
  });
});
