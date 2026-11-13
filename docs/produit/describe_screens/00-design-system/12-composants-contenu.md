# Composants : contenu

## 1. Ligne de liste

| Attribut | Une ligne de texte | Deux lignes de texte |
| --- | --- | --- |
| Hauteur | 56 dp | 72 dp |
| Avatar | Facultatif | 40 dp, à 16 dp du texte |
| Titre | Roboto 16/24 sp, Medium (500), `#1C1613` en clair, `#F5F0EB` en sombre | Identique |
| Sous-titre | — | Roboto 14/20 sp, Regular (400), `#5C514B` en clair, `#B8AFA8` en sombre |
| Valeur à droite | Roboto 16/24 sp, Regular (400), chiffres tabulaires | Identique, sur la ligne du titre |
| Séparateur | 1 dp `#E3DCD2` en clair, `#26384F` en sombre, à l'aplomb du texte | Identique |
| Appui | Ondulation sur toute la ligne | Identique |

## 2. Avatar

Cercle de 40 dp, fond `#F1ECE4` en clair, `#142030` en sombre, contenu `#5C514B` en clair, `#B8AFA8` en sombre : une icône de 24 dp, ou une initiale en Roboto 16/24 sp, Medium (500). Mixx et Flooz ont l'initiale « M » et « F » : leurs logos ne sont pas utilisés sans autorisation.

## 3. Capsule de flux (ou capsule explicative)

| Attribut | Capsule de l'app | Capsule de l'utilisateur |
| --- | --- | --- |
| Rôle | L'app explique un fait | Rappel de ce que l'utilisateur a noté |
| Fond | `#F1ECE4` en clair, `#1B2A3E` en sombre | `#FCE8DF` en clair, `#4A2218` en sombre |
| Texte | Roboto 14/20 sp, Regular (400), `#1C1613` en clair, `#F5F0EB` en sombre | Roboto 14/20 sp, Regular (400), `#1C1613` en clair, `#F5F0EB` en sombre |
| Coins et bordure | 16 dp sur les 4 coins, contour 1 dp `#E3DCD2` / `#26384F` | 16 dp sur les 4 coins (aucun coin aplati ni queue) |
| Alignement | À gauche | À droite |
| Marges intérieures | 12 dp horizontal, 8 dp vertical | Identique |
| Largeur | Pleine largeur au plus | 80 % au plus |
| Ombre | `e1` en clair, aucune en sombre | Identique |

Une capsule explique ou rapporte un fait. Elle ne contient aucun bouton. Les réponses possibles, comme la répartition du bilan, sont des puces placées sous la capsule.

### Saisies en flux financier (SAI-27)

L'argent qui sort part vers la droite avec une barre terracotta ; l'argent qui entre arrive par la gauche avec une barre lagune.

| Saisie | Position | Fond | Barre latérale (3 dp) | Exemple |
| --- | --- | --- | --- | --- |
| **Dépense** | À droite | `#FCE8DF` en clair, `#4A2218` en sombre | À droite, `#B83B20` / `#F07B5A` | Taxi · −500 FCFA · 8 h 12 |
| **Revenu** | À gauche | `#E4F2F7` en clair, `#133447` en sombre | À gauche, `#0E6BA8` / `#4DA8DA` | Salaire · +120 000 FCFA · 8 h 00 |
| **Comptage, transfert, « Non détaillé »** | Au centre | Repère en pilule, 1 dp `#E3DCD2` en clair, `#26384F` en sombre | Aucune | Comptage : 32 000 FCFA en espèces |

Le sens ne repose jamais sur la seule position ou couleur : une dépense porte toujours « − » (U+2212), un revenu porte toujours « + », et TalkBack lit « Dépense : » ou « Revenu : » avant le libellé. Largeur de 80 % au plus. Heure en Roboto 12/16 sp, Regular (400), `#52362C` sur une dépense en clair, `#FAD8C8` en sombre ; `#5C514B` sur un revenu en clair, `#B8AFA8` en sombre. Sans queue ni coche de lecture. Un toucher ouvre le détail, un appui long change la catégorie.

