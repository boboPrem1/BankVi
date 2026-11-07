# EC-48 Libellé sensible

| Fiche | |
| --- | --- |
| **Parcours** | PC-18 |
| **Lot** | L1 |
| **Bible** | NAT-04, NAT-05, LEG-05 |
| **Avant** | EC-05, EC-13, EC-14, EC-26, EC-29, EC-39 |
| **Après** | L'écran d'origine |
| **Cadre** | Feuille basse sur 360 × 800 dp, marges de 24 dp |

## 1. Rôle

Recueillir un consentement éclairé la première fois qu'un libellé peut révéler une information de santé, de religion, de politique ou de syndicat. Ce message n'est pas un obstacle : il protège l'utilisateur.

## 2. Ce qu'on voit

Une feuille basse. Le libellé en titre, puis l'explication en clair. Une case, **non cochée**. Tant qu'elle n'est pas cochée, le bouton vert reste grisé. Un lien propose de choisir une autre catégorie.

## 3. Maquette

```text
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒ voile ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│╭──────────────────────────────────╮│
││               ▬▬▬                ││
││ Santé                            ││ 24
││ Ce libellé peut révéler une      ││
││ information sensible. Il reste   ││ 80
││ choisi par toi, n'est jamais     ││
││ prédit et ne sert à aucun profil.││
││ ☐ J'ai compris et je veux        ││ 48
││   l'utiliser.                    ││
││ ╭──────────────────────────────╮ ││
││ │      Utiliser ce libellé     │ ││ 48
││ ╰──────────────────────────────╯ ││
││   Choisir une autre catégorie    ││ 48
│╰──────────────────────────────────╯│
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Poignée, 32 × 4 dp | Haut 8 dp | 12 dp |
| Titre | 24 dp | 12 dp |
| Texte | 80 dp | 12 dp |
| Case | 48 dp | 12 dp |
| Bouton principal | 48 dp | 4 dp |
| Bouton texte | 48 dp | 16 dp |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Feuille | — | Coins hauts 28 dp, ombre `e3` | `#FFFFFF` en clair, `#202C33` en sombre |
| Voile | — | — | `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre |
| Titre | Santé | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Texte | Ce libellé peut révéler une information sensible. Il reste choisi par toi, n'est jamais prédit et ne sert à aucun profil. | Roboto 16/24 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Case non cochée | J'ai compris et je veux l'utiliser. | 24 dp, zone 48 dp, Roboto 14/20 sp, Regular (400) | Contour 2 dp `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Case cochée | — | `check` | Fond `#008069` en clair, `#25D366` en sombre, coche `#FFFFFF` en clair, `#0B141A` en sombre |
| Bouton désactivé | Utiliser ce libellé | Roboto 16/24 sp, Medium (500) | Fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre |
| Bouton actif | Utiliser ce libellé | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte | Choisir une autre catégorie | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| Arrivée | Case **non cochée**, bouton désactivé |
| Case cochée | Bouton actif |
| Déjà consenti pour ce libellé | L'écran ne réapparaît pas |
| Nom libre reconnu | Titre : le nom saisi, affiché comme du texte simple |
| Hors ligne | Identique : le choix se synchronise ensuite |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher la case ou son texte | Coche ou décoche |
| « Utiliser ce libellé » | Enregistre le consentement, retour à l'écran d'origine, libellé appliqué |
| « Choisir une autre catégorie » | Retour au choix des catégories, sans consentement |
| Glisser vers le bas, voile, retour | Comme « Choisir une autre catégorie » |

## 8. Données

| Règle | Application |
| --- | --- |
| Thèmes | Santé, religion, politique, syndicat |
| Prédiction | Jamais : ces libellés ne sont ni suggérés, ni appris, ni classés par balayage |
| Usage | Aucun profil, aucune télémétrie |
| Détection | Liste de mots sur le téléphone, à faire relire ; elle n'est pas exhaustive |
| Retrait | Possible : changer la catégorie et l'oublier dans EC-43 |

## 9. Accessibilité

Titre annoncé. Case : « J'ai compris et je veux l'utiliser, case à cocher, non cochée ». Le bouton désactivé annonce : « Coche d'abord la case. »

## 10. Mouvement

Feuille en 300 ms. La coche apparaît en 100 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | La feuille défile ; marges de 16 dp |
| Texte à 200 % | La feuille grandit jusqu'à 90 % de l'écran |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`sensitive_consent`, seulement si des statistiques sont autorisées, **sans le thème ni le libellé**.
