# EC-32 Ajuster

| Fiche | |
| --- | --- |
| **Parcours** | PC-14 |
| **Lot** | L1 |
| **Bible** | REC-04, REC-06, UX-01 |
| **Avant** | EC-08, EC-30 |
| **Après** | L'écran d'origine ; EC-34 si besoin |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp |

## 1. Rôle

Adapter une recette à sa réalité au doigt, en voyant tout de suite les montants, avec une somme toujours juste.

## 2. Ce qu'on voit

Une fine barre colorée en haut, qui bouge en direct. Dessous, un curseur par pot, avec son pourcentage et son montant. Le dernier pot n'a pas de curseur : il absorbe ce qui reste, et une mention le dit. Une phrase donne l'effet sur le chiffre du jour. Le bouton vert : « Enregistrer ma recette ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Ajuster                         │ 56
│ Sur ton revenu de 120 000 FCFA     │ 24
│ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬ ▬▬   │  8
│ ● Vie courante     80 %   96 000   │ 24
│ (−) ━━━━━━━━━━━━━━━━●───── (+)     │ 48
│ ● Épargne          15 %   18 000   │ 24
│ (−) ━━━━━●──────────────── (+)     │ 48
│ ● Dettes ou dons    5 %    6 000   │ 24
│ Ce qui reste, pour faire 100 %     │ 16
│                                    │
│ À partir de ton prochain revenu,   │
│ il te resterait 600 FCFA par jour. │ 48
│ ╭────────────────────────────────╮ │
│ │     Enregistrer ma recette     │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 4 dp |
| Base | 24 dp | 8 dp |
| Barre des pots | 8 dp | 16 dp |
| Ligne du pot | 24 dp | 4 dp |
| Curseur | 48 dp | 12 dp |
| Dernier pot | 40 dp | 16 dp |
| Effet | 48 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Ajuster | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Base | Sur ton revenu de 120 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire | `#54656F` en clair, `#AEBAC1` en sombre |
| Barre | — | 8 dp, trou de 2 dp | `#008069` en clair, `#00A884` en sombre, `#D97A00` en clair, `#C47F00` en sombre, `#7F66FF` en clair, `#8B75FF` en sombre |
| Pastille | — | 12 dp | Couleur du pot |
| Pot | Vie courante | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Pourcentage | 80 % | Roboto 16/24 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Montant | 96 000 FCFA | Roboto 14/20 sp, Regular (400), tabulaire, à droite | `#54656F` en clair, `#AEBAC1` en sombre |
| Rail du curseur | — | 4 dp, pilule | Parcouru : couleur du pot. Reste : `#E9EDEF` en clair, `#2A3942` en sombre |
| Poignée | — | 24 dp, zone 48 dp | Couleur du pot, anneau de 2 dp `#FFFFFF` en clair, `#0B141A` en sombre |
| Boutons − et + | `remove`, `add` | Zone 48 dp | `#00735E` en clair, `#25D366` en sombre |
| Mention du dernier pot | Ce qui reste, pour faire 100 % | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Effet | À partir de ton prochain revenu, il te resterait 600 FCFA par jour. | Roboto 16/24 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Enregistrer ma recette | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Arrivée | Valeurs de la recette d'origine ; bouton désactivé tant que rien ne change (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Dernier pot à 0 % | Le curseur s'arrête ; sous lui, en `#54656F` en clair, `#AEBAC1` en sombre : « Le dernier pot est à 0 %. Baisse un autre pot d'abord. » |
| Pots à montant fixe | Valeur fixe au lieu d'un pourcentage ; le montant se règle par saisie |
| Il manquerait de l'argent | Effet, avec `warning`, en `#8A4B00` en clair, `#FFD27A` en sombre : « Tes charges dépasseraient ce qu'il reste. » Sans blocage |
| Revenu variable | Base : « Sur le moins que tu gagnes : 90 000 FCFA » ; effet : « À partir du 1er décembre, il te resterait 1 600 FCFA par jour. » ; le pot « Le reste » ne change pas |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Glisser une poignée | Change le pourcentage par pas de 1 %, le dernier pot compense |
| − et + | Un pas de 1 % |
| « Enregistrer ma recette » | Crée une copie, l'active ; EC-34 si une nature n'est plus lue ; bandeau « Recette enregistrée. », « Annuler » pendant 10 s |
| Retour | Abandonne les changements, sans question |

## 8. Données

La recette du catalogue reste intacte : l'ajustement crée une copie nommée « Ma recette, d'après 70 / 20 / 10 ». Elle compte comme la recette active en gratuit. La somme reste toujours à 100 %.

**Exemple.** Vie courante 80 %, Épargne 15 %, Dettes ou dons 5 % : 96 000, 18 000 et 6 000 FCFA. Réservé 24 000 : (121 600 − 78 000 − 24 000) ÷ 30 = 653, arrondi à 600 FCFA par jour.

**Exemple, revenu variable.** Karim : Vie courante 80 %, Imprévus 15 %, Épargne 5 %, soit 72 000, 13 500 et 4 500 FCFA. Réservé 18 000 : (1 500 + 90 000 − 21 000 − 18 000) ÷ 31 = 1 693, arrondi à 1 600 FCFA par jour, à partir du 1er décembre.

## 9. Accessibilité

Curseur : « Vie courante, 80 %, 96 000 francs CFA, curseur ». Les boutons − et + évitent le glissement. L'effet est annoncé à la fin d'un réglage, pas à chaque pas.

## 10. Mouvement

La barre suit le doigt, sans délai. Aucun rebond.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Montant sous le pourcentage |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`recipe_adjusted`, avec le nombre de pots modifiés. **Aucun montant.**
