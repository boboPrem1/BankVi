// Sous Windows, le ninja livré avec CMake 3.22 refuse les chemins de plus de 260 caractères,
// et la compilation native de React Native en produit. CMake 4.1 embarque un ninja qui les accepte
// (le réglage Windows « LongPathsEnabled » doit être actif). Ailleurs, rien ne change.
// Le dossier android/ étant régénéré par `expo prebuild`, ce réglage vit ici et non dans android/.
const { withAppBuildGradle } = require('expo/config-plugins');

const VERSION = '4.1.2';
const MARQUE = '// cmake-windows';

module.exports = function cmakeWindows(config) {
  if (process.platform !== 'win32') return config;
  return withAppBuildGradle(config, (c) => {
    if (!c.modResults.contents.includes(MARQUE)) {
      c.modResults.contents = c.modResults.contents.replace(
        /\nandroid \{\n/,
        `\nandroid {\n    ${MARQUE}\n    externalNativeBuild { cmake { version "${VERSION}" } }\n`,
      );
    }
    return c;
  });
};
