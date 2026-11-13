# Couleurs

Le thème suit le réglage du téléphone. Chaque couleur a un rôle : on choisit un rôle, jamais une valeur. Le thème sombre a ses propres valeurs, ce n'est pas une inversion.

## 1. Palette

| Jeton | Clair | Sombre | Rôle |
| --- | --- | --- | --- |
| `bg.canvas` | `#FFFFFF` | `#0B141A` | Fond de tous les écrans |
| `bg.subtle` | `#F0F2F5` | `#111B21` | Zones groupées, champ de recherche |
| `bg.elevated` | `#FFFFFF` | `#202C33` | Cartes, feuilles basses, dialogues |
| `bg.bubbleApp` | `#F0F2F5` | `#202C33` | Bulle : l'app explique quelque chose |
| `bg.bubbleUser` | `#D9FDD3` | `#005C4B` | Bulle sortante : dépense notée, réponse de l'utilisateur |
| `bg.bubbleIncome` | `#F0F2F5` | `#202C33` | Bulle entrante : revenu noté |
| `bg.selected` | `#D8FDD2` | `#103529` | Puce, carte ou onglet sélectionnés |
| `bg.scrim` | `rgba(11,20,26,0.40)` | `rgba(0,0,0,0.60)` | Voile derrière une feuille ou un dialogue |
| `text.primary` | `#111B21` | `#E9EDEF` | Titres, montants, texte courant |
| `text.secondary` | `#54656F` | `#AEBAC1` | Aides, descriptions |
| `text.tertiary` | `#667781` | `#8696A0` | Axes, placeholders. En clair : sur fond blanc uniquement |
| `text.timeOnExpense` | `#3B4A54` | `#D9FDD3` | Heure dans une bulle de dépense |
| `text.disabled` | `#667781` | `#8696A0` | Libellé d'un bouton désactivé |
| `text.link` | `#00735E` | `#25D366` | Boutons texte, liens, marque écrite |
| `text.onAction` | `#0B141A` | `#0B141A` | Texte et icône sur le vert d'action |
| `text.onSelected` | `#0A3D2E` | `#D9FDD3` | Texte sur fond sélectionné |
| `action.primary` | `#25D366` | `#25D366` | Bouton principal |
| `action.primaryPressed` | `#1FAD56` | `#1FAD56` | Bouton principal, état appuyé |
| `action.disabled` | `#E9EDEF` | `#202C33` | Fond d'un bouton désactivé |
| `action.ripple` | `rgba(17,27,33,0.10)` | `rgba(233,237,239,0.12)` | Retour tactile sur une surface |
| `border.subtle` | `#E9EDEF` | `#2A3942` | Séparateurs, contour de carte |
| `border.control` | `#7A8A94` | `#667781` | Soulignement de champ, contour de puce et de radio |
| `border.focus` | `#008069` | `#25D366` | Champ actif, carte sélectionnée |
| `status.warnFg` | `#8A4B00` | `#FFD27A` | Argent manquant, attention |
| `status.warnBg` | `#FFF3D6` | `#3A2C10` | Fond de l'attention |
| `status.errorFg` | `#B3261E` | `#F2B8B5` | Erreur de saisie, action destructive |
| `status.errorBg` | `#FBE9E7` | `#3C1F1E` | Fond d'une erreur |
| `status.infoFg` | `#0B5CAD` | `#A8D4FF` | Information neutre, marque « Exemple » |
| `status.infoBg` | `#E3F0FB` | `#10283F` | Fond de l'information |
| `status.successFg` | `#00735E` | `#25D366` | Confirmation, en texte et icône |
| `chart.line` | `#008069` | `#25D366` | Courbe de l'horizon |
| `chart.area` | `rgba(0,128,105,0.10)` | `rgba(37,211,102,0.10)` | Lavis sous la courbe |
| `chart.grid` | `#E9EDEF` | `#2A3942` | Lignes de repère |
| `chart.zero` | `#7A8A94` | `#667781` | Ligne du zéro |
| `chart.lack` | `rgba(138,75,0,0.12)` | `rgba(255,210,122,0.14)` | Lavis de la zone sous zéro |
| `pot.1` | `#008069` | `#00A884` | Premier pot d'une recette |
| `pot.2` | `#B86200` | `#C47F00` | Deuxième pot |
| `pot.3` | `#7F66FF` | `#8B75FF` | Troisième pot |
| `pot.4` | `#E0568A` | `#E0588A` | Quatrième pot |
| `pot.5` | `#027EB5` | `#2E9BD6` | Cinquième pot |
| `pot.6` | `#8F7A1F` | `#93852A` | Sixième pot |
| `illustration.outline` | `#111B21` | `#E9EDEF` | Contour de toutes les illustrations |
| `illustration.green` | `#25D366` | `#25D366` | Billet, éléments d'action |
| `illustration.mint` | `#D9FDD3` | `#005C4B` | Grande surface d'une illustration |
| `illustration.amber` | `#FFBC38` | `#FFBC38` | Pièces de monnaie |
| `illustration.paper` | `#FFFFFF` | `#202C33` | Surface neutre d'une illustration |

