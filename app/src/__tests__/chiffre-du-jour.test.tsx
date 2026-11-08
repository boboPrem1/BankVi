import '@/i18n';

import { calculer } from '@bankvi/moteur';
import { render, screen } from '@testing-library/react-native';

import { ChiffreDuJour } from '@/composants/ChiffreDuJour';
import { CAMILLE } from '@/demo/camille';
import { jourDansPhrase } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';

describe('formats', () => {
  it('écrit les montants avec une espace insécable et le vrai signe moins', () => {
    expect(nombre(3200)).toBe('3 200');
    expect(nombre(120000)).toBe('120 000');
    expect(nombre(-8000)).toBe('−8 000');
    expect(fcfa(500)).toBe('500 FCFA');
    expect(() => nombre(12.5)).toThrow();
  });

  it('ajoute le mois seulement pour un autre mois', () => {
    expect(jourDansPhrase('2026-11-28', '2026-11-06')).toBe('28');
    expect(jourDansPhrase('2026-12-03', '2026-11-30')).toBe('3 décembre');
  });
});

describe('ChiffreDuJour', () => {
  it('affiche le chiffre de Camille calculé par le moteur (EC-06)', async () => {
    await render(<ChiffreDuJour calcul={calculer(CAMILLE)} />);
    expect(screen.getByText('3 200')).toBeTruthy();
    expect(screen.getByText('jusqu’au 28')).toBeTruthy();
    expect(screen.getByLabelText('Aujourd’hui, tu peux dépenser 3200 francs CFA jusqu’au 28.')).toBeTruthy();
  });

  it('dit « Il manque » au lieu d’un nombre négatif', async () => {
    await render(<ChiffreDuJour calcul={{ chiffre: 0, manque: 8500, reference: '2026-11-28', date: '2026-11-06' }} />);
    expect(screen.getByText('Il manque')).toBeTruthy();
    expect(screen.getByText('8 500')).toBeTruthy();
    expect(screen.getByText('pour tes charges jusqu’au 28')).toBeTruthy();
  });
});
