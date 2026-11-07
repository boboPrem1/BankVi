# EC-39 Revenus et charges

| Fiche | |
| --- | --- |
| **Parcours** | PC-01, PC-11 |
| **Lot** | L1 |
| **Bible** | SAI-17, ONB-04 |
| **Avant** | EC-37, EC-23, EC-24 |
| **Après** | EC-37 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Garder à jour ce qui revient : la prévision n'est juste que si ces lignes le sont.

## 2. Ce qu'on voit

Deux groupes : Revenus, puis Charges. Chaque ligne a une icône, un nom, sa prochaine date et son montant. Un total dit le poids des charges. Le bouton vert : « Ajouter ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Revenus et charges              │ 56
│ Revenus                            │ 24
│ ◉ Salaire           +120 000 FCFA  │ 72
│   Chaque mois · prochain le 28     │
│ Charges · 78 000 FCFA par mois     │ 24
│ ◉ École              −25 000 FCFA  │ 72
│   Chaque mois · prochain le 3 déc. │
│ ◉ Loyer              −35 000 FCFA  │ 72
│ ◉ Électricité         −8 000 FCFA  │ 72
│ ◉ Tontine            −10 000 FCFA  │ 72
│ ╭────────────────────────────────╮ │
│ │            Ajouter             │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Titre de groupe | 24 dp | 4 dp |
| Ligne | 72 dp | 0 |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Revenus et charges | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Groupe | Charges · 78 000 FCFA par mois | Roboto 14/20 sp, Medium (500), tabulaire | `#54656F` en clair, `#AEBAC1` en sombre |
| Avatar | Icône de la catégorie | 40 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre, icône `#54656F` en clair, `#AEBAC1` en sombre |
| Nom | Salaire | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Rythme et date | Chaque mois · prochain le 28 | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Montant | +120 000 FCFA, −35 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire, à droite | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Ajouter | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Revenu variable seul | Salaire remplacé par « Revenu variable », « Au moins 90 000 FCFA par mois » |
| Salaire et revenu variable | Les deux lignes restent dans Revenus ; la date de référence passe à la fin du mois |
| Aucune charge | Aucune charge notée. Tu peux en ajouter à tout moment. |
| Aucun revenu | Indique ton revenu pour voir ta date de référence. |
| Ajout | Feuille : Revenu ou Charge ; nom ; montant ; jour ou date ; Chaque mois, Chaque semaine, Une fois, Chaque trimestre |
| Libellé sensible | EC-48 à la première utilisation |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une ligne | Feuille de modification, avec « Enregistrer » et « Supprimer » |
| « Supprimer » | Immédiat, « Annuler » pendant 10 s |
| « Ajouter » | Feuille d'ajout |
| Retour | EC-37 |

Toute modification recalcule aussitôt le chiffre du jour et l'horizon, et le bandeau l'indique : « Ton chiffre passe à 3 400 FCFA. »

## 8. Données

Passer de régulier à variable est permis. Une charge trimestrielle, comme une scolarité, se règle ici : le parcours de départ ne propose que le mensuel.

**Salaire et revenu variable ensemble :** la date de référence est la fin du mois, et le salaire d'avant cette date compte dans les revenus attendus. Exemple : Karim ajoute un salaire de 50 000 FCFA le 15. Le 6 novembre, 65 000 de soldes + 75 000 de revenu variable attendu + 50 000 de salaire font 190 000 FCFA, avant les charges.

**Exemple.** Camille : Salaire 120 000 ; École, Loyer, Électricité, Tontine, soit 78 000 FCFA par mois.

## 9. Accessibilité

Ligne : « Loyer, moins 35 000 francs CFA, chaque mois, prochain le 5 décembre ». Le signe est lu, jamais seulement coloré.

## 10. Mouvement

Feuille en 300 ms. Une ligne se replie en 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | La liste défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Montant sous le nom |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`recurring_added`, `recurring_edited`, `recurring_deleted`, avec le type et le rythme. **Aucun montant ni nom libre.**
