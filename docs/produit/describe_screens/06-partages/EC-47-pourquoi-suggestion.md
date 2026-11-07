# EC-47 Pourquoi cette suggestion ?

| Fiche | |
| --- | --- |
| **Parcours** | PC-18 |
| **Lot** | L1 |
| **Bible** | HAB-05 |
| **Avant** | EC-13, EC-20 |
| **Après** | L'écran d'origine, EC-43 |
| **Cadre** | Feuille basse sur 360 × 800 dp, marges de 16 dp |

## 1. Rôle

Prouver d'où vient une suggestion, avec un fait vérifiable, et permettre de l'arrêter.

## 2. Ce qu'on voit

Une petite feuille monte du bas. Le nom de la suggestion, puis une phrase en chiffres : « 9 fois sur les 12 derniers jours ouvrés. » Dessous, une précision : cela reste sur ce téléphone. Deux choix : Ne plus proposer, Voir tout ce que l'app a appris.

## 3. Maquette

```text
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒ voile ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│╭──────────────────────────────────╮│
││               ▬▬▬                ││
││ Taxi · 500 FCFA                  ││ 24
││ ╭──────────────────────────────╮ ││
││ ┆ Tu l'as noté 9 fois sur les 12 │││ 56
││ │ derniers jours ouvrés, vers 8 h│││
││ ╰──────────────────────────────╯ ││
││ Calculé sur ce téléphone.        ││ 20
││        Ne plus proposer          ││ 48
││  Voir ce que l'app a appris      ││ 48
│╰──────────────────────────────────╯│
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Poignée, 32 × 4 dp | Haut 8 dp | 12 dp |
| Titre | 24 dp | 12 dp |
| Bulle | 56 dp | 8 dp |
| Mention | 20 dp | 12 dp |
| Boutons texte | 48 dp chacun | 16 dp |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Feuille | — | Coins hauts 28 dp, ombre `e3` | `#FFFFFF` en clair, `#202C33` en sombre |
| Voile | — | — | `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre |
| Titre | Taxi · 500 FCFA | Roboto 18/24 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Bulle | Tu l'as noté 9 fois sur les 12 derniers jours ouvrés, vers 8 h. | Roboto 14/20 sp, Regular (400), haut gauche 4 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Mention | Calculé sur ce téléphone. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton texte | Ne plus proposer | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Bouton texte | Voir ce que l'app a appris | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| Peu de données | Tu l'as noté 2 fois cette semaine, vers 8 h. |
| Depuis le bilan | Tu notes souvent Transport le soir de semaine, 1 500 FCFA en moyenne. |
| Hors ligne | Identique |

Ton factuel, sans « on vous recommande ». Jamais d'alerte, ni de libellé sensible.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Ne plus proposer » | Ferme, retire la suggestion, bandeau avec « Annuler » pendant 10 s |
| « Voir ce que l'app a appris » | EC-43 |
| Glisser vers le bas, voile, retour | Ferme |

## 8. Données

Compté depuis les tables de fréquences du téléphone. Aucun appel réseau.

## 9. Accessibilité

Titre annoncé à l'ouverture. Le focus revient à la suggestion à la fermeture. L'accès existe aussi sans appui long, par « Pourquoi ? ».

## 10. Mouvement

Feuille en 300 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | La feuille grandit jusqu'à 90 % de l'écran |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`suggestion_explained`, `suggestion_blocked`. **Aucun montant ni libellé.**
