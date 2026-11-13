import { calculer } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampMontant } from '@/composants/Champs';
import { LigneInterrupteur } from '@/composants/Choix';
import { Avatar } from '@/composants/Contenu';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { dateLongue } from '@/format/date';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI, useParcours } from '@/parcours/store';
import { maintenant, useEtat } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { radius, size, space, type, useTheme } from '@/theme';

/** EC-38 Mes poches : voir son argent réel par poche et séparer son activité. */
export default function MesPoches() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const etat = useEtat();
  const registre = useRegistre();
  const parcours = useParcours();

  const [pocheSelectionnee, setPocheSelectionnee] = useState<string | null>(null);
  const [actionFeuille, setActionFeuille] = useState<'menu' | 'corriger' | 'ajouter-flooz' | 'ajouter-activite' | null>(null);
  const [montantSaisi, setMontantSaisi] = useState<number | null>(null);

  const soldes = useMemo(() => calculer(etat).soldes, [etat]);
  const pochesMasquees = registre.pochesMasquees ?? [];
  const soldeActivite = registre.soldeActivite;

  // Poches personnelles visibles
  const pochesPerso = etat.poches.filter((p) => p.genre === 'perso' && !pochesMasquees.includes(p.id));
  const pochesPersoMasquees = etat.poches.filter((p) => p.genre === 'perso' && pochesMasquees.includes(p.id));

  // Total des poches perso visibles
  const total = pochesPerso.reduce((sum, p) => sum + (soldes[p.id] ?? 0), 0);

  // Vérifier si Flooz est présent
  const aFlooz = etat.poches.some((p) => p.id === 'flooz') || parcours.flooz !== null;

  const dateComptageTexte = (pocheId: string) => {
    // Dernier comptage enregistré dans les écritures
    const comptages = registre.ecritures.filter((e) => e.type === 'comptage' && e.poche === pocheId);
    const dernier = comptages[comptages.length - 1];
    if (dernier?.at) {
      const datePart = dernier.at.slice(0, 10);
      if (datePart === AUJOURDHUI) {
        return t('ec38.compteHier', { heure: dernier.at.slice(11, 13) });
      }
      return t('ec38.compteJours', { count: 3 });
    }
    return t('ec38.compteDepart', { date: dateLongue(AUJOURDHUI) });
  };

  const ouvrirMenuPoche = (id: string) => {
    setPocheSelectionnee(id);
    setActionFeuille('menu');
  };

  const masquerPoche = (id: string) => {
    useRegistre.getState().modifier({ pochesMasquees: [...pochesMasquees, id] });
    setActionFeuille(null);
    annoncer(t('ec38.pocheMasquee'));
  };

  const retablirPoche = (id: string) => {
    useRegistre.getState().modifier({ pochesMasquees: pochesMasquees.filter((p) => p !== id) });
    annoncer(t('ec38.pocheRetrouvee'));
  };

  const validerCorrection = () => {
    if (montantSaisi === null || !pocheSelectionnee) return;
    const at = maintenant();
    useRegistre.getState().ecrire([{ ecriture: { at, type: 'comptage', poche: pocheSelectionnee, montant: montantSaisi } }]);
    setActionFeuille(null);
    setMontantSaisi(null);
    annoncer(t('commun.enregistre'));
  };

  const validerAjoutFlooz = () => {
    if (montantSaisi === null) return;
    useParcours.getState().modifier({ flooz: montantSaisi });
    const at = maintenant();
    useRegistre.getState().ecrire([{ ecriture: { at, type: 'comptage', poche: 'flooz', montant: montantSaisi } }]);
    setActionFeuille(null);
    setMontantSaisi(null);
    annoncer(t('commun.enregistre'));
  };

  const validerAjoutActivite = () => {
    const val = montantSaisi ?? 0;
    useRegistre.getState().modifier({ soldeActivite: val });
    setActionFeuille(null);
    setMontantSaisi(null);
    annoncer(t('commun.enregistre'));
  };

  const toggleActivite = (activer: boolean) => {
    if (activer) {
      setMontantSaisi(0);
      setActionFeuille('ajouter-activite');
    } else {
      useRegistre.getState().modifier({ soldeActivite: null });
    }
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
          {t('ec38.titre')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        {/* Total */}
        <View style={styles.blocTotal}>
          <Text style={[type.caption, { color: colors.text.secondary }]}>{t('ec38.total')}</Text>
          <Text style={[type.hero, { color: colors.text.primary }]}>{fcfa(total)}</Text>
        </View>

        {/* Poches personnelles */}
        <View style={styles.listePoches}>
          {pochesPerso.map((p) => {
            const solde = soldes[p.id] ?? 0;
            const initiale = p.nom.slice(0, 1).toUpperCase();
            const icone = p.id === 'especes' ? 'payments' : undefined;
            return (
              <Pressable
                key={p.id}
                onPress={() => router.push({ pathname: '/transfert', params: { de: p.id } })}
                onLongPress={() => ouvrirMenuPoche(p.id)}
                delayLongPress={300}
                accessibilityRole="button"
                accessibilityLabel={`${p.nom}, ${dateComptageTexte(p.id)}, solde ${fcfa(solde)}`}
                android_ripple={{ color: colors.action.ripple }}
                style={styles.lignePoche}
              >
                <Avatar icone={icone} initiale={icone ? undefined : initiale} />
                <View style={styles.pocheCorps}>
                  <Text style={[type.bodyStrong, { color: colors.text.primary }]}>{p.nom}</Text>
                  <Text style={[type.caption, { color: colors.text.secondary }]}>{dateComptageTexte(p.id)}</Text>
                </View>
                <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>{fcfa(solde)}</Text>
              </Pressable>
            );
          })}

          {/* Option d'ajouter Flooz si absent */}
          {!aFlooz && (
            <View style={styles.ligneAjoutPoche}>
              <Avatar initiale="F" />
              <View style={styles.pocheCorps}>
                <Text style={[type.bodyStrong, { color: colors.text.primary }]}>Flooz</Text>
              </View>
              <BoutonTexte
                libelle={t('ec38.ajouter')}
                onPress={() => {
                  setMontantSaisi(0);
                  setActionFeuille('ajouter-flooz');
                }}
              />
            </View>
          )}
        </View>

        <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} />

        {/* Interrupteur Poche d'activité */}
        <View style={styles.sectionActivite}>
          <LigneInterrupteur
            titre={t('ec38.activiteTitre')}
            description={t('ec38.activiteDesc')}
            actif={soldeActivite !== null}
            onChangement={toggleActivite}
          />

          {soldeActivite !== null && (
            <Pressable
              onPress={() => router.push({ pathname: '/transfert', params: { de: 'activite' } })}
              onLongPress={() => ouvrirMenuPoche('activite')}
              accessibilityRole="button"
              accessibilityLabel={`Activité, ${fcfa(soldes['activite'] ?? soldeActivite)}, ${t('ec38.activiteHors')}`}
              android_ripple={{ color: colors.action.ripple }}
              style={[styles.lignePoche, styles.carteActivite, { backgroundColor: colors.bg.subtle }]}
            >
              <Avatar icone="storefront" />
              <View style={styles.pocheCorps}>
                <Text style={[type.bodyStrong, { color: colors.text.primary }]}>{t('ec12.activite')}</Text>
                <Text style={[type.caption, { color: colors.text.secondary }]}>{t('ec38.activiteHors')}</Text>
              </View>
              <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>
                {fcfa(soldes['activite'] ?? soldeActivite)}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Poches masquées si présentes */}
        {pochesPersoMasquees.length > 0 && (
          <View style={styles.sectionMasquees}>
            <Text style={[type.caption, { color: colors.text.secondary }]}>{t('ec38.pochesMasquees')}</Text>
            {pochesPersoMasquees.map((p) => (
              <View key={p.id} style={styles.ligneMasquee}>
                <Text style={[type.body, { color: colors.text.secondary }]}>{p.nom}</Text>
                <BoutonTexte libelle={t('ec38.retrouver')} onPress={() => retablirPoche(p.id)} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bouton principal : Compter mes poches */}
      <View style={[styles.pied, { paddingBottom: insets.bottom + space.s3 }]}>
        <BoutonPrincipal libelle={t('ec38.compterPoches')} onPress={() => router.push('/bilan/compter')} />
      </View>

      {/* Feuille de menu sur une poche (appui long) */}
      <FeuilleBasse visible={actionFeuille === 'menu'} onFermer={() => setActionFeuille(null)}>
        <View style={styles.feuilleContenu}>
          <BoutonTexte
            libelle={t('ec38.corriger')}
            onPress={() => {
              if (pocheSelectionnee) {
                setMontantSaisi(soldes[pocheSelectionnee] ?? 0);
                setActionFeuille('corriger');
              }
            }}
          />
          {pocheSelectionnee !== 'especes' && (
            <BoutonTexte
              libelle={t('ec38.masquer')}
              onPress={() => {
                if (pocheSelectionnee) masquerPoche(pocheSelectionnee);
              }}
            />
          )}
        </View>
      </FeuilleBasse>

      {/* Feuille corriger solde */}
      <FeuilleBasse visible={actionFeuille === 'corriger'} onFermer={() => setActionFeuille(null)}>
        <View style={styles.feuilleContenu}>
          <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s3 }]}>
            {t('ec38.corriger')}
          </Text>
          <ChampMontant
            libelle={t('ec38.soldeDepart')}
            valeur={montantSaisi}
            onValeur={setMontantSaisi}
            unite={t('commun.fcfa')}
            autoFocus
          />
          <View style={styles.boutonFeuille}>
            <BoutonPrincipal libelle={t('ec38.enregistrer')} onPress={validerCorrection} />
          </View>
        </View>
      </FeuilleBasse>

      {/* Feuille ajouter Flooz */}
      <FeuilleBasse visible={actionFeuille === 'ajouter-flooz'} onFermer={() => setActionFeuille(null)}>
        <View style={styles.feuilleContenu}>
          <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s3 }]}>
            {t('ec38.ajouterPocheTitre', { nom: 'Flooz' })}
          </Text>
          <ChampMontant
            libelle={t('ec38.soldeDepart')}
            valeur={montantSaisi}
            onValeur={setMontantSaisi}
            unite={t('commun.fcfa')}
            autoFocus
          />
          <View style={styles.boutonFeuille}>
            <BoutonPrincipal libelle={t('ec38.enregistrer')} onPress={validerAjoutFlooz} />
          </View>
        </View>
      </FeuilleBasse>

      {/* Feuille ajouter Activité */}
      <FeuilleBasse visible={actionFeuille === 'ajouter-activite'} onFermer={() => setActionFeuille(null)}>
        <View style={styles.feuilleContenu}>
          <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s3 }]}>
            {t('ec38.activiteTitre')}
          </Text>
          <ChampMontant
            libelle={t('ec38.soldeDepart')}
            valeur={montantSaisi}
            onValeur={setMontantSaisi}
            unite={t('commun.fcfa')}
            autoFocus
          />
          <View style={styles.boutonFeuille}>
            <BoutonPrincipal libelle={t('ec38.enregistrer')} onPress={validerAjoutActivite} />
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
  contenu: { paddingHorizontal: space.s4, paddingBottom: 96 },
  blocTotal: { marginVertical: space.s3 },
  tabulaire: { fontVariant: ['tabular-nums'] },
  listePoches: { rowGap: space.s1 },
  lignePoche: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s4,
    paddingVertical: space.s2,
  },
  ligneAjoutPoche: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s4,
  },
  pocheCorps: { flex: 1, rowGap: 2 },
  separateur: { height: 1, marginVertical: space.s4 },
  sectionActivite: { rowGap: space.s3 },
  carteActivite: {
    borderRadius: radius.md,
    paddingHorizontal: space.s3,
    marginTop: space.s2,
  },
  sectionMasquees: { marginTop: space.s4, rowGap: space.s2 },
  ligneMasquee: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space.s2,
  },
  pied: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: space.s4,
    paddingTop: space.s2,
  },
  feuilleContenu: { padding: space.s4, rowGap: space.s3 },
  boutonFeuille: { marginTop: space.s3 },
});
