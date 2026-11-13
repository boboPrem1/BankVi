import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { CarteChoix, LigneInterrupteur, Puce } from '@/composants/Choix';
import { Icone } from '@/icones/Icone';
import { useParcours } from '@/parcours/store';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

const HEURES_RITUEL = ['19 h', '20 h', '21 h', '22 h'];

/** EC-40 Mon rituel et alertes : choisir quand l'app parle, savoir ce qui reste inclus. */
export default function Rituel() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const parcours = useParcours();
  const registre = useRegistre();

  const [mode, setMode] = useState<'journee' | 'soir'>(
    parcours.preference === 'day' ? 'journee' : 'soir',
  );
  const [heureChoisie, setHeureChoisie] = useState<string>('20 h');
  const [enPause, setEnPause] = useState<boolean>(registre.rituelEnPause ?? false);
  const [alerteDecouvert, setAlerteDecouvert] = useState<boolean>(registre.alertes?.decouvert ?? true);
  const [alertePass, setAlertePass] = useState<boolean>(registre.alertes?.pass ?? true);

  const enregistrer = () => {
    useParcours.getState().modifier({ preference: mode === 'journee' ? 'day' : 'evening' });
    useRegistre.getState().modifier({
      rituelEnPause: enPause,
      alertes: {
        decouvert: alerteDecouvert,
        pass: alertePass,
      },
    });
    annoncer(t('ec40.enregistre'));
    router.back();
  };

  const relancerRituel = () => {
    setEnPause(false);
    useRegistre.getState().modifier({ rituelEnPause: false });
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
          {t('ec40.titre')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        {/* Choix Au fil de la journée vs Le soir */}
        <View style={styles.sectionChoix}>
          <CarteChoix
            titre={t('ec40.auFil')}
            texte=""
            choisi={mode === 'journee'}
            onPress={() => setMode('journee')}
            position={1}
            total={2}
          />
          <CarteChoix
            titre={t('ec40.leSoir')}
            texte=""
            choisi={mode === 'soir'}
            onPress={() => setMode('soir')}
            position={2}
            total={2}
          />
        </View>

        {/* Détails du rituel du soir */}
        {mode === 'soir' && (
          <View style={styles.sectionHeure}>
            <Text style={[type.bodyMedium, { color: colors.text.secondary }]}>{t('ec40.rappelA')}</Text>
            <View style={styles.pucesHeure}>
              {HEURES_RITUEL.map((h) => (
                <Puce
                  key={h}
                  libelle={h}
                  choisie={heureChoisie === h}
                  onPress={() => setHeureChoisie(h)}
                />
              ))}
              <Puce
                libelle={t('ec40.autre')}
                choisie={!HEURES_RITUEL.includes(heureChoisie)}
                onPress={() => setHeureChoisie('20 h')}
              />
            </View>

            {/* État actif / pause */}
            <View style={styles.ligneEtatRituel}>
              <Text style={[type.body, { color: colors.text.secondary }]}>
                {enPause ? t('ec40.rituelPause') : t('ec40.rituelActif')}
              </Text>
              {enPause && <BoutonTexte libelle={t('ec40.relancer')} onPress={relancerRituel} />}
            </View>
          </View>
        )}

        <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} />

        {/* Section Alertes */}
        <View style={styles.sectionAlertes}>
          <Text style={[type.subtitle, { color: colors.text.secondary }]}>{t('ec40.alertes')}</Text>

          <LigneInterrupteur
            titre={t('ec40.decouvert')}
            description={t('ec40.toujoursGratuite')}
            actif={alerteDecouvert}
            onChangement={setAlerteDecouvert}
          />

          <LigneInterrupteur
            titre={t('ec40.finPass')}
            actif={alertePass}
            onChangement={setAlertePass}
          />

          <Text style={[type.caption, { color: colors.text.secondary, marginTop: space.s2 }]}>
            {t('ec40.aucuneNuit')}
          </Text>
        </View>
      </ScrollView>

      {/* Bouton principal Enregistrer */}
      <View style={[styles.pied, { paddingBottom: insets.bottom + space.s3 }]}>
        <BoutonPrincipal libelle={t('ec40.enregistrer')} onPress={enregistrer} />
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
  sectionChoix: { rowGap: space.s3 },
  sectionHeure: { rowGap: space.s2 },
  pucesHeure: { flexDirection: 'row', flexWrap: 'wrap', gap: space.s2, marginTop: space.s1 },
  ligneEtatRituel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: space.s2,
  },
  separateur: { height: 1, marginVertical: space.s2 },
  sectionAlertes: { rowGap: space.s2 },
  pied: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: space.s4,
    paddingTop: space.s2,
  },
});
