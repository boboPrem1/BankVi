import { calculer, horizon } from '@bankvi/moteur';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { dateCourte, jourDansPhrase } from '@/format/date';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI } from '@/parcours/store';
import { useEtat } from '@/registre/etat';
import { depensesSupposees } from '@/registre/horizon';
import { size, space, type, useTheme } from '@/theme';

type Source = 'EC-38' | 'EC-39' | 'EC-27' | 'chiffre';

interface Ligne {
  libelle: string;
  montant?: number;
  source?: Source;
  /** Ligne de résultat, en Medium. */
  fort?: boolean;
  note?: string;
}

/**
 * EC-24 D'où vient ce chiffre : le calcul se lit comme une addition d'épicier, et chaque
 * ligne ouvre sa source. Sans `date`, le chiffre du jour ; avec, le solde prévu à cette date.
 * C'est un écran de la pile : une source ouverte passe dessus, le retour revient ici.
 */
export default function Origine() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { date } = useLocalSearchParams<{ date?: string }>();
  const etat = useEtat();

  const { titre, sousTitre, manque, lignes, resultats, mention } = useMemo(() => {
    const c = calculer(etat);
    const jour = jourDansPhrase(c.reference, AUJOURDHUI);

    if (date) {
      const points = horizon(etat, 90).points;
      const n = Math.max(0, points.findIndex((p) => p.date === date));
      const point = points[n]!;
      const runs = depensesSupposees(points, n);
      const depenses = runs.reduce((s, r) => s + r.jours * r.chiffre, 0);
      const evenements = points.slice(1, n + 1).reduce((s, p) => s + p.mouvements.reduce((x, m) => x + m.montant, 0), 0);
      // Le revenu variable se répartit par jour : c'est ce qui reste une fois le reste expliqué.
      const reparti = point.solde - c.soldesPerso + depenses - evenements;
      const detail = runs.map((r) => t('ec24.rythme', { count: r.jours, montant: fcfa(r.chiffre) })).join(', ');
      const l: Ligne[] = [{ libelle: t('ec24.aujourdhui'), montant: c.soldesPerso, source: 'EC-38' }];
      if (runs.length > 0) l.push({ libelle: t('ec24.depenses', { detail }), montant: -depenses, source: 'chiffre' });
      if (reparti > 0) l.push({ libelle: t('ec24.revenuReparti'), montant: reparti });
      l.push({ libelle: t('ec24.chargesRevenus'), montant: evenements, source: 'EC-39' });
      return {
        titre:
          point.solde < 0
            ? `${t('ec23.manquerait')} ${t('ec24.soldeDate', { montant: fcfa(-point.solde), date: dateCourte(point.date) })}`
            : t('ec24.soldeDate', { montant: fcfa(point.solde), date: dateCourte(point.date) }),
        sousTitre: undefined,
        manque: point.solde < 0,
        lignes: l,
        resultats: [{ libelle: t('ec24.soldePrevu'), montant: point.solde, fort: true }] as Ligne[],
        mention: t('ec24.incertain'),
      };
    }

    const l: Ligne[] = [];
    for (const p of etat.poches) {
      const solde = c.soldes[p.id] ?? 0;
      if (p.genre === 'perso' && solde !== 0) l.push({ libelle: p.nom, montant: solde, source: 'EC-38' });
    }
    if (c.revenusAttendus > 0) l.push({ libelle: t('ec24.revenuAttendu'), montant: c.revenusAttendus, note: t('ec24.noteRevenu') });
    for (const m of c.mouvements) l.push({ libelle: t('ec24.ligneDate', { nom: m.nom, jour: jourDansPhrase(m.date, AUJOURDHUI) }), montant: m.montant, source: 'EC-39' });
    const reserve = c.reserve + c.reserveSurAttendu;
    if (reserve > 0) l.push({ libelle: t('ec24.reserve'), montant: -reserve, source: 'EC-27' });
    // La poche d'activité reste hors du calcul : une ligne, sans montant additionné.
    for (const p of etat.poches) {
      const solde = c.soldes[p.id] ?? 0;
      if (p.genre === 'activite' && solde !== 0) l.push({ libelle: t('ec24.activite', { nom: p.nom, montant: fcfa(solde) }) });
    }

    const r: Ligne[] = [{ libelle: t('ec24.resteAVivre'), montant: c.resteAVivre, fort: true }];
    if (c.manque === undefined) {
      r.push({ libelle: t('ec24.pourJours', { count: c.jours }), montant: c.chiffreBrut });
      r.push({ libelle: t('ec24.arrondi'), montant: c.chiffre, fort: true });
    }
    return {
      titre: c.manque !== undefined ? t('ec24.manque', { montant: fcfa(c.manque), jour }) : t('ec24.parJour', { montant: fcfa(c.chiffre) }),
      sousTitre: c.manque !== undefined ? undefined : t('ec24.jusquau', { jour }),
      manque: c.manque !== undefined,
      lignes: l,
      resultats: r,
      mention: undefined,
    };
  }, [etat, date, t]);

  const ouvrir = (source: Source) => {
    if (source === 'chiffre') router.push('/origine');
    else if (source === 'EC-27') router.push('/pots');
    else router.push({ pathname: '/a-venir', params: { code: source } });
  };

  return (
    <FeuilleBasse visible sansModal onFermer={() => router.back()}>
      <View style={styles.entete}>
        <View style={styles.titre}>
          {manque ? <Icone nom="warning" couleur={colors.status.warnFg} taille={size.iconSmall} /> : null}
          <Text style={[type.subtitle, styles.tabulaire, styles.flex, { color: manque ? colors.status.warnFg : colors.text.primary }]} accessibilityRole="header">
            {titre}
          </Text>
        </View>
        {sousTitre ? <Text style={[type.body, { color: colors.text.secondary }]}>{sousTitre}</Text> : null}
      </View>
      <View>
        {lignes.map((l, i) => (
          <LigneCalcul key={i} ligne={l} onPress={l.source ? () => ouvrir(l.source!) : undefined}>
            {l.note ? <Text style={[type.caption, styles.note, { color: colors.text.secondary }]}>{l.note}</Text> : null}
          </LigneCalcul>
        ))}
        <View style={[styles.trait, { backgroundColor: colors.border.control }]} />
        {resultats.map((l, i) => (
          <LigneCalcul key={i} ligne={l} />
        ))}
        {mention ? <Text style={[type.caption, styles.note, { color: colors.text.secondary }]}>{mention}</Text> : null}
      </View>
    </FeuilleBasse>
  );
}

