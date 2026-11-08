import Svg, { Path } from 'react-native-svg';

import { size } from '@/theme';

import { CHEMINS, type NomIcone } from './chemins';

interface Props {
  nom: NomIcone;
  couleur: string;
  /** 24 dp par défaut ; 20 dp dans une ligne dense ou un message. */
  taille?: number;
  /** Plein pour un onglet actif, contour au repos. */
  plein?: boolean;
}

/**
 * Icône seule, décorative pour le lecteur d'écran : c'est l'élément qui la contient
 * qui porte le nom lu par TalkBack et la zone tactile de 48 dp.
 */
export function Icone({ nom, couleur, taille = size.iconBase, plein = false }: Props) {
  const chemin = CHEMINS[nom];
  return (
    <Svg
      width={taille}
      height={taille}
      viewBox="0 -960 960 960"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
    >
      <Path d={plein ? chemin.plein : chemin.contour} fill={couleur} />
    </Svg>
  );
}
