# W-02 Offres

| Fiche | |
| --- | --- |
| **Parcours** | PC-15 |
| **Lot** | L1 |
| **Bible** | PAY-02, PAY-03, VAL-07 |
| **Avant** | W-01, W-03 en cas d'échec |
| **Après** | W-03 |
| **Cadre** | 360 px de large d'abord ; colonne de 480 px au plus, centrée ; marges de 16 px |

## 1. Rôle

Choisir sa durée et voir le prix exact, sans mécanisme de pression.

## 2. Ce qu'on voit

Le numéro connecté, puis deux cartes : 30 jours à 1 000 FCFA, 1 an à 10 000 FCFA. La première est sélectionnée. Une liste rappelle ce que le pass ajoute. Le bouton vert reprend le prix : « Payer 1 000 FCFA ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ BankVi              +228 90 12 34 56│ 56
│ Choisis ton Pass Plus              │ 32
│ ╔════════════════════════════════╗ │
│ ║ ◉ 30 jours          1 000 FCFA ║ │ 72
│ ╚════════════════════════════════╝ │
│ ┌────────────────────────────────┐ │
│ │ ○ 1 an             10 000 FCFA │ │ 72
│ └────────────────────────────────┘ │
│ ✓ Horizon à 90 jours               │ 24
│ ✓ « Puis-je me permettre ça ? »    │ 24
│ ✓ Plusieurs recettes               │ 24
│ ✓ Exports mis en forme             │ 24
│ Paiement sécurisé par FedaPay,     │ 40
│ avec Mixx, Flooz ou une carte.     │
│ ╭────────────────────────────────╮ │
│ │        Payer 1 000 FCFA        │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| En-tête | 56 px | 8 px |
| Titre | 32 px | 12 px |
| Cartes | 72 px chacune | 12 px |
| Liste | 24 px par ligne | 16 px |
| Mention | 40 px | 12 px |
| Bouton | 48 px | 24 px |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Numéro | +228 90 12 34 56 | Roboto 12/16 sp, Regular (400), tabulaire | `#54656F` en clair, `#AEBAC1` en sombre |
| Titre | Choisis ton Pass Plus | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Carte au repos | 1 an · 10 000 FCFA | Rayon 12 px, contour 1 px | Fond `#FFFFFF` en clair, `#202C33` en sombre, contour `#7A8A94` en clair, `#667781` en sombre |
| Carte choisie | 30 jours · 1 000 FCFA | Contour 2 px | Fond `#D8FDD2` en clair, `#103529` en sombre, contour `#008069` en clair, `#25D366` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Durée, prix | — | Roboto 16/24 sp, Medium (500), tabulaire | Selon la carte |
| Coche | `check` | 20 px | `#00735E` en clair, `#25D366` en sombre |
| Ligne | Horizon à 90 jours | Roboto 14/20 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Mention | Paiement sécurisé par FedaPay, avec Mixx, Flooz ou une carte. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Payer 1 000 FCFA | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Pendant le test | Une seule carte : Prévente, 1 000 FCFA, 30 jours. Texte : « Actif tout de suite. Tes 30 jours commencent au lancement public. Remboursée si le lancement est annulé. » avec le lien vers les conditions |
| Numéro hors du Togo, à partir du L2 | Mention : Paiement sécurisé par FedaPay, avec le mobile money ou une carte. |
| Pass déjà actif | Bandeau : Ton pass est actif jusqu'au 6 décembre. Cet achat s'ajoute à la fin. |
| Retour d'échec | Bandeau d'erreur, fond `#FBE9E7` en clair, `#3C1F1E` en sombre, texte `#B3261E` en clair, `#F2B8B5` en sombre : le motif, puis « Rien n'a été débité » si FedaPay le confirme |
| Paiement en attente | Ton paiement est en cours de vérification. Ne paie pas une deuxième fois. Bouton désactivé |
| Organisation partenaire | Ton pass est offert par ton employeur. Rien à payer. |
| Réseau coupé | Le réseau a coupé. Réessaie : rien n'a été débité. |

Aucun compte à rebours, aucune fausse promotion, aucune option pré-cochée en dehors de la durée.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une carte | La choisit ; le bouton change : « Payer 10 000 FCFA » |
| « Payer » | W-03 |
| Pied | Pages de texte |

## 8. Données

| Offre | Prix | Durée |
| --- | --- | --- |
| Pass Plus 30 jours | 1 000 FCFA | 30 jours |
| Pass Plus 1 an | 10 000 FCFA | 365 jours |
| Prévente | 1 000 FCFA | Active dès le paiement, 30 jours à partir du lancement public, remboursée si le lancement est annulé |

Les droits sont rattachés au compte. Le prix est celui qui sera débité : il inclut tout. **Les frais éventuels de FedaPay et les taxes sont à confirmer.**

## 9. Accessibilité

Vrais boutons radio dans un `fieldset`. Le bouton annonce le prix. Messages en `role="status"`. Focus visible.

## 10. Mouvement

Changement de carte en 100 ms. Rien d'autre.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 px | Prix sous la durée |
| Ordinateur | Colonne de 480 px |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`offer_viewed`, `offer_selected`, `payment_started`, avec l'offre. Sans donnée de paiement.
