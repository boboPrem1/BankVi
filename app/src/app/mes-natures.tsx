import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonContour, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { Icone } from '@/icones/Icone';
import { CATEGORIES, NATURES, type Categorie } from '@/registre/categories';
import { useRegistre } from '@/registre/store';
import { radius, size, space, type, useTheme } from '@/theme';

const AUTRES_NATURES = [
  'Épargne',
  'Dette',
  'Investissement',
  'Projet',
  'Solidarité et dons',
  'Éducation',
  'Impôt ou provision',
  'Imprévu',
  'Tontine',
  'Soutien familial',
];

/** EC-44 Mes natures : classer ses catégories en un jeu rapide. */
export default function MesNatures() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const classees = useRegistre((r) => r.naturesClassees ?? {});

  // Catégories de dépenses non sensibles
  const categoriesDisponibles = useMemo(
    () => CATEGORIES.filter((c) => c.sens === 'depense' && !c.sensible),
    [],
  );

  const [indexCourant, setIndexCourant] = useState(0);
  const [fileAttente, setFileAttente] = useState<Categorie[]>(categoriesDisponibles);
  const [feuilleAutre, setFeuilleAutre] = useState(false);

  // Catégorie en cours
  const nonClassees = fileAttente.filter((c) => !classees[c.id]);
  const categorieActive = nonClassees[indexCourant] ?? nonClassees[0];

  const total = fileAttente.length;
  const compteClassees = Object.keys(classees).length;
  const fini = nonClassees.length === 0;

  const classer = (nature: string) => {
    if (!categorieActive) return;
    const catId = categorieActive.id;
    useRegistre.getState().modifier({
      naturesClassees: { ...classees, [catId]: nature },
    });
    annoncer(t('ec44.classe', { nature }));
    if (indexCourant >= nonClassees.length - 1) {
      setIndexCourant(0);
    }
  };

  const passer = () => {
    if (nonClassees.length <= 1) return;
    setIndexCourant((prev) => (prev + 1) % nonClassees.length);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 20,
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dx > 60) {
            // Glissement à droite -> Besoin
            classer('Besoin');
          } else if (gesture.dx < -60) {
            // Glissement à gauche -> Envie
            classer('Envie');
          }
        },
      }),
    [categorieActive, classees, nonClassees],
  );

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
        <Text style={[type.appbar, { color: colors.text.primary, flex: 1 }]} accessibilityRole="header">
          {t('ec44.titre')}
        </Text>
        {!fini && (
          <Text style={[type.caption, styles.tabulaire, { color: colors.text.secondary }]}>
            {t('ec44.compteur', { actuel: compteClassees + 1, total })}
          </Text>
        )}
      </View>

      <View style={styles.contenu}>
        {fini ? (
          /* Toutes classées */
          <View style={styles.etatFini}>
            <Icone nom="check_circle" couleur={colors.action.primary} taille={56} />
            <Text style={[type.title, { color: colors.text.primary, textAlign: 'center' }]}>
              {t('ec44.toutClasse')}
            </Text>
            <View style={styles.boutonFermer}>
              <BoutonPrincipal libelle={t('ec44.fermer')} onPress={() => router.back()} />
            </View>
          </View>
        ) : categorieActive ? (
          /* Carte centrale à classer */
          <View style={styles.centre}>
            <View
              {...panResponder.panHandlers}
              style={[
                styles.carte,
                {
                  backgroundColor: colors.bg.elevated,
                  borderColor: colors.border.subtle,
                },
              ]}
            >
              <View style={[styles.avatarGrand, { backgroundColor: colors.bg.subtle }]}>
                <Icone nom={categorieActive.icone} taille={32} couleur={colors.text.secondary} />
              </View>
              <Text style={[type.hero, { color: colors.text.primary }]}>
                {categorieActive.nom}
              </Text>
              <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec44.question')}</Text>
            </View>

            {/* Deux boutons Envie / Besoin */}
            <View style={styles.rangeeBoutons}>
              <View style={styles.flex}>
                <BoutonContour libelle={t('ec44.envie')} onPress={() => classer('Envie')} />
              </View>
              <View style={styles.flex}>
                <BoutonContour libelle={t('ec44.besoin')} onPress={() => classer('Besoin')} />
              </View>
            </View>

            {/* Boutons texte Autre nature / Passer */}
            <BoutonTexte libelle={t('ec44.autre')} onPress={() => setFeuilleAutre(true)} />
            <BoutonTexte libelle={t('ec44.passer')} onPress={passer} />
          </View>
        ) : (
          <Text style={[type.body, { color: colors.text.secondary, textAlign: 'center', marginTop: 40 }]}>
            {t('ec44.rien')}
          </Text>
        )}
      </View>

      {/* Feuille Autre nature */}
      <FeuilleBasse visible={feuilleAutre} onFermer={() => setFeuilleAutre(false)}>
        <View style={styles.feuilleContenu}>
          <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s3 }]}>
            {t('ec44.feuilleTitre')}
          </Text>
          <View style={styles.listeAutresNatures}>
            {AUTRES_NATURES.map((nat) => (
              <Pressable
                key={nat}
                onPress={() => {
                  setFeuilleAutre(false);
                  classer(nat);
                }}
                accessibilityRole="button"
                accessibilityLabel={nat}
                android_ripple={{ color: colors.action.ripple }}
                style={styles.ligneAutreNature}
              >
                <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{nat}</Text>
              </Pressable>
            ))}
          </View>
        </View>
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
  tabulaire: { fontVariant: ['tabular-nums'] },
  contenu: { flex: 1, paddingHorizontal: space.s4, justifyContent: 'center' },
  centre: { alignItems: 'center', rowGap: space.s3 },
  carte: {
    width: 280,
    height: 240,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: space.s3,
    padding: space.s4,
    elevation: 2,
    shadowColor: '#0B141A',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  avatarGrand: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangeeBoutons: {
    flexDirection: 'row',
    columnGap: space.s3,
    width: 280,
    marginTop: space.s2,
  },
  flex: { flex: 1 },
  etatFini: { alignItems: 'center', rowGap: space.s4, paddingHorizontal: space.s4 },
  boutonFermer: { width: '100%', maxWidth: 280, marginTop: space.s2 },
  feuilleContenu: { padding: space.s4 },
  listeAutresNatures: { rowGap: space.s1 },
  ligneAutreNature: { paddingVertical: space.s3 },
});
