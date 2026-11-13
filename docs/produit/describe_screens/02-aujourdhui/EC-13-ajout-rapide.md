# EC-13 Ajout rapide

| Fiche | |
| --- | --- |
| **Parcours** | PC-02, PC-03, PC-04, PC-06, PC-09 |
| **Lot** | L1 |
| **Bible** | SAI-01, SAI-02, SAI-03, SAI-07, SAI-14, HAB-01, HAB-02, HAB-03, HAB-04, HAB-08, UX-01, SAI-28 |
| **Avant** | EC-12, EC-20, EC-17 |
| **Après** | EC-12 ou EC-19 ; EC-14, EC-15, EC-16 |
| **Cadre** | 360 × 800 dp, portrait, marges de 16 dp, clavier ouvert, sans barre du bas |

<!-- fiche-autonome:debut -->
**Fiche autonome.** Ce fichier suffit pour finir cet écran, sans aucun autre document. Les sections numérotées décrivent l'écran ; l'annexe en bas donne la philosophie de BankVi, le design system, les composants utilisés, le contexte produit et les critères de fin. Pour cet écran, les sections numérotées priment sur l'annexe.
<!-- fiche-autonome:fin -->

## 1. Rôle

Noter en quelques secondes. Budget : **2 taps avec une suggestion**, ou le montant et 3 taps au plus sans suggestion. Seul le montant est obligatoire.

## 2. Ce qu'on voit

