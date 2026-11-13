import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonDestructif, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { LigneInterrupteur, Puce } from '@/composants/Choix';
import { Bulle } from '@/composants/Contenu';
import { Icone } from '@/icones/Icone';
import { useRegistre } from '@/registre/store';
import { radius, size, space, type, useTheme } from '@/theme';

interface Habitude {
  id: string;
  texte: string;
}

const HABITUDES_INITIALES: Habitude[] = [
  { id: 'h1', texte: 'En semaine vers 8 h, tu notes souvent Taxi, 500 à 700 FCFA.' },
  { id: 'h2', texte: 'Le midi, tu notes souvent Déjeuner, vers 1 000 FCFA.' },
];

/** EC-43 Ce que l'app a appris : montrer ce que l'app croit savoir, laisser corriger ou effacer. */
export default function Appris() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const apprisStore = useRegistre((r) => r.appris ?? { actif: true, faux: [], oublies: [] });

  const [actif, setActif] = useState(apprisStore.actif);
  const [justes, setJustes] = useState<string[]>(['h2']);
  const [faux, setFaux] = useState<string[]>(apprisStore.faux ?? []);
  const [oublies, setOublies] = useState<string[]>(apprisStore.oublies ?? []);
  const [dialogueVisible, setDialogueVisible] = useState(false);

  const habitudesVisibles = HABITUDES_INITIALES.filter(
    (h) => !faux.includes(h.id) && !oublies.includes(h.id),
  );

  const marquerJuste = (id: string) => {
    setJustes((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const marquerFaux = (id: string) => {
    setFaux((prev) => [...prev, id]);
    useRegistre.getState().modifier({
      appris: { ...apprisStore, faux: [...faux, id] },
    });
    annoncer(t('ec43.retire'), () => {
      setFaux((prev) => prev.filter((x) => x !== id));
    });
  };

  const marquerOublier = (id: string) => {
    setOublies((prev) => [...prev, id]);
    useRegistre.getState().modifier({
      appris: { ...apprisStore, oublies: [...oublies, id] },
    });
    annoncer(t('ec43.retire'), () => {
      setOublies((prev) => prev.filter((x) => x !== id));
    });
  };

  const toggleApprentissage = (val: boolean) => {
    setActif(val);
    useRegistre.getState().modifier({
      appris: { ...apprisStore, actif: val },
    });
  };

  const toutOublier = () => {
    setOublies(HABITUDES_INITIALES.map((h) => h.id));
    setDialogueVisible(false);
    useRegistre.getState().modifier({
      appris: { actif, faux: [], oublies: HABITUDES_INITIALES.map((h) => h.id) },
    });
    annoncer(t('ec43.retire'));
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
          {t('ec43.titre')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        {/* Phrase de réassurance */}
        <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec43.phrase')}</Text>

        {/* Liste des habitudes */}
        {habitudesVisibles.length > 0 ? (
          <View style={styles.listeHabitudes}>
            {habitudesVisibles.map((h) => {
              const estJuste = justes.includes(h.id);
              return (
                <View key={h.id} style={styles.carteHabitude}>
                  <Bulle texte={h.texte} />
                  <View style={styles.rangeeReactions}>
                    <Puce
                      libelle={t('ec43.juste')}
                      choisie={estJuste}
                      onPress={() => marquerJuste(h.id)}
                    />
                    <Puce
                      libelle={t('ec43.faux')}
                      onPress={() => marquerFaux(h.id)}
                    />
                    <Puce
                      libelle={t('ec43.oublier')}
                      onPress={() => marquerOublier(h.id)}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <Text style={[type.body, { color: colors.text.secondary, marginVertical: space.s3 }]}>
            {t('ec43.rien')}
          </Text>
        )}

        <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} />

        {/* Interrupteur Apprendre de mes saisies */}
        <LigneInterrupteur
          titre={t('ec43.apprendre')}
          actif={actif}
          onChangement={toggleApprentissage}
        />

        {/* Tout oublier destructif */}
        {habitudesVisibles.length > 0 && (
          <View style={styles.sectionToutOublier}>
            <BoutonDestructif
              libelle={t('ec43.toutOublier')}
              onPress={() => setDialogueVisible(true)}
            />
          </View>
        )}
      </ScrollView>

      {/* Dialogue confirmation Tout oublier */}
      <Modal visible={dialogueVisible} transparent animationType="fade">
        <View style={styles.voileDialogue}>
          <View style={[styles.boiteDialogue, { backgroundColor: colors.bg.canvas }]}>
            <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s2 }]}>
              {t('ec43.dialogueTitre')}
            </Text>
            <Text style={[type.body, { color: colors.text.secondary, marginBottom: space.s4 }]}>
              {t('ec43.dialogueTexte')}
            </Text>
            <View style={styles.actionsDialogue}>
              <BoutonTexte libelle={t('ec43.annuler')} onPress={() => setDialogueVisible(false)} />
              <BoutonDestructif
                libelle={t('ec43.confirmer')}
                onPress={toutOublier}
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
  listeHabitudes: { rowGap: space.s4, marginTop: space.s2 },
  carteHabitude: { rowGap: space.s2 },
  rangeeReactions: { flexDirection: 'row', gap: space.s2 },
  separateur: { height: 1, marginVertical: space.s3 },
  sectionToutOublier: { alignItems: 'center', marginTop: space.s3 },
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
