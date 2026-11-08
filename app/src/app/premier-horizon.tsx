import { calculer, horizon } from '@bankvi/moteur';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChiffreDuJour } from '@/composants/ChiffreDuJour';
import { Bulle } from '@/composants/Contenu';
import { Courbe } from '@/composants/Courbe';
import { Ecran } from '@/composants/Ecran';
import { dateLongue, jourDansPhrase } from '@/format/date';
import { fcfa } from '@/format/montant';
import { etatDepuis } from '@/parcours/etat';
import { useParcours } from '@/parcours/store';
import { motion, space, type, useTheme } from '@/theme';

/** EC-06 Premier horizon : la première valeur, avec les chiffres de l'utilisateur. */
export default function PremierHorizon() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { height } = useWindowDimensions();
  const reponses = useParcours();

  const { calcul, points } = useMemo(() => {
    const etat = etatDepuis(reponses);
    return { calcul: calculer(etat), points: horizon(etat, 30).points };
  }, [reponses]);

  // Une vibration légère confirme l'arrivée. Pas de confettis.
  useEffect(() => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const jour = jourDansPhrase(calcul.reference, calcul.date);
  const charges = -calcul.mouvements.reduce((s, m) => (m.montant < 0 ? s + m.montant : s), 0);
  const variable = reponses.typeRevenu === 'variable';
  const valeurs = {
    soldes: fcfa(calcul.soldesPerso),
    charges: fcfa(charges),
    attendus: fcfa(calcul.revenusAttendus),
    reste: fcfa(Math.max(0, calcul.resteAVivre)),
    jours: calcul.jours,
    jour,
  };
  const bulle =
    calcul.manque !== undefined
      ? t('ec06.bulleManque', valeurs)
      : calcul.chiffre === 0
        ? t('ec06.bulleZero', valeurs)
        : variable && calcul.revenusAttendus > 0
          ? t(charges > 0 ? 'ec06.bulleVariable' : 'ec06.bulleVariableSansCharge', valeurs)
          : t(charges > 0 ? 'ec06.bulleRegulier' : 'ec06.bulleSansCharge', valeurs);

  let iBas = 0;
  points.forEach((p, i) => {
    if (p.solde < points[iBas]!.solde) iBas = i;
  });
  const dernier = points[points.length - 1]!;
  const lecture = t('ec06.lectureCourbe', {
    debut: points[0]!.solde,
    bas: points[iBas]!.solde,
    dateBas: dateLongue(points[iBas]!.date),
    fin: dernier.solde,
    dateFin: dateLongue(dernier.date),
  });

  return (
    <Ecran
      pied={
        <>
          <BoutonPrincipal libelle={t('ec06.repartir')} onPress={() => router.push('/recette-proche')} />
          <BoutonTexte libelle={t('commun.plusTard')} onPress={() => router.push('/quand-noter')} />
        </>
      }
    >
      <Animated.View entering={FadeIn.duration(motion.standard)}>
        <ChiffreDuJour calcul={calcul} />
      </Animated.View>
      <Animated.View entering={FadeIn.duration(motion.standard)} style={styles.bulle}>
        <Bulle texte={bulle} />
      </Animated.View>
      <Text style={[type.subtitle, styles.titreGraphique, { color: colors.text.primary }]}>{t('ec06.graphique')}</Text>
      <Courbe points={points} lecture={lecture} hauteur={height < 700 ? 150 : 200} />
      <Text style={[type.caption, styles.hypothese, { color: colors.text.secondary }]}>
        {calcul.manque !== undefined ? t('ec06.hypotheseManque') : t('ec06.hypothese')}
      </Text>
      <Text style={[type.caption, styles.rappel, { color: colors.text.secondary }]}>{t('ec06.rappel')}</Text>
    </Ecran>
  );
}

const styles = StyleSheet.create({
  bulle: { marginTop: space.s4 },
  titreGraphique: { marginTop: space.s4, marginBottom: space.s2 },
  hypothese: { marginTop: space.s2 },
  rappel: { marginTop: space.s1 },
});
