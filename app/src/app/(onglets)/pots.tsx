import { calculer, repartirMaintenant } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { annoncer } from '@/composants/BandeauBas';
import { useBasDEcran } from '@/composants/BasDEcran';
import { BoutonContour, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { Bulle } from '@/composants/Contenu';
import { FeuilleDeplacer, Jauge, teinte } from '@/composants/Deplacer';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { Pastille } from '@/composants/Pots';
import { dateLongue, jourDansPhrase } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI, useParcours } from '@/parcours/store';
import { maintenant, useEtat } from '@/registre/etat';
import { baseDe, etatDesPots, type EtatPot } from '@/registre/pots';
import { useRegistre } from '@/registre/store';
import { radius, size, space, type, useTheme } from '@/theme';

/** EC-27 Mes pots : où en est chaque part de son argent. Un pot ne bloque jamais une dépense. */
export default function Pots() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const etat = useEtat();
  const variable = useParcours((p) => p.typeRevenu === 'variable');
  const parDefaut = useRegistre((r) => r.parDefaut);
  const [hauteurBarre, setHauteurBarre] = useState<number>(size.actionBar);
  const [feuille, setFeuille] = useState<'repartir' | 'deplacer' | null>(null);
  useBasDEcran(hauteurBarre + size.bottomNav);

  const { pots, calcul, repartition } = useMemo(() => {
    const p = etatDesPots(etat);
    const c = calculer(etat);
    return { pots: p, calcul: c, repartition: p && !p.rempli && c.resteAVivre >= 0 ? repartirMaintenant(etat, p.recette) : undefined };
  }, [etat]);

  const jour = jourDansPhrase(calcul.reference, AUJOURDHUI);
  const charges = -calcul.mouvements.reduce((s, m) => (m.montant < 0 ? s + m.montant : s), 0);

  const repartir = () => {
    if (!repartition) return;
    const [id] = useRegistre.getState().ecrire([{ ecriture: { at: maintenant(), type: 'repartition', parts: repartition.parts } }]);
    setFeuille(null);
    annoncer(t('ec27.reparti'), () => id && useRegistre.getState().annuler([id]));
  };

  const nomsReserves = pots ? pots.pots.filter((p) => (repartition?.parts[p.pot.id] ?? 0) > 0).map((p) => p.pot.nom) : [];
  const listeNoms = nomsReserves.length > 1 ? `${nomsReserves.slice(0, -1).join(', ')}${t('ec27.et')}${nomsReserves[nomsReserves.length - 1]}` : (nomsReserves[0] ?? '');

  return (
    <View style={[styles.ecran, { backgroundColor: colors.bg.canvas, paddingTop: insets.top }]}>
      <View style={styles.barre}>
        <Text style={[type.appbar, { color: colors.text.primary }]} accessibilityRole="header">
          {t('ec27.titre')}
        </Text>
      </View>

      {!pots ? (
        <View style={styles.contenu}>
          <Bulle texte={t('ec27.sansRecette')} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.contenu}>
          <Pressable onPress={() => router.push('/recette')} accessibilityRole="button" android_ripple={{ color: colors.action.ripple }} style={styles.recette}>
            <Text style={[type.bodyMedium, styles.flex, { color: colors.text.link }]}>{t('ec27.maRecette', { nom: pots.recette.nom })}</Text>
            <Icone nom="chevron_right" couleur={colors.text.link} taille={size.iconSmall} />
          </Pressable>
          {variable ? <Text style={[type.body, styles.plancher, { color: colors.text.secondary }]}>{t('ec27.plancher', { montant: fcfa(baseDe(etat)) })}</Text> : null}

          {!pots.rempli ? (
            <View style={styles.attente}>
              <Bulle
                texte={
                  variable
                    ? t('ec27.remplirMois', { jour: dateLongue(pots.effetDepuis) })
                    : t('ec27.remplirRevenu', { jour: jourDansPhrase(pots.effetDepuis, AUJOURDHUI) })
                }
              />
              {repartition ? (
                <View style={styles.lien}>
                  <BoutonTexte libelle={t('ec27.repartirMaintenant')} onPress={() => setFeuille('repartir')} />
                </View>
              ) : null}
            </View>
          ) : null}

          {parDefaut ? (
            <View style={[styles.carte, { borderColor: colors.border.subtle, backgroundColor: colors.bg.elevated }]}>
              <Text style={[type.body, { color: colors.text.primary }]}>{t('ec27.parDefaut', { count: parDefaut.nombre, pot: parDefaut.pot })}</Text>
            </View>
          ) : null}

          {pots.pots.map((p) => (
            <CartePot key={p.pot.id} p={p} rempli={pots.rempli} jour={jour} charges={charges} />
          ))}
        </ScrollView>
      )}

      <View
        onLayout={(e) => setHauteurBarre(Math.round(e.nativeEvent.layout.height))}
        style={[styles.barreAction, { backgroundColor: colors.bg.canvas, borderTopColor: colors.border.subtle }]}
      >
        {!pots ? (
          <View style={styles.flex}>
            <BoutonPrincipal libelle={t('ec27.choisir')} onPress={() => router.push('/catalogue')} />
          </View>
        ) : (
          <>
            <View style={styles.quarante}>
              <BoutonContour libelle={t('ec27.ajouter')} icone="add" onPress={() => router.push('/ajouter-pot')} />
            </View>
            <View style={styles.soixante}>
              <BoutonPrincipal libelle={t('ec27.deplacer')} desactive={!pots.rempli} onPress={() => setFeuille('deplacer')} />
            </View>
          </>
        )}
      </View>

      {pots && repartition ? (
        <FeuilleBasse
          visible={feuille === 'repartir'}
          titre={t('ec27.repartirTitre')}
          onFermer={() => setFeuille(null)}
          pied={
            <View style={styles.boutons}>
              <BoutonPrincipal libelle={t('ec27.repartir')} onPress={repartir} />
              <BoutonTexte libelle={t('ec27.attendre', { jour: jourDansPhrase(pots.effetDepuis, AUJOURDHUI) })} onPress={() => setFeuille(null)} />
            </View>
          }
        >
          <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>
            {t('ec27.repartirTexte', {
              montant: fcfa(repartition.reserve),
              pots: listeNoms,
              avant: nombre(repartition.chiffreAvant),
              apres: nombre(repartition.chiffreApres),
            })}
          </Text>
        </FeuilleBasse>
      ) : null}
      {pots ? (
        <FeuilleDeplacer
          visible={feuille === 'deplacer'}
          pots={pots.pots}
          depart={{ de: pots.pots.find((p) => !p.quotidien && p.reste > 0)?.pot.id ?? pots.pots[0]?.pot.id, vers: pots.pots.find((p) => p.quotidien)?.pot.id }}
          onFermer={() => setFeuille(null)}
        />
      ) : null}
    </View>
  );
}

