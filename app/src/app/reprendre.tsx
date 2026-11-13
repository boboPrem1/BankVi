import { horizon } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBarreEtatClaire } from '@/composants/BarreEtatClaire';
import { BoutonDestructif, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { Paysage } from '@/composants/Paysage';
import { useEtat } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { artwork, space, type, useTheme } from '@/theme';

const BLANC = artwork.text;

/** EC-49 Reprendre : reprise calme après une absence, en comptant sa poche ou en repartant de zéro. */
export default function Reprendre() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const etat = useEtat();
  const [confirmation, setConfirmation] = useState(false);
  useBarreEtatClaire();

  const soldes = useMemo(() => {
    const pts = horizon(etat, 30).points;
    return pts.length > 1 ? pts.map((p) => p.solde) : [1000, 1200, 1100, 1300];
  }, [etat]);

  const confirmerZero = () => {
    useRegistre.getState().repartirDeZero();
    setConfirmation(false);
    router.replace('/mon-argent');
  };

  return (
    <View style={styles.ecran}>
      <Paysage largeur={width} hauteur={height} cadre="plein" soldes={soldes} progression={0.5} etat="suit" graine={20261113} />
      <View style={[styles.contenu, { paddingTop: insets.top + space.s7, paddingBottom: Math.max(insets.bottom, space.s5) }]}>
        <View style={styles.corps}>
          <Text style={[type.title, styles.titre]} accessibilityRole="header">
            {t('ec49.titre')}
          </Text>
          <Text style={[type.bodyLarge, styles.texte]}>{t('ec49.texte')}</Text>
        </View>
        <View style={styles.pied}>
          <BoutonPrincipal libelle={t('ec49.compter')} onPress={() => router.push('/bilan/compter')} />
          <Pressable
            onPress={() => setConfirmation(true)}
            hitSlop={8}
            accessibilityRole="button"
            style={styles.boutonTexte}
          >
            <Text style={[type.bodyMedium, styles.texteBouton]}>{t('ec49.repartir')}</Text>
          </Pressable>
        </View>
      </View>

      <FeuilleBasse visible={confirmation} titre={t('ec49.dialogueTitre')} onFermer={() => setConfirmation(false)}>
        <View style={styles.dialogue}>
          <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{t('ec49.dialogueTexte')}</Text>
          <View style={styles.dialogueActions}>
            <BoutonDestructif libelle={t('ec49.dialogueConfirmer')} onPress={confirmerZero} />
            <BoutonTexte libelle={t('commun.annuler')} onPress={() => setConfirmation(false)} />
          </View>
        </View>
      </FeuilleBasse>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  contenu: {
    ...StyleSheet.absoluteFill,
    paddingHorizontal: space.s6,
    justifyContent: 'space-between',
  },
  corps: {
    marginTop: space.s7,
    rowGap: space.s3,
  },
  titre: { color: BLANC },
  texte: { color: BLANC },
  pied: { rowGap: space.s3 },
  boutonTexte: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texteBouton: { color: BLANC },
  dialogue: { rowGap: space.s4, paddingBottom: space.s4 },
  dialogueActions: { rowGap: space.s2 },
});
