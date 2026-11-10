import { CATALOGUE, type Recette } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BoutonTexte } from '@/composants/Boutons';
import { teinte } from '@/composants/Deplacer';
import { Ecran } from '@/composants/Ecran';
import { BarrePots, Pastille } from '@/composants/Pots';
import { useEtat } from '@/registre/etat';
import { recetteCourante, sourceDe } from '@/registre/pots';
import { useRegistre } from '@/registre/store';
import { radius, size, space, type, useTheme } from '@/theme';

/** EC-31 Catalogue : les recettes avec leurs pots exacts et leur source. Ordre fixe, sans note. */
export default function Catalogue() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const etat = useEtat();
  const pass = useRegistre((r) => r.pass);
  const active = recetteCourante(etat)?.recette;
  const catalogue = Object.values(CATALOGUE) as Recette[];
  // Une recette ajustée, écrite ou reçue, quand elle est active, passe en tête.
  const cartes = active && !catalogue.some((r) => r.id === active.id) ? [active, ...catalogue] : catalogue;

  return (
    <Ecran titre={t('ec31.titre')} marge={size.gutterList}>
      <View style={styles.liste}>
        {cartes.map((r) => (
          <Carte key={r.id} recette={r} active={r.id === active?.id} />
        ))}
      </View>
      <View style={styles.ecrire}>
        <BoutonTexte libelle={pass ? t('ec31.ecrire') : `${t('ec31.ecrire')} · ${t('ec23.passPlus')}`} onPress={() => router.push('/ecrire-recette')} />
      </View>
    </Ecran>
  );
}

function Carte({ recette, active }: { recette: Recette; active: boolean }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const source = sourceDe(recette, t).replace(/^Source : /, '');
  let rang = 0;
  const pots = recette.pots.map((p) => {
    const pct = p.regle.type === 'pourcentage' ? `${p.regle.valeur} %` : p.regle.type === 'reste' ? t('ec30.reste') : t('ec30.fixe', { montant: p.regle.valeur });
    return { id: p.id, texte: `${p.nom} ${pct}`, couleur: p.regle.type === 'reste' ? null : teinte(colors, rang++) };
  });
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/apercu-recette', params: { id: recette.id, depuis: 'app' } })}
      accessibilityRole="button"
      accessibilityLabel={t('ec31.lecture', {
        nom: recette.nom,
        active: active ? `, ${t('ec31.active').toLowerCase()}` : '',
        pots: pots.map((p) => p.texte).join(', '),
        source,
      })}
      android_ripple={{ color: colors.action.ripple }}
      style={[styles.carte, { backgroundColor: colors.bg.elevated, borderColor: colors.border.control }]}
    >
      <View style={styles.entete}>
        <Text style={[type.bodyStrong, styles.flex, { color: colors.text.primary }]}>{recette.nom}</Text>
        {active ? (
          <View style={[styles.marque, { backgroundColor: colors.bg.selected }]}>
            <Text style={[type.captionMedium, { color: colors.text.onSelected }]}>{t('ec31.active')}</Text>
          </View>
        ) : null}
      </View>
      <BarrePots recette={recette} />
      <View style={styles.pots}>
        {pots.map((p) => (
          <View key={p.id} style={styles.pot}>
            <View style={styles.pastille}>{p.couleur ? <Pastille couleur={p.couleur} /> : null}</View>
            <Text style={[type.body, { color: colors.text.primary }]}>{p.texte}</Text>
          </View>
        ))}
      </View>
      <Text style={[type.caption, { color: colors.text.secondary }]}>{source}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  liste: { rowGap: space.s3, marginTop: space.s2 },
  carte: { borderWidth: 1, borderRadius: radius.md, padding: space.s4, rowGap: space.s2, overflow: 'hidden' },
  entete: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2, flexWrap: 'wrap' },
  marque: { borderRadius: radius.xs, paddingHorizontal: space.s2, paddingVertical: 2 },
  pots: { rowGap: space.s1 },
  pot: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  pastille: { width: 12 },
  ecrire: { marginTop: space.s3, alignSelf: 'center' },
});
