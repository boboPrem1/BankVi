import { useTranslation } from 'react-i18next';
import Svg, { Circle, G, Path, Polyline, Rect, Text as SvgText } from 'react-native-svg';

import { useTheme } from '@/theme';

/**
 * ILL-01 (EC-01) : la carte « 3 200 FCFA », trois pièces, un billet et une courbe.
 * Positions exactes du SVG de référence de la fiche, viewBox 240 × 200.
 * Décorative : ignorée par TalkBack, le titre porte la promesse.
 */
export function IllustrationBienvenue({ largeur = 240 }: { largeur?: number }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const trait = colors.illustration.outline;
  return (
    <Svg
      width={largeur}
      height={(largeur * 200) / 240}
      viewBox="0 0 240 200"
      fill="none"
      stroke={trait}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
    >
      <Polyline points="166,28 180,16 192,23 214,6" />
      <Path d="M52 36H188A20 20 0 0 1 208 56V112A20 20 0 0 1 188 132H54L32 110V56A20 20 0 0 1 52 36Z" fill={colors.illustration.mint} />
      <Path d="M32 110H54V132Z" fill={colors.illustration.paper} />
      <SvgText x={46} y={68} fontFamily="Roboto" fontSize={14} fill={trait} stroke="none">
        {t('ec01.illuAujourdhui')}
      </SvgText>
      <SvgText x={46} y={102} fontFamily="Roboto" fontSize={28} fontWeight="700" fill={trait} stroke="none">
        {t('ec01.illuMontant')}
      </SvgText>
      <Circle cx={74} cy={176} r={16} fill={colors.illustration.amber} />
      <Circle cx={64} cy={166} r={16} fill={colors.illustration.amber} />
      <Circle cx={54} cy={156} r={16} fill={colors.illustration.amber} />
      <G transform="rotate(-8 170 164)">
        <Rect x={138} y={146} width={64} height={36} rx={6} fill={colors.illustration.green} />
        <Circle cx={170} cy={164} r={8} />
      </G>
    </Svg>
  );
}
