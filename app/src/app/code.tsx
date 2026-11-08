import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import type { RefSaisie } from '@/composants/Champs';
import { Ecran } from '@/composants/Ecran';
import { CAMILLE_REPONSES } from '@/demo/camille';
import { chargerSemaineDeCamille } from '@/demo/historique';
import { Icone } from '@/icones/Icone';
import { terminerParcours } from '@/parcours/fin';
import { useParcours } from '@/parcours/store';
import { size, space, type, useTheme } from '@/theme';

/** Code de démonstration : le « SMS » le remplit tout seul après quelques secondes. */
const CODE_DEMO = '482913';
const RENVOI = 60;
const ESSAIS = 5;

type Etat = 'saisie' | 'verification' | 'erreur' | 'bloque' | 'recuperation';

/** EC-11 Code : vérifier le numéro, à la création du compte ou sur un nouveau téléphone. */
export default function Code() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { compte } = useLocalSearchParams<{ compte?: string }>();
  const existant = compte === 'existant';
  const numero = useParcours((e) => e.numero);
  const champ = useRef<RefSaisie>(null);
  const saisi = useRef('');

  const [code, setCode] = useState('');
  const [etat, setEtat] = useState<Etat>('saisie');
  const [chargementVisible, setChargementVisible] = useState(false);
  const [essais, setEssais] = useState(0);
  const [restant, setRestant] = useState(RENVOI);
  const [plusLong, setPlusLong] = useState(false);

  // Compte à rebours du renvoi, annoncé seulement quand le renvoi devient disponible.
  useEffect(() => {
    if (restant <= 0) {
      AccessibilityInfo.announceForAccessibility(t('ec11.renvoyer'));
      return;
    }
    const m = setTimeout(() => setRestant((r) => r - 1), 1000);
    return () => clearTimeout(m);
  }, [restant, t]);

  const verifier = (valeur: string) => {
    setEtat('verification');
    const a = setTimeout(() => setChargementVisible(true), 300);
    setTimeout(() => {
      clearTimeout(a);
      setChargementVisible(false);
      if (valeur === CODE_DEMO) {
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        if (existant) {
          setEtat('recuperation');
        } else {
          useParcours.getState().modifier({ compte: true });
          terminerParcours(t('ec11.sauvegardees'));
        }
        return;
      }
      const n = essais + 1;
      setEssais(n);
      setEtat(n >= ESSAIS ? 'bloque' : 'erreur');
    }, 900);
  };

  /** Pose le code ; six chiffres valident aussitôt, sans attendre le bouton. */
  const poser = (valeur: string) => {
    saisi.current = valeur;
    setCode(valeur);
    if (valeur.length === 6) verifier(valeur);
  };

  // Lecture automatique simulée : le code arrive par « SMS » si rien n'est encore tapé.
  useEffect(() => {
    const m = setTimeout(() => {
      if (saisi.current === '') poser(CODE_DEMO);
    }, 4000);
    return () => clearTimeout(m);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Récupération sur un nouveau téléphone : les données de Camille arrivent, puis l'accueil.
  useEffect(() => {
    if (etat !== 'recuperation') return;
    const a = setTimeout(() => setPlusLong(true), 3000);
    const b = setTimeout(() => {
      useParcours.getState().modifier(CAMILLE_REPONSES);
      chargerSemaineDeCamille();
      terminerParcours();
    }, 4000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [etat]);

  if (etat === 'recuperation') {
    return (
      <View style={[styles.recuperation, { backgroundColor: colors.bg.canvas }]} accessibilityLiveRegion="polite">
        <ActivityIndicator size={40} color={colors.border.focus} />
        <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{t('ec11.recuperation')}</Text>
        {plusLong ? <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec11.plusLong')}</Text> : null}
      </View>
    );
  }

  const saisir = (v: string) => {
    if (etat === 'bloque' || etat === 'verification') return;
    // Après une erreur, les chiffres s'effacent au prochain appui.
    const chiffres = v.replace(/\D/g, '');
    if (etat === 'erreur') {
      setEtat('saisie');
      poser(chiffres.length > code.length ? chiffres.slice(-1) : '');
      return;
    }
    poser(chiffres.slice(0, 6));
  };

  const largeur = Math.min(44, Math.floor((width - 2 * (width <= 340 ? 16 : 24) - 5 * 8) / 6));
  const renvoyer = () => {
    setRestant(RENVOI);
    setEtat('saisie');
    poser('');
    annoncer(t('ec11.renvoye'));
  };
  const secondes = `0:${String(restant).padStart(2, '0')}`.replace('0:60', '1:00');
  const rouge = etat === 'erreur' || etat === 'bloque';

  return (
    <Ecran
      pied={
        <BoutonPrincipal
          libelle={t('ec11.valider')}
          desactive={code.length < 6 || etat === 'bloque'}
          chargement={chargementVisible ? t('ec11.verification') : false}
          onPress={() => verifier(code)}
        />
      }
    >
      <Text style={[type.title, { color: colors.text.primary }]} accessibilityRole="header">
        {t('ec11.titre')}
      </Text>
      <Text style={[type.body, styles.rappel, { color: colors.text.secondary }]}>
        {t('ec11.envoye', { numero: numero.replace(/(\d{2})(?=\d)/g, '$1 ') })}
      </Text>
      <View style={styles.modifier}>
        <BoutonTexte libelle={t('ec11.modifier')} onPress={() => router.back()} />
      </View>

      <Pressable onPress={() => champ.current?.focus()} style={styles.cases} accessible={false}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const active = i === code.length && etat === 'saisie';
          const trait = rouge ? colors.status.errorFg : active ? colors.border.focus : colors.border.control;
          return (
            <View key={i} style={[styles.case, { width: largeur }]}>
              {code[i] ? (
                <Animated.Text entering={FadeIn.duration(100)} style={[type.title, styles.chiffre, { color: colors.text.primary }]}>
                  {code[i]}
                </Animated.Text>
              ) : null}
              <View style={{ height: active || rouge ? 2 : 1, backgroundColor: trait }} />
            </View>
          );
        })}
        {/* Un seul champ réel derrière les six cases : TalkBack le lit comme un tout. */}
        <TextInput
          ref={champ}
          value={code}
          onChangeText={saisir}
          keyboardType="number-pad"
          autoComplete="sms-otp"
          textContentType="oneTimeCode"
          autoFocus
          maxLength={7}
          caretHidden
          editable={etat !== 'bloque'}
          accessibilityLabel={t('ec11.lecture', { n: code.length })}
          style={styles.cache}
        />
      </Pressable>

      {rouge ? (
        <View style={styles.erreur} accessibilityLiveRegion="assertive" accessible>
          <Icone nom="error" couleur={colors.status.errorFg} taille={16} />
          <Text style={[type.caption, { color: colors.status.errorFg, flexShrink: 1 }]}>
            {etat === 'bloque' ? t('ec11.tropEssais') : t('ec11.errone')}
          </Text>
        </View>
      ) : null}

      <View style={styles.renvoi}>
        {restant > 0 ? (
          <Text style={[type.body, { color: colors.text.secondary, textAlign: 'center' }]}>
            {t('ec11.renvoyerDans', { temps: secondes })}
          </Text>
        ) : (
          <BoutonTexte libelle={t('ec11.renvoyer')} onPress={renvoyer} />
        )}
      </View>
    </Ecran>
  );
}

const styles = StyleSheet.create({
  rappel: { marginTop: space.s2 },
  modifier: { alignItems: 'flex-start', marginLeft: -space.s3 },
  cases: { flexDirection: 'row', justifyContent: 'center', columnGap: space.s2, marginTop: space.s4 },
  case: { height: 56, justifyContent: 'flex-end' },
  chiffre: { textAlign: 'center', fontVariant: ['tabular-nums'], marginBottom: space.s2 },
  cache: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  erreur: { flexDirection: 'row', alignItems: 'center', columnGap: space.s1, marginTop: space.s3 },
  renvoi: { minHeight: size.touchMin, justifyContent: 'center', marginTop: space.s3 },
  recuperation: { flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: space.s4, padding: space.s5 },
});
