import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonDestructif, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { LigneInterrupteur } from '@/composants/Choix';
import { Icone } from '@/icones/Icone';
import { useParcours } from '@/parcours/store';
import { categorie } from '@/registre/categories';
import { useEtat } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { radius, size, space, type, useTheme } from '@/theme';

/** EC-45 Mes données : dire clairement où sont les données, les emporter ou tout supprimer. */
export default function Donnees() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const etat = useEtat();
  const registre = useRegistre();
  const parcours = useParcours();

  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [statsUsage, setStatsUsage] = useState(registre.statistiquesUsage ?? false);

  const compte = parcours.compte;

  const toggleStats = (v: boolean) => {
    setStatsUsage(v);
    useRegistre.getState().modifier({ statistiquesUsage: v });
  };

  const exporterCsv = async () => {
    const entetes = ['Date', 'Type', 'Montant', 'Poche', 'Catégorie', 'Nature', 'Description', 'Origine'];
    const lignes = [entetes.join(';')];
    for (const e of etat.ecritures) {
      if (e.type === 'depense' || e.type === 'revenu') {
        const m = registre.meta[e.id];
        const cat = categorie(e.categorie);
        lignes.push(
          [
            e.at.slice(0, 10),
            e.type === 'depense' ? 'Dépense' : 'Revenu',
            String(e.montant),
            e.poche,
            cat?.nom ?? e.categorie,
            cat?.nature ?? '',
            m?.description ? `"${m.description.replace(/"/g, '""')}"` : '',
            m?.origine ?? 'toi',
          ].join(';'),
        );
      }
    }
    const contenuCsv = lignes.join('\r\n');
    try {
      await Share.share({
        title: 'export-bankvi.csv',
        message: contenuCsv,
      });
      annoncer(t('ec45.exporte'));
    } catch {
      // Annulé par l'utilisateur
    }
  };

  const confirmerSuppression = () => {
    useRegistre.getState().reinitialiser();
    useParcours.getState().reinitialiser();
    setDialogueVisible(false);
    annoncer(t('ec45.supprime'));
    router.replace('/');
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
          {t('ec45.titre')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        {/* État de sauvegarde */}
        {compte ? (
          <View style={styles.ligneEtatSauvegarde}>
            <Icone nom="cloud_done" couleur={colors.action.primary} />
            <Text style={[type.bodyStrong, { color: colors.action.primary }]}>
              {t('ec45.sauvegarde')}
            </Text>
          </View>
        ) : (
          <View style={styles.sectionSansCompte}>
            <Text style={[type.bodyStrong, { color: colors.text.secondary }]}>
              {t('ec45.sauvegardeLocale')}
            </Text>
            <BoutonPrincipal libelle={t('ec12.sauvegarder')} onPress={() => router.push('/sauvegarde')} />
          </View>
        )}

        {/* Explication : sur notre serveur */}
        <View style={styles.blocExplication}>
          <Text style={[type.subtitle, { color: colors.text.primary }]}>{t('ec45.serveurTitre')}</Text>
          <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec45.serveurTexte')}</Text>
        </View>

        {/* Explication : seulement sur ce téléphone */}
        <View style={styles.blocExplication}>
          <Text style={[type.subtitle, { color: colors.text.primary }]}>{t('ec45.localTitre')}</Text>
          <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec45.localTexte')}</Text>
        </View>

        <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} />

        {/* Statistiques d'usage */}
        <LigneInterrupteur
          titre={t('ec45.statsTitre')}
          description={t('ec45.statsSous')}
          actif={statsUsage}
          onChangement={toggleStats}
        />

        <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} />

        {/* Export CSV */}
        <Pressable
          onPress={exporterCsv}
          accessibilityRole="button"
          accessibilityLabel={`${t('ec45.exportCsv')}, ${t('ec45.gratuit')}`}
          android_ripple={{ color: colors.action.ripple }}
          style={styles.ligneExport}
        >
          <Icone nom="download" couleur={colors.text.primary} />
          <Text style={[type.bodyLarge, styles.flex, { color: colors.text.primary }]}>
            {t('ec45.exportCsv')}
          </Text>
          <Text style={[type.caption, { color: colors.text.secondary }]}>{t('ec45.gratuit')}</Text>
        </Pressable>

        {/* Export mis en forme (Pass Plus) */}
        <Pressable
          onPress={() => router.push('/pass-plus' as any)}
          accessibilityRole="button"
          accessibilityLabel={`${t('ec45.exportMisEnForme')}, ${t('ec45.passPlus')}`}
          android_ripple={{ color: colors.action.ripple }}
          style={styles.ligneExport}
        >
          <Icone nom="download" couleur={colors.text.primary} />
          <Text style={[type.bodyLarge, styles.flex, { color: colors.text.primary }]}>
            {t('ec45.exportMisEnForme')}
          </Text>
          <Text style={[type.caption, { color: colors.action.primary }]}>{t('ec45.passPlus')}</Text>
        </Pressable>

        <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} />

        {/* Bouton destructif : Supprimer mon compte / Effacer mes données */}
        <View style={styles.sectionSuppression}>
          <BoutonDestructif
            libelle={compte ? t('ec45.supprimer') : t('ec45.effacer')}
            onPress={() => setDialogueVisible(true)}
          />
        </View>
      </ScrollView>

      {/* Dialogue de confirmation */}
      <Modal visible={dialogueVisible} transparent animationType="fade">
        <View style={styles.voileDialogue}>
          <View style={[styles.boiteDialogue, { backgroundColor: colors.bg.canvas }]}>
            <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s2 }]}>
              {t('ec45.dialogueTitre')}
            </Text>
            <Text style={[type.body, { color: colors.text.secondary, marginBottom: space.s4 }]}>
              {t('ec45.dialogueTexte')}
            </Text>
            <View style={styles.actionsDialogue}>
              <BoutonTexte libelle={t('ec43.annuler')} onPress={() => setDialogueVisible(false)} />
              <BoutonDestructif
                libelle={compte ? t('ec45.supprimer') : t('ec45.effacer')}
                onPress={confirmerSuppression}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  contenu: { paddingHorizontal: space.s4, paddingBottom: 48, rowGap: space.s3 },
  ligneEtatSauvegarde: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s3,
    minHeight: 40,
    marginTop: space.s1,
  },
  sectionSansCompte: { rowGap: space.s2, marginTop: space.s1 },
  blocExplication: { rowGap: 4, marginTop: space.s1 },
  separateur: { height: 1, marginVertical: space.s2 },
  ligneExport: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s4,
  },
  flex: { flex: 1 },
  sectionSuppression: { alignItems: 'center', marginVertical: space.s4 },
  voileDialogue: {
    flex: 1,
    backgroundColor: 'rgba(11, 20, 26, 0.40)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: space.s4,
  },
  boiteDialogue: {
    width: '100%',
    maxWidth: 320,
    borderRadius: radius.lg,
    padding: space.s4,
  },
  actionsDialogue: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: space.s3,
  },
});
