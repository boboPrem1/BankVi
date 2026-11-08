import { router } from 'expo-router';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Keyboard, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampMontant, LigneMontant, type RefSaisie } from '@/composants/Champs';
import { Question } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { Progression } from '@/composants/Progression';
import { useParcours } from '@/parcours/store';
import { motion, space } from '@/theme';

/** EC-03 Mon argent aujourd'hui : le point de départ de toute l'app. */
export default function MonArgent() {
  const { t } = useTranslation();
  const { especes, mixx, flooz, sansMobile, modifier } = useParcours();
  const refMixx = useRef<RefSaisie>(null);
  const refFlooz = useRef<RefSaisie>(null);
  const fcfa = t('commun.fcfa');

  const basculer = () => {
    modifier({ sansMobile: !sansMobile });
    AccessibilityInfo.announceForAccessibility(sansMobile ? t('ec03.mobileAffiche') : t('ec03.mobileMasque'));
  };

  return (
    <Ecran
      pied={
        <BoutonPrincipal
          libelle={t('commun.continuer')}
          desactive={especes === null}
          lectureDesactive={t('ec03.desactive')}
          onPress={() => router.push('/mon-revenu')}
        />
      }
    >
      <Progression etape={1} />
      <Question texte={t('ec03.question')} aide={t('ec03.aide')} />
      <ChampMontant
        libelle={t('ec03.especes')}
        unite={fcfa}
        valeur={especes}
        onValeur={(v) => modifier({ especes: v })}
        autoFocus
        returnKeyType={sansMobile ? 'done' : 'next'}
        submitBehavior={sansMobile ? 'blurAndSubmit' : 'submit'}
        onSubmitEditing={() => (sansMobile ? Keyboard.dismiss() : refMixx.current?.focus())}
      />
      {sansMobile ? null : (
        <Animated.View entering={FadeIn.duration(motion.standard)} exiting={FadeOut.duration(motion.standard)} style={styles.lignes}>
          <LigneMontant
            ref={refMixx}
            nom={t('ec03.mixx')}
            initiale="M"
            unite={fcfa}
            valeur={mixx}
            onValeur={(v) => modifier({ mixx: v })}
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => refFlooz.current?.focus()}
          />
          <LigneMontant
            ref={refFlooz}
            nom={t('ec03.flooz')}
            initiale="F"
            unite={fcfa}
            valeur={flooz}
            onValeur={(v) => modifier({ flooz: v })}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </Animated.View>
      )}
      <Animated.View layout={LinearTransition.duration(motion.standard)}>
        <View style={styles.lien}>
          <BoutonTexte libelle={sansMobile ? t('ec03.avecMobile') : t('ec03.sansMobile')} onPress={basculer} />
        </View>
      </Animated.View>
    </Ecran>
  );
}

const styles = StyleSheet.create({
  lignes: { marginTop: space.s3 },
  lien: { marginTop: space.s1, alignItems: 'flex-end' },
});