## 2. Contrastes calculés

Calcul WCAG 2.1. Le seuil est de 4,5:1 pour le texte et de 3:1 pour les contours et les graphiques.

| Élément | Fond | Seuil | Clair | Sombre |
| --- | --- | --- | --- | --- |
| `text.primary` | `bg.canvas` | 4,5:1 | 17,46:1 | 15,79:1 |
| `text.primary` | `bg.subtle` | 4,5:1 | 15,57:1 | 14,82:1 |
| `text.primary` | `bg.elevated` | 4,5:1 | 17,46:1 | 12,13:1 |
| `text.primary` | `bg.bubbleUser` | 4,5:1 | 15,75:1 | 6,77:1 |
| `text.secondary` | `bg.canvas` | 4,5:1 | 6,06:1 | 9,38:1 |
| `text.secondary` | `bg.subtle` | 4,5:1 | 5,40:1 | 8,81:1 |
| `text.secondary` | `bg.bubbleApp` | 4,5:1 | 5,40:1 | 7,21:1 |
| `text.primary` | `bg.bubbleIncome` | 4,5:1 | 15,57:1 | 12,13:1 |
| `text.secondary` | `bg.bubbleIncome` | 4,5:1 | 5,40:1 | 7,21:1 |
| `text.tertiary` | `bg.canvas` | 4,5:1 | 4,65:1 | 6,10:1 |
| `text.link` | `bg.canvas` | 4,5:1 | 5,81:1 | 9,38:1 |
| `text.link` | `bg.elevated` | 4,5:1 | 5,81:1 | 7,21:1 |
| `text.link` | `bg.subtle` | 4,5:1 | 5,18:1 | 8,80:1 |
| `text.onAction` | `action.primary` | 4,5:1 | 9,38:1 | 9,38:1 |
| `text.onAction` | `action.primaryPressed` | 4,5:1 | 6,35:1 | 6,35:1 |
| `text.onSelected` | `bg.selected` | 4,5:1 | 10,99:1 | 12,12:1 |
| `status.warnFg` | `status.warnBg` | 4,5:1 | 6,17:1 | 9,53:1 |
| `status.warnFg` | `bg.canvas` | 4,5:1 | 6,80:1 | 13,06:1 |
| `status.errorFg` | `bg.canvas` | 4,5:1 | 6,54:1 | 10,89:1 |
| `status.errorFg` | `status.errorBg` | 4,5:1 | 5,58:1 | 8,74:1 |
| `status.infoFg` | `status.infoBg` | 4,5:1 | 5,76:1 | 9,68:1 |
| `status.successFg` | `bg.canvas` | 4,5:1 | 5,81:1 | 9,38:1 |
| `border.control` | `bg.canvas` | 3:1 | 3,57:1 | 4,00:1 |
| `border.control` | `bg.elevated` | 3:1 | 3,57:1 | 3,08:1 |
| `border.focus` | `bg.canvas` | 3:1 | 4,89:1 | 9,38:1 |
| `chart.line` | `bg.canvas` | 3:1 | 4,89:1 | 9,38:1 |
| `chart.zero` | `bg.canvas` | 3:1 | 3,57:1 | 4,00:1 |
| `pot.1` | `bg.canvas` | 3:1 | 4,89:1 | 6,14:1 |
| `pot.2` | `bg.canvas` | 3:1 | 4,60:1 | 5,65:1 |
| `pot.3` | `bg.canvas` | 3:1 | 4,00:1 | 5,39:1 |
| `pot.4` | `bg.canvas` | 3:1 | 3,58:1 | 5,25:1 |
| `pot.5` | `bg.canvas` | 3:1 | 4,51:1 | 6,00:1 |
| `pot.6` | `bg.canvas` | 3:1 | 4,22:1 | 4,98:1 |

