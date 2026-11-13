# EC-23 Mon horizon

| Fiche | |
| --- | --- |
| **Parcours** | PC-11, PC-12, PC-13, PC-15 |
| **Lot** | L1 |
| **Bible** | PRV-03, PRV-04, PRV-05, PRV-06, PRV-15, MSG-03, ONB-05 |
| **Avant** | Onglet Horizon, EC-12, notification de découvert |
| **Après** | EC-24, EC-25, EC-26, EC-41 |
| **Cadre** | 360 × 800 dp, portrait, marges de 16 dp |

<!-- fiche-autonome:debut -->
**Fiche autonome.** Ce fichier suffit pour finir cet écran, sans aucun autre document. Les sections numérotées décrivent l'écran ; l'annexe en bas donne la philosophie de BankVi, le design system, les composants utilisés, le contexte produit et les critères de fin. Pour cet écran, les sections numérotées priment sur l'annexe.
<!-- fiche-autonome:fin -->

## 1. Rôle

Répondre à « où en serai-je dans quelques jours, une semaine, un mois ? » d'un seul regard. C'est le cœur du produit.

## 2. Ce qu'on voit

En haut, un choix : 30 jours ou 90 jours. Trois blocs gris pâle donnent la réponse directe : dans 3 jours, dans 7 jours, dans 30 jours, avec le solde prévu et la date. Dessous, la courbe : elle descend en petites marches, saute au salaire, et reste en pointillés car c'est du prévu. Une ligne écrit ce qu'elle suppose. Puis la liste de ce qui arrive : les charges et les revenus. Au-dessus des onglets, le bouton vert « Puis-je me permettre ça ? », à côté de « Événement » ; une fois les essais offerts utilisés sans pass, c'est « Événement » qui passe en vert.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ Mon horizon                        │ 56
│ ( ✓ 30 jours  |   90 jours  )      │ 40
│ ┌────────┐ ┌────────┐ ┌────────┐   │
│ │Dans 3 j│ │Dans 7 j│ │Dans 30 j│  │
│ │ 80 400 │ │ 67 600 │ │ 50 400 │   │ 80
│ │FCFA · 9│ │FCFA ·13│ │FCFA · 6│   │
│ └────────┘ └────────┘ └────────┘   │
│ Ton argent prévu                   │ 24
│ 100 000 ─────────────────╴╴─────   │
│ ●╴╴╴                    ┆  ╴╴╴     │
│ 50 000 ──╴╴╴─────────────┆─────╴╴  │ 200
│             ╴╴╴╴·╴╴╴╴·╴╴╴┆         │
│ 0 ───────────────── 4 800 ──────── │
│ 6 nov.       21 nov.       6 déc.  │
│ Si tu dépenses ton chiffre chaque  │ 32
│ jour. Le prévu n'est pas certain.  │
│ À venir                            │ 16
│ ϟ Électricité · le 15     −8 000   │ 56
├────────────────────────────────────┤
│ ( + Événement ) ( Puis-je… ça ? )  │ 64
├────────────────────────────────────┤
│  Aujourd'hui ◉Horizon  Pots  Plus  │ 64
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut, titre seul | 56 dp | 0 |
| Choix 30 ou 90 jours | 40 dp | 12 dp |
| Trois repères, largeur égale, écart 8 dp | 80 dp | 16 dp |
| Bandeau de manque, s'il y en a un | Selon le texte | 12 dp |
| Titre du graphique | 24 dp | 8 dp |
| Courbe | 200 dp | 8 dp |
| Hypothèse | 32 dp | 16 dp |
| Titre « À venir » | 16 dp | 8 dp |
| Lignes d'événement | 56 dp chacune | 12 dp en bas |
| Barre d'action, fixe | 64 dp | 0 |
| Barre du bas, fixe | 64 dp | — |

