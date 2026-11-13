# EC-09 Quand préfères-tu noter ?

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement |
| **Lot** | L1 |
| **Bible** | ONB-03, SAI-08, MSG-01, ONB-07 |
| **Avant** | EC-08 Aperçu, EC-07 ou EC-06 avec « Plus tard » |
| **Après** | EC-10 Sauvegarde |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp |

<!-- fiche-autonome:debut -->
**Fiche autonome.** Ce fichier suffit pour finir cet écran, sans aucun autre document. Les sections numérotées décrivent l'écran ; l'annexe en bas donne la philosophie de BankVi, le design system, les composants utilisés, le contexte produit et les critères de fin. Pour cet écran, les sections numérotées priment sur l'annexe.
<!-- fiche-autonome:fin -->

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

<!-- annexe:debut — partie générée par generer_annexes.py, à ne pas modifier à la main -->

## Annexe : tout ce qu'il faut pour finir cet écran

### A. BankVi et sa philosophie

BankVi est une app Android de prévision de budget pour le Togo, en FCFA, pensée pour une vie où l'argent est d'abord en espèces et en mobile money (Mixx, Flooz). Elle répond à une question : **combien puis-je dépenser aujourd'hui ?**

Les personnes de référence sont Camille, salariée, et Karim, indépendant. L'app doit tenir sur un téléphone d'entrée de gamme, en plein soleil, avec un réseau instable et pour des personnes qui lisent peu ou lentement le français.

| Terme | Sens |
| --- | --- |
| L1 | Premier lot : test restreint |
| L2 | Second lot : lancement public |
| Pass Plus | L'offre payante. Elle s'achète sur le site, jamais dans l'app |
| dp, sp | Unités d'Android : dp pour les dimensions, sp pour le texte |

#### Sept principes

1. **Le familier avant l'original.** Un geste connu de WhatsApp vaut mieux qu'une trouvaille. BankVi se distingue par son chiffre du jour, pas par ses composants.
2. **Le vert veut dire « agir ».** Il n'est ni un décor ni un fond. Sur un écran ordinaire, il occupe moins de 10 % de la surface.
3. **Une seule décision par écran.** Un bouton principal, en bas, sous le pouce. Le reste s'efface.
4. **Le chiffre est le héros.** Il a la plus grande taille de l'écran, et il n'y en a qu'un.
5. **Les faits, sans jugement.** Aucun rouge pour de l'argent qui manque, aucune félicitation appuyée, aucun « tu devrais ».
6. **Le plaisir sans la pression.** Beau, vivant et agréable à toucher, comme un réseau social, mais sans série de jours, ni points, ni comparaison.
7. **Léger partout.** Téléphone d'entrée de gamme, soleil de Lomé, réseau instable : police système, aucune image lourde, contrastes élevés.

#### L'expérience

| Principe | Ce que cela veut dire |
| --- | --- |
| **Regarder avant de remplir** | On ouvre l'app pour voir où on en est, comme on regarde un statut. Noter vient après |
| **Affirmé sur la disposition, neutre sur les choix** | L'app décide où va chaque chose et ce qui compte en premier. Elle ne dit jamais quoi faire de son argent (LEG-04) |
| **Le plaisir sans la pression** | Beau, vivant, agréable à toucher. Rien qui punit, compare ou fait revenir par peur de perdre |
| **Personnel, jamais public** | Il n'y a ni fil, ni abonnés, ni partage de montants. Le statut est un miroir, pas une publication |

#### Ce que le ludique n'a pas le droit de faire

| Interdit | Raison |
| --- | --- |
| Série de jours, flamme, compteur à ne pas perdre | Un jour oublié deviendrait une faute (« pas de reproche ») |
| Points, niveaux, badges de réussite | Récompenser une dépense faible, c'est juger |
| Classement, comparaison avec d'autres | Données financières, et pression sociale |
| Fil public, commentaires, abonnés | Modération exclue avant P3, et risque pour la vie privée |
| Fausse urgence, ou statut qui expire | Aucune manipulation |
| Offre ou publicité dans le statut | Le miroir reste propre |
| Lecture automatique à l'ouverture | Le chiffre du jour reste à 0 tap (PRV-01), et le son pourrait surprendre en public |

Le ludique passe par la beauté, la surprise douce et le plaisir du geste.

#### Règles communes à tous les écrans

- **Langue :** français, tutoiement, mots courants. On dit « recette », « pot », « poche », « reste à vivre ».
- **Montants :** FCFA, sans décimales, avec espace pour les milliers (12 500 FCFA).
- **Une action principale par écran,** en bas, sous le pouce, avec un verbe et un résultat.
- **Hors ligne :** tout fonctionne sans réseau, sauf la connexion et le paiement. Un petit indicateur « Enregistré sur ce téléphone » remplace tout message d'erreur.
- **Annuler plutôt que confirmer :** une action réversible s'exécute aussitôt, avec un bandeau « Annuler » pendant 10 secondes. La confirmation est réservée à l'irréversible.
- **Pas de reproche :** un écart, un jour oublié ou un pot dépassé s'énoncent comme des faits.
- **Pas de conseil :** l'app montre des faits, la règle de l'utilisateur et la conséquence. Jamais « tu devrais ».
- **Le plaisir sans la pression :** l'app emprunte aux réseaux sociaux leurs gestes et leur plaisir, jamais leur pression : ni série de jours, ni points, ni classement, ni fil public. L'app est affirmée sur sa disposition, neutre sur les choix de l'utilisateur.
- **Fonction du Pass Plus :** elle reste visible, avec sa description. L'offre n'apparaît qu'après le premier horizon, et elle se ferme toujours.

#### Ce qu'on reprend de WhatsApp

| Convention WhatsApp | Dans BankVi |
| --- | --- |
| Accueil : illustration au centre, titre, bouton vert en bas | EC-01 Bienvenue |
| Numéro de téléphone avec indicatif, champ souligné | EC-10 Sauvegarde |
| Code reçu par SMS à 6 chiffres, renvoi après un délai, lecture automatique | EC-11 Code |
| Bouton vert en pilule avec texte sombre | Bouton principal |
| Barre du haut sobre, sur le même fond que l'écran, titre à gauche | Tous les écrans |
| Barre de navigation en bas, onglet actif sur une pastille verte pâle | Aujourd'hui, Horizon, Pots, Plus |
| Statut avec anneau et segments à toucher | Statut du jour, avec paysage généré (EC-50) |
| Lignes avec avatar rond, titre, sous-titre et valeur à droite | Poches, charges, saisies |
| Puces de filtre arrondies | Propositions de charges, dates, heures |
| Bulles à un coin aplati, ombre très fine | Explications de l'app ; dépenses en messages sortants, revenus en messages entrants |
| Feuille basse à coins arrondis | Ajout d'une charge, « Pourquoi cette suggestion ? » |
| Bandeau bas temporaire | « Annuler » pendant 10 secondes |
| Thème sombre très profond, sans teinte grise verdâtre | Thème sombre complet |
| Icônes rondes à contour, pleines quand elles sont actives | Toute l'iconographie |
| Illustrations arrondies à contour noir | Bienvenue, états vides |

