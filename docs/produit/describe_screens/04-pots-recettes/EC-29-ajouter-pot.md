# EC-29 Ajouter un pot

| Fiche | |
| --- | --- |
| **Parcours** | PC-10 |
| **Lot** | L1 |
| **Bible** | POT-05, REC-06 |
| **Avant** | EC-27 |
| **Après** | EC-27 ; EC-48 pour un nom sensible |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp |

## 1. Rôle

Ajouter une part qui correspond à la vie réelle : tontine, famille, imprévus. Sans passer par le réglage d'une recette.

## 2. Ce qu'on voit

Des puces proposent les pots courants : Tontine, Famille, Imprévus. Un champ permet de nommer le sien. Puis un choix : Pourcentage, Montant fixe ou Le reste. Une phrase dit ce que deviennent les autres pots. Le bouton vert : « Créer ce pot ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Ajouter un pot                  │ 56
│ (Tontine) (Famille) (Imprévus)     │ 32
│ Nom                                │
│ Tontine                            │ 56
│ ─────────────────────────────────  │
│ (Pourcentage|✓Montant fixe|Le reste)│ 40
│ Chaque revenu                      │
│ 10 000|                       FCFA │ 72
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Sur 120 000 FCFA : Tontine 10 000, │
│ Vie courante 77 000, Épargne       │ 60
│ 22 000, Dettes ou dons 11 000.     │
│ ╭────────────────────────────────╮ │
│ │         Créer ce pot           │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Puces | 32 dp | 16 dp |
| Nom | 56 dp | 12 dp |
| Règle | 40 dp | 12 dp |
| Valeur | 72 dp | 12 dp |
| Effet | 60 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Ajouter un pot | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Puces | Tontine, Famille, Imprévus | 32 dp, Roboto 14/20 sp, Medium (500) | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Nom | Tontine | Roboto 16/24 sp, Regular (400), 24 caractères | `#111B21` en clair, `#E9EDEF` en sombre ; libellé `#54656F` en clair, `#AEBAC1` en sombre |
| Règle | Pourcentage, Montant fixe, Le reste | Trois segments, 40 dp, Roboto 14/20 sp, Medium (500) | Choisi : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Libellé de valeur | Chaque revenu, ou Part de chaque revenu | Roboto 14/20 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Valeur | 10 000 ou 10 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Unité | FCFA ou % | Roboto 18/24 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Effet | Sur 120 000 FCFA : Tontine 10 000, Vie courante 77 000, Épargne 22 000, Dettes ou dons 11 000. | Roboto 14/20 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Créer ce pot | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

La couleur du pot est attribuée automatiquement, dans l'ordre : le quatrième reçoit `#E0568A` en clair, `#E0588A` en sombre.

## 6. États

| État | Affichage |
| --- | --- |
| Arrivée | Rien de choisi ; bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Puce touchée | Nom rempli ; Montant fixe choisi pour Tontine ; Pourcentage pour les autres |
| Le reste | Pas de valeur. Effet : « Ce pot recevra ce qui reste après les autres. » Un seul pot « Le reste » par recette ; s'il en existe un, ce choix est désactivé |
| Montant fixe supérieur au revenu | Sous le champ, en `#8A4B00` en clair, `#FFD27A` en sombre : « C'est plus que ton revenu de 120 000 FCFA. » Bouton désactivé |
| Sans recette | L'écran renvoie à EC-07 : « Choisis d'abord une recette. » |
| Revenu variable | L'effet porte sur le plancher |
| Nom sensible | EC-48 s'ouvre à la première utilisation |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une puce | Remplit le nom et la règle, ouvre la valeur |
| « Créer ce pot » | Crée le pot, ajuste la recette ; retour à EC-27 ; bandeau « Pot Tontine créé. », « Annuler » pendant 10 s |
| Retour | EC-27, sans rien créer |

## 8. Données

**Ordre de répartition :** les montants fixes d'abord, puis les pourcentages sur ce qui reste, puis « le reste ». Un pourcentage ajouté réduit d'autant le pot du quotidien.

Un nouveau pot lit les natures correspondantes : Tontine lit *tontine* ; Famille lit *soutien familial* ; Imprévus lit *imprévu*. Un pot libre ne lit rien au départ : EC-34 propose de ranger les natures. La recette duplique alors celle du catalogue : l'original reste intact.

**Exemple.** Tontine fixe de 10 000 sur 120 000 : il reste 110 000, soit Vie courante 77 000, Épargne 22 000, Dettes ou dons 11 000.

## 9. Accessibilité

Le choix de règle annonce son état. L'effet est annoncé quand il change. L'effet se lit sans couleur.

## 10. Mouvement

Entrée d'écran standard. L'effet change en fondu de 100 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Valeur à 30 sp ; marges de 16 dp ; segments sur deux lignes |
| Texte à 200 % | Segments empilés |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`pot_created`, avec la règle et la puce (`tontine`, `family`, `unexpected`, `custom`). **Aucun montant ni nom libre.**
