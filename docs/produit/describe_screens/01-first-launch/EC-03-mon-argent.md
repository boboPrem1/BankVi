# EC-03 Mon argent aujourd'hui

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement, question 1 sur 3 |
| **Lot** | L1 |
| **Bible** | ONB-02, SAI-24, POC-01, POC-06 |
| **Avant** | EC-01 Bienvenue, EC-02 Exemple |
| **Après** | EC-04 Mon revenu |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp, clavier ouvert |

## 1. Rôle

Récupérer le point de départ de toute l'app : l'argent réel d'aujourd'hui. Sans ce chiffre, ni l'horizon ni l'écart ne se calculent.

## 2. Ce qu'on voit

La moitié basse est occupée par le clavier numérique, déjà ouvert. En haut, une progression à trois segments, dont le premier est vert. La question en grand : « Combien as-tu aujourd'hui ? » Le champ Espèces, avec son curseur, domine en grands chiffres. Dessous, deux lignes plus discrètes, Mixx et Flooz, avec un rond à initiale. Un lien permet de dire qu'on n'a ni l'un ni l'autre. Le bouton « Continuer » reste collé au-dessus du clavier.

## 3. Maquette

Clavier ouvert, valeur saisie :

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←                                  │ 56
│ ▬▬▬▬▬▬▬▬▬▬ ▭▭▭▭▭▭▭▭▭▭ ▭▭▭▭▭▭▭▭▭▭   │  4
│ Question 1 sur 3                   │ 16
│ Combien as-tu aujourd'hui ?        │ 32–64
│ Une estimation suffit.             │ 20
│ Espèces                            │ 20
│ 32 000|                       FCFA │ 44
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │  2  actif
│ Ⓜ Mixx                     0  FCFA │ 56
│ Ⓕ Flooz                    0  FCFA │ 56
│    Je n'ai pas de Mixx ou de Flooz │ 48
│ ╭────────────────────────────────╮ │
│ │           Continuer            │ │ 48
│ ╰────────────────────────────────╯ │
├────────────────────────────────────┤
│   1      2      3                  │
│   4      5      6                  │ ≈270 clavier système
│   7      8      9                  │
│          0      ⌫                  │
└────────────────────────────────────┘
```

## 4. Structure et mesures

Dans le cadre de référence avec clavier, 458 dp restent utiles. Le contenu demande environ 464 dp : il défile d'un peu si besoin, le champ actif restant visible et le bouton fixe.

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut, retour seul | 56 dp | 0 |
| Progression et libellé | 28 dp | 16 dp |
| Question | 32 dp, 64 si elle passe sur deux lignes | 8 dp |
| Aide | 20 dp | 24 dp |
| Champ Espèces | 72 dp | 12 dp |
| Ligne Mixx | 56 dp | 0 |
| Ligne Flooz | 56 dp | 4 dp |
| Bouton texte | 48 dp | 12 dp |
| Pied, bouton seul | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Retour | Icône `arrow_back` | 24 dp | `#111B21` en clair, `#E9EDEF` en sombre |
| Segment 1 | — | 4 dp, pilule | `#25D366` (clair et sombre) |
| Segments 2 et 3 | — | 4 dp, pilule, écart 4 dp | `#E9EDEF` en clair, `#2A3942` en sombre |
| Libellé de progression | Question 1 sur 3 | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Question | Combien as-tu aujourd'hui ? | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Aide | Une estimation suffit. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Libellé du champ | Espèces | Roboto 14/20 sp, Medium (500) | Actif `#008069` en clair, `#25D366` en sombre ; repos `#54656F` en clair, `#AEBAC1` en sombre |
| Valeur | 32 000 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Placeholder | 0 | Roboto 36/44 sp, Medium (500) | `#667781` en clair, `#8696A0` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500), à droite | `#54656F` en clair, `#AEBAC1` en sombre |
| Soulignement | — | Actif 2 dp ; repos 1 dp | Actif `#008069` en clair, `#25D366` en sombre ; repos `#7A8A94` en clair, `#667781` en sombre |
| Avatar Mixx et Flooz | M, F | 40 dp, Roboto 16/24 sp, Medium (500) | Fond `#F0F2F5` en clair, `#111B21` en sombre, lettre `#54656F` en clair, `#AEBAC1` en sombre |
| Nom | Mixx, Flooz | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Champ facultatif | 0 | 120 dp, aligné à droite, Roboto 16/24 sp, Regular (400), tabulaire ; « FCFA » en Roboto 12/16 sp, Regular (400) | Placeholder `#667781` en clair, `#8696A0` en sombre ; valeur `#111B21` en clair, `#E9EDEF` en sombre ; trait 1 dp `#7A8A94` en clair, `#667781` en sombre |
| Bouton texte | Je n'ai pas de Mixx ou de Flooz | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Continuer | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

