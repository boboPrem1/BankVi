# EC-12 Accueil

| Fiche | |
| --- | --- |
| **Parcours** | PC-02, PC-05, PC-07, PC-09, PC-19, PC-20, PC-21 |
| **Lot** | L1 |
| **Bible** | PRV-01, PRV-02, POC-02, UX-02, UX-03, UX-05, UX-06, UX-07, UX-10, UX-11, UX-13, SAI-15, SAI-27, ONB-04, ONB-05 |
| **Avant** | Ouverture de l'app, fin d'une tâche |
| **Après** | EC-50, EC-13, EC-14, EC-17, EC-18, EC-19, EC-22, EC-23, EC-24, EC-27, EC-40 |
| **Cadre** | 360 × 800 dp, portrait, marges de 16 dp |

<!-- fiche-autonome:debut -->
**Fiche autonome.** Ce fichier suffit pour finir cet écran, sans aucun autre document. Les sections numérotées décrivent l'écran ; l'annexe en bas donne la philosophie de BankVi, le design system, les composants utilisés, le contexte produit et les critères de fin. Pour cet écran, les sections numérotées priment sur l'annexe.
<!-- fiche-autonome:fin -->

## 1. Rôle

Répondre sans aucun tap à la question « combien puis-je dépenser aujourd'hui ? », puis permettre de noter. C'est l'écran d'ouverture de l'app.

## 2. Ce qu'on voit

Le haut de l'écran, jusque sous la barre d'état, est un paysage : ciel en dégradé, soleil, collines calculées à partir de la prévision. En haut à gauche, un anneau blanc entoure une miniature de ce paysage, à côté de la date. Par-dessus, en blanc et en très grand : **3 200 FCFA**. Dessous, sur fond blanc : ce qui arrive, les poches, puis les saisies du jour sous forme de conversation : les dépenses partent à droite en vert, les revenus arrivent à gauche en gris. Juste au-dessus des onglets, une barre fixe porte le bouton vert « Noter une dépense », sur toute la largeur. Le soir, avant le bilan, elle porte deux boutons côte à côte : « Noter » en blanc et « Faire mon bilan » en vert. Rien ne recouvre jamais le contenu. Tout en bas, les quatre onglets.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ◉  Vendredi 6 novembre             │ ┐
│ Aujourd'hui, tu peux dépenser      │ │
│ 3 200 FCFA                 ⌄ ⌄     │ │ 280 héros
│ jusqu'au 28                        │ │
│       ☼    ▂▃▅▃▂▁▂▃▅▆▄▂            │ │
│ ▁▂▃▂▁▁▂▂▃▄▃▂▁▁▁▁▂▃▅▇▆▄             │ ┘
│ À venir                            │ 16
│ ┌──────────────┐ ┌──────────────┐  │
│ │ Électricité  │ │ Salaire      │  │ 72
│ │ le 15 −8 000 │ │ le 28 +120 000│ │
│ └──────────────┘ └──────────────┘  │
│ Mes poches                         │ 16
│ ┌──────────────┐ ┌──────────────┐  │
│ │ Espèces      │ │ Mixx         │  │ 56
│ │ 32 000 FCFA  │ │ 58 000 FCFA  │  │
│ └──────────────┘ └──────────────┘  │
│ Noté aujourd'hui         Tout voir │ 48
│        ╭ Taxi · −500 FCFA · 8 h 12╮│
│╭ Prêt rendu · +2 000 FCFA ╮        │
├────────────────────────────────────┤
│ (      + Noter une dépense       ) │ 64 barre d'action
├────────────────────────────────────┤
│  ◉Aujourd'hui Horizon  Pots  Plus  │ 64
└────────────────────────────────────┘
```

## 4. Structure et mesures

L'ordre est fixe et ne se personnalise pas.

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Héros plein bord, barre d'état comprise | 280 dp au repos (120 dp replié au défilement) | 16 dp |
| Titre « À venir » | 16 dp | 8 dp |
| Deux blocs à venir | 72 dp | 16 dp |
| Titre « Mes poches » | 16 dp | 8 dp |
| Poches | 56 dp | 16 dp |
| Carte, s'il y en a une | Selon le texte | 16 dp |
| Titre « Noté aujourd'hui » et « Tout voir » | 48 dp | 8 dp |
| Bulles, 3 au plus | 32 dp chacune, écart 8 dp | 16 dp |
| Barre d'action, fixe | 64 dp | 0 |
| Barre du bas, fixe | 64 dp | — |

Le contenu défile, et le héros se replie de 280 à 120 dp : la barre d'action ne recouvre rien et reste toujours au même endroit.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond sous le héros | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Ciel | — | Dégradé vertical à deux couleurs, selon l'état | Voir la section 6 |
| Soleil | — | Cercle de 36 dp, sur un arc, selon les jours avant le revenu | `#FFBC38` |
| Collines lointaines et proches | — | Silhouettes calculées sur la courbe à 30 jours, sans contour | `rgba(255,255,255,0.12)`, `rgba(11,20,26,0.55)` |
| Oiseaux | — | 3 à 7 traits de 1,5 dp, à droite, selon la date | `rgba(255,255,255,0.70)` |
| Anneau | — | Avatar de 40 dp, trait de 2,5 dp, zone 48 dp, miniature du paysage | À voir `#FFFFFF` ; déjà vu `rgba(255,255,255,0.45)` |
| Date | Vendredi 6 novembre | Roboto 14/20 sp, Medium (500) | `#FFFFFF` |
| Amorce | Aujourd'hui, tu peux dépenser | Roboto 16/24 sp, Regular (400) | `#FFFFFF` |
| Nombre | 3 200 | Roboto 48/56 sp, Bold (700), chiffres proportionnels | `#FFFFFF` |
| Unité | FCFA | Roboto 18/24 sp, Medium (500), même ligne de base, 8 dp | `#FFFFFF` |
| Échéance | jusqu'au 28 | Roboto 16/24 sp, Regular (400) | `#FFFFFF` |
| Titres de zone | À venir, Mes poches, Noté aujourd'hui | Roboto 12/16 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bloc à venir | Électricité / le 15 / −8 000 FCFA | Rayon 12 dp, contour 1 dp, marges 12 dp ; Roboto 14/20 sp, Medium (500), Roboto 12/16 sp, Regular (400), Roboto 14/20 sp, Regular (400) tabulaire | Fond `#F0F2F5` en clair, `#111B21` en sombre, contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre, date `#54656F` en clair, `#AEBAC1` en sombre |
| Bloc poche | Espèces / 32 000 FCFA | Rayon 12 dp, contour 1 dp ; Roboto 12/16 sp, Regular (400), Roboto 16/24 sp, Medium (500) tabulaire | Contour `#7A8A94` en clair, `#667781` en sombre, nom `#54656F` en clair, `#AEBAC1` en sombre, solde `#111B21` en clair, `#E9EDEF` en sombre |
| Tout voir | Tout voir | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Dépense | Taxi · −500 FCFA · 8 h 12 | Bulle à droite, 80 % au plus, haut droit 4 dp, autres coins 12 dp, Roboto 14/20 sp, Regular (400) | Fond `#D9FDD3` en clair, `#005C4B` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Revenu | Prêt rendu · +2 000 FCFA · 8 h 00 | Bulle à gauche, haut gauche 4 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Barre d'action | — | 64 dp, marges 8 et 16 dp, trait du haut de 1 dp | Fond `#FFFFFF` en clair, `#0B141A` en sombre, trait `#E9EDEF` en clair, `#2A3942` en sombre |
| Bouton principal | Noter une dépense, icône `add` | 48 dp de haut, pilule, toute la largeur, Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Onglet actif | Aujourd'hui, icône `today` pleine | Pastille 56 × 32 dp, Roboto 12/16 sp, Medium (500) | Pastille `#D8FDD2` en clair, `#103529` en sombre, icône `#0A3D2E` en clair, `#D9FDD3` en sombre, libellé `#111B21` en clair, `#E9EDEF` en sombre |
| Onglets inactifs | Horizon, Pots, Plus | Icônes `show_chart`, `savings`, `menu` à contour | `#54656F` en clair, `#AEBAC1` en sombre |