#### Ce qu'on ne reprend pas

Les règles de marque de Meta interdisent notamment de suggérer un partenariat ou une approbation, d'utiliser des images proches du logo au téléphone, et de reprendre le nom dans une marque ou un domaine.

| Écarté | Raison |
| --- | --- |
| Logo WhatsApp, combiné dans une bulle, ou image proche | Règle de marque de Meta |
| Icône de l'app ronde ou en bulle verte avec un téléphone | Risque de confusion, et refus possible sur Google Play pour usurpation |
| Le mot « WhatsApp » dans le nom, la fiche Play ou le domaine | Règle de marque de Meta |
| Mention « comme WhatsApp », « par WhatsApp » ou « compatible » | Suggère un lien qui n'existe pas |
| Motif de fond (doodle) du chat | Élément très reconnaissable, sans utilité ici |
| Queue de bulle identique et coches de lecture | Sans utilité : BankVi n'envoie pas de messages |
| Fond beige `#EFE7DD` du chat | Le bilan du soir en bulles garde le fond de l'app, plus sobre |

Le mot « WhatsApp » n'apparaît dans l'app que là où il décrit un fait : « Partager sur WhatsApp » (EC-35) et « Donner mon avis » vers le groupe de test (EC-37). Il s'écrit alors dans la police et la taille du texte qui l'entoure, sans logo modifié.

#### Comment dessiner cet écran

1. Partir du cadre de référence : 360 × 800 dp, thème clair, puis décliner en sombre.
2. Reprendre uniquement les composants et les valeurs de ce fichier. Ne rien inventer : si rien ne convient, le signaler au lieu de créer une valeur.
3. Vérifier la règle d'or : **un seul bouton vert par écran**, sauf si la fiche dit qu'il n'y en a aucun.
4. Reprendre les textes de la fiche mot pour mot, et appliquer la rédaction ci-dessous à tout texte d'adaptation.

### B. Cet écran dans le produit

#### Ce que dit le parcours

- **Contenu :** « Au fil de la journée » ou « Le soir », avec l'heure du rappel pour le soir. Le choix se modifie à tout moment et n'empêche rien.
- **Action principale :** « Activer mon rappel » si le soir est choisi, sinon « Continuer ».
- **Après :** la permission de notification s'explique par une phrase, puis la demande système.
- **Bible :** ONB-03, SAI-08, MSG-01, ONB-07.

#### PC-01 Premier lancement jusqu'au premier horizon · L1

*Camille et Karim. Objectif : voir son horizon en 3 minutes, avant de créer un compte.*

1. **EC-01** Bienvenue. Si l'utilisateur veut voir avant de se lancer : **EC-02** Exemple.
2. **EC-03** Il indique ce qu'il a aujourd'hui en espèces ; Mixx et Flooz sont facultatifs.
3. **EC-04** Il indique son revenu. Camille choisit « Régulier » : 120 000 FCFA, le 28. Karim choisit « Variable » : le moins qu'il gagne sur un mois.
4. **EC-05** Il ajoute ses charges fixes, ou choisit « Je n'en ai pas ».
5. **EC-06** Il voit son chiffre du jour et sa courbe à 30 jours.
6. **EC-07 et EC-08** Il choisit une recette parmi trois, ou reporte.
7. **EC-09** Il choisit quand noter.
8. **EC-10 et EC-11** Il sauvegarde ses données avec son numéro, ou reporte.
9. Arrivée sur **EC-12**.

**Si l'utilisateur quitte :** la progression est gardée et il reprend à la même étape.

#### Décisions déjà prises pour cet écran

| Point | Décision |
| --- | --- |
| Limites du rappel du soir | **Validé :** Heures de 6 h à 22 h 59 ; défaut 20 h |

```text
EC-01 Bienvenue ──► EC-03 Mon argent ──► EC-04 Mon revenu ──► EC-05 Mes charges ──► EC-06 Premier horizon
   │    │                ▲                                                            │ "Répartir"   │ "Plus tard"
   │    └► EC-02 Exemple ┘                                                            ▼              │
   │                                                          EC-07 Recette la plus proche ─ "Plus tard"┤
   │                                                                   ▼                             │
   │                                                          EC-08 Aperçu de la recette             │
   │                                                                   ▼                             ▼
   │                                                          EC-09 Quand noter ◄────────────────────┘
   │                                                                   ▼
   └─ "J'ai déjà un compte" ─────────────────────────────────► EC-10 Sauvegarde ─ "Plus tard" ─► EC-12 Accueil
                                                                       ▼                            ▲
                                                               EC-11 Code ──────────────────────────┘
```

#### Personnes et chiffres d'exemple

La date de référence des exemples est le **vendredi 6 novembre 2026**.

| Donnée | Camille, salariée | Karim, indépendant |
| --- | --- | --- |
| Espèces | 32 000 FCFA | 45 000 FCFA |
| Mixx | 58 000 FCFA | 20 000 FCFA |
| Flooz | — | — |
| Revenu | Régulier : 120 000 FCFA, le 28 | Variable : au moins 90 000 FCFA par mois |
| Charges | École 25 000 (le 3), Loyer 35 000 (le 5), Électricité 8 000 (le 15), Tontine 10 000 (le 20) | Loyer 15 000 (le 10), Téléphone 6 000 (le 18) |
| Total des charges | 78 000 FCFA, soit 65 % du revenu | 21 000 FCFA |
| Date de référence | 28 novembre, dans 22 jours | 30 novembre, 25 jours en comptant aujourd'hui |
| Reste à vivre | 90 000 − 18 000 = 72 000 FCFA | 65 000 + 75 000 − 21 000 = 119 000 FCFA |
| Chiffre du jour | 3 272 → **3 200 FCFA** | 4 760 → **4 700 FCFA** |
| Recette la plus proche | 70 / 20 / 10 | Revenu plancher prudent |

### C. Fondations du design system

#### Palette