Un écran dépouillé, avec le clavier numérique déjà ouvert sur la moitié basse. En haut, le choix Dépense ou Revenu. Au centre, le montant en grands chiffres. Dessous, trois suggestions du moment, en puces : « Taxi · 500 ». Puis deux puces déduites, la catégorie et la poche, et une rangée de dates où « Aujourd'hui » est déjà choisi. Juste au-dessus du clavier, le bouton vert « Enregistrer ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ✕  Noter                           │ 56
│ ( ✓ Dépense  |    Revenu  )        │ 40
│ Montant                            │
│ 500|                          FCFA │ 72
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ (Taxi · 500) (Déjeuner · 1 000) (… │ 48 suggestions
│ (⚡ Transport ▾) (▣ Espèces ▾)     │ 48 déduites
│ (✓Aujourd'hui)(Hier)(Avant-hier)(… │ 48 dates
│ Ajouter une autre  ╭──────────────╮│
│                    │ Enregistrer  ││ 76
│                    ╰──────────────╯│
├────────────────────────────────────┤
│   1      2      3                  │
│   4      5      6                  │ ≈270 clavier
│   7      8      9                  │
│          0      ⌫                  │
└────────────────────────────────────┘
```

## 4. Structure et mesures

Dans le cadre de référence, 458 dp restent au-dessus du clavier.

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 0 |
| Choix Dépense ou Revenu | 40 dp | 12 dp |
| Champ montant | 72 dp | 8 dp |
| Suggestions, **zone de hauteur fixe** | 48 dp | 0 |
| Catégorie et poche | 48 dp | 0 |
| Dates, rangée qui défile | 48 dp | 4 dp |
| Description, sous le pied, atteinte en défilant | 56 dp | — |
| Pied | 76 dp | — |

La zone des suggestions garde sa hauteur même vide : rien ne bouge d'une saisie à l'autre.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Fermer | `close` | 24 dp, zone 48 dp | `#111B21` en clair, `#E9EDEF` en sombre |
| Titre | Noter | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Choix | Dépense, Revenu | 40 dp, pilule, Roboto 14/20 sp, Medium (500) | Choisi : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre. Repos : contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Libellé | Montant | Roboto 14/20 sp, Medium (500) | `#008069` en clair, `#25D366` en sombre si actif |
| Valeur | 500 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre ; placeholder « 0 » `#667781` en clair, `#8696A0` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Soulignement | — | Actif 2 dp | `#008069` en clair, `#25D366` en sombre |
| Suggestion | Taxi · 500 | Puce de 32 dp, Roboto 14/20 sp, Medium (500) | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Suggestion présélectionnée | Taxi · 500 | Icône `check` | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Puce catégorie | Transport, icône selon la catégorie | Puce, chevron bas | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Puce poche | Espèces, icône `payments` | Puce, chevron bas | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Dates | Aujourd'hui, Hier, Avant-hier, Autre date, Plusieurs dates | Puces, écart 8 dp | Choisie : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Description | Libellé : Description (facultatif) | 56 dp | `#111B21` en clair, `#E9EDEF` en sombre ; libellé `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton texte | Ajouter une autre | Roboto 14/20 sp, Medium (500), à gauche du bouton principal | `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Enregistrer | Roboto 16/24 sp, Medium (500), prend le reste de la largeur | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| La saisie ressemble à une ligne prévue, même catégorie, à 7 jours près | Après « Noter », une bulle : « C'est ton loyer du 5 ? » Oui : la saisie confirme cette ligne. Non : elle reste une saisie à part. Sans réponse, la saisie reste à part et l'accueil continue de demander |
| Arrivée | Dépense, Aujourd'hui, clavier ouvert, bouton **désactivé** (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre), sauf si une suggestion est présélectionnée |
| Mode Revenu | Suggestions et catégories de revenus. Après l'enregistrement, la bulle arrive à gauche |
| Confiance de moins de 0,5 | Aucune suggestion affichée |
| Confiance de 0,5 à 0,7 | Proposée, non présélectionnée |
| Confiance de 0,7 à 0,95 | Présélectionnée, un tap pour valider |
| Confiance de 0,95 et plus | Catégorie seule déduite ; **jamais un montant** |
| Sans habitudes | Dans la zone fixe : « Tes habitudes apparaîtront ici. », Roboto 12/16 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Date future | Bandeau d'information au-dessus du pied : « Prévu, pas encore du réel » ; bouton « Enregistrer comme prévu » |
| Date antérieure au dernier comptage | Bandeau : « Ton solde compté ne change pas. Cette saisie détaille l'écart de cette période. » |
| Mode « Ajouter une autre » | Après l'enregistrement, le formulaire se rouvre avec la même date. Au-dessus du pied : « 3 dépenses notées · 2 500 FCFA ». `close` devient « Terminer » |
| Libellé sensible | Au premier choix, EC-48 s'ouvre |
| Hors ligne | Identique : l'enregistrement est immédiat |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une suggestion | Remplit le montant, la catégorie et la description |
| Appui long sur une suggestion | EC-47 Pourquoi cette suggestion |
| Toucher la catégorie | EC-14 |
| Toucher la poche | Feuille avec les poches actives |
| Hier, Avant-hier | Sélection en un tap |
| Autre date | EC-15 |
| Plusieurs dates | EC-16 ; à partir du L2, absent avant |
| « Enregistrer » | Enregistre ; retour à EC-12 avec le chiffre recalculé et « Annuler » pendant 10 s |
| « Ajouter une autre » | Enregistre et reste en mode saisie |
| « Terminer » | Retour à EC-12, ou à EC-19 si l'utilisateur vient du bilan |
| `close` ou retour | Revient en arrière ; le montant reste en brouillon jusqu'à la fermeture de l'app |

## 8. Données

| Donnée | Valeur par défaut |
| --- | --- |
| Montant | Vide, sauf suggestion ; 8 chiffres au plus, zéro refusé |
| Date | Aujourd'hui |
| Catégorie | Déduite du créneau et de l'habitude |
| Poche | Dernière utilisée |
| Description | Vide, avec autocomplétion |

**Exemple, sans suggestion.** Camille tape 500, garde Transport et Espèces, touche « Enregistrer ». **Avec suggestion.** Elle touche « Taxi · 500 », puis « Enregistrer » : 2 taps.

Un prévu n'entre jamais dans le réel. Les habitudes restent sur le téléphone.

## 9. Accessibilité

Focus initial sur le montant : « Montant, en francs CFA ». Suggestion : « Taxi, 500 francs CFA, suggestion ». Le choix Dépense ou Revenu annonce son état. L'enregistrement est annoncé : « Dépense notée. Tu peux dépenser 3 200 francs CFA aujourd'hui. »

## 10. Mouvement

Ouverture : l'écran monte en 300 ms, le clavier est déjà ouvert à la fin. Vibration légère à l'enregistrement. Les bandeaux apparaissent en 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | 298 dp utiles : la barre du haut se réduit à 48 dp ; catégorie et dates défilent ; montant et bouton restent visibles |
| 320 × 568 dp | Valeur à 30 sp ; le bouton texte passe sous le bouton principal, dans le contenu |
| Texte à 200 % | Le contenu défile ; le pied garde le bouton principal |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`entry_started`, `entry_saved`, avec le nombre de taps et la durée ; `suggestion_shown`, `suggestion_accepted`. **Aucun montant ni libellé.**

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

1. **Le familier sans mimétisme.** Un geste connu vaut mieux qu'une trouvaille, mais BankVi affirme son identité propre (Terracotta & Lagune, capsules de flux, médaillon du jour, boutons adoucis à 16 dp) et se distingue par son chiffre du jour.
2. **Le terracotta veut dire « agir ».** Il n'est ni un décor ni un fond. Sur un écran ordinaire, il occupe moins de 10 % de la surface.
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
3. Vérifier la règle d'or : **un seul bouton principal terracotta par écran**, sauf si la fiche dit qu'il n'y en a aucun.
4. Reprendre les textes de la fiche mot pour mot, et appliquer la rédaction ci-dessous à tout texte d'adaptation.

### B. Cet écran dans le produit

#### Ce que dit le parcours

- **Contenu :** choix Dépense ou Revenu ; clavier ouvert ; trois suggestions dans une zone fixe ; catégorie et poche déduites ; dates : **Aujourd'hui** (sélectionné), Hier, Avant-hier, Autre date, Plusieurs dates.
- **Action principale :** « Enregistrer ».
- **Autres :** « Ajouter une autre » ; une description est facultative et s'autocomplète.
- **Règles :** seul le montant est obligatoire. Les suggestions suivent les seuils de la bible, plus bas. Un montant suggéré n'est jamais validé tout seul.
- **Bible :** SAI-01, SAI-02, SAI-03, SAI-07, SAI-14, HAB-01, HAB-02, HAB-03, HAB-04, HAB-08, UX-01, SAI-28.

#### PC-02 Noter en temps réel · L1

*Camille paie un taxi à 500 FCFA.*

1. **EC-12** Elle touche « Noter une dépense ».
2. **EC-13** Le clavier est ouvert, et trois suggestions du créneau s'affichent.
3. **Avec suggestion (2 taps) :** elle touche « Taxi · 500 », puis « Enregistrer ».
4. **Sans suggestion (montant + 3 taps au plus) :** elle tape le montant, touche la catégorie si celle qui est déduite ne convient pas, puis « Enregistrer ».
5. Retour sur **EC-12**, chiffre du jour recalculé, bandeau « Annuler ».

#### PC-03 Noter à une autre date · L1

1. **EC-13** « Aujourd'hui » est présélectionné.
2. **Hier ou Avant-hier :** un tap sur le raccourci.
3. **Autre date :** **EC-15**, calendrier.
4. **Date future :** l'écran annonce « Prévu, pas encore du réel », et la ligne s'enregistre comme prévue.
5. **Date antérieure au dernier comptage :** le solde compté ne change pas, et la saisie vient détailler l'écart de la période.

#### PC-04 Même dépense sur plusieurs dates · L2

*Karim déjeune à 1 000 FCFA, du lundi au vendredi, et note tout d'un coup.*

1. **EC-13** Il tape 1 000 et choisit « Déjeuner ».
2. Il touche « Plusieurs dates » : **EC-16**.
3. Il sélectionne les 5 jours, à la main ou en période.
4. L'écran affiche « 5 dépenses de 1 000 FCFA, soit 5 000 FCFA ». Il touche « Enregistrer les 5 dépenses ».
5. **EC-17** montre une ligne par date, reliée au groupe.

#### PC-06 Plusieurs saisies le soir · L1

1. **EC-13** en mode « Ajouter une autre » : après « Enregistrer », le formulaire se rouvre avec la même date.
2. Le compteur affiche « 3 dépenses notées · 2 500 FCFA ».
3. « Terminer » ramène à **EC-12**, ou à **EC-19** si l'utilisateur est venu du bilan.

#### PC-09 Recevoir un revenu · L1

1. **EC-13** Il note un revenu, ou un revenu prévu arrive à sa date et l'app demande de le confirmer.
2. La recette répartit automatiquement le montant dans les pots. Avec un revenu variable, elle agit à partir du 1er du mois suivant son adoption.
3. **EC-12** affiche « 120 000 FCFA répartis », avec « Annuler » et « Voir mes pots » : **EC-27**.

#### Décisions déjà prises pour cet écran

| Point | Décision |
| --- | --- |
| Quitter une saisie en cours | **Validé :** Le montant reste en brouillon jusqu'à la fermeture de l'app, sans question |
| Revenus proposés | **Validé :** Le mode Revenu montre ses propres catégories et suggestions |
| Une saisie qui ressemble à une ligne prévue | **Validé :** « C'est ton loyer du 5 ? », en une touche, à 7 jours près |

```text
                ┌─ anneau ───────► EC-50 Mon statut
                ├─ Noter ────────► EC-13 Ajout rapide ─┬► EC-14 Catégorie
EC-12 Accueil ──┤                                      ├► EC-15 Autre date
                │                                      └► EC-16 Plusieurs dates
                ├─ Tout voir ────► EC-17 Historique ───► EC-18 Détail d'une saisie
                ├─ Mon bilan ────► EC-19 Compter ─► EC-20 Écart ─► EC-21 Résultat
                └─ un solde ─────► EC-22 Transfert entre poches
```

#### Chiffres d'exemple

Date de référence : **vendredi 6 novembre 2026**.

| Donnée | Camille, au fil de la journée | Karim, le soir |
| --- | --- | --- |
| Soldes au matin | Espèces 32 000, Mixx 58 000 | Espèces 45 000, Mixx 20 000 |
| Chiffre du jour | 3 200 FCFA jusqu'au 28 | 4 700 FCFA jusqu'au 30 |
| Noté aujourd'hui | Taxi 500, Pain 300 ; revenu : Prêt rendu +2 000 | Déjeuner 1 000 |
| Bilan du soir | — | Compté 41 500 en espèces : écart de 2 500 FCFA |
| Répartition | — | Transport 1 500, Crédit téléphone 500, Non détaillé 500 |
| Chiffre de demain | — | 4 600 FCFA |

**Calcul de Karim.** Soldes du soir : 41 500 + 20 000 = 61 500. Revenu encore attendu demain : min(90 000 × 24 ÷ 30 ; 75 000) = 72 000. Charges : 21 000. Reste : 112 500 pour 24 jours, soit 4 687, arrondi à 4 600.

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

#### Seuils de la bible : Seuils de confiance des suggestions

| Confiance | Comportement |
| --- | --- |
| Moins de 0,5 | Rien n'est affiché |
| De 0,5 à 0,7 | Proposée, non présélectionnée |
| De 0,7 à 0,95 | Présélectionnée, un tap pour valider |
| 0,95 et plus | Automatique, seulement si réversible et à faible enjeu ; jamais pour un montant |

### C. Fondations du design system

#### Palette

| Jeton | Clair | Sombre | Rôle |
| --- | --- | --- | --- |
| `bg.canvas` | `#FAF7F2` | `#0D1520` | Fond de tous les écrans (sable ivoire / bleu nuit atlantique) |
| `bg.subtle` | `#F1ECE4` | `#142030` | Zones groupées, champ de recherche |
| `bg.elevated` | `#FFFFFF` | `#1B2A3E` | Cartes, feuilles basses, dialogues |
| `bg.bubbleApp` | `#F1ECE4` | `#1B2A3E` | Capsule : l'app explique quelque chose |
| `bg.bubbleUser` | `#FCE8DF` | `#4A2218` | Capsule sortante : dépense notée, réponse de l'utilisateur |
| `bg.bubbleIncome` | `#E4F2F7` | `#133447` | Capsule entrante : revenu noté |
| `bg.selected` | `#F9DFD3` | `#4D2318` | Puce, carte ou onglet sélectionnés |
| `bg.scrim` | `rgba(13,21,32,0.45)` | `rgba(0,0,0,0.65)` | Voile derrière une feuille ou un dialogue |
| `text.primary` | `#1C1613` | `#F5F0EB` | Titres, montants, texte courant |
| `text.secondary` | `#5C514B` | `#B8AFA8` | Aides, descriptions |
| `text.tertiary` | `#6B5E57` | `#948B84` | Axes, placeholders. En clair : sur fond sable ou blanc uniquement |
| `text.timeOnExpense` | `#52362C` | `#FAD8C8` | Heure dans une capsule de dépense |
| `text.disabled` | `#6B5E57` | `#948B84` | Libellé d'un bouton désactivé |
| `text.link` | `#A6331A` | `#FF8B6B` | Boutons texte, liens, marque écrite |
| `text.onAction` | `#FFFFFF` | `#1C120E` | Texte et icône sur le terracotta d'action |
| `text.onSelected` | `#5E1D0E` | `#FDE5DA` | Texte sur fond sélectionné |
| `action.primary` | `#B83B20` | `#F07B5A` | Bouton principal (terracotta de Lomé / terracotta solaire) |
| `action.primaryPressed` | `#962E17` | `#D96443` | Bouton principal, état appuyé |
| `action.disabled` | `#E6DFD5` | `#1B2A3E` | Fond d'un bouton désactivé |
| `action.ripple` | `rgba(28,22,19,0.10)` | `rgba(245,240,235,0.12)` | Retour tactile sur une surface |
| `border.subtle` | `#E3DCD2` | `#26384F` | Séparateurs, contour de carte |
| `border.control` | `#7A6D65` | `#728399` | Soulignement de champ, contour de puce et de radio |
| `border.focus` | `#B83B20` | `#FF8B6B` | Champ actif, carte sélectionnée |
| `status.warnFg` | `#8A4B00` | `#FFD27A` | Argent manquant, attention |
| `status.warnBg` | `#FFF3D6` | `#3A2C10` | Fond de l'attention |
| `status.errorFg` | `#B3261E` | `#F2B8B5` | Erreur de saisie, action destructive |
| `status.errorBg` | `#FBE9E7` | `#3C1F1E` | Fond d'une erreur |
| `status.infoFg` | `#0B5CAD` | `#A8D4FF` | Information neutre, marque « Exemple » |
| `status.infoBg` | `#E3F0FB` | `#10283F` | Fond de l'information |
| `status.successFg` | `#0D6E52` | `#47D1A3` | Confirmation, en texte et icône |
| `chart.line` | `#0E6BA8` | `#4DA8DA` | Courbe de l'horizon (bleu lagune) |
| `chart.area` | `rgba(14,107,168,0.12)` | `rgba(77,168,218,0.14)` | Lavis sous la courbe |
| `chart.grid` | `#E3DCD2` | `#26384F` | Lignes de repère |
| `chart.zero` | `#7A6D65` | `#728399` | Ligne du zéro |
| `chart.lack` | `rgba(138,75,0,0.12)` | `rgba(255,210,122,0.14)` | Lavis de la zone sous zéro |
| `pot.1` | `#0E6BA8` | `#3898EC` | Premier pot d'une recette (Lagune) |
| `pot.2` | `#B85A00` | `#E0862B` | Deuxième pot (Ocre) |
| `pot.3` | `#6B52E0` | `#8B75FF` | Troisième pot (Indigo) |
| `pot.4` | `#0D7A5F` | `#22B08C` | Quatrième pot (Émeraude) |
| `pot.5` | `#C84374` | `#E66796` | Cinquième pot (Hibiscus) |
| `pot.6` | `#826E18` | `#A89432` | Sixième pot (Or bronze) |
| `illustration.outline` | `#1C1613` | `#F5F0EB` | Contour de toutes les illustrations |
| `illustration.green` | `#B83B20` | `#F07B5A` | Billet, éléments d'action terracotta |
| `illustration.mint` | `#FCE8DF` | `#133447` | Grande surface d'une illustration |
| `illustration.amber` | `#FFBC38` | `#FFBC38` | Pièces de monnaie |
| `illustration.paper` | `#FFFFFF` | `#1B2A3E` | Surface neutre d'une illustration |

#### Règles d'usage

| Règle | Détail |
| --- | --- |
| **Terracotta d'action** | `#B83B20` en clair (texte `#FFFFFF`), `#F07B5A` en sombre (texte `#1C120E`) : bouton principal et barre d'accent des dépenses seulement. |
| **Lien** | `#A6331A` en clair, `#FF8B6B` en sombre pour les boutons texte et les liens. |
| **Argent qui manque** | `#8A4B00` en clair, `#FFD27A` en sombre sur `#FFF3D6` en clair, `#3A2C10` en sombre, toujours avec une icône et une phrase. Jamais de rouge : un manque est un fait, pas une faute. |
| **Rouge** | `#B3261E` en clair, `#F2B8B5` en sombre seulement pour une erreur de saisie et une action destructive. |
| **Dépense et revenu** | Même couleur de texte (`#1C1613` en clair, `#F5F0EB` en sombre). Capsule sortante argile (`#FCE8DF` / `#4A2218`) à droite avec bordure terracotta et signe « − » (U+2212) ; capsule entrante lagune (`#E4F2F7` / `#133447`) à gauche avec bordure bleu lagune et signe « + ». |
| **Couleur seule** | Jamais : une couleur d'état s'accompagne toujours d'une icône et de texte. |
| **Texte tertiaire en clair** | Sur `#FAF7F2` en clair, `#0D1520` en sombre uniquement. Sur `#F1ECE4`, utiliser `#5C514B` en clair, `#B8AFA8` en sombre. |
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
| Fond | `#FAF7F2` en clair, `#0D1520` en sombre |
| Trait du haut | Aucun au repos ; 1 dp `#E3DCD2` en clair, `#26384F` en sombre si le contenu défile dessous |
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
| 4 dp | Petite marque, segment de barre |
| 8 dp | Case de code, pastille de la barre du bas (coins intérieurs) |
| 14 dp | Carte de choix, carte d'information, bloc repère |
| 16 dp | Bouton principal, bouton à contour, capsule de flux et médaillon du statut |
| 28 dp | Coins supérieurs d'une feuille basse, dialogue |
| Pilule (9999) | Puce, onglet actif, avatar |

Les capsules de flux ont quatre coins adoucis à 16 dp (sans queue ni coin aplati de messagerie) et une barre latérale de 3 dp qui indique le sens du flux.

#### Élévations

BankVi reste sobre et léger : l'ombre n'apparaît que lorsqu'un élément flotte vraiment.

| Niveau | Ombre (x y flou couleur, en dp) | Élévation Android | Usage |
| --- | --- | --- | --- |
| `e0` | Aucune | 0 | Écran, ligne, barre du haut |
| `e1` | 0 1 0.5 `rgba(28,22,19,0.13)` | 1 | Capsule, carte en clair |
| `e2` | 0 2 5 `rgba(28,22,19,0.16)` | 3 | Bandeau Annuler, info-bulle |
| `e3` | 0 12 32 `rgba(28,22,19,0.20)` | 8 | Feuille basse, dialogue |

**En sombre :** les ombres se voient peu. L'élévation s'exprime par la surface : `#FAF7F2` en clair, `#0D1520` en sombre pour le fond, `#F1ECE4` en clair, `#142030` en sombre pour un groupe, `#FFFFFF` en clair, `#1B2A3E` en sombre pour ce qui flotte.

#### Séparateurs

- Trait de 1 dp en `#E3DCD2` en clair, `#26384F` en sombre.
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
| Couleur | `#5C514B` en clair, `#B8AFA8` en sombre par défaut ; `#1C1613` en clair, `#F5F0EB` en sombre dans la barre du haut ; couleur d'état si l'icône porte un état |

##### Icônes de cet écran

| Sens | Nom |
| --- | --- |
| Fermer | `close` |
| Retirer une ligne | `close` |
| Espèces | `payments` |
| Sélection | `check` |

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

#### Bouton principal

| Attribut | Valeur |
| --- | --- |
| Hauteur | 48 dp |
| Largeur | Pleine largeur moins les marges |
| Forme | Rectangle adouci (rayon `16 dp`) |
| Libellé | Roboto 16/24 sp, Medium (500), centré, une ligne ; deux lignes si le texte est agrandi, la hauteur suit |
| Texte | Verbe et résultat. Jamais « Suivant » ni « OK » |
| Position | Dans le pied d'action |

| État | Fond | Texte | Remarque |
| --- | --- | --- | --- |
| Repos | `#B83B20` en clair, `#F07B5A` en sombre | `#FFFFFF` en clair, `#1C120E` en sombre | Terracotta de Lomé / terracotta solaire |
| Appuyé | `#962E17` en clair, `#D96443` en sombre | `#FFFFFF` en clair, `#1C120E` en sombre | Ondulation |
| Désactivé | `#E6DFD5` en clair, `#1B2A3E` en sombre | `#6B5E57` en clair, `#948B84` en sombre | Un champ manquant ; une aide dit lequel. Non annoncé comme action par TalkBack, mais lu avec « désactivé » |
| Chargement | `#B83B20` en clair, `#F07B5A` en sombre | Cercle de progression de 20 dp, trait 2 dp, `#FFFFFF` en clair, `#1C120E` en sombre, à gauche du libellé | Bouton inactif, libellé modifié (« Envoi… »), après 300 ms d'attente seulement |

#### Bouton texte

| Attribut | Valeur |
| --- | --- |
| Texte | Roboto 14/20 sp, Medium (500), `#A6331A` en clair, `#FF8B6B` en sombre |
| Zone tactile | Hauteur 48 dp, largeur du texte plus 12 dp de chaque côté |
| Pleine largeur | Centré sous le bouton principal |
| Destructif | `#B3261E` en clair, `#F2B8B5` en sombre |

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
| Repos | Transparent | 1 dp `#7A6D65` en clair, `#728399` en sombre | `#1C1613` en clair, `#F5F0EB` en sombre |
| Appuyée | Ondulation | 1 dp `#7A6D65` en clair, `#728399` en sombre | `#1C1613` en clair, `#F5F0EB` en sombre |
| Sélectionnée | `#F9DFD3` en clair, `#4D2318` en sombre | Aucun | `#5E1D0E` en clair, `#FDE5DA` en sombre, avec icône `check` |
| Désactivée | Transparent | 1 dp `#E3DCD2` en clair, `#26384F` en sombre | `#6B5E57` en clair, `#948B84` en sombre |

#### Barre du haut

| Attribut | Valeur |
| --- | --- |
| Hauteur | 56 dp |
| Fond | `#FAF7F2` en clair, `#0D1520` en sombre, sans ombre ni trait au repos ; 1 dp `#E3DCD2` en clair, `#26384F` en sombre dessous si le contenu défile |
| Icône retour | `arrow_back`, 24 dp, `#1C1613` en clair, `#F5F0EB` en sombre, zone de 48 dp, à 4 dp du bord gauche |
| Titre | Roboto 22/28 sp, Medium (500), `#1C1613` en clair, `#F5F0EB` en sombre, à gauche, une ligne avec coupure en fin |
| Actions | 2 icônes au plus, à droite |

Dans le parcours de premier lancement, la barre ne porte en général que le retour : la question fait office de titre.

#### Champ montant

Le champ le plus important de l'app.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 72 dp avec son libellé |
| Libellé | Au-dessus, Roboto 14/20 sp, Medium (500), `#5C514B` en clair, `#B8AFA8` en sombre ; `#B83B20` en clair, `#FF8B6B` en sombre si le champ est actif |
| Valeur | Roboto 36/44 sp, Medium (500), chiffres tabulaires, `#1C1613` en clair, `#F5F0EB` en sombre |
| Placeholder | « 0 », même style, `#6B5E57` en clair, `#948B84` en sombre |
| Unité | « FCFA », Roboto 18/24 sp, Medium (500), `#5C514B` en clair, `#B8AFA8` en sombre, fixe à droite du champ |
| Soulignement | Repos : 1 dp `#7A6D65` en clair, `#728399` en sombre. Actif : 2 dp `#B83B20` en clair, `#FF8B6B` en sombre. Erreur : 2 dp `#B3261E` en clair, `#F2B8B5` en sombre |
| Clavier | Numérique système (`number-pad`) |
| Mise en forme | Espaces des milliers ajoutés en direct : `120 000`. Zéros de tête retirés. Lettres et signes refusés sans message |
| Maximum | 8 chiffres : `99 999 999` ; au-delà, la frappe est ignorée |
| Curseur | Toujours à la fin du nombre |

#### Champ compact

Pour les montants secondaires, le jour du mois ou un nom court.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 56 dp, zone tactile comprise |
| Libellé | Au-dessus, Roboto 14/20 sp, Medium (500), `#5C514B` en clair, `#B8AFA8` en sombre |
| Valeur | Roboto 16/24 sp, Regular (400), `#1C1613` en clair, `#F5F0EB` en sombre |
| Soulignement | Identique au champ montant |

**Message sous un champ :** Roboto 12/16 sp, Regular (400), à 4 dp du soulignement. Aide en `#5C514B` en clair, `#B8AFA8` en sombre. Erreur en `#B3261E` en clair, `#F2B8B5` en sombre, avec icône `error` de 16 dp. Il apparaît à la validation ou en quittant le champ, jamais à la première frappe.

#### Choix à deux segments

Pour deux modes exclusifs d'un même écran : Dépense ou Revenu, Jours ou Période.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 40 dp, zone tactile 48 dp |
| Forme | Pilule, contour de 1 dp `#7A6D65` en clair, `#728399` en sombre |
| Segment choisi | Fond `#F9DFD3` en clair, `#4D2318` en sombre, texte `#5E1D0E` en clair, `#FDE5DA` en sombre, icône `check` de 18 dp |
| Segment au repos | Transparent, texte `#1C1613` en clair, `#F5F0EB` en sombre |
| Texte | Roboto 14/20 sp, Medium (500) |

#### Ligne de liste

| Attribut | Une ligne de texte | Deux lignes de texte |
| --- | --- | --- |
| Hauteur | 56 dp | 72 dp |
| Avatar | Facultatif | 40 dp, à 16 dp du texte |
| Titre | Roboto 16/24 sp, Medium (500), `#1C1613` en clair, `#F5F0EB` en sombre | Identique |
| Sous-titre | — | Roboto 14/20 sp, Regular (400), `#5C514B` en clair, `#B8AFA8` en sombre |
| Valeur à droite | Roboto 16/24 sp, Regular (400), chiffres tabulaires | Identique, sur la ligne du titre |
| Séparateur | 1 dp `#E3DCD2` en clair, `#26384F` en sombre, à l'aplomb du texte | Identique |
| Appui | Ondulation sur toute la ligne | Identique |

#### Capsule de flux (ou capsule explicative)

| Attribut | Capsule de l'app | Capsule de l'utilisateur |
| --- | --- | --- |
| Rôle | L'app explique un fait | Rappel de ce que l'utilisateur a noté |
| Fond | `#F1ECE4` en clair, `#1B2A3E` en sombre | `#FCE8DF` en clair, `#4A2218` en sombre |
| Texte | Roboto 14/20 sp, Regular (400), `#1C1613` en clair, `#F5F0EB` en sombre | Roboto 14/20 sp, Regular (400), `#1C1613` en clair, `#F5F0EB` en sombre |
| Coins et bordure | 16 dp sur les 4 coins, contour 1 dp `#E3DCD2` / `#26384F` | 16 dp sur les 4 coins (aucun coin aplati ni queue) |
| Alignement | À gauche | À droite |
| Marges intérieures | 12 dp horizontal, 8 dp vertical | Identique |
| Largeur | Pleine largeur au plus | 80 % au plus |
| Ombre | `e1` en clair, aucune en sombre | Identique |

Une capsule explique ou rapporte un fait. Elle ne contient aucun bouton. Les réponses possibles, comme la répartition du bilan, sont des puces placées sous la capsule.

##### Saisies en flux financier (SAI-27)

L'argent qui sort part vers la droite avec une barre terracotta ; l'argent qui entre arrive par la gauche avec une barre lagune.

| Saisie | Position | Fond | Barre latérale (3 dp) | Exemple |
| --- | --- | --- | --- | --- |
| **Dépense** | À droite | `#FCE8DF` en clair, `#4A2218` en sombre | À droite, `#B83B20` / `#F07B5A` | Taxi · −500 FCFA · 8 h 12 |
| **Revenu** | À gauche | `#E4F2F7` en clair, `#133447` en sombre | À gauche, `#0E6BA8` / `#4DA8DA` | Salaire · +120 000 FCFA · 8 h 00 |
| **Comptage, transfert, « Non détaillé »** | Au centre | Repère en pilule, 1 dp `#E3DCD2` en clair, `#26384F` en sombre | Aucune | Comptage : 32 000 FCFA en espèces |

Le sens ne repose jamais sur la seule position ou couleur : une dépense porte toujours « − » (U+2212), un revenu porte toujours « + », et TalkBack lit « Dépense : » ou « Revenu : » avant le libellé. Largeur de 80 % au plus. Heure en Roboto 12/16 sp, Regular (400), `#52362C` sur une dépense en clair, `#FAD8C8` en sombre ; `#5C514B` sur un revenu en clair, `#B8AFA8` en sombre. Sans queue ni coche de lecture. Un toucher ouvre le détail, un appui long change la catégorie.

**En P2 (SAI-20) :** un champ façon message s'ajoutera en bas : « salaire 200000 », « jus 100 », « déplacement 1500 ». La bulle prend aussitôt le bon côté, avec « Annuler ».

#### Feuille basse

| Attribut | Valeur |
| --- | --- |
| Fond | `#FFFFFF` en clair, `#172436` en sombre |
| Coins supérieurs | 28 dp |
| Poignée | 32 × 4 dp, en pilule, `#7A6D65` en clair, `#728399` en sombre, centrée, à 8 dp du haut |
| Titre | Roboto 18/24 sp, Medium (500), `#1C1613` en clair, `#F5F0EB` en sombre, à 24 dp du haut |
| Marges | 24 dp |
| Ombre | `e3` |
| Voile | `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre |
| Hauteur | Selon le contenu, 90 % de l'écran au plus |
| Fermeture | Glisser vers le bas, toucher le voile, retour Android |
| Bouton | Le bouton principal de la feuille est le seul bouton terracotta visible : la feuille recouvre le pied de l'écran |

Si la feuille contient une saisie en cours, un glissement accidentel ne ferme pas : seuls le voile et le retour ferment, sans perdre la saisie tant que l'écran reste ouvert.

#### Bandeau bas (Annuler ou information)

| Attribut | Valeur |
| --- | --- |
| Position | 8 dp au-dessus du pied d'action ou de la barre du bas, marges de 8 dp |
| Fond | `#1C1613` en clair, `#F5F0EB` en sombre (inversé) |
| Texte | Roboto 14/20 sp, Regular (400), `#FAF7F2` en clair, `#1C1613` en sombre |
| Action | « Annuler », Roboto 14/20 sp, Medium (500), `#FF8B6B` en clair, `#A6331A` en sombre |
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

#### Formats de montant

| Cas | Exemple |
| --- | --- |
| Standard | `12 500 FCFA` |
| Dans une colonne | `12 500` sous un titre « FCFA » |
| Négatif, dans une info-bulle ou une ligne | `−8 000 FCFA`, avec le signe moins U+2212 |
| Revenu dans une ligne | `+120 000 FCFA` |
| Axe | `50 000` |

Aucune décimale, aucune abréviation « k » ni « M » dans l'app, car elles sont moins lisibles pour tous.

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
| **Marque écrite** | « BankVi » en Roboto 18/24 sp, Medium (500), couleur `#A6331A` en clair, `#FF8B6B` en sombre |
| **Icône de l'app** | À créer. Fond `#FAF7F2` en clair, `#0D1520` en sombre ou terracotta `#B83B20`, forme propre à BankVi, par exemple un chiffre ou une courbe. **Pas de bulle, pas de téléphone, pas de cercle vert** |
| **Écran de lancement Android** | Fond `#FAF7F2` en clair, `#0D1520` en sombre, icône de l'app centrée, sans texte |

#### Style d'illustration

Le style privilégie des formes géométriques douces à contour net, aux couleurs Terracotta & Lagune propres à BankVi.

| Attribut | Valeur |
| --- | --- |
| Contour | `#1C1613` en clair, `#F5F0EB` en sombre, 2,5 dp, bouts et angles ronds |
| Remplissage | Aplats sans dégradé ni texture |
| Couleurs | `#B83B20` en clair, `#F07B5A` en sombre pour l'accent terracotta ; `#FCE8DF` en clair, `#133447` en sombre pour les grandes surfaces ; `#FFBC38` (clair et sombre) pour les pièces ; `#FFFFFF` en clair, `#1B2A3E` en sombre pour le papier |
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
| HAB-01 | Tables de fréquences par créneau, sur l'appareil |
| HAB-02 | Saisie éclair : 3 suggestions du créneau, 2 taps |
| HAB-03 | Autocomplétion de la description et de la catégorie |
| HAB-04 | Montant pré-rempli depuis la plage habituelle, jamais validé seul |
| HAB-08 | Application des seuils de confiance |
| LEG-03 | Mention « outil d'information, ni conseil financier ni conseil comptable » |
| LEG-04 | Faits, règle de l'utilisateur et conséquence ; pas de « tu devrais », ni de produit financier recommandé |
| PRV-01 | Écran d'ouverture « Aujourd'hui » : ce que je peux dépenser, en 0 tap |
| SAI-01 | Ajout rapide d'une dépense ou d'un revenu : clavier ouvert, montant seul obligatoire, poche et catégorie déduites |
| SAI-02 | « Aujourd'hui » présélectionné, sans tap supplémentaire |
| SAI-03 | Raccourcis Hier et Avant-hier |
| SAI-07 | Une date future crée une ligne « prévue », jamais du réel |
| SAI-14 | Saisie de plusieurs dépenses d'affilée le soir |
| SAI-20 | Champ de saisie façon message, en texte libre (« salaire 200000 », « jus 100 », « déplacement 1500 ») : revenu ou dépense, montant et catégorie déduits par un analyseur déterministe ; aperçu en bulle, puis « Annuler » |
| SAI-27 | Saisies affichées comme une conversation : dépenses en messages sortants, à droite ; revenus en messages entrants, à gauche ; comptages, transferts et « Non détaillé » en repères neutres, au centre |
| SAI-28 | Si une saisie ressemble à une ligne prévue, à 7 jours près : « C'est ton loyer du 5 ? », en une touche, pour ne pas la compter deux fois |
| UX-01 | Budgets d'action par tâche, vérifiés par des tests de parcours |
| UX-05 | Ouverture en moins de 2 s, cibles de 44 pt, usage à une main |
| VAL-06 | Test de la phrase de recette auprès de 8 à 10 testeurs |

#### Autres écrans

| Code | Écran |
| --- | --- |
| EC-01 | Bienvenue |
| EC-09 | Quand préfères-tu noter ? |
| EC-10 | Sauvegarde |
| EC-11 | Code |
| EC-12 | Accueil |
| EC-14 | Choix de la catégorie |
| EC-15 | Autre date |
| EC-16 | Plusieurs dates |
| EC-17 | Historique |
| EC-18 | Détail d'une saisie |
| EC-19 | Bilan : compter |
| EC-20 | Bilan : écart |
| EC-21 | Bilan : résultat |
| EC-22 | Transfert entre poches |
| EC-27 | Mes pots |
| EC-35 | Partager |
| EC-37 | Menu |
| EC-40 | Mon rituel et alertes |
| EC-47 | Pourquoi cette suggestion ? |
| EC-48 | Libellé sensible |
| EC-50 | Mon statut |
| EC-51 | Déverrouillage |
| EC-52 | Sécurité |

#### Parcours

- PC-02 Noter en temps réel · L1
- PC-03 Noter à une autre date · L1
- PC-04 Même dépense sur plusieurs dates · L2
- PC-06 Plusieurs saisies le soir · L1
- PC-09 Recevoir un revenu · L1

<!-- annexe:fin -->
