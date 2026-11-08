import { useColorScheme, type TextStyle } from 'react-native';

// Source unique : les jetons du design system. Aucune valeur n'est recopiée ici.
import tokens from '../../../docs/produit/describe_screens/00-design-system/tokens.json';

type Scheme = 'light' | 'dark';
type Groups = typeof tokens.color;
type Strip<G> = { [K in keyof G]: string };
export type Colors = { [G in keyof Groups]: Strip<Groups[G]> };

function resoudre(scheme: Scheme): Colors {
  const sortie = {} as Record<string, Record<string, string>>;
  for (const [groupe, entrees] of Object.entries(tokens.color)) {
    const g: Record<string, string> = {};
    for (const [nom, valeur] of Object.entries(entrees as Record<string, { light: string; dark: string }>)) {
      g[nom] = valeur[scheme];
    }
    sortie[groupe] = g;
  }
  return sortie as Colors;
}

const COULEURS: Record<Scheme, Colors> = { light: resoudre('light'), dark: resoudre('dark') };

type TypeName = Exclude<keyof typeof tokens.type, 'fontFamily'>;

/**
 * Styles de texte. La police n'est pas fixée : sur Android, la police système est Roboto,
 * sans téléchargement (design system, principe 7).
 */
export const type = Object.fromEntries(
  (Object.keys(tokens.type) as (keyof typeof tokens.type)[])
    .filter((k): k is TypeName => k !== 'fontFamily')
    .map((k) => {
      const t = tokens.type[k];
      const style: TextStyle = {
        fontSize: t.size,
        lineHeight: t.line,
        fontWeight: String(t.weight) as TextStyle['fontWeight'],
      };
      return [k, style];
    }),
) as Record<TypeName, TextStyle>;

export const space = tokens.space;
export const size = tokens.size;
export const radius = tokens.radius;
export const motion = tokens.motion;
/** Paysage du statut : identique en clair et en sombre, texte toujours blanc. */
export const artwork = tokens.artwork;
export type EtatCiel = keyof typeof tokens.artwork.skies;

export interface Theme {
  scheme: Scheme;
  colors: Colors;
}

/** Le thème suit le téléphone, sans réglage en P1. */
export function useTheme(): Theme {
  const scheme: Scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return { scheme, colors: COULEURS[scheme] };
}

export function couleurs(scheme: Scheme): Colors {
  return COULEURS[scheme];
}
