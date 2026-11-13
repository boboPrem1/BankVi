import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BoutonContour, BoutonTexte } from '@/composants/Boutons';
import { dateLongue } from '@/format/date';
import { Icone } from '@/icones/Icone';
import { useParcours } from '@/parcours/store';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

function LigneAvantage({ texte }: { texte: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.ligneAvantage}>
      <Icone nom="check" couleur={colors.action.primary} taille={20} />
      <Text style={[type.body, { color: colors.text.primary, flexShrink: 1 }]}>{texte}</Text>
    </View>
  );
}

/** EC-41 Pass Plus : dire honnêtement ce que le gratuit contient et ce que le pass ajoute. */
export default function PassPlus() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const pass = useRegistre((r) => r.pass);
  const typeRevenu = useParcours((p) => p.typeRevenu);

  const estActif = Boolean(pass);

  return (
    <View style={[styles.ecran, { backgroundColor: colors.bg.canvas, paddingTop: insets.top }]}>
      {/* Barre du haut */}
      <View style={styles.barre}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={t('commun.retour')}
          style={styles.boutonRetour}
        >
          <Icone nom="arrow_back" couleur={colors.text.primary} />
        </Pressable>
        <Text style={[type.appbar, { color: colors.text.primary }]} accessibilityRole="header">
          {t('ec41.titre')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        {/* Si pass actif */}
        {estActif ? (
          <View style={[styles.bandeauActif, { backgroundColor: colors.bg.selected }]}>
            <Icone nom="check_circle" couleur={colors.text.onSelected} />
            <Text style={[type.bodyStrong, { color: colors.text.onSelected, flexShrink: 1 }]}>
              {t('ec41.passActif', { date: '6 décembre' })}
            </Text>
          </View>
        ) : (
          /* Bloc Prix */
          <View style={styles.blocPrix}>
            <Text style={[type.hero, styles.tabulaire, { color: colors.text.primary }]}>
              {t('ec41.prix30')}
            </Text>
            <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.secondary }]}>
              {t('ec41.prixAn')}
            </Text>
          </View>
        )}

        {/* Le Pass Plus ajoute */}
        <View style={styles.groupe}>
          <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s2 }]}>
            {t('ec41.ajouteTitre')}
          </Text>
          <LigneAvantage texte={t('ec41.ajouteHorizon')} />
          <LigneAvantage texte={t('ec41.ajoutePuisJe')} />
          <LigneAvantage texte={t('ec41.ajouteRecettes')} />
          <LigneAvantage texte={t('ec41.ajouteEcrire')} />
          <LigneAvantage texte={t('ec41.ajouteExports')} />
        </View>

        {/* Toujours gratuit */}
        <View style={styles.groupe}>
          <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s2 }]}>
            {t('ec41.gratuitTitre')}
          </Text>
          <LigneAvantage texte={t('ec41.gratuitBase')} />
          <LigneAvantage texte={t('ec41.gratuitHorizon')} />
          <LigneAvantage texte={t('ec41.gratuitAlertes')} />
          <LigneAvantage texte={t('ec41.gratuitExport')} />
        </View>

        {/* Mention du site (sans lien, strict store policy) */}
        {!estActif && (
          <View style={styles.sectionMention}>
            <Text style={[type.body, { color: colors.text.primary }]}>{t('ec41.mentionSite')}</Text>
            <Text style={[type.caption, { color: colors.text.secondary, marginTop: space.s1 }]}>
              {t('ec41.prevente')}
            </Text>
          </View>
        )}

        {/* Lien Pass Pro pour revenu variable */}
        {typeRevenu === 'variable' && (
          <View style={styles.lienPassPro}>
            <BoutonTexte libelle={t('ec41.lienPassPro')} onPress={() => router.push('/pass-pro' as any)} />
          </View>
        )}
      </ScrollView>

      {/* Bouton Fermer à contour */}
      <View style={[styles.pied, { paddingBottom: insets.bottom + space.s3 }]}>
        <BoutonContour libelle={t('ec41.fermer')} onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  barre: {
    height: size.appBar,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.s4,
    columnGap: space.s3,
  },
  boutonRetour: { padding: space.s1 },
  contenu: { paddingHorizontal: space.s4, paddingBottom: 96, rowGap: space.s4 },
  blocPrix: { rowGap: space.s1, marginTop: space.s2 },
  tabulaire: { fontVariant: ['tabular-nums'] },
  bandeauActif: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s3,
    padding: space.s3,
    borderRadius: 8,
    marginTop: space.s2,
  },
  groupe: { rowGap: space.s2 },
  ligneAvantage: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s3,
    minHeight: 32,
  },
  sectionMention: {
    padding: space.s3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  lienPassPro: { alignItems: 'center', marginVertical: space.s2 },
  pied: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: space.s4,
    paddingTop: space.s2,
  },
});