| Jeton | Clair | Sombre | Rôle |
| --- | --- | --- | --- |
| `bg.canvas` | `#FFFFFF` | `#0B141A` | Fond de tous les écrans |
| `bg.subtle` | `#F0F2F5` | `#111B21` | Zones groupées, champ de recherche |
| `bg.elevated` | `#FFFFFF` | `#202C33` | Cartes, feuilles basses, dialogues |
| `bg.bubbleApp` | `#F0F2F5` | `#202C33` | Bulle : l'app explique quelque chose |
| `bg.bubbleUser` | `#D9FDD3` | `#005C4B` | Bulle sortante : dépense notée, réponse de l'utilisateur |
| `bg.bubbleIncome` | `#F0F2F5` | `#202C33` | Bulle entrante : revenu noté |
| `bg.selected` | `#D8FDD2` | `#103529` | Puce, carte ou onglet sélectionnés |
| `bg.scrim` | `rgba(11,20,26,0.40)` | `rgba(0,0,0,0.60)` | Voile derrière une feuille ou un dialogue |
| `text.primary` | `#111B21` | `#E9EDEF` | Titres, montants, texte courant |
| `text.secondary` | `#54656F` | `#AEBAC1` | Aides, descriptions |
| `text.tertiary` | `#667781` | `#8696A0` | Axes, placeholders. En clair : sur fond blanc uniquement |
| `text.timeOnExpense` | `#3B4A54` | `#D9FDD3` | Heure dans une bulle de dépense |
| `text.disabled` | `#667781` | `#8696A0` | Libellé d'un bouton désactivé |
| `text.link` | `#00735E` | `#25D366` | Boutons texte, liens, marque écrite |
| `text.onAction` | `#0B141A` | `#0B141A` | Texte et icône sur le vert d'action |
| `text.onSelected` | `#0A3D2E` | `#D9FDD3` | Texte sur fond sélectionné |
| `action.primary` | `#25D366` | `#25D366` | Bouton principal |
| `action.primaryPressed` | `#1FAD56` | `#1FAD56` | Bouton principal, état appuyé |
| `action.disabled` | `#E9EDEF` | `#202C33` | Fond d'un bouton désactivé |
| `action.ripple` | `rgba(17,27,33,0.10)` | `rgba(233,237,239,0.12)` | Retour tactile sur une surface |
| `border.subtle` | `#E9EDEF` | `#2A3942` | Séparateurs, contour de carte |
| `border.control` | `#7A8A94` | `#667781` | Soulignement de champ, contour de puce et de radio |
| `border.focus` | `#008069` | `#25D366` | Champ actif, carte sélectionnée |
| `status.warnFg` | `#8A4B00` | `#FFD27A` | Argent manquant, attention |
| `status.warnBg` | `#FFF3D6` | `#3A2C10` | Fond de l'attention |
| `status.errorFg` | `#B3261E` | `#F2B8B5` | Erreur de saisie, action destructive |
| `status.errorBg` | `#FBE9E7` | `#3C1F1E` | Fond d'une erreur |
| `status.infoFg` | `#0B5CAD` | `#A8D4FF` | Information neutre, marque « Exemple » |
| `status.infoBg` | `#E3F0FB` | `#10283F` | Fond de l'information |
| `status.successFg` | `#00735E` | `#25D366` | Confirmation, en texte et icône |
| `chart.line` | `#008069` | `#25D366` | Courbe de l'horizon |
| `chart.area` | `rgba(0,128,105,0.10)` | `rgba(37,211,102,0.10)` | Lavis sous la courbe |
| `chart.grid` | `#E9EDEF` | `#2A3942` | Lignes de repère |
| `chart.zero` | `#7A8A94` | `#667781` | Ligne du zéro |
| `chart.lack` | `rgba(138,75,0,0.12)` | `rgba(255,210,122,0.14)` | Lavis de la zone sous zéro |
| `pot.1` | `#008069` | `#00A884` | Premier pot d'une recette |
| `pot.2` | `#B86200` | `#C47F00` | Deuxième pot |
| `pot.3` | `#7F66FF` | `#8B75FF` | Troisième pot |
| `pot.4` | `#E0568A` | `#E0588A` | Quatrième pot |
| `pot.5` | `#027EB5` | `#2E9BD6` | Cinquième pot |
| `pot.6` | `#8F7A1F` | `#93852A` | Sixième pot |
| `illustration.outline` | `#111B21` | `#E9EDEF` | Contour de toutes les illustrations |
| `illustration.green` | `#25D366` | `#25D366` | Billet, éléments d'action |
| `illustration.mint` | `#D9FDD3` | `#005C4B` | Grande surface d'une illustration |
| `illustration.amber` | `#FFBC38` | `#FFBC38` | Pièces de monnaie |
| `illustration.paper` | `#FFFFFF` | `#202C33` | Surface neutre d'une illustration |

#### Règles d'usage

| Règle | Détail |
| --- | --- |
| **Vert d'action** | `#25D366` (clair et sombre) : bouton principal seulement. Jamais comme texte sur fond clair (1,98:1 sur blanc). |
| **Lien** | `#00735E` en clair, `#25D366` en sombre pour les boutons texte et les liens. |
| **Argent qui manque** | `#8A4B00` en clair, `#FFD27A` en sombre sur `#FFF3D6` en clair, `#3A2C10` en sombre, toujours avec une icône et une phrase. Jamais de rouge : un manque est un fait, pas une faute. |
| **Rouge** | `#B3261E` en clair, `#F2B8B5` en sombre seulement pour une erreur de saisie et une action destructive. |
| **Dépense et revenu** | Même couleur de texte (`#111B21` en clair, `#E9EDEF` en sombre). Le signe et le libellé les distinguent : une dépense dans une bulle porte « − » (U+2212), un revenu porte « + ». |
| **Couleur seule** | Jamais : une couleur d'état s'accompagne toujours d'une icône et de texte. |
| **Texte tertiaire en clair** | Sur `#FFFFFF` en clair, `#0B141A` en sombre uniquement. Sur `#F0F2F5` il tombe à 4,14:1 : utiliser `#54656F` en clair, `#AEBAC1` en sombre. |
| **Couleurs des pots** | Pour une pastille ou une barre, jamais pour du texte. L'ordre est fixe. Un pot garde sa couleur tant qu'il existe. |

#### Police

**Roboto**, la police système d'Android. Elle ne coûte aucun téléchargement, s'affiche aussitôt et reste lisible sur les petits écrans. WhatsApp emploie une police système ou proche selon les versions, avec le même rendu sobre.

Graisses permises : Regular (400), Medium (500), Bold (700, pour le chiffre héros seulement). Pas d'italique. Pas de majuscules entières.

