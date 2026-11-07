# EC-15 Autre date

| Fiche | |
| --- | --- |
| **Parcours** | PC-03 |
| **Lot** | L1 |
| **Bible** | SAI-04, SAI-07, SAI-13 |
| **Avant** | EC-13, EC-18 |
| **Après** | L'écran d'origine |
| **Cadre** | Feuille basse sur 360 × 800 dp, marges de 16 dp |

## 1. Rôle

Choisir une seule date qui n'est pas proposée par les raccourcis, sans confusion entre le réel et le prévu.

## 2. Ce qu'on voit

Une feuille monte du bas avec un calendrier mensuel. Aujourd'hui est entouré d'un cercle. Les jours à venir portent un petit point, et une légende explique : « Point : prévu, pas encore du réel. » Toucher un jour le choisit et ferme la feuille.

## 3. Maquette

```text
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒ voile ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│╭──────────────────────────────────╮│
││               ▬▬▬                ││
││ ‹      Novembre 2026           › ││ 48
││  L  M  M  J  V  S  D             ││ 16
││                               1  ││
││  2  3  4  5 (6) 7· 8·            ││ 48 par ligne
││  9· 10· 11· 12· 13· 14· 15·      ││
││ …                                ││
││ · Prévu, pas encore du réel      ││ 16
│╰──────────────────────────────────╯│
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Poignée | Haut 8 dp | 8 dp |
| Mois et flèches | 48 dp | 8 dp |
| Jours de la semaine | 16 dp | 4 dp |
| Grille, 6 lignes au plus | 48 dp par ligne | 8 dp |
| Légende | 16 dp | 24 dp |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Feuille | — | Coins hauts 28 dp, ombre `e3` | `#FFFFFF` en clair, `#202C33` en sombre |
| Voile | — | — | `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre |
| Mois | Novembre 2026 | Roboto 18/24 sp, Medium (500), centré | `#111B21` en clair, `#E9EDEF` en sombre |
| Flèches | `chevron_left`, `chevron_right` | Zone 48 dp | `#111B21` en clair, `#E9EDEF` en sombre |
| Jours | L M M J V S D | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Chiffre | 12 | Roboto 16/24 sp, Regular (400), tabulaire, centré, cercle de 40 dp | `#111B21` en clair, `#E9EDEF` en sombre |
| Aujourd'hui | 6 | Cercle de 1 dp | Contour `#008069` en clair, `#25D366` en sombre |
| Date choisie | — | Cercle plein | Fond `#25D366` (clair et sombre), chiffre `#0B141A` (clair et sombre) |
| Point d'une date future | — | 4 dp, sous le chiffre | `#667781` en clair, `#8696A0` en sombre |
| Légende | Prévu, pas encore du réel | Roboto 12/16 sp, Regular (400), avec le point | `#54656F` en clair, `#AEBAC1` en sombre |
| Date hors limites | — | Atténuée, non touchable | `#667781` en clair, `#8696A0` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| Arrivée | Mois de la date choisie ; aujourd'hui marqué |
| Date passée choisie | Retour à EC-13, puce « 4 nov. » choisie |
| Date future choisie | Retour à EC-13, puce « 15 nov. · Prévu », bandeau « Prévu, pas encore du réel » |
| Date antérieure au dernier comptage | Retour à EC-13, bandeau « Ton solde compté ne change pas. Cette saisie détaille l'écart de cette période. » |
| Limites | Jusqu'à 12 mois en arrière et 12 mois en avant ; la flèche se désactive au bout |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher un jour | Le choisit et ferme la feuille |
| Flèches, ou glisser à gauche et à droite | Change de mois |
| Glisser vers le bas, voile, retour | Ferme sans changement |

## 8. Données

| Date | Effet |
| --- | --- |
| Aujourd'hui ou passée | Saisie réelle |
| Future | Ligne prévue, jamais du réel ; elle nourrit l'horizon |
| Antérieure au dernier comptage | Le solde compté reste juste ; la saisie réduit le « Non détaillé » de la période |

## 9. Accessibilité

Chaque jour est un bouton : « Samedi 7 novembre, prévu ». Le point ne porte jamais seul l'information : la légende et TalkBack la donnent. Le focus va sur la date choisie à l'ouverture.

## 10. Mouvement

Feuille en 300 ms. Changement de mois en fondu de 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Cercles de 36 dp, zones tactiles maintenues ; la feuille défile si besoin |
| Texte à 200 % | Chiffres plafonnés à la taille de la zone ; la feuille défile |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`date_picked`, avec le type (`past`, `future`, `before_count`). **Aucun montant.**