## 6. États

### Selon la situation d'argent

Le chiffre du début de cycle est celui du premier jour après le dernier revenu. Pour Camille : 3 200 FCFA.

| État | Condition | Ciel, du haut vers le bas | Exemple |
| --- | --- | --- | --- |
| Ça suit | 90 % ou plus du chiffre de début de cycle | `#054D43` → `#0E7A6A` | 3 200 FCFA |
| Ça se resserre | De 60 à 90 % | `#123A5C` → `#2A6A8F` | 2 400 FCFA |
| Serré | Moins de 60 % | `#33275C` → `#66478C` | 1 400 FCFA |
| Il manque | Reste à vivre négatif | `#40270F` → `#8A4B00` | Il manque / **8 500** FCFA / pour tes charges jusqu'au 28 |

Le texte reste blanc : il dépasse 5:1 sur chaque couleur du ciel. Jamais de nombre négatif seul.

### Selon l'action principale

| Situation | Barre d'action | Ouvre |
| --- | --- | --- |
| Préférence « Au fil de la journée » | Noter une dépense | EC-13 |
| Préférence « Le soir », en journée | Noter une dépense | EC-13 |
| Bilan non fait, après l'heure du rituel | **Noter** à gauche, à contour (fond de l'écran, contour `#7A8A94` en clair, `#667781` en sombre, texte `#00735E` en clair, `#25D366` en sombre) ; **Faire mon bilan** à droite, en vert, plus large ; écart de 8 dp | EC-13 ; EC-19 |
| Récurrent à confirmer aujourd'hui | Confirmer mon salaire | Confirme, avec « Annuler » |

### Autres états

| État | Affichage |
| --- | --- |
| Première utilisation sans saisie | Sous « Noté aujourd'hui » : « Rien de noté aujourd'hui, c'est normal », Roboto 14/20 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Plus de 3 saisies | Les 3 plus récentes, puis « Tout voir » |
| Trois poches ou plus | La rangée défile horizontalement, et le bloc suivant dépasse pour le signaler |
| Poche d'activité active | Son bloc porte « Activité » et reste hors du chiffre du jour |
| Aucune charge à venir | Le bloc montre seulement le prochain revenu, sur toute la largeur |
| Revenu variable | Bloc : « Fin du mois » / « au moins 90 000 FCFA attendus » |
| Rituel en pause | Carte : « Rituel en pause. Le relancer ? », avec « Relancer » en bouton texte |
| Sauvegarde reportée | Une seule fois, après une valeur : carte « Garde tes données même si tu changes de téléphone », avec « Sauvegarder » et « Plus tard » |
| Offre du pass | Une seule carte fermable, jamais pendant une tâche et jamais avant le premier horizon |
| Hors ligne | Indicateur sous les poches : icône `smartphone` de 16 dp, « Enregistré sur ce téléphone », Roboto 12/16 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Revenu réparti | Bandeau : « 120 000 FCFA répartis », avec « Annuler » pendant 10 s et « Voir mes pots » |
| Après le bilan, jusqu'à minuit | Le héros montre « Demain, tu pourras dépenser » et le chiffre de demain. Le bouton redevient « Noter une dépense » |
| Après une saisie | Chiffre recalculé aussitôt, bandeau avec « Annuler » pendant 10 s, 8 dp au-dessus de la barre d'action |

Une seule carte à la fois, et aucune au premier lancement.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher l'anneau | EC-50 |
| Toucher le chiffre | EC-24 |
| Toucher un bloc à venir | EC-23, sur cette date |
| Toucher un solde | EC-22, avec cette poche en « De » |
| « Tout voir » | EC-17 |
| « Voir mes pots » | EC-27 |
| « Relancer » | EC-40 |
| Toucher une bulle | EC-18 |
| Appui long sur une bulle | Choix de la catégorie, EC-14 |
| Boutons de la barre d'action | Selon le tableau ci-dessus |
| Onglets | Change d'onglet, sans glissement |
| Retour Android | Ferme l'app |

