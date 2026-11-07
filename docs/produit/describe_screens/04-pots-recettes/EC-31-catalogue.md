# EC-31 Catalogue

| Fiche | |
| --- | --- |
| **Parcours** | PC-14 |
| **Lot** | L1 |
| **Bible** | REC-02, REC-09 |
| **Avant** | EC-30 |
| **Après** | EC-08 ; EC-33 en L2 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Comparer les recettes en voyant leurs pots exacts et leur source, jamais seulement un nom.

## 2. Ce qu'on voit

Quatre cartes empilées. Chacune a son nom, sa fine barre colorée, la liste de ses pots avec les pourcentages, et sa source. La recette active porte une marque. Toucher une carte ouvre son aperçu en francs CFA.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Catalogue                       │ 56
│ ┌────────────────────────────────┐ │
│ │ 70 / 20 / 10         [Active]  │ │
│ │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬ ▬▬▬   │ │ 144
│ │ ● Vie courante 70 %            │ │
│ │ ● Épargne 20 %                 │ │
│ │ ● Dettes ou dons 10 %          │ │
│ │ Guides de budget grand public  │ │
│ └────────────────────────────────┘ │
│ ┌────────────────────────────────┐ │
│ │ 50 / 30 / 20                   │ │
│ │ ▬▬▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬▬ ▬▬▬▬▬    │ │ 144
│ │ ● Besoins 50 %                 │ │
│ │ ● Envies 30 %                  │ │
│ │ ● Épargne et dettes 20 %       │ │
│ │ Elizabeth Warren               │ │
│ └────────────────────────────────┘ │
│ ┌ Payez-vous d'abord … ───────────┐│
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Carte, 3 pots | 144 dp | 12 dp |
| Carte, 2 pots | 124 dp | 12 dp |

Les cartes défilent. Il n'y a ni barre du bas ni bouton principal.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Catalogue | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Carte | — | Rayon 12 dp, marges 16 dp, contour 1 dp | Fond `#FFFFFF` en clair, `#202C33` en sombre, contour `#7A8A94` en clair, `#667781` en sombre |
| Nom | 70 / 20 / 10 | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Marque | Active | Roboto 12/16 sp, Medium (500), rayon 4 dp | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Barre | — | 8 dp, trou de 2 dp | `#008069` en clair, `#00A884` en sombre, `#D97A00` en clair, `#C47F00` en sombre, `#7F66FF` en clair, `#8B75FF` en sombre |
| Pastille | — | 12 dp | Couleur du pot |
| Pot | Vie courante 70 % | Roboto 14/20 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Source | Guides de budget grand public | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |

## 6. Contenu

| Recette | Pots exacts | Source |
| --- | --- | --- |
| 50 / 30 / 20 | Besoins 50 %, Envies 30 %, Épargne et dettes 20 % | Elizabeth Warren |
| 70 / 20 / 10 | Vie courante 70 %, Épargne 20 %, Dettes ou dons 10 % | Guides de budget grand public (Thrivent, The Penny Hoarder) |
| Payez-vous d'abord | Épargne 20 %, prélevée en premier ; Libre 80 % | Guides de budget grand public (Thrivent, The Penny Hoarder) |
| Revenu plancher prudent | Vie courante 70 %, Imprévus 20 %, Épargne 10 %, sur le plancher ; le surplus va dans « Le reste » | Méthode pour revenus irréguliers, adaptée par BankVi |

L'ordre est fixe. Aucun tri, aucune recommandation, aucune note : la proposition selon la situation appartient à EC-07.

## 7. États

| État | Affichage |
| --- | --- |
| Recette active | Marque « Active », à sa place dans l'ordre |
| Recette ajustée active | Une carte en tête : Ma recette, d'après 70 / 20 / 10 |
| L2, avec le pass | Lien sous les cartes : « Écrire une recette » |
| L2, sans pass | Le même lien, avec la marque « Pass Plus » : il décrit la fonction |
| Hors ligne | Identique : le catalogue est dans l'app |

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une carte | EC-08, aperçu sur ses chiffres |
| « Écrire une recette », L2 | EC-33 |
| Retour | EC-30 |

Budget : adopter une recette tient en 3 taps depuis Ma recette (« Changer », une carte, « Adopter »).

## 9. Données

Le catalogue est un jeu de 4 recettes en données, validé par un schéma. Elles ne dépendent d'aucun réseau.

## 10. Accessibilité

Chaque carte est un bouton : « 70 / 20 / 10, active. Vie courante 70 %, Épargne 20 %, Dettes ou dons 10 %. Source : guides de budget grand public. » La barre est ignorée.

## 11. Mouvement

Entrée d'écran standard, sans autre animation.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp ; la marque passe sous le nom |
| Texte à 200 % | Cartes plus hautes |
| Thème sombre | Valeurs ci-dessus |

## 13. Mesure

`catalog_viewed`, `catalog_recipe_opened`, avec l'identifiant et la position. **Aucun montant.**
