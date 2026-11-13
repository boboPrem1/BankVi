import { calculer } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonDestructif, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampCompact, ChampMontant } from '@/composants/Champs';
import { Segments, type Segment } from '@/composants/Choix';
import { Avatar } from '@/composants/Contenu';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { useParcours, type Charge } from '@/parcours/store';
import { categorie } from '@/registre/categories';
import { useEtat } from '@/registre/etat';
import { radius, size, space, type, useTheme } from '@/theme';

type TypeLigne = 'revenu' | 'charge';
type RythmeLigne = 'mensuel' | 'hebdomadaire' | 'trimestriel';

interface LigneEdit {
  id?: string;
  typeLigne: TypeLigne;
  nom: string;
  montant: number | null;
  jour: number | null;
  rythme: RythmeLigne;
}

/** EC-39 Revenus et charges : garder à jour ce qui revient. */
export default function RevenusCharges() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const parcours = useParcours();
  const etat = useEtat();

  const [feuilleOuverte, setFeuilleOuverte] = useState(false);
  const [edition, setEdition] = useState<LigneEdit | null>(null);

  const calcul = useMemo(() => calculer(etat), [etat]);

  const charges = parcours.charges ?? [];
  const totalChargesMois = charges.reduce((sum, c) => sum + c.montant, 0);

  const segmentsType: Segment<TypeLigne>[] = [
    { valeur: 'revenu', libelle: t('ec39.revenu') },
    { valeur: 'charge', libelle: t('ec39.charge') },
  ];

  const segmentsRythme: Segment<RythmeLigne>[] = [
    { valeur: 'mensuel', libelle: t('ec39.mensuel') },
    { valeur: 'hebdomadaire', libelle: t('ec39.hebdomadaire') },
    { valeur: 'trimestriel', libelle: t('ec39.trimestriel') },
  ];

  const ouvrirAjout = () => {
    setEdition({
      typeLigne: 'charge',
      nom: '',
      montant: null,
      jour: 5,
      rythme: 'mensuel',
    });
    setFeuilleOuverte(true);
  };

  const ouvrirModifierCharge = (c: Charge) => {
    setEdition({
      id: c.id,
      typeLigne: 'charge',
      nom: c.nom,
      montant: c.montant,
      jour: c.jour,
      rythme: 'mensuel',
    });
    setFeuilleOuverte(true);
  };

  const ouvrirModifierRevenu = () => {
    setEdition({
      id: 'revenu-principal',
      typeLigne: 'revenu',
      nom: parcours.typeRevenu === 'regulier' ? 'Salaire' : 'Mon activité',
      montant: parcours.montantRevenu,
      jour: parcours.jourRevenu ?? 28,
      rythme: 'mensuel',
    });
    setFeuilleOuverte(true);
  };

  const supprimerLigne = () => {
    if (!edition) return;
    if (edition.typeLigne === 'charge' && edition.id) {
      const chargeId = edition.id;
      const ancienne = charges.find((c) => c.id === chargeId);
      useParcours.getState().modifier({ charges: charges.filter((c) => c.id !== chargeId) });
      setFeuilleOuverte(false);
      setEdition(null);
      annoncer(t('ec39.supprimee'), () => {
        if (ancienne) {
          useParcours.getState().modifier({ charges: [...useParcours.getState().charges, ancienne] });
        }
      });
    } else if (edition.typeLigne === 'revenu') {
      const ancMontant = parcours.montantRevenu;
      useParcours.getState().modifier({ montantRevenu: null });
      setFeuilleOuverte(false);
      setEdition(null);
      annoncer(t('ec39.supprimee'), () => {
        useParcours.getState().modifier({ montantRevenu: ancMontant });
      });
    }
  };

  const enregistrerLigne = () => {
    if (!edition || !edition.nom.trim() || edition.montant === null) return;
    const jourVal = edition.jour ? Math.min(31, Math.max(1, edition.jour)) : 1;

    if (edition.typeLigne === 'charge') {
      if (edition.id) {
        // Modification
        const modifiees = charges.map((c) =>
          c.id === edition.id ? { ...c, nom: edition.nom.trim(), montant: edition.montant!, jour: jourVal } : c,
        );
        useParcours.getState().modifier({ charges: modifiees });
      } else {
        // Ajout
        const nouvelle: Charge = {
          id: `charge-${Date.now()}`,
          nom: edition.nom.trim(),
          montant: edition.montant,
          jour: jourVal,
          icone: 'receipt_long',
          feminin: false,
        };
        useParcours.getState().modifier({ charges: [...charges, nouvelle] });
      }
    } else {
      // Revenu
      useParcours.getState().modifier({
        montantRevenu: edition.montant,
        jourRevenu: jourVal,
        typeRevenu: 'regulier',
      });
    }

    setFeuilleOuverte(false);
    setEdition(null);

    // Annonce du nouveau chiffre
    const nouveauEtat = useEtat();
    const nouveauCalcul = calculer(nouveauEtat);
    annoncer(t('ec39.chiffrePasse', { montant: fcfa(nouveauCalcul.chiffre) }));
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
          {t('ec39.titre')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        {/* Groupe Revenus */}
        <View style={styles.groupe}>
          <Text style={[type.subtitle, { color: colors.text.primary }]}>{t('ec39.revenus')}</Text>

          {parcours.montantRevenu ? (
            <Pressable
              onPress={ouvrirModifierRevenu}
              accessibilityRole="button"
              accessibilityLabel={`${parcours.typeRevenu === 'regulier' ? 'Salaire' : 'Revenu variable'}, plus ${fcfa(parcours.montantRevenu)}`}
              android_ripple={{ color: colors.action.ripple }}
              style={styles.ligne}
            >
              <Avatar icone="account_balance_wallet" />
              <View style={styles.ligneCorps}>
                <Text style={[type.bodyStrong, { color: colors.text.primary }]}>
                  {parcours.typeRevenu === 'regulier' ? 'Salaire' : t('ec39.revenuVariable')}
                </Text>
                <Text style={[type.caption, { color: colors.text.secondary }]}>
                  {parcours.typeRevenu === 'regulier'
                    ? t('ec39.prochain', { jour: parcours.jourRevenu ?? 28 })
                    : t('ec39.variableDesc', { montant: fcfa(parcours.montantRevenu) })}
                </Text>
              </View>
              <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>
                +{fcfa(parcours.montantRevenu)}
              </Text>
            </Pressable>
          ) : (
            <Text style={[type.body, { color: colors.text.secondary, marginVertical: space.s2 }]}>
              {t('ec39.aucunRevenu')}
            </Text>
          )}
        </View>

        {/* Groupe Charges */}
        <View style={styles.groupe}>
          <Text style={[type.subtitle, { color: colors.text.primary }]}>
            {charges.length > 0 ? t('ec39.chargesTotal', { montant: fcfa(totalChargesMois) }) : t('ec39.charges')}
          </Text>

          {charges.length > 0 ? (
            charges.map((c) => {
              const cat = categorie(c.nom);
              const nomIcone = c.icone ?? cat?.icone ?? 'receipt_long';
              return (
                <Pressable
                  key={c.id}
                  onPress={() => ouvrirModifierCharge(c)}
                  accessibilityRole="button"
                  accessibilityLabel={`${c.nom}, moins ${fcfa(c.montant)}`}
                  android_ripple={{ color: colors.action.ripple }}
                  style={styles.ligne}
                >
                  <Avatar icone={nomIcone} />
                  <View style={styles.ligneCorps}>
                    <Text style={[type.bodyStrong, { color: colors.text.primary }]}>{c.nom}</Text>
                    <Text style={[type.caption, { color: colors.text.secondary }]}>
                      {t('ec39.prochain', { jour: c.jour })}
                    </Text>
                  </View>
                  <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>
                    −{fcfa(c.montant)}
                  </Text>
                </Pressable>
              );
            })
          ) : (
            <Text style={[type.body, { color: colors.text.secondary, marginVertical: space.s2 }]}>
              {t('ec39.aucuneCharge')}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Bouton principal Ajouter */}
      <View style={[styles.pied, { paddingBottom: insets.bottom + space.s3 }]}>
        <BoutonPrincipal libelle={t('ec39.ajouter')} onPress={ouvrirAjout} />
      </View>

      {/* Feuille Ajout / Modification */}
      <FeuilleBasse visible={feuilleOuverte} onFermer={() => setFeuilleOuverte(false)}>
        {edition && (
          <View style={styles.feuilleContenu}>
            <Text style={[type.title, { color: colors.text.primary, marginBottom: space.s2 }]}>
              {edition.id ? t('ec39.modifierTitre') : t('ec39.ajouterTitre')}
            </Text>

            {/* Sélecteur Type */}
            <Segments
              segments={segmentsType}
              valeur={edition.typeLigne}
              onChoix={(v) => setEdition({ ...edition, typeLigne: v })}
            />

            {/* Nom */}
            <ChampCompact
              libelle={t('ec39.nom')}
              value={edition.nom}
              onChangeText={(text) => setEdition({ ...edition, nom: text })}
              placeholder={edition.typeLigne === 'charge' ? 'Loyer, Électricité…' : 'Salaire…'}
            />

            {/* Montant */}
            <ChampMontant
              libelle={t('ec39.montant')}
              valeur={edition.montant}
              onValeur={(val) => setEdition({ ...edition, montant: val })}
              unite={t('commun.fcfa')}
            />

            {/* Rythme */}
            <Segments
              segments={segmentsRythme}
              valeur={edition.rythme}
              onChoix={(r) => setEdition({ ...edition, rythme: r })}
            />

            {/* Jour */}
            <ChampCompact
              libelle={t('ec39.jour')}
              value={edition.jour ? String(edition.jour) : ''}
              onChangeText={(text) => {
                const n = parseInt(text.replace(/\D/g, ''), 10);
                setEdition({ ...edition, jour: isNaN(n) ? null : n });
              }}
              placeholder="1"
              keyboardType="number-pad"
              largeur={120}
            />

            <View style={styles.actionsFeuille}>
              <BoutonPrincipal
                libelle={t('ec39.enregistrer')}
                desactive={!edition.nom.trim() || edition.montant === null}
                onPress={enregistrerLigne}
              />
              {edition.id && (
                <BoutonDestructif
                  libelle={t('ec39.supprimer')}
                  onPress={supprimerLigne}
                />
              )}
            </View>
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
  contenu: { paddingHorizontal: space.s4, paddingBottom: 96, rowGap: space.s5 },
  groupe: { rowGap: space.s2 },
  ligne: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s4,
    paddingVertical: space.s2,
  },
  ligneCorps: { flex: 1, rowGap: 2 },
  tabulaire: { fontVariant: ['tabular-nums'] },
  pied: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: space.s4,
    paddingTop: space.s2,
  },
  feuilleContenu: { padding: space.s4, rowGap: space.s3 },
  actionsFeuille: { marginTop: space.s3, rowGap: space.s2 },
});
