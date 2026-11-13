import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { Bulle } from '@/composants/Contenu';
import { Icone } from '@/icones/Icone';
import { useParcours } from '@/parcours/store';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

function LignePromesse({ texte }: { texte: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.lignePromesse}>
      <Icone nom="check" couleur={colors.text.secondary} taille={20} />
      <Text style={[type.body, { color: colors.text.primary, flexShrink: 1 }]}>{texte}</Text>
    </View>
  );
}

/** EC-42 Liste d'attente Pass Pro : mesurer l'intérêt sans demander aucun paiement. */
export default function PassPro() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const inscrit = useRegistre((r) => r.listeAttentePro ?? false);
  const compte = useParcours((p) => p.compte);

  const inscrire = () => {
    useRegistre.getState().modifier({ listeAttentePro: true });
    annoncer(t('ec42.inscrit'));
  };

  const retirer = () => {
    useRegistre.getState().modifier({ listeAttentePro: false });
    annoncer(t('commun.enregistre'));
  };

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
          {t('ec42.titre')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        {/* Titre d'accroche */}
        <Text style={[type.hero, { color: colors.text.primary }]}>{t('ec42.sousTitre')}</Text>

        {/* Bientôt */}
        <View style={styles.groupe}>
          <Text style={[type.subtitle, { color: colors.text.primary }]}>{t('ec42.bientot')}</Text>
          <LignePromesse texte={t('ec42.promesse1')} />
          <LignePromesse texte={t('ec42.promesse2')} />
          <LignePromesse texte={t('ec42.promesse3')} />
        </View>

        {/* Prix prévu */}
        <Text style={[type.body, styles.tabulaire, { color: colors.text.secondary }]}>{t('ec42.prix')}</Text>

        {/* Mention sans paiement */}
        <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{t('ec42.mention')}</Text>

        {/* État inscrit */}
        {inscrit ? (
          <View style={styles.sectionInscrit}>
            <View style={[styles.bandeauInscrit, { backgroundColor: colors.bg.selected }]}>
              <Icone nom="check_circle" couleur={colors.text.onSelected} />
              <Text style={[type.bodyStrong, { color: colors.text.onSelected }]}>{t('ec42.inscrit')}</Text>
            </View>
            <BoutonTexte libelle={t('ec42.retirer')} onPress={retirer} />
          </View>
        ) : !compte ? (
          /* Avertissement sans compte */
          <View style={styles.sectionSansCompte}>
            <Bulle texte={t('ec42.sansCompte')} />
            <BoutonPrincipal libelle={t('ec12.sauvegarder')} onPress={() => router.push('/sauvegarde')} />
          </View>
        ) : null}
      </ScrollView>

      {/* Bouton principal si non inscrit et avec compte */}
      {!inscrit && compte && (
        <View style={[styles.pied, { paddingBottom: insets.bottom + space.s3 }]}>
          <BoutonPrincipal libelle={t('ec42.inscrire')} onPress={inscrire} />
        </View>
      )}
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
  groupe: { rowGap: space.s2 },
  lignePromesse: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s3,
    minHeight: 32,
  },
  tabulaire: { fontVariant: ['tabular-nums'] },
  sectionInscrit: { alignItems: 'center', rowGap: space.s3, marginTop: space.s3 },
  bandeauInscrit: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s3,
    padding: space.s3,
    borderRadius: 8,
    width: '100%',
  },
  sectionSansCompte: { rowGap: space.s3, marginTop: space.s2 },
  pied: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: space.s4,
    paddingTop: space.s2,
  },
});