#### Échelle

Format : taille / interligne en sp.

| Style | Valeur | Rôle |
| --- | --- | --- |
| `hero` | Roboto 48/56 sp, Bold (700) | Le chiffre du jour, un seul par écran |
| `amountInput` | Roboto 36/44 sp, Medium (500) | Montant en cours de saisie |
| `title` | Roboto 24/32 sp, Medium (500) | Question ou titre dans le contenu |
| `appbar` | Roboto 22/28 sp, Medium (500) | Titre de la barre du haut |
| `subtitle` | Roboto 18/24 sp, Medium (500) | Titre de bloc, nom d'une feuille, unité du chiffre héros |
| `bodyLarge` | Roboto 16/24 sp, Regular (400) | Texte courant, valeur d'un champ compact |
| `bodyStrong` | Roboto 16/24 sp, Medium (500) | Titre de ligne ou de carte |
| `button` | Roboto 16/24 sp, Medium (500) | Bouton principal |
| `body` | Roboto 14/20 sp, Regular (400) | Aides, descriptions, bulles |
| `bodyMedium` | Roboto 14/20 sp, Medium (500) | Boutons texte, puces, libellés de champ |
| `caption` | Roboto 12/16 sp, Regular (400) | Axes, compteur, mentions |
| `captionMedium` | Roboto 12/16 sp, Medium (500) | Onglets, marques courtes |

Rien sous 12 sp.

#### Chiffres

| Cas | Réglage |
| --- | --- |
| Chiffre héros, grand montant isolé | Chiffres proportionnels |
| Montant saisi, colonnes de montants, axes | Chiffres tabulaires (`fontVariant: tabular-nums`), pour éviter les sauts |
| Séparateur de milliers | Espace insécable U+00A0 : `3 200` |
| Unité | « FCFA », espace insécable avant, jamais coupé du nombre |

Dans le chiffre héros, le nombre est en `hero` et « FCFA » en `subtitle`, alignés sur la même ligne de base, avec 8 dp entre les deux.

#### Mise en forme

- Alignement à gauche par défaut. Centré seulement sur EC-01 et dans les états vides.
- Longueur de ligne : la largeur de l'écran suffit ; aucun bloc de plus de trois lignes sans titre.
- Lettrage standard, sans espacement ajouté.
- Pas de texte tronqué pour un montant. Un nom long peut se couper en fin de ligne après deux lignes.

#### Texte agrandi

L'app respecte la taille de texte du téléphone jusqu'à 200 %.

| À 130 % | À 200 % |
| --- | --- |
| Aucun changement de structure | Les éléments côte à côte passent l'un sous l'autre |
| Le chiffre héros suit | Le chiffre héros est plafonné à 64 sp, et « FCFA » passe à la ligne si besoin |
| | Le contenu défile, le bouton principal reste fixé en bas |

#### Échelle d'espacement

Base 4 dp : 4, 8, 12, 16, 24, 32, 48 dp. Aucune autre valeur.

| Entre | Espace |
| --- | --- |
| Icône et texte | 8 dp |
| Libellé et son champ | 4 dp |
| Titre et son aide | 8 dp |
| Deux éléments d'un même groupe | 12 dp |
| Deux champs | 16 dp |
| Deux blocs | 24 dp |
| Barre du haut et titre d'écran | 16 dp |

#### Marges latérales

| Contexte | Marge |
| --- | --- |
| Parcours de premier lancement et formulaires | 24 dp |
| Listes et écrans principaux | 16 dp |
| Écran de 340 dp de large ou moins | 16 dp partout |

Pas de grille à colonnes : une seule colonne, pleine largeur.

#### Cadres

| Cadre | Largeur × hauteur | Usage |
| --- | --- | --- |
| **Référence** | 360 × 800 dp | Toutes les maquettes |
| **Petit** | 360 × 640 dp | Vérification : entrée de gamme |
| **Étroit** | 320 × 568 dp | Vérification : la limite basse |
| **Grand** | 412 × 915 dp | Vérification : rien d'étiré |

Tablette : colonne centrée de 480 dp au plus. Paysage : non pris en charge en P1, l'app reste en portrait.

#### Anatomie verticale du cadre de référence

| Zone | Hauteur | Remarque |
| --- | --- | --- |
| Barre d'état | 24 dp | Le fond de l'écran passe dessous |
| Barre du haut | 56 dp | Absente sur EC-01 |
| Contenu | Le reste | Défile si nécessaire |
| Pied d'action | Variable | Fixe, voir ci-dessous |
| Barre de navigation Android | 48 dp | 3 boutons ; 16 dp en navigation par gestes |

Espace utile sans barre du haut ni pied, dans le cadre de référence : 800 − 24 − 48 = 728 dp.

#### Pied d'action

Le pied reste fixe en bas, au-dessus de la barre de navigation Android et du clavier.

| Élément | Valeur |
| --- | --- |
| Fond | `#FFFFFF` en clair, `#0B141A` en sombre |
| Trait du haut | Aucun au repos ; 1 dp `#E9EDEF` en clair, `#2A3942` en sombre si le contenu défile dessous |
| Marge du haut | 12 dp |
| Bouton principal | Pleine largeur moins les marges, 48 dp |
| Bouton texte éventuel | 4 dp sous le bouton principal, 48 dp |
| Marge du bas | 16 dp |

Hauteur du pied : 76 dp avec le seul bouton principal, 128 dp avec un bouton texte dessous.

#### Clavier ouvert

Le clavier numérique système occupe environ 270 dp, soit 458 dp restants dans le cadre de référence et environ 298 dp dans le cadre petit.

- Le contenu défile et le champ actif reste visible au-dessus du pied.
- Le pied ne garde que le bouton principal. Le bouton texte passe dans le contenu.
- Sur les écrans avec clavier, la progression et le titre restent en haut du contenu défilant : ils peuvent disparaître vers le haut sur le cadre petit, jamais le champ actif.

#### Rayons

| Valeur | Usage |
| --- | --- |
| 4 dp | Coin aplati d'une bulle, petite marque, segment de barre |
| 8 dp | Case de code, pastille de la barre du bas (coins intérieurs) |
| 12 dp | Bulle, carte de choix, carte |
| 16 dp | Réservé, sans usage en P1 |
| 28 dp | Coins supérieurs d'une feuille basse, dialogue |
| Pilule (9999) | Bouton principal, bouton secondaire, puce, onglet actif, avatar |

Une bulle a un seul coin aplati : en haut à gauche pour l'app et les revenus, en haut à droite pour les dépenses et les réponses de l'utilisateur. Elle n'a pas de queue.

