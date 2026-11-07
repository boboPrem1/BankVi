# EC-09 Quand préfères-tu noter ?

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement |
| **Lot** | L1 |
| **Bible** | ONB-03, SAI-08, MSG-01, ONB-07 |
| **Avant** | EC-08 Aperçu, EC-07 ou EC-06 avec « Plus tard » |
| **Après** | EC-10 Sauvegarde |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp |

## 1. Rôle

Adapter le rappel et l'accueil à l'habitude de chacun, sans rien interdire. C'est aussi le premier moment où demander la permission de notifier.

## 2. Ce qu'on voit

Le titre : « Quand préfères-tu noter ? » Deux cartes : « Au fil de la journée » est déjà choisie, « Le soir » est à côté d'elle, en dessous. Une ligne rappelle que le choix n'enferme pas. Si « Le soir » est touché, un bloc se déplie : « Rappel à », avec des puces 19 h, 20 h (choisie), 21 h, 22 h et Autre heure, puis une phrase qui explique la permission. Le bouton change alors de libellé pour devenir « Activer mon rappel ».

## 3. Maquette

Choix « Le soir » :

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←                                  │ 56
│ Quand préfères-tu noter ?          │ 32
│ Tu pourras changer à tout moment,  │
│ et noter quand tu veux.            │ 40
│                                    │
│ ┌────────────────────────────────┐ │
│ │ ○ Au fil de la journée         │ │ 72
│ │   Tu notes quand tu dépenses.  │ │
│ └────────────────────────────────┘ │
│ ╔════════════════════════════════╗ │
│ ║ ◉ Le soir                      ║ │ 72
│ ║   Tu fais ton bilan en une fois║ │
│ ╚════════════════════════════════╝ │
│ Rappel à                           │ 20
│ (19 h) (✓20 h) (21 h) (22 h)       │ 32
│ (Autre heure)                      │ 32
│                                    │
│ ⓘ Pour te rappeler ton bilan à 20 h│
│   BankVi doit envoyer des          │ 60
│   notifications.                   │
│ ╭────────────────────────────────╮ │
│ │      Activer mon rappel        │ │ 48
│ ╰────────────────────────────────╯ │
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut, retour seul | 56 dp | 8 dp |
| Titre | 32 dp | 8 dp |
| Aide | 40 dp | 24 dp |
| Carte 1 | 72 dp | 12 dp |
| Carte 2 | 72 dp | 24 dp |
| Libellé « Rappel à » | 20 dp | 8 dp |
| Puces | 32 dp par rangée, écart 8 dp | 16 dp |
| Explication | 60 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Quand préfères-tu noter ? | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Aide | Tu pourras changer à tout moment, et noter quand tu veux. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Carte au repos | — | Rayon 12 dp, contour 1 dp | Fond `#FFFFFF` en clair, `#202C33` en sombre, contour `#7A8A94` en clair, `#667781` en sombre |
| Carte choisie | — | Contour 2 dp | Fond `#D8FDD2` en clair, `#103529` en sombre, contour `#008069` en clair, `#25D366` en sombre |
| Titre carte 1 | Au fil de la journée | Roboto 16/24 sp, Medium (500) | Repos `#111B21` en clair, `#E9EDEF` en sombre ; choisie `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Texte carte 1 | Tu notes quand tu dépenses. | Roboto 14/20 sp, Regular (400) | Repos `#54656F` en clair, `#AEBAC1` en sombre ; choisie `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Titre carte 2 | Le soir | Roboto 16/24 sp, Medium (500) | Mêmes règles |
| Texte carte 2 | Tu fais ton bilan en une fois. | Roboto 14/20 sp, Regular (400) | Mêmes règles |
| Libellé | Rappel à | Roboto 14/20 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Puce au repos | 19 h, 21 h, 22 h, Autre heure | 32 dp, Roboto 14/20 sp, Medium (500) | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Puce choisie | 20 h | Icône `check`, sans contour | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Explication | Pour te rappeler ton bilan à 20 h, BankVi doit envoyer des notifications. | Bandeau d'état, Roboto 14/20 sp, Regular (400), icône `notifications` de 20 dp | Fond `#E3F0FB` en clair, `#10283F` en sombre, texte `#0B5CAD` en clair, `#A8D4FF` en sombre |
| Bouton, au fil de la journée | Continuer | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton, le soir | Activer mon rappel | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

« Au fil de la journée » est présélectionné : ce choix ne déclenche rien, et le bouton sert aussi à passer l'écran. Ce n'est pas un consentement.

## 6. États

| État | Affichage |
| --- | --- |
| Arrivée | Carte 1 choisie, pas de puces, « Continuer » |
| Le soir choisi | Puces et explication dépliées, 20 h choisie, « Activer mon rappel » |
| Autre heure touchée | Sélecteur d'heure système, format 24 h ; la puce affiche l'heure choisie : « 18 h 30 » |
| Heure de nuit, de 23 h à 5 h 59 | Sous les puces, en `#B3261E` en clair, `#F2B8B5` en sombre : « Choisis une heure entre 6 h et 22 h 59. » Bouton inactif |
| Permission déjà accordée, ou Android 12 et moins | Pas de dialogue ni d'explication sur la permission : une aide « Rappel chaque jour à 20 h. » |
| Permission déjà refusée définitivement | L'explication devient : « Les notifications sont coupées dans les réglages du téléphone. Ton rappel s'affichera sur l'accueil. » |
| Retour depuis EC-10 | Choix conservé |
| Bandeau reçu d'EC-08 | « Recette adoptée. » avec « Annuler », au-dessus du pied |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une carte | Sélection, déplie ou replie le bloc en 200 ms |
| « Continuer » | Enregistre la préférence ; EC-10 ; aucune permission demandée |
| « Activer mon rappel » | Enregistre la préférence et l'heure, puis le dialogue système Android 13 et plus |
| Dialogue accepté | Rappel programmé ; EC-10 |
| Dialogue refusé | Préférence conservée ; EC-10 ; bandeau bas de 4 s : « Rappel non activé. Tu le retrouveras sur l'accueil. » |
| Flèche ou retour | Écran précédent |

Le dialogue système n'est demandé qu'une fois dans ce parcours. Aucune répétition après un refus.

## 8. Données

| Donnée | Effet |
| --- | --- |
| `preference` : `day` ou `evening` | Change uniquement le rappel et l'accueil. Toutes les saisies restent possibles |
| `ritualTime` : 20:00 par défaut | Heure de « Mon rituel », hors du plafond de notifications |
| Modification | À tout moment dans EC-40 |

**Exemples.** Camille : Au fil de la journée. Karim : Le soir, à 20 h.

## 9. Accessibilité

Cartes en groupe de choix, puces en groupe de choix, avec « sélectionné ». Le dépliage est annoncé : « Choix de l'heure du rappel affiché. » L'explication est lue avant le bouton, ce qui la rend utile avant le dialogue.

## 10. Mouvement

Dépliage en 200 ms ; le libellé du bouton change en fondu de 100 ms. Le dialogue système est géré par Android.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile jusqu'au bloc déplié, pied fixe |
| 320 × 568 dp | Marges de 16 dp ; les puces passent sur plus de rangées |
| Texte à 200 % | Hauteur des cartes libre, puces sur plusieurs rangées |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`onboarding_step_completed` (`notes_preference`), avec la préférence, l'heure arrondie, et le résultat de la permission (`granted`, `denied`, `not_needed`).
