import { calculer } from '@bankvi/moteur';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BoutonPrincipal } from '@/composants/Boutons';
import { FeuilleDeplacer, Jauge, teinte } from '@/composants/Deplacer';
import { Ecran } from '@/composants/Ecran';
import { jourDansPhrase } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI, useParcours } from '@/parcours/store';
import { libelleNature, natureDe } from '@/registre/categories';
import { libelle, useEtat } from '@/registre/etat';
import { etatDesPots, mouvementsDuPot, naturesLues, naturesUtilisees } from '@/registre/pots';
import { radius, size, space, type, useTheme } from '@/theme';

/** EC-28 Détail d'un pot : ce qu'il reçoit, ce qu'il couvre, ce qui en est sorti. */
export default function DetailPot() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const etat = useEtat();
  const charges = useParcours((p) => p.charges);
  const [feuille, setFeuille] = useState(false);

  const d = useMemo(() => {
    const pots = etatDesPots(etat);
    const p = pots?.pots.find((x) => x.pot.id === id);
    if (!pots || !p) return undefined;
    const mots = { repartition: t('ec28.repartition'), deplacement: t('ec28.deplacement') };
    return {
      pots,
      p,
      mouvements: mouvementsDuPot(etat, pots.recette, p.pot.id, (c) => libelle({ categorie: c }), mots),
      natures: naturesLues(pots.recette, p.pot, naturesUtilisees(etat, natureDe, charges)),
      jour: jourDansPhrase(calculer(etat).reference, AUJOURDHUI),
    };
  }, [etat, id, charges, t]);

  if (!d) return <Ecran titre="">{null}</Ecran>;
  const { p, pots, mouvements, natures, jour } = d;
  const couleur = teinte(colors, p.couleur) ?? colors.border.control;
  const leReste = p.pot.regle.type === 'reste';
  const regle =
    p.pot.regle.type === 'pourcentage'
      ? t('ec28.regle', { pct: p.pot.regle.valeur })
      : p.pot.regle.type === 'fixe'
        ? t('ec28.regleFixe', { montant: fcfa(p.pot.regle.valeur) })
        : t('ec28.regleReste');
  const vide = pots.rempli && !p.quotidien && !leReste && p.reste === 0;

  return (
    <>
      <Ecran
        titre={p.pot.nom}
        marge={size.gutterList}
        pied={<BoutonPrincipal libelle={t('ec27.deplacer')} desactive={!pots.rempli} onPress={() => setFeuille(true)} />}
      >
        <View accessible accessibilityLabel={`${p.pot.nom}, ${t('ec27.lecture', { nom: '', reste: p.reste, cible: p.cible, jour }).replace(/^, /, '')}`}>
          <View style={styles.montants}>
            <Text style={[type.title, styles.tabulaire, { color: colors.text.primary }]}>{fcfa(pots.rempli ? p.reste : p.cible)}</Text>
            {!leReste && pots.rempli ? <Text style={[type.body, styles.tabulaire, { color: colors.text.secondary }]}>{t('ec27.sur', { montant: nombre(p.cible) })}</Text> : null}
          </View>
        </View>
        {!leReste && pots.rempli ? (
          <View style={styles.jauge}>
            <Jauge part={p.cible > 0 ? p.reste / p.cible : 0} couleur={couleur} />
          </View>
        ) : null}
        {vide ? (
          <View style={styles.ligne}>
            <Icone nom="warning" couleur={colors.status.warnFg} taille={size.iconSmall} />
            <Text style={[type.body, { color: colors.status.warnFg }]}>{t('ec28.vide', { jour })}</Text>
          </View>
        ) : null}
        <Text style={[type.body, styles.regle, { color: colors.text.secondary }]}>{regle}</Text>
        {natures.length > 0 ? (
          <View style={styles.natures}>
            <Text style={[type.caption, { color: colors.text.secondary }]}>{t('ec28.lit')}</Text>
            {natures.map((n) => (
              <View key={n} style={[styles.nature, { borderColor: colors.border.subtle }]}>
                <Text style={[type.caption, { color: colors.text.secondary }]}>{libelleNature(n)}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <Text style={[type.captionMedium, styles.titre, { color: colors.text.secondary }]} accessibilityRole="header">
          {t('ec28.mouvements')}
        </Text>
        {mouvements.length === 0 ? (
          <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec28.aucun')}</Text>
        ) : (
          <View style={styles.bulles}>
            {mouvements.map((m) => {
              const montant = m.sortie ? fcfa(m.montant) : `+${fcfa(m.montant)}`;
              return (
                <View key={m.id} style={m.sortie ? styles.droite : styles.gauche}>
                  <Pressable
                    disabled={!m.saisie}
                    onPress={() => router.push({ pathname: '/saisie/[id]', params: { id: m.id } })}
                    accessibilityRole={m.saisie ? 'button' : 'text'}
                    accessibilityLabel={m.sortie ? t('ec28.lectureSortie', { libelle: m.libelle, montant: m.montant }) : t('ec28.lectureEntree', { libelle: m.libelle, montant: m.montant })}
                    style={[
                      styles.bulle,
                      m.sortie
                        ? { backgroundColor: colors.bg.bubbleUser, borderTopRightRadius: radius.xs }
                        : { backgroundColor: colors.bg.bubbleApp, borderTopLeftRadius: radius.xs },
                    ]}
                  >
                    <Text style={[type.body, styles.tabulaire, { color: colors.text.primary }]}>{t('ec28.bulle', { libelle: m.libelle, montant })}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </Ecran>
      <FeuilleDeplacer
        visible={feuille}
        pots={pots.pots}
        depart={
          p.reste > 0
            ? { de: p.pot.id, vers: pots.pots.find((x) => x.pot.id !== p.pot.id && x.quotidien !== p.quotidien)?.pot.id ?? pots.pots.find((x) => x.pot.id !== p.pot.id)?.pot.id }
            : { vers: p.pot.id, de: pots.pots.find((x) => x.pot.id !== p.pot.id && x.reste > 0)?.pot.id }
        }
        onFermer={() => setFeuille(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  montants: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', columnGap: space.s2 },
  jauge: { marginTop: space.s2, marginBottom: space.s3 },
  ligne: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2, marginBottom: space.s2 },
  regle: { marginBottom: space.s2 },
  natures: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: space.s2, marginBottom: space.s4 },
  nature: { minHeight: 32, borderWidth: 1, borderRadius: radius.full, paddingHorizontal: space.s3, justifyContent: 'center' },
  titre: { marginTop: space.s2, marginBottom: space.s2 },
  bulles: { rowGap: space.s2 },
  droite: { alignItems: 'flex-end' },
  gauche: { alignItems: 'flex-start' },
  bulle: { maxWidth: '80%', borderRadius: radius.md, paddingHorizontal: space.s3, paddingVertical: space.s2 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
