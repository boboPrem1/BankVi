import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Pressable, StyleSheet, Text, View } from 'react-native';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal } from '@/composants/Boutons';
import { Calendrier, moisDe, moisDecale } from '@/composants/Calendrier';
import { Ecran } from '@/composants/Ecran';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI } from '@/parcours/store';
import { defaire, noter } from '@/registre/actions';
import { categorie } from '@/registre/categories';
import { decaler } from '@/registre/etat';
import { radius, size, space, type, useTheme } from '@/theme';

const LIMITE = 62;

/** Toutes les dates entre deux dates comprises. */
function entre(a: string, b: string): string[] {
  const [debut, fin] = a <= b ? [a, b] : [b, a];
  const dates: string[] = [];
  for (let d = debut; d <= fin && dates.length <= LIMITE; d = decaler(d, 1)) dates.push(d);
  return dates;
}

/** EC-16 Plusieurs dates : la même saisie sur plusieurs jours, avec le total avant de valider. */
export default function PlusieursDates() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const p = useLocalSearchParams<{ sens: 'depense' | 'revenu'; montant: string; categorie: string; poche: string; description?: string }>();
  const montant = Number(p.montant);
  const sens = p.sens === 'revenu' ? 'revenu' : 'depense';
  const nom = p.description || categorie(p.categorie)?.nom || '';

  const [mode, setMode] = useState<'jours' | 'periode'>('jours');
  const [jours, setJours] = useState<string[]>([]);
  const [periode, setPeriode] = useState<[string] | [string, string] | []>([]);
  const [mois, setMois] = useState(moisDe(AUJOURDHUI));
  const [limite, setLimite] = useState(false);

  const dates = mode === 'jours' ? jours : periode.length === 2 ? entre(periode[0], periode[1]) : periode.length === 1 ? [periode[0]] : [];
  const n = dates.length;
  const prevues = dates.filter((d) => d > AUJOURDHUI).length;

  const annoncerTotal = (k: number) =>
    AccessibilityInfo.announceForAccessibility(`${k} ${sens === 'depense' ? t('saisie.depense').toLowerCase() : t('saisie.revenu').toLowerCase()}, ${k * montant} francs CFA`);

  const toucher = (d: string) => {
    if (mode === 'jours') {
      if (jours.includes(d)) {
        const suivant = jours.filter((x) => x !== d);
        setJours(suivant);
        setLimite(false);
        annoncerTotal(suivant.length);
      } else if (jours.length >= LIMITE) {
        setLimite(true);
      } else {
        setJours([...jours, d].sort());
        annoncerTotal(jours.length + 1);
      }
      return;
    }
    // Période : début, puis fin ; un troisième toucher recommence.
    if (periode.length !== 1) setPeriode([d]);
    else {
      const ensemble = entre(periode[0], d);
      if (ensemble.length > LIMITE) setLimite(true);
      else {
        setLimite(false);
        setPeriode(periode[0] <= d ? [periode[0], d] : [d, periode[0]]);
        annoncerTotal(ensemble.length);
      }
    }
  };

  const cle = sens === 'depense' ? 'ec16.total' : 'ec16.totalRevenu';
  const total =
    n === 0
      ? t('ec16.aucune')
      : `${prevues > 0 && prevues < n ? t('ec16.mixte', { reelles: n - prevues, prevues }) : ''}${t(cle, { count: n, montant: fcfa(montant), total: fcfa(n * montant) })}`;

  const enregistrer = () => {
    const trace = noter({ sens, montant, categorie: p.categorie, poche: p.poche, description: p.description || undefined, dates, origine: 'toi' });
    router.dismissTo('/accueil');
    annoncer(t('ec16.notees', { count: n }), () => defaire(trace));
  };

  return (
    <Ecran
      titre={t('ec16.titre')}
      marge={size.gutterList}
      pied={
        <BoutonPrincipal
          libelle={n === 0 ? t('ec16.enregistrer') : t(sens === 'depense' ? 'ec16.enregistrer' : 'ec16.enregistrerRevenu', { count: n, context: undefined })}
          desactive={n === 0}
          onPress={enregistrer}
        />
      }
    >
      <Text style={[type.bodyStrong, styles.tabulaire, styles.rappel, { color: colors.text.primary }]}>{`${nom} · ${fcfa(montant)}`}</Text>
      <View style={styles.choix} accessibilityRole="radiogroup">
        {(['jours', 'periode'] as const).map((m) => (
          <Pressable
            key={m}
            onPress={() => {
              setMode(m);
              setLimite(false);
            }}
            accessibilityRole="radio"
            accessibilityState={{ checked: mode === m }}
            style={[styles.segment, mode === m ? { backgroundColor: colors.bg.selected } : { borderWidth: 1, borderColor: colors.border.control }]}
          >
            {mode === m ? <Icone nom="check" couleur={colors.text.onSelected} taille={size.iconSmall} /> : null}
            <Text style={[type.bodyMedium, { color: mode === m ? colors.text.onSelected : colors.text.primary }]}>
              {m === 'jours' ? t('ec16.jours') : t('ec16.periode')}
            </Text>
          </Pressable>
        ))}
      </View>
      <Calendrier
        mois={mois}
        onMois={setMois}
        aujourdhui={AUJOURDHUI}
        min={moisDecale(moisDe(AUJOURDHUI), -12)}
        max={moisDecale(moisDe(AUJOURDHUI), 12)}
        estChoisi={(d) => (mode === 'jours' ? jours.includes(d) : periode.includes(d as never))}
        bande={mode === 'periode' && periode.length === 2 ? periode : undefined}
        onJour={toucher}
      />
      <Text style={[type.bodyLarge, styles.tabulaire, styles.total, { color: colors.text.primary }]} accessibilityLiveRegion="polite">
        {total}
      </Text>
      {limite ? <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec16.limite')}</Text> : null}
    </Ecran>
  );
}

const styles = StyleSheet.create({
  rappel: { marginTop: space.s1, marginBottom: space.s3 },
  choix: { flexDirection: 'row', columnGap: space.s2, marginBottom: space.s3 },
  segment: { height: 40, paddingHorizontal: space.s4, borderRadius: radius.full, flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  total: { marginTop: space.s4 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
