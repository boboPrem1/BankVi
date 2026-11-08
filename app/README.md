# App Android de BankVi

App React Native construite avec Expo (SDK 58), en TypeScript. Elle affiche ce que calcule le [moteur](../moteur/README.md) et suit les [fiches d'écran](../docs/produit/describe_screens/README.md).

## Lancer

Les dépendances s'installent une fois, **depuis la racine du dépôt** (workspaces npm) :

```bash
npm install
```

Puis, depuis `app/` :

| Commande | Effet |
| --- | --- |
| `npm run android` | Compile l'app et l'installe sur le téléphone branché ou l'émulateur |
| `npm start` | Relance seulement le serveur de développement, quand l'app est déjà installée |
| `npm test` | Tests (Jest) |
| `npm run typecheck` | Vérification des types |
| `npm run lint` | ESLint |
| `npm run icones` | Régénère les icônes après un changement de la liste du design system |
| `npx expo-doctor` | Vérifie les versions et la configuration |

L'app n'utilise pas Expo Go : `npm run android` construit une version de développement. Les dossiers `android/` et `ios/` sont générés et ignorés par git ; la configuration native se règle dans [app.json](app.json).

## Ce qui vient des docs, sans copie

| Source | Utilisée par |
| --- | --- |
| [tokens.json](../docs/produit/describe_screens/00-design-system/tokens.json) | [src/theme](src/theme/index.ts) l'importe directement : couleurs claires et sombres, échelle typographique, espacements, rayons, durées |
| [06-iconographie.md](../docs/produit/describe_screens/00-design-system/06-iconographie.md) | [scripts/generer-icones.mjs](scripts/generer-icones.mjs) extrait les icônes listées de Material Symbols Rounded vers [src/icones/chemins.ts](src/icones/chemins.ts) |
| [moteur/](../moteur) | Importé comme paquet `@bankvi/moteur` : l'app ne refait aucun calcul |

Une valeur du design system se corrige donc dans `tokens.json`, jamais dans l'app.

## Dossiers

| Dossier | Rôle |
| --- | --- |
| `src/app/` | Les écrans (Expo Router) : un fichier par route, rien d'autre |
| `src/composants/` | Composants du design system |
| `src/theme/` | Jetons et thème clair ou sombre, qui suit le téléphone |
| `src/i18n/` | Tous les textes affichés. Aucun texte en dur dans un composant |
| `src/format/` | Montants et dates à l'écran : `3 200 FCFA`, `le 28` |
| `src/icones/` | Composant `Icone` et chemins générés |
| `src/demo/` | Données de Camille pour l'écran provisoire |

## Règles

- Les montants restent des entiers en FCFA de bout en bout. L'affichage passe par `src/format/montant.ts`.
- Les dates restent des chaînes ISO, comme dans le moteur, jamais des objets `Date`.
- Un texte affiché vit dans `src/i18n/fr.ts`, repris mot pour mot de la fiche.
- Une couleur, une taille ou un espacement viennent du thème.
- Avant de dire qu'une tâche est finie : `npm run typecheck`, `npm run lint` et `npm test`.

## État : le premier lancement, en écrans statiques

Les 11 fiches de [01-first-launch](../docs/produit/describe_screens/01-first-launch) sont construites, avec une navigation complète. Les chiffres viennent du moteur, à partir de ce que l'on saisit ; rien n'est enregistré ni envoyé.

| Route | Fiche |
| --- | --- |
| `/` | EC-01 Bienvenue |
| `/exemple` | EC-02 Exemple |
| `/mon-argent` | EC-03 Mon argent aujourd'hui |
| `/mon-revenu` | EC-04 Mon revenu |
| `/mes-charges` | EC-05 Mes charges fixes |
| `/premier-horizon` | EC-06 Premier horizon |
| `/recette-proche` | EC-07 La recette la plus proche |
| `/apercu-recette` | EC-08 Aperçu d'une recette |
| `/quand-noter` | EC-09 Quand préfères-tu noter ? |
| `/sauvegarde` | EC-10 Sauvegarde (`?compte=existant` pour « J'ai déjà un compte ») |
| `/code` | EC-11 Code |
| `/a-venir` | Destination des liens vers des écrans pas encore construits (EC-27, EC-32, EC-38, EC-39, EC-41, EC-47, conditions) |

## État : Aujourd'hui, en écrans statiques

Les 12 fiches de [02-aujourdhui](../docs/produit/describe_screens/02-aujourdhui) sont construites. Ce qu'on note vit dans un registre en mémoire ([src/registre](src/registre/store.ts)) que lit le moteur : il ne fait qu'ajouter, une correction ou une suppression passe par une annulation, et chaque « Annuler » de 10 s fonctionne.

| Route | Fiche |
| --- | --- |
| `/accueil` (onglet Aujourd'hui) | EC-12 Accueil, avec le paysage du jour |
| `/statut` | EC-50 Mon statut |
| `/noter` | EC-13 Ajout rapide, avec les feuilles EC-14 Catégorie et EC-15 Autre date |
| `/plusieurs-dates` | EC-16 Plusieurs dates |
| `/historique` | EC-17 Historique |
| `/saisie/[id]` | EC-18 Détail d'une saisie (saisie, prévu, comptage, transfert, non détaillé) |
| `/bilan/compter`, `/bilan/ecart`, `/bilan/resultat` | EC-19, EC-20, EC-21 Bilan du soir |
| `/transfert` | EC-22 Transfert entre poches |
| `/pots`, `/plus` | Onglets dont les écrans ne sont pas encore construits |

**Pour voir ces écrans avec des données :** « J'ai déjà un compte » sur EC-01 charge la semaine fictive de Camille, du 2 au 6 novembre. On voit alors les suggestions d'habitude, l'historique et le fait « Hier » du statut.

**Pour ouvrir le bilan :**

- Choisir « Le soir » sur EC-09, avec une heure déjà passée : l'accueil propose alors « Faire mon bilan ».
- Ou ouvrir un comptage dans l'historique, puis toucher « Compter à nouveau ».

L'heure de la journée est celle du téléphone, posée sur la date fictive du 6 novembre 2026.

## État : Horizon, en écrans statiques

Les 4 fiches de [03-horizon](../docs/produit/describe_screens/03-horizon) sont construites. La courbe, les repères, la simulation et l'explication des chiffres viennent du moteur (`horizon`, `reperes`, `simuler`, `calculer`, `soldesPasses`).

| Route | Fiche |
| --- | --- |
| `/horizon` (onglet Horizon) | EC-23 Mon horizon (`?date=` place le curseur, comme la notification de découvert) |
| `/origine` | EC-24 D'où vient ce chiffre : le chiffre du jour, ou le solde prévu avec `?date=` |
| `/puis-je` | EC-25 Puis-je me permettre ça ? |
| `/evenement` | EC-26 Événement à venir (`?id=` pour le modifier ou le supprimer) |

**Pass Plus, choix de démonstration :** un nouveau compte n'a pas le pass. Il a 3 simulations offertes, puis la description d'EC-25 ; « 90 jours » mène à EC-41. « J'ai déjà un compte » charge Camille avec le pass actif : on voit les 90 jours et les simulations sans limite.

**Liens encore vers « Écran à venir » :** les sources d'EC-24 (EC-27, EC-38, EC-39), les charges récurrentes de la liste « À venir » (EC-39) et le Pass Plus (EC-41). Les événements créés sur EC-26 ou EC-25 se rouvrent dans EC-26.

**Données fictives :**

- La date du jour est fixée au vendredi 6 novembre 2026, celle des fiches. Avec les réponses de Camille (32 000 en espèces, 58 000 en Mixx, 120 000 le 28, quatre charges), on retrouve exactement 3 200 FCFA et la courbe d'EC-06.
- L'envoi du SMS est simulé. Le « SMS » arrive au bout de 4 secondes et remplit le code **482913** tout seul ; tout autre code est refusé.
- « J'ai déjà un compte » récupère les données de Camille.
- Les réponses ne vivent qu'en mémoire. Elles sont purgées à chaque nouveau départ sur EC-01, mais gardées quand on revient en arrière, comme le demandent les fiches.
