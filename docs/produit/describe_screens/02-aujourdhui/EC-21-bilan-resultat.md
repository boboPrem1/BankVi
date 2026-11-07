# EC-21 Bilan : résultat

| Fiche | |
| --- | --- |
| **Parcours** | PC-05 |
| **Lot** | L1 |
| **Bible** | SAI-09, PRV-06, MES-01, MES-02 |
| **Avant** | EC-20 |
| **Après** | EC-12 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp |

## 1. Rôle

Terminer le rituel sur ce qui compte : le chiffre de demain. Sobrement, sans félicitation ni série de jours.

## 2. Ce qu'on voit

L'écran entier est le paysage de demain, recalculé avec ce qui vient d'être compté. En blanc : « Bilan fait », puis « Demain, tu pourras dépenser », et **4 600 FCFA**. Une phrase dit ce qui change. En bas, sur les collines sombres, le bouton vert « Terminer ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│                                    │
│ Bilan fait                         │ 24
│                                    │
│ Demain, tu pourras dépenser        │ 24
│ 4 600 FCFA                         │ 56
│ jusqu'au 30                        │ 24
│                                    │
│ 100 FCFA de moins qu'aujourd'hui.  │ 24
│                                    │
│                         ⌄   ⌄ ⌄    │
│     ◯ soleil                       │
│              ╱╲                    │
│ ▁▂▃▂▁▁▂▂▃▄▃▂╱  ╲▁▁▂▃▅▇▆▄▂          │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     │
│ ╭────────────────────────────────╮ │
│ │            Terminer            │ │ 48
│ ╰────────────────────────────────╯ │
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Élément | Position | Dimensions |
| --- | --- | --- |
| « Bilan fait » | Haut 48 dp | 24 dp |
| Amorce | 16 dp après | 24 dp |
| Nombre | — | 56 dp |
| Échéance | — | 24 dp |
| Phrase de changement | 16 dp après | 24 à 48 dp |
| Paysage | Tout l'écran ; collines au bas | Soleil de 64 dp |
| Pied | Fixe, sans fond | 76 dp |

## 5. Éléments

Le paysage est identique en clair et en sombre.

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Confirmation | Bilan fait | Roboto 18/24 sp, Medium (500), icône `check_circle` de 20 dp | `#FFFFFF` |
| Amorce | Demain, tu pourras dépenser | Roboto 16/24 sp, Regular (400) | `#FFFFFF` |
| Nombre | 4 600 | Roboto 48/56 sp, Bold (700) | `#FFFFFF` |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#FFFFFF` |
| Échéance | jusqu'au 30 | Roboto 16/24 sp, Regular (400) | `#FFFFFF` |
| Phrase | 100 FCFA de moins qu'aujourd'hui. | Roboto 16/24 sp, Regular (400) | `#FFFFFF` |
| Ciel | — | Dégradé selon l'état de demain | Ça suit `#054D43` → `#0E7A6A` ; Ça se resserre `#123A5C` → `#2A6A8F` ; Serré `#33275C` → `#66478C` ; Il manque `#40270F` → `#8A4B00` |
| Soleil | — | Cercle de 64 dp | `#FFBC38` |
| Collines | — | Silhouettes | `rgba(255,255,255,0.12)`, `rgba(11,20,26,0.55)` |
| Bouton principal | Terminer | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Texte |
| --- | --- |
| Chiffre en baisse | 100 FCFA de moins qu'aujourd'hui. |
| Chiffre en hausse | 200 FCFA de plus qu'aujourd'hui. |
| Chiffre identique | Comme aujourd'hui. |
| Il manque, demain | Demain, il manque / 8 500 FCFA / pour tes charges jusqu'au 30 |
| Horizon changé | Ajoute : « Il pourrait manquer 4 000 FCFA le 24. » |
| Hors ligne | Identique, le calcul se fait sur le téléphone |

Aucune félicitation, aucune série de jours, aucun jugement sur le résultat.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Terminer » | EC-12 ; l'anneau signale un nouveau statut |
| Retour | Comme « Terminer » : le bilan est déjà enregistré |

Le bilan compte comme jour d'activité dès l'arrivée sur cet écran.

## 8. Données

| Valeur | Calcul pour Karim |
| --- | --- |
| Soldes du soir | 41 500 + 20 000 = 61 500 |
| Revenu encore attendu demain | min(90 000 × 24 ÷ 30 ; 75 000) = 72 000 |
| Charges avant la date | 21 000 |
| Reste à vivre | 61 500 + 72 000 − 21 000 = 112 500 |
| Chiffre de demain | 112 500 ÷ 24 = 4 687, arrondi à 4 600 |

La recette et l'horizon se recalculent aussitôt. Les habitudes apprennent des réponses, sur le téléphone seulement.

## 9. Accessibilité

Lecture d'un bloc : « Bilan fait. Demain, tu pourras dépenser quatre mille six cents francs CFA jusqu'au 30. Cent francs de moins qu'aujourd'hui. » Le paysage porte une phrase courte. Focus sur « Terminer » après la lecture.

## 10. Mouvement

Fondu d'entrée de 300 ms, vibration légère. Le paysage est immobile. Pas de compteur ni de confettis.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Paysage cadré par le bas ; texte en haut |
| 320 × 568 dp | Haut réduit à 24 dp ; soleil de 48 dp |
| Texte à 200 % | Chiffre plafonné à 64 sp ; voile `rgba(11,20,26,0.40)` si le texte touche les collines |

## 12. Mesure

`ritual_completed`, avec la durée et le nombre de poches. Alimente l'activation : du réel sur 3 jours distincts dans les 7 premiers jours. **Aucun montant.**
