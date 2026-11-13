# EC-31 Catalogue

| Fiche | |
| --- | --- |
| **Parcours** | PC-14 |
| **Lot** | L1 |
| **Bible** | REC-02, REC-09 |
| **Avant** | EC-30 |
| **Après** | EC-08 ; EC-33 en L2 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

<!-- fiche-autonome:debut -->
**Fiche autonome.** Ce fichier suffit pour finir cet écran, sans aucun autre document. Les sections numérotées décrivent l'écran ; l'annexe en bas donne la philosophie de BankVi, le design system, les composants utilisés, le contexte produit et les critères de fin. Pour cet écran, les sections numérotées priment sur l'annexe.
<!-- fiche-autonome:fin -->

## 1. Rôle

Comparer les recettes en voyant leurs pots exacts et leur source, jamais seulement un nom.

## 2. Ce qu'on voit

Quatre cartes empilées. Chacune a son nom, sa fine barre colorée, la liste de ses pots avec les pourcentages, et sa source. La recette active porte une marque. Toucher une carte ouvre son aperçu en francs CFA.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Catalogue                       │ 56
│ ┌────────────────────────────────┐ │
│ │ 70 / 20 / 10         [Active]  │ │
│ │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬ ▬▬▬   │ │ 144
│ │ ● Vie courante 70 %            │ │
│ │ ● Épargne 20 %                 │ │
│ │ ● Dettes ou dons 10 %          │ │
│ │ Guides de budget grand public  │ │
│ └────────────────────────────────┘ │
│ ┌────────────────────────────────┐ │
│ │ 50 / 30 / 20                   │ │
│ │ ▬▬▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬▬ ▬▬▬▬▬    │ │ 144
│ │ ● Besoins 50 %                 │ │
│ │ ● Envies 30 %                  │ │
│ │ ● Épargne et dettes 20 %       │ │
│ │ Elizabeth Warren               │ │
│ └────────────────────────────────┘ │
│ ┌ Payez-vous d'abord … ───────────┐│
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Carte, 3 pots | 144 dp | 12 dp |
| Carte, 2 pots | 124 dp | 12 dp |

Les cartes défilent. Il n'y a ni barre du bas ni bouton principal.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Catalogue | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Carte | — | Rayon 12 dp, marges 16 dp, contour 1 dp | Fond `#FFFFFF` en clair, `#202C33` en sombre, contour `#7A8A94` en clair, `#667781` en sombre |
| Nom | 70 / 20 / 10 | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Marque | Active | Roboto 12/16 sp, Medium (500), rayon 4 dp | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Barre | — | 8 dp, trou de 2 dp | `#008069` en clair, `#00A884` en sombre, `#D97A00` en clair, `#C47F00` en sombre, `#7F66FF` en clair, `#8B75FF` en sombre |
| Pastille | — | 12 dp | Couleur du pot |
| Pot | Vie courante 70 % | Roboto 14/20 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Source | Guides de budget grand public | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |

## 6. Contenu

| Recette | Pots exacts | Source |
| --- | --- | --- |
| 50 / 30 / 20 | Besoins 50 %, Envies 30 %, Épargne et dettes 20 % | Elizabeth Warren |
| 70 / 20 / 10 | Vie courante 70 %, Épargne 20 %, Dettes ou dons 10 % | Guides de budget grand public (Thrivent, The Penny Hoarder) |
| Payez-vous d'abord | Épargne 20 %, prélevée en premier ; Libre 80 % | Guides de budget grand public (Thrivent, The Penny Hoarder) |
| Revenu plancher prudent | Vie courante 70 %, Imprévus 20 %, Épargne 10 %, sur le plancher ; le surplus va dans « Le reste » | Méthode pour revenus irréguliers, adaptée par BankVi |

L'ordre est fixe. Aucun tri, aucune recommandation, aucune note : la proposition selon la situation appartient à EC-07.

## 7. États

| État | Affichage |
| --- | --- |
| Recette active | Marque « Active », à sa place dans l'ordre |
| Recette ajustée active | Une carte en tête : Ma recette, d'après 70 / 20 / 10 |
| L2, avec le pass | Lien sous les cartes : « Écrire une recette » |
| L2, sans pass | Le même lien, avec la marque « Pass Plus » : il décrit la fonction |
| Hors ligne | Identique : le catalogue est dans l'app |

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une carte | EC-08, aperçu sur ses chiffres |
| « Écrire une recette », L2 | EC-33 |
| Retour | EC-30 |

Budget : adopter une recette tient en 3 taps depuis Ma recette (« Changer », une carte, « Adopter »).

## 9. Données

Le catalogue est un jeu de 4 recettes en données, validé par un schéma. Elles ne dépendent d'aucun réseau.

## 10. Accessibilité

Chaque carte est un bouton : « 70 / 20 / 10, active. Vie courante 70 %, Épargne 20 %, Dettes ou dons 10 %. Source : guides de budget grand public. » La barre est ignorée.

## 11. Mouvement

Entrée d'écran standard, sans autre animation.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp ; la marque passe sous le nom |
| Texte à 200 % | Cartes plus hautes |
| Thème sombre | Valeurs ci-dessus |