## 8. Données

Le calcul se fait sur le téléphone et s'affiche aussitôt, sans chargement.

| Valeur | Calcul |
| --- | --- |
| Reste à vivre | Soldes des poches perso + revenus attendus avant la date de référence − charges avant cette date − réservé dans les pots hors quotidien |
| Revenu variable encore attendu | Le plus petit de : plancher × jours restants ÷ jours du mois ; montant attendu au départ − revenus notés |
| Chiffre du jour | Reste ÷ jours restants, arrondi à la baisse à 100 FCFA |

**Exemple.** Camille : (90 000 − 18 000) ÷ 22 = 3 272, arrondi à 3 200 FCFA.

## 9. Accessibilité

Le chiffre se lit d'un bloc, comme titre : « Aujourd'hui, tu peux dépenser trois mille deux cents francs CFA jusqu'au 28. » Anneau : « Mon statut du jour, à voir ». Bulles : « Dépense : Taxi, 500 francs CFA, 8 h 12 » et « Revenu : Prêt rendu, plus 2 000 francs CFA, 8 h 00 ». Le paysage est ignoré, car ses informations sont écrites.

## 10. Mouvement

Le paysage de l'accueil est immobile. Un changement d'état passe en fondu de 300 ms. Le chiffre change sans compteur. Une nouvelle bulle apparaît en 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Héros à 240 dp, le contenu défile |
| 320 × 568 dp | Héros à 220 dp, collines plus basses ; poches l'une sous l'autre si le montant ne tient pas |
| Texte à 200 % | Le héros s'agrandit et le chiffre plafonne à 64 sp ; blocs à venir l'un sous l'autre |
| Thème sombre | Valeurs ci-dessus ; le paysage ne change pas |

## 12. Mesure

`home_viewed`, `cta_clicked` avec le libellé, `status_ring_tapped`. Durée d'ouverture, cible sous 2 s. **Aucun montant.**

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

- **Disposition fixe, de haut en bas :** héros plein bord avec le paysage du jour, l'anneau du statut et le grand chiffre du jour ; à venir : prochaine charge et prochain revenu ; soldes par poche ; une seule carte au plus ; saisies du jour en conversation : dépenses en messages sortants, à droite ; revenus en messages entrants, à gauche ; barre d'action fixe au-dessus des onglets.
- **Action principale, selon l'état :**

| État | Action principale |
| --- | --- |
| Bilan non fait, après l'heure du rituel | « Faire mon bilan », avec « Noter » en bouton secondaire à côté |
| Saisie préférée « Le soir », en journée | « Noter une dépense » |
| Préférence « Au fil de la journée » | « Noter une dépense » |
| Récurrent à confirmer aujourd'hui | « Confirmer mon salaire » |

- **Autres :** toucher l'anneau (EC-50), toucher le chiffre (EC-24), toucher un élément à venir (EC-23), toucher un solde (EC-22), « Tout voir » (EC-17).
- **États :** première utilisation sans saisie : « Rien de noté aujourd'hui, c'est normal ». Hors ligne : indicateur discret.
- **Bible :** PRV-01, PRV-02, POC-02, UX-02, UX-03, UX-05, UX-06, UX-07, UX-10, UX-11, UX-13, SAI-15, SAI-27, ONB-04, ONB-05.

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

#### PC-02 Noter en temps réel · L1

*Camille paie un taxi à 500 FCFA.*

1. **EC-12** Elle touche « Noter une dépense ».
2. **EC-13** Le clavier est ouvert, et trois suggestions du créneau s'affichent.
3. **Avec suggestion (2 taps) :** elle touche « Taxi · 500 », puis « Enregistrer ».
4. **Sans suggestion (montant + 3 taps au plus) :** elle tape le montant, touche la catégorie si celle qui est déduite ne convient pas, puis « Enregistrer ».
5. Retour sur **EC-12**, chiffre du jour recalculé, bandeau « Annuler ».

#### PC-05 Bilan du soir · L1

*Karim préfère tout faire le soir. Budget : 30 secondes pour les espèces seules.*

1. La notification « Mon rituel » arrive à l'heure choisie.
2. **EC-19** Il indique ce qu'il lui reste en espèces, sans montant attendu affiché ; Mixx et Flooz sont facultatifs.
3. **EC-20** L'app affiche les dépenses déjà notées et l'écart, puis propose de le répartir selon ses habitudes.
4. Il valide les suggestions ajustées, ou laisse le reste en « Non détaillé ».
5. **EC-21** Le résultat montre le chiffre de demain.

| Cas | Comportement |
| --- | --- |
| Écart nul | « Tout est à jour », sans répartition |
| Moins d'argent que prévu | Répartir en dépenses, ou « Non détaillé » |
| Plus d'argent que prévu | « Tu as 2 000 FCFA de plus que prévu » : revenu non noté, dépense notée en trop ou « Non détaillé » |
| Jours sans bilan | L'écart couvre toute la période, sans remarque sur les jours manquants |
| Pas encore d'habitudes | Catégories courantes à toucher, sans suggestion chiffrée |

#### PC-06 Plusieurs saisies le soir · L1

1. **EC-13** en mode « Ajouter une autre » : après « Enregistrer », le formulaire se rouvre avec la même date.
2. Le compteur affiche « 3 dépenses notées · 2 500 FCFA ».
3. « Terminer » ramène à **EC-12**, ou à **EC-19** si l'utilisateur est venu du bilan.

#### PC-07 Retrait Mixx vers les espèces · L1

1. **EC-12** Il touche un solde, puis « Transférer » : **EC-22**.
2. Il choisit De Mixx vers Espèces et indique le montant, puis les frais éventuels.
3. Les soldes changent. Seuls les frais comptent comme une dépense.

#### PC-09 Recevoir un revenu · L1

1. **EC-13** Il note un revenu, ou un revenu prévu arrive à sa date et l'app demande de le confirmer.
2. La recette répartit automatiquement le montant dans les pots. Avec un revenu variable, elle agit à partir du 1er du mois suivant son adoption.
3. **EC-12** affiche « 120 000 FCFA répartis », avec « Annuler » et « Voir mes pots » : **EC-27**.

