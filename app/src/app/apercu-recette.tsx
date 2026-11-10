import { effetRecette, repartir } from '@bankvi/moteur';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { annoncer } from '@/composants/BandeauBas';
import { BandeauEtat } from '@/composants/Contenu';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { Ecran } from '@/composants/Ecran';
import { BarrePots, Pastille, couleurPot } from '@/composants/Pots';
import { jourDansPhrase } from '@/format/date';
import { fcfa } from '@/format/montant';
import { etatDepuis, recetteParId } from '@/parcours/etat';
import { AUJOURDHUI, useParcours } from '@/parcours/store';
import { adopterOuRanger } from '@/registre/adoption';
import { useEtat } from '@/registre/etat';
import { baseDe, recetteCourante, sourceDe } from '@/registre/pots';
import { size, space, type, useTheme } from '@/theme';

/** EC-08 Aperçu d'une recette : la recette en francs CFA, sur le revenu de l'utilisateur. */
export default function ApercuRecette() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const reponses = useParcours();
  // Depuis le catalogue ou une recette reçue (`depuis`), l'app est déjà configurée.
  const { id, depuis } = useLocalSearchParams<{ id?: string; depuis?: 'app' | 'recue' }>();
  const dansApp = depuis === 'app' || depuis === 'recue';
  const etatApp = useEtat();
  const recette = recetteParId(dansApp && id ? id : (reponses.recetteChoisie ?? '70-20-10'))!;
  const plancher = reponses.typeRevenu === 'variable';
  const base = dansApp ? baseDe(etatApp) : (reponses.montantRevenu ?? 0);
  const active = dansApp ? recetteCourante(etatApp)?.recette : undefined;

  const { parts, effet } = useMemo(() => {
    const etat = dansApp ? etatApp : etatDepuis({ ...reponses, recetteAdoptee: null });
    return { parts: repartir(base, recette), effet: effetRecette(etat, recette) };
  }, [reponses, base, recette, dansApp, etatApp]);

  const date = jourDansPhrase(effet.depuis, AUJOURDHUI);
  const texteBase =
    base === 0 ? t('ec08.baseVide') : plancher ? t('ec08.basePlancher', { montant: fcfa(base) }) : t('ec08.base', { montant: fcfa(base) });

  const adopter = () => {
    if (dansApp) {
      adopterOuRanger(etatApp, recette, t('ec08.adoptee'));
      return;
    }
    reponses.modifier({ recetteAdoptee: recette.id });
    router.push('/quand-noter');
    annoncer(t('ec08.adoptee'), () => useParcours.getState().modifier({ recetteAdoptee: null }));
  };

  let couleur = 0;
  return (
    <Ecran
      titre={recette.nom}
      pied={
        <>
          <BoutonPrincipal libelle={t('ec08.adopter')} onPress={adopter} />
          <BoutonTexte libelle={t('ec08.ajuster')} onPress={() => router.push({ pathname: '/ajuster', params: { id: recette.id, depuis: dansApp ? 'app' : 'parcours' } })} />
        </>
      }
    >
      {depuis === 'recue' && active && active.id !== recette.id ? <BandeauEtat texte={t('ec36.remplacera')} /> : null}
      <Text style={[type.bodyLarge, styles.base, { color: colors.text.secondary }]}>{texteBase}</Text>
      <BarrePots recette={recette} />
      <View style={styles.liste}>
        {recette.pots.map((p, i) => {
          const reste = p.regle.type === 'reste';
          const pct = p.regle.type === 'pourcentage' ? p.regle.valeur : null;
          const montant = parts[p.id] ?? 0;
          const teinte = reste ? null : couleurPot(colors, couleur++);
          return (
            <View key={p.id}>
              <View
                style={styles.ligne}
                accessible
                accessibilityLabel={
                  reste
                    ? `${t('ec08.leReste')}, ${t('ec08.leResteSous', { montant: fcfa(base) })}, ${t('ec08.selonLeMois')}`
                    : t('ec08.ligneLecture', { nom: p.nom, pct, montant })
                }
              >
                <View style={styles.pastille}>{teinte ? <Pastille couleur={teinte} /> : null}</View>
                <View style={styles.flex}>
                  <Text style={[type.bodyStrong, { color: colors.text.primary }]}>{reste ? t('ec08.leReste') : p.nom}</Text>
                  <Text style={[type.body, { color: colors.text.secondary }]}>
                    {reste ? t('ec08.leResteSous', { montant: fcfa(base) }) : `${pct} %`}
                  </Text>
                </View>
                {base > 0 ? (
                  <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>
                    {reste ? t('ec08.selonLeMois') : fcfa(montant)}
                  </Text>
                ) : null}
              </View>
              {i < recette.pots.length - 1 ? <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} /> : null}
            </View>
          );
        })}
      </View>
      {base > 0 ? (
        <Text style={[type.bodyLarge, styles.effet, styles.tabulaire, { color: colors.text.primary }]}>
          {effet.manque !== undefined
            ? t('ec08.effetManque', { date, montant: fcfa(effet.manque) })
            : t('ec08.effet', { date, montant: fcfa(effet.chiffre) })}
        </Text>
      ) : null}
      <Text style={[type.caption, styles.source, { color: colors.text.secondary }]}>{sourceDe(recette, t)}</Text>
      <Text style={[type.bodyMedium, styles.mention, { color: colors.text.secondary }]}>{t('ec08.mention')}</Text>
    </Ecran>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  base: { marginTop: space.s2, marginBottom: space.s4 },
  liste: { marginTop: space.s4 },
  ligne: { minHeight: size.rowTwo, flexDirection: 'row', alignItems: 'center', columnGap: space.s3 },
  pastille: { width: 12 },
  separateur: { height: 1, marginLeft: 12 + space.s3 },
  tabulaire: { fontVariant: ['tabular-nums'] },
  effet: { marginTop: space.s4 },
  source: { marginTop: space.s2 },
  mention: { marginTop: space.s2 },
});
