# EC-37 Menu

| Fiche | |
| --- | --- |
| **Parcours** | Tous les réglages |
| **Lot** | L1 |
| **Bible** | UX-03, VAL-09 |
| **Avant** | Onglet Plus |
| **Après** | EC-38 à EC-41, EC-43 à EC-46, EC-52 |
| **Cadre** | 360 × 800 dp, portrait, marges de 16 dp |

## 1. Rôle

Tout retrouver au même endroit : les menus ne se réordonnent jamais.

## 2. Ce qu'on voit

Une liste simple, comme les réglages de WhatsApp : une icône ronde, un titre et une courte description par ligne. Pas de bouton vert. Pendant le test, une ligne en plus invite à donner son avis.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ Plus                               │ 56
│ ◉ Mes poches                       │ 72
│   Espèces, Mixx, Flooz             │
│ ◉ Revenus et charges               │ 72
│ ◉ Mon rituel et alertes            │ 72
│ ◉ Pass Plus                        │ 72
│ ◉ Ce que l'app a appris            │ 72
│ ◉ Mes natures                      │ 72
│ ◉ Mes données                      │ 72
│ ◉ Sécurité                         │ 72
│ ◉ À propos                         │ 72
│  Aujourd'hui Horizon Pots ◉Plus    │ 72
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 0 |
| Ligne | 72 dp | 0, avec séparateur |
| Barre du bas | 72 dp | — |

La liste défile.

## 5. Éléments

| Élément | Style | Couleur |
| --- | --- | --- |
| Fond | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre « Plus » | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Avatar | 40 dp, icône 24 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre, icône `#54656F` en clair, `#AEBAC1` en sombre |
| Titre de ligne | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Description | Roboto 14/20 sp, Regular (400), une ligne | `#54656F` en clair, `#AEBAC1` en sombre |
| Séparateur | 1 dp, à l'aplomb du texte | `#E9EDEF` en clair, `#2A3942` en sombre |
| Onglet actif | Icône `menu`, pastille 56 × 32 dp | Pastille `#D8FDD2` en clair, `#103529` en sombre, icône `#0A3D2E` en clair, `#D9FDD3` en sombre |

| Ligne | Description | Icône | Ouvre |
| --- | --- | --- | --- |
| Mes poches | Espèces, Mixx, Flooz | `account_balance_wallet` | EC-38 |
| Revenus et charges | Ce qui revient chaque mois | `event_repeat` | EC-39 |
| Mon rituel et alertes | Rappel à 20 h | `notifications` | EC-40 |
| Pass Plus | Gratuit, ou Actif jusqu'au 6 décembre | `star` | EC-41 |
| Ce que l'app a appris | Tes habitudes, à corriger | `lightbulb` | EC-43 |
| Mes natures, à partir du L2 | Besoin, envie, épargne | `label` | EC-44 |
| Mes données | Sauvegarde, export, suppression | `cloud_done` | EC-45 |
| Sécurité | Verrouillage, numéro, e-mail de secours | `lock` | EC-52 |
| À propos | Version, mentions légales | `info` | EC-46 |
| Donner mon avis, pendant le test | Dans le groupe WhatsApp des testeurs | `chat` | Le groupe, en externe |

La description du rituel et du pass suit l'état de l'utilisateur.

## 6. États

| État | Affichage |
| --- | --- |
| Test fermé | La ligne « Donner mon avis » s'affiche en tête |
| Lancement public | Cette ligne disparaît |
| Rituel en pause | Description : En pause |
| Sans compte | Description de Mes données : Sauvegarde à faire |
| Hors ligne | Identique, sauf « Donner mon avis », qui ouvre WhatsApp si possible |

## 7. Gestes et navigation

Toucher une ligne ouvre l'écran. Retour : EC-12. L'ordre ne change jamais et ne dépend pas de l'usage.

## 8. Données

Aucune saisie. Aucune offre n'y apparaît en plus de la ligne Pass Plus.

## 9. Accessibilité

Lignes : « Mes poches, Espèces, Mixx, Flooz, bouton ». Icônes ignorées. Le lien externe annonce : « ouvre WhatsApp ».

## 10. Mouvement

Ondulation au toucher, sans autre animation.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Description coupée en fin de ligne |
| Texte à 200 % | Description sur deux lignes, hauteur libre |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`menu_item_opened`, avec l'identifiant de la ligne ; `feedback_opened`.