#### PC-16 Nouveau téléphone · L1

1. **EC-01** Il touche « J'ai déjà un compte ».
2. **EC-10 et EC-11** Il saisit son numéro et le code reçu.
3. Ses données se téléchargent, et les habitudes se recalculent sur l'appareil.
4. Arrivée sur **EC-12**, identique à l'ancien téléphone.

#### PC-19 Revenir après une absence · L1

1. **Rituel ignoré 5 jours :** il se met en pause, et l'app le dit sur **EC-12** (« Rituel en pause. Le relancer ? »).
2. **Absence de 30 jours :** **EC-49** « Reprendre ». L'utilisateur compte sa poche et l'écart couvre toute la période.

#### PC-20 Faire le point sur son mois · L1

*Camille veut savoir ce qui est entré et sorti ce mois-ci.*

1. **EC-12** Elle touche « Tout voir » : **EC-17**.
2. Le résumé du mois s'affiche en haut : revenus reçus et attendus, dépenses, répartition par catégorie.
3. Elle touche une catégorie, ou choisit Revenus ou Dépenses : la liste se filtre.
4. Elle peut revenir sur un mois précédent.

#### PC-21 Voir mon statut du jour · L1, son en L2

*Camille ouvre l'app le matin, sans rien à noter.*

1. **EC-12** Le chiffre du jour est déjà là. L'anneau signale un nouveau statut, sans rien ouvrir tout seul.
2. Elle touche l'anneau : **EC-50**. Son paysage du jour, calculé à partir de sa prévision, s'affiche.
3. Elle regarde jusqu'à 4 faits : aujourd'hui, à venir, hier, ses pots. Elle touche pour avancer ou revenir, appuie longuement pour mettre en pause.
4. Retour sur **EC-12**. L'anneau passe à « déjà vu ».

#### Décisions déjà prises pour cet écran

| Point | Décision |
| --- | --- |
| Boutons de l'accueil le soir | **Validé :** barre d'action fixe ; après l'heure du rituel, « Noter » à contour et « Faire mon bilan » en vert, côte à côte |
| Accueil après le bilan | **Validé :** Le héros montre « Demain, tu pourras dépenser » jusqu'à minuit |

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

#### Calculs affichés

| Valeur | Calcul |
| --- | --- |
| **Reste à vivre** | Soldes des poches perso + revenus attendus avant la date de référence − charges prévues avant cette date − montants réservés dans les pots hors quotidien |
| **Revenu variable encore attendu** | Le plus petit de : plancher × jours restants ÷ jours du mois ; montant attendu au départ − revenus déjà notés |
| **Date de référence** | Prochain revenu si le revenu est régulier ; fin du mois si un revenu est variable, même avec un salaire en plus : le salaire d'avant cette date compte alors dans les revenus attendus |
| **Aujourd'hui, je peux dépenser** | Reste à vivre ÷ jours restants jusqu'à la date de référence, arrondi à la baisse à 100 FCFA |
| **Solde attendu d'une poche** | Dernier comptage + revenus − dépenses ± transferts, depuis ce comptage |
| **Écart** | Solde attendu − solde compté |

**Reste à vivre négatif :** l'écran affiche « Il manque 8 500 FCFA pour tes charges jusqu'au 28 », jamais un chiffre négatif seul.

**Courbe de l'horizon :** chaque point est le solde du matin. On retire chaque jour le chiffre du jour et, à la date de référence, on recalcule ce rythme pour le cycle suivant. L'écran écrit cette hypothèse.

**Poche d'activité :** elle n'entre pas dans le reste à vivre, sauf transfert vers une poche perso. Ce transfert compte comme un revenu noté.

**Lignes prévues :** une ligne arrivée à sa date compte comme encore à venir tant qu'elle n'est pas confirmée. Un comptage de toutes les poches utilisées referme celles qui le précèdent.

**Le pot « Le reste » :** le surplus au-delà du plancher est mis de côté, hors du chiffre du jour ; on peut le déplacer vers le quotidien.

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

#### Palette des pots

Six couleurs, attribuées dans l'ordre des pots d'une recette. Au-delà de six pots, les suivants prennent le gris `#7A8A94` en clair, `#667781` en sombre et s'affichent par leur nom dans la liste, sans teinte nouvelle.

La palette a été contrôlée au validateur de palettes catégorielles (écart perçu, daltonisme, luminosité, contraste) :

| Thème | Résultat |
| --- | --- |
| Clair, sur `#FFFFFF` | Tous les contrôles réussis. Une paire adjacente, `#E0568A` et `#027EB5`, est dans la zone tolérée pour le daltonisme de type protan (écart de 6,6) : elle n'est autorisée qu'avec un moyen d'identification supplémentaire. |
| Sombre, sur `#0B141A` | Tous les contrôles réussis, sans réserve. |

Le moyen supplémentaire est obligatoire et prévu : un trou de 2 dp entre les segments et le nom de chaque pot dans la liste. Le contrôle ne couvre pas les couleurs d'interface comme le vert d'action, seulement les pots.

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
| Moins, plus | `remove`, `add` |
| Ajouter | `add` |
| Enregistré sur le téléphone | `smartphone` |
| Aujourd'hui (onglet) | `today` |
| Horizon (onglet) | `show_chart` |
| Pots (onglet) | `savings` |
| Plus (onglet) | `menu` |

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
| Forme | Pilule |
| Libellé | Roboto 16/24 sp, Medium (500), centré, une ligne ; deux lignes si le texte est agrandi, la hauteur suit |
| Texte | Verbe et résultat. Jamais « Suivant » ni « OK » |
| Position | Dans le pied d'action |

| État | Fond | Texte | Remarque |
| --- | --- | --- | --- |
| Repos | `#25D366` (clair et sombre) | `#0B141A` (clair et sombre) | |
| Appuyé | `#1FAD56` (clair et sombre) | `#0B141A` (clair et sombre) | Ondulation |
| Désactivé | `#E9EDEF` en clair, `#202C33` en sombre | `#667781` en clair, `#8696A0` en sombre | Un champ manquant ; une aide dit lequel. Non annoncé comme action par TalkBack, mais lu avec « désactivé » |
| Chargement | `#25D366` (clair et sombre) | Cercle de progression de 20 dp, trait 2 dp, `#0B141A` (clair et sombre), à gauche du libellé | Bouton inactif, libellé modifié (« Envoi… »), après 300 ms d'attente seulement |

