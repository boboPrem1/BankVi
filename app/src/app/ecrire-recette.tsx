import { repartir } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampCompact } from '@/composants/Champs';
import { Bulle } from '@/composants/Contenu';
import { teinte } from '@/composants/Deplacer';
import { Ecran } from '@/composants/Ecran';
import { BarrePots, Pastille } from '@/composants/Pots';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { adopterOuRanger } from '@/registre/adoption';
import { useEtat } from '@/registre/etat';
import { lirePhrase, recetteDePhrase } from '@/registre/phrase';
import { baseDe, idCopie } from '@/registre/pots';
import { useRegistre } from '@/registre/store';
import { motion, size, space, type, useTheme } from '@/theme';

/** EC-33 Écrire une recette : une phrase, comme un message. Pass Plus. */
export default function EcrireRecette() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const etat = useEtat();
  const pass = useRegistre((r) => r.pass);
  const phrase = useRegistre((r) => r.phrase);
  const [actif, setActif] = useState(false);
  const [noms, setNoms] = useState<Record<number, string>>({});
  const base = baseDe(etat);

  const lecture = useMemo(() => lirePhrase(phrase), [phrase]);
  const pots = lecture.type === 'ok' ? lecture.pots.map((p, i) => ({ ...p, nom: p.nom || (noms[i] ?? '').trim() })) : [];
  const sansNom = lecture.type === 'ok' && lecture.pots.some((p) => !p.nom);
  const recette = lecture.type === 'ok' && pots.every((p) => p.nom) ? recetteDePhrase(pots, idCopie('ecrite')) : undefined;
  const apercu = lecture.type === 'ok' ? recetteDePhrase(pots.map((p, i) => ({ ...p, nom: p.nom || t('ec33.pot', { n: i + 1 }) })), 'apercu') : undefined;
  const parts = apercu ? repartir(base, apercu) : {};

  const message =
    lecture.type === 'incompris'
      ? t('ec33.incompris')
      : lecture.type === 'somme'
        ? lecture.somme < 100
          ? t('ec33.manque', { somme: lecture.somme, ecart: 100 - lecture.somme })
          : t('ec33.trop', { somme: lecture.somme, ecart: lecture.somme - 100 })
        : null;

  // Résultat annoncé après une pause dans la frappe, pas à chaque caractère.
  useEffect(() => {
    const m = setTimeout(() => {
      if (message) AccessibilityInfo.announceForAccessibility(message);
      else if (apercu) AccessibilityInfo.announceForAccessibility(apercu.pots.map((p) => `${p.nom}, ${p.regle.type === 'pourcentage' ? p.regle.valeur : 0} %`).join('. '));
    }, 1000);
    return () => clearTimeout(m);
  }, [message, apercu?.nom]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!pass) {
    return (
      <Ecran
        fermer
        pied={
          <>
            <BoutonPrincipal libelle={t('ec25.fermer')} onPress={() => router.back()} />
            <BoutonTexte libelle={t('ec25.voirPass')} onPress={() => router.push({ pathname: '/a-venir', params: { code: 'EC-41' } })} />
          </>
        }
      >
        <View style={styles.description}>
          <Text style={[type.title, { color: colors.text.primary }]} accessibilityRole="header">
            {t('ec33.titre')}
          </Text>
          <Text style={[type.bodyLarge, { color: colors.text.secondary }]}>{t('ec33.description')}</Text>
          <View style={styles.exemple}>
            <Text style={[type.captionMedium, { color: colors.status.infoFg }]}>{t('ec25.exemple')}</Text>
            <Bulle texte={t('ec33.exemple')} />
          </View>
          <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec33.fonctionPass')}</Text>
        </View>
      </Ecran>
    );
  }

  let rang = 0;
  return (
    <Ecran
      titre={t('ec33.titre')}
      pied={<BoutonPrincipal libelle={t('ec33.creer')} desactive={!recette} onPress={() => recette && adopterOuRanger(etat, recette, t('ec33.creee'))} />}
    >
      <Text style={[type.bodyMedium, { color: actif ? colors.border.focus : colors.text.secondary }]}>{t('ec33.libelle')}</Text>
      <TextInput
        value={phrase}
        onChangeText={(v) => useRegistre.getState().modifier({ phrase: v })}
        placeholder={t('ec33.exemple')}
        placeholderTextColor={colors.text.tertiary}
        accessibilityLabel={t('ec33.libelle')}
        maxLength={120}
        multiline
        autoFocus
        onFocus={() => setActif(true)}
        onBlur={() => setActif(false)}
        style={[
          type.bodyLarge,
          styles.champ,
          { color: colors.text.primary, borderBottomColor: actif ? colors.border.focus : colors.border.control, borderBottomWidth: actif ? 2 : 1 },
        ]}
      />
      {message ? (
        <View style={styles.message} accessibilityLiveRegion="polite">
          <Icone nom="warning" couleur={colors.status.warnFg} taille={size.iconSmall} />
          <Text style={[type.body, styles.flex, { color: colors.status.warnFg }]}>{message}</Text>
        </View>
      ) : null}
      {apercu ? (
        <View style={styles.resultat}>
          <BarrePots recette={apercu} />
          {apercu.pots.map((p, i) => {
            const c = teinte(colors, rang++) ?? colors.border.control;
            return (
              <Animated.View key={`${i}-${p.nom}`} entering={FadeIn.duration(motion.fast)}>
                <View style={styles.ligne}>
                  <Pastille couleur={c} />
                  <Text style={[type.body, styles.flex, { color: colors.text.primary }]}>{p.nom}</Text>
                  <Text style={[type.body, styles.tabulaire, { color: colors.text.primary }]}>{`${p.regle.type === 'pourcentage' ? p.regle.valeur : 0} %`}</Text>
                  {base > 0 ? <Text style={[type.body, styles.tabulaire, styles.montant, { color: colors.text.primary }]}>{fcfa(parts[p.id] ?? 0)}</Text> : null}
                </View>
                {sansNom && lecture.type === 'ok' && !lecture.pots[i]!.nom ? (
                  <ChampCompact libelle={t('ec33.nomPot', { n: i + 1 })} value={noms[i] ?? ''} onChangeText={(v) => setNoms((x) => ({ ...x, [i]: v }))} maxLength={24} />
                ) : null}
              </Animated.View>
            );
          })}
        </View>
      ) : null}
    </Ecran>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  champ: { minHeight: 72, paddingVertical: space.s2, paddingHorizontal: 0, textAlignVertical: 'top' },
  message: { flexDirection: 'row', alignItems: 'flex-start', columnGap: space.s2, marginTop: space.s3 },
  resultat: { marginTop: space.s3, rowGap: space.s1 },
  ligne: { minHeight: 32, flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  montant: { minWidth: 96, textAlign: 'right' },
  description: { rowGap: space.s4, marginTop: space.s2 },
  exemple: { rowGap: space.s1 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