Tout défile entre la barre du haut et la barre d'action.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Mon horizon | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Choix | 30 jours, 90 jours | 40 dp, pilule, Roboto 14/20 sp, Medium (500) | Choisi : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre. Repos : contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Échéance du repère | Dans 7 jours | Roboto 12/16 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Solde du repère | 67 600 | Roboto 16/24 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Unité et date | FCFA · 13 nov. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bloc repère | — | Rayon 12 dp, contour 1 dp, marges 8 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre, contour `#7A8A94` en clair, `#667781` en sombre |
| Bloc choisi | — | Curseur placé sur la courbe, contour 2 dp | Fond `#D8FDD2` en clair, `#103529` en sombre, contour `#008069` en clair, `#25D366` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Titre du graphique | Ton argent prévu | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Courbe, prévu | — | 2 dp, pointillés 6 et 4 dp, bouts ronds | `#008069` en clair, `#25D366` en sombre |
| Courbe, réel | — | 2 dp plein, pour les 7 derniers jours s'ils existent | `#008069` en clair, `#25D366` en sombre |
| Lavis | — | Sous la courbe | `rgba(0,128,105,0.10)` en clair, `rgba(37,211,102,0.10)` en sombre |
| Grille | — | Horizontale, 1 dp plein | `#E9EDEF` en clair, `#2A3942` en sombre |
| Ligne du zéro | — | 1 dp plein | `#7A8A94` en clair, `#667781` en sombre |
| Point d'aujourd'hui | — | 8 dp, anneau de 2 dp couleur du fond | `#008069` en clair, `#25D366` en sombre |
| Point d'événement | — | 8 dp, anneau de 2 dp couleur du fond, zone tactile de 48 dp | `#008069` en clair, `#25D366` en sombre |
| Axes | 0, 50 000, 100 000 ; 6 nov., 21 nov., 6 déc. | Roboto 12/16 sp, Regular (400), tabulaire | `#667781` en clair, `#8696A0` en sombre |
| Étiquettes directes, 3 au plus | 90 000 ; 4 800 ; +120 000 | Roboto 12/16 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Hypothèse | Si tu dépenses ton chiffre chaque jour. Le prévu n'est pas certain. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Titre de liste | À venir | Roboto 12/16 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Avatar d'événement | Icône de la catégorie | 40 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre, icône `#54656F` en clair, `#AEBAC1` en sombre |
| Nom | Électricité | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Date | le 15 | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Montant | −8 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire, à droite ; `+` pour une entrée | `#111B21` en clair, `#E9EDEF` en sombre |
| Barre d'action | — | 64 dp | Fond `#FFFFFF` en clair, `#0B141A` en sombre, trait `#E9EDEF` en clair, `#2A3942` en sombre |
| Bouton à contour | Événement, icône `add` | 48 dp, pilule, 40 % | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Puis-je me permettre ça ? | 48 dp, pilule, 60 %, Roboto 14/20 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Onglet actif | Horizon, icône `show_chart` | Pastille 56 × 32 dp | Pastille `#D8FDD2` en clair, `#103529` en sombre, icône `#0A3D2E` en clair, `#D9FDD3` en sombre |

**Liste de Camille :** Électricité −8 000, le 15 ; Tontine −10 000, le 20 ; Salaire +120 000, le 28 ; École −25 000, le 3 décembre ; Loyer −35 000, le 5 décembre.

## 6. États

| État | Affichage |
| --- | --- |
| 30 jours | Axe du 6 nov. au 6 déc. ; domaine de 0 à 125 000 |
| 90 jours, avec pass | Axe du 6 nov. au 4 févr., repères : 6 nov., 21 déc., 4 févr. Point bas : 1 600 FCFA, le 27 janv. Les trois repères ne changent pas |
| 90 jours, sans pass | Le segment reste visible et porte « Pass Plus » en Roboto 12/16 sp, Regular (400). Le toucher ouvre EC-41. La courbe reste sur 30 jours |
| Argent qui manque | Bandeau d'attention, voir plus bas |
| Avec du réel | Les 7 derniers jours en trait plein, à gauche d'aujourd'hui |
| Revenu variable | Courbe sans saut ; hypothèse : « Si tu dépenses ton chiffre chaque jour, et si tu gagnes au moins 90 000 FCFA par mois. Le prévu n'est pas certain. » |
| Depuis la notification de découvert | L'écran s'ouvre avec le curseur sur la date concernée |
| Aucun événement | Sous « À venir » : « Ajoute une charge ou un revenu pour affiner ta courbe. » |
| Hors ligne | Identique : tout est calculé sur le téléphone. L'alerte de découvert reste gratuite |

