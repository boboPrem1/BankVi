import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonContour, BoutonDestructif, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampCompact } from '@/composants/Champs';
import { Question } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { useRegistre } from '@/registre/store';
import { radius, space, type, useTheme } from '@/theme';

const CODE_DEMO = '482913';
const RENVOI_SECONDES = 60;
const MAX_ESSAIS = 5;

const enGroupes = (chiffres: string) => chiffres.replace(/(\d{2})(?=\d)/g, '$1 ');

/** EC-53 Numéro perdu : récupération via e-mail de secours, ou vérification après 90 jours d'inactivité. */
export default function NumeroPerdu() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const inactif = mode === 'inactif';

  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [pasDEmail, setPasDEmail] = useState(false);
  const [dialogueNouveau, setDialogueNouveau] = useState(false);
  const [etape, setEtape] = useState<'saisie' | 'code'>('saisie');

  const [code, setCode] = useState('');
  const [essais, setEssais] = useState(0);
  const [restant, setRestant] = useState(RENVOI_SECONDES);
  const saisi = useRef('');

  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const peutEnvoyer = inactif ? emailValide : numero.length === 8 && emailValide;
  const bloque = essais >= MAX_ESSAIS;

  useEffect(() => {
    if (etape !== 'code' || restant <= 0) return;
    const m = setTimeout(() => setRestant((r) => r - 1), 1000);
    return () => clearTimeout(m);
  }, [etape, restant]);

  useEffect(() => {
    if (etape !== 'code') return;
    const m = setTimeout(() => {
      if (saisi.current === '') traiterCode(CODE_DEMO);
    }, 3500);
    return () => clearTimeout(m);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etape]);

  const envoyerCode = () => {
    if (!peutEnvoyer) return;
    saisi.current = '';
    setCode('');
    setEssais(0);
    setRestant(RENVOI_SECONDES);
    setEtape('code');
  };

  const traiterCode = (val: string) => {
    const propre = val.replace(/\D/g, '').slice(0, 6);
    saisi.current = propre;
    setCode(propre);
    if (propre.length < 6 || bloque) return;
    if (propre === CODE_DEMO) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/sauvegarde');
      return;
    }
    setEssais((n) => n + 1);
  };

  const ouvrirNouveauCompte = () => {
    useRegistre.getState().repartirDeZero();
    setDialogueNouveau(false);
    router.replace('/mon-argent');
  };

  const formatCompte = (s: number) => `0:${String(s).padStart(2, '0')}`;

  if (etape === 'code') {
    return (
      <Ecran>
        <Question texte={t('ec53.entrerCode')} aide={email.trim()} />
        <Pressable accessibilityRole="none" style={styles.cases}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const ch = code[i] ?? '';
            const actif = i === code.length && !bloque;
            return (
              <View
                key={i}
                style={[
                  styles.case,
                  {
                    borderColor: bloque ? colors.status.errorFg : actif ? colors.action.primary : colors.border.control,
                    backgroundColor: colors.bg.subtle,
                  },
                ]}
              >
                <Text style={[type.title, styles.tabulaire, { color: colors.text.primary }]}>{ch}</Text>
              </View>
            );
          })}
          <TextInput
            value={code}
            onChangeText={traiterCode}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
            editable={!bloque}
            style={styles.champCache}
            accessibilityLabel={t('ec53.entrerCode')}
          />
        </Pressable>

        {bloque ? (
          <Text style={[type.bodyMedium, styles.message, { color: colors.status.errorFg }]}>{t('ec53.tropDEssais')}</Text>
        ) : essais > 0 && code.length === 6 ? (
          <Text style={[type.bodyMedium, styles.message, { color: colors.status.errorFg }]}>{t('ec53.codeIncorrect')}</Text>
        ) : null}

        <View style={styles.renvoi}>
          {restant > 0 ? (
            <Text style={[type.bodyMedium, { color: colors.text.secondary }]}>
              {t('ec53.renvoyerDans', { temps: formatCompte(restant) })}
            </Text>
          ) : (
            <BoutonTexte
              libelle={t('ec53.renvoyer')}
              onPress={() => {
                setRestant(RENVOI_SECONDES);
                setCode('');
                saisi.current = '';
              }}
            />
          )}
        </View>
      </Ecran>
    );
  }

  return (
    <Ecran
      pied={<BoutonPrincipal libelle={t('ec53.recevoirCode')} desactive={!peutEnvoyer} onPress={envoyerCode} />}
    >
      <Question
        texte={inactif ? t('ec53.titreInactif') : t('ec53.titre')}
        aide={inactif ? t('ec53.aideInactif') : t('ec53.aide')}
      />

      {!inactif && (
        <ChampCompact
          libelle={t('ec53.ancienNumero')}
          avant={
            <View style={styles.indicatif}>
              <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{t('ec10.indicatif')}</Text>
              <View style={[styles.traitIndicatif, { backgroundColor: colors.border.control }]} />
            </View>
          }
          value={enGroupes(numero)}
          onChangeText={(v) => setNumero(v.replace(/^\s*\+?228/, '').replace(/\D/g, '').slice(0, 8))}
          placeholder={t('ec10.placeholder')}
          keyboardType="phone-pad"
          autoFocus
        />
      )}

      <View style={!inactif ? styles.champSuivant : undefined}>
        <ChampCompact
          libelle={t('ec53.tonEmail')}
          value={email}
          onChangeText={setEmail}
          placeholder={t('ec53.emailExemple')}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={inactif}
        />
      </View>

      {inactif ? (
        <Pressable onPress={() => setDialogueNouveau(true)} hitSlop={8} style={styles.lienZone} accessibilityRole="link">
          <Text style={[type.bodyMedium, { color: colors.text.link }]}>{t('ec53.pasMonCompte')}</Text>
        </Pressable>
      ) : (
        <>
          <Pressable onPress={() => setPasDEmail(true)} hitSlop={8} style={styles.lienZone} accessibilityRole="link">
            <Text style={[type.bodyMedium, { color: colors.text.link }]}>{t('ec53.pasDEmail')}</Text>
          </Pressable>
          {pasDEmail && (
            <View style={[styles.blocContact, { backgroundColor: colors.bg.subtle }]}>
              <Text style={[type.bodyMedium, { color: colors.text.primary }]}>{t('ec53.pasDEmailTexte')}</Text>
              <BoutonContour libelle={t('ec53.contacter')} onPress={() => annoncer(t('ec53.contactAnnonce'))} />
            </View>
          )}
        </>
      )}

      <FeuilleBasse visible={dialogueNouveau} titre={t('ec53.dialoguePasMonCompteTitre')} onFermer={() => setDialogueNouveau(false)}>
        <View style={styles.dialogue}>
          <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{t('ec53.dialoguePasMonCompteTexte')}</Text>
          <View style={styles.dialogueActions}>
            <BoutonDestructif libelle={t('ec53.nouveauCompte')} onPress={ouvrirNouveauCompte} />
            <BoutonTexte libelle={t('commun.annuler')} onPress={() => setDialogueNouveau(false)} />
          </View>
        </View>
      </FeuilleBasse>
    </Ecran>
  );
}

const styles = StyleSheet.create({
  indicatif: { width: 64 },
  traitIndicatif: { height: 1, marginTop: space.s1 + 1 },
  champSuivant: { marginTop: space.s3 },
  lienZone: {
    minHeight: 48,
    justifyContent: 'center',
    marginTop: space.s2,
  },
  blocContact: {
    marginTop: space.s2,
    padding: space.s4,
    borderRadius: radius.md,
    rowGap: space.s3,
  },
  dialogue: { rowGap: space.s4, paddingBottom: space.s4 },
  dialogueActions: { rowGap: space.s2 },
  cases: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: space.s6,
    position: 'relative',
  },
  case: {
    width: 44,
    height: 56,
    borderWidth: 1.5,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabulaire: { fontVariant: ['tabular-nums'] },
  champCache: {
    ...StyleSheet.absoluteFill,
    opacity: 0.01,
  },
  message: { marginTop: space.s3 },
  renvoi: { marginTop: space.s6, alignItems: 'center' },
});
