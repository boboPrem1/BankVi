# Couleurs

Le thème suit le réglage du téléphone. Chaque couleur a un rôle : on choisit un rôle, jamais une valeur. Le thème sombre a ses propres valeurs, ce n'est pas une inversion.

## 1. Palette

| Jeton | Clair | Sombre | Rôle |
| --- | --- | --- | --- |
| `bg.canvas` | `#FAF7F2` | `#0D1520` | Fond de tous les écrans (sable ivoire / bleu nuit atlantique) |
| `bg.subtle` | `#F1ECE4` | `#142030` | Zones groupées, champ de recherche |
| `bg.elevated` | `#FFFFFF` | `#1B2A3E` | Cartes, feuilles basses, dialogues |
| `bg.bubbleApp` | `#F1ECE4` | `#1B2A3E` | Capsule : l'app explique quelque chose |
| `bg.bubbleUser` | `#FCE8DF` | `#4A2218` | Capsule sortante : dépense notée, réponse de l'utilisateur |
| `bg.bubbleIncome` | `#E4F2F7` | `#133447` | Capsule entrante : revenu noté |
| `bg.selected` | `#F9DFD3` | `#4D2318` | Puce, carte ou onglet sélectionnés |
| `bg.scrim` | `rgba(13,21,32,0.45)` | `rgba(0,0,0,0.65)` | Voile derrière une feuille ou un dialogue |
| `text.primary` | `#1C1613` | `#F5F0EB` | Titres, montants, texte courant |
| `text.secondary` | `#5C514B` | `#B8AFA8` | Aides, descriptions |
| `text.tertiary` | `#6B5E57` | `#948B84` | Axes, placeholders. En clair : sur fond sable ou blanc uniquement |
| `text.timeOnExpense` | `#52362C` | `#FAD8C8` | Heure dans une capsule de dépense |
| `text.disabled` | `#6B5E57` | `#948B84` | Libellé d'un bouton désactivé |
| `text.link` | `#A6331A` | `#FF8B6B` | Boutons texte, liens, marque écrite |
| `text.onAction` | `#FFFFFF` | `#1C120E` | Texte et icône sur le terracotta d'action |
| `text.onSelected` | `#5E1D0E` | `#FDE5DA` | Texte sur fond sélectionné |
| `action.primary` | `#B83B20` | `#F07B5A` | Bouton principal (terracotta de Lomé / terracotta solaire) |
| `action.primaryPressed` | `#962E17` | `#D96443` | Bouton principal, état appuyé |
| `action.disabled` | `#E6DFD5` | `#1B2A3E` | Fond d'un bouton désactivé |
| `action.ripple` | `rgba(28,22,19,0.10)` | `rgba(245,240,235,0.12)` | Retour tactile sur une surface |
| `border.subtle` | `#E3DCD2` | `#26384F` | Séparateurs, contour de carte |
| `border.control` | `#7A6D65` | `#728399` | Soulignement de champ, contour de puce et de radio |
| `border.focus` | `#B83B20` | `#FF8B6B` | Champ actif, carte sélectionnée |
| `status.warnFg` | `#8A4B00` | `#FFD27A` | Argent manquant, attention |
| `status.warnBg` | `#FFF3D6` | `#3A2C10` | Fond de l'attention |
| `status.errorFg` | `#B3261E` | `#F2B8B5` | Erreur de saisie, action destructive |
| `status.errorBg` | `#FBE9E7` | `#3C1F1E` | Fond d'une erreur |
| `status.infoFg` | `#0B5CAD` | `#A8D4FF` | Information neutre, marque « Exemple » |
| `status.infoBg` | `#E3F0FB` | `#10283F` | Fond de l'information |
| `status.successFg` | `#0D6E52` | `#47D1A3` | Confirmation, en texte et icône |
| `chart.line` | `#0E6BA8` | `#4DA8DA` | Courbe de l'horizon (bleu lagune) |
| `chart.area` | `rgba(14,107,168,0.12)` | `rgba(77,168,218,0.14)` | Lavis sous la courbe |
| `chart.grid` | `#E3DCD2` | `#26384F` | Lignes de repère |
| `chart.zero` | `#7A6D65` | `#728399` | Ligne du zéro |
| `chart.lack` | `rgba(138,75,0,0.12)` | `rgba(255,210,122,0.14)` | Lavis de la zone sous zéro |
| `pot.1` | `#0E6BA8` | `#3898EC` | Premier pot d'une recette (Lagune) |
| `pot.2` | `#B85A00` | `#E0862B` | Deuxième pot (Ocre) |
| `pot.3` | `#6B52E0` | `#8B75FF` | Troisième pot (Indigo) |
| `pot.4` | `#0D7A5F` | `#22B08C` | Quatrième pot (Émeraude) |
| `pot.5` | `#C84374` | `#E66796` | Cinquième pot (Hibiscus) |
| `pot.6` | `#826E18` | `#A89432` | Sixième pot (Or bronze) |
| `illustration.outline` | `#1C1613` | `#F5F0EB` | Contour de toutes les illustrations |
| `illustration.green` | `#B83B20` | `#F07B5A` | Billet, éléments d'action terracotta |
| `illustration.mint` | `#FCE8DF` | `#133447` | Grande surface d'une illustration |
| `illustration.amber` | `#FFBC38` | `#FFBC38` | Pièces de monnaie |
| `illustration.paper` | `#FFFFFF` | `#1B2A3E` | Surface neutre d'une illustration |