### Barre d'action selon le pass

| Situation | Bouton vert, 60 % | Bouton à contour, 40 % |
| --- | --- | --- |
| Avec le pass | Puis-je me permettre ça ? | Événement |
| Sans pass, essais restants | Puis-je me permettre ça ?, avec « 3 essais offerts » dessous en Roboto 12/16 sp | Événement |
| Sans pass, essais utilisés | Événement, 40 % | Puis-je me permettre ça ?, avec « Pass Plus » dessous, 60 % |

Un seul bouton reste vert, et chaque bouton vert fait une action réelle.

### Argent qui manque

Exemple : 9 500 FCFA aujourd'hui, 18 000 FCFA de charges d'ici le 28.

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Bandeau | Il pourrait manquer 8 500 FCFA le 20. | Rayon 8 dp, marges 12 dp, icône `warning` de 20 dp, Roboto 14/20 sp, Regular (400) | Fond `#FFF3D6` en clair, `#3A2C10` en sombre, texte `#8A4B00` en clair, `#FFD27A` en sombre |
| Repère négatif, si un repère passe sous zéro | Il manquerait / 4 000 / FCFA · 24 nov. | Même bloc, Roboto 16/24 sp, Medium (500) | Fond `#FFF3D6` en clair, `#3A2C10` en sombre, texte `#8A4B00` en clair, `#FFD27A` en sombre |
| Courbe sous zéro | — | Zone sous la ligne du zéro, étiquette « −8 500 » | Zone `rgba(138,75,0,0.12)` en clair, `rgba(255,210,122,0.14)` en sombre, trait `#008069` en clair, `#25D366` en sombre |
| Hypothèse | Sans autre dépense. Le prévu n'est pas certain. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |

Jamais de rouge, jamais de nombre négatif seul dans un repère, jamais de conseil.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher un repère | Le curseur se place sur cette date, avec l'info-bulle |
| Toucher de nouveau | Enlève le curseur |
| Appui long sur un repère | EC-24, pour ce solde |
| Glisser sur la courbe | Ligne verticale de 1 dp `#7A8A94` en clair, `#667781` en sombre, point de 8 dp, info-bulle : « 15 nov. · 53 200 FCFA », puis « Électricité −8 000 FCFA » |
| Toucher l'info-bulle | EC-24, pour ce solde |
| Toucher une ligne d'événement | Ponctuel : EC-26. Récurrent : EC-39 |
| « Puis-je me permettre ça ? » | Avec le pass ou un essai restant : EC-25. Sinon : la description d'EC-25, qui renvoie à EC-41 |
| « Événement » | EC-26 |
| Onglets | Change d'onglet |
| Retour | EC-12 |

## 8. Données

| Valeur | Règle |
| --- | --- |
| Point de la courbe | Solde du matin, après les événements du jour |
| Dépense supposée | Chaque jour, le chiffre du jour ; à la date de référence, un nouveau rythme pour le cycle suivant |
| Repère | Le point de la courbe à J+3, J+7, J+30. Toujours gratuit |
| Recalcul | Après chaque saisie ou comptage, sans action de l'utilisateur |

**Points de Camille sur 30 jours :** 90 000 le 6 nov. ; 80 400 le 9 ; 67 600 le 13 ; 53 200 le 15 ; 27 200 le 20 ; 4 800 le 27 ; 121 600 le 28 ; 89 600 le 3 déc. ; 51 800 le 5 ; 50 400 le 6.

## 9. Accessibilité

