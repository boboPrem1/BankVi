# EC-43 Ce que l'app a appris

| Fiche | |
| --- | --- |
| **Parcours** | PC-18 |
| **Lot** | L1 |
| **Bible** | HAB-06, HAB-07, NAT-04 |
| **Avant** | EC-37, EC-47 |
| **Après** | EC-37 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Montrer ce que l'app croit savoir, et laisser l'utilisateur corriger ou effacer.

## 2. Ce qu'on voit

Une phrase rassure : tout reste sur ce téléphone. Une carte par habitude apprise : « En semaine vers 8 h, tu notes souvent Taxi, 500 à 700 FCFA. » Sous chacune, trois réponses rapides, à la manière de réactions : Juste, Faux, Oublier. En bas, un interrupteur coupe l'apprentissage. Plus bas, « Tout oublier » en rouge. Aucun bouton vert.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Ce que l'app a appris           │ 56
│ Ces habitudes restent sur ce       │ 40
│ téléphone.                         │
│ ╭──────────────────────────────╮   │
│ ┆ En semaine vers 8 h, tu notes │  │ 56
│ │ souvent Taxi, 500 à 700 FCFA. │  │
│ ╰──────────────────────────────╯   │
│ (Juste) (Faux) (Oublier)           │ 48
│ ╭──────────────────────────────╮   │
│ ┆ Le midi, tu notes souvent     │  │ 56
│ │ Déjeuner, vers 1 000 FCFA.    │  │
│ ╰──────────────────────────────╯   │
│ (✓Juste) (Faux) (Oublier)          │ 48
│ ────────────────────────────────── │
│ Apprendre de mes saisies     (● ) │ 56
│           Tout oublier             │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 4 dp |
| Phrase | 40 dp | 12 dp |
| Bulle | 56 dp | 4 dp |
| Réponses | 48 dp | 12 dp |
| Interrupteur | 56 dp | 4 dp |
| Tout oublier | 48 dp | 16 dp |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Ce que l'app a appris | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Phrase | Ces habitudes restent sur ce téléphone. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bulle | En semaine vers 8 h, tu notes souvent Taxi, 500 à 700 FCFA. | Roboto 14/20 sp, Regular (400), haut gauche 4 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Puce | Juste, Faux, Oublier | 32 dp, Roboto 14/20 sp, Medium (500) | Contour `#7A8A94` en clair, `#667781` en sombre ; choisie : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Interrupteur | Apprendre de mes saisies | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton destructif | Tout oublier | Roboto 14/20 sp, Medium (500), centré | `#B3261E` en clair, `#F2B8B5` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| Rien d'appris | L'app n'a encore rien appris. Note quelques dépenses pour voir apparaître tes habitudes. |
| Faux | La carte disparaît, l'app ne le propose plus ; « Annuler » pendant 10 s |
| Oublier | Même chose, en effaçant les données de ce créneau |
| Apprentissage coupé | Plus aucune suggestion ; phrase : « Tes habitudes restent ici jusqu'à ce que tu les oublies. » |
| Libellés sensibles | Jamais d'habitude affichée : ils ne sont pas appris |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Juste | Renforce l'habitude |
| Faux, Oublier | Retire, avec « Annuler » |
| « Tout oublier » | Dialogue : Tout oublier ? Tes suggestions repartiront de zéro. Tes saisies ne changent pas. Boutons : Annuler, Tout oublier en `#B3261E` en clair, `#F2B8B5` en sombre |
| Retour | EC-37 |

## 8. Données

Tables de fréquences par créneau, calculées sur le téléphone. Sur un nouvel appareil, elles sont recalculées depuis les saisies, jamais envoyées au serveur. Oublier ne supprime aucune saisie.

## 9. Accessibilité

Chaque groupe de réponses est lié à sa phrase : « Taxi, le matin : Juste, non sélectionné ». Le dialogue prend le focus.

## 10. Mouvement

Une carte se replie en 200 ms. Puce en 100 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Puces sur plusieurs rangées |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`habit_feedback`, avec la réponse ; `learning_disabled` ; `habits_reset`. **Aucun montant ni libellé.**