**En P2 (SAI-20) :** un champ façon message s'ajoutera en bas : « salaire 200000 », « jus 100 », « déplacement 1500 ». La bulle prend aussitôt le bon côté, avec « Annuler ».

## 4. Carte

Fond `#FFFFFF` en clair, `#172436` en sombre, rayon 14 dp, marges intérieures de 16 dp, contour de 1 dp `#E3DCD2` en clair, `#26384F` en sombre sans ombre. Une seule carte d'information à la fois sur un écran principal (UX).

## 5. Feuille basse

| Attribut | Valeur |
| --- | --- |
| Fond | `#FFFFFF` en clair, `#172436` en sombre |
| Coins supérieurs | 28 dp |
| Poignée | 32 × 4 dp, en pilule, `#7A6D65` en clair, `#728399` en sombre, centrée, à 8 dp du haut |
| Titre | Roboto 18/24 sp, Medium (500), `#1C1613` en clair, `#F5F0EB` en sombre, à 24 dp du haut |
| Marges | 24 dp |
| Ombre | `e3` |
| Voile | `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre |
| Hauteur | Selon le contenu, 90 % de l'écran au plus |
| Fermeture | Glisser vers le bas, toucher le voile, retour Android |
| Bouton | Le bouton principal de la feuille est le seul bouton terracotta visible : la feuille recouvre le pied de l'écran |

Si la feuille contient une saisie en cours, un glissement accidentel ne ferme pas : seuls le voile et le retour ferment, sans perdre la saisie tant que l'écran reste ouvert.

## 6. Bandeau bas (Annuler ou information)

| Attribut | Valeur |
| --- | --- |
| Position | 8 dp au-dessus du pied d'action ou de la barre du bas, marges de 8 dp |
| Fond | `#1C1613` en clair, `#F5F0EB` en sombre (inversé) |
| Texte | Roboto 14/20 sp, Regular (400), `#FAF7F2` en clair, `#1C1613` en sombre |
| Action | « Annuler », Roboto 14/20 sp, Medium (500), `#FF8B6B` en clair, `#A6331A` en sombre |
| Hauteur | 48 dp au moins |
| Rayon | 8 dp |
| Ombre | `e2` |
| Durée | 10 s avec « Annuler » (20 s avec TalkBack) ; 4 s pour une simple information |
| TalkBack | Annoncé poliment, et l'action reste atteignable pendant toute la durée |

## 7. Bandeau d'état

Message fixe, en haut d'un contenu.

| Variante | Fond | Texte et icône |
| --- | --- | --- |
| Attention | `#FFF3D6` en clair, `#3A2C10` en sombre | `#8A4B00` en clair, `#FFD27A` en sombre, `warning` |
| Erreur | `#FBE9E7` en clair, `#3C1F1E` en sombre | `#B3261E` en clair, `#F2B8B5` en sombre, `error` |
| Information | `#E3F0FB` en clair, `#10283F` en sombre | `#0B5CAD` en clair, `#A8D4FF` en sombre, `info` |

Rayon 8 dp, marges de 12 dp, icône de 20 dp, texte Roboto 14/20 sp, Regular (400). Il ne contient pas plus de deux lignes.

## 8. Dialogue

Réservé à l'irréversible. Fond `#FFFFFF` en clair, `#172436` en sombre, rayon 28 dp, marges de 24 dp, largeur de l'écran moins 48 dp, titre Roboto 18/24 sp, Medium (500), texte Roboto 14/20 sp, Regular (400) en `#5C514B` en clair, `#B8AFA8` en sombre, boutons texte alignés à droite. Pas de bouton principal terracotta : l'action irréversible est en `#B3261E` en clair, `#F2B8B5` en sombre.

## 9. Indicateur « Enregistré sur ce téléphone »

Icône `smartphone` de 16 dp et texte Roboto 12/16 sp, Regular (400) en `#5C514B` en clair, `#B8AFA8` en sombre. Discret, sans fond, sur l'écran concerné. Il n'est jamais rouge ni jaune.
