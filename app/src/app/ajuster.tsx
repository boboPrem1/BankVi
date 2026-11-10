import { effetRecette, repartir, type Recette } from '@bankvi/moteur';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Pressable, StyleSheet, Text, View } from 'react-native';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal } from '@/composants/Boutons';
import { ChampCompact, lireMontant } from '@/composants/Champs';
import { teinte } from '@/composants/Deplacer';
import { Ecran } from '@/composants/Ecran';
import { BarrePots, Pastille } from '@/composants/Pots';
import { dateLongue } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { etatDepuis, recetteParId } from '@/parcours/etat';
import { useParcours } from '@/parcours/store';
import { adopterOuRanger } from '@/registre/adoption';
import { useEtat } from '@/registre/etat';
import { baseDe, idCopie, origineDe } from '@/registre/pots';
import { useRegistre } from '@/registre/store';
import { radius, size, space, type, useTheme } from '@/theme';

/** EC-32 Ajuster : la recette au doigt, par pas de 1 %, avec une somme toujours à 100 %. */
export default function Ajuster() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { id, depuis } = useLocalSearchParams<{ id: string; depuis?: 'parcours' | 'app' | 'recette' }>();
  const reponses = useParcours();
  const etatApp = useEtat();
  const parcours = depuis === 'parcours';
  const origine = recetteParId(id) as Recette;
  const variable = reponses.typeRevenu === 'variable';

  const etat = useMemo(() => (parcours ? etatDepuis({ ...reponses, recetteAdoptee: null }) : etatApp), [parcours, reponses, etatApp]);
  const base = parcours ? (reponses.montantRevenu ?? 0) : baseDe(etatApp);

  const pcts = origine.pots.filter((p) => p.regle.type === 'pourcentage');
  const dernier = pcts[pcts.length - 1];
  const [valeurs, setValeurs] = useState<Record<string, number>>(() =>
    Object.fromEntries(origine.pots.flatMap((p) => (p.regle.type === 'reste' ? [] : [[p.id, p.regle.valeur]]))),
  );
  const [butee, setButee] = useState(false);

  const somme = pcts.filter((p) => p !== dernier).reduce((s, p) => s + (valeurs[p.id] ?? 0), 0);
  const actuelles = { ...valeurs, ...(dernier ? { [dernier.id]: 100 - somme } : {}) };
  const change = origine.pots.some((p) => p.regle.type !== 'reste' && actuelles[p.id] !== p.regle.valeur);

  const copie: Recette = useMemo(() => {
    const base0 = origineDe(origine) ?? origine;
    return {
      ...origine,
      id: idCopie('ajustee', base0),
      nom: t('ec30.dApres', { nom: base0.nom }),
      pots: origine.pots.map((p) => (p.regle.type === 'reste' ? p : { ...p, regle: { ...p.regle, valeur: actuelles[p.id] ?? 0 } })),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origine, JSON.stringify(actuelles), t]);

  const parts = repartir(base, copie);
  const effet = useMemo(() => effetRecette(etat, copie), [etat, copie]);
  const texteEffet =
    effet.manque !== undefined
      ? t('ec32.manque')
      : variable
        ? t('ec32.effetDate', { date: dateLongue(effet.depuis), montant: fcfa(effet.chiffre) })
        : t('ec32.effet', { montant: fcfa(effet.chiffre) });

  // L'effet est annoncé à la fin d'un réglage, pas à chaque pas.
  const minuterie = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (minuterie.current) clearTimeout(minuterie.current);
    minuterie.current = setTimeout(() => AccessibilityInfo.announceForAccessibility(texteEffet), 800);
    return () => {
      if (minuterie.current) clearTimeout(minuterie.current);
    };
  }, [texteEffet]);

  const regler = (potId: string, v: number) => {
    const reste = 100 - somme + (valeurs[potId] ?? 0);
    const borne = Math.max(0, Math.min(reste, Math.round(v)));
    setButee(v > reste);
    setValeurs((x) => ({ ...x, [potId]: borne }));
  };

  const enregistrer = () => {
    if (!change) return;
    if (parcours) {
      const r = useRegistre.getState();
      r.modifier({ recettesPerso: [...r.recettesPerso, copie] });
      const avant = reponses.recetteChoisie;
      reponses.modifier({ recetteChoisie: copie.id });
      router.back();
      annoncer(t('ec32.enregistree'), () => useParcours.getState().modifier({ recetteChoisie: avant }));
      return;
    }
    adopterOuRanger(etatApp, copie, t('ec32.enregistree'));
  };

  let rang = 0;
  return (
    <Ecran titre={t('ec32.titre')} pied={<BoutonPrincipal libelle={t('ec32.enregistrer')} desactive={!change} onPress={enregistrer} />}>
      <Text style={[type.bodyLarge, styles.base, { color: colors.text.secondary }]}>
        {variable ? t('ec27.plancher', { montant: fcfa(base) }) : t('ec30.base', { montant: fcfa(base) })}
      </Text>
      <BarrePots recette={copie} parts={parts} />
      <View style={styles.pots}>
        {origine.pots.map((p) => {
          if (p.regle.type === 'reste') return null;
          const couleur = teinte(colors, rang++) ?? colors.border.control;
          const v = actuelles[p.id] ?? 0;
          return (
            <View key={p.id}>
              <View style={styles.ligne}>
                <Pastille couleur={couleur} />
                <Text style={[type.bodyStrong, styles.flex, { color: colors.text.primary }]}>{p.nom}</Text>
                {p.regle.type === 'pourcentage' ? <Text style={[type.bodyStrong, styles.tabulaire, { color: colors.text.primary }]}>{`${v} %`}</Text> : null}
                <Text style={[type.body, styles.tabulaire, styles.montant, { color: colors.text.secondary }]}>{fcfa(parts[p.id] ?? 0)}</Text>
              </View>
              {p.regle.type === 'fixe' ? (
                <ChampCompact
                  libelle={t('ec29.chaqueRevenu')}
                  value={v ? nombre(v) : ''}
                  keyboardType="number-pad"
                  onChangeText={(x) => setValeurs((s) => ({ ...s, [p.id]: lireMontant(x) ?? 0 }))}
                />
              ) : p === dernier ? (
                <Text style={[type.caption, styles.mention, { color: colors.text.secondary }]}>{v === 0 && butee ? t('ec32.dernierZero') : t('ec32.dernier')}</Text>
              ) : (
                <Curseur nom={p.nom} valeur={v} montant={parts[p.id] ?? 0} couleur={couleur} onValeur={(x) => regler(p.id, x)} />
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.effet}>
        {effet.manque !== undefined ? <Icone nom="warning" couleur={colors.status.warnFg} taille={size.iconSmall} /> : null}
        <Text style={[type.bodyLarge, styles.flex, styles.tabulaire, { color: effet.manque !== undefined ? colors.status.warnFg : colors.text.primary }]}>{texteEffet}</Text>
      </View>
    </Ecran>
  );
}

/** Curseur de 1 %, avec − et + pour qui ne glisse pas. La barre suit le doigt, sans rebond. */
function Curseur({ nom, valeur, montant, couleur, onValeur }: { nom: string; valeur: number; montant: number; couleur: string; onValeur: (v: number) => void }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [largeur, setLargeur] = useState(0);
  const depuisX = (x: number) => onValeur(largeur > 0 ? (x / largeur) * 100 : valeur);
  return (
    <View style={styles.curseur}>
      <Pas icone="remove" lecture={t('ec32.moins', { nom })} onPress={() => onValeur(valeur - 1)} />
      <View
        style={styles.rail}
        onLayout={(e) => setLargeur(e.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={(e) => depuisX(e.nativeEvent.locationX)}
        onResponderMove={(e) => depuisX(e.nativeEvent.locationX)}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={t('ec32.lecture', { nom, pct: valeur, montant })}
        accessibilityValue={{ min: 0, max: 100, now: valeur, text: `${valeur} %` }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(e) => onValeur(valeur + (e.nativeEvent.actionName === 'increment' ? 1 : -1))}
      >
        <View pointerEvents="none" style={[styles.fond, { backgroundColor: colors.border.subtle }]}>
          <View style={{ width: `${valeur}%`, height: 4, borderRadius: radius.full, backgroundColor: couleur }} />
        </View>
        <View pointerEvents="none" style={[styles.poignee, { left: (largeur * valeur) / 100 - 12, backgroundColor: couleur, borderColor: colors.bg.canvas }]} />
      </View>
      <Pas icone="add" lecture={t('ec32.plus', { nom })} onPress={() => onValeur(valeur + 1)} />
    </View>
  );
}

function Pas({ icone, lecture, onPress }: { icone: 'add' | 'remove'; lecture: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={lecture} android_ripple={{ color: colors.action.ripple, borderless: true, radius: 24 }} style={styles.pas}>
      <Icone nom={icone} couleur={colors.text.link} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  base: { marginTop: space.s1, marginBottom: space.s2 },
  pots: { marginTop: space.s4, rowGap: space.s3 },
  ligne: { minHeight: 24, flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  montant: { minWidth: 88, textAlign: 'right' },
  mention: { marginTop: space.s1, marginLeft: 12 + space.s2 },
  curseur: { height: 48, flexDirection: 'row', alignItems: 'center', columnGap: space.s1, marginTop: space.s1 },
  rail: { flex: 1, height: 48, justifyContent: 'center' },
  fond: { height: 4, borderRadius: radius.full, overflow: 'hidden' },
  poignee: { position: 'absolute', top: 12, width: 24, height: 24, borderRadius: 12, borderWidth: 2 },
  pas: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  effet: { flexDirection: 'row', alignItems: 'flex-start', columnGap: space.s2, marginTop: space.s4 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
