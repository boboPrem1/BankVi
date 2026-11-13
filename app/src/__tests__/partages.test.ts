import { fr } from '@/i18n/fr';
import { cleSuggestion, estCategorieSensible, estLibelleSensible } from '@/registre/partages';
import { useRegistre } from '@/registre/store';

describe('06-partages', () => {
  beforeEach(() => {
    useRegistre.getState().reinitialiser();
  });

  describe('EC-47 Pourquoi cette suggestion ?', () => {
    it('construit une clé stable et permet de masquer/rétablir une suggestion', () => {
      const cle = cleSuggestion('transport', 500, 'Zémidjan');
      expect(cle).toBe('transport:500:zemidjan');

      useRegistre.getState().modifier({ suggestionsMasquees: [cle] });
      expect(useRegistre.getState().suggestionsMasquees).toContain(cle);

      useRegistre.getState().modifier({
        suggestionsMasquees: useRegistre.getState().suggestionsMasquees.filter((c) => c !== cle),
      });
      expect(useRegistre.getState().suggestionsMasquees).not.toContain(cle);
    });
  });

  describe('EC-48 Libellé sensible', () => {
    it('détecte les catégories et libellés sensibles sans faux positifs courants', () => {
      expect(estCategorieSensible('sante')).toBe(true);
      expect(estCategorieSensible('transport')).toBe(false);

      expect(estLibelleSensible('Pharmacie du centre')).toBe(true);
      expect(estLibelleSensible('Dîme église')).toBe(true);
      expect(estLibelleSensible('Cotisation syndicat')).toBe(true);
      expect(estLibelleSensible('Riz sauce')).toBe(false);
    });

    it('mémorise le consentement pour ne pas redemander', () => {
      useRegistre.getState().modifier({ libellesSensiblesConsenties: ['sante'] });
      expect(useRegistre.getState().libellesSensiblesConsenties).toEqual(['sante']);
    });
  });

  describe('EC-49 Reprendre', () => {
    it('repartirDeZero efface écritures et bilans tout en gardant recettes et sécurité', () => {
      useRegistre.getState().ecrire([
        { ecriture: { type: 'depense', montant: 1500, categorie: 'repas', poche: 'especes', at: '2026-11-10T12:00' } },
      ]);
      useRegistre.getState().modifier({
        brouillon: 2000,
        securite: { verrouillage: true, email: 'camille@exemple.tg' },
        recettes: [{ recette: { id: 'r1', nom: 'Test', pots: [] }, effetDepuis: '2026-11-01' }],
      });

      useRegistre.getState().repartirDeZero();

      const etat = useRegistre.getState();
      expect(etat.ecritures).toHaveLength(0);
      expect(etat.brouillon).toBeNull();
      expect(etat.bilan).toBeNull();
      expect(etat.recettes).toHaveLength(1);
      expect(etat.securite.verrouillage).toBe(true);
    });
  });

  describe('EC-51 et EC-53 traductions et état', () => {
    it('contient toutes les clés i18n requises pour ec47, ec48, ec49, ec51, ec53', () => {
      expect(fr.ec47.titre).toBe('Pourquoi cette suggestion ?');
      expect(fr.ec48.utiliser).toBe('Utiliser ce libellé');
      expect(fr.ec49.repartir).toBe('Repartir de zéro');
      expect(fr.ec51.phrase).toBe('Tes montants sont protégés.');
      expect(fr.ec53.titre).toBe('Retrouve ton compte');
      expect(fr.ec53.titreInactif).toBe('Vérifions que c’est bien toi');
      expect(fr.ec10.numeroPerdu).toBe('J’ai perdu ce numéro');
    });
  });
});