#### Élévations

WhatsApp reste très plat : l'ombre n'apparaît que lorsqu'un élément flotte vraiment.

| Niveau | Ombre (x y flou couleur, en dp) | Élévation Android | Usage |
| --- | --- | --- | --- |
| `e0` | Aucune | 0 | Écran, ligne, barre du haut |
| `e1` | 0 1 0.5 `rgba(11,20,26,0.13)` | 1 | Bulle, carte en clair |
| `e2` | 0 2 5 `rgba(11,20,26,0.16)` | 3 | Bandeau Annuler, info-bulle |
| `e3` | 0 12 32 `rgba(11,20,26,0.20)` | 8 | Feuille basse, dialogue |

**En sombre :** les ombres se voient peu. L'élévation s'exprime par la surface : `#FFFFFF` en clair, `#0B141A` en sombre pour le fond, `#F0F2F5` en clair, `#111B21` en sombre pour un groupe, `#FFFFFF` en clair, `#202C33` en sombre pour ce qui flotte.

#### Séparateurs

- Trait de 1 dp en `#E9EDEF` en clair, `#2A3942` en sombre.
- Dans une liste avec avatar, il commence à l'aplomb du texte, pas au bord de l'écran.
- Aucun trait entre deux blocs déjà séparés par un espace de 24 dp.
- Pas de bordure autour d'un écran, d'une image ou d'une barre du haut.

#### Jeu d'icônes

**Material Symbols Rounded**, licence Apache 2.0. Ces icônes à bouts ronds et à contour sont proches de celles de WhatsApp, sans les copier.

| Réglage | Valeur |
| --- | --- |
| Graisse | 400 |
| Remplissage | 0 (contour) au repos ; 1 (plein) pour un onglet actif |
| Grade | 0 |
| Taille optique | 24 |
| Tailles | 24 dp par défaut ; 20 dp dans une ligne dense ou un message |
| Zone tactile | 48 dp, même si l'icône est plus petite |
| Couleur | `#54656F` en clair, `#AEBAC1` en sombre par défaut ; `#111B21` en clair, `#E9EDEF` en sombre dans la barre du haut ; couleur d'état si l'icône porte un état |

##### Icônes de cet écran

| Sens | Nom |
| --- | --- |
| Sélection | `check` |
| Rappel | `notifications` |

#### Règles

- Une icône seule a toujours un nom lu par TalkBack.
- Mixx et Flooz n'ont pas d'icône ni de logo : ce sont des marques tierces. Ils apparaissent en avatar à initiale.
- Pas d'émoji dans l'interface, y compris pour les drapeaux : l'indicatif s'écrit « +228 ».
- Pas d'icône de décoration à côté d'un titre.

#### Barres système

| Élément | Règle |
| --- | --- |
| Affichage | Bord à bord : le fond de l'écran passe sous les barres système |
| Barre d'état | Transparente ; icônes sombres en clair, claires en sombre |
| Barre de navigation | Transparente ou couleur du fond |
| Encoches | Le contenu respecte les zones sûres |
| Orientation | Portrait uniquement en P1 |

#### Thème

Le thème suit le téléphone, sans réglage en P1. Le passage de l'un à l'autre ne redémarre pas l'écran et ne perd aucune saisie.

### D. Composants de cet écran, et ceux qu'il peut ouvrir

#### Puce

| Attribut | Valeur |
| --- | --- |
| Hauteur | 32 dp, zone tactile 48 dp |
| Forme | Pilule |
| Marges intérieures | 12 dp ; 8 dp entre l'icône et le texte |
| Icône | 20 dp, facultative |
| Texte | Roboto 14/20 sp, Medium (500) |
| Disposition | Rangée qui passe à la ligne, écart de 8 dp |

| État | Fond | Contour | Texte |
| --- | --- | --- | --- |
| Repos | Transparent | 1 dp `#7A8A94` en clair, `#667781` en sombre | `#111B21` en clair, `#E9EDEF` en sombre |
| Appuyée | Ondulation | 1 dp `#7A8A94` en clair, `#667781` en sombre | `#111B21` en clair, `#E9EDEF` en sombre |
| Sélectionnée | `#D8FDD2` en clair, `#103529` en sombre | Aucun | `#0A3D2E` en clair, `#D9FDD3` en sombre, avec icône `check` |
| Désactivée | Transparent | 1 dp `#E9EDEF` en clair, `#2A3942` en sombre | `#667781` en clair, `#8696A0` en sombre |

#### Barre du haut

| Attribut | Valeur |
| --- | --- |
| Hauteur | 56 dp |
| Fond | `#FFFFFF` en clair, `#0B141A` en sombre, sans ombre ni trait au repos ; 1 dp `#E9EDEF` en clair, `#2A3942` en sombre dessous si le contenu défile |
| Icône retour | `arrow_back`, 24 dp, `#111B21` en clair, `#E9EDEF` en sombre, zone de 48 dp, à 4 dp du bord gauche |
| Titre | Roboto 22/28 sp, Medium (500), `#111B21` en clair, `#E9EDEF` en sombre, à gauche, une ligne avec coupure en fin |
| Actions | 2 icônes au plus, à droite |

Dans le parcours de premier lancement, la barre ne porte en général que le retour : la question fait office de titre.

#### Carte de choix

Pour une décision entre deux à quatre options exclusives.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 72 dp au moins, suit le texte |
| Largeur | Pleine largeur moins les marges |
| Rayon | 12 dp |
| Marges intérieures | 16 dp |
| Disposition | Rond de sélection de 20 dp à gauche, 12 dp, puis titre et description |
| Titre | Roboto 16/24 sp, Medium (500), `#111B21` en clair, `#E9EDEF` en sombre |
| Description | Roboto 14/20 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Écart entre cartes | 12 dp |

| État | Fond | Contour | Rond |
| --- | --- | --- | --- |
| Repos | `#FFFFFF` en clair, `#202C33` en sombre | 1 dp `#7A8A94` en clair, `#667781` en sombre | Cercle 2 dp `#7A8A94` en clair, `#667781` en sombre |
| Sélectionnée | `#D8FDD2` en clair, `#103529` en sombre | 2 dp `#008069` en clair, `#25D366` en sombre | Cercle 2 dp `#008069` en clair, `#25D366` en sombre et point de 10 dp `#008069` en clair, `#25D366` en sombre |

Sur fond sélectionné, le titre et la description passent en `#0A3D2E` en clair, `#D9FDD3` en sombre.