## 3. Règles d'usage

| Règle | Détail |
| --- | --- |
| **Vert d'action** | `#25D366` (clair et sombre) : bouton principal seulement. Jamais comme texte sur fond clair (1,98:1 sur blanc). |
| **Lien** | `#00735E` en clair, `#25D366` en sombre pour les boutons texte et les liens. |
| **Argent qui manque** | `#8A4B00` en clair, `#FFD27A` en sombre sur `#FFF3D6` en clair, `#3A2C10` en sombre, toujours avec une icône et une phrase. Jamais de rouge : un manque est un fait, pas une faute. |
| **Rouge** | `#B3261E` en clair, `#F2B8B5` en sombre seulement pour une erreur de saisie et une action destructive. |
| **Dépense et revenu** | Même couleur de texte (`#111B21` en clair, `#E9EDEF` en sombre). Le signe et le libellé les distinguent : une dépense dans une bulle porte « − » (U+2212), un revenu porte « + ». |
| **Couleur seule** | Jamais : une couleur d'état s'accompagne toujours d'une icône et de texte. |
| **Texte tertiaire en clair** | Sur `#FFFFFF` en clair, `#0B141A` en sombre uniquement. Sur `#F0F2F5` il tombe à 4,14:1 : utiliser `#54656F` en clair, `#AEBAC1` en sombre. |
| **Couleurs des pots** | Pour une pastille ou une barre, jamais pour du texte. L'ordre est fixe. Un pot garde sa couleur tant qu'il existe. |

## 4. Palette des pots

Six couleurs, attribuées dans l'ordre des pots d'une recette. Au-delà de six pots, les suivants prennent le gris `#7A8A94` en clair, `#667781` en sombre et s'affichent par leur nom dans la liste, sans teinte nouvelle.

La palette a été contrôlée au validateur de palettes catégorielles (écart perçu, daltonisme, luminosité, contraste) :

| Thème | Résultat |
| --- | --- |
| Clair, sur `#FFFFFF` | Tous les contrôles réussis. Une paire adjacente, `#E0568A` et `#027EB5`, est dans la zone tolérée pour le daltonisme de type protan (écart de 6,6) : elle n'est autorisée qu'avec un moyen d'identification supplémentaire. |
| Sombre, sur `#0B141A` | Tous les contrôles réussis, sans réserve. |

Le moyen supplémentaire est obligatoire et prévu : un trou de 2 dp entre les segments et le nom de chaque pot dans la liste. Le contrôle ne couvre pas les couleurs d'interface comme le vert d'action, seulement les pots.

## 5. Couleurs du paysage du statut

Les couleurs du paysage sont dans `tokens.json` (`artwork`) et leur usage dans le [fichier 17](17-statut-et-experience.md#7-lartwork--mon-horizon-en-paysage). Elles sont identiques en clair et en sombre, et le texte blanc y dépasse 4,5:1 sur chaque couleur du ciel. Elles ne servent à rien d'autre.

## 6. Couleurs réservées aux illustrations

`#111B21` en clair, `#E9EDEF` en sombre pour le contour, `#25D366` (clair et sombre) pour le vert, `#D9FDD3` en clair, `#005C4B` en sombre pour les grandes surfaces, `#FFBC38` (clair et sombre) pour les pièces, `#FFFFFF` en clair, `#202C33` en sombre pour les surfaces neutres. Elles ne servent à rien d'autre.
