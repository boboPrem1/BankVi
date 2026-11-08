import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { moisDe, moisDecale, Calendrier } from '@/composants/Calendrier';
import { Puce, RangeePuces } from '@/composants/Choix';
import { Avatar } from '@/composants/Contenu';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI } from '@/parcours/store';
import { CATEGORIES, NATURES, categorie } from '@/registre/categories';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

interface CategorieProps {
  visible: boolean;
  sens: 'depense' | 'revenu';
  actuelle?: string | undefined;
  onChoix: (id: string) => void;
  onFermer: () => void;
}

/** EC-14 Choix de la catégorie : toucher suffit, sans bouton de validation. */
export function FeuilleCategorie({ visible, sens, actuelle, onChoix, onFermer }: CategorieProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const recentes = useRegistre((r) => r.recentes)
    .map((id) => categorie(id))
    .filter((c) => c && c.sens === sens);
  const choisir = (id: string) => {
    useRegistre.getState().retenirCategorie(id);
    onChoix(id);
  };
  const groupes =
    sens === 'revenu'
      ? [{ nature: null, liste: CATEGORIES.filter((c) => c.sens === 'revenu') }]
      : NATURES.map((n) => ({ nature: n, liste: CATEGORIES.filter((c) => c.sens === 'depense' && c.nature === n) }));

  return (
    <FeuilleBasse visible={visible} titre={t('ec14.titre')} onFermer={onFermer}>
      {recentes.length > 0 ? (
        <View style={styles.bloc}>
          <Text style={[type.captionMedium, { color: colors.text.secondary }]}>{t('ec14.recentes')}</Text>
          <RangeePuces>
            {recentes.map((c) => (
              <Puce key={c!.id} libelle={c!.nom} onPress={() => choisir(c!.id)} />
            ))}
          </RangeePuces>
        </View>
      ) : null}
      {groupes.map((g) => (
        <View key={g.nature ?? 'revenus'}>
          {g.nature ? (
            <Text style={[type.captionMedium, styles.nature, { color: colors.text.secondary }]} accessibilityRole="header">
              {g.nature}
            </Text>
          ) : null}
          {g.liste.map((c, i) => (
            <View key={c.id}>
              <Pressable
                onPress={() => choisir(c.id)}
                accessibilityRole="button"
                accessibilityLabel={`${c.nom}${g.nature ? `, ${t('ec14.nature', { nature: g.nature.toLowerCase() })}` : ''}`}
                accessibilityState={{ selected: c.id === actuelle }}
                android_ripple={{ color: colors.action.ripple }}
                style={styles.ligne}
              >
                <Avatar icone={c.icone} />
                <Text style={[type.bodyStrong, styles.flex, { color: colors.text.primary }]}>{c.nom}</Text>
                {c.id === actuelle ? <Icone nom="check" couleur={colors.text.link} /> : null}
              </Pressable>
              {i < g.liste.length - 1 ? <View style={[styles.separateur, { backgroundColor: colors.border.subtle }]} /> : null}
            </View>
          ))}
        </View>
      ))}
    </FeuilleBasse>
  );
}

interface DateProps {
  visible: boolean;
  date: string;
  onChoix: (date: string) => void;
  onFermer: () => void;
  /** Jours atteignables, compris. Par défaut : 12 mois en arrière et en avant. */
  min?: string;
  max?: string;
}

/** EC-15 Autre date : jusqu'à 12 mois en arrière et en avant ; toucher un jour ferme la feuille. */
export function FeuilleDate({ visible, date, onChoix, onFermer, min, max }: DateProps) {
  const [mois, setMois] = useState(moisDe(date));
  const borne = min !== undefined || max !== undefined;
  return (
    <FeuilleBasse visible={visible} onFermer={onFermer} onAffichee={() => setMois(moisDe(date))}>
      <Calendrier
        mois={mois}
        onMois={setMois}
        aujourdhui={AUJOURDHUI}
        min={min ? moisDe(min) : moisDecale(moisDe(AUJOURDHUI), -12)}
        max={max ? moisDe(max) : moisDecale(moisDe(AUJOURDHUI), 12)}
        estChoisi={(d) => d === date}
        horsLimite={borne ? (d) => (min !== undefined && d < min) || (max !== undefined && d > max) : undefined}
        onJour={onChoix}
      />
    </FeuilleBasse>
  );
}

interface PocheProps {
  visible: boolean;
  titre: string;
  poches: { id: string; nom: string; solde: number }[];
  actuelle?: string | undefined;
  onChoix: (id: string) => void;
  onFermer: () => void;
}

/** Feuille avec les poches actives et leur solde (EC-13, EC-18, EC-22). */
export function FeuillePoche({ visible, titre, poches, actuelle, onChoix, onFermer }: PocheProps) {
  const { colors } = useTheme();
  return (
    <FeuilleBasse visible={visible} titre={titre} onFermer={onFermer}>
      <View>
        {poches.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => onChoix(p.id)}
            accessibilityRole="button"
            accessibilityLabel={`${p.nom}, ${p.solde} francs CFA`}
            accessibilityState={{ selected: p.id === actuelle }}
            android_ripple={{ color: colors.action.ripple }}
            style={styles.ligne}
          >
            <AvatarPoche id={p.id} nom={p.nom} />
            <View style={styles.flex}>
              <Text style={[type.bodyStrong, { color: colors.text.primary }]}>{p.nom}</Text>
              <Text style={[type.body, styles.tabulaire, { color: colors.text.secondary }]}>{fcfa(p.solde)}</Text>
            </View>
            {p.id === actuelle ? <Icone nom="check" couleur={colors.text.link} /> : null}
          </Pressable>
        ))}
      </View>
    </FeuilleBasse>
  );
}

/** Mixx et Flooz : initiale, jamais de logo. Espèces : icône `payments`. */
export function AvatarPoche({ id, nom }: { id: string; nom: string }) {
  return id === 'especes' ? <Avatar icone="payments" /> : <Avatar initiale={nom.charAt(0)} />;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bloc: { rowGap: space.s2 },
  nature: { minHeight: 32, textAlignVertical: 'center', paddingTop: space.s2 },
  ligne: { minHeight: size.rowOne, flexDirection: 'row', alignItems: 'center', columnGap: space.s4 },
  separateur: { height: 1, marginLeft: size.avatar + space.s4 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
