# EC-02 Exemple

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement |
| **Lot** | L1 |
| **Bible** | ONB-01 |
| **Avant** | EC-01 Bienvenue |
| **Après** | EC-03 Mon argent |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp |

## 1. Rôle

Montrer le résultat avant de demander le moindre chiffre, sans jamais laisser croire qu'il s'agit de l'argent de l'utilisateur.

## 2. Ce qu'on voit

L'écran ressemble au vrai premier horizon, mais tout porte la marque de l'exemple. Sous la barre du haut, un bandeau bleu pâle reste fixe : « Exemple · chiffres fictifs ». Puis la phrase, le chiffre 3 200 FCFA en très grand, une courbe en pointillés sur 30 jours, avec une chute jusqu'au 27 et un saut au salaire du 28. En bas, le bouton vert « Commencer avec mes chiffres ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←  Exemple                         │ 56
│ ┌ ⓘ Exemple · chiffres fictifs ────┐│ 40  bandeau fixe
│ └──────────────────────────────────┘│
│ Pour un salaire de 120 000 FCFA le 28│
│                                    │
│ Aujourd'hui, tu peux dépenser      │
│ 3 200 FCFA                         │ 56  chiffre
│ jusqu'au 28                        │
│                                    │
│ Sur 30 jours                       │
│ 90 000  ╲                ╱╲        │
│           ╲╲            ╱  ╲╲      │ 200 courbe en pointillés
│             ╲╲_        ╱     ╲     │
│ 6 nov.     21 nov.          6 déc. │
│                                    │
│ ╭────────────────────────────────╮ │
│ │  Commencer avec mes chiffres   │ │ 48
│ ╰────────────────────────────────╯ │
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 0 |
| Bandeau « Exemple », fixe | 40 dp | 12 dp |
| Contexte | 20 dp | 24 dp |
| Amorce | 24 dp | 0 |
| Chiffre | 56 dp | 0 |
| Échéance | 24 dp | 24 dp |
| Titre du graphique | 24 dp | 8 dp |
| Courbe | 200 dp | 16 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Retour | Icône `arrow_back` | 24 dp | `#111B21` en clair, `#E9EDEF` en sombre |
| Titre de barre | Exemple | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bandeau | Exemple · chiffres fictifs | Roboto 14/20 sp, Medium (500), icône `info` de 20 dp, rayon 8 dp | Fond `#E3F0FB` en clair, `#10283F` en sombre, texte `#0B5CAD` en clair, `#A8D4FF` en sombre |
| Contexte | Pour un salaire de 120 000 FCFA le 28 | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Amorce | Aujourd'hui, tu peux dépenser | Roboto 16/24 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Nombre | 3 200 | Roboto 48/56 sp, Bold (700) | `#111B21` en clair, `#E9EDEF` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Échéance | jusqu'au 28 | Roboto 16/24 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Titre du graphique | Sur 30 jours | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Commencer avec mes chiffres | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. La courbe

Trait de 2 dp en pointillés (6 dp, espace 4 dp), `#008069` en clair, `#25D366` en sombre, lavis `rgba(0,128,105,0.10)` en clair, `rgba(37,211,102,0.10)` en sombre, grille `#E9EDEF` en clair, `#2A3942` en sombre, repères Roboto 12/16 sp, Regular (400) en `#667781` en clair, `#8696A0` en sombre.

Les points sont ceux de la colonne « Solde du matin » d'[EC-06](EC-06-premier-horizon.md#7-la-courbe). Résumé : 90 000 au départ, 53 200 le jour 9, 27 200 le jour 14, 4 800 le jour 21, 121 600 le jour 22, 89 600 le jour 27, 51 800 le jour 29, 50 400 le jour 30.

Étiquettes directes : « 90 000 » au départ, « 4 800 » au point bas, « +120 000 » au saut. Axe vertical : 0, 50 000, 100 000.

**Dates :** elles se calculent à partir d'aujourd'hui. Le salaire tombe toujours 22 jours plus tard, et les textes affichent ce jour réel. Le 6 novembre, on lit donc « le 28 ».

## 7. États

| État | Comportement |
| --- | --- |
| Normal | Décrit ci-dessus, sans chargement |
| Sans réseau | Identique |
| Doigt sur la courbe | Info-bulle du jour, comme sur le vrai horizon, avec le mot « Exemple » en première ligne |

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Commencer avec mes chiffres » | EC-03 |
| Retour, ou flèche | EC-01 |
| Glisser sur la courbe | Info-bulle, sans autre effet |

Rien n'est enregistré, et ces chiffres ne servent jamais à pré-remplir les champs suivants.

## 9. Accessibilité

TalkBack lit le bandeau en premier : « Exemple, chiffres fictifs ». Le nombre : « Dans cet exemple, tu peux dépenser trois mille deux cents francs CFA jusqu'au 28. » Le graphique : « Exemple de courbe sur 30 jours : 90 000 francs aujourd'hui, 4 800 au plus bas le jour 21, 121 600 après le salaire. »

## 10. Mouvement

Entrée d'écran standard. Tracé de la courbe de gauche à droite en 300 ms, à l'ouverture seulement.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Courbe à 150 dp ; le contenu défile, bandeau et pied restent fixes |
| 320 × 568 dp | Courbe à 130 dp ; marges de 16 dp |
| Texte à 200 % | Le bandeau passe sur deux lignes ; le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`onboarding_step_viewed` (`example`) et `onboarding_step_completed`. Temps passé sur l'écran, sans montant.
