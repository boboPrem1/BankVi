import { AUJOURDHUI, useParcours } from '@/parcours/store';
import { etatComplet } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { fr } from '@/i18n/fr';

describe('Lot 05-plus : Réglages et gestion', () => {
  beforeEach(() => {
    useRegistre.getState().reinitialiser();
    useParcours.getState().reinitialiser();
  });

  describe('EC-38 Mes poches & Activité', () => {
    it('ajoute la poche activité à l’état complet lorsqu’un solde d’activité est défini', () => {
      const parcours = {
        ...useParcours.getState(),
        especes: 30000,
        mixx: 20000,
      };

      const etatInitial = etatComplet(parcours, { ecritures: [], prevus: [] });
      expect(etatInitial.poches.some((p) => p.id === 'activite')).toBe(false);

      const etatAvecActivite = etatComplet(parcours, {
        ecritures: [],
        prevus: [],
        soldeActivite: 45000,
      });

      expect(etatAvecActivite.poches.some((p) => p.id === 'activite')).toBe(true);
      const pocheActivite = etatAvecActivite.poches.find((p) => p.id === 'activite');
      expect(pocheActivite?.genre).toBe('activite');

      const comptageActivite = etatAvecActivite.ecritures.find(
        (e) => e.type === 'comptage' && e.poche === 'activite',
      );
      expect(comptageActivite).toBeDefined();
      if (comptageActivite && comptageActivite.type === 'comptage') {
        expect(comptageActivite.montant).toBe(45000);
      }
    });

    it('gère le masquage et le rétablissement de poches', () => {
      const r = useRegistre.getState();
      expect(r.pochesMasquees).toEqual([]);

      r.modifier({ pochesMasquees: ['mixx'] });
      expect(useRegistre.getState().pochesMasquees).toContain('mixx');

      r.modifier({ pochesMasquees: [] });
      expect(useRegistre.getState().pochesMasquees).toEqual([]);
    });
  });

  describe('EC-40 Rituel et alertes', () => {
    it('enregistre l’état de pause du rituel et les préférences d’alerte', () => {
      const r = useRegistre.getState();
      expect(r.rituelEnPause).toBe(false);
      expect(r.alertes.decouvert).toBe(true);

      r.modifier({
        rituelEnPause: true,
        alertes: { decouvert: false, pass: true },
      });

      const maj = useRegistre.getState();
      expect(maj.rituelEnPause).toBe(true);
      expect(maj.alertes.decouvert).toBe(false);
      expect(maj.alertes.pass).toBe(true);
    });
  });

  describe('EC-42 Liste d’attente Pass Pro', () => {
    it('enregistre et retire l’inscription à la liste d’attente', () => {
      const r = useRegistre.getState();
      expect(r.listeAttentePro).toBe(false);

      r.modifier({ listeAttentePro: true });
      expect(useRegistre.getState().listeAttentePro).toBe(true);

      r.modifier({ listeAttentePro: false });
      expect(useRegistre.getState().listeAttentePro).toBe(false);
    });
  });

  describe('EC-43 Habitudes et apprentissage', () => {
    it('met à jour les listes d’habitudes fausses et oubliées', () => {
      const r = useRegistre.getState();
      expect(r.appris.actif).toBe(true);

      r.modifier({
        appris: {
          actif: false,
          faux: ['h1'],
          oublies: ['h2'],
        },
      });

      const maj = useRegistre.getState();
      expect(maj.appris.actif).toBe(false);
      expect(maj.appris.faux).toEqual(['h1']);
      expect(maj.appris.oublies).toEqual(['h2']);
    });
  });

  describe('EC-44 Mes natures', () => {
    it('mémorise les classifications de catégories par l’utilisateur', () => {
      const r = useRegistre.getState();
      expect(r.naturesClassees).toEqual({});

      r.modifier({
        naturesClassees: { transport: 'Besoin', sorties: 'Envie' },
      });

      expect(useRegistre.getState().naturesClassees['transport']).toBe('Besoin');
      expect(useRegistre.getState().naturesClassees['sorties']).toBe('Envie');
    });
  });

  describe('EC-52 Sécurité', () => {
    it('enregistre l’état de verrouillage et l’e-mail de secours', () => {
      const r = useRegistre.getState();
      expect(r.securite.verrouillage).toBe(false);

      r.modifier({
        securite: { verrouillage: true, email: 'secours@bankvi.tg' },
      });

      const maj = useRegistre.getState();
      expect(maj.securite.verrouillage).toBe(true);
      expect(maj.securite.email).toBe('secours@bankvi.tg');
    });
  });

  describe('Traductions i18n du lot 05-plus', () => {
    it('contient toutes les clés requises pour EC-37 à EC-46 et EC-52', () => {
      expect(fr.ec37.titre).toBe('Plus');
      expect(fr.ec38.titre).toBe('Mes poches');
      expect(fr.ec39.titre).toBe('Revenus et charges');
      expect(fr.ec40.titre).toBe('Mon rituel et alertes');
      expect(fr.ec41.titre).toBe('Pass Plus');
      expect(fr.ec42.titre).toBe('Pass Pro');
      expect(fr.ec43.titre).toBe('Ce que l’app a appris');
      expect(fr.ec44.titre).toBe('Mes natures');
      expect(fr.ec45.titre).toBe('Mes données');
      expect(fr.ec46.titre).toBe('À propos');
      expect(fr.ec52.titre).toBe('Sécurité');
    });
  });
});
