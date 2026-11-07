# EC-49 Reprendre

| Fiche | |
| --- | --- |
| **Parcours** | PC-19 |
| **Lot** | L1 |
| **Bible** | ONB-06, SAI-12 |
| **Avant** | Ouverture de l'app après 30 jours sans action |
| **Après** | EC-19, puis EC-12 ; EC-03 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp |

## 1. Rôle

Permettre de revenir sans honte et sans tout refaire : un seul comptage remet l'app à jour.

## 2. Ce qu'on voit

Le paysage en plein écran, comme un statut. En blanc : « Reprendre où tu t'étais arrêté. » Une phrase simple : « Compte ta poche : l'app se remet à jour. » Le bouton vert « Compter ma poche », et un lien discret : « Repartir de zéro ». Aucune mention du temps perdu.

## 3. Maquette

```text
┌────────────────────────────────────┐
│                                    │
│ Reprendre où tu                    │ 64
│ t'étais arrêté.                    │
│                                    │
│ Compte ta poche : l'app se remet   │ 48
│ à jour.                            │
│                         ⌄   ⌄ ⌄    │
│     ◯ soleil                       │
│              ╱╲                    │
│ ▁▂▃▂▁▁▂▂▃▄▃▂╱  ╲▁▁▂▃▅▇▆▄▂          │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     │
│ ╭────────────────────────────────╮ │
│ │        Compter ma poche        │ │ 48
│ ╰────────────────────────────────╯ │
│         Repartir de zéro           │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Élément | Position | Dimensions |
| --- | --- | --- |
| Titre | Haut 48 dp | 64 dp |
| Texte | 12 dp après | 48 dp |
| Paysage | Tout l'écran ; collines en bas | Soleil de 64 dp |
| Pied | Fixe, sans fond | 128 dp |

## 5. Éléments

Le paysage est identique en clair et en sombre.

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Ciel | — | Dégradé | `#054D43` → `#0E7A6A` |
| Soleil | — | Cercle de 64 dp | `#FFBC38` |
| Collines | — | Silhouettes | `rgba(255,255,255,0.12)`, `rgba(11,20,26,0.55)` |
| Titre | Reprendre où tu t'étais arrêté. | Roboto 24/32 sp, Medium (500) | `#FFFFFF` |
| Texte | Compte ta poche : l'app se remet à jour. | Roboto 16/24 sp, Regular (400) | `#FFFFFF` |
| Bouton principal | Compter ma poche | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte | Repartir de zéro | Roboto 14/20 sp, Medium (500) | `#FFFFFF` |

## 6. États

| État | Affichage |
| --- | --- |
| Ciel | Toujours « Ça suit » : l'app ne connaît pas encore la situation |
| Sans donnée | L'écran ne s'affiche pas ; l'app rouvre sur EC-01 |
| Hors ligne | Identique |

Aucun nombre de jours, aucun reproche, aucune série interrompue.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Compter ma poche » | EC-19, avec « Combien as-tu en espèces aujourd'hui ? » ; l'écart couvre toute la période ; puis EC-12 |
| « Repartir de zéro » | Dialogue : Repartir de zéro ? Tes saisies et tes comptages seront effacés. Ton compte et ta recette restent. Boutons : Annuler, Repartir en `#B3261E` en clair, `#F2B8B5` en sombre |
| Dialogue confirmé | EC-03 |
| Retour | Ferme l'app ; l'écran revient à la prochaine ouverture |

## 8. Données

| Règle | Application |
| --- | --- |
| Déclenchement | 30 jours sans action cœur, à la première ouverture |
| Rattrapage | Le comptage couvre toute la période en une seule ligne d'écart |
| Prévisions | Recalculées à partir du comptage |
| Revenus et charges | Conservés. EC-39 reste à relire ensuite |

## 9. Accessibilité

Le titre est annoncé d'abord. Paysage ignoré. Le dialogue prend le focus, sur Annuler.

## 10. Mouvement

Fondu d'entrée de 300 ms. Paysage immobile.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Paysage cadré par le bas |
| 320 × 568 dp | Marges de 16 dp ; soleil de 48 dp |
| Texte à 200 % | Voile `rgba(11,20,26,0.40)` si le texte touche les collines |

## 12. Mesure

`resume_shown`, `resume_count_started`, `resume_restart`. Aide à mesurer le retour après absence. **Aucun montant.**