Repères : « Dans 7 jours, le 13 novembre, 67 600 francs CFA prévus. » Graphique : « Ton argent prévu sur 30 jours. 90 000 francs aujourd'hui, 4 800 au plus bas le 27 novembre, 121 600 après ton salaire du 28, 50 400 le 6 décembre. » Le glissement a son équivalent dans les repères et la liste. Le prévu n'est pas porté par les seuls pointillés : le titre et l'hypothèse le disent.

## 10. Mouvement

La courbe se trace une fois, en 300 ms, à la première ouverture du jour. Le passage de 30 à 90 jours se fait en fondu de 200 ms. Le chiffre ne défile jamais.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Courbe à 150 dp ; la liste passe sous le pli |
| 320 × 568 dp | Courbe à 130 dp ; marges de 16 dp ; repères à 96 dp |
| Texte à 200 % | Repères empilés, en lignes ; boutons de la barre d'action empilés |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`horizon_viewed`, avec la durée choisie ; `horizon_marker_tapped`, avec le repère ; `horizon_scrubbed`. C'est l'étoile polaire : actifs qui consultent leur prévision chaque semaine. **Aucun montant.**

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

- **Contenu :** trois repères au-dessus de la courbe : « Dans 3 jours », « Dans 7 jours », « Dans 30 jours », chacun avec sa date et son solde prévu ; courbe du solde projeté ; événements ; choix 30 ou 90 jours ; date du premier manque s'il y en a un. Le prévu se distingue du réel.
- **Repères :** toujours gratuits, quelle que soit la durée affichée. Toucher un repère place le curseur de la courbe sur cette date. Si le solde prévu est négatif : « Il manquerait 4 000 FCFA », jamais un chiffre négatif seul.
- **Action principale :** « Puis-je me permettre ça ? », dans la barre d'action fixe, avec le pass ou tant qu'il reste des essais offerts ; sinon « Événement ».
- **Autres :** l'autre bouton, à côté, à contour.
- **État sans pass :** 90 jours visible, description du Pass Plus au toucher (EC-41).
- **Bible :** PRV-03, PRV-04, PRV-05, PRV-06, PRV-15, MSG-03, ONB-05.

#### PC-11 Consulter l'horizon · L1

1. **EC-23** Courbe à 30 jours, avec les événements à venir, et le solde prévu dans 3, 7 et 30 jours.
2. **EC-24** Le toucher d'un chiffre en montre l'origine.
3. **EC-26** Il ajoute un événement ponctuel : tontine, frais d'école.
4. **90 jours :** réservé au Pass Plus (voir PC-15).

#### PC-12 « Puis-je me permettre ça ? » · L1

1. **EC-23** Il touche « Puis-je me permettre ça ? ».
2. **EC-25** Il indique le montant ; la date par défaut est aujourd'hui.
3. L'app affiche la conséquence : « Il te resterait 2 500 FCFA par jour jusqu'au 28 » ou « Il manquerait 8 000 FCFA le 20 ».
4. C'est une simulation, rien n'est enregistré. « L'ajouter à mes prévus » reste possible.

#### PC-13 Alerte de découvert · L1

1. Une saisie ou un comptage fait passer la projection sous zéro.
2. La notification indique : « Il pourrait manquer 8 500 FCFA le 20 ». Elle est toujours gratuite.
3. Le toucher ouvre **EC-23**, sur la date concernée.

#### PC-15 Acheter le Pass Plus · L1 pour la prévente, L2 pour le reste

1. **EC-41** Il voit le contenu et le prix, et lit « Le Pass Plus s'achète sur bankvi.tg ». L'écran ne contient **aucun lien ni bouton d'achat**.
2. Il ouvre lui-même son navigateur : **W-01**, connexion par son numéro.
3. **W-02** Il choisit 30 jours ou 1 an.
4. **W-03** Il paie via FedaPay.
5. **W-04** Confirmation : « Retourne dans l'app ».
6. **EC-41** affiche « Pass actif jusqu'au 6 décembre » à la prochaine synchronisation, sur tous ses appareils.

**Fin de pass :** un rappel sans fausse urgence, et la bascule vers le gratuit ne supprime aucune donnée. Les recettes en trop restent lisibles, mais une seule reste active.

