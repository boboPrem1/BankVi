import { calculer, horizon } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { BoutonPrincipal } from '@/composants/Boutons';
import { ChiffreDuJour } from '@/composants/ChiffreDuJour';
import { BandeauEtat } from '@/composants/Contenu';
import { Courbe } from '@/composants/Courbe';
import { Ecran } from '@/composants/Ecran';
import { CAMILLE } from '@/demo/camille';
import { jourDansPhrase } from '@/format/date';
import { space, type, useTheme } from '@/theme';

// Calculé une fois : l'exemple ne dépend d'aucune saisie, et rien n'est enregistré.
const CALCUL = calculer(CAMILLE);
const POINTS = horizon(CAMILLE, 30).points;

/** EC-02 Exemple : montrer le résultat avant de demander un chiffre, marqué « Exemple » partout. */
export default function Exemple() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { height } = useWindowDimensions();
  const jour = jourDansPhrase(CALCUL.reference, CALCUL.date);

  return (
    <Ecran
      titre={t('ec02.titre')}
      fixe={
        <View style={styles.bandeau}>
          <BandeauEtat texte={t('ec02.bandeau')} lecture={t('ec02.bandeauLecture')} />
        </View>
      }
      pied={<BoutonPrincipal libelle={t('ec02.commencer')} onPress={() => router.push('/mon-argent')} />}
    >
      <Text style={[type.body, styles.contexte, { color: colors.text.secondary }]}>{t('ec02.contexte', { jour })}</Text>
      <ChiffreDuJour calcul={CALCUL} lecture={t('chiffreDuJour.lectureExemple', { montant: CALCUL.chiffre, jour })} />
      <Text style={[type.subtitle, styles.titreGraphique, { color: colors.text.primary }]}>{t('ec02.graphique')}</Text>
      <Courbe
        points={POINTS}
        hauteur={height < 700 ? 150 : 200}
        enTete={t('ec02.infoExemple')}
        lecture={t('ec02.lectureCourbe')}
      />
    </Ecran>
  );
}

const styles = StyleSheet.create({
  bandeau: { marginBottom: space.s3 },
  contexte: { marginBottom: space.s5 },
  titreGraphique: { marginTop: space.s5, marginBottom: space.s2 },
});