**Carte contenant une barre de pots :** le fond reste celui du repos et seuls le contour et le rond changent, pour que les six teintes des pots gardent toute leur lisibilité.

#### Sélecteur d'heure

Des puces pour les heures habituelles (19 h, 20 h, 21 h, 22 h), plus une puce « Autre heure » qui ouvre le sélecteur d'heure système, au format 24 heures.

#### Carte

Fond `#FFFFFF` en clair, `#202C33` en sombre, rayon 12 dp, marges intérieures de 16 dp, contour de 1 dp `#E9EDEF` en clair, `#2A3942` en sombre sans ombre. Une seule carte d'information à la fois sur un écran principal (UX).

#### Bandeau bas (Annuler ou information)

| Attribut | Valeur |
| --- | --- |
| Position | 8 dp au-dessus du pied d'action ou de la barre du bas, marges de 8 dp |
| Fond | `#111B21` en clair, `#E9EDEF` en sombre (inversé) |
| Texte | Roboto 14/20 sp, Regular (400), `#FFFFFF` en clair, `#111B21` en sombre |
| Action | « Annuler », Roboto 14/20 sp, Medium (500), `#25D366` en clair, `#00735E` en sombre |
| Hauteur | 48 dp au moins |
| Rayon | 8 dp |
| Ombre | `e2` |
| Durée | 10 s avec « Annuler » (20 s avec TalkBack) ; 4 s pour une simple information |
| TalkBack | Annoncé poliment, et l'action reste atteignable pendant toute la durée |

#### Bandeau d'état

Message fixe, en haut d'un contenu.

| Variante | Fond | Texte et icône |
| --- | --- | --- |
| Attention | `#FFF3D6` en clair, `#3A2C10` en sombre | `#8A4B00` en clair, `#FFD27A` en sombre, `warning` |
| Erreur | `#FBE9E7` en clair, `#3C1F1E` en sombre | `#B3261E` en clair, `#F2B8B5` en sombre, `error` |
| Information | `#E3F0FB` en clair, `#10283F` en sombre | `#0B5CAD` en clair, `#A8D4FF` en sombre, `info` |

Rayon 8 dp, marges de 12 dp, icône de 20 dp, texte Roboto 14/20 sp, Regular (400). Il ne contient pas plus de deux lignes.

#### Dialogue

Réservé à l'irréversible. Fond `#FFFFFF` en clair, `#202C33` en sombre, rayon 28 dp, marges de 24 dp, largeur de l'écran moins 48 dp, titre Roboto 18/24 sp, Medium (500), texte Roboto 14/20 sp, Regular (400) en `#54656F` en clair, `#AEBAC1` en sombre, boutons texte alignés à droite. Pas de bouton vert : l'action irréversible est en `#B3261E` en clair, `#F2B8B5` en sombre.

#### Retour Android

Le geste ou le bouton retour fait la même chose que `arrow_back`. Une feuille ou un dialogue ouverts se ferment d'abord. Sur le premier écran d'une pile, l'app se ferme.

### E. Rédaction

#### Ton

Simple, direct, comme un proche fiable qui sait compter. Français courant, tutoiement. Phrases courtes.

| On écrit | On n'écrit pas | Raison |
| --- | --- | --- |
| « Il manque 8 500 FCFA pour tes charges jusqu'au 28 » | « Attention, tu es à découvert ! » | Fait, sans alarme |
| « Tes charges prennent 65 % de ton revenu » | « Tu devrais réduire tes charges » | Aucun conseil (LEG-04) |
| « Repère, pas un conseil » | « Notre recommandation » | Cadre légal (LEG-03) |
| « Bilan fait » | « Bravo, super travail ! » | Aucune félicitation appuyée |
| « Ça se resserre un peu. » | « Tu dépenses trop ! » | L'état du statut reste un fait |
| « Rien de noté aujourd'hui, c'est normal » | « Tu as oublié de noter » | Aucun reproche |
| « Il faut du réseau pour cette étape » | « Erreur réseau 503 » | Aucun terme technique |

#### Vocabulaire

| Mot | Sens | Ne pas dire |
| --- | --- | --- |
| Reste à vivre | L'argent disponible jusqu'à la date de référence | Solde disponible, budget restant |
| Horizon | La courbe de l'argent à venir | Prévisionnel, projection, trésorerie |
| Recette | Une façon de répartir son argent | Style, méthode, template |
| Pot | Une part virtuelle de l'argent | Enveloppe, budget, catégorie |
| Poche | Où l'argent est réellement : espèces, Mixx, Flooz | Compte, portefeuille |
| Saisie | Une ligne notée | Transaction, écriture |
| Noter | Enregistrer une ligne | Saisir, ajouter une transaction |
| Bilan | Le comptage du soir | Rapprochement, clôture |
| Charge | Une dépense qui revient | Prélèvement, abonnement seul |
| Écart | La différence entre l'attendu et le compté | Erreur, anomalie, manquant |

Mixx et Flooz s'écrivent ainsi : pas de logo, pas de variante.

#### Formats

| Élément | Règle | Exemple |
| --- | --- | --- |
| Montant | FCFA, sans décimale, espace insécable | `12 500 FCFA` |
| Date dans une phrase du mois en cours | « le » + jour | `le 28` |
| Date dans un graphique | Jour, mois abrégé | `6 nov.` |
| Date d'un autre mois | Jour et mois en entier | `le 3 décembre` |
| Heure | Format 24 h | `20 h`, `20 h 30` |
| Numéro | Groupes de deux | `+228 90 12 34 56` |
| Pourcentage | Espace insécable | `70 %` |
| Recette | Espaces autour de la barre | `70 / 20 / 10` |

**Ponctuation :** espace insécable avant « ? », « ! », « : », « ; » et « % ». Guillemets français « » avec espaces insécables. Apostrophe typographique ’ à l'affichage.

#### Libellés de bouton

Un verbe et un résultat, à la première personne de ce que l'utilisateur obtient : « Voir mon horizon », « Recevoir mon code », « Adopter cette recette ».

| Échappatoire | Libellé |
| --- | --- |
| Reporter | « Plus tard » |
| Refuser une liste | « Je n'en ai pas » |
| Fermer une offre | « Fermer » |

Jamais « Non merci, je préfère perdre de l'argent » ni aucune formule culpabilisante.

#### Messages d'erreur

Trois temps : ce qui se passe, ce qui reste sûr, ce qu'on peut faire. Ils n'accusent jamais l'utilisateur.

> Il faut du réseau pour cette étape. Tes données restent sur ce téléphone.

#### Longueurs

