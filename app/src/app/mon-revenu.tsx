import { router } from 'expo-router';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Keyboard, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { BoutonPrincipal } from '@/composants/Boutons';
import { ChampCompact, ChampMontant, type RefSaisie } from '@/composants/Champs';
import { CarteChoix } from '@/composants/Choix';
import { Question } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { Progression } from '@/composants/Progression';
import { useParcours, type TypeRevenu } from '@/parcours/store';
import { jourValide, lireJour } from '@/parcours/regles';
import { motion, space } from '@/theme';

/** EC-04 Mon revenu : ce qui rentre et quand, salarié ou indépendant. */
export default function MonRevenu() {
  const { t } = useTranslation();
  const { typeRevenu, montantRevenu, jourRevenu, modifier } = useParcours();
  const refMontant = useRef<RefSaisie>(null);
  const refJour = useRef<RefSaisie>(null);

  const choisir = (type: TypeRevenu) => {
    if (type === typeRevenu) return;
    // Le montant saisi est gardé ; le jour reste en mémoire pour un retour sur Régulier.
    modifier({ typeRevenu: type });
    AccessibilityInfo.announceForAccessibility(type === 'regulier' ? t('ec04.champsAjoutes') : t('ec04.champAjoute'));
    setTimeout(() => refMontant.current?.focus(), motion.standard);
  };

  const regulier = typeRevenu === 'regulier';
  const complet =
    typeRevenu === 'variable' ? montantRevenu !== null : regulier && (montantRevenu ?? 0) >= 1 && jourValide(jourRevenu);
  const erreurMontant = regulier && montantRevenu === 0 ? { texte: t('ec04.montantNul'), erreur: true } : undefined;
  const messageJour =
    jourRevenu !== null && !jourValide(jourRevenu)
      ? { texte: t('commun.jourErreur'), erreur: true }
      : jourRevenu !== null && jourRevenu >= 29
        ? { texte: t('commun.jourAide') }
        : undefined;

  return (
    <Ecran pied={<BoutonPrincipal libelle={t('commun.continuer')} desactive={!complet} onPress={() => router.push('/mes-charges')} />}>
      <Progression etape={2} />
      <Question texte={t('ec04.question')} />
      <View style={styles.cartes} accessibilityRole="radiogroup">
        <CarteChoix
          titre={t('ec04.regulier')}
          texte={t('ec04.regulierTexte')}
          choisi={regulier}
          onPress={() => choisir('regulier')}
          position={1}
          total={2}
        />
        <CarteChoix
          titre={t('ec04.variable')}
          texte={t('ec04.variableTexte')}
          choisi={typeRevenu === 'variable'}
          onPress={() => choisir('variable')}
          position={2}
          total={2}
        />
      </View>
      {typeRevenu ? (
        <Animated.View entering={FadeIn.duration(motion.standard)} style={styles.champs}>
          <ChampMontant
            ref={refMontant}
            libelle={regulier ? t('ec04.combien') : t('ec04.plancher')}
            unite={t('commun.fcfa')}
            valeur={montantRevenu}
            onValeur={(v) => modifier({ montantRevenu: v })}
            message={erreurMontant ?? (regulier ? undefined : { texte: t('ec04.aideVariable') })}
            returnKeyType={regulier ? 'next' : 'done'}
            submitBehavior={regulier ? 'submit' : 'blurAndSubmit'}
            onSubmitEditing={() => (regulier ? refJour.current?.focus() : Keyboard.dismiss())}
          />
          {regulier ? (
            <ChampCompact
              ref={refJour}
              libelle={t('ec04.jour')}
              largeur={120}
              keyboardType="number-pad"
              maxLength={2}
              value={jourRevenu === null ? '' : String(jourRevenu)}
              onChangeText={(v) => modifier({ jourRevenu: lireJour(v) })}
              message={messageJour}
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          ) : null}
        </Animated.View>
      ) : null}
    </Ecran>
  );
}

const styles = StyleSheet.create({
  cartes: { rowGap: space.s3 },
  champs: { marginTop: space.s5, rowGap: space.s4 },
});
