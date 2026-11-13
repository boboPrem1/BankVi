import { calculer, horizon, statutDuJour, type Mouvement } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { Extrapolation, FadeIn, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { useBarreEtatClaire } from '@/composants/BarreEtatClaire';
import { useBasDEcran } from '@/composants/BasDEcran';
import { BoutonContour, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { BulleSaisie } from '@/composants/Conversation';
import { FeuilleCategorie } from '@/composants/Feuilles';
import { Paysage } from '@/composants/Paysage';
import { dateLongueJour, heure, jourDansPhrase } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI, useParcours } from '@/parcours/store';
import { defaireRemplacement, remplacer } from '@/registre/actions';
import { decaler, heureDe, libelle, maintenant, saisies, useEtat } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { artwork, radius, size, space, type, useTheme } from '@/theme';

/** Le chiffre héros suit la taille du texte, plafonné à 64 sp. */
const HERO_MAX = 64 / 48;
const BLANC = artwork.text;

/** EC-12 Accueil : combien puis-je dépenser aujourd'hui, sans aucun tap. Puis noter. */
export default function Accueil() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const parcours = useParcours();
  const registre = useRegistre();
  const etat = useEtat();
  const [corriger, setCorriger] = useState<{ id: string; sens: 'depense' | 'revenu'; categorie?: string } | null>(null);
  useBarreEtatClaire();
  // Barre d'action (64 dp) au-dessus des onglets (64 dp).
  useBasDEcran(64 + size.bottomNav);

  const { calcul, statut, points, demain } = useMemo(() => {
    const c = calculer(etat);
    return {
      calcul: c,
      statut: statutDuJour(etat),
      points: horizon(etat, 60).points,
      demain: calculer({ ...etat, aujourdhui: decaler(AUJOURDHUI, 1) }),
    };
  }, [etat]);

  // Après le bilan, jusqu'à minuit : le héros montre le chiffre de demain.
  const bilanFait = registre.bilan?.termine === true && registre.bilan.date === AUJOURDHUI;
  const hero = bilanFait ? demain : calcul;
  const jour = jourDansPhrase(hero.reference, AUJOURDHUI);

  const prochaineCharge = points.flatMap((p) => p.mouvements).find((m) => m.montant < 0 && m.date > AUJOURDHUI);
  const prochainRevenu = points.flatMap((p) => p.mouvements).find((m) => m.montant > 0 && m.date >= AUJOURDHUI);
  const variable = parcours.typeRevenu === 'variable';

  const poches = etat.poches.map((p) => ({ ...p, solde: calcul.soldes[p.id] ?? 0 }));
  const duJour = saisies(registre.ecritures).filter((e) => e.at.startsWith(AUJOURDHUI));
  const aConfirmer: Mouvement | undefined = calcul.enAttente[0];

  const { h, m } = heureDe(maintenant());
  const soir = parcours.preference === 'evening' && !bilanFait && h * 60 + m >= parcours.heure.h * 60 + parcours.heure.m;
  const carteSauvegarde = !parcours.compte && !registre.carteSauvegardeFermee && duJour.some((e) => registre.meta[e.id]);

  const hauteurHeros = height < 600 ? 220 : height < 700 ? 240 : 280;
  const courseRepli = Math.max(1, hauteurHeros - size.homeHeroCollapsed);
  const defilement = useSharedValue(0);
  const surDefilement = useAnimatedScrollHandler({
    onScroll: (e) => {
      defilement.value = e.contentOffset.y;
    },
  });
  const styleHeros = useAnimatedStyle(() => ({
    height: interpolate(defilement.value, [0, courseRepli], [hauteurHeros + insets.top, size.homeHeroCollapsed + insets.top], Extrapolation.CLAMP),
  }));
  const styleSecondaire = useAnimatedStyle(() => ({
    opacity: interpolate(defilement.value, [0, courseRepli * 0.55], [1, 0], Extrapolation.CLAMP),
  }));
  const styleChiffre = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(defilement.value, [0, courseRepli], [0, -22], Extrapolation.CLAMP) },
      { scale: interpolate(defilement.value, [0, courseRepli], [1, 0.72], Extrapolation.CLAMP) },
    ],
  }));
  const masque = registre.masquerMontants;
  const largeurPoche = (width - 2 * size.gutterList - space.s2) / 2;

  const confirmer = () => {
    if (!aConfirmer) return;
    const sens = aConfirmer.montant > 0 ? 'revenu' : 'depense';
    const [id] = registre.ecrire([
      {
        ecriture: {
          at: maintenant(),
          type: sens,
          poche: 'especes',
          montant: Math.abs(aConfirmer.montant),
          categorie: sens === 'revenu' ? 'salaire' : 'loyer',
          prevu: { id: aConfirmer.id, date: aConfirmer.date },
        },
        meta: { origine: 'toi', description: aConfirmer.nom },
      },
    ]);
    annoncer(t('ec12.confirme', { nom: aConfirmer.nom }), () => id && useRegistre.getState().annuler([id]));
  };

  const ouvrirStatut = () => {
    registre.modifier({ statutVu: true });
    router.push('/statut');
  };

  return (
    <View style={[styles.ecran, { backgroundColor: colors.bg.canvas }]}>
      <Animated.ScrollView
        onScroll={surDefilement}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: hauteurHeros + insets.top, paddingBottom: space.s4 }}
      >
        <View style={styles.corps}>
          <TitreZone texte={t('ec12.aVenir')} />
          <View style={styles.rangee}>
            {prochaineCharge ? (
              <BlocAVenir
                nom={prochaineCharge.nom}
                date={t('ec12.leJour', { jour: jourDansPhrase(prochaineCharge.date, AUJOURDHUI) })}
                montant={masque ? '•••• FCFA' : fcfa(prochaineCharge.montant)}
              />
            ) : null}
            {variable ? (
              <BlocAVenir
                nom={t('ec12.finDuMois')}
                date=""
                montant={masque ? '•••• FCFA' : t('ec12.auMoins', { montant: fcfa(parcours.montantRevenu ?? 0) })}
              />
            ) : prochainRevenu ? (
              <BlocAVenir
                nom={prochainRevenu.nom}
                date={t('ec12.leJour', { jour: jourDansPhrase(prochainRevenu.date, AUJOURDHUI) })}
                montant={masque ? '•••• FCFA' : `+${fcfa(prochainRevenu.montant)}`}
              />
            ) : null}
          </View>

          <TitreZone texte={t('ec12.poches')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.poches} style={styles.horsMarge}>
            {poches.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => router.push({ pathname: '/transfert', params: { de: p.id } })}
                accessibilityRole="button"
                accessibilityLabel={masque ? `${p.nom}, ${t('ec12.montantsMasques')}` : `${p.nom}, ${p.solde} francs CFA`}
                android_ripple={{ color: colors.action.ripple }}
                style={[styles.poche, { width: largeurPoche, borderColor: colors.border.control }]}
              >
                <Text style={[type.caption, { color: colors.text.secondary }]}>{p.genre === 'activite' ? t('ec12.activite') : p.nom}</Text>
                <Text style={[type.bodyStrong, styles.tabulaire, { color: colors.text.primary }]}>{masque ? '•••• FCFA' : fcfa(p.solde)}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {carteSauvegarde ? (
            <View style={[styles.carte, { borderColor: colors.border.subtle, backgroundColor: colors.bg.elevated }]}>
              <Text style={[type.bodyStrong, { color: colors.text.primary }]}>{t('ec12.carteSauvegarde')}</Text>
              <View style={styles.boutonsCarte}>
                <BoutonTexte libelle={t('commun.plusTard')} onPress={() => registre.modifier({ carteSauvegardeFermee: true })} />
                <BoutonTexte libelle={t('ec12.sauvegarder')} onPress={() => router.push('/sauvegarde')} />
              </View>
            </View>
          ) : null}

          <View style={styles.enteteNote}>
            <Text style={[type.captionMedium, { color: colors.text.secondary }]} accessibilityRole="header">
              {t('ec12.note')}
            </Text>
            <BoutonTexte libelle={t('ec12.toutVoir')} onPress={() => router.push('/historique')} />
          </View>
          {duJour.length === 0 ? (
            <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec12.rien')}</Text>
          ) : (
            <View style={styles.bulles}>
              {duJour.slice(0, 3).map((e) => {
                const lib = libelle(e, registre.meta[e.id]);
                const { h: hh, m: mm } = heureDe(e.at);
                const valeurs = { libelle: lib, montant: fcfa(e.montant), heure: heure(hh, mm) };
                return (
                  <Animated.View key={e.id} entering={FadeIn.duration(200)}>
                    <BulleSaisie
                      sens={e.type}
                      texte={t(e.type === 'revenu' ? 'saisie.bulleRevenu' : 'saisie.bulle', valeurs)}
                      lecture={t(e.type === 'revenu' ? 'saisie.lectureRevenu' : 'saisie.lectureDepense', { ...valeurs, montant: e.montant })}
                      actionLongue={t('saisie.changerCategorie')}
                      onPress={() => router.push({ pathname: '/saisie/[id]', params: { id: e.id } })}
                      onLongPress={() => setCorriger({ id: e.id, sens: e.type, ...(e.categorie ? { categorie: e.categorie } : {}) })}
                    />
                  </Animated.View>
                );
              })}
            </View>
          )}
        </View>
      </Animated.ScrollView>

      {/* Héros plein bord repliable au défilement (280 → 120 dp), barre d'état comprise. Texte toujours blanc : > 5:1 sur chaque ciel. */}
      <Animated.View style={[styles.herosFixe, styleHeros]}>
        <View style={StyleSheet.absoluteFill}>
          <Paysage
            largeur={width}
            hauteur={hauteurHeros + insets.top}
            cadre="accueil"
            soldes={points.slice(0, 31).map((p) => p.solde)}
            progression={statut.soleil.ecoules / statut.soleil.total}
            etat={statut.etat}
            graine={Number(AUJOURDHUI.replaceAll('-', ''))}
          />
        </View>
        <View style={[styles.contenuHeros, { paddingTop: insets.top + space.s2 }]}>
          <View style={styles.ligneHaut}>
            <Pressable
              onPress={ouvrirStatut}
              accessibilityRole="button"
              accessibilityLabel={registre.statutVu ? t('ec12.anneauVu') : t('ec12.anneauAVoir')}
              style={styles.zoneAnneau}
            >
              <View style={[styles.anneau, { borderColor: registre.statutVu ? 'rgba(255,255,255,0.45)' : BLANC }]}>
                <View style={styles.miniature}>
                  <Paysage
                    largeur={36}
                    hauteur={36}
                    cadre="miniature"
                    soldes={points.slice(0, 31).map((p) => p.solde)}
                    progression={statut.soleil.ecoules / statut.soleil.total}
                    etat={statut.etat}
                    graine={0}
                  />
                </View>
              </View>
            </Pressable>
            <Text style={[type.bodyMedium, styles.dateHaut, { color: BLANC }]}>{dateLongueJour(AUJOURDHUI)}</Text>
            <Pressable
              onPress={() => registre.modifier({ masquerMontants: !masque })}
              accessibilityRole="button"
              accessibilityLabel={masque ? t('ec12.afficherMontants') : t('ec12.masquerMontants')}
              style={styles.zoneAnneau}
            >
              <Icone nom={masque ? 'visibility_off' : 'visibility'} couleur={BLANC} />
            </Pressable>
          </View>
          <Pressable
            onPress={() => router.push('/origine')}
            accessible
            accessibilityRole="header"
            accessibilityLabel={
              masque
                ? t('ec12.montantsMasques')
                : hero.manque !== undefined
                  ? t('chiffreDuJour.lectureManque', { montant: hero.manque, jour })
                  : `${bilanFait ? t('ec12.demain') : t('chiffreDuJour.amorce')} ${hero.chiffre} francs CFA ${t('chiffreDuJour.echeance', { jour })}.`
            }
            style={styles.chiffre}
          >
            <Animated.View key={`${statut.etat}-${bilanFait}`} entering={FadeIn.duration(300)} style={styleChiffre}>
              {hero.manque !== undefined ? (
                <>
                  <Animated.View style={[styles.ligne, styleSecondaire]}>
                    <Icone nom="warning" couleur={BLANC} />
                    <Text style={[type.bodyLarge, { color: BLANC }]}>{t('chiffreDuJour.manqueAmorce')}</Text>
                  </Animated.View>
                  <View style={styles.ligneChiffre}>
                    <Text style={[type.hero, { color: BLANC }]} maxFontSizeMultiplier={HERO_MAX}>{masque ? '••••' : nombre(hero.manque)}</Text>
                    <Text style={[type.subtitle, { color: BLANC }]}>{t('commun.fcfa')}</Text>
                  </View>
                  <Animated.Text style={[type.bodyLarge, styleSecondaire, { color: BLANC }]}>{t('chiffreDuJour.manqueSuite', { jour })}</Animated.Text>
                </>
              ) : (
                <>
                  <Animated.Text style={[type.bodyLarge, styleSecondaire, { color: BLANC }]}>
                    {bilanFait ? t('ec12.demain') : t('chiffreDuJour.amorce')}
                  </Animated.Text>
                  <View style={styles.ligneChiffre}>
                    <Text style={[type.hero, { color: BLANC }]} maxFontSizeMultiplier={HERO_MAX}>{masque ? '••••' : nombre(hero.chiffre)}</Text>
                    <Text style={[type.subtitle, { color: BLANC }]}>{t('commun.fcfa')}</Text>
                  </View>
                  <Animated.Text style={[type.bodyLarge, styleSecondaire, { color: BLANC }]}>{t('chiffreDuJour.echeance', { jour })}</Animated.Text>
                </>
              )}
            </Animated.View>
          </Pressable>
        </View>
      </Animated.View>

      {/* Sous la barre d'état, la couleur du haut du ciel garde l'heure et les icônes lisibles. */}
      <View style={[styles.sousBarreEtat, { height: insets.top, backgroundColor: artwork.skies[statut.etat][0] }]} pointerEvents="none" />

      {/* Barre d'action fixe, au-dessus des onglets : elle ne recouvre jamais le contenu. */}
      <View style={[styles.barreAction, { backgroundColor: colors.bg.canvas, borderTopColor: colors.border.subtle }]}>
        {aConfirmer && !soir ? (
          <BoutonPrincipal
            libelle={aConfirmer.montant > 0 ? t('ec12.confirmerSalaire') : t('ec12.confirmer', { nom: aConfirmer.nom })}
            onPress={confirmer}
          />
        ) : soir ? (
          <View style={styles.deuxBoutons}>
            <View style={styles.quarante}>
              <BoutonContour libelle={t('ec12.noter')} icone="add" onPress={() => router.push('/noter')} />
            </View>
            <View style={styles.soixante}>
              <BoutonPrincipal libelle={t('ec12.bilan')} onPress={() => router.push('/bilan/compter')} />
            </View>
          </View>
        ) : (
          <BoutonPrincipal libelle={t('ec12.noterDepense')} icone="add" onPress={() => router.push('/noter')} />
        )}
      </View>

      <FeuilleCategorie
        visible={corriger !== null}
        sens={corriger?.sens ?? 'depense'}
        actuelle={corriger?.categorie}
        onFermer={() => setCorriger(null)}
        onChoix={(id) => {
          if (!corriger) return;
          const ancienne = corriger.id;
          const nouvelle = remplacer(ancienne, { categorie: id });
          setCorriger(null);
          if (nouvelle) annoncer(t('saisie.corrigee'), () => defaireRemplacement(ancienne, nouvelle));
        }}
      />
    </View>
  );
}

