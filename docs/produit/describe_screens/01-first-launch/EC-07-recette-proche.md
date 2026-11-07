# EC-07 La recette la plus proche

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement |
| **Lot** | L1 |
| **Bible** | REC-02, REC-10, LEG-04 |
| **Avant** | EC-06 Premier horizon, ou « Choisis une recette » depuis EC-27 |
| **Après** | EC-08 Aperçu · EC-09 Quand noter |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp |

## 1. Rôle

Proposer une façon de répartir l'argent, avec un fait à l'appui, sans jamais la présenter comme un conseil.

## 2. Ce qu'on voit

Un titre : « La plus proche de ce que tu as indiqué », puis une bulle gris pâle qui donne la raison, par exemple « Tes charges prennent 65 % de ton revenu. » Trois cartes empilées. La première est déjà sélectionnée : contour vert, rond rempli et petite marque vert pâle « La plus proche ». Chaque carte montre son nom, sa fine barre colorée partagée entre les pots, le nom de chaque pot avec son pourcentage et, en dernier, ce qu'il resterait par jour : « Ensuite, 200 FCFA par jour ». En bas, le bouton « Voir cette recette » et le lien « Plus tard ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←                                  │ 56
│ La plus proche de ce que           │
│ tu as indiqué                      │ 64
│ ╭────────────────────────────────╮ │
│ ┆ Tes charges prennent 65 % de   │ │ 56
│ │ ton revenu.                    │ │
│ ╰────────────────────────────────╯ │
│ ╔════════════════════════════════╗ │
│ ║ ◉ 70 / 20 / 10  [La plus proche]║ │
│ ║ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬ ▬▬▬  ║ │ 128
│ ║ ● Vie courante 70 %            ║ │
│ ║ ● Épargne 20 %                 ║ │
│ ║ ● Dettes ou dons 10 %          ║ │
│ ╚════════════════════════════════╝ │
│ ┌────────────────────────────────┐ │
│ │ ○ 50 / 30 / 20                 │ │
│ │ ▬▬▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬▬ ▬▬▬▬▬    │ │ 128
│ │ ● Besoins 50 %                 │ │
│ │ ● Envies 30 %                  │ │
│ │ ● Épargne et dettes 20 %       │ │
│ └────────────────────────────────┘ │
│ ┌ ○ Payez-vous d'abord ...       ┐ │ défile
│ ╭────────────────────────────────╮ │
│ │       Voir cette recette       │ │ 48
│ ╰────────────────────────────────╯ │
│             Plus tard              │ 48
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut, retour seul | 56 dp | 8 dp |
| Titre | 64 dp | 12 dp |
| Bulle | 56 dp | 16 dp |
| Carte | Environ 152 dp pour 3 pots ; 128 dp pour 2 | 12 dp |
| Pied | 128 dp | — |

Le contenu entre la barre du haut et le pied défile. La troisième carte peut demander un défilement, et son haut doit rester visible pour le suggérer.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | La plus proche de ce que tu as indiqué | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bulle | La raison, voir le tableau | Roboto 14/20 sp, Regular (400), rayon 12 dp, haut gauche 4 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Carte au repos | — | Rayon 12 dp, contour 1 dp, marges 16 dp | Fond `#FFFFFF` en clair, `#202C33` en sombre, contour `#7A8A94` en clair, `#667781` en sombre |
| Carte choisie | — | Rayon 12 dp, contour 2 dp, marges 16 dp | Fond `#FFFFFF` en clair, `#202C33` en sombre, contour `#008069` en clair, `#25D366` en sombre |
| Rond | — | 20 dp | Repos `#7A8A94` en clair, `#667781` en sombre ; choisi `#008069` en clair, `#25D366` en sombre |
| Nom | 70 / 20 / 10 | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Marque | La plus proche | Roboto 12/16 sp, Medium (500), hauteur 20 dp, rayon 4 dp, marges 4 dp | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Barre | — | 8 dp, trou de 2 dp entre segments, bouts arrondis | Pots dans l'ordre : `#008069` en clair, `#00A884` en sombre, `#D97A00` en clair, `#C47F00` en sombre, `#7F66FF` en clair, `#8B75FF` en sombre |
| Pastille | — | 12 dp | Couleur du pot |
| Pot | Vie courante 70 % | Roboto 14/20 sp, Regular (400), 20 dp de haut | `#111B21` en clair, `#E9EDEF` en sombre |
| Effet | Ensuite, 200 FCFA par jour | Roboto 14/20 sp, Medium (500), tabulaire, 20 dp de haut | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Voir cette recette | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte | Plus tard | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

