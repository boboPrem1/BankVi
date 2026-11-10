import { repartir, type Pot, type Recette } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal } from '@/composants/Boutons';
import { ChampCompact, ChampMontant, type RefSaisie } from '@/composants/Champs';
import { Bulle } from '@/composants/Contenu';
import { Puce, RangeePuces, Segments } from '@/composants/Choix';
import { Ecran } from '@/composants/Ecran';
import { fcfa, nombre } from '@/format/montant';
import { useEtat } from '@/registre/etat';
import { adopter, baseDe, idCopie, origineDe, recetteCourante } from '@/registre/pots';
import { motion, space, type, useTheme } from '@/theme';

type Regle = 'pourcentage' | 'fixe' | 'reste';
const PUCES = [
  { cle: 'tontine', nature: 'tontine', regle: 'fixe' as Regle },
  { cle: 'famille', nature: 'soutien-familial', regle: 'pourcentage' as Regle },
  { cle: 'imprevus', nature: 'imprevu', regle: 'pourcentage' as Regle },
];

/** EC-29 Ajouter un pot : une part qui correspond à la vie réelle, sans régler toute la recette. */
export default function AjouterPot() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const etat = useEtat();
  const refValeur = useRef<RefSaisie>(null);
  const courante = recetteCourante(etat)?.recette;
  const base = baseDe(etat);
  const [nom, setNom] = useState('');
  const [nature, setNature] = useState<string | undefined>();
  const [regle, setRegle] = useState<Regle | null>(null);
  const [valeur, setValeur] = useState<number | null>(null);

  const quotidien = courante?.pots.find((p) => p.quotidien && p.regle.type === 'pourcentage');
  const resteExiste = courante?.pots.some((p) => p.regle.type === 'reste') ?? false;

  const { nouvelle, erreur } = useMemo(() => {
    if (!courante || !regle || !nom.trim()) return { nouvelle: undefined, erreur: undefined };
    if (regle !== 'reste' && (valeur === null || valeur <= 0)) return { nouvelle: undefined, erreur: undefined };
    const pot: Pot = {
      id: `pot-${Date.now().toString(36)}`,
      nom: nom.trim(),
      regle: regle === 'reste' ? { type: 'reste' } : { type: regle, valeur: valeur ?? 0 },
      quotidien: false,
      ...(nature ? { natures: [nature] } : {}),
    };
    if (regle === 'fixe' && (valeur ?? 0) > base) return { nouvelle: undefined, erreur: t('ec29.tropFixe', { montant: fcfa(base) }) };
    let pots = courante.pots;
    if (regle === 'pourcentage') {
      // Un pourcentage ajouté réduit d'autant le pot du quotidien.
      const q = quotidien?.regle.type === 'pourcentage' ? quotidien.regle.valeur : 0;
      if (!quotidien || (valeur ?? 0) > q) return { nouvelle: undefined, erreur: t('ec29.tropPct', { nom: quotidien?.nom ?? '', pct: q }) };
      pots = pots.map((p) => (p === quotidien ? { ...p, regle: { type: 'pourcentage', valeur: q - (valeur ?? 0) } } : p));
    }
    // Ordre : montants fixes, pourcentages, « le reste ».
    const ordre = regle === 'fixe' ? [pot, ...pots] : regle === 'reste' ? [...pots, pot] : [...pots.filter((p) => p.regle.type !== 'reste'), pot, ...pots.filter((p) => p.regle.type === 'reste')];
    const origine = origineDe(courante) ?? courante;
    const r: Recette = { ...courante, id: idCopie('ajustee', origine), nom: t('ec30.dApres', { nom: origine.nom }), pots: ordre };
    return { nouvelle: r, erreur: undefined };
  }, [courante, regle, nom, valeur, nature, base, quotidien, t]);

  if (!courante) {
    return (
      <Ecran titre={t('ec29.titre')} pied={<BoutonPrincipal libelle={t('ec27.choisir')} onPress={() => router.replace('/catalogue')} />}>
        <Bulle texte={t('ec29.sansRecette')} />
      </Ecran>
    );
  }

  const effet =
    regle === 'reste' && nom.trim()
      ? t('ec29.effetReste')
      : nouvelle && base > 0
        ? (() => {
            const parts = repartir(base, nouvelle);
            const liste = nouvelle.pots.filter((p) => p.regle.type !== 'reste').map((p) => `${p.nom} ${nombre(parts[p.id] ?? 0)}`).join(', ');
            return t('ec29.effet', { base: fcfa(base), liste });
          })()
        : null;

  const creer = () => {
    if (!nouvelle) return;
    const annuler = adopter(etat, nouvelle);
    router.back();
    annoncer(t('ec29.cree', { nom: nom.trim() }), annuler);
  };

  return (
    <Ecran titre={t('ec29.titre')} pied={<BoutonPrincipal libelle={t('ec29.creer')} desactive={!nouvelle} onPress={creer} />}>
      <View style={styles.puces}>
        <RangeePuces>
          {PUCES.map((p) => (
            <Puce
              key={p.cle}
              libelle={t(`ec29.puces.${p.cle}` as 'ec29.puces.tontine')}
              onPress={() => {
                setNom(t(`ec29.puces.${p.cle}` as 'ec29.puces.tontine'));
                setNature(p.nature);
                setRegle(p.regle);
                setTimeout(() => refValeur.current?.focus(), 50);
              }}
            />
          ))}
        </RangeePuces>
      </View>
      <ChampCompact
        libelle={t('ec29.nom')}
        value={nom}
        onChangeText={(v) => {
          setNom(v);
          setNature(undefined);
        }}
        maxLength={24}
      />
      <View style={styles.bloc}>
        <Segments
          segments={[
            { valeur: 'pourcentage', libelle: t('ec29.pourcentage') },
            { valeur: 'fixe', libelle: t('ec29.fixe') },
            ...(resteExiste ? [] : [{ valeur: 'reste' as const, libelle: t('ec29.reste') }]),
          ]}
          valeur={regle ?? ('' as Regle)}
          onChoix={(r) => {
            setRegle(r);
            setValeur(null);
          }}
        />
      </View>
      {regle && regle !== 'reste' ? (
        <View style={styles.bloc}>
          <ChampMontant
            ref={refValeur}
            libelle={regle === 'fixe' ? t('ec29.chaqueRevenu') : t('ec29.partRevenu')}
            unite={regle === 'fixe' ? t('commun.fcfa') : '%'}
            valeur={valeur}
            onValeur={setValeur}
            message={erreur ? { texte: erreur , attention: true } : undefined}
          />
        </View>
      ) : null}
      {effet ? (
        <Animated.Text key={effet} entering={FadeIn.duration(motion.fast)} style={[type.body, styles.effet, { color: colors.text.primary }]} accessibilityLiveRegion="polite">
          {effet}
        </Animated.Text>
      ) : null}
    </Ecran>
  );
}

const styles = StyleSheet.create({
  puces: { marginTop: space.s2, marginBottom: space.s4 },
  bloc: { marginTop: space.s3 },
  effet: { marginTop: space.s3, fontVariant: ['tabular-nums'] },
});

