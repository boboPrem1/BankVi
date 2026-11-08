import type { Calcul } from '@bankvi/moteur';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { jourDansPhrase } from '@/format/date';
import { nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { space, type, useTheme } from '@/theme';

/** Le chiffre héros suit la taille du texte, plafonné à 64 sp. */
const HERO_MAX = 64 / 48;

interface Props {
  calcul: Pick<Calcul, 'chiffre' | 'manque' | 'reference' | 'date'>;
  /** Lecture TalkBack propre à l'écran (EC-02 : « Dans cet exemple, … »). */
  lecture?: string;
}

/**
 * Le chiffre héros (design system, composant « Chiffre du jour »). Un seul par écran.
 * S'il manque de l'argent : jamais de nombre négatif seul, ni de rouge.
 */
export function ChiffreDuJour({ calcul, lecture }: Props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const jour = jourDansPhrase(calcul.reference, calcul.date);
  const manque = calcul.manque;

  if (manque !== undefined) {
    return (
      <View
        accessible
        accessibilityRole="header"
        accessibilityLabel={t('chiffreDuJour.lectureManque', { montant: manque, jour })}
      >
        <View style={styles.ligneIcone}>
          <Icone nom="warning" couleur={colors.status.warnFg} />
          <Text style={[type.bodyLarge, { color: colors.text.secondary }]}>{t('chiffreDuJour.manqueAmorce')}</Text>
        </View>
        <View style={styles.ligneChiffre}>
          <Text style={[type.hero, { color: colors.status.warnFg }]} maxFontSizeMultiplier={HERO_MAX}>
            {nombre(manque)}
          </Text>
          <Text style={[type.subtitle, { color: colors.status.warnFg }]}>{t('commun.fcfa')}</Text>
        </View>
        <Text style={[type.bodyLarge, { color: colors.text.secondary }]}>{t('chiffreDuJour.manqueSuite', { jour })}</Text>
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="header"
      accessibilityLabel={lecture ?? t('chiffreDuJour.lecture', { montant: calcul.chiffre, jour })}
    >
      <Text style={[type.bodyLarge, { color: colors.text.secondary }]}>{t('chiffreDuJour.amorce')}</Text>
      <View style={styles.ligneChiffre}>
        <Text style={[type.hero, { color: colors.text.primary }]} maxFontSizeMultiplier={HERO_MAX}>
          {nombre(calcul.chiffre)}
        </Text>
        <Text style={[type.subtitle, { color: colors.text.primary }]}>{t('commun.fcfa')}</Text>
      </View>
      <Text style={[type.bodyLarge, { color: colors.text.secondary }]}>{t('chiffreDuJour.echeance', { jour })}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Nombre et unité sur la même ligne de base, 8 dp entre les deux ; « FCFA » passe à la ligne à 200 %.
  ligneChiffre: { flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', columnGap: space.s2 },
  ligneIcone: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
});
