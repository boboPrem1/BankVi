import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PixelRatio, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { BoutonPrincipal, BoutonTexte, DeuxBoutonsTexte } from '@/composants/Boutons';
import { Ecran } from '@/composants/Ecran';
import { IllustrationBienvenue } from '@/composants/Illustration';
import { useParcours } from '@/parcours/store';
import { useRegistre } from '@/registre/store';
import { motion, size, space, type, useTheme } from '@/theme';

/** EC-01 Bienvenue : la promesse en une phrase, puis démarrer sans friction. */
export default function Bienvenue() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const texteAgrandi = PixelRatio.getFontScale() >= 1.75;

  // EC-01 monté = un nouveau départ (lancement, rechargement, « Recommencer ») : aucune réponse
  // d'un parcours précédent ne doit survivre. Un retour arrière depuis EC-03 ne remonte pas
  // cet écran, il reste dans la pile : les valeurs y sont gardées, comme le veut la fiche.
  useEffect(() => {
    useParcours.getState().reinitialiser();
    useRegistre.getState().reinitialiser();
  }, []);

  // Autres formats : 240 × 200 au cadre de référence, 180 sur 640 dp, 150 sur 568 dp, masquée à 200 %.
  const etroit = width <= 340;
  const largeurIllu = etroit || height < 600 ? 150 : height < 700 ? 180 : 240;
  const marge = etroit ? size.gutterCompact : size.gutterOnboarding;

  return (
    <Ecran
      barre={false}
      marge={marge}
      centre
      pied={
        <>
          <BoutonPrincipal libelle={t('ec01.commencer')} onPress={() => router.push('/mon-argent')} />
          <DeuxBoutonsTexte>
            <BoutonTexte libelle={t('ec01.exemple')} onPress={() => router.push('/exemple')} />
            <BoutonTexte libelle={t('ec01.compte')} onPress={() => router.push({ pathname: '/sauvegarde', params: { compte: 'existant' } })} />
          </DeuxBoutonsTexte>
        </>
      }
    >
      <Animated.View entering={FadeIn.duration(motion.standard)} style={styles.groupe}>
        <Text style={[type.subtitle, styles.marque, { color: colors.text.link }]}>{t('ec01.marque')}</Text>
        <View style={styles.centre}>
          {texteAgrandi ? null : <IllustrationBienvenue largeur={largeurIllu} />}
          <Text
            style={[type.title, styles.titre, { color: colors.text.primary, marginTop: largeurIllu === 240 ? space.s6 : space.s4 }]}
            accessibilityRole="header"
          >
            {t('ec01.titre')}
          </Text>
        </View>
      </Animated.View>
    </Ecran>
  );
}

const styles = StyleSheet.create({
  groupe: { flexGrow: 1 },
  marque: { textAlign: 'center', marginTop: space.s5 },
  centre: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: space.s5 },
  titre: { textAlign: 'center', maxWidth: 312 },
});
