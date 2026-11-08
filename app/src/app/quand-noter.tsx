import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal } from '@/composants/Boutons';
import { CarteChoix, Puce, RangeePuces } from '@/composants/Choix';
import { BandeauEtat, Question } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { heure as ecrireHeure } from '@/format/date';
import { useParcours } from '@/parcours/store';
import { motion, space, type, useTheme } from '@/theme';

const HEURES = [19, 20, 21, 22];
type Permission = 'inconnue' | 'accordee' | 'refusee-definitivement' | 'inutile';

/** EC-09 Quand préfères-tu noter ? Le rappel s'adapte, rien n'est interdit. */
export default function QuandNoter() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { preference, heure, modifier } = useParcours();
  // Android 12 et moins : pas de permission à demander pour notifier.
  const [permission, setPermission] = useState<Permission>(() =>
    Platform.OS !== 'android' || Platform.Version < 33 ? 'inutile' : 'inconnue',
  );

  useEffect(() => {
    if (permission !== 'inconnue') return;
    void PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((ok) => ok && setPermission('accordee'));
  }, [permission]);

  const soir = preference === 'evening';
  const personnalisee = !HEURES.includes(heure.h) || heure.m !== 0;
  const nuit = heure.h >= 23 || heure.h < 6;
  const texteHeure = ecrireHeure(heure.h, heure.m);

  const choisirSoir = (oui: boolean) => {
    modifier({ preference: oui ? 'evening' : 'day' });
    if (oui && !soir) AccessibilityInfo.announceForAccessibility(t('ec09.deplie'));
  };

  const autreHeure = () =>
    DateTimePickerAndroid.open({
      value: new Date(2026, 10, 6, heure.h, heure.m),
      mode: 'time',
      is24Hour: true,
      onChange: (e, d) => {
        if (e.type === 'set' && d) modifier({ heure: { h: d.getHours(), m: d.getMinutes() } });
      },
    });

  const activer = async () => {
    if (permission === 'accordee' || permission === 'inutile' || permission === 'refusee-definitivement') {
      router.push('/sauvegarde');
      return;
    }
    const r = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    router.push('/sauvegarde');
    if (r === PermissionsAndroid.RESULTS.GRANTED) {
      setPermission('accordee');
    } else {
      // Le dialogue n'est demandé qu'une fois dans ce parcours.
      setPermission('refusee-definitivement');
      annoncer(t('ec09.refuse'));
    }
  };

  return (
    <Ecran
      pied={
        soir ? (
          <BoutonPrincipal libelle={t('ec09.activer')} desactive={nuit} onPress={activer} />
        ) : (
          <BoutonPrincipal libelle={t('commun.continuer')} onPress={() => router.push('/sauvegarde')} />
        )
      }
    >
      <Question texte={t('ec09.titre')} aide={t('ec09.aide')} />
      <View style={styles.cartes} accessibilityRole="radiogroup">
        <CarteChoix titre={t('ec09.jour')} texte={t('ec09.jourTexte')} choisi={!soir} onPress={() => choisirSoir(false)} position={1} total={2} />
        <CarteChoix titre={t('ec09.soir')} texte={t('ec09.soirTexte')} choisi={soir} onPress={() => choisirSoir(true)} position={2} total={2} />
      </View>
      {soir ? (
        <Animated.View entering={FadeIn.duration(motion.standard)} style={styles.bloc}>
          <Text style={[type.bodyMedium, { color: colors.text.secondary }]}>{t('ec09.rappelA')}</Text>
          <View accessibilityRole="radiogroup">
            <RangeePuces>
              {HEURES.map((h) => (
                <Puce
                  key={h}
                  role="radio"
                  libelle={ecrireHeure(h, 0)}
                  choisie={!personnalisee && heure.h === h}
                  onPress={() => modifier({ heure: { h, m: 0 } })}
                />
              ))}
              <Puce role="radio" libelle={personnalisee ? texteHeure : t('ec09.autreHeure')} choisie={personnalisee} onPress={autreHeure} />
            </RangeePuces>
          </View>
          {nuit ? (
            <Text style={[type.caption, { color: colors.status.errorFg }]} accessibilityLiveRegion="assertive">
              {t('ec09.nuit')}
            </Text>
          ) : permission === 'accordee' || permission === 'inutile' ? (
            <Text style={[type.caption, { color: colors.text.secondary }]}>{t('ec09.dejaAccorde', { heure: texteHeure })}</Text>
          ) : (
            <View style={styles.explication}>
              <BandeauEtat
                icone="notifications"
                texte={permission === 'refusee-definitivement' ? t('ec09.refuseDefinitif') : t('ec09.explication', { heure: texteHeure })}
              />
            </View>
          )}
        </Animated.View>
      ) : null}
    </Ecran>
  );
}

const styles = StyleSheet.create({
  cartes: { rowGap: space.s3 },
  bloc: { marginTop: space.s5, rowGap: space.s2 },
  explication: { marginTop: space.s2 },
});