## 13. Mesure

`catalog_viewed`, `catalog_recipe_opened`, avec l'identifiant et la position. **Aucun montant.**

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

- **Contenu :** 50/30/20, 70/20/10, payez-vous d'abord, revenu plancher prudent ; pour chacune, pots exacts et source.
- **Action :** toucher ouvre EC-08.
- **Bible :** REC-02, REC-09.

#### PC-14 Changer de recette · L1 et L2

1. **EC-30** Recette active, avec ses pots exacts.
2. **EC-31** Catalogue de 4 recettes (L1).
3. **EC-08** Aperçu en FCFA, puis « Adopter cette recette ». Rien n'est à recatégoriser.
4. **EC-32** Il duplique une recette et ajuste les pourcentages, dont la somme reste à 100 % (L1).
5. **EC-33** Il écrit une phrase : « 45 / 25 / 25 / 5 » (L2, Pass Plus).
6. **EC-34** L'app signale les natures qu'aucun pot ne lit, et il les range.

```text
Onglet Pots ► EC-27 Mes pots ─┬─ un pot ───────────► EC-28 Détail d'un pot
                              ├─ Ajouter un pot ───► EC-29 Ajouter un pot
                              └─ en-tête recette ──► EC-30 Ma recette ─┬► EC-31 Catalogue ─► EC-08 Aperçu
                                                                       ├► EC-32 Ajuster
                                                                       └► EC-35 Partager (L2)
EC-31 ─► EC-33 Écrire une recette (L2, Pass Plus)
Toute recette nouvelle ─► EC-34 Natures non rangées, si besoin
Lien reçu ─► EC-36 Recette reçue (L2) ─► EC-08 Aperçu
```

#### Comment fonctionnent les pots

Les pots sont **virtuels** : l'argent reste dans les poches réelles (espèces, Mixx, Flooz). Un pot sert de repère et **ne bloque jamais une dépense**.

| Moment | Ce qui se passe |
| --- | --- |
| Adoption d'une recette | Rien ne bouge. Les pots se rempliront au prochain revenu, ou à partir du 1er du mois suivant si le revenu est variable |
| Revenu reçu | Le montant est réparti selon la recette, avec « Annuler ». Ce qui restait avant le revenu va dans le pot du quotidien |
| Dépense | Elle réduit le pot qui lit sa nature |
| Non détaillé | Il réduit le pot du quotidien |

**Pot du quotidien :** Vie courante, Besoins et Envies, ou Libre, selon la recette. Les autres pots sont **réservés** : ce qu'ils contiennent sort du chiffre du jour.

#### Chiffres d'exemple

Camille a adopté 70 / 20 / 10 le 6 novembre et reçu son salaire le 28. Date de l'exemple : **dimanche 6 décembre 2026**.

| Pot | Cible | Reste aujourd'hui |
| --- | --- | --- |
| Vie courante | 84 000 FCFA | 24 000 FCFA, dont 18 000 FCFA de charges à venir |
| Épargne | 24 000 FCFA | 24 000 FCFA |
| Dettes ou dons | 12 000 FCFA | 12 000 FCFA |
| **Total** | 120 000 FCFA | **60 000 FCFA**, égal à ses soldes |

**Calcul.** Au 28 novembre, il restait 1 600 FCFA avant le salaire, ajoutés au quotidien : 85 600 FCFA. École et Loyer : −60 000. Huit jours à 200 FCFA : −1 600. Reste : 24 000 FCFA.

**Chiffre du jour :** (60 000 − 18 000 − 36 000 réservés) ÷ 22 = 272, arrondi à **200 FCFA**. Si elle déplace 12 000 FCFA d'Épargne vers Vie courante : 818, arrondi à **800 FCFA**.

##### Effet de chaque recette sur le rythme de Camille, après le salaire

(121 600 − 78 000 de charges − réservé) ÷ 30 jours.

| Recette | Réservé | Par jour |
| --- | --- | --- |
| Sans recette | 0 | 1 400 FCFA |
| 50 / 30 / 20 | 24 000 | 600 FCFA |
| Payez-vous d'abord | 24 000 | 600 FCFA |
| **70 / 20 / 10**, la plus proche selon la règle actuelle | 36 000 | **200 FCFA** |

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

#### Palette des pots

Six couleurs, attribuées dans l'ordre des pots d'une recette : Lagune (`#0E6BA8`), Ocre (`#B85A00`), Indigo (`#6B52E0`), Émeraude (`#0D7A5F`), Hibiscus (`#C84374`) et Or bronze (`#826E18`). Au-delà de six pots, les suivants prennent le gris `#7A6D65` en clair, `#728399` en sombre et s'affichent par leur nom dans la liste, sans teinte nouvelle.

Chaque segment de la barre des pots porte un trou de 2 dp entre segments et le nom de chaque pot est écrit dans la liste.

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

#### Barre du haut

