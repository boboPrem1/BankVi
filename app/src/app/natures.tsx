import type { Recette } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { Puce } from '@/composants/Choix';
import { Bulle } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { useParcours } from '@/parcours/store';
import { categoriesDeNature, libelleNature, natureDe } from '@/registre/categories';
import { useEtat } from '@/registre/etat';
import { aRanger, adopter, enAttente } from '@/registre/pots';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

const majuscule = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** EC-34 Natures non rangées : chaque dépense doit réduire un pot. N'apparaît que si nécessaire. */
export default function Natures() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const etat = useEtat();
  const charges = useParcours((p) => p.charges);
  const [recette] = useState(() => enAttente.recette);
  const [choix, setChoix] = useState<Record<string, string>>({});
  if (!recette) return <Ecran titre={t('ec34.titre')}>{null}</Ecran>;

  const natures = aRanger(etat, recette, charges, natureDe);
  const toutRange = natures.every((n) => choix[n]);

  const finir = (r: Recette, parDefaut?: { nombre: number; pot: string }) => {
    const annuler = adopter(etat, r);
    useRegistre.getState().modifier({ parDefaut: parDefaut ?? null });
    enAttente.recette = null;
    router.dismissTo('/recette');
    annoncer(enAttente.message, annuler);
  };

  const ranger = (affectation: Record<string, string>): Recette => ({
    ...recette,
    pots: recette.pots.map((p) => {
      const ajout = Object.entries(affectation).flatMap(([n, pot]) => (pot === p.id ? [n] : []));
      return ajout.length ? { ...p, natures: [...(p.natures ?? []), ...ajout] } : p;
    }),
  });

  const plusTard = () => {
    // Les natures vont au pot du quotidien, avec une carte unique sur Mes pots.
    const quotidien = recette.pots.find((p) => p.quotidien) ?? recette.pots[0]!;
    finir(ranger(Object.fromEntries(natures.map((n) => [n, quotidien.id]))), { nombre: natures.length, pot: quotidien.nom });
  };

  return (
    <Ecran
      titre={t('ec34.titre')}
      marge={size.gutterList}
      pied={
        <>
          <BoutonPrincipal libelle={t('ec34.toutRange')} desactive={!toutRange} onPress={() => finir(ranger(choix))} />
          {!toutRange ? <BoutonTexte libelle={t('ec34.plusTard')} onPress={plusTard} /> : null}
        </>
      }
    >
      <View style={styles.bulle}>
        <Bulle texte={t('ec34.bulle', { count: natures.length, liste: natures.map(libelleNature).join(', ') })} />
      </View>
      {natures.map((n, i) => {
        const choisi = recette.pots.find((p) => p.id === choix[n]);
        return (
          <View
            key={n}
            accessibilityRole="radiogroup"
            accessibilityLabel={t('ec34.groupe', { nature: majuscule(libelleNature(n)), pot: choisi?.nom ?? '' })}
            style={[styles.groupe, i > 0 ? { borderTopWidth: 1, borderTopColor: colors.border.subtle, paddingTop: space.s3 } : null]}
          >
            <Text style={[type.bodyStrong, { color: colors.text.primary }]}>{majuscule(libelleNature(n))}</Text>
            <Text style={[type.body, { color: colors.text.secondary }]}>
              {categoriesDeNature(n)
                .map((c) => c.nom)
                .join(', ')}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.puces} style={styles.rangee}>
              {recette.pots.map((p) => (
                <Puce key={p.id} role="radio" libelle={p.nom} choisie={choix[n] === p.id} onPress={() => setChoix((c) => ({ ...c, [n]: p.id }))} />
              ))}
            </ScrollView>
          </View>
        );
      })}
    </Ecran>
  );
}

const styles = StyleSheet.create({
  bulle: { marginTop: space.s2, marginBottom: space.s4 },
  groupe: { marginBottom: space.s3 },
  rangee: { flexGrow: 0, marginTop: space.s2, marginHorizontal: -size.gutterList },
  puces: { columnGap: space.s2, alignItems: 'center', height: 48, paddingHorizontal: size.gutterList },
});
