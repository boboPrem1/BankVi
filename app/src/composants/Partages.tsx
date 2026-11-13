import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonDestructif, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { Icone } from '@/icones/Icone';
import { cleSuggestion, estCategorieSensible, estLibelleSensible } from '@/registre/partages';
import { useRegistre } from '@/registre/store';
import { radius, space, type, useTheme } from '@/theme';

export { cleSuggestion, estCategorieSensible, estLibelleSensible };

export interface SuggestionInfo {
  cle: string;
  libelle: string;
  occurrences?: number;
  jours?: number;
  heure?: string;
}

interface PourquoiProps {
  visible: boolean;
  suggestion: SuggestionInfo | null;
  onFermer: () => void;
}

/** EC-47 Pourquoi cette suggestion ? : transparence sur le calcul local et option de masquage. */
export function FeuillePourquoiSuggestion({ visible, suggestion, onFermer }: PourquoiProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const masquer = () => {
    if (!suggestion) return;
    const cle = suggestion.cle;
    const actuel = useRegistre.getState().suggestionsMasquees;
    if (!actuel.includes(cle)) {
      useRegistre.getState().modifier({ suggestionsMasquees: [...actuel, cle] });
    }
    onFermer();
    annoncer(t('ec47.masquee'), () => {
      const courantes = useRegistre.getState().suggestionsMasquees;
      useRegistre.getState().modifier({ suggestionsMasquees: courantes.filter((c) => c !== cle) });
    });
  };

  const voirAppris = () => {
    onFermer();
    router.push('/appris' as any);
  };

  return (
    <FeuilleBasse visible={visible} titre={t('ec47.titre')} onFermer={onFermer}>
      <View style={styles.contenu}>
        <Text style={[type.bodyLarge, { color: colors.text.primary }]}>
          {t('ec47.explication', {
            occurrences: suggestion?.occurrences ?? 9,
            jours: suggestion?.jours ?? 12,
            heure: suggestion?.heure ?? '8 h',
          })}
        </Text>
        <Text style={[type.bodyMedium, { color: colors.text.secondary }]}>{t('ec47.precision')}</Text>
        <View style={styles.actions}>
          <BoutonDestructif libelle={t('ec47.nePlusProposer')} onPress={masquer} />
          <BoutonTexte libelle={t('ec47.voirAppris')} onPress={voirAppris} />
        </View>
      </View>
    </FeuilleBasse>
  );
}

interface SensibleProps {
  visible: boolean;
  cle: string;
  libelle: string;
  onConfirmer: () => void;
  onAutreCategorie: () => void;
  onFermer: () => void;
}

/** EC-48 Libellé sensible : consentement explicite avant d'utiliser une catégorie ou un libellé sensible. */
export function FeuilleLibelleSensible({ visible, cle, libelle, onConfirmer, onAutreCategorie, onFermer }: SensibleProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [coche, setCoche] = useState(false);

  useEffect(() => {
    if (visible) setCoche(false);
  }, [visible, cle]);

  const confirmer = () => {
    if (!coche) return;
    const actuel = useRegistre.getState().libellesSensiblesConsenties;
    if (!actuel.includes(cle)) {
      useRegistre.getState().modifier({ libellesSensiblesConsenties: [...actuel, cle] });
    }
    onConfirmer();
  };

  return (
    <FeuilleBasse visible={visible} titre={t('ec48.titre')} onFermer={onFermer}>
      <View style={styles.contenu}>
        <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{t('ec48.explication', { libelle })}</Text>
        <Pressable
          onPress={() => setCoche((v) => !v)}
          hitSlop={8}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: coche }}
          accessibilityLabel={t('ec48.caseCocher')}
          style={styles.caseLigne}
        >
          <View
            style={[
              styles.caseBoite,
              {
                borderColor: coche ? colors.action.primary : colors.text.secondary,
                backgroundColor: coche ? colors.action.primary : 'transparent',
              },
            ]}
          >
            {coche ? <Icone nom="check" couleur={colors.text.onAction} taille={16} /> : null}
          </View>
          <Text style={[type.bodyLarge, styles.caseTexte, { color: colors.text.primary }]}>{t('ec48.caseCocher')}</Text>
        </Pressable>
        <View style={styles.actions}>
          <BoutonPrincipal libelle={t('ec48.utiliser')} desactive={!coche} onPress={confirmer} />
          <BoutonTexte libelle={t('ec48.autreCategorie')} onPress={onAutreCategorie} />
        </View>
      </View>
    </FeuilleBasse>
  );
}

const styles = StyleSheet.create({
  contenu: { rowGap: space.s4, paddingBottom: space.s4 },
  actions: { rowGap: space.s2, marginTop: space.s2 },
  caseLigne: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s3,
    minHeight: 48,
  },
  caseBoite: {
    width: 20,
    height: 20,
    borderRadius: radius.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caseTexte: { flex: 1 },
});
