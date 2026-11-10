import { forwardRef, useState, type ComponentRef, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { size, space, type, useTheme } from '@/theme';

/** Instance d'un champ de saisie, pour `focus()` (le type a changé avec React Native 0.88). */
export type RefSaisie = ComponentRef<typeof TextInput>;

/** 8 chiffres au plus : 99 999 999 ; au-delà, la frappe est ignorée. */
export function lireMontant(texte: string): number | null {
  const chiffres = texte.replace(/\D/g, '').slice(0, 8);
  return chiffres === '' ? null : Number(chiffres);
}

interface Message {
  texte: string;
  erreur?: boolean;
  /** Un fait d'attention (ambre, `warning`) : jamais une faute. */
  attention?: boolean;
  icone?: 'error' | 'cloud_off';
}

function MessageSous({ message }: { message?: Message | undefined }) {
  const { colors } = useTheme();
  if (!message) return null;
  const couleur = message.erreur ? colors.status.errorFg : message.attention ? colors.status.warnFg : colors.text.secondary;
  return (
    <View
      style={styles.message}
      accessibilityLiveRegion={message.erreur ? 'assertive' : 'polite'}
      accessible
      accessibilityLabel={message.texte}
    >
      {message.icone || message.erreur || message.attention ? (
        <Icone nom={message.icone ?? (message.attention ? 'warning' : 'error')} couleur={couleur} taille={16} />
      ) : null}
      <Text style={[type.caption, { color: couleur, flexShrink: 1 }]}>{message.texte}</Text>
    </View>
  );
}

function Soulignement({ actif, erreur }: { actif: boolean; erreur?: boolean | undefined }) {
  const { colors } = useTheme();
  const couleur = erreur ? colors.status.errorFg : actif ? colors.border.focus : colors.border.control;
  return <View style={{ height: actif || erreur ? 2 : 1, marginTop: actif || erreur ? 0 : 1, backgroundColor: couleur }} />;
}

interface MontantProps extends Omit<TextInputProps, 'value' | 'onChange' | 'style'> {
  libelle: string;
  valeur: number | null;
  onValeur: (v: number | null) => void;
  unite: string;
  message?: Message | undefined;
}

/** Champ montant : 72 dp, chiffres de 36 sp, « FCFA » à droite (design system, champ montant). */
export const ChampMontant = forwardRef<RefSaisie, MontantProps>(function ChampMontant(
  { libelle, valeur, onValeur, unite, message, onFocus, onBlur, ...reste },
  ref,
) {
  const { colors } = useTheme();
  const [actif, setActif] = useState(false);
  return (
    <View>
      <Text style={[type.bodyMedium, { color: actif ? colors.border.focus : colors.text.secondary }]}>{libelle}</Text>
      <View style={styles.ligneMontant}>
        <TextInput
          ref={ref}
          value={valeur === null ? '' : nombre(valeur)}
          onChangeText={(t) => onValeur(lireMontant(t))}
          placeholder="0"
          placeholderTextColor={colors.text.tertiary}
          keyboardType="number-pad"
          cursorColor={colors.border.focus}
          selectionColor={colors.border.focus}
          accessibilityLabel={`${libelle}, ${unite}`}
          style={[type.amountInput, styles.saisieMontant, { color: colors.text.primary }]}
          onFocus={(e) => {
            setActif(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setActif(false);
            onBlur?.(e);
          }}
          {...reste}
        />
        <Text style={[type.subtitle, { color: colors.text.secondary }]}>{unite}</Text>
      </View>
      <Soulignement actif={actif} erreur={message?.erreur} />
      <MessageSous message={message} />
    </View>
  );
});

interface CompactProps extends Omit<TextInputProps, 'style'> {
  libelle: string;
  largeur?: number;
  message?: Message | undefined;
  /** Élément fixe à gauche de la saisie (indicatif « +228 »). */
  avant?: ReactNode;
}

/** Champ compact : 56 dp, pour le jour du mois, un nom court ou un numéro. */
export const ChampCompact = forwardRef<RefSaisie, CompactProps>(function ChampCompact(
  { libelle, largeur, message, avant, onFocus, onBlur, ...reste },
  ref,
) {
  const { colors } = useTheme();
  const [actif, setActif] = useState(false);
  return (
    <View>
      <Text style={[type.bodyMedium, { color: actif ? colors.border.focus : colors.text.secondary }]}>{libelle}</Text>
      {/* La largeur fixe (120 dp pour un jour) vaut pour la saisie, pas pour le libellé. */}
      <View style={[styles.ligneCompacte, largeur ? { width: largeur } : undefined]}>
        {avant}
        <View style={styles.flex}>
          <TextInput
            ref={ref}
            placeholderTextColor={colors.text.tertiary}
            cursorColor={colors.border.focus}
            selectionColor={colors.border.focus}
            style={[type.bodyLarge, styles.saisieCompacte, { color: colors.text.primary }]}
            onFocus={(e) => {
              setActif(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setActif(false);
              onBlur?.(e);
            }}
            {...reste}
          />
          <Soulignement actif={actif} erreur={message?.erreur} />
        </View>
      </View>
      <MessageSous message={message} />
    </View>
  );
});

interface LigneProps extends Omit<TextInputProps, 'value' | 'style'> {
  nom: string;
  initiale: string;
  valeur: number | null;
  onValeur: (v: number | null) => void;
  unite: string;
}

/** Ligne montant facultatif (Mixx, Flooz) : avatar à initiale, nom, petit champ à droite. */
export const LigneMontant = forwardRef<RefSaisie, LigneProps>(function LigneMontant(
  { nom, initiale, valeur, onValeur, unite, onFocus, onBlur, ...reste },
  ref,
) {
  const { colors } = useTheme();
  const [actif, setActif] = useState(false);
  return (
    <Pressable style={styles.ligne} onPress={() => (ref && 'current' in ref ? ref.current?.focus() : undefined)} accessible={false}>
      <View style={[styles.avatar, { backgroundColor: colors.bg.subtle }]}>
        <Text style={[type.bodyStrong, { color: colors.text.secondary }]}>{initiale}</Text>
      </View>
      <Text style={[type.bodyStrong, styles.flex, { color: colors.text.primary }]}>{nom}</Text>
      <View style={styles.petitChamp}>
        <View style={styles.petiteLigne}>
          <TextInput
            ref={ref}
            value={valeur === null ? '' : nombre(valeur)}
            onChangeText={(t) => onValeur(lireMontant(t))}
            placeholder="0"
            placeholderTextColor={colors.text.tertiary}
            keyboardType="number-pad"
            cursorColor={colors.border.focus}
            accessibilityLabel={`${nom}, ${unite}`}
            style={[type.bodyLarge, styles.petiteSaisie, { color: colors.text.primary }]}
            onFocus={(e) => {
              setActif(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setActif(false);
              onBlur?.(e);
            }}
            {...reste}
          />
          <Text style={[type.caption, { color: colors.text.secondary }]}>{unite}</Text>
        </View>
        <Soulignement actif={actif} />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  ligne: { minHeight: size.rowOne, flexDirection: 'row', alignItems: 'center', columnGap: space.s4 },
  avatar: { width: size.avatar, height: size.avatar, borderRadius: size.avatar / 2, alignItems: 'center', justifyContent: 'center' },
  petitChamp: { width: 120 },
  petiteLigne: { flexDirection: 'row', alignItems: 'center', columnGap: space.s1 },
  petiteSaisie: { flex: 1, textAlign: 'right', paddingVertical: space.s1, paddingHorizontal: 0, fontVariant: ['tabular-nums'] },
  flex: { flex: 1 },
  ligneMontant: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2, minHeight: 44, marginTop: space.s1 },
  saisieMontant: { flex: 1, padding: 0, fontVariant: ['tabular-nums'] },
  ligneCompacte: { flexDirection: 'row', alignItems: 'flex-end', columnGap: space.s4, marginTop: space.s1 },
  saisieCompacte: { minHeight: size.compactField - 24, paddingVertical: space.s1, paddingHorizontal: 0, fontVariant: ['tabular-nums'] },
  message: { flexDirection: 'row', alignItems: 'center', columnGap: space.s1, marginTop: space.s1 },
});