- Titre d'écran : 60 caractères au plus.
- Aide : 90 caractères au plus.
- Bouton principal : 28 caractères au plus.
- Bulle : 140 caractères au plus.

#### Langues

Français seul en P1. Tous les textes restent dans un fichier de traduction, pour permettre d'autres langues si les entretiens le demandent. Les libellés doivent supporter 30 % de longueur en plus.

### F. Accessibilité

#### Contrastes

| Élément | Seuil |
| --- | --- |
| Texte | 4,5:1 |
| Grand texte (24 sp, ou 18,7 sp en gras, et plus) | 3:1 ; nous visons quand même 4,5:1 |
| Contours de contrôles, courbes, icônes utiles | 3:1 |
| Bouton désactivé | Exempté, mais toujours lisible |

#### Cibles tactiles

- 48 dp au moins, ce qui dépasse l'exigence de 44 de la bible (UX-05).
- 8 dp au moins entre deux cibles.
- Action principale dans la moitié basse de l'écran, atteignable à une main.

#### TalkBack

| Règle | Détail |
| --- | --- |
| Ordre de lecture | De haut en bas, puis le bouton principal |
| Titre | La question de chaque écran est déclarée comme titre |
| Montants | Lus en entier : « trois mille deux cents francs CFA » |
| Boutons | Le libellé visible, sans « bouton » dans le texte |
| Icônes seules | Un nom : « Retour », « Retirer Loyer » |
| Choix | État annoncé : « sélectionné », « non sélectionné » |
| Erreurs | Annoncées dès qu'elles apparaissent |
| Graphiques | Une phrase complète de résumé |
| Illustrations | Décoratives : ignorées. Porteuses de sens : une phrase |
| Bandeau Annuler | Annoncé, et la durée passe de 10 s à 20 s pour que le lecteur ait le temps de l'atteindre |

#### Texte agrandi

Jusqu'à 200 %, sans perte de contenu.

#### Couleur

Une information n'est jamais portée par la couleur seule : l'argent manquant a une icône et une phrase, une erreur a une icône et un texte, chaque pot a un nom.

#### Mouvement

Respect du réglage « animations réduites ». Aucune animation ne clignote.

#### Temps

Aucune limite, sauf le renvoi du code (informatif), le bandeau « Annuler » et l'avance du statut. La saisie reste modifiable après le bandeau. Le statut se met en pause d'un appui long et n'avance jamais seul avec TalkBack.

#### Lecture faible

Beaucoup d'utilisateurs lisent peu ou lentement le français : phrases courtes, un mot pour une idée, icônes accompagnées de texte, et chiffres mis en avant. Le test VAL-06 vérifiera la compréhension.

#### Confidentialité à l'écran

Les captures d'écran restent permises par défaut en P1 ; sur Android, l'activation du verrouillage (EC-51, EC-52) masque l'aperçu dans les applications récentes et bloque les captures d'écran. Les outils d'enregistrement d'écran tiers ne sont pas utilisés sur les écrans financiers.

### G. Mouvement et retours

#### Durées et courbes

| Jeton | Valeur | Usage |
| --- | --- | --- |
| `fast` | 100 ms | Retour tactile, changement de couleur |
| `standard` | 200 ms | Ouverture d'un champ, apparition d'une ligne, puce |
| `emphasized` | 300 ms | Changement d'écran, feuille basse, tracé de la courbe |
| `easeStandard` | `cubic-bezier(0.2, 0, 0, 1)` | Entrées et déplacements |
| `easeExit` | `cubic-bezier(0.3, 0, 1, 1)` | Sorties |

#### Transitions

| Cas | Animation |
| --- | --- |
| Écran suivant | L'écran entre par la droite de 24 dp en fondu, 300 ms ; le précédent s'estompe |
| Retour | Inverse, ou prévisualisation système du geste retour sur Android 14 et plus |
| Feuille basse | Monte depuis le bas, 300 ms ; voile en fondu |
| Bloc qui se déplie | Hauteur et fondu, 200 ms |
| Barre de progression | La largeur s'étend, 200 ms |
| Bandeau Annuler | Monte de 16 dp en fondu, 200 ms |

#### Retours tactiles

| Élément | Retour |
| --- | --- |
| Surface, ligne, carte | Ondulation Android, `rgba(17,27,33,0.10)` en clair, `rgba(233,237,239,0.12)` en sombre |
| Bouton principal | Fond `#1FAD56` (clair et sombre), avec ondulation |
| Action validée | Vibration légère d'environ 10 ms (`HapticFeedback` de confirmation), si le téléphone l'autorise |
| Saisie erronée | Message sous le champ, sans secousse |

#### Annuler

Le bandeau reste 10000 ms (10 secondes) au repos, et 20000 ms (20 secondes) lorsque TalkBack est actif. Il ne disparaît pas plus tôt, sauf si l'utilisateur le balaye ou touche « Annuler ». Sur un changement d'écran, il reste visible jusqu'à la fin du délai.

#### Interdits

- Pas de compteur qui défile sur un montant : le chiffre doit être lu tout de suite.
- Pas de confettis, de badges ni de série de jours.
- Pas de boucle, de pulsation ni d'attente artificielle.
- Pas d'illustration animée en P1, sauf la dérive très lente du paysage du statut : poids et démarrage de moins de 2 s obligent.

#### Animations réduites

Si le téléphone réduit ou coupe les animations, tous les mouvements deviennent un fondu de 100 ms ou un changement immédiat. La courbe s'affiche d'un coup.

### H. États et système

#### Chargement

| Durée | Affichage |
| --- | --- |
| Moins de 300 ms | Rien |
| Jusqu'à 3 s | Cercle dans le bouton, ou silhouettes dans la zone concernée |
| Plus de 3 s | Une phrase : « Ça prend un peu plus de temps. » |
| Plus de 15 s | Message d'échec, avec « Réessayer » |

Les calculs locaux, comme l'horizon, n'ont pas d'état de chargement : ils s'affichent aussitôt.

#### Hors ligne

- Tout fonctionne sans réseau, sauf la connexion et le paiement.
- Pas de bandeau rouge ni de message d'erreur : l'indicateur « Enregistré sur ce téléphone » suffit.
- Une étape qui exige le réseau le dit dans une phrase, et rassure sur les données : « Il faut du réseau pour cette étape. Tes données restent sur ce téléphone. »
- Dès que le réseau revient, la synchronisation repart sans intervention.

#### États vides

Une phrase factuelle et, si cela aide, une illustration et une seule action : « Tes saisies apparaîtront ici. » Jamais de reproche.

#### Erreurs

