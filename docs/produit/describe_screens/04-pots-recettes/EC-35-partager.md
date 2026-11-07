# EC-35 Partager

| Fiche | |
| --- | --- |
| **Parcours** | PC-17 |
| **Lot** | L2 |
| **Bible** | PAR-01, LEG-06 |
| **Avant** | EC-30 |
| **Après** | Feuille de partage Android ; EC-30 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp |

## 1. Rôle

Permettre à l'utilisateur de partager sa façon de répartir, à son initiative, sans jamais exposer ses montants.

## 2. Ce qu'on voit

Un aperçu de l'image qui sera envoyée : une carte carrée avec le paysage en fond, le titre « Ma recette », les pots et leurs pourcentages. Dessous, un rappel rassurant : « Aucun montant ne part. Seuls les noms des pots et les pourcentages. » En bas, le bouton vert « Partager sur WhatsApp » et le lien « Copier le lien ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Partager                        │ 56
│ ┌────────────────────────────────┐ │
│ │ Ma recette                     │ │
│ │ 70 / 20 / 10                   │ │
│ │ ● Vie courante 70 %            │ │ 312
│ │ ● Épargne 20 %                 │ │
│ │ ● Dettes ou dons 10 %          │ │
│ │        ☼   ▂▃▅▃▂▁▂▃▅▆▄▂        │ │
│ │ BankVi ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     │ │
│ └────────────────────────────────┘ │
│ Aucun montant ne part. Seuls les   │
│ noms des pots et les pourcentages. │ 40
│ ╭────────────────────────────────╮ │
│ │     Partager sur WhatsApp      │ │ 48
│ ╰────────────────────────────────╯ │
│           Copier le lien           │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Aperçu carré | 312 × 312 dp | 12 dp |
| Rappel | 40 dp | 12 dp |
| Pied | 128 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Partager | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Carte | — | Rayon 12 dp ; dégradé et collines génériques, sans lien avec la courbe de l'utilisateur | Ciel `#054D43` → `#0E7A6A` |
| Titre de carte | Ma recette | Roboto 18/24 sp, Medium (500) | `#FFFFFF` |
| Nom de recette | 70 / 20 / 10 | Roboto 24/32 sp, Medium (500) | `#FFFFFF` |
| Pot | Vie courante 70 % | Roboto 16/24 sp, Regular (400), pastille 12 dp | `#FFFFFF` ; pastille à contour blanc, couleur du pot |
| Marque | BankVi | Roboto 14/20 sp, Medium (500) | `#FFFFFF` |
| Rappel | Aucun montant ne part. Seuls les noms des pots et les pourcentages. | Roboto 14/20 sp, Regular (400), icône `info` | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Partager sur WhatsApp | Roboto 16/24 sp, Medium (500), sans logo | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte | Copier le lien | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

**Le paysage de l'image est générique :** les collines de l'utilisateur révéleraient la forme de sa courbe, donc elles n'y figurent pas. Le logo WhatsApp n'apparaît ni sur l'image, ni sur le bouton.

## 6. États

| État | Affichage |
| --- | --- |
| WhatsApp absent du téléphone | Bouton : « Partager », feuille de partage Android |
| Lien copié | Bandeau : « Lien copié. » |
| Sans réseau | L'image reste partageable. Le lien : « Il faut du réseau pour créer le lien. » |
| Noms de pots personnels | Rappel en plus : « Les noms de tes pots sont visibles. » |
| Hors ligne | Comme sans réseau |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Partager sur WhatsApp » | Ouvre WhatsApp par la feuille de partage, avec l'image et le lien ; l'utilisateur choisit le destinataire |
| « Copier le lien » | Copie le lien, avec le bandeau |
| Retour | EC-30 |

Aucun envoi automatique, aucune liste de contacts, aucune relance : le partage vient toujours de l'utilisateur.

## 8. Données

| Part | Ne part jamais |
| --- | --- |
| Noms des pots, pourcentages, règles, natures lues | Montants, revenu, soldes, numéro, nom, habitudes |

La recette est de la donnée, jamais du code. Le lien ne contient aucune information personnelle.

## 9. Accessibilité

Aperçu : « Image à partager : Ma recette, 70, 20, 10. Vie courante 70 %, Épargne 20 %, Dettes ou dons 10 %. » Le rappel est lu avant le bouton.

## 10. Mouvement

Entrée d'écran standard, sans autre animation. Le paysage de l'image est fixe.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Aperçu à 240 dp |
| 320 × 568 dp | Aperçu à 200 dp, marges de 16 dp |
| Texte à 200 % | Le contenu défile |
| Thème sombre | L'image reste identique |

## 12. Mesure

`recipe_shared`, avec le canal (`whatsapp`, `link`, `other`). **Aucun montant ni destinataire.**
