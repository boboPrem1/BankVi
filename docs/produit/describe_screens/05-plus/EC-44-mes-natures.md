# EC-44 Mes natures

| Fiche | |
| --- | --- |
| **Parcours** | PC-14 |
| **Lot** | L2 |
| **Bible** | NAT-02, NAT-03, NAT-04, ONB-04 |
| **Avant** | EC-37 |
| **Après** | EC-37 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp |

## 1. Rôle

Classer ses catégories en un jeu rapide : une carte, un geste, sans rien de définitif. Les recettes s'appuient ensuite sur ces natures.

## 2. Ce qu'on voit

Une grande carte au centre : « Transport ». Une question : « Pour toi, c'est plutôt… » Deux gros boutons : Envie à gauche, Besoin à droite. On peut aussi balayer la carte. Un lien propose une autre nature, un autre permet de passer. Un compteur discret indique : 2 sur 8.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Mes natures              2 sur 8│ 56
│                                    │
│   ┌──────────────────────────┐     │
│   │            ◉             │     │
│   │        Transport         │     │ 240
│   │  Pour toi, c'est plutôt… │     │
│   └──────────────────────────┘     │
│                                    │
│  (   ← Envie   ) (   Besoin →   )  │ 48
│         Autre nature               │ 48
│            Passer                  │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 24 dp |
| Carte | 240 dp, 280 dp de large, centrée | 24 dp |
| Deux boutons, écart 8 dp | 48 dp | 8 dp |
| Autre nature | 48 dp | 0 |
| Passer | 48 dp | 16 dp |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Mes natures | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Compteur | 2 sur 8 | Roboto 12/16 sp, Regular (400), tabulaire | `#54656F` en clair, `#AEBAC1` en sombre |
| Carte | — | Rayon 16 dp, ombre `e1` en clair | Fond `#FFFFFF` en clair, `#202C33` en sombre, contour `#E9EDEF` en clair, `#2A3942` en sombre |
| Avatar | Icône de la catégorie | 56 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre, icône `#54656F` en clair, `#AEBAC1` en sombre |
| Catégorie | Transport | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Question | Pour toi, c'est plutôt… | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Boutons | Envie, Besoin | 48 dp, pilule, à contour, Roboto 16/24 sp, Medium (500) | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#00735E` en clair, `#25D366` en sombre |
| Boutons texte | Autre nature, Passer | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

Aucun bouton vert : les deux réponses ont le même poids, pour ne pas orienter le choix.

## 6. États

| État | Affichage |
| --- | --- |
| Toutes classées | Icône `check_circle` et « Tout est classé. Tu peux changer à tout moment. » Bouton : Fermer |
| Autre nature | Feuille : Épargne, Dette, Investissement, Projet, Solidarité et dons, Éducation, Impôt ou provision, Imprévu, Tontine, Soutien familial |
| Catégorie sensible | **Jamais proposée ici.** Elle garde la nature choisie par l'utilisateur |
| Aucune catégorie à classer | Rien à classer pour l'instant. |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Balayer à droite, ou Besoin | Classe en besoin, carte suivante |
| Balayer à gauche, ou Envie | Classe en envie, carte suivante |
| Autre nature | Feuille, puis carte suivante |
| Passer | La carte repasse plus tard |
| Retour | EC-37 ; progression gardée |
| Annuler | Bandeau de 10 s après chaque carte |

Les cartes viennent une à une, seulement les catégories utilisées. Rien n'est obligatoire.

## 8. Données

Une nature par catégorie. Elle sert de pivot à toutes les recettes : changer de recette ne demande aucune recatégorisation. Le classement est proposé par palier, dans les premiers jours d'usage.

## 9. Accessibilité

Le balayage n'est jamais obligatoire : les boutons visibles font la même chose. Lecture : « Transport. Pour toi, c'est plutôt… Envie, ou Besoin. 2 sur 8. »

## 10. Mouvement

La carte suit le doigt, puis sort en 200 ms. Avec les animations réduites : changement immédiat.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Carte à 180 dp |
| 320 × 568 dp | Carte à 150 dp, marges de 16 dp |
| Texte à 200 % | Boutons empilés ; le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`nature_classified`, avec le geste (`swipe`, `button`) ; `nature_skipped`. **Aucun montant ni libellé sensible.**
