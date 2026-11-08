import { calculer } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampMontant, LigneMontant } from '@/composants/Champs';
import { Bulle } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { AUJOURDHUI } from '@/parcours/store';
import { dejaNote } from '@/registre/bilan';
import { maintenant, useEtat } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { motion, size, space } from '@/theme';

/**
 * EC-19 Bilan : compter. Le champ n'est jamais pré-rempli et aucun montant attendu n'est affiché :
 * il faut compter. Le solde de l'accueil reste visible avant d'ouvrir le bilan.
 */
export default function Compter() {
  const { t } = useTranslation();
  const etat = useEtat();
  const [especes, setEspeces] = useState<number | null>(null);
  const [autres, setAutres] = useState<Record<string, number | null>>({});
  const [deplie, setDeplie] = useState(false);
  const mobiles = etat.poches.filter((p) => p.id !== 'especes' && p.genre === 'perso');

  const voirEcart = () => {
    if (especes === null) return;
    const at = maintenant();
    const compte: Record<string, number> = { especes };
    // Une poche laissée vide n'est pas comptée.
    for (const [poche, v] of Object.entries(autres)) if (v !== null) compte[poche] = v;
    const r = useRegistre.getState();
    const chiffreAvant = calculer(etat).chiffre;
    const bilan = { date: AUJOURDHUI, at, ecart: 0, compte, dejaNote: 0, chiffreAvant, termine: false };
    r.ecrire(Object.entries(compte).map(([poche, montant]) => ({ ecriture: { at, type: 'comptage' as const, poche, montant } })));
    r.modifier({ bilan: { ...bilan, dejaNote: dejaNote(etat, bilan) } });
    router.push('/bilan/ecart');
  };

  return (
    <Ecran
      titre={t('ec19.titre')}
      fermer
      marge={size.gutterList}
      pied={<BoutonPrincipal libelle={t('ec19.voirEcart')} desactive={especes === null} lectureDesactive={t('ec19.desactive')} onPress={voirEcart} />}
    >
      <Animated.View entering={FadeIn.duration(motion.standard)} style={styles.bulle}>
        <Bulle titre texte={t('ec19.question')} />
      </Animated.View>
      <ChampMontant libelle={t('ec19.especes')} unite={t('commun.fcfa')} valeur={especes} onValeur={setEspeces} autoFocus />
      {mobiles.length > 0 ? (
        deplie ? (
          <Animated.View entering={FadeIn.duration(motion.standard)} style={styles.lignes}>
            {mobiles.map((p) => (
              <LigneMontant
                key={p.id}
                nom={p.nom}
                initiale={p.nom.charAt(0)}
                unite={t('commun.fcfa')}
                valeur={autres[p.id] ?? null}
                onValeur={(v) => setAutres({ ...autres, [p.id]: v })}
              />
            ))}
          </Animated.View>
        ) : (
          <View style={styles.lien}>
            <BoutonTexte libelle={t('ec19.mobile')} onPress={() => setDeplie(true)} />
          </View>
        )
      ) : null}
    </Ecran>
  );
}

const styles = StyleSheet.create({
  bulle: { marginTop: space.s2, marginBottom: space.s5, maxWidth: '80%' },
  lignes: { marginTop: space.s3 },
  lien: { alignItems: 'flex-start', marginLeft: -space.s3, marginTop: space.s2 },
});
