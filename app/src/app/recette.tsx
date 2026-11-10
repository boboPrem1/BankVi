import { repartir } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { teinte } from '@/composants/Deplacer';
import { Ecran } from '@/composants/Ecran';
import { BarrePots, Pastille } from '@/composants/Pots';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { useParcours } from '@/parcours/store';
import { useEtat } from '@/registre/etat';
import { baseDe, recetteCourante, sourceDe } from '@/registre/pots';
import { size, space, type, useTheme } from '@/theme';

/** EC-30 Ma recette : ses pots, ses règles, leur ordre ; en changer sans rien recatégoriser. */
export default function MaRecette() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const etat = useEtat();
  const variable = useParcours((p) => p.typeRevenu === 'variable');
  const recette = recetteCourante(etat)?.recette;
  if (!recette) return <Ecran titre={t('ec30.titre')}>{null}</Ecran>;
  const base = baseDe(etat);
  const parts = repartir(base, recette);
  let rang = 0;

  return (
    <Ecran
      titre={t('ec30.titre')}
      marge={size.gutterList}
      pied={
        <>
          <BoutonPrincipal libelle={t('ec30.changer')} onPress={() => router.push('/catalogue')} />
          <BoutonTexte libelle={t('ec30.ajuster')} onPress={() => router.push({ pathname: '/ajuster', params: { id: recette.id, depuis: 'recette' } })} />
        </>
      }
    >
      <View style={styles.entete}>
        <Text style={[type.title, styles.flex, { color: colors.text.primary }]} accessibilityRole="header" accessibilityLabel={t('ec30.lectureNom', { nom: recette.nom.replaceAll(' / ', ', ') })}>
          {recette.nom}
        </Text>
        <Pressable
          onPress={() => router.push('/partager')}
          accessibilityRole="button"
          accessibilityLabel={t('ec30.partager')}
          android_ripple={{ color: colors.action.ripple, borderless: true, radius: 24 }}
          style={styles.action}
        >
          <Icone nom="share" couleur={colors.text.primary} />
        </Pressable>
      </View>
      <Text style={[type.caption, styles.source, { color: colors.text.secondary }]}>{sourceDe(recette, t)}</Text>
      <Text style={[type.bodyLarge, styles.base, { color: colors.text.secondary }]}>
        {variable ? t('ec27.plancher', { montant: fcfa(base) }) : t('ec30.base', { montant: fcfa(base) })}
      </Text>
      <BarrePots recette={recette} parts={parts} />
      <View style={styles.liste}>
        {recette.pots.map((p) => {
          const reste = p.regle.type === 'reste';
          const c = reste ? null : teinte(colors, rang++);
          const regle =
            p.regle.type === 'pourcentage'
              ? t('ec30.pct', { pct: p.regle.valeur })
              : p.regle.type === 'fixe'
                ? t('ec30.fixe', { montant: fcfa(p.regle.valeur) })
                : variable
                  ? t('ec30.resteVariable')
                  : t('ec30.reste');
          return (
            <Pressable
              key={p.id}
              onPress={() => router.push({ pathname: '/pot/[id]', params: { id: p.id } })}
              accessibilityRole="button"
              accessibilityLabel={t('ec30.lecturePot', { nom: p.nom, regle, montant: parts[p.id] ?? 0 })}
              android_ripple={{ color: colors.action.ripple }}
              style={styles.ligne}
            >
              <View style={styles.pastille}>{c ? <Pastille couleur={c} /> : null}</View>
              <Text style={[type.bodyStrong, styles.flex, { color: colors.text.primary }]}>{p.nom}</Text>
              <Text style={[type.body, styles.tabulaire, { color: colors.text.secondary }]}>{regle}</Text>
              {!reste ? <Text style={[type.bodyLarge, styles.tabulaire, styles.montant, { color: colors.text.primary }]}>{fcfa(parts[p.id] ?? 0)}</Text> : null}
            </Pressable>
          );
        })}
      </View>
      <Text style={[type.caption, styles.ordre, { color: colors.text.secondary }]}>{t('ec30.ordre')}</Text>
      <Text style={[type.bodyMedium, { color: colors.text.secondary }]}>{t('ec30.mention')}</Text>
    </Ecran>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  entete: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  action: { width: size.touchMin, height: size.touchMin, alignItems: 'center', justifyContent: 'center' },
  source: { marginTop: space.s1, marginBottom: space.s3 },
  base: { marginBottom: space.s2 },
  liste: { marginTop: space.s3, marginBottom: space.s3 },
  ligne: { minHeight: size.rowOne, flexDirection: 'row', alignItems: 'center', columnGap: space.s3, flexWrap: 'wrap' },
  pastille: { width: 12 },
  montant: { minWidth: 96, textAlign: 'right' },
  ordre: { marginBottom: space.s1 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