#### Décisions déjà prises pour cet écran

| Point | Décision |
| --- | --- |
| Bouton vert et Pass Plus | **Validé :** 3 simulations offertes. Ensuite, « Événement » passe en vert, et « Puis-je me permettre ça ? » à contour, marqué « Pass Plus » |
| Passé sur la courbe | **Validé :** Les 7 derniers jours en trait plein, s'ils existent ; le prévu en pointillés |
| Événements sur la courbe | **Validé :** Un point de 8 dp sur la courbe par événement, sans texte ; le détail est dans la liste et au toucher |
| Revenu variable | **Validé :** Le montant attendu est réparti par jour, sans point d'événement ; la bulle dit « au moins » |
| Modifier un événement | **Validé :** Toucher une ligne rouvre EC-26, avec « Supprimer » et « Annuler » |

```text
Onglet Horizon, notification de découvert
                │
                ▼
        EC-23 Mon horizon ─┬─ un chiffre ──────────► EC-24 D'où vient ce chiffre
                           ├─ Puis-je me permettre ► EC-25 (pass ou essai) ou sa description
                           ├─ Ajouter un événement ► EC-26 Événement à venir
                           └─ 90 jours, sans pass ─► EC-41 Pass Plus
```

#### Chiffres d'exemple

Date de référence : **vendredi 6 novembre 2026**. Camille : 90 000 FCFA aujourd'hui, 3 200 FCFA par jour jusqu'au 28.

| Valeur | Résultat |
| --- | --- |
| Dans 3 jours, le 9 nov. | 80 400 FCFA |
| Dans 7 jours, le 13 nov. | 67 600 FCFA |
| Dans 30 jours, le 6 déc. | 50 400 FCFA |
| Point bas sur 30 jours | 4 800 FCFA, le 27 nov. |
| Après le salaire du 28 nov. | 121 600 FCFA, puis 1 400 FCFA par jour |
| Point bas sur 90 jours | 1 600 FCFA, le 27 janvier |
| Dans 90 jours, le 4 février | 86 100 FCFA |

Situation de manque, avec 9 500 FCFA aujourd'hui : 1 500 FCFA le 15 nov., puis −8 500 FCFA le 20 nov.

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
| Manque d'argent | `warning` |
| Horizon (onglet) | `show_chart` |

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

#### Barre du haut

| Attribut | Valeur |
| --- | --- |
| Hauteur | 56 dp |
| Fond | `#FFFFFF` en clair, `#0B141A` en sombre, sans ombre ni trait au repos ; 1 dp `#E9EDEF` en clair, `#2A3942` en sombre dessous si le contenu défile |
| Icône retour | `arrow_back`, 24 dp, `#111B21` en clair, `#E9EDEF` en sombre, zone de 48 dp, à 4 dp du bord gauche |
| Titre | Roboto 22/28 sp, Medium (500), `#111B21` en clair, `#E9EDEF` en sombre, à gauche, une ligne avec coupure en fin |
| Actions | 2 icônes au plus, à droite |

Dans le parcours de premier lancement, la barre ne porte en général que le retour : la question fait office de titre.

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

#### Bandeau d'état

Message fixe, en haut d'un contenu.

| Variante | Fond | Texte et icône |
| --- | --- | --- |
| Attention | `#FFF3D6` en clair, `#3A2C10` en sombre | `#8A4B00` en clair, `#FFD27A` en sombre, `warning` |
| Erreur | `#FBE9E7` en clair, `#3C1F1E` en sombre | `#B3261E` en clair, `#F2B8B5` en sombre, `error` |
| Information | `#E3F0FB` en clair, `#10283F` en sombre | `#0B5CAD` en clair, `#A8D4FF` en sombre, `info` |

Rayon 8 dp, marges de 12 dp, icône de 20 dp, texte Roboto 14/20 sp, Regular (400). Il ne contient pas plus de deux lignes.

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

#### Repères d'horizon

Trois blocs côte à côte au-dessus de la courbe, de largeur égale, avec 8 dp d'écart. Ils lisent la courbe à une date précise, sans glisser le doigt.

