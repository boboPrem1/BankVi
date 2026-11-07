# EC-17 Historique

| Fiche | |
| --- | --- |
| **Parcours** | PC-04, PC-08, PC-20 |
| **Lot** | L1 |
| **Bible** | SAI-25, SAI-26, SAI-27, SAI-06, SAI-11, SAI-16 |
| **Avant** | EC-12, « Tout voir » |
| **Après** | EC-18, EC-14, EC-13 |
| **Cadre** | 360 × 800 dp, portrait, marges de 16 dp |

## 1. Rôle

Faire le point sur son mois et retrouver n'importe quelle saisie, comme on remonte une conversation.

## 2. Ce qu'on voit

En haut, le mois avec deux flèches, puis un résumé : les revenus reçus, le total des dépenses, et la répartition par catégorie, de la plus grosse à la plus petite. Dessous, trois puces : Tout, Revenus, Dépenses. Puis la conversation du mois, jour après jour : les dépenses à droite en vert, les revenus à gauche en gris, et au centre de discrets repères pour les jours, les comptages et les transferts.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Historique                      │ 56
│ ‹   Novembre 2026   ›              │ 48
│ Revenus    2 000 sur 120 000 FCFA  │ 24
│ Dépenses             41 500 FCFA   │ 24
│ Transport            12 000 FCFA   │ 48
│ Déjeuner              9 000 FCFA   │ 48
│ Non détaillé          3 000 FCFA   │ 48
│ (✓Tout) (Revenus) (Dépenses)       │ 32
│           ( Aujourd'hui )          │ repère
│        ╭ Taxi · 500 FCFA · 8 h 12 ╮│
│╭ Prêt rendu · +2 000 FCFA ╮        │
│                ╭ Pain · 300 FCFA  ╮│
│              ( Hier )              │
│       ( Comptage : 32 800 FCFA )   │
│  ◉Aujourd'hui Horizon  Pots  Plus  │ 72
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 0 |
| Mois et flèches | 48 dp | 8 dp |
| Revenus, Dépenses | 24 dp chacun | 8 dp |
| Lignes de catégorie, 5 au plus, puis « Tout voir » | 48 dp | 12 dp |
| Filtre | 32 dp, fixe en défilant | 12 dp |
| Repère de jour | 24 dp | 8 dp |
| Bulle | 32 dp au moins, écart 8 dp | 12 dp |
| Barre du bas | 72 dp | — |

Tout défile. Le filtre reste accroché sous la barre du haut.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Historique | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Mois | Novembre 2026 | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Revenus | Revenus / 2 000 sur 120 000 FCFA attendus | Roboto 16/24 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Dépenses | Dépenses / 41 500 FCFA | Roboto 16/24 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Ligne de catégorie | Transport / 12 000 FCFA | Roboto 14/20 sp, Regular (400), tabulaire à droite | `#111B21` en clair, `#E9EDEF` en sombre |
| Filtre | Tout, Revenus, Dépenses | Puces, une seule choisie | Choisie : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Repère | Aujourd'hui, Hier, Jeudi 5 novembre | Pilule centrée, Roboto 12/16 sp, Regular (400), marges 8 dp | Contour `#E9EDEF` en clair, `#2A3942` en sombre, texte `#54656F` en clair, `#AEBAC1` en sombre |
| Dépense | Taxi · 500 FCFA · 8 h 12 | Bulle à droite, 80 % au plus, haut droit 4 dp, Roboto 14/20 sp, Regular (400) | Fond `#D9FDD3` en clair, `#005C4B` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Revenu | Prêt rendu · +2 000 FCFA · 8 h 00 | Bulle à gauche, haut gauche 4 dp, Roboto 14/20 sp, Regular (400) | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Sous-ligne | Espèces · Transport | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Comptage | Comptage : 32 800 FCFA en espèces | Repère centré | Contour `#E9EDEF` en clair, `#2A3942` en sombre, texte `#54656F` en clair, `#AEBAC1` en sombre |
| Transfert | Mixx vers Espèces : 20 000 FCFA | Repère centré, icône `swap_vert` | Contour `#E9EDEF` en clair, `#2A3942` en sombre, texte `#54656F` en clair, `#AEBAC1` en sombre |
| Non détaillé | Non détaillé : 500 FCFA | Repère centré | Contour `#E9EDEF` en clair, `#2A3942` en sombre, texte `#54656F` en clair, `#AEBAC1` en sombre |
| Prévu | Électricité · 8 000 FCFA · Prévu | Bulle du bon côté, sans fond, contour pointillé | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Groupe | Icône `link` de 16 dp | Dans la sous-ligne | `#54656F` en clair, `#AEBAC1` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| Filtre Revenus | Résumé réduit aux revenus ; seuls les revenus restent |
| Filtre Dépenses | Résumé réduit aux dépenses ; seules les dépenses restent |
| Catégorie touchée | La puce « Transport » s'ajoute au filtre, avec `close` pour l'enlever |
| Revenu variable | Revenus : 30 000 FCFA, au moins 90 000 FCFA attendus |
| Mois sans revenu attendu | Revenus : 2 000 FCFA |
| Mois suivant | La flèche droite est désactivée sur le mois en cours |
| Poche d'activité active | Ses mouvements sont affichés à part, sous le résumé : Activité : +45 000 / −12 000 FCFA |
| Vide | Tes saisies apparaîtront ici. |
| Mois sans saisie | Rien de noté ce mois-là. |
| Hors ligne | Identique, avec l'indicateur « Enregistré sur ce téléphone » |

Aucune comparaison jugée, aucun rouge, aucun « tu as trop dépensé ».

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une bulle | EC-18 |
| Appui long sur une bulle | EC-14 pour changer la catégorie, avec « Annuler » : 2 taps |
| Toucher un comptage, un transfert ou un « Non détaillé » | EC-18 |
| Toucher une catégorie | Filtre la liste |
| Flèches | Change de mois |
| Retour | EC-12 |

## 8. Données

| Valeur | Règle |
| --- | --- |
| Revenus reçus | Réel seulement |
| Revenus attendus | Récurrents déclarés du mois |
| Dépenses | Réel, avec les frais de transfert et les « Non détaillé » |
| Exclus du résumé | Prévus, comptages, transferts entre poches |
| Ordre | Les jours les plus récents en haut ; dans un jour, les plus récentes en haut |

## 9. Accessibilité

Bulles : « Dépense : Taxi, 500 francs CFA, 8 h 12, Espèces, Transport. » Le filtre annonce le nombre de résultats : « 12 dépenses ». Action personnalisée « Changer la catégorie » pour remplacer l'appui long. Prévu : le mot est écrit, le pointillé n'est pas seul.

## 10. Mouvement

Une ligne supprimée se replie en 200 ms. Le filtre s'applique sans glissement.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp ; bulles à 85 % au plus |
| Texte à 200 % | Montants sous les noms dans le résumé |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`history_viewed`, `history_filtered`, avec le filtre. **Aucun montant ni libellé.**
