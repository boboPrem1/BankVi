import { CATALOGUE, effetRecette, recettePlusProche, type Recette } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { Radio } from '@/composants/Choix';
import { Bulle } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { BarrePots, Pastille, couleurPot, potsEnPourcentage } from '@/composants/Pots';
import { fcfa } from '@/format/montant';
import { etatDepuis, totalCharges } from '@/parcours/etat';
import { useParcours } from '@/parcours/store';
import { radius, space, type, useTheme } from '@/theme';

/** Ordre des cartes selon la recette la plus proche (EC-07, section 6). */
function ordre(premiere: Recette): Recette[] {
  const c = CATALOGUE;
  if (premiere.id === 'plancher-prudent') return [c['plancher-prudent'], c['50-30-20'], c['70-20-10']];
  if (premiere.id === '70-20-10') return [c['70-20-10'], c['50-30-20'], c['payez-vous-d-abord']];
  return [c['50-30-20'], c['70-20-10'], c['payez-vous-d-abord']];
}

/** EC-07 La recette la plus proche : une proposition avec un fait, jamais un conseil. */
export default function RecetteProche() {
  const { t } = useTranslation();
  const reponses = useParcours();
  const { recetteChoisie, modifier } = reponses;

  const { cartes, raison, effets } = useMemo(() => {
    const etat = etatDepuis({ ...reponses, recetteAdoptee: null });
    const choix = recettePlusProche({
      variable: reponses.typeRevenu === 'variable',
      revenuMensuel: reponses.montantRevenu ?? 0,
      chargesMensuelles: totalCharges(reponses),
    });
    const liste = ordre(choix.recette);
    return {
      cartes: liste,
      raison:
        choix.raison === 'revenu-variable'
          ? t('ec07.raisonVariable')
          : choix.raison === 'sans-charge'
            ? t('ec07.raisonSansCharge')
            : t('ec07.raisonCharges', { pct: choix.chargesPct }),
      effets: Object.fromEntries(liste.map((r) => [r.id, effetRecette(etat, r)])),
    };
  }, [reponses, t]);

  const choisie = recetteChoisie && cartes.some((c) => c.id === recetteChoisie) ? recetteChoisie : cartes[0]!.id;

  return (
    <Ecran
      pied={
        <>
          <BoutonPrincipal
            libelle={t('ec07.voir')}
            onPress={() => {
              modifier({ recetteChoisie: choisie });
              router.push('/apercu-recette');
            }}
          />
          <BoutonTexte libelle={t('commun.plusTard')} onPress={() => router.push('/quand-noter')} />
        </>
      }
    >
      <TitreEcran texte={t('ec07.titre')} />
      <Bulle texte={raison} />
      <View style={styles.cartes} accessibilityRole="radiogroup">
        {cartes.map((r, i) => {
          const effet = effets[r.id]!;
          return (
            <CarteRecette
              key={r.id}
              recette={r}
              premiere={i === 0}
              choisie={r.id === choisie}
              position={i + 1}
              total={cartes.length}
              effet={
                effet.manque !== undefined
                  ? t('ec07.effetManque', { montant: fcfa(effet.manque) })
                  : t('ec07.effet', { montant: fcfa(effet.chiffre) })
              }
              onPress={() => modifier({ recetteChoisie: r.id })}
            />
          );
        })}
      </View>
    </Ecran>
  );
}

function TitreEcran({ texte }: { texte: string }) {
  const { colors } = useTheme();
  return (
    <Text style={[type.title, styles.titre, { color: colors.text.primary }]} accessibilityRole="header">
      {texte}
    </Text>
  );
}

interface CarteProps {
  recette: Recette;
  premiere: boolean;
  choisie: boolean;
  effet: string;
  position: number;
  total: number;
  onPress: () => void;
}

function CarteRecette({ recette, premiere, choisie, effet, position, total, onPress }: CarteProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const pots = potsEnPourcentage(recette);
  const lecture = t('ec07.lectureCarte', {
    nom: recette.nom,
    marque: premiere ? `, ${t('ec07.marque').toLowerCase()}` : '',
    etat: choisie ? t('ec07.selectionne') : t('ec07.nonSelectionne'),
    pots: [...pots.map((p) => `${p.nom} ${p.pct} %`), effet].join(', '),
    position,
    total,
  });
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: choisie }}
      accessibilityLabel={lecture}
      android_ripple={{ color: colors.action.ripple }}
      // Le fond reste celui du repos : sur le vert pâle, la barre orange passerait sous 3:1.
      style={[
        styles.carte,
        {
          backgroundColor: colors.bg.elevated,
          borderColor: choisie ? colors.border.focus : colors.border.control,
          borderWidth: choisie ? 2 : 1,
          padding: choisie ? 15 : 16,
        },
      ]}
    >
      <View style={styles.entete}>
        <Radio choisi={choisie} />
        <Text style={[type.bodyStrong, { color: colors.text.primary }]}>{recette.nom}</Text>
        {premiere ? (
          <View style={[styles.marque, { backgroundColor: colors.bg.selected }]}>
            <Text style={[type.captionMedium, { color: colors.text.onSelected }]}>{t('ec07.marque')}</Text>
          </View>
        ) : null}
      </View>
      <BarrePots recette={recette} />
      <View>
        {pots.map((p, i) => (
          <View key={p.id} style={styles.pot}>
            <Pastille couleur={couleurPot(colors, i)} />
            <Text style={[type.body, { color: colors.text.primary }]}>{`${p.nom} ${p.pct} %`}</Text>
          </View>
        ))}
      </View>
      <Text style={[type.bodyMedium, styles.tabulaire, { color: colors.text.primary }]}>{effet}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titre: { marginTop: space.s2, marginBottom: space.s3 },
  cartes: { marginTop: space.s4, rowGap: space.s3 },
  carte: { borderRadius: radius.md, rowGap: space.s3, overflow: 'hidden' },
  entete: { flexDirection: 'row', alignItems: 'center', columnGap: space.s3, flexWrap: 'wrap', rowGap: space.s1 },
  marque: { height: 20, borderRadius: radius.xs, paddingHorizontal: space.s1, justifyContent: 'center' },
  pot: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2, minHeight: 20 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
