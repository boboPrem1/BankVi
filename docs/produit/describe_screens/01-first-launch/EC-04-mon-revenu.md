# EC-04 Mon revenu

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement, question 2 sur 3 |
| **Lot** | L1 |
| **Bible** | ONB-02, REC-07, SAI-17 |
| **Avant** | EC-03 Mon argent |
| **Après** | EC-05 Mes charges |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp |

## 1. Rôle

Savoir ce qui rentre et quand, avec une seule logique pour le salarié comme pour l'indépendant.

## 2. Ce qu'on voit

Au départ, pas de clavier. Le deuxième segment de progression est vert. La question : « Comment gagnes-tu ton argent ? » Deux grandes cartes empilées, « Régulier » et « Variable », chacune avec une courte description et un rond de sélection. Toucher une carte la colore en vert pâle, ouvre dessous les champs correspondants, et fait monter le clavier. Le bouton « Continuer » reste en bas.

## 3. Maquette

Choix « Régulier », clavier fermé :

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←                                  │ 56
│ ▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬▬▬▬▬ ▭▭▭▭▭▭▭▭▭▭   │  4
│ Question 2 sur 3                   │ 16
│ Comment gagnes-tu ton argent ?     │ 32–64
│                                    │
│ ╔════════════════════════════════╗ │
│ ║ ◉ Régulier                     ║ │ 72  sélectionnée
│ ║   Le même montant, à une date  ║ │
│ ╚════════════════════════════════╝ │
│ ┌────────────────────────────────┐ │
│ │ ○ Variable                     │ │ 72
│ │   Ça change d'un mois à l'autre│ │
│ └────────────────────────────────┘ │
│ Combien ?                          │
│ 120 000                       FCFA │ 72
│ ─────────────────────────────────  │
│ Le combien du mois ?               │
│ 28                                 │ 56
│ ─────────────────────────────────  │
│ ╭────────────────────────────────╮ │
│ │           Continuer            │ │ 48
│ ╰────────────────────────────────╯ │
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 0 |
| Progression et libellé | 28 dp | 16 dp |
| Question | 32 à 64 dp | 24 dp |
| Carte Régulier | 72 dp | 12 dp |
| Carte Variable | 72 dp | 24 dp |
| Champ montant | 72 dp | 16 dp |
| Champ jour, Régulier seulement | 56 dp, largeur 120 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Segments 1 et 2 | — | 4 dp | `#25D366` (clair et sombre) |
| Segment 3 | — | 4 dp | `#E9EDEF` en clair, `#2A3942` en sombre |
| Libellé de progression | Question 2 sur 3 | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Question | Comment gagnes-tu ton argent ? | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Titre carte 1 | Régulier | Roboto 16/24 sp, Medium (500) | Repos `#111B21` en clair, `#E9EDEF` en sombre ; choisie `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Description carte 1 | Le même montant, à une date fixe | Roboto 14/20 sp, Regular (400) | Repos `#54656F` en clair, `#AEBAC1` en sombre ; choisie `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Titre carte 2 | Variable | Roboto 16/24 sp, Medium (500) | Mêmes règles |
| Description carte 2 | Ça change d'un mois à l'autre | Roboto 14/20 sp, Regular (400) | Mêmes règles |
| Carte au repos | — | Rayon 12 dp, contour 1 dp | Fond `#FFFFFF` en clair, `#202C33` en sombre, contour `#7A8A94` en clair, `#667781` en sombre |
| Carte choisie | — | Rayon 12 dp, contour 2 dp | Fond `#D8FDD2` en clair, `#103529` en sombre, contour `#008069` en clair, `#25D366` en sombre |
| Rond | — | 20 dp, cercle de 2 dp ; point de 10 dp si choisi | Repos `#7A8A94` en clair, `#667781` en sombre ; choisi `#008069` en clair, `#25D366` en sombre |
| Libellé montant, Régulier | Combien ? | Roboto 14/20 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Libellé montant, Variable | Le moins que tu gagnes sur un mois | Roboto 14/20 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Valeur | 120 000 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Libellé jour | Le combien du mois ? | Roboto 14/20 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Valeur jour | 28 | Roboto 16/24 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Aide, Variable | Une estimation prudente suffit. Tu pourras la changer. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Aide, jour 29 à 31 | Si le mois est plus court, on prend le dernier jour. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Continuer | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Arrivée | Aucune carte choisie, aucun champ, pas de clavier, bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Régulier choisi | Montant et jour apparaissent ; montant actif ; clavier ouvert |
| Variable choisi | Montant et aide apparaissent ; montant actif ; clavier ouvert |
| Passage de l'un à l'autre | Le montant saisi est gardé ; le jour reste en mémoire s'il revient sur Régulier |
| Régulier complet | Montant de 1 ou plus et jour valide : bouton actif |
| Variable complet | Montant rempli, même 0 : bouton actif |
| Régulier avec montant 0 | Sous le champ, en `#B3261E` en clair, `#F2B8B5` en sombre : « Indique ton montant, ou choisis Variable. » |
| Jour hors limites | Sous le champ, en `#B3261E` en clair, `#F2B8B5` en sombre : « Indique un jour entre 1 et 31. » |

Une carte reste toujours modifiable. Les deux ne sont jamais présélectionnées : ce choix change le calcul.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une carte | Sélection et ouverture des champs |
| Suivant du clavier | Montant → jour → ferme le clavier |
| « Continuer » | Enregistre le revenu et ouvre EC-05 |
| Retour | EC-03, valeurs gardées |

Avec le clavier ouvert, les cartes peuvent défiler vers le haut pour laisser voir le champ actif.

## 8. Données

| Type | Enregistrement | Effet |
| --- | --- | --- |
| Régulier | Revenu récurrent mensuel, montant et jour | Date de référence : prochaine occurrence, après aujourd'hui |
| Variable | Revenu plancher mensuel | Date de référence : fin du mois |

**Exemples.** Camille : Régulier, 120 000, le 28. Karim : Variable, 90 000. Plusieurs revenus s'ajouteront plus tard dans EC-39.

## 9. Accessibilité

Les cartes forment un groupe de choix : « Régulier, le même montant, à une date fixe, bouton radio, sélectionné, 1 sur 2. » L'apparition des champs est annoncée : « Deux champs ajoutés. » Les erreurs sont annoncées dès qu'elles apparaissent.

## 10. Mouvement

Les champs se déplient en 200 ms en même temps que le clavier monte. La carte change de fond en 100 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Avec clavier, seule la carte choisie reste en vue, au-dessus des champs, si le défilement l'exige |
| 320 × 568 dp | Valeur à 30 sp ; marges de 16 dp |
| Texte à 200 % | La hauteur des cartes suit le texte ; le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`onboarding_step_viewed` et `onboarding_step_completed` (`income`), avec le type (`regular` ou `variable`). **Aucun montant.**
