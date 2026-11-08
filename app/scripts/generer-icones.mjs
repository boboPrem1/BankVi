// Génère src/icones/chemins.ts à partir de la liste du design system (06-iconographie.md).
// Seules les icônes listées entrent dans l'app : aucune police d'icônes, aucun fichier lourd.
// Relancer après toute modification de la liste : `npm run icones`.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const source = join(ici, '../../docs/produit/describe_screens/00-design-system/06-iconographie.md');
const dossier = join(dirname(require.resolve('@material-symbols/svg-400/package.json')), 'rounded');
const sortie = join(ici, '../src/icones/chemins.ts');

// Icônes citées par des fiches mais absentes de la liste du design system : à y ajouter.
// arrow_drop_down : sélecteur d'indicatif (EC-10, L2) et puces à menu « chevron bas » (EC-13).
const HORS_LISTE = ['arrow_drop_down'];

const noms = [...new Set([...[...readFileSync(source, 'utf8').matchAll(/`([a-z][a-z0-9_]+)`/g)].map((m) => m[1]), ...HORS_LISTE])].sort();

// Noms du design system renommés depuis par Material Symbols. L'app garde le nom du design system.
const ALIAS = { smartphone: 'mobile' };

const lignes = [];
const manquants = [];
for (const nom of noms) {
  const lire = (fichier) => {
    const chemin = join(dossier, fichier);
    if (!existsSync(chemin)) return null;
    const d = readFileSync(chemin, 'utf8').match(/ d="([^"]+)"/);
    return d ? d[1] : null;
  };
  const fichier = ALIAS[nom] ?? nom;
  const contour = lire(`${fichier}.svg`);
  if (!contour) {
    manquants.push(nom);
    continue;
  }
  const plein = lire(`${fichier}-fill.svg`) ?? contour;
  lignes.push(`  ${nom}: { contour: '${contour}', plein: '${plein}' },`);
}

if (manquants.length) {
  console.error('Icônes introuvables dans Material Symbols Rounded :', manquants.join(', '));
  process.exit(1);
}

writeFileSync(
  sortie,
  `// Fichier généré par scripts/generer-icones.mjs, à ne pas modifier à la main.
// Material Symbols Rounded, graisse 400, licence Apache 2.0. viewBox : 0 -960 960 960.
export const CHEMINS = {
${lignes.join('\n')}
} as const;

export type NomIcone = keyof typeof CHEMINS;
`,
);
console.log(`${noms.length} icônes écrites dans src/icones/chemins.ts`);
