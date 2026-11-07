# EC-16 Plusieurs dates

| Fiche | |
| --- | --- |
| **Parcours** | PC-04 |
| **Lot** | L2 |
| **Bible** | SAI-05, SAI-06, SAI-07 |
| **Avant** | EC-13 |
| **Après** | EC-12 ou EC-19 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp, sans clavier |

## 1. Rôle

Enregistrer d'un coup la même dépense ou le même revenu sur plusieurs jours, en voyant le total avant de valider.

## 2. Ce qu'on voit

Le rappel de ce qu'on note, « Déjeuner · 1 000 FCFA », puis un choix Jours ou Période et un calendrier. Les jours choisis sont des cercles verts. Sous le calendrier, une phrase donne le total en direct : « 5 dépenses de 1 000 FCFA, soit 5 000 FCFA ». Le bouton vert reprend ce nombre : « Enregistrer les 5 dépenses ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Plusieurs dates                 │ 56
│ Déjeuner · 1 000 FCFA              │ 24
│ ( ✓ Jours  |    Période  )         │ 40
│ ‹      Novembre 2026           ›   │ 48
│  L  M  M  J  V  S  D               │ 16
│  ●  ●  ●  ●  ●  7· 8·              │
│  2  3  4  5 (6)                    │ 48 par ligne
│  …                                 │
│ · Prévu, pas encore du réel        │ 16
│                                    │
│ 5 dépenses de 1 000 FCFA,          │
│ soit 5 000 FCFA                    │ 48
│ ╭────────────────────────────────╮ │
│ │   Enregistrer les 5 dépenses   │ │ 48
│ ╰────────────────────────────────╯ │
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 4 dp |
| Rappel | 24 dp | 12 dp |
| Choix Jours ou Période | 40 dp | 12 dp |
| Calendrier | Mois 48 dp, jours 16 dp, grille 48 dp par ligne | 8 dp |
| Légende | 16 dp | 16 dp |
| Total | 48 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Plusieurs dates | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Rappel | Déjeuner · 1 000 FCFA | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Choix | Jours, Période | 40 dp, pilule, Roboto 14/20 sp, Medium (500) | Choisi : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Date choisie | — | Cercle de 40 dp | Fond `#25D366` (clair et sombre), chiffre `#0B141A` (clair et sombre) |
| Bande de période | — | Entre le début et la fin | `#D8FDD2` en clair, `#103529` en sombre |
| Aujourd'hui | — | Cercle de 1 dp | `#008069` en clair, `#25D366` en sombre |
| Point futur | — | 4 dp | `#667781` en clair, `#8696A0` en sombre |
| Légende | Prévu, pas encore du réel | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Total | 5 dépenses de 1 000 FCFA, soit 5 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Enregistrer les 5 dépenses | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Total | Bouton |
| --- | --- | --- |
| Aucune date | Choisis les jours concernés. | Désactivé, « Enregistrer » |
| 1 date | 1 dépense de 1 000 FCFA | Enregistrer la dépense |
| 5 dates | 5 dépenses de 1 000 FCFA, soit 5 000 FCFA | Enregistrer les 5 dépenses |
| Passées et futures | 3 réelles, 2 prévues. 5 dépenses de 1 000 FCFA, soit 5 000 FCFA | Enregistrer les 5 dépenses |
| Revenu | 5 revenus de 1 000 FCFA, soit 5 000 FCFA | Enregistrer les 5 revenus |
| Limite de 62 dates | Tu peux choisir 62 dates au plus. | Reste actif |

Hors ligne : identique.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Mode Jours : toucher un jour | Le choisit ou le retire |
| Mode Période : deux touchers | Début, puis fin ; un troisième recommence |
| Flèches | Change de mois, sans perdre la sélection |
| « Enregistrer » | Crée une ligne par date, reliées en groupe ; retour avec « Annuler » pour tout le groupe |
| Retour | EC-13, sélection gardée |

## 8. Données

Une ligne par date, reliée au groupe. Chaque ligne se modifie seule ou avec tout le groupe (EC-18). Une date future crée une ligne prévue, jamais du réel.

**Exemple.** Karim, Déjeuner à 1 000 FCFA, du lundi 2 au vendredi 6 novembre : 5 lignes reliées, soit 5 000 FCFA.

## 9. Accessibilité

Le total est annoncé après chaque changement : « 5 dépenses, 5 000 francs CFA ». Chaque jour annonce son état : « Mardi 3 novembre, sélectionné ». Le mode Période fonctionne au toucher, sans glisser.

## 10. Mouvement

Le jour se remplit en 100 ms. Le libellé du bouton change sans animation.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Calendrier et total défilent, pied fixe |
| 320 × 568 dp | Cercles de 36 dp, marges de 16 dp |
| Texte à 200 % | Le bouton passe sur deux lignes |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`entry_group_saved`, avec le nombre de dates et le mode. **Aucun montant.**
