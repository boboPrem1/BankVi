# EC-20 Bilan : écart

| Fiche | |
| --- | --- |
| **Parcours** | PC-05, PC-06 |
| **Lot** | L1 |
| **Bible** | SAI-10, SAI-11, SAI-12, SAI-13, HAB-02 |
| **Avant** | EC-19 |
| **Après** | EC-21 ; EC-13 pour ajouter une dépense |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp, sans clavier |

## 1. Rôle

Comprendre où est passé l'argent, sans effort et sans reproche : l'app propose, l'utilisateur touche, le reste peut rester « Non détaillé ».

## 2. Ce qu'on voit

La suite de la conversation. Une bulle verte à droite rappelle sa réponse : « 41 500 FCFA en espèces ». Une bulle grise à gauche répond : « Tu as noté 1 000 FCFA. Il reste 2 500 FCFA sans détail. » Dessous, des puces de réponses rapides : « Transport · 1 500 », « Crédit téléphone · 500 », « Déjeuner · 1 000 ». Une ligne donne en direct ce qui reste : « Non détaillé : 500 FCFA ». En bas, « Valider mon bilan » et deux liens.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Mon bilan                       │ 56
│        ╭ 41 500 FCFA en espèces ╮  │ 32
│ ╭──────────────────────────────╮   │
│ ┆ Tu as noté 1 000 FCFA.       │   │ 56
│ │ Il reste 2 500 FCFA à détailler.│
│ ╰──────────────────────────────╯   │
│ (✓Transport · 1 500)               │
│ (✓Crédit téléphone · 500)          │ 32 par rangée
│ (Déjeuner · 1 000)                 │
│                                    │
│ Non détaillé : 500 FCFA            │ 24
│ Ajouter une dépense                │ 48
│ ╭────────────────────────────────╮ │
│ │       Valider mon bilan        │ │ 48
│ ╰────────────────────────────────╯ │
│     Tout laisser en non détaillé   │ 48
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Bulle de l'utilisateur | 32 dp, à droite | 8 dp |
| Bulle de l'app | 56 dp, à gauche | 16 dp |
| Puces | 32 dp par rangée, écart 8 dp | 16 dp |
| Reste | 24 dp | 4 dp |
| Ajouter une dépense | 48 dp | 12 dp |
| Pied | 128 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Mon bilan | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bulle de l'utilisateur | 41 500 FCFA en espèces | Roboto 14/20 sp, Regular (400), haut droit 4 dp | Fond `#D9FDD3` en clair, `#005C4B` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Bulle de l'app | Voir les cas plus bas | Roboto 14/20 sp, Regular (400), haut gauche 4 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Puce au repos | Déjeuner · 1 000 | 32 dp, Roboto 14/20 sp, Medium (500), tabulaire | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Puce choisie | Transport · 1 500 | Icône `check` | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Reste | Non détaillé : 500 FCFA | Roboto 16/24 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton texte | Ajouter une dépense | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Valider mon bilan | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte du pied | Tout laisser en non détaillé | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

## 6. Les cas

| Cas | Bulle de l'app | Autour |
| --- | --- | --- |
| **Moins d'argent que prévu** | Tu as noté 1 000 FCFA. Il reste 2 500 FCFA à détailler. | Puces et Non détaillé |
| **Écart nul** | Tout est à jour. | Sans puces. Bouton : « Valider mon bilan » |
| **Plus d'argent que prévu** | Tu as 2 000 FCFA de plus que prévu. | Puces : « Revenu non noté », « Dépense notée en trop », « Non détaillé » ; une seule choisie |
| **Jours sans bilan** | Depuis mardi, il reste 6 000 FCFA à détailler. | Puces sur toute la période, sans remarque sur les jours manquants |
| **Pas encore d'habitudes** | Il reste 2 500 FCFA à détailler. Tu t'en souviens ? | Catégories courantes en puces, **sans montant** |

## 7. États

| État | Affichage |
| --- | --- |
| Puces à forte confiance | Présélectionnées, de 0,7 à 0,95, seulement tant que leur somme tient dans l'écart |
| Puces à confiance moyenne | Proposées sans sélection, de 0,5 à 0,7 |
| Moins de 0,5 | Pas de puce |
| Somme égale à l'écart | « Non détaillé : 0 FCFA » |
| Somme supérieure à l'écart | La ligne devient, avec l'icône `warning` : « Ça dépasse l'écart de 500 FCFA. » en `#8A4B00` en clair, `#FFD27A` en sombre, et le bouton principal se désactive (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Retour depuis EC-13 | La dépense ajoutée apparaît dans le déjà noté, et l'écart baisse |
| Hors ligne | Identique |

Les montants restent modifiables, et jamais validés seuls : l'utilisateur touche toujours « Valider mon bilan ».

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une puce | La choisit ou la retire ; le reste se recalcule |
| Appui long sur une puce choisie | Feuille pour ajuster le montant |
| Appui long sur une puce suggérée | EC-47 Pourquoi cette suggestion |
| « Ajouter une dépense » | EC-13 en mode « Ajouter une autre » ; « Terminer » revient ici |
| « Valider mon bilan » | Enregistre et ouvre EC-21 |
| « Tout laisser en non détaillé » | Enregistre tout l'écart ainsi, puis EC-21, sans question |
| Retour | EC-19 ; le comptage reste modifiable |

## 9. Données

| Valeur | Calcul |
| --- | --- |
| Écart | Solde attendu − solde compté |
| Non détaillé | Écart − somme des puces choisies |

Le « Non détaillé » réduit le solde et compte dans le pot du quotidien. Une saisie tardive détaille ensuite cet écart, sans changer le solde compté.

**Exemple.** Karim : 44 000 attendus, 41 500 comptés, soit 2 500 FCFA d'écart. Transport 1 500, Crédit téléphone 500, Non détaillé 500.

## 10. Accessibilité

Les puces forment un groupe : « Transport, 1 500 francs CFA, sélectionné ». Le reste est annoncé après chaque changement : « Non détaillé : 500 francs CFA ». Action personnalisée « Ajuster le montant » pour remplacer l'appui long.

## 11. Mouvement

Les bulles apparaissent l'une après l'autre, à 100 ms d'écart, pour l'effet de conversation, sans attente artificielle : tout est utilisable aussitôt. Puce en 100 ms.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Puces sur plusieurs rangées ; le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 13. Mesure

`gap_shown`, avec le cas (`less`, `none`, `more`, `multi_days`) ; `suggestion_accepted`, `gap_left_undetailed`. **Aucun montant.**
