import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Pressable, StyleSheet, Text, View } from 'react-native';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal } from '@/composants/Boutons';
import { ChampMontant, type RefSaisie } from '@/composants/Champs';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { Pastille, couleurPot } from '@/composants/Pots';
import { fcfa, nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { maintenant, useEtat } from '@/registre/etat';
import { chiffreAvecEcriture, type EtatPot } from '@/registre/pots';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

/** Couleur de pastille : les six du design system, puis gris. */
export function teinte(colors: ReturnType<typeof useTheme>['colors'], rang: number | null): string | null {
  if (rang === null) return null;
  return rang < 6 ? couleurPot(colors, rang) : colors.border.control;
}

/** Jauge de 8 dp : reste ÷ cible, couleur du pot. Ignorée par TalkBack, sa valeur est écrite. */
export function Jauge({ part, couleur }: { part: number; couleur: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.jauge, { backgroundColor: colors.border.subtle }]} importantForAccessibility="no-hide-descendants">
      <View style={{ width: `${Math.round(Math.max(0, Math.min(1, part)) * 100)}%`, height: 8, borderRadius: 4, backgroundColor: couleur }} />
    </View>
  );
}

/**
 * Feuille « Déplacer de l'argent » (EC-28) : seule la part virtuelle bouge, aucune poche réelle.
 * L'effet sur le chiffre est écrit avant de valider ; un pot ne bloque jamais une dépense.
 */
export function FeuilleDeplacer({ visible, pots, depart, onFermer }: { visible: boolean; pots: EtatPot[]; depart: { de?: string; vers?: string }; onFermer: () => void }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const etat = useEtat();
  const ref = useRef<RefSaisie>(null);
  const choisissables = pots.filter((p) => p.pot.regle.type !== 'reste' || p.reste > 0);
  const [de, setDe] = useState<string | undefined>(depart.de);
  const [vers, setVers] = useState<string | undefined>(depart.vers);
  const [montant, setMontant] = useState<number | null>(null);
  const [choix, setChoix] = useState<'de' | 'vers' | null>(null);

  const pDe = pots.find((p) => p.pot.id === de);
  const pVers = pots.find((p) => p.pot.id === vers);
  const trop = pDe !== undefined && montant !== null && montant > pDe.reste;
  const valide = pDe && pVers && pDe !== pVers && montant !== null && montant > 0 && !trop;

  let effet: string | null = null;
  if (valide) {
    if (pDe.quotidien === pVers.quotidien) effet = t('ec28.inchange');
    else {
      const { avant, apres } = chiffreAvecEcriture(etat, { id: '__deplacement', at: maintenant(), type: 'deplacement', de: pDe.pot.id, vers: pVers.pot.id, montant });
      effet = t('ec28.effet', { avant: nombre(avant), apres: nombre(apres) });
    }
  }

  // L'effet est annoncé dès qu'il change.
  useEffect(() => {
    if (effet) AccessibilityInfo.announceForAccessibility(effet);
  }, [effet]);

  const deplacer = () => {
    if (!valide || !pDe || !pVers || montant === null) return;
    const [id] = useRegistre.getState().ecrire([{ ecriture: { at: maintenant(), type: 'deplacement', de: pDe.pot.id, vers: pVers.pot.id, montant } }]);
    onFermer();
    annoncer(t('ec28.deplaces', { montant: fcfa(montant) }), () => id && useRegistre.getState().annuler([id]));
  };

  const ligne = (role: 'de' | 'vers', p: EtatPot | undefined) => {
    const c = p ? teinte(colors, p.couleur) : null;
    return (
      <Pressable
        onPress={() => setChoix(choix === role ? null : role)}
        accessibilityRole="button"
        accessibilityLabel={`${role === 'de' ? t('ec28.de') : t('ec28.vers')}, ${p ? t('ec28.ligne', { nom: p.pot.nom, montant: fcfa(p.reste) }) : t('ec28.choisirPot')}`}
        android_ripple={{ color: colors.action.ripple }}
        style={styles.ligne}
      >
        <Text style={[type.bodyMedium, styles.role, { color: colors.text.secondary }]}>{role === 'de' ? t('ec28.de') : t('ec28.vers')}</Text>
        {c ? <Pastille couleur={c} /> : null}
        <Text style={[type.bodyLarge, styles.flex, styles.tabulaire, { color: colors.text.primary }]} numberOfLines={1}>
          {p ? t('ec28.ligne', { nom: p.pot.nom, montant: fcfa(p.reste) }) : t('ec28.choisirPot')}
        </Text>
        <Icone nom="chevron_right" couleur={colors.text.secondary} taille={size.iconSmall} />
      </Pressable>
    );
  };

  return (
    <FeuilleBasse
      visible={visible}
      titre={t('ec28.feuilleTitre')}
      onFermer={onFermer}
      onAffichee={() => {
        setDe(depart.de);
        setVers(depart.vers);
        setMontant(null);
        setChoix(null);
        ref.current?.focus();
      }}
      pied={<BoutonPrincipal libelle={t('ec28.deplacerBouton')} desactive={!valide} onPress={deplacer} />}
    >
      <View>
        {ligne('de', pDe)}
        {choix === 'de' ? <ListePots pots={choisissables} onChoix={(id) => (setDe(id), setChoix(null))} /> : null}
        {ligne('vers', pVers)}
        {choix === 'vers' ? <ListePots pots={choisissables} onChoix={(id) => (setVers(id), setChoix(null))} /> : null}
      </View>
      <ChampMontant
        ref={ref}
        libelle={t('ec28.montant')}
        unite={t('commun.fcfa')}
        valeur={montant}
        onValeur={setMontant}
        message={trop && pDe ? { texte: t('ec28.tropGrand', { nom: pDe.pot.nom }) , attention: true } : undefined}
      />
      {effet ? (
        <Text
          style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}
          accessibilityLiveRegion="polite"
        >
          {effet}
        </Text>
      ) : null}
    </FeuilleBasse>
  );
}

function ListePots({ pots, onChoix }: { pots: EtatPot[]; onChoix: (id: string) => void }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <View style={[styles.liste, { backgroundColor: colors.bg.subtle }]}>
      {pots.map((p) => {
        const c = teinte(colors, p.couleur);
        return (
          <Pressable key={p.pot.id} onPress={() => onChoix(p.pot.id)} accessibilityRole="button" android_ripple={{ color: colors.action.ripple }} style={styles.choix}>
            {c ? <Pastille couleur={c} /> : null}
            <Text style={[type.body, styles.tabulaire, { color: colors.text.primary }]}>{t('ec28.ligne', { nom: p.pot.nom, montant: fcfa(p.reste) })}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  jauge: { height: 8, borderRadius: 4, overflow: 'hidden' },
  ligne: { minHeight: 56, flexDirection: 'row', alignItems: 'center', columnGap: space.s3 },
  role: { width: 40 },
  liste: { borderRadius: 12, paddingVertical: space.s1, marginBottom: space.s2 },
  choix: { minHeight: 48, flexDirection: 'row', alignItems: 'center', columnGap: space.s3, paddingHorizontal: space.s3 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