Les marques Mixx et Flooz ne sont représentées que par leur nom et leur initiale, sans logo.

## 6. États

| État | Affichage |
| --- | --- |
| Téléphone hors du Togo, à partir du L2 | Mixx et Flooz sont remplacés par une seule ligne facultative : Mon mobile money. Le pays vient de la carte SIM, reste sur le téléphone et n'est jamais demandé |
| Arrivée | Espèces actif, clavier ouvert, bouton **désactivé** (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Espèces rempli, même 0 | Bouton actif |
| Sur Mixx ou Flooz | Soulignement 2 dp `#008069` en clair, `#25D366` en sombre sur ce champ ; Espèces revient au repos |
| « Je n'ai pas de Mixx ou de Flooz » touché | Les deux lignes se replient et le lien devient « Ajouter Mixx ou Flooz » |
| Retour sur l'écran | Valeurs conservées |
| Sans réseau | Aucun changement |

Aucun message d'erreur : le champ n'accepte que des chiffres, et le zéro est permis.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Frappe | Mise en forme en direct : `32 000` |
| Toucher une ligne Mixx ou Flooz | Curseur dans son champ |
| Touche suivant du clavier | Espèces → Mixx → Flooz → ferme le clavier |
| « Continuer » | Enregistre les soldes et ouvre EC-04 |
| Retour | Écran précédent, valeurs gardées |
| Quitter l'app | La reprise revient ici, avec les valeurs |

## 8. Données

| Saisie | Règle |
| --- | --- |
| Espèces | Obligatoire, de 0 à 99 999 999 |
| Mixx, Flooz | Facultatifs. Vide : la poche n'est pas créée, elle s'active plus tard dans EC-38. 0 saisi : la poche existe avec 0 |
| Enregistrement | Sur le téléphone, comme premier comptage de chaque poche (SAI-24) |

**Exemples.** Camille : Espèces 32 000, Mixx 58 000, Flooz vide. Karim : Espèces 45 000, Mixx 20 000, Flooz vide.

## 9. Accessibilité

Focus initial sur la question, puis le champ. Lecture du champ : « Espèces, en francs CFA, champ de saisie ». Le lien repliant annonce son résultat : « Mixx et Flooz masqués ». Bouton désactivé : « Continuer, désactivé. Indique d'abord tes espèces. »

## 10. Mouvement

Entrée d'écran standard, clavier ouvert dès la fin de la transition. Le repli des lignes et la progression durent 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Environ 298 dp utiles : la question et l'aide défilent vers le haut quand un champ est actif. Le champ actif et le bouton restent visibles |
| 320 × 568 dp | Valeur à 30 sp ; marges de 16 dp |
| Texte à 200 % | « FCFA » passe sous la valeur ; lignes Mixx et Flooz sur deux niveaux |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`onboarding_step_viewed` et `onboarding_step_completed` (`balance`), avec seulement le nombre de poches remplies. **Aucun montant** dans les événements.
