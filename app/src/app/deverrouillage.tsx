import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { Icone } from '@/icones/Icone';
import { useRegistre } from '@/registre/store';
import { space, type, useTheme } from '@/theme';

/** EC-51 Déverrouillage : cache les montants sans mot de passe propre, via le verrou du téléphone. */
export default function Deverrouillage() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const securite = useRegistre((r) => r.securite);
  const [demandeOuverte, setDemandeOuverte] = useState(true);

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(t('ec51.annonce'));
  }, [t]);

  const quitterVersApp = () => {
    setDemandeOuverte(false);
    if (router.canGoBack()) router.back();
    else router.replace('/accueil');
  };

  const simulerCodeRetire = () => {
    useRegistre.getState().modifier({
      securite: { ...securite, verrouillage: false },
    });
    quitterVersApp();
    annoncer(t('ec51.codeRetireBandeau'));
  };

  return (
    <View
      style={[
        styles.ecran,
        {
          backgroundColor: colors.bg.canvas,
          paddingTop: insets.top + 96,
          paddingBottom: Math.max(insets.bottom, space.s5),
        },
      ]}
    >
      <View style={styles.centre}>
        <Text style={[type.subtitle, styles.marque, { color: colors.text.link }]}>{t('ec51.marque')}</Text>
        <View accessible={false} style={styles.icone}>
          <Icone nom="lock" taille={48} couleur={colors.text.secondary} />
        </View>
        <Text style={[type.bodyLarge, styles.phrase, { color: colors.text.primary }]}>{t('ec51.phrase')}</Text>
      </View>

      <View style={styles.pied}>
        <BoutonPrincipal libelle={t('ec51.deverrouiller')} onPress={() => setDemandeOuverte(true)} />
      </View>

      <FeuilleBasse visible={demandeOuverte} titre={t('ec51.demandeTitre')} onFermer={() => setDemandeOuverte(false)}>
        <View style={styles.feuille}>
          <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{t('ec51.demandeTexte')}</Text>
          <View style={styles.actions}>
            <BoutonPrincipal libelle={t('ec51.simulerReussite')} onPress={quitterVersApp} />
            <BoutonTexte libelle={t('ec51.simulerAnnuler')} onPress={() => setDemandeOuverte(false)} />
            <BoutonTexte libelle={t('ec51.simulerCodeRetire')} onPress={simulerCodeRetire} />
          </View>
        </View>
      </FeuilleBasse>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    paddingHorizontal: space.s6,
    justifyContent: 'space-between',
  },
  centre: {
    alignItems: 'center',
  },
  marque: {
    marginBottom: 48,
  },
  icone: {
    marginBottom: space.s4,
  },
  phrase: {
    textAlign: 'center',
  },
  pied: {
    paddingTop: space.s4,
  },
  feuille: {
    rowGap: space.s4,
    paddingBottom: space.s4,
  },
  actions: {
    rowGap: space.s2,
  },
});
