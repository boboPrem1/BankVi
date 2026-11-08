import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampCompact, ChampMontant, type RefSaisie } from '@/composants/Champs';
import { Puce, RangeePuces } from '@/composants/Choix';
import { Avatar, Question } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { Progression } from '@/composants/Progression';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import type { NomIcone } from '@/icones/chemins';
import { totalCharges } from '@/parcours/etat';
import { jourValide, lireJour } from '@/parcours/regles';
import { useParcours, type Charge } from '@/parcours/store';
import { motion, size, space, type, useTheme } from '@/theme';

type Cle = 'loyer' | 'electricite' | 'ecole' | 'tontine';

const PROPOSEES: { cle: Cle; icone: NomIcone; feminin: boolean }[] = [
  { cle: 'loyer', icone: 'home', feminin: false },
  { cle: 'electricite', icone: 'bolt', feminin: true },
  { cle: 'ecole', icone: 'school', feminin: true },
  { cle: 'tontine', icone: 'groups', feminin: true },
];

interface Brouillon {
  id: string | null; // null : ajout ; sinon : modification
  cle: Cle | 'autre';
  nom: string;
  icone: NomIcone;
  feminin: boolean;
  montant: number | null;
  jour: number | null;
}

/** EC-05 Mes charges fixes : les grosses sorties qui reviennent chaque mois. */
export default function MesCharges() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { charges, modifier } = useParcours();
  const [brouillon, setBrouillon] = useState<Brouillon | null>(null);
  const refNom = useRef<RefSaisie>(null);
  const refMontant = useRef<RefSaisie>(null);
  const refJour = useRef<RefSaisie>(null);

  const total = totalCharges({ charges });
  const restantes = PROPOSEES.filter((p) => !charges.some((c) => c.id === p.cle));

  const ouvrir = (cle: Cle | 'autre') => {
    const p = PROPOSEES.find((x) => x.cle === cle);
    setBrouillon({
      id: null,
      cle,
      nom: p ? t(`ec05.${p.cle}`) : '',
      icone: p?.icone ?? 'receipt_long',
      feminin: p?.feminin ?? false,
      montant: null,
      jour: null,
    });
  };

  const valider = () => {
    if (!brouillon || brouillon.montant === null || brouillon.jour === null) return;
    const charge: Charge = {
      id: brouillon.id ?? (brouillon.cle === 'autre' ? `autre-${Date.now()}` : brouillon.cle),
      nom: brouillon.nom.trim(),
      icone: brouillon.icone,
      feminin: brouillon.feminin,
      montant: brouillon.montant,
      jour: brouillon.jour,
    };
    const suivantes = [...charges.filter((c) => c.id !== charge.id), charge].sort((a, b) => a.jour - b.jour);
    modifier({ charges: suivantes });
    Keyboard.dismiss();
    setBrouillon(null);
    AccessibilityInfo.announceForAccessibility(
      t('ec05.ajoutee', { nom: charge.nom, total: totalCharges({ charges: suivantes }), context: charge.feminin ? 'feminin' : undefined }),
    );
  };

  const retirer = (charge: Charge) => {
    const avant = charges;
    modifier({ charges: charges.filter((c) => c.id !== charge.id) });
    annoncer(t('ec05.retiree', { nom: charge.nom, context: charge.feminin ? 'feminin' : undefined }), () => modifier({ charges: avant }));
  };

  const complet =
    !!brouillon && (brouillon.montant ?? 0) >= 1 && jourValide(brouillon.jour) && (brouillon.cle !== 'autre' || brouillon.nom.trim() !== '');
  const messageJour =
    brouillon?.jour != null && !jourValide(brouillon.jour)
      ? { texte: t('commun.jourErreur'), erreur: true }
      : brouillon?.jour != null && brouillon.jour >= 29
        ? { texte: t('commun.jourAide') }
        : undefined;
  const titreFeuille = brouillon ? (brouillon.cle === 'autre' && brouillon.id === null ? t('ec05.nouvelle') : brouillon.nom) : '';

  return (
    <>
      <Ecran
        pied={
          <>
            <BoutonPrincipal libelle={t('ec05.voirHorizon')} desactive={charges.length === 0} onPress={() => router.push('/premier-horizon')} />
            {charges.length === 0 ? <BoutonTexte libelle={t('ec05.aucune')} onPress={() => router.push('/premier-horizon')} /> : null}
          </>
        }
      >
        <Progression etape={3} />
        <Question texte={t('ec05.question')} aide={t('ec05.aide')} />
        <RangeePuces>
          {restantes.map((p) => (
            <Animated.View key={p.cle} exiting={FadeOut.duration(motion.fast)} layout={LinearTransition.duration(motion.standard)}>
              <Puce libelle={t(`ec05.${p.cle}`)} icone={p.icone} onPress={() => ouvrir(p.cle)} lecture={t('ec05.puceLecture', { nom: t(`ec05.${p.cle}`) })} />
            </Animated.View>
          ))}
          <Animated.View layout={LinearTransition.duration(motion.standard)}>
            <Puce libelle={t('ec05.autre')} icone="add" onPress={() => ouvrir('autre')} lecture={t('ec05.puceLecture', { nom: t('ec05.autre') })} />
          </Animated.View>
        </RangeePuces>

        <View style={styles.liste}>
          {charges.map((c, i) => (
            <Animated.View key={c.id} entering={FadeIn.duration(motion.standard)} exiting={FadeOut.duration(motion.fast)} layout={LinearTransition.duration(motion.standard)}>
              <View style={styles.ligne}>
                <Pressable
                  style={styles.zoneLigne}
                  onPress={() => setBrouillon({ id: c.id, cle: c.id.startsWith('autre') ? 'autre' : (c.id as Cle), nom: c.nom, icone: c.icone, feminin: c.feminin, montant: c.montant, jour: c.jour })}
                  android_ripple={{ color: colors.action.ripple }}
                  accessibilityRole="button"
                  accessibilityLabel={t('ec05.ligneLecture', { nom: c.nom, montant: c.montant, jour: c.jour })}
                >
                  <Avatar icone={c.icone} />
                  <View style={styles.texteLigne}>
                    <View style={styles.titreLigne}>
                      <Text style={[type.bodyStrong, styles.nom, { color: colors.text.primary }]} numberOfLines={2}>
                        {c.nom}
                      </Text>
                      <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>{fcfa(c.montant)}</Text>
                    </View>
                    <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec05.leJour', { jour: c.jour })}</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => retirer(c)}
                  accessibilityRole="button"
                  accessibilityLabel={t('ec05.retirer', { nom: c.nom })}
                  android_ripple={{ color: colors.action.ripple, borderless: true, radius: 24 }}
                  style={styles.retirer}
                >
                  <Icone nom="close" couleur={colors.text.secondary} taille={size.iconSmall} />
                </Pressable>
              </View>
              {i < charges.length - 1 ? <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} /> : null}
            </Animated.View>
          ))}
        </View>
        {charges.length > 0 ? (
          <Text style={[type.bodyMedium, styles.total, { color: colors.text.secondary }]}>
            {t('ec05.total', { count: charges.length, montant: fcfa(total) })}
          </Text>
        ) : null}
      </Ecran>

      <FeuilleBasse
        visible={brouillon !== null}
        titre={titreFeuille}
        onFermer={() => setBrouillon(null)}
        // Montant actif, clavier ouvert ; pour une nouvelle charge « Autre », le nom d'abord.
        onAffichee={() => (brouillon?.cle === 'autre' && brouillon.id === null ? refNom : refMontant).current?.focus()}
        pied={<BoutonPrincipal libelle={brouillon?.id ? t('ec05.enregistrer') : t('ec05.ajouter')} desactive={!complet} onPress={valider} />}
      >
        {brouillon?.cle === 'autre' ? (
          <ChampCompact
            ref={refNom}
            libelle={t('ec05.nom')}
            placeholder={t('ec05.nomExemple')}
            maxLength={30}
            value={brouillon.nom}
            onChangeText={(nom) => setBrouillon({ ...brouillon, nom })}
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => refMontant.current?.focus()}
          />
        ) : null}
        <ChampMontant
          ref={refMontant}
          libelle={t('ec05.combien')}
          unite={t('commun.fcfa')}
          valeur={brouillon?.montant ?? null}
          onValeur={(montant) => brouillon && setBrouillon({ ...brouillon, montant })}
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => refJour.current?.focus()}
        />
        <ChampCompact
          ref={refJour}
          libelle={t('ec05.jour')}
          largeur={120}
          keyboardType="number-pad"
          maxLength={2}
          value={brouillon?.jour == null ? '' : String(brouillon.jour)}
          onChangeText={(v) => brouillon && setBrouillon({ ...brouillon, jour: lireJour(v) })}
          message={messageJour}
          returnKeyType="done"
          onSubmitEditing={() => (complet ? valider() : Keyboard.dismiss())}
        />
      </FeuilleBasse>
    </>
  );
}

const styles = StyleSheet.create({
  liste: { marginTop: space.s4 },
  ligne: { flexDirection: 'row', alignItems: 'center', minHeight: size.rowTwo },
  zoneLigne: { flex: 1, flexDirection: 'row', alignItems: 'center', columnGap: space.s4, minHeight: size.rowTwo },
  texteLigne: { flex: 1 },
  titreLigne: { flexDirection: 'row', alignItems: 'baseline', columnGap: space.s2, flexWrap: 'wrap' },
  nom: { flexShrink: 1, flexGrow: 1 },
  tabulaire: { fontVariant: ['tabular-nums'] },
  retirer: { width: size.touchMin, height: size.touchMin, alignItems: 'center', justifyContent: 'center', marginRight: -space.s3 },
  separateur: { height: 1, marginLeft: size.avatar + space.s4 },
  total: { marginTop: space.s2 },
});
