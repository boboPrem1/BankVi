# EC-30 Ma recette

| Fiche | |
| --- | --- |
| **Parcours** | PC-14 |
| **Lot** | L1 ; le partage en L2 |
| **Bible** | REC-03, REC-06, REC-09 |
| **Avant** | EC-27, EC-08 depuis le catalogue ou une recette reçue, EC-24, EC-33, EC-34 |
| **Après** | EC-31, EC-32, EC-35 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Voir exactement ce que fait sa recette, avec ses pots, ses règles et leur ordre, et pouvoir en changer sans rien recatégoriser.

## 2. Ce qu'on voit

Le nom de la recette, sa source, puis la fine barre colorée qui la résume. Dessous, un pot par ligne, avec sa règle et son montant sur le revenu de référence. Une mention : « Repère, pas un conseil. » En bas : « Changer de recette » en vert, « Ajuster » en lien.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Ma recette                      │ 56
│ 70 / 20 / 10                       │ 32
│ Source : guides de budget grand    │ 40
│ public (Thrivent, The Penny Hoarder)│
│ Sur ton revenu de 120 000 FCFA     │ 24
│ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬ ▬▬▬   │  8
│ ● Vie courante     70 %  84 000    │ 56
│ ● Épargne          20 %  24 000    │ 56
│ ● Dettes ou dons   10 %  12 000    │ 56
│ Chaque revenu, dans cet ordre.     │ 16
│ Repère, pas un conseil.            │ 20
│ ╭────────────────────────────────╮ │
│ │       Changer de recette       │ │ 48
│ ╰────────────────────────────────╯ │
│              Ajuster               │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Nom | 32 dp | 4 dp |
| Source | 40 dp | 12 dp |
| Base | 24 dp | 8 dp |
| Barre des pots | 8 dp | 12 dp |
| Lignes de pot | 56 dp chacune | 12 dp |
| Ordre | 16 dp | 4 dp |
| Mention | 20 dp | 16 dp |
| Pied | 128 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre de barre | Ma recette | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Nom | 70 / 20 / 10 | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Source | Source : guides de budget grand public (Thrivent, The Penny Hoarder) | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Base | Sur ton revenu de 120 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire | `#54656F` en clair, `#AEBAC1` en sombre |
| Barre | — | 8 dp, trou de 2 dp, bouts arrondis | `#008069` en clair, `#00A884` en sombre, `#D97A00` en clair, `#C47F00` en sombre, `#7F66FF` en clair, `#8B75FF` en sombre |
| Pastille | — | 12 dp | Couleur du pot |
| Pot | Vie courante | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Règle | 70 % | Roboto 14/20 sp, Regular (400), tabulaire | `#54656F` en clair, `#AEBAC1` en sombre |
| Montant | 84 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire, à droite | `#111B21` en clair, `#E9EDEF` en sombre |
| Ordre | Chaque revenu, dans cet ordre. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Mention | Repère, pas un conseil. | Roboto 14/20 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Changer de recette | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte | Ajuster | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Action du haut, L2 | `share` | 24 dp, zone 48 dp | `#111B21` en clair, `#E9EDEF` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| Montant fixe | Règle : « 10 000 FCFA, en premier » |
| Le reste | Règle : « Ce qui reste » ; sans pourcentage |
| Revenu variable | Base : « Sur le moins que tu gagnes : 90 000 FCFA » ; ligne Le reste : « Ce qui dépasse le plancher » |
| Recette ajustée | Nom : Ma recette, d'après 70 / 20 / 10 ; source : « Ajustée par toi » |
| Sans pass | Une recette active à la fois. Les autres restent lisibles après la fin d'un pass |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Changer de recette » | EC-31 |
| « Ajuster » | EC-32 |
| `share`, L2 | EC-35 |
| Toucher un pot | EC-28 |
| Retour | EC-27 |

## 8. Données

La recette est une donnée, jamais du code. Les règles s'appliquent dans l'ordre : montants fixes, pourcentages, « le reste ». Changer de recette ne demande aucune recatégorisation : les natures servent de pivot, et la nouvelle recette s'applique au prochain revenu.

**Exemple.** 70 / 20 / 10 sur 120 000 FCFA : 84 000, 24 000 et 12 000 FCFA.

## 9. Accessibilité

Titre : « Ma recette, 70, 20, 10 ». La barre est ignorée, car chaque pot est lu : « Vie courante, 70 %, 84 000 francs CFA ». La mention est toujours lue.

## 10. Mouvement

Entrée d'écran standard, sans autre animation.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp ; le montant passe sous la règle |
| Texte à 200 % | Lignes sur plusieurs niveaux |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`recipe_viewed`, avec l'identifiant de la recette. **Aucun montant.**
