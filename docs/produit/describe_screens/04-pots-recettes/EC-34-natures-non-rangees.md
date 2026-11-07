# EC-34 Natures non rangées

| Fiche | |
| --- | --- |
| **Parcours** | PC-14 |
| **Lot** | L1 |
| **Bible** | REC-08, NAT-01 |
| **Avant** | EC-08, EC-29, EC-32, EC-33, EC-36 |
| **Après** | EC-30 ou EC-27 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Faire en sorte que rien ne tombe entre les mailles : chaque dépense doit réduire un pot. L'écran n'apparaît que si c'est nécessaire.

## 2. Ce qu'on voit

Une bulle gris pâle explique : « Aucun pot ne lit ces natures : dette, impôt. » Pour chacune, une ligne indique les catégories concernées, avec une rangée de puces : les pots disponibles. Toucher une puce range la nature. Le bouton vert : « Tout est rangé ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Ranger tes dépenses             │ 56
│ ╭──────────────────────────────╮   │
│ ┆ Aucun pot ne lit ces natures : │ │ 56
│ │ dette, impôt.                  │ │
│ ╰──────────────────────────────╯   │
│ Dette                              │ 24
│ Remboursement                      │ 20
│ (✓Besoins) (Épargne) (Projets) (Plaisir)│ 48
│ ────────────────────────────────── │
│ Impôt                              │ 24
│ Taxe de marché                     │ 20
│ (Besoins) (Épargne) (Projets) (Plaisir)│ 48
│                                    │
│ ╭────────────────────────────────╮ │
│ │         Tout est rangé         │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Bulle | 56 dp | 16 dp |
| Nature | 24 dp | 0 |
| Catégories | 20 dp | 8 dp |
| Puces | 48 dp, rangée qui défile | 12 dp |
| Séparateur | 1 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Ranger tes dépenses | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bulle | Aucun pot ne lit ces natures : dette, impôt. | Roboto 14/20 sp, Regular (400), haut gauche 4 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Nature | Dette | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Catégories | Remboursement | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Puce au repos | Besoins | 32 dp, pastille 12 dp, Roboto 14/20 sp, Medium (500) | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Puce choisie | Besoins | Icône `check` | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Séparateur | — | 1 dp | `#E9EDEF` en clair, `#2A3942` en sombre |
| Bouton principal | Tout est rangé | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Rien à ranger | L'écran ne s'affiche pas |
| Natures non rangées | Bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre), avec le lien « Plus tard » dessous |
| Tout est rangé | Bouton actif |
| « Plus tard » | Les natures vont au pot du quotidien, avec une carte unique sur EC-27 : « 2 natures sont dans Besoins par défaut. » |
| Une seule nature | Bulle au singulier : « Aucun pot ne lit cette nature : dette. » |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une puce | Range la nature dans ce pot ; un autre toucher change de pot |
| « Tout est rangé » | Enregistre ; revient à l'écran suivant du parcours, avec le bandeau « Recette enregistrée. » |
| « Plus tard » | Comme ci-dessus |
| Retour | Écran précédent, choix gardés |

## 8. Données

Seules s'affichent les natures des catégories et des charges que l'utilisateur **utilise réellement**. Le choix s'enregistre dans la recette : un pot déclare les natures qu'il lit. Changer de recette ne demande aucune recatégorisation.

**Exemple.** Recette 45 / 25 / 25 / 5. Besoins lit *besoin*, Épargne lit *épargne*, Projets lit *projet*, Plaisir lit *envie*. Non lues et utilisées : *dette* et *impôt*.

Les natures ne sont jamais déduites pour un libellé sensible.

## 9. Accessibilité

Chaque rangée forme un groupe : « Dette, ranger dans : Besoins, sélectionné ». La bulle est lue d'abord. Les couleurs des pots s'accompagnent de leur nom.

## 10. Mouvement

Puce en 100 ms, sans autre animation.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Puces sur plusieurs rangées |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`natures_shown`, avec le nombre ; `natures_postponed`. **Aucun montant ni libellé.**