## 2. Contrastes calculés

Calcul WCAG 2.1. Le seuil est de 4,5:1 pour le texte et de 3:1 pour les contours et les graphiques.

| Élément | Fond | Seuil | Clair | Sombre |
| --- | --- | --- | --- | --- |
| `text.primary` | `bg.canvas` | 4,5:1 | 16,75:1 | 16,19:1 |
| `text.primary` | `bg.subtle` | 4,5:1 | 15,22:1 | 14,50:1 |
| `text.primary` | `bg.elevated` | 4,5:1 | 17,89:1 | 12,81:1 |
| `text.primary` | `bg.bubbleUser` | 4,5:1 | 15,12:1 | 12,10:1 |
| `text.secondary` | `bg.canvas` | 4,5:1 | 7,19:1 | 8,50:1 |
| `text.secondary` | `bg.subtle` | 4,5:1 | 6,53:1 | 7,61:1 |
| `text.secondary` | `bg.bubbleApp` | 4,5:1 | 6,53:1 | 6,73:1 |
| `text.primary` | `bg.bubbleIncome` | 4,5:1 | 15,63:1 | 11,52:1 |
| `text.secondary` | `bg.bubbleIncome` | 4,5:1 | 6,71:1 | 6,05:1 |
| `text.tertiary` | `bg.canvas` | 4,5:1 | 5,84:1 | 5,49:1 |
| `text.link` | `bg.canvas` | 4,5:1 | 6,32:1 | 8,00:1 |
| `text.link` | `bg.elevated` | 4,5:1 | 6,75:1 | 6,33:1 |
| `text.link` | `bg.subtle` | 4,5:1 | 5,74:1 | 7,16:1 |
| `text.onAction` | `action.primary` | 4,5:1 | 5,70:1 | 6,73:1 |
| `text.onAction` | `action.primaryPressed` | 4,5:1 | 7,78:1 | 5,13:1 |
| `text.onSelected` | `bg.selected` | 4,5:1 | 9,97:1 | 11,09:1 |
| `status.warnFg` | `status.warnBg` | 4,5:1 | 6,17:1 | 9,53:1 |
| `status.warnFg` | `bg.canvas` | 4,5:1 | 6,37:1 | 12,88:1 |
| `status.errorFg` | `bg.canvas` | 4,5:1 | 6,12:1 | 10,74:1 |
| `status.errorFg` | `status.errorBg` | 4,5:1 | 5,58:1 | 8,74:1 |
| `status.infoFg` | `status.infoBg` | 4,5:1 | 5,76:1 | 9,68:1 |
| `status.successFg` | `bg.canvas` | 4,5:1 | 5,83:1 | 9,53:1 |
| `border.control` | `bg.canvas` | 3:1 | 4,68:1 | 4,73:1 |
| `border.control` | `bg.elevated` | 3:1 | 5,00:1 | 3,75:1 |
| `border.focus` | `bg.canvas` | 3:1 | 5,33:1 | 8,00:1 |
| `chart.line` | `bg.canvas` | 3:1 | 5,33:1 | 6,92:1 |
| `chart.zero` | `bg.canvas` | 3:1 | 4,68:1 | 4,73:1 |
| `pot.1` | `bg.canvas` | 3:1 | 5,33:1 | 6,00:1 |
| `pot.2` | `bg.canvas` | 3:1 | 4,37:1 | 6,65:1 |
| `pot.3` | `bg.canvas` | 3:1 | 5,03:1 | 5,31:1 |
| `pot.4` | `bg.canvas` | 3:1 | 4,95:1 | 6,69:1 |
| `pot.5` | `bg.canvas` | 3:1 | 4,36:1 | 5,89:1 |
| `pot.6` | `bg.canvas` | 3:1 | 4,69:1 | 6,07:1 |

