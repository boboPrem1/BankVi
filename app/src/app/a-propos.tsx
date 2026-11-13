import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Bulle } from '@/composants/Contenu';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { Icone } from '@/icones/Icone';
import { size, space, type, useTheme } from '@/theme';

const TEXTES_LEGAUX: Record<string, { titre: string; texte: string }> = {
  mentions: {
    titre: 'Mentions légales',
    texte:
      'BankVi est une application éditée par BankVi SARL, Lomé, Togo.\n\nRCCM : TG-LFW-01-2026-B12-00000\nCapital social : 1 000 000 FCFA\nSiège : Boulevard du 13 Janvier, Lomé\nContact : contact@bankvi.tg',
  },
  confidentialite: {
    titre: 'Confidentialité',
    texte:
      'BankVi respecte la vie privée de ses utilisateurs.\n\nVos données financières restent sur votre téléphone. Aucune donnée n’est vendue à des tiers. Les habitudes d’utilisation ne sont jamais transmises à nos serveurs.\n\nRécépissé IPDCP Togo n° 2026-042/IPDCP.',
  },
  conditions: {
    titre: 'Conditions d’utilisation',
    texte:
      'L’application BankVi est un outil personnel d’aide à la décision budgétaire. Elle ne constitue en aucun cas un service bancaire, un conseil en investissement ou une prestation de tenue de comptabilité agréée.',
  },
  licences: {
    titre: 'Licences',
    texte:
      'Composants tiers et licences :\n- React Native, licence MIT\n- Expo, licence MIT\n- Material Symbols Rounded, licence Apache 2.0\n- Police Roboto, licence Apache 2.0\n- KaTeX, licence MIT',
  },
};

interface LigneProposProps {
  titre: string;
  onPress: () => void;
}

function LignePropos({ titre, onPress }: LigneProposProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={titre}
      android_ripple={{ color: colors.action.ripple }}
      style={styles.ligne}
    >
      <Text style={[type.bodyLarge, styles.flex, { color: colors.text.primary }]}>{titre}</Text>
      <Icone nom="chevron_right" couleur={colors.text.secondary} />
    </Pressable>
  );
}

/** EC-46 À propos : dire qui édite l'app, ce qu'elle n'est pas et comment contacter. */
export default function APropos() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [pageOuverte, setPageOuverte] = useState<keyof typeof TEXTES_LEGAUX | null>(null);

  const ouvrirContact = () => {
    void Linking.openURL('mailto:contact@bankvi.tg');
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
          {t('ec46.titre')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        {/* Marque et version */}
        <View style={styles.entete}>
          <Text style={[type.title, { color: colors.action.primary }]}>{t('ec46.marque')}</Text>
          <Text style={[type.caption, { color: colors.text.secondary }]}>{t('ec46.versionTest')}</Text>
        </View>

        {/* Bulle d'avertissement */}
        <Bulle texte={t('ec46.bulle')} />

        <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} />

        {/* Lignes de navigation */}
        <View style={styles.liste}>
          <LignePropos titre={t('ec46.mentionsLegales')} onPress={() => setPageOuverte('mentions')} />
          <LignePropos
            titre={t('ec46.confidentialite')}
            onPress={() => setPageOuverte('confidentialite')}
          />
          <LignePropos titre={t('ec46.conditions')} onPress={() => setPageOuverte('conditions')} />
          <LignePropos titre={t('ec46.licences')} onPress={() => setPageOuverte('licences')} />
          <LignePropos titre={t('ec46.contact')} onPress={ouvrirContact} />
        </View>
      </ScrollView>

      {/* Feuille de lecture du document légal */}
      <FeuilleBasse visible={pageOuverte !== null} onFermer={() => setPageOuverte(null)}>
        {pageOuverte && (
          <View style={styles.feuilleDoc}>
            <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s3 }]}>
              {TEXTES_LEGAUX[pageOuverte].titre}
            </Text>
            <ScrollView style={styles.scrollDoc} showsVerticalScrollIndicator={false}>
              <Text style={[type.body, { color: colors.text.secondary, lineHeight: 22 }]}>
                {TEXTES_LEGAUX[pageOuverte].texte}
              </Text>
            </ScrollView>
          </View>
        )}
      </FeuilleBasse>
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
  contenu: { paddingHorizontal: space.s4, paddingBottom: 48, rowGap: space.s4 },
  entete: { rowGap: 2, marginTop: space.s1 },
  separateur: { height: 1, marginVertical: space.s2 },
  liste: { rowGap: 0 },
  ligne: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space.s2,
  },
  flex: { flex: 1 },
  feuilleDoc: { padding: space.s4, maxHeight: 420 },
  scrollDoc: { maxHeight: 340 },
});