Le fond d'une carte choisie reste celui du repos : sur le vert pâle, la barre orange passerait sous le contraste de 3:1. Le mot « recommandée » est interdit : la marque dit seulement « La plus proche ».

## 6. Recettes et règle de choix

| Situation | 1re carte | Raison affichée | 2e et 3e |
| --- | --- | --- | --- |
| Revenu variable | Revenu plancher prudent | Ton revenu varie : cette recette se calcule sur le moins que tu gagnes. | 50 / 30 / 20, 70 / 20 / 10 |
| Charges à 60 % du revenu ou plus | 70 / 20 / 10 | Tes charges prennent 65 % de ton revenu. | 50 / 30 / 20, Payez-vous d'abord |
| Charges sous 60 % | 50 / 30 / 20 | Tes charges prennent 40 % de ton revenu. | 70 / 20 / 10, Payez-vous d'abord |
| Aucune charge | 50 / 30 / 20 | Tu n'as indiqué aucune charge fixe. | 70 / 20 / 10, Payez-vous d'abord |

Le pourcentage est le total des charges divisé par le revenu mensuel, arrondi à l'unité.

**Effet affiché sur chaque carte :** ce qu'il resterait par jour à partir du prochain revenu, ou du 1er du mois suivant si le revenu est variable, réservé déduit.

| Carte | Camille, à partir du 28 | Karim, à partir du 1er déc. |
| --- | --- | --- |
| 70 / 20 / 10 | 200 FCFA par jour | 1 400 FCFA par jour |
| 50 / 30 / 20 | 600 FCFA par jour | 1 600 FCFA par jour |
| Payez-vous d'abord | 600 FCFA par jour | — |
| Revenu plancher prudent | — | 1 400 FCFA par jour |

La phrase est un fait : elle ne dit pas laquelle choisir. **Sans recette, ce serait 1 400 FCFA par jour pour Camille et 2 200 FCFA pour Karim.**

| Recette | Pots exacts |
| --- | --- |
| 50 / 30 / 20 | Besoins 50 %, Envies 30 %, Épargne et dettes 20 % |
| 70 / 20 / 10 | Vie courante 70 %, Épargne 20 %, Dettes ou dons 10 % |
| Payez-vous d'abord | Épargne 20 %, prélevée en premier ; Libre 80 % |
| Revenu plancher prudent | Vie courante 70 %, Imprévus 20 %, Épargne 10 %. Ce qui dépasse le plancher va dans « Le reste » |

## 7. États

| État | Affichage |
| --- | --- |
| Arrivée | Première carte choisie |
| Autre carte touchée | Elle devient choisie ; la précédente revient au repos ; la marque ne bouge pas |
| Retour depuis EC-08 | La carte choisie reste choisie |
| Sans réseau | Aucun changement : le catalogue est dans l'app |

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une carte | Sélection |
| « Voir cette recette » | EC-08 pour la carte choisie |
| « Plus tard » | EC-09 sans recette ; EC-27 proposera d'en choisir une |
| Flèche ou retour | EC-06 |

## 9. Accessibilité

Les cartes forment un groupe de choix. Lecture : « 70 / 20 / 10, la plus proche, sélectionné. Vie courante 70 %, Épargne 20 %, Dettes ou dons 10 %. 1 sur 3. » « 70 / 20 / 10 » se prononce « soixante-dix, vingt, dix ». La barre colorée est ignorée, puisque ces valeurs sont lues.

## 10. Mouvement

Changement de carte en 100 ms. Aucune autre animation.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Une carte et demie visible ; le contenu défile |
| 320 × 568 dp | Marge de 16 dp ; la marque passe sous le nom |
| Texte à 200 % | La marque passe sous le nom, et la hauteur des cartes suit |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`onboarding_step_viewed`, `onboarding_step_completed` (`recipe_choice`), avec l'identifiant de la recette, sa position et l'acceptation de la première. **Aucun montant.**