#### Bouton à contour

Même hauteur et forme que le principal. Fond transparent, contour de 1 dp `#7A8A94` en clair, `#667781` en sombre, libellé Roboto 16/24 sp, Medium (500) en `#00735E` en clair, `#25D366` en sombre. Pressé : ondulation.

#### Bouton texte

| Attribut | Valeur |
| --- | --- |
| Texte | Roboto 14/20 sp, Medium (500), `#00735E` en clair, `#25D366` en sombre |
| Zone tactile | Hauteur 48 dp, largeur du texte plus 12 dp de chaque côté |
| Pleine largeur | Centré sous le bouton principal |
| Destructif | `#B3261E` en clair, `#F2B8B5` en sombre |

#### Barre d'action

Sur les écrans principaux, l'action reste dans une barre fixe, juste au-dessus des onglets. Il n'y a **aucun bouton flottant** : rien ne recouvre le contenu, et le pouce retrouve toujours le même endroit.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 64 dp : 8 dp, bouton de 48 dp, 8 dp |
| Marges latérales | 16 dp |
| Fond | `#FFFFFF` en clair, `#0B141A` en sombre |
| Trait du haut | 1 dp `#E9EDEF` en clair, `#2A3942` en sombre |
| Ombre | Aucune |
| Un seul bouton | Bouton principal, toute la largeur, icône de 24 dp et libellé |
| Deux boutons | Écart de 8 dp ; à gauche, bouton à contour, 40 % de la largeur ; à droite, bouton principal, 60 % |
| Bandeau Annuler | 8 dp au-dessus de la barre |
| Présence | Accueil et Mon horizon, ainsi que les autres écrans principaux qui ont une action ; absente pendant une tâche et au premier lancement |

Un seul bouton reste vert. Le libellé peut se raccourcir quand deux boutons se partagent la barre (« Noter ») ; TalkBack lit toujours le libellé complet. À 200 % de texte, les deux boutons s'empilent et la barre grandit.

#### Barre de navigation du bas

Présente sur les écrans principaux seulement, jamais pendant une tâche ni au premier lancement.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 64 dp, plus la barre système |
| Fond | `#FFFFFF` en clair, `#0B141A` en sombre, trait du haut 1 dp `#E9EDEF` en clair, `#2A3942` en sombre |
| Onglets | Quatre, dans cet ordre et sans jamais bouger : Aujourd'hui, Horizon, Pots, Plus |
| Icône inactive | Contour, 24 dp, `#54656F` en clair, `#AEBAC1` en sombre |
| Icône active | Pleine, `#0A3D2E` en clair, `#D9FDD3` en sombre, sur une pastille de 56 × 32 dp en `#D8FDD2` en clair, `#103529` en sombre, en pilule |
| Libellé | Roboto 12/16 sp, Medium (500) ; inactif `#54656F` en clair, `#AEBAC1` en sombre ; actif `#111B21` en clair, `#E9EDEF` en sombre |
| Changement d'onglet | Pastille en fondu, 100 ms, sans glissement d'écran |

#### Ligne de liste

| Attribut | Une ligne de texte | Deux lignes de texte |
| --- | --- | --- |
| Hauteur | 56 dp | 72 dp |
| Avatar | Facultatif | 40 dp, à 16 dp du texte |
| Titre | Roboto 16/24 sp, Medium (500), `#111B21` en clair, `#E9EDEF` en sombre | Identique |
| Sous-titre | — | Roboto 14/20 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Valeur à droite | Roboto 16/24 sp, Regular (400), chiffres tabulaires | Identique, sur la ligne du titre |
| Séparateur | 1 dp `#E9EDEF` en clair, `#2A3942` en sombre, à l'aplomb du texte | Identique |
| Appui | Ondulation sur toute la ligne | Identique |

#### Avatar

Cercle de 40 dp, fond `#F0F2F5` en clair, `#111B21` en sombre, contenu `#54656F` en clair, `#AEBAC1` en sombre : une icône de 24 dp, ou une initiale en Roboto 16/24 sp, Medium (500). Mixx et Flooz ont l'initiale « M » et « F » : leurs logos ne sont pas utilisés sans autorisation.

#### Bulle

| Attribut | Bulle de l'app | Bulle de l'utilisateur |
| --- | --- | --- |
| Rôle | L'app explique un fait | Rappel de ce que l'utilisateur a noté |
| Fond | `#F0F2F5` en clair, `#202C33` en sombre | `#D9FDD3` en clair, `#005C4B` en sombre |
| Texte | Roboto 14/20 sp, Regular (400), `#111B21` en clair, `#E9EDEF` en sombre | Roboto 14/20 sp, Regular (400), `#111B21` en clair, `#E9EDEF` en sombre |
| Coins | 12 dp, sauf haut gauche 4 dp | 12 dp, sauf haut droit 4 dp |
| Alignement | À gauche | À droite |
| Marges intérieures | 12 dp horizontal, 8 dp vertical | Identique |
| Largeur | Pleine largeur au plus | 80 % au plus |
| Ombre | `e1` en clair, aucune en sombre | Identique |

Une bulle explique ou rapporte un fait. Elle ne contient aucun bouton. Les réponses possibles, comme la répartition du bilan, sont des puces placées sous la bulle.

##### Saisies en conversation (SAI-27)

L'argent qui sort part comme un message envoyé. L'argent qui entre arrive comme un message reçu.

| Saisie | Position | Fond | Coin aplati | Exemple |
| --- | --- | --- | --- | --- |
| **Dépense** | À droite | `#D9FDD3` en clair, `#005C4B` en sombre | Haut droit | Taxi · −500 FCFA · 8 h 12 |
| **Revenu** | À gauche | `#F0F2F5` en clair, `#202C33` en sombre | Haut gauche | Salaire · +120 000 FCFA · 8 h 00 |
| **Comptage, transfert, « Non détaillé »** | Au centre | Repère en pilule, 1 dp `#E9EDEF` en clair, `#2A3942` en sombre | Aucun | Comptage : 32 000 FCFA en espèces |