function CartePot({ p, rempli, jour, charges }: { p: EtatPot; rempli: boolean; jour: string; charges: number }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const couleur = teinte(colors, p.couleur);
  const leReste = p.pot.regle.type === 'reste';
  const vide = rempli && !p.quotidien && !leReste && p.reste === 0;
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/pot/[id]', params: { id: p.pot.id } })}
      accessibilityRole="button"
      accessibilityLabel={
        rempli
          ? `${t('ec27.lecture', { nom: p.pot.nom, reste: p.reste, cible: p.cible, jour })}${vide ? ` ${t('ec27.vide', { nom: p.pot.nom, jour })}` : ''}`
          : t('ec27.lecturePrevu', { nom: p.pot.nom, cible: p.cible })
      }
      android_ripple={{ color: colors.action.ripple }}
      style={[styles.carte, { borderColor: colors.border.control, backgroundColor: colors.bg.elevated }]}
    >
      <View style={styles.ligne}>
        {couleur ? <Pastille couleur={couleur} /> : null}
        <Text style={[type.bodyStrong, styles.flex, { color: colors.text.primary }]}>{p.pot.nom}</Text>
      </View>
      {leReste ? (
        <>
          {rempli ? <Text style={[type.subtitle, styles.tabulaire, { color: colors.text.primary }]}>{fcfa(p.reste)}</Text> : null}
          <Text style={[type.caption, { color: colors.text.secondary }]}>{t('ec27.leReste')}</Text>
        </>
      ) : rempli ? (
        <>
          <View style={styles.montants}>
            <Text style={[type.subtitle, styles.tabulaire, { color: colors.text.primary }]}>{fcfa(p.reste)}</Text>
            <Text style={[type.body, styles.tabulaire, { color: colors.text.secondary }]}>{t('ec27.sur', { montant: nombre(p.cible) })}</Text>
          </View>
          {couleur ? <Jauge part={p.cible > 0 ? p.reste / p.cible : 0} couleur={couleur} /> : null}
          {p.quotidien ? (
            <Text style={[type.caption, { color: colors.text.secondary }]}>
              {charges > 0 ? t('ec27.detailQuotidien', { jour, charges: nombre(charges) }) : t('ec27.detailQuotidienSans', { jour })}
            </Text>
          ) : null}
          {vide ? (
            <View style={styles.ligne}>
              <Icone nom="warning" couleur={colors.status.warnFg} taille={size.iconSmall} />
              <Text style={[type.caption, styles.flex, { color: colors.status.warnFg }]}>{t('ec27.vide', { nom: p.pot.nom, jour })}</Text>
            </View>
          ) : null}
        </>
      ) : (
        <Text style={[type.subtitle, styles.tabulaire, { color: colors.text.primary }]}>{t('ec27.prevus', { montant: fcfa(p.cible) })}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1 },
  flex: { flex: 1 },
  barre: { height: size.appBar, justifyContent: 'center', paddingHorizontal: size.gutterList },
  contenu: { paddingHorizontal: size.gutterList, paddingBottom: space.s3 },
  recette: { minHeight: 48, flexDirection: 'row', alignItems: 'center', columnGap: space.s2, marginBottom: space.s2 },
  plancher: { marginBottom: space.s3 },
  attente: { marginBottom: space.s3 },
  lien: { alignSelf: 'flex-start', marginLeft: -space.s3 },
  carte: { borderWidth: 1, borderRadius: radius.md, padding: space.s4, rowGap: space.s2, marginBottom: space.s3, overflow: 'hidden' },
  ligne: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  montants: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', columnGap: space.s2 },
  tabulaire: { fontVariant: ['tabular-nums'] },
  barreAction: { flexDirection: 'row', columnGap: space.s2, paddingHorizontal: size.gutterList, paddingVertical: space.s2, borderTopWidth: 1 },
  quarante: { flex: 4 },
  soixante: { flex: 6 },
  boutons: { rowGap: space.s1 },
});
