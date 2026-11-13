import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/composants/Contenu';
import { dateLongue } from '@/format/date';
import type { NomIcone } from '@/icones/chemins';
import { useParcours } from '@/parcours/store';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

interface LigneMenuProps {
  icone: NomIcone;
  titre: string;
  description: string;
  onPress: () => void;
  externe?: boolean;
}

function LigneMenu({ icone, titre, description, onPress, externe }: LigneMenuProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${titre}, ${description}${externe ? ', ouvre WhatsApp' : ''}`}
      android_ripple={{ color: colors.action.ripple }}
      style={styles.ligne}
    >
      <Avatar icone={icone} />
      <View style={styles.corps}>
        <Text style={[type.bodyStrong, { color: colors.text.primary }]} numberOfLines={1}>
          {titre}
        </Text>
        <Text style={[type.caption, { color: colors.text.secondary }]} numberOfLines={1}>
          {description}
        </Text>
        <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} />
      </View>
    </Pressable>
  );
}

/** EC-37 Menu : tout retrouver au même endroit. Liste simple façon WhatsApp. */
export default function Plus() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const compte = useParcours((p) => p.compte);
  const pass = useRegistre((r) => r.pass);
  const rituelEnPause = useRegistre((r) => r.rituelEnPause);
  const preference = useParcours((p) => p.preference);

  const descRituel = rituelEnPause
    ? t('ec37.rituelPause')
    : preference === 'day'
      ? t('ec37.rituelJour')
      : t('ec37.rituelHeure', { heure: 20 });

  const descPass = pass
    ? t('ec37.passActif', { date: '6 décembre' })
    : t('ec37.passGratuit');

  const descDonnees = compte ? t('ec37.donneesSauvegarde') : t('ec37.donneesASauvegarder');

  const ouvrirWhatsApp = () => {
    void Linking.openURL('https://chat.whatsapp.com/invite/bankvi-test');
  };

  return (
    <View style={[styles.ecran, { backgroundColor: colors.bg.canvas, paddingTop: insets.top }]}>
      <View style={styles.barre}>
        <Text style={[type.appbar, { color: colors.text.primary }]} accessibilityRole="header">
          {t('ec37.titre')}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.liste} showsVerticalScrollIndicator={false}>
        {/* En test fermé, la ligne donner mon avis s'affiche en tête */}
        <LigneMenu
          icone="chat"
          titre={t('ec37.avis')}
          description={t('ec37.avisSous')}
          onPress={ouvrirWhatsApp}
          externe
        />
        <LigneMenu
          icone="account_balance_wallet"
          titre={t('ec37.poches')}
          description={t('ec37.pochesSous')}
          onPress={() => router.push('/poches' as any)}
        />
        <LigneMenu
          icone="event_repeat"
          titre={t('ec37.revenusCharges')}
          description={t('ec37.revenusChargesSous')}
          onPress={() => router.push('/revenus-charges' as any)}
        />
        <LigneMenu
          icone="notifications"
          titre={t('ec37.rituel')}
          description={descRituel}
          onPress={() => router.push('/rituel' as any)}
        />
        <LigneMenu
          icone="star"
          titre={t('ec37.passPlus')}
          description={descPass}
          onPress={() => router.push('/pass-plus' as any)}
        />
        <LigneMenu
          icone="lightbulb"
          titre={t('ec37.appris')}
          description={t('ec37.apprisSous')}
          onPress={() => router.push('/appris' as any)}
        />
        <LigneMenu
          icone="label"
          titre={t('ec37.natures')}
          description={t('ec37.naturesSous')}
          onPress={() => router.push('/mes-natures' as any)}
        />
        <LigneMenu
          icone="cloud_done"
          titre={t('ec37.donnees')}
          description={descDonnees}
          onPress={() => router.push('/donnees' as any)}
        />
        <LigneMenu
          icone="lock"
          titre={t('ec37.securite')}
          description={t('ec37.securiteSous')}
          onPress={() => router.push('/securite' as any)}
        />
        <LigneMenu
          icone="info"
          titre={t('ec37.aPropos')}
          description={t('ec37.aProposSous')}
          onPress={() => router.push('/a-propos' as any)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  barre: { height: size.appBar, justifyContent: 'center', paddingHorizontal: space.s4 },
  liste: { paddingBottom: size.bottomNav + space.s4 },
  ligne: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: space.s4,
  },
  corps: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: space.s4,
    paddingRight: space.s4,
    position: 'relative',
  },
  separateur: {
    position: 'absolute',
    bottom: 0,
    left: space.s4,
    right: 0,
    height: 1,
  },
});