Le sens ne repose jamais sur la seule position ou couleur : une dépense porte toujours « − » (U+2212), un revenu porte toujours « + », et TalkBack lit « Dépense : » ou « Revenu : » avant le libellé. Largeur de 80 % au plus. Heure en Roboto 12/16 sp, Regular (400), `#3B4A54` sur une dépense en clair, `#D9FDD3` en sombre ; `#54656F` sur un revenu en clair, `#AEBAC1` en sombre. Sans queue de bulle ni coche de lecture. Un toucher ouvre le détail, un appui long change la catégorie.

**En P2 (SAI-20) :** un champ façon message s'ajoutera en bas : « salaire 200000 », « jus 100 », « déplacement 1500 ». La bulle prend aussitôt le bon côté, avec « Annuler ».

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

#### Indicateur « Enregistré sur ce téléphone »

Icône `smartphone` de 16 dp et texte Roboto 12/16 sp, Regular (400) en `#54656F` en clair, `#AEBAC1` en sombre. Discret, sans fond, sur l'écran concerné. Il n'est jamais rouge ni jaune.

#### Chiffre du jour

| Élément | Valeur |
| --- | --- |
| Phrase d'amorce | « Aujourd'hui, tu peux dépenser », Roboto 16/24 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Nombre | Roboto 48/56 sp, Bold (700), `#111B21` en clair, `#E9EDEF` en sombre, chiffres proportionnels |
| Unité | « FCFA », Roboto 18/24 sp, Medium (500), `#111B21` en clair, `#E9EDEF` en sombre, même ligne de base, 8 dp |
| Échéance | « jusqu'au 28 », Roboto 16/24 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Alignement | À gauche |
| Nombre par écran | Un seul |

**S'il manque de l'argent :** jamais de nombre négatif seul. La phrase devient « Il manque », puis le nombre en `#8A4B00` en clair, `#FFD27A` en sombre avec son unité, puis « pour tes charges jusqu'au 28 ». L'icône `warning` de 24 dp précède « Il manque ».

**Masquer les montants (en public) :** réglage facultatif, désactivé par défaut pour garder le chiffre visible à 0 tap. Lorsqu'il est activé, une icône `visibility` / `visibility_off` (zone 48 dp) permet de remplacer les montants par « •••• FCFA » d'un toucher.

#### Courbe de l'horizon

**Forme :** une seule courbe en ligne, car le sujet est l'évolution d'un solde dans le temps. Une seule série, donc pas de légende : le titre la nomme.

| Élément | Valeur |
| --- | --- |
| Hauteur | 200 dp, largeur pleine moins les marges |
| Trait | 2 dp, joints et bouts ronds, `#008069` en clair, `#25D366` en sombre |
| Prévu | Pointillés de 6 dp et d'espace 4 dp |
| Réel | Trait plein |
| Lavis sous la courbe | `rgba(0,128,105,0.10)` en clair, `rgba(37,211,102,0.10)` en sombre |
| Zone sous zéro | `rgba(138,75,0,0.12)` en clair, `rgba(255,210,122,0.14)` en sombre |
| Interpolation | Linéaire par paliers quotidiens, sans lissage : un lissage ferait croire à un solde qu'on n'a pas eu |
| Axe horizontal | 3 repères : aujourd'hui, milieu, fin. Roboto 12/16 sp, Regular (400), `#667781` en clair, `#8696A0` en sombre, format « 6 nov. » |
| Axe vertical | 3 ou 4 valeurs rondes à droite, chiffres tabulaires, Roboto 12/16 sp, Regular (400), `#667781` en clair, `#8696A0` en sombre, avec nombres en entier : `50 000` |
| Grille | Horizontale seulement, 1 dp plein `#E9EDEF` en clair, `#2A3942` en sombre |
| Ligne du zéro | 1 dp plein `#7A8A94` en clair, `#667781` en sombre, visible seulement si la courbe passe sous zéro ou s'en approche |
| Point d'aujourd'hui | Rond de 8 dp `#008069` en clair, `#25D366` en sombre, anneau de 2 dp couleur du fond |

**Étiquettes directes, trois au plus :**

1. Le solde d'aujourd'hui ;
2. Le point le plus bas ;
3. Le prochain revenu.

Elles sont en Roboto 12/16 sp, Regular (400) et en `#111B21` en clair, `#E9EDEF` en sombre, jamais en couleur de courbe. Si deux se chevauchent, on garde le point le plus bas.

**Interaction :** glisser le doigt affiche une ligne verticale de 1 dp `#7A8A94` en clair, `#667781` en sombre et un point de 8 dp sur la courbe. Une info-bulle en haut du graphique, fond `#FFFFFF` en clair, `#202C33` en sombre, ombre `e2`, rayon 8 dp, affiche : « 15 nov. · 53 200 FCFA », et l'événement du jour s'il y en a un : « Électricité −8 000 FCFA ». La zone tactile fait 48 dp autour du point. En relâchant, l'info-bulle disparaît.

**Lecture sans la vue :** le graphique porte une phrase lue par TalkBack, qui donne les trois valeurs clés. La même information existe sous forme de texte à l'écran (la bulle d'explication), et en lignes dans « D'où vient ce chiffre » (EC-24).

#### Ligne de pot

Pastille de 12 dp de la couleur du pot, nom en Roboto 16/24 sp, Regular (400), pourcentage en Roboto 16/24 sp, Regular (400) chiffres tabulaires, puis montant à droite. Le texte reste en `#111B21` en clair, `#E9EDEF` en sombre ou `#54656F` en clair, `#AEBAC1` en sombre, jamais dans la couleur du pot.

#### Formats de montant