function LigneCalcul({ ligne, onPress, children }: { ligne: Ligne; onPress?: (() => void) | undefined; children?: ReactNode }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const style = ligne.fort ? type.bodyStrong : type.bodyLarge;
  const ouvre =
    ligne.source === 'EC-38'
      ? t('ec24.ouvrirPoches')
      : ligne.source === 'EC-39'
        ? t('ec24.ouvrirCharges')
        : ligne.source === 'EC-27'
          ? t('ec24.ouvrirPots')
          : ligne.source === 'chiffre'
            ? t('ec24.ouvrirChiffre')
            : undefined;
  const lecture =
    ligne.montant === undefined ? ligne.libelle : `${t('ec24.lectureLigne', { libelle: ligne.libelle, montant: ligne.montant })}${ouvre ? `, ${ouvre}` : ''}`;
  const contenu = (
    <>
      <View style={styles.ligne}>
        <Text style={[style, styles.flex, { color: colors.text.primary }]}>{ligne.libelle}</Text>
        {ligne.montant !== undefined ? <Text style={[style, styles.tabulaire, { color: colors.text.primary }]}>{fcfa(ligne.montant)}</Text> : null}
        {onPress ? <Icone nom="chevron_right" couleur={colors.text.secondary} taille={size.iconSmall} /> : <View style={styles.sansChevron} />}
      </View>
      {children}
    </>
  );
  if (!onPress) {
    return (
      <View accessible accessibilityLabel={lecture}>
        {contenu}
      </View>
    );
  }
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={lecture} android_ripple={{ color: colors.action.ripple }}>
      {contenu}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  entete: { rowGap: space.s1, marginTop: space.s2 },
  titre: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  ligne: { minHeight: 48, flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  sansChevron: { width: size.iconSmall },
  trait: { height: 1 },
  note: { marginBottom: space.s2 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
