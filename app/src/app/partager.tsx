import { CATALOGUE } from '@bankvi/moteur';
import * as Clipboard from 'expo-clipboard';
import { useTranslation } from 'react-i18next';
import { Share, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { teinte } from '@/composants/Deplacer';
import { Ecran } from '@/composants/Ecran';
import { Icone } from '@/icones/Icone';
import { useEtat } from '@/registre/etat';
import { lienDe } from '@/registre/partage';
import { recetteCourante } from '@/registre/pots';
import { artwork, radius, size, space, type, useTheme } from '@/theme';

const BLANC = artwork.text;

/** EC-35 Partager : sa façon de répartir, à son initiative, sans jamais un montant. L2. */
export default function Partager() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const etat = useEtat();
  const recette = recetteCourante(etat)?.recette;
  if (!recette) return <Ecran titre={t('ec35.titre')}>{null}</Ecran>;

  const cote = height < 600 ? 200 : height < 700 ? 240 : Math.min(312, width - 2 * size.gutterOnboarding);
  let rang = 0;
  const pots = recette.pots.map((p) => ({
    id: p.id,
    texte: `${p.nom} ${p.regle.type === 'pourcentage' ? `${p.regle.valeur} %` : p.regle.type === 'reste' ? t('ec30.reste') : t('ec30.fixe', { montant: p.regle.valeur })}`,
    couleur: p.regle.type === 'reste' ? null : teinte(colors, rang++),
  }));
  const nomsCatalogue = new Set(Object.values(CATALOGUE).flatMap((r) => r.pots.map((p) => p.nom)));
  const personnels = recette.pots.some((p) => !nomsCatalogue.has(p.nom));
  const lien = lienDe(recette);
  const message = t('ec35.message', { nom: recette.nom, pots: pots.map((p) => p.texte).join(', '), lien });

  return (
    <Ecran
      titre={t('ec35.titre')}
      pied={
        <>
          <BoutonPrincipal libelle={t('ec35.partagerWhatsapp')} onPress={() => void Share.share({ message })} />
          <BoutonTexte
            libelle={t('ec35.copier')}
            onPress={() => {
              void Clipboard.setStringAsync(lien).then(() => annoncer(t('ec35.copie')));
            }}
          />
        </>
      }
    >
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={t('ec35.lecture', { nom: recette.nom.replaceAll(' / ', ', '), pots: pots.map((p) => p.texte).join(', ') })}
        style={[styles.carte, { width: cote, height: cote }]}
      >
        {/* Paysage générique : les collines de l'utilisateur révéleraient la forme de sa courbe. */}
        <Svg width={cote} height={cote} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="ciel" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={artwork.skies.suit[0]} />
              <Stop offset="1" stopColor={artwork.skies.suit[1]} />
            </LinearGradient>
          </Defs>
          <Rect width={cote} height={cote} fill="url(#ciel)" />
          <Path d={`M0 ${cote * 0.82} Q ${cote * 0.25} ${cote * 0.7} ${cote * 0.5} ${cote * 0.8} T ${cote} ${cote * 0.74} L ${cote} ${cote} L 0 ${cote} Z`} fill="rgba(255,255,255,0.12)" />
          <Path d={`M0 ${cote * 0.9} Q ${cote * 0.35} ${cote * 0.8} ${cote * 0.65} ${cote * 0.9} T ${cote} ${cote * 0.86} L ${cote} ${cote} L 0 ${cote} Z`} fill="rgba(255,255,255,0.18)" />
        </Svg>
        <View style={styles.dedans}>
          <Text style={[type.subtitle, { color: BLANC }]}>{t('ec35.carte')}</Text>
          <Text style={[type.title, { color: BLANC }]}>{recette.nom}</Text>
          <View style={styles.pots}>
            {pots.map((p) => (
              <View key={p.id} style={styles.pot}>
                {p.couleur ? <View style={[styles.pastille, { backgroundColor: p.couleur }]} /> : null}
                <Text style={[type.bodyLarge, { color: BLANC }]} numberOfLines={1}>
                  {p.texte}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={[type.bodyMedium, styles.marque, { color: BLANC }]}>{t('ec35.marque')}</Text>
      </View>
      <View style={styles.rappel}>
        <Icone nom="info" couleur={colors.text.secondary} taille={size.iconSmall} />
        <Text style={[type.body, styles.flex, { color: colors.text.secondary }]}>
          {t('ec35.rappel')}
          {personnels ? ` ${t('ec35.nomsVisibles')}` : ''}
        </Text>
      </View>
    </Ecran>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  carte: { alignSelf: 'center', borderRadius: radius.md, overflow: 'hidden', marginTop: space.s2 },
  dedans: { padding: space.s4, rowGap: space.s1 },
  pots: { marginTop: space.s2, rowGap: space.s1 },
  pot: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  pastille: { width: 12, height: 12, borderRadius: 6, borderWidth: 1.5, borderColor: BLANC },
  marque: { position: 'absolute', left: space.s4, bottom: space.s3 },
  rappel: { flexDirection: 'row', alignItems: 'flex-start', columnGap: space.s2, marginTop: space.s3 },
});