| Cas | Exemple |
| --- | --- |
| Standard | `12 500 FCFA` |
| Dans une colonne | `12 500` sous un titre « FCFA » |
| Négatif, dans une info-bulle ou une ligne | `−8 000 FCFA`, avec le signe moins U+2212 |
| Revenu dans une ligne | `+120 000 FCFA` |
| Axe | `50 000` |

Aucune décimale, aucune abréviation « k » ni « M » dans l'app, car elles sont moins lisibles pour tous.

#### Anneau du statut

| Attribut | Valeur |
| --- | --- |
| Taille | Avatar de 40 dp, anneau de 2,5 dp, 2 dp d'écart, zone tactile 48 dp |
| Contenu | Miniature du paysage du jour |
| À voir | Anneau en `#FFFFFF`, car il est posé sur le paysage |
| Déjà vu | Anneau en `rgba(255,255,255,0.45)` |
| Nouveau statut | À la première ouverture de chaque jour, et après un bilan |
| TalkBack | « Mon statut du jour, à voir » |

#### L'artwork : mon horizon en paysage

L'artwork est calculé sur le téléphone, à partir des chiffres de l'utilisateur. Il n'a besoin ni de réseau, ni d'IA, ni de serveur. Aucune donnée ne part. Le même jour et les mêmes chiffres donnent la même image.

| Élément du paysage | Vient de | Rendu |
| --- | --- | --- |
| **Collines proches** | La forme de la courbe à 30 jours | Silhouette calculée, sur 18 à 45 % de la hauteur, couleur `rgba(11,20,26,0.55)` |
| **Collines lointaines** | La même courbe, décalée et adoucie | Silhouette, `rgba(255,255,255,0.12)` |
| **Soleil** | Les jours écoulés avant le prochain revenu | Cercle de 64 dp, `#FFBC38`, sur un arc de gauche à droite : il arrive à droite le jour du revenu |
| **Ciel** | L'état du jour | Dégradé vertical à deux couleurs |
| **Détails** | La date, qui sert de graine | 3 à 7 petits oiseaux ou étoiles, en trait de 1,5 dp, `rgba(255,255,255,0.7)` |

| État | Condition, à valider | Phrase | Ciel, du haut vers le bas | Contraste du texte blanc |
| --- | --- | --- | --- | --- |
| **Ça suit** | Chiffre du jour à 90 % ou plus de celui du début du cycle | Ça suit ton rythme. | `#054D43` → `#0E7A6A` | 9,77:1 et 5,24:1 |
| **Ça se resserre** | De 60 à 90 % | Ça se resserre un peu. | `#123A5C` → `#2A6A8F` | 11,76:1 et 5,90:1 |
| **Serré** | Moins de 60 % | C'est serré jusqu'au 28. | `#33275C` → `#66478C` | 13,24:1 et 7,38:1 |
| **Il manque** | Reste à vivre négatif | Il manque 8 500 FCFA pour tes charges jusqu'au 28. | `#40270F` → `#8A4B00` | 13,86:1 et 6,80:1 |

Ces phrases restent des faits. Aucun orage, aucun rouge, aucun ciel menaçant : le manque ressemble à une fin de journée, pas à une catastrophe.

**Placement :** le texte reste au-dessus du soleil et des collines, et les oiseaux à droite, loin du chiffre. Sur l'accueil, le soleil fait 36 dp et les collines occupent le bas du héros, sous la phrase « jusqu'au 28 ».

**Mouvement :** le soleil et les collines lointaines dérivent de 2 dp au plus sur 5 s. Rien d'autre ne bouge. Le paysage de l'accueil reste immobile.

#### Accessibilité et performance

| Cas | Règle |
| --- | --- |
| TalkBack | Pas d'avance automatique. Chaque fait est lu, puis on passe au suivant d'un geste. Le paysage porte une phrase : « Paysage du jour : ça suit ton rythme » |
| Animations réduites | Paysage immobile |
| Temps de lecture | L'appui long met en pause, et l'on peut revenir en arrière |
| Couleur | L'état est toujours écrit en phrase |
| Texte à 200 % | Le chiffre est plafonné à 64 sp. Le fait peut déborder sur les collines, et un voile de `rgba(11,20,26,0.40)` garantit alors la lecture |
| Génération | Moins de 300 ms, sans bloquer l'accueil. En cas de lenteur, le dégradé seul s'affiche d'abord |
| Appareil lent | Sans animation si l'affichage passe sous 30 images par seconde |
| Ouverture de l'app | Toujours moins de 2 s (UX-05) ; le paysage ne la retarde pas |

#### Accueil : la disposition affirmée (EC-12)

L'ordre est fixe et ne se personnalise pas : ce que je peux dépenser, ce qui arrive, où est mon argent, ce que j'ai noté.

```text
┌────────────────────────────────────┐
│ ◉  Vendredi 6 novembre       ▮▮ ▲  │ ┐
│                          ☼         │ │
│ Aujourd'hui, tu peux dépenser      │ │ héros plein bord, 280
│ 3 200 FCFA                         │ │ paysage du jour
│ jusqu'au 28                        │ │
│ ▁▂▃▅▂▁▂▃▅▇▆▄▂▁▂▃▄▃▂▁▁▂▃▅▆▄▃▂       │ ┘
│ À VENIR                            │
│ ⚡ Électricité   ⬇ Salaire          │ 72
│ le 15 · 8 000    le 28 · 120 000   │
│ MES POCHES                         │
│ [Espèces 32 000] [Mixx 58 000]     │ 72
│ NOTÉ AUJOURD'HUI          Tout voir│
│        ╭ Taxi · −500 FCFA · 8 h 12╮│ dépense, à droite
│╭ Prêt rendu · +2 000 FCFA ╮        │ revenu, à gauche
├────────────────────────────────────┤
│ (      + Noter une dépense       ) │ 64 barre d'action
├────────────────────────────────────┤
│ ◉Aujourd'hui  Horizon  Pots  Plus  │ 64
└────────────────────────────────────┘
```