| Attribut | Valeur |
| --- | --- |
| Hauteur | 56 dp |
| Fond | `#FAF7F2` en clair, `#0D1520` en sombre, sans ombre ni trait au repos ; 1 dp `#E3DCD2` en clair, `#26384F` en sombre dessous si le contenu défile |
| Icône retour | `arrow_back`, 24 dp, `#1C1613` en clair, `#F5F0EB` en sombre, zone de 48 dp, à 4 dp du bord gauche |
| Titre | Roboto 22/28 sp, Medium (500), `#1C1613` en clair, `#F5F0EB` en sombre, à gauche, une ligne avec coupure en fin |
| Actions | 2 icônes au plus, à droite |

Dans le parcours de premier lancement, la barre ne porte en général que le retour : la question fait office de titre.

#### Barre de navigation du bas

Présente sur les écrans principaux seulement, jamais pendant une tâche ni au premier lancement.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 64 dp, plus la barre système |
| Fond | `#FAF7F2` en clair, `#0D1520` en sombre, trait du haut 1 dp `#E3DCD2` en clair, `#26384F` en sombre |
| Onglets | Quatre, dans cet ordre et sans jamais bouger : Aujourd'hui, Horizon, Pots, Plus |
| Icône inactive | Contour, 24 dp, `#5C514B` en clair, `#B8AFA8` en sombre |
| Icône active | Pleine, `#5E1D0E` en clair, `#FDE5DA` en sombre, sur une pastille de 56 × 32 dp en `#F9DFD3` en clair, `#4D2318` en sombre, en pilule |
| Libellé | Roboto 12/16 sp, Medium (500) ; inactif `#5C514B` en clair, `#B8AFA8` en sombre ; actif `#1C1613` en clair, `#F5F0EB` en sombre |
| Changement d'onglet | Pastille en fondu, 100 ms, sans glissement d'écran |

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

#### Carte

Fond `#FFFFFF` en clair, `#172436` en sombre, rayon 14 dp, marges intérieures de 16 dp, contour de 1 dp `#E3DCD2` en clair, `#26384F` en sombre sans ombre. Une seule carte d'information à la fois sur un écran principal (UX).

#### Barre des pots

Une barre segmentée fine montre le partage d'un tout.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 8 dp |
| Bouts | Arrondis aux deux extrémités |
| Largeur des segments | Proportionnelle au pourcentage |
| Séparation | Trou de 2 dp de la couleur du fond, jamais de contour |
| Couleurs | Dans l'ordre : `#0E6BA8` en clair, `#4DA8DA` en sombre, `#C86400` en clair, `#E58E26` en sombre, `#B83B20` en clair, `#F07B5A` en sombre, `#6C4AB6` en clair, `#9D7CE8` en sombre, `#1F7A4C` en clair, `#42A873` en sombre, `#8C6D1F` en clair, `#B89635` en sombre |
| Texte dans la barre | Aucun |
| Accompagnement | Toujours la liste des pots dessous, avec une pastille de 12 dp |
| Segment à 0 % | Non dessiné |
| TalkBack | La barre entière porte un nom : « Vie courante 70 %, Épargne 20 %, Dettes ou dons 10 % » |

#### Ligne de pot

Pastille de 12 dp de la couleur du pot, nom en Roboto 16/24 sp, Regular (400), pourcentage en Roboto 16/24 sp, Regular (400) chiffres tabulaires, puis montant à droite. Le texte reste en `#1C1613` en clair, `#F5F0EB` en sombre ou `#5C514B` en clair, `#B8AFA8` en sombre, jamais dans la couleur du pot.

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
| LEG-03 | Mention « outil d'information, ni conseil financier ni conseil comptable » |
| LEG-04 | Faits, règle de l'utilisateur et conséquence ; pas de « tu devrais », ni de produit financier recommandé |
| PRV-01 | Écran d'ouverture « Aujourd'hui » : ce que je peux dépenser, en 0 tap |
| REC-02 | Catalogue de 4 recettes : 50/30/20, 70/20/10, payez-vous d'abord, revenu plancher prudent |
| REC-09 | Toujours afficher les pots exacts d'une recette, avec sa source |
| UX-05 | Ouverture en moins de 2 s, cibles de 44 pt, usage à une main |
| VAL-06 | Test de la phrase de recette auprès de 8 à 10 testeurs |

#### Autres écrans

| Code | Écran |
| --- | --- |
| EC-01 | Bienvenue |
| EC-07 | La recette la plus proche |
| EC-08 | Aperçu d'une recette |
| EC-09 | Quand préfères-tu noter ? |
| EC-10 | Sauvegarde |
| EC-11 | Code |
| EC-27 | Mes pots |
| EC-28 | Détail d'un pot |
| EC-29 | Ajouter un pot |
| EC-30 | Ma recette |
| EC-32 | Ajuster |
| EC-33 | Écrire une recette |
| EC-34 | Natures non rangées |
| EC-35 | Partager |
| EC-36 | Recette reçue |
| EC-37 | Menu |
| EC-40 | Mon rituel et alertes |
| EC-50 | Mon statut |
| EC-51 | Déverrouillage |
| EC-52 | Sécurité |

#### Parcours

- PC-14 Changer de recette · L1 et L2

<!-- annexe:fin -->
