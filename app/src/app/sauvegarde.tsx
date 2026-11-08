import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampCompact } from '@/composants/Champs';
import { Question } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { terminerParcours } from '@/parcours/fin';
import { useParcours } from '@/parcours/store';
import { space, type, useTheme } from '@/theme';

/** « 90123456 » devient « 90 12 34 56 ». */
const enGroupes = (chiffres: string) => chiffres.replace(/(\d{2})(?=\d)/g, '$1 ');

/** EC-10 Sauvegarde : un compte proposé après la valeur, toujours facultatif. */
export default function Sauvegarde() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { compte } = useLocalSearchParams<{ compte?: string }>();
  const existant = compte === 'existant';
  const { numero, modifier } = useParcours();
  const [quitte, setQuitte] = useState(false);
  const [envoi, setEnvoi] = useState<'non' | 'attente' | 'visible'>('non');
  const minuteries = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => minuteries.current.forEach(clearTimeout), []);

  // Écrans statiques : l'envoi du SMS est simulé. Le cercle n'apparaît qu'après 300 ms.
  const envoyer = () => {
    setEnvoi('attente');
    minuteries.current = [
      setTimeout(() => setEnvoi('visible'), 300),
      setTimeout(() => {
        setEnvoi('non');
        router.push({ pathname: '/code', params: existant ? { compte: 'existant' } : {} });
      }, 1200),
    ];
  };

  const complet = numero.length === 8;
  const erreur = quitte && numero.length > 0 && !complet ? { texte: t('ec10.huitChiffres'), erreur: true } : undefined;
  const lien = (texte: string, document: string) => (
    <Text
      style={[styles.lien, { color: colors.text.link }]}
      accessibilityRole="link"
      onPress={() => router.push({ pathname: '/a-venir', params: { code: document } })}
    >
      {texte}
    </Text>
  );

  return (
    <Ecran
      pied={
        <BoutonPrincipal
          libelle={t('ec10.recevoir')}
          desactive={!complet}
          chargement={envoi === 'visible' ? t('ec10.envoi') : false}
          onPress={envoyer}
        />
      }
    >
      <Question texte={existant ? t('ec10.titreExistant') : t('ec10.titre')} aide={existant ? t('ec10.aideExistant') : t('ec10.aide')} />
      <ChampCompact
        libelle={t('ec10.libelle')}
        accessibilityLabel={t('ec10.lectureChamp')}
        avant={
          <View style={styles.indicatif}>
            <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{t('ec10.indicatif')}</Text>
            <View style={[styles.traitIndicatif, { backgroundColor: colors.border.control }]} />
          </View>
        }
        value={enGroupes(numero)}
        // Le collage retire « +228 » et les espaces.
        onChangeText={(v) => modifier({ numero: v.replace(/^\s*\+?228/, '').replace(/\D/g, '').slice(0, 8) })}
        onBlur={() => setQuitte(true)}
        onFocus={() => setQuitte(false)}
        placeholder={t('ec10.placeholder')}
        keyboardType="phone-pad"
        autoComplete="tel-national"
        autoFocus
        editable={envoi === 'non'}
        message={erreur}
      />
      <Text style={[type.caption, styles.mention, { color: colors.text.secondary }]}>
        {existant ? t('ec10.mentionExistantDebut') : t('ec10.mentionDebut')}
        {lien(t('ec10.conditions'), 'Conditions')}
        {t('ec10.et')}
        {lien(t('ec10.confidentialite'), 'Confidentialité')}
        {t('ec10.fin')}
      </Text>
      {existant ? null : <BoutonTexte libelle={t('commun.plusTard')} onPress={() => terminerParcours()} />}
    </Ecran>
  );
}

const styles = StyleSheet.create({
  indicatif: { width: 64 },
  traitIndicatif: { height: 1, marginTop: space.s1 + 1 },
  mention: { marginTop: space.s3, marginBottom: space.s1 },
  lien: { textDecorationLine: 'underline' },
});