| Élément | Exemple | Style |
| --- | --- | --- |
| Échéance | Dans 7 jours | Roboto 12/16 sp, Medium (500), `#54656F` en clair, `#AEBAC1` en sombre |
| Solde prévu | 67 600 | Roboto 16/24 sp, Medium (500), chiffres tabulaires, `#111B21` en clair, `#E9EDEF` en sombre |
| Unité et date | FCFA · 13 nov. | Roboto 12/16 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Bloc | — | Fond `#F0F2F5` en clair, `#111B21` en sombre, contour de 1 dp `#7A8A94` en clair, `#667781` en sombre, rayon 12 dp, marges 8 dp, zone tactile de 48 dp au moins |
| Bloc sélectionné | — | Fond `#D8FDD2` en clair, `#103529` en sombre, contour de 2 dp `#008069` en clair, `#25D366` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Manque | Il manquerait / 4 000 / FCFA · 24 nov. | Texte `#8A4B00` en clair, `#FFD27A` en sombre, fond `#FFF3D6` en clair, `#3A2C10` en sombre, icône `warning` de 16 dp |

« FCFA » passe sous le nombre, car un bloc ne fait que 104 dp de large. Le chiffre héros reste unique : ces soldes restent en 16 sp. À 200 % de texte, les blocs s'empilent. TalkBack lit : « Dans 7 jours, le 13 novembre, 67 600 francs CFA prévus. »

#### Choix à deux segments

Pour deux modes exclusifs d'un même écran : Dépense ou Revenu, Jours ou Période.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 40 dp, zone tactile 48 dp |
| Forme | Pilule, contour de 1 dp `#7A8A94` en clair, `#667781` en sombre |
| Segment choisi | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre, icône `check` de 18 dp |
| Segment au repos | Transparent, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Texte | Roboto 14/20 sp, Medium (500) |

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
| MSG-03 | Alerte de découvert prévu, jamais derrière le pass |
| ONB-05 | Palier 3 : pots, « Puis-je me permettre ça ? » |
| PRV-01 | Écran d'ouverture « Aujourd'hui » : ce que je peux dépenser, en 0 tap |
| PRV-03 | « Mon horizon » à 30 jours ; la courbe suppose qu'on dépense son chiffre du jour, avec un nouveau rythme après la date de référence, et l'écran l'écrit |
| PRV-04 | « Mon horizon » à 90 jours |
| PRV-05 | Événements à venir sur la ligne du temps |
| PRV-06 | Recalcul après chaque saisie ou comptage |
| PRV-15 | Repères du solde prévu dans 3, 7 et 30 jours sur « Mon horizon » |
| SAI-20 | Champ de saisie façon message, en texte libre (« salaire 200000 », « jus 100 », « déplacement 1500 ») : revenu ou dépense, montant et catégorie déduits par un analyseur déterministe ; aperçu en bulle, puis « Annuler » |
| SAI-27 | Saisies affichées comme une conversation : dépenses en messages sortants, à droite ; revenus en messages entrants, à gauche ; comptages, transferts et « Non détaillé » en repères neutres, au centre |
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
| EC-24 | D'où vient ce chiffre |
| EC-25 | Puis-je me permettre ça ? |
| EC-26 | Événement à venir |
| EC-35 | Partager |
| EC-37 | Menu |
| EC-39 | Revenus et charges |
| EC-40 | Mon rituel et alertes |
| EC-41 | Pass Plus |
| EC-50 | Mon statut |
| EC-51 | Déverrouillage |
| EC-52 | Sécurité |
| W-01 | Connexion |
| W-02 | Offres |
| W-03 | Paiement |
| W-04 | Confirmation |

#### Parcours

- PC-11 Consulter l'horizon · L1
- PC-12 « Puis-je me permettre ça ? » · L1
- PC-13 Alerte de découvert · L1
- PC-15 Acheter le Pass Plus · L1 pour la prévente, L2 pour le reste

<!-- annexe:fin -->