function TitreZone({ texte }: { texte: string }) {
  const { colors } = useTheme();
  return (
    <Text style={[type.captionMedium, styles.titreZone, { color: colors.text.secondary }]} accessibilityRole="header">
      {texte}
    </Text>
  );
}

function BlocAVenir({ nom, date, montant }: { nom: string; date: string; montant: string }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => router.navigate('/horizon')}
      accessibilityRole="button"
      accessibilityLabel={`${nom}, ${date}, ${montant}`}
      android_ripple={{ color: colors.action.ripple }}
      style={[styles.bloc, { backgroundColor: colors.bg.subtle, borderColor: colors.border.control }]}
    >
      <Text style={[type.bodyMedium, { color: colors.text.primary }]} numberOfLines={1}>
        {nom}
      </Text>
      <View style={styles.ligneBloc}>
        {date ? <Text style={[type.caption, { color: colors.text.secondary }]}>{date}</Text> : null}
        <Text style={[type.body, styles.tabulaire, { color: colors.text.primary }]}>{montant}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  herosFixe: { position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden' },
  sousBarreEtat: { position: 'absolute', top: 0, left: 0, right: 0 },
  contenuHeros: { paddingHorizontal: size.gutterList },
  ligneHaut: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2, marginLeft: -4 },
  dateHaut: { flex: 1 },
  zoneAnneau: { width: size.touchMin, height: size.touchMin, alignItems: 'center', justifyContent: 'center' },
  anneau: { width: 44, height: 44, borderRadius: 22, borderWidth: 2.5, alignItems: 'center', justifyContent: 'center' },
  miniature: { width: 36, height: 36, borderRadius: 18, overflow: 'hidden' },
  chiffre: { marginTop: space.s3, alignSelf: 'flex-start' },
  ligne: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  ligneChiffre: { flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', columnGap: space.s2 },
  corps: { paddingHorizontal: size.gutterList, paddingTop: space.s4 },
  titreZone: { marginBottom: space.s2 },
  rangee: { flexDirection: 'row', columnGap: space.s2, marginBottom: space.s4 },
  bloc: { flex: 1, minHeight: 72, borderWidth: 1, borderRadius: radius.md, padding: space.s3, justifyContent: 'space-between', overflow: 'hidden' },
  ligneBloc: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', columnGap: space.s2, flexWrap: 'wrap' },
  horsMarge: { marginHorizontal: -size.gutterList, marginBottom: space.s4 },
  poches: { paddingHorizontal: size.gutterList, columnGap: space.s2 },
  poche: { minHeight: 56, borderWidth: 1, borderRadius: radius.md, paddingHorizontal: space.s3, paddingVertical: space.s2, overflow: 'hidden' },
  carte: { borderWidth: 1, borderRadius: radius.md, padding: space.s4, marginBottom: space.s4, rowGap: space.s2 },
  boutonsCarte: { flexDirection: 'row', justifyContent: 'flex-end', columnGap: space.s2 },
  enteteNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 48, marginRight: -space.s3 },
  bulles: { rowGap: space.s2 },
  tabulaire: { fontVariant: ['tabular-nums'] },
  barreAction: { paddingHorizontal: size.gutterList, paddingVertical: space.s2, borderTopWidth: 1 },
  deuxBoutons: { flexDirection: 'row', columnGap: space.s2 },
  quarante: { flex: 4 },
  soixante: { flex: 6 },
});
