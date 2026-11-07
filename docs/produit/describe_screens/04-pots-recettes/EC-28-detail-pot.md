# EC-28 Détail d'un pot

| Fiche | |
| --- | --- |
| **Parcours** | PC-10 |
| **Lot** | L1 |
| **Bible** | POT-03, POT-04, NAT-01 |
| **Avant** | EC-27 |
| **Après** | EC-27, EC-18, EC-30 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Comprendre ce qu'un pot reçoit, ce qu'il couvre et ce qui en est sorti, puis déplacer de l'argent si la réalité a changé.

## 2. Ce qu'on voit

Le nom du pot en titre, ce qui reste en grand et sa jauge. Une ligne dit sa règle : « 70 % de chaque revenu ». Des puces listent les natures qu'il lit. Dessous, les mouvements récents en conversation. En bas, le bouton vert « Déplacer de l'argent », qui ouvre une feuille indiquant l'effet sur le chiffre du jour avant de valider.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Vie courante                    │ 56
│ 24 000 FCFA            sur 84 000  │ 32
│ ▬▬▬▬▬▬───────────────────          │  8
│ 70 % de chaque revenu              │ 20
│ Lit : (besoin) (éducation) (tontine)│ 32
│ Mouvements récents                 │ 16
│            ╭ Loyer · 35 000 FCFA ╮ │
│            ╭ École · 25 000 FCFA ╮ │
│ ╭ Répartition · +85 600 FCFA ╮     │
│ ╭────────────────────────────────╮ │
│ │      Déplacer de l'argent      │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

Feuille de déplacement :

```text
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒ voile ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│╭──────────────────────────────────╮│
││ Déplacer de l'argent             ││
││ De    ● Épargne · 24 000 FCFA  › ││ 56
││ Vers  ● Vie courante · 24 000  › ││ 56
││ 12 000|                     FCFA ││ 72
││ Ton chiffre passerait de 200 à   ││
││ 800 FCFA par jour.               ││ 40
││ ╭──────────────────────────────╮ ││
││ │           Déplacer           │ ││ 48
││ ╰──────────────────────────────╯ ││
│├──────────────────────────────────┤│
││              clavier             ││
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Reste et cible | 32 dp | 8 dp |
| Jauge | 8 dp | 12 dp |
| Règle | 20 dp | 8 dp |
| Natures | 32 dp par rangée | 16 dp |
| Titre des mouvements | 16 dp | 8 dp |
| Bulles | 32 dp au moins, écart 8 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Vie courante | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Reste | 24 000 FCFA | Roboto 24/32 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Cible | sur 84 000 | Roboto 14/20 sp, Regular (400), tabulaire | `#54656F` en clair, `#AEBAC1` en sombre |
| Jauge | — | 8 dp | Remplie `#008069` en clair, `#00A884` en sombre, fond `#E9EDEF` en clair, `#2A3942` en sombre |
| Règle | 70 % de chaque revenu | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Natures | besoin, éducation, tontine, soutien familial | Puces sans action, Roboto 12/16 sp, Regular (400) | Contour `#E9EDEF` en clair, `#2A3942` en sombre, texte `#54656F` en clair, `#AEBAC1` en sombre |
| Titre | Mouvements récents | Roboto 12/16 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Sortie | Loyer · 35 000 FCFA | Bulle à droite | Fond `#D9FDD3` en clair, `#005C4B` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Entrée | Répartition · +85 600 FCFA | Bulle à gauche | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Déplacer de l'argent | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

### Feuille de déplacement

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Feuille | — | Coins hauts 28 dp, ombre `e3` | `#FFFFFF` en clair, `#202C33` en sombre |
| Voile | — | — | `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre |
| Titre | Déplacer de l'argent | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Ligne De, Vers | Épargne · 24 000 FCFA | 56 dp, pastille 12 dp, `chevron_right` | `#111B21` en clair, `#E9EDEF` en sombre |
| Montant | 12 000 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Effet | Ton chiffre passerait de 200 à 800 FCFA par jour. | Roboto 16/24 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Déplacer | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Pot vide | « Vide jusqu'au 28. », avec `warning`, en `#8A4B00` en clair, `#FFD27A` en sombre |
| Pot dépassé | « 3 000 FCFA de plus que prévu, pris sur Vie courante. » |
| Montant supérieur au pot | Sous le champ, en `#8A4B00` en clair, `#FFD27A` en sombre : « C'est plus que ce que contient Épargne. » Bouton désactivé |
| Entre deux pots du quotidien ou deux pots réservés | Effet : « Ton chiffre ne change pas. » |
| Aucun mouvement | Rien pour l'instant. |
| Pot « Le reste » | Règle : « Tout ce qui dépasse le plancher ». Pas de jauge |
| Hors ligne | Identique |

Aucun conseil : l'effet est un calcul, jamais une recommandation.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Déplacer de l'argent » | Feuille, avec ce pot en « Vers » s'il est vide, sinon en « De » |
| Toucher De ou Vers | Choix du pot, avec son solde |
| « Déplacer » | Immédiat ; ferme la feuille ; bandeau « 12 000 FCFA déplacés. », « Annuler » pendant 10 s |
| Toucher une bulle | EC-18 |
| Retour | EC-27 |

## 8. Données

Déplacer ne change aucune poche réelle : seule la part virtuelle bouge. Sortir d'un pot réservé vers le quotidien augmente le chiffre du jour, et l'inverse le réduit.

**Exemple.** Camille déplace 12 000 FCFA d'Épargne vers Vie courante : (60 000 − 18 000 − 24 000) ÷ 22 = 818, arrondi à 800 FCFA par jour.

## 9. Accessibilité

Le titre et le reste sont lus d'un bloc. L'effet est annoncé dès qu'il change. Bulles : « Sortie : Loyer, 35 000 francs CFA » et « Entrée : Répartition, plus 85 600 francs CFA ».

## 10. Mouvement

Feuille en 300 ms. Jauge en 200 ms après le déplacement.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp ; valeur à 30 sp dans la feuille |
| Texte à 200 % | La cible passe sous le reste |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`pot_viewed`, `pot_money_moved`, avec le type (`to_daily`, `to_reserved`, `same`). **Aucun montant ni nom libre.**