## 3. Règles d'usage

| Règle | Détail |
| --- | --- |
| **Terracotta d'action** | `#B83B20` en clair (texte `#FFFFFF`), `#F07B5A` en sombre (texte `#1C120E`) : bouton principal et barre d'accent des dépenses seulement. |
| **Lien** | `#A6331A` en clair, `#FF8B6B` en sombre pour les boutons texte et les liens. |
| **Argent qui manque** | `#8A4B00` en clair, `#FFD27A` en sombre sur `#FFF3D6` en clair, `#3A2C10` en sombre, toujours avec une icône et une phrase. Jamais de rouge : un manque est un fait, pas une faute. |
| **Rouge** | `#B3261E` en clair, `#F2B8B5` en sombre seulement pour une erreur de saisie et une action destructive. |
| **Dépense et revenu** | Même couleur de texte (`#1C1613` en clair, `#F5F0EB` en sombre). Capsule sortante argile (`#FCE8DF` / `#4A2218`) à droite avec bordure terracotta et signe « − » (U+2212) ; capsule entrante lagune (`#E4F2F7` / `#133447`) à gauche avec bordure bleu lagune et signe « + ». |
| **Couleur seule** | Jamais : une couleur d'état s'accompagne toujours d'une icône et de texte. |
| **Texte tertiaire en clair** | Sur `#FAF7F2` en clair, `#0D1520` en sombre uniquement. Sur `#F1ECE4`, utiliser `#5C514B` en clair, `#B8AFA8` en sombre. |
| **Couleurs des pots** | Pour une pastille ou une barre, jamais pour du texte. L'ordre est fixe. Un pot garde sa couleur tant qu'il existe. |

## 4. Palette des pots

Six couleurs, attribuées dans l'ordre des pots d'une recette : Lagune (`#0E6BA8`), Ocre (`#B85A00`), Indigo (`#6B52E0`), Émeraude (`#0D7A5F`), Hibiscus (`#C84374`) et Or bronze (`#826E18`). Au-delà de six pots, les suivants prennent le gris `#7A6D65` en clair, `#728399` en sombre et s'affichent par leur nom dans la liste, sans teinte nouvelle.

Chaque segment de la barre des pots porte un trou de 2 dp entre segments et le nom de chaque pot est écrit dans la liste.

## 5. Couleurs du paysage du statut

Les couleurs du paysage sont dans `tokens.json` (`artwork`) et leur usage dans le [fichier 17](17-statut-et-experience.md#7-lartwork--mon-horizon-en-paysage). Elles sont identiques en clair et en sombre, et le texte blanc y dépasse 4,5:1 sur chaque couleur du ciel. Elles ne servent à rien d'autre.

## 6. Couleurs réservées aux illustrations

`#1C1613` en clair, `#F5F0EB` en sombre pour le contour, `#B83B20` en clair, `#F07B5A` en sombre pour l'accent terracotta, `#FCE8DF` en clair, `#133447` en sombre pour les grandes surfaces, `#FFBC38` (clair et sombre) pour les pièces, `#FFFFFF` en clair, `#1B2A3E` en sombre pour les surfaces neutres. Elles ne servent à rien d'autre.