| Type | Affichage |
| --- | --- |
| Champ | Sous le champ, soulignement et message en `#B3261E` en clair, `#F2B8B5` en sombre |
| Serveur | Bandeau d'état avec « Réessayer », jamais de code technique |
| Limite atteinte | Phrase claire et délai |
| Plantage | Retour à l'écran stable ; rien n'est perdu, car chaque saisie est déjà enregistrée |

#### Permissions

Une permission n'est demandée qu'avec une phrase d'explication, après une valeur reçue, et au moment où elle sert.

| Permission | Moment | En cas de refus |
| --- | --- | --- |
| Notifications (Android 13 et plus) | EC-09, si un rappel est demandé | Le parcours continue ; le rappel apparaît sur l'accueil ; réglage dans EC-40 |
| SMS | Jamais : la lecture automatique du code n'a pas besoin de permission | — |
| Contacts, position, photos | Jamais en P1 | — |

#### Reprise

Chaque étape du premier lancement est enregistrée dès qu'elle est validée. À la réouverture, l'utilisateur revient exactement à l'étape en cours, avec ses valeurs.

#### Performance

| Mesure | Cible |
| --- | --- |
| Ouverture | Moins de 2 s (UX-05) |
| Réponse à un toucher | Moins de 100 ms |
| Fichier d'une illustration | 10 Ko au plus |
| Polices téléchargées | Aucune |
| Images bitmap | Aucune dans le parcours |
| Paysage du statut | Vecteur calculé en moins de 300 ms |
| Son du statut | 4 fichiers de 150 Ko au plus |

### I. Marque et illustrations

#### Marque

Le logo de BankVi n'existe pas encore.

| Élément | Règle provisoire |
| --- | --- |
| **Marque écrite** | « BankVi » en Roboto 18/24 sp, Medium (500), couleur `#00735E` en clair, `#25D366` en sombre |
| **Icône de l'app** | À créer. Fond `#FFFFFF` en clair, `#0B141A` en sombre ou vert foncé `#00735E`, forme propre à BankVi, par exemple un chiffre ou une courbe. **Pas de bulle, pas de téléphone, pas de cercle vert** |
| **Écran de lancement Android** | Fond `#FFFFFF` en clair, `#0B141A` en sombre, icône de l'app centrée, sans texte |

#### Style d'illustration

Le style reprend l'esprit des illustrations de la refonte de WhatsApp : arrondi, doux, à contour noir.

| Attribut | Valeur |
| --- | --- |
| Contour | `#111B21` en clair, `#E9EDEF` en sombre, 2,5 dp, bouts et angles ronds |
| Remplissage | Aplats sans dégradé ni texture |
| Couleurs | `#25D366` (clair et sombre), `#D9FDD3` en clair, `#005C4B` en sombre, `#FFBC38` (clair et sombre), `#FFFFFF` en clair, `#202C33` en sombre |
| Ombre | Aucune |
| Sujets | Argent réel du quotidien : billets, pièces, carnet, calendrier, courbe |
| Personnages | Aucun en P1, ce qui évite les caricatures et allège les fichiers |
| Format | Vecteur (VectorDrawable ou SVG), 10 Ko au plus, une version par thème |
| Texte | Une illustration décorative est ignorée par TalkBack. Si son texte porte un sens, une phrase le dit. Le texte du dessin est converti en tracés, sans police embarquée |

#### Usage

Une illustration apparaît seulement sur l'écran de bienvenue et les états vides. Jamais sur un formulaire ou une erreur.

### J. Fini quand

- [ ] Clair et sombre dessinés, avec des valeurs propres à chaque thème.
- [ ] Les 4 cadres vérifiés : 360 × 800, 360 × 640, 320 × 568 et 412 × 915 dp.
- [ ] Chaque ligne des sections États et Autres formats de la fiche est dessinée ou spécifiée.
- [ ] États appuyé et désactivé des composants présents.
- [ ] Texte à 130 % et à 200 % : rien de coupé, le bouton principal reste accessible.
- [ ] Ordre de lecture et noms pour TalkBack repris de la fiche.
- [ ] Hors ligne : écran utilisable, sans message d'erreur, sauf si la fiche dit le contraire.
- [ ] Aucun texte, geste ou élément absent de ce fichier.

- [ ] Un seul bouton vert.
- [ ] Un seul chiffre héros, ou aucun.
- [ ] Le rouge n'apparaît que pour une erreur de saisie ou une action destructive.
- [ ] Aucune cible tactile sous 48 dp.
- [ ] Clair et sombre décrits.
- [ ] Texte à 200 % : rien de coupé.
- [ ] Hors ligne : écran utilisable, sans message d'erreur.
- [ ] Aucun logo, motif ou libellé qui suggère un lien avec WhatsApp.

### K. Codes cités

#### Lignes de la bible

| Code | Fonctionnalité |
| --- | --- |
| LEG-03 | Mention « outil d'information, ni conseil financier ni conseil comptable » |
| LEG-04 | Faits, règle de l'utilisateur et conséquence ; pas de « tu devrais », ni de produit financier recommandé |
| MSG-01 | « Mon rituel » : rappel à l'heure choisie, hors plafond |
| ONB-03 | « Quand préfères-tu noter ? » |
| ONB-07 | Permission de notification après une valeur, avec une phrase d'explication |
| PRV-01 | Écran d'ouverture « Aujourd'hui » : ce que je peux dépenser, en 0 tap |
| SAI-08 | Deux façons de noter, combinables : au fil de la journée ou le soir ; la préférence ne change que le rappel et l'accueil |
| UX-05 | Ouverture en moins de 2 s, cibles de 44 pt, usage à une main |
| VAL-06 | Test de la phrase de recette auprès de 8 à 10 testeurs |

#### Autres écrans

| Code | Écran |
| --- | --- |
| EC-01 | Bienvenue |
| EC-02 | Exemple |
| EC-03 | Mon argent aujourd'hui |
| EC-04 | Mon revenu |
| EC-05 | Mes charges fixes |
| EC-06 | Premier horizon |
| EC-07 | La recette la plus proche |
| EC-08 | Aperçu d'une recette |
| EC-10 | Sauvegarde |
| EC-11 | Code |
| EC-12 | Accueil |
| EC-35 | Partager |
| EC-37 | Menu |
| EC-40 | Mon rituel et alertes |
| EC-50 | Mon statut |
| EC-51 | Déverrouillage |
| EC-52 | Sécurité |

#### Parcours

- PC-01 Premier lancement jusqu'au premier horizon · L1

<!-- annexe:fin -->
