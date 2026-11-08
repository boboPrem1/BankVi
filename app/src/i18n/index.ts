import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { fr } from './fr';

// Français seul en P1. Les autres langues s'ajoutent ici si les entretiens le demandent.
const i18n = createInstance();

void i18n.use(initReactI18next).init({
  lng: 'fr',
  fallbackLng: 'fr',
  resources: { fr: { translation: fr } },
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
