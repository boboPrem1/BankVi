import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { Bulle } from '@/composants/Contenu';
import { teinte } from '@/composants/Deplacer';
import { Ecran } from '@/composants/Ecran';
import { BarrePots, Pastille } from '@/composants/Pots';
import { useEtat } from '@/registre/etat';
import { lireLien, memeRecette } from '@/registre/partage';
import { idCopie, recetteCourante } from '@/registre/pots';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

/** EC-36 Recette reçue : rien ne change sans confirmation, et son contenu n'est jamais du code. L2. */
export default function RecetteRecue() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { d } = useLocalSearchParams<{ d?: string }>();
  const etat = useEtat();
  const [recette] = useState(() => lireLien(d, idCopie('recue')));
  const fermer = () => (router.canGoBack() ? router.dismissTo('/accueil') : router.replace('/accueil'));

  if (!recette) {
    return (
      <Ecran titre={t('ec36.titre')} fermer onRetour={fermer} pied={<BoutonPrincipal libelle={t('ec36.fermer')} onPress={fermer} />}>
        <Bulle texte={t('ec36.invalide')} />
      </Ecran>
    );
  }

  const active = recetteCourante(etat)?.recette;
  const deja = active !== undefined && memeRecette(active, recette);
  const voir = () => {
    const r = useRegistre.getState();
    r.modifier({ recettesPerso: [...r.recettesPerso.filter((x) => x.id !== recette.id), recette] });
    router.push({ pathname: '/apercu-recette', params: { id: recette.id, depuis: 'recue' } });
  };

  let rang = 0;
  return (
    <Ecran
      titre={t('ec36.titre')}
      fermer
      onRetour={fermer}
      pied={
        deja ? (
          <BoutonPrincipal libelle={t('ec36.fermer')} onPress={fermer} />
        ) : (
          <>
            <BoutonPrincipal libelle={t('ec36.voir')} onPress={voir} />
            <BoutonTexte libelle={t('ec36.ignorer')} onPress={fermer} />
          </>
        )
      }
    >
      <View style={styles.bulle}>
        <Bulle texte={t('ec36.bulle')} />
      </View>
      {/* Texte simple : les noms sont affichés tels quels, sans lien ni mise en forme. */}
      <Text style={[type.title, styles.nom, { color: colors.text.primary }]} accessibilityRole="header">
        {recette.nom}
      </Text>
      <BarrePots recette={recette} />
      <View style={styles.liste}>
        {recette.pots.map((p) => {
          const c = p.regle.type === 'reste' ? null : teinte(colors, rang++);
          const regle = p.regle.type === 'pourcentage' ? `${p.regle.valeur} %` : p.regle.type === 'reste' ? t('ec30.reste') : t('ec30.fixe', { montant: p.regle.valeur });
          return (
            <View key={p.id} style={styles.ligne} accessible accessibilityLabel={`${p.nom}, ${regle}.`}>
              <View style={styles.pastille}>{c ? <Pastille couleur={c} /> : null}</View>
              <Text style={[type.bodyLarge, styles.flex, { color: colors.text.primary }]} numberOfLines={1}>
                {p.nom}
              </Text>
              <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>{regle}</Text>
            </View>
          );
        })}
      </View>
      <Text style={[type.bodyMedium, { color: colors.text.secondary }]}>{deja ? t('ec36.deja') : t('ec36.mention')}</Text>
    </Ecran>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bulle: { marginTop: space.s2, marginBottom: space.s4 },
  nom: { marginBottom: space.s2 },
  liste: { marginTop: space.s3, marginBottom: space.s3 },
  ligne: { minHeight: 48, flexDirection: 'row', alignItems: 'center', columnGap: space.s3 },
  pastille: { width: 12 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});

export const _taille = size;
