import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampCompact } from '@/composants/Champs';
import { LigneInterrupteur } from '@/composants/Choix';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { Icone } from '@/icones/Icone';
import { useParcours } from '@/parcours/store';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

/** EC-52 Sécurité : protéger les montants sur un téléphone prêté et éviter de perdre son compte. */
export default function Securite() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const securiteStore = useRegistre((r) => r.securite ?? { verrouillage: false });
  const compte = useParcours((p) => p.compte);
  const numero = useParcours((p) => p.numero);

  const [verrouillage, setVerrouillage] = useState(securiteStore.verrouillage);
  const [emailSecours, setEmailSecours] = useState(securiteStore.email ?? '');
  const [feuilleEmail, setFeuilleEmail] = useState(false);
  const [emailSaisi, setEmailSaisi] = useState('');

  const toggleVerrouillage = (val: boolean) => {
    setVerrouillage(val);
    useRegistre.getState().modifier({
      securite: { ...securiteStore, verrouillage: val },
    });
    annoncer(t('ec52.enregistre'));
  };

  const ouvrirFeuilleEmail = () => {
    setEmailSaisi(emailSecours);
    setFeuilleEmail(true);
  };

  const enregistrerEmail = () => {
    const propre = emailSaisi.trim();
    setEmailSecours(propre);
    useRegistre.getState().modifier({
      securite: { ...securiteStore, email: propre || undefined },
    });
    setFeuilleEmail(false);
    annoncer(t('ec52.enregistre'));
  };

  return (
    <View style={[styles.ecran, { backgroundColor: colors.bg.canvas, paddingTop: insets.top }]}>
      {/* Barre du haut */}
      <View style={styles.barre}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={t('commun.retour')}
          style={styles.boutonRetour}
        >
          <Icone nom="arrow_back" couleur={colors.text.primary} />
        </Pressable>
        <Text style={[type.appbar, { color: colors.text.primary }]} accessibilityRole="header">
          {t('ec52.titre')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        {/* Verrouiller l'app */}
        <LigneInterrupteur
          titre={t('ec52.verrouiller')}
          description={t('ec52.verrouillerSous')}
          actif={verrouillage}
          onChangement={toggleVerrouillage}
        />

        <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} />

        {/* Mon numéro */}
        <View style={styles.ligneReglage}>
          <View style={styles.flex}>
            <Text style={[type.bodyStrong, { color: colors.text.primary }]}>{t('ec52.monNumero')}</Text>
            {compte ? (
              <Text style={[type.body, styles.tabulaire, { color: colors.text.secondary }]}>
                {numero ? `+228 ${numero}` : '+228 90 12 34 56'}
              </Text>
            ) : (
              <Text style={[type.body, { color: colors.text.secondary }]}>
                {t('ec52.creerSauvegarde')}
              </Text>
            )}
          </View>
          <BoutonTexte
            libelle={compte ? t('ec52.changer') : t('ec12.sauvegarder')}
            onPress={() => router.push('/sauvegarde')}
          />
        </View>

        <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} />

        {/* E-mail de secours */}
        <View style={styles.ligneReglage}>
          <View style={styles.flex}>
            <Text style={[type.bodyStrong, { color: colors.text.primary }]}>
              {t('ec52.emailSecours')}
            </Text>
            <Text style={[type.body, { color: colors.text.secondary }]}>
              {emailSecours ? emailSecours : t('ec52.emailSecoursSous')}
            </Text>
          </View>
          {compte ? (
            <BoutonTexte
              libelle={emailSecours ? t('ec52.modifier') : t('ec52.ajouter')}
              onPress={ouvrirFeuilleEmail}
            />
          ) : (
            <BoutonTexte libelle={t('ec12.sauvegarder')} onPress={() => router.push('/sauvegarde')} />
          )}
        </View>
      </ScrollView>

      {/* Feuille de modification e-mail */}
      <FeuilleBasse visible={feuilleEmail} onFermer={() => setFeuilleEmail(false)}>
        <View style={styles.feuilleContenu}>
          <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s2 }]}>
            {t('ec52.emailSecours')}
          </Text>
          <ChampCompact
            libelle="Adresse e-mail"
            value={emailSaisi}
            onChangeText={setEmailSaisi}
            placeholder="exemple@domaine.tg"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.boutonFeuille}>
            <BoutonPrincipal libelle={t('ec52.enregistrer')} onPress={enregistrerEmail} />
          </View>
        </View>
      </FeuilleBasse>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  barre: {
    height: size.appBar,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.s4,
    columnGap: space.s3,
  },
  boutonRetour: { padding: space.s1 },
  contenu: { paddingHorizontal: space.s4, paddingBottom: 48, rowGap: space.s3 },
  separateur: { height: 1, marginVertical: space.s2 },
  ligneReglage: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: space.s3,
    paddingVertical: space.s2,
  },
  flex: { flex: 1, rowGap: 2 },
  tabulaire: { fontVariant: ['tabular-nums'] },
  feuilleContenu: { padding: space.s4, rowGap: space.s3 },
  boutonFeuille: { marginTop: space.s3 },
});