| Zone | Contenu | Règle |
| --- | --- | --- |
| **Héros** | Paysage plein bord, sous la barre d'état ; anneau du statut et date en haut ; chiffre du jour | 280 dp au repos, barre d'état comprise ; se replie à 120 dp au défilement (le paysage s'efface, la date et le chiffre restent visibles). Texte `#FFFFFF`. Aucun bouton. Toucher le chiffre ouvre EC-24 ; toucher l'anneau ouvre EC-50 |
| **À venir** | Deux blocs : la prochaine charge et le prochain revenu | Hauteur 72 dp, fond `#F0F2F5` en clair, `#111B21` en sombre, contour de 1 dp `#7A8A94` en clair, `#667781` en sombre, rayon 12 dp. Toucher ouvre EC-23 |
| **Mes poches** | Un bloc par poche, en rangée qui défile | Contour de 1 dp `#7A8A94` en clair, `#667781` en sombre. Solde en Roboto 16/24 sp, Medium (500), tabulaire. Toucher ouvre EC-22 |
| **Carte** | Une seule au plus, entre poches et saisies | Absente si rien n'est utile |
| **Noté aujourd'hui** | Conversation : dépenses à droite, revenus à gauche, les plus récentes en haut | 3 au plus, puis « Tout voir ». Vide : « Rien de noté aujourd'hui, c'est normal » |
| **Action principale** | Barre d'action fixe, au-dessus des onglets ; le soir avant le bilan, « Noter » et « Faire mon bilan » côte à côte | Libellé selon l'état, comme le prévoit EC-12 ; un seul bouton vert |

Titres de zone : Roboto 12/16 sp, Medium (500), `#54656F` en clair, `#AEBAC1` en sombre, en casse normale : les majuscules du schéma ci-dessus ne servent qu'à le lire.

#### Ce qu'on emprunte aux réseaux sociaux

Il s'agit surtout de disposition, sur des fonctions déjà prévues.

| Geste connu | Dans BankVi | Écran |
| --- | --- | --- |
| Statut avec anneau | Le statut du jour | EC-12, EC-50 |
| Segments à toucher | Passer d'un fait à l'autre | EC-50 |
| Messages envoyés et reçus | Dépenses à droite, revenus à gauche, échange du bilan du soir | EC-12, EC-17, EC-19 à EC-21 |
| Écrire un message | Noter en texte libre : « jus 100 » (P2) | EC-13 |
| Réponses rapides | Puces de répartition de l'écart | EC-20 |
| Réactions | Juste, Faux, Oublier sur ce que l'app a appris | EC-43 |
| Cartes à balayer | Classer ses natures | EC-44 |
| Partage d'une création | Partager une recette, sans montant, en L2 | EC-35 |

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
| ONB-04 | Palier 2 : Aujourd'hui, ajout rapide, récurrents, natures |
| ONB-05 | Palier 3 : pots, « Puis-je me permettre ça ? » |
| POC-02 | Vue unique du solde total et par poche |
| PRV-01 | Écran d'ouverture « Aujourd'hui » : ce que je peux dépenser, en 0 tap |
| PRV-02 | Reste à vivre jusqu'au prochain revenu ; pour un revenu variable, le revenu encore attendu est le plus petit de : plancher au prorata des jours restants, montant attendu au départ moins le revenu déjà noté |
| SAI-15 | Annuler pendant 10 secondes au lieu de confirmer |
| SAI-20 | Champ de saisie façon message, en texte libre (« salaire 200000 », « jus 100 », « déplacement 1500 ») : revenu ou dépense, montant et catégorie déduits par un analyseur déterministe ; aperçu en bulle, puis « Annuler » |
| SAI-27 | Saisies affichées comme une conversation : dépenses en messages sortants, à droite ; revenus en messages entrants, à gauche ; comptages, transferts et « Non détaillé » en repères neutres, au centre |
| UX-02 | Un seul appel à l'action principal par écran, verbe et résultat |
| UX-03 | Navigation stable : Aujourd'hui, Horizon, Pots, Plus |
| UX-05 | Ouverture en moins de 2 s, cibles de 44 pt, usage à une main |
| UX-06 | Offre payante seulement après la première valeur, toujours fermable |
| UX-07 | Aucun message hors tâche au premier lancement, ni pendant une tâche |
| UX-10 | Accueil à disposition fixe et affirmée : chiffre du jour, à venir, poches, carte, saisies du jour ; barre d'action fixe au-dessus des onglets, sans bouton flottant |
| UX-11 | Statut du jour : anneau sur l'accueil, faits à toucher et paysage généré sur l'appareil à partir de la prévision |
| UX-13 | Expérience inspirée des réseaux sociaux et du jeu (bulles, réponses rapides, gestes), sans série de jours, points, classement ni fil public |
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
| EC-09 | Quand préfères-tu noter ? |
| EC-10 | Sauvegarde |
| EC-11 | Code |
| EC-13 | Ajout rapide |
| EC-14 | Choix de la catégorie |
| EC-15 | Autre date |
| EC-16 | Plusieurs dates |
| EC-17 | Historique |
| EC-18 | Détail d'une saisie |
| EC-19 | Bilan : compter |
| EC-20 | Bilan : écart |
| EC-21 | Bilan : résultat |
| EC-22 | Transfert entre poches |
| EC-23 | Mon horizon |
| EC-24 | D'où vient ce chiffre |
| EC-27 | Mes pots |
| EC-35 | Partager |
| EC-37 | Menu |
| EC-40 | Mon rituel et alertes |
| EC-43 | Ce que l'app a appris |
| EC-44 | Mes natures |
| EC-49 | Reprendre |
| EC-50 | Mon statut |
| EC-51 | Déverrouillage |
| EC-52 | Sécurité |

#### Parcours

- PC-01 Premier lancement jusqu'au premier horizon · L1
- PC-02 Noter en temps réel · L1
- PC-05 Bilan du soir · L1
- PC-06 Plusieurs saisies le soir · L1
- PC-07 Retrait Mixx vers les espèces · L1
- PC-09 Recevoir un revenu · L1
- PC-16 Nouveau téléphone · L1
- PC-19 Revenir après une absence · L1
- PC-20 Faire le point sur son mois · L1
- PC-21 Voir mon statut du jour · L1, son en L2

<!-- annexe:fin -->
