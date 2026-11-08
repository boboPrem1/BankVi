import { calculer, horizon, premierManque, statutDuJour } from '@bankvi/moteur';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBarreEtatClaire } from '@/composants/BarreEtatClaire';
import { BoutonPrincipal } from '@/composants/Boutons';
import { Paysage } from '@/composants/Paysage';
import { jourDansPhrase } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI } from '@/parcours/store';
import { decaler, useEtat } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { artwork, size, space, type } from '@/theme';

const BLANC = artwork.text;
const HERO_MAX = 64 / 48;

/** EC-21 Bilan : résultat. Le chiffre de demain, sobrement : sans félicitation ni série de jours. */
export default function Resultat() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const etat = useEtat();
  const bilan = useRegistre((r) => r.bilan);
  useBarreEtatClaire();

  const { demain, statut, soldes, manque } = useMemo(() => {
    const e = { ...etat, aujourdhui: decaler(AUJOURDHUI, 1) };
    return {
      demain: calculer(e),
      statut: statutDuJour(e),
      soldes: horizon(e, 30).points.map((p) => p.solde),
      manque: premierManque(e, 30),
    };
  }, [etat]);

  const terminer = () => router.dismissTo('/accueil');
  useEffect(() => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Le retour fait comme « Terminer » : le bilan est déjà enregistré.
    const abonnement = BackHandler.addEventListener('hardwareBackPress', () => {
      terminer();
      return true;
    });
    return () => abonnement.remove();
  }, []);

  const jour = jourDansPhrase(demain.reference, AUJOURDHUI);
  const avant = bilan?.chiffreAvant ?? demain.chiffre;
  const ecartChiffre = demain.chiffre - avant;
  const phrase =
    ecartChiffre < 0 ? t('ec21.moins', { montant: fcfa(-ecartChiffre) }) : ecartChiffre > 0 ? t('ec21.plus', { montant: fcfa(ecartChiffre) }) : t('ec21.pareil');
  const horizonChange = manque ? t('ec21.manquer', { montant: fcfa(-manque.solde), jour: jourDansPhrase(manque.date, AUJOURDHUI) }) : '';

  return (
    <Animated.View entering={FadeIn.duration(300)} style={[styles.ecran, { backgroundColor: artwork.skies[statut.etat][0] }]}>
      <View style={StyleSheet.absoluteFill}>
        <Paysage
          largeur={width}
          hauteur={height}
          cadre="plein"
          soldes={soldes}
          progression={statut.soleil.ecoules / statut.soleil.total}
          etat={statut.etat}
          graine={Number(decaler(AUJOURDHUI, 1).replaceAll('-', ''))}
        />
      </View>
      <View
        style={[styles.texte, { paddingTop: insets.top + (height < 600 ? space.s5 : space.s7) }]}
        accessible
        accessibilityLabel={
          demain.manque !== undefined
            ? `${t('ec21.fait')}. ${t('ec21.demainManque')} ${demain.manque} francs CFA ${t('chiffreDuJour.manqueSuite', { jour })}.`
            : t('ec21.lecture', { montant: demain.chiffre, jour, phrase: `${phrase} ${horizonChange}` })
        }
      >
        <View style={styles.ligne}>
          <Icone nom="check_circle" couleur={BLANC} taille={size.iconSmall} />
          <Text style={[type.subtitle, { color: BLANC }]}>{t('ec21.fait')}</Text>
        </View>
        <View style={styles.chiffre}>
          <Text style={[type.bodyLarge, { color: BLANC }]}>{demain.manque !== undefined ? t('ec21.demainManque') : t('ec21.demain')}</Text>
          <View style={styles.ligneChiffre}>
            <Text style={[type.hero, { color: BLANC }]} maxFontSizeMultiplier={HERO_MAX}>
              {nombre(demain.manque ?? demain.chiffre)}
            </Text>
            <Text style={[type.subtitle, { color: BLANC }]}>{t('commun.fcfa')}</Text>
          </View>
          <Text style={[type.bodyLarge, { color: BLANC }]}>
            {demain.manque !== undefined ? t('chiffreDuJour.manqueSuite', { jour }) : t('chiffreDuJour.echeance', { jour })}
          </Text>
        </View>
        {demain.manque === undefined ? <Text style={[type.bodyLarge, styles.phrase, { color: BLANC }]}>{phrase}</Text> : null}
        {horizonChange ? <Text style={[type.bodyLarge, { color: BLANC }]}>{horizonChange}</Text> : null}
      </View>
      <View style={[styles.pied, { paddingBottom: space.s4 + insets.bottom }]}>
        <BoutonPrincipal libelle={t('ec21.terminer')} onPress={terminer} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  texte: { paddingHorizontal: space.s5 },
  ligne: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  chiffre: { marginTop: space.s4 },
  ligneChiffre: { flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', columnGap: space.s2 },
  phrase: { marginTop: space.s4 },
  pied: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: space.s5, paddingTop: space.s3 },
});
