# W-03 Paiement

| Fiche | |
| --- | --- |
| **Parcours** | PC-15 |
| **Lot** | L1 |
| **Bible** | PAY-03, MES-03 |
| **Avant** | W-02 |
| **Après** | W-04 ; W-02 en cas d'échec |
| **Cadre** | Page de FedaPay, plus une page d'attente BankVi de 360 px de large d'abord |

<!-- fiche-autonome:debut -->
**Fiche autonome.** Ce fichier suffit pour finir cet écran, sans aucun autre document. Les sections numérotées décrivent l'écran ; l'annexe en bas donne la philosophie de BankVi, le design system, les composants utilisés, le contexte produit et les critères de fin. Pour cet écran, les sections numérotées priment sur l'annexe.
<!-- fiche-autonome:fin -->

## 1. Rôle

Encaisser sans que BankVi touche aux données de paiement : la saisie du paiement se fait chez FedaPay.

## 2. Ce qu'on voit

Une courte page d'attente BankVi : « On t'envoie vers FedaPay. » Puis la page de FedaPay, avec le montant et le moyen de paiement. Au retour, une page d'attente pendant la vérification, puis la confirmation.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ BankVi                             │ 56
│                                    │
│               ◌                    │ 40
│ On t'envoie vers FedaPay.          │ 24
│ 1 000 FCFA · Pass Plus 30 jours    │ 20
│                                    │
│ Ne ferme pas cette page.           │ 20
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| En-tête | 56 px | 32 px |
| Cercle de progression | 40 px, centré | 16 px |
| Texte | 24 px | 4 px |
| Rappel | 20 px | 24 px |
| Consigne | 20 px | — |

## 5. Éléments de la page d'attente

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Marque | BankVi | Roboto 18/24 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Cercle | — | 40 px, trait de 3 px | `#008069` en clair, `#25D366` en sombre |
| Texte | On t'envoie vers FedaPay. | Roboto 16/24 sp, Regular (400), centré | `#111B21` en clair, `#E9EDEF` en sombre |
| Rappel | 1 000 FCFA · Pass Plus 30 jours | Roboto 14/20 sp, Regular (400), tabulaire, centré | `#54656F` en clair, `#AEBAC1` en sombre |
| Consigne | Ne ferme pas cette page. | Roboto 12/16 sp, Regular (400), centré | `#54656F` en clair, `#AEBAC1` en sombre |

La page de FedaPay n'est pas dessinée ici. Elle suit l'apparence de FedaPay et ses règles. **Les moyens Mixx, Flooz et carte restent à confirmer par écrit (VAL-04).**

## 6. États

| État | Affichage |
| --- | --- |
| Après le paiement | On vérifie ton paiement. Cela peut prendre quelques instants. Sans bouton de paiement |
| Vérifié | W-04 |
| Interrompu | W-02 : Paiement interrompu. Rien n'a été débité. |
| Échoué | W-02 : Le paiement n'a pas abouti : [motif de FedaPay]. |
| Attente longue, plus de 2 minutes | Ton paiement n'est pas encore confirmé. Ne paie pas une deuxième fois. Tu seras prévenu dans l'app. Avec le bouton « Vérifier à nouveau » et le contact |
| Réseau coupé | Vérification au retour du réseau, jamais de nouveau débit |

## 7. Comportement

| Situation | Règle |
| --- | --- |
| Double clic ou retour navigateur | Une seule transaction par identifiant ; jamais de double débit |
| Confirmation | Par notification serveur de FedaPay, signature vérifiée. La page de retour ne suffit pas |
| Pass | Activé par le serveur seulement après confirmation |
| Rattachement au compte | Identifiant de compte transmis à la transaction, sans donnée financière |

## 8. Données

BankVi ne reçoit ni le numéro de carte, ni le code de mobile money. Il garde : compte, offre, montant, date, statut, référence FedaPay. Le numéro payeur est utilisé selon ce que FedaPay renvoie, seulement pour le reçu.

## 9. Accessibilité

Le texte d'attente est annoncé par `role="status"`. Le cercle est décoratif. Les messages d'état ne reposent pas sur la couleur.

## 10. Mouvement

Le cercle tourne lentement ; avec `prefers-reduced-motion`, il est remplacé par des points fixes et le texte seul.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 px | Texte sur deux lignes |
| Ordinateur | Colonne de 480 px |
| Thème sombre | Valeurs ci-dessus ; FedaPay garde son thème |

## 12. Mesure

`payment_redirected`, `payment_returned`, `payment_confirmed`, `payment_failed`, avec le motif. Abandon mesuré entre chaque étape. Sans donnée de paiement.

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

- **Contenu :** page FedaPay : mobile money ou carte.
- **État :** paiement interrompu ou échoué : retour à W-02 avec le motif, sans double débit.
- **Bible :** PAY-03, MES-03.

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
| **Grille FedaPay** | Mixx, Flooz et carte supposés au Togo ; opérateurs des 7 autres pays de l'UEMOA : **à confirmer par écrit** (VAL-04) |

```text
L'utilisateur ouvre lui-même son navigateur
W-01 Connexion ─► W-02 Offres ─► W-03 Paiement FedaPay ─► W-04 Confirmation
                       ▲               │
                       └── échec ──────┘
```

Le site est accessible en saisissant son adresse. « bankvi.tg » est un nom de travail : **le domaine reste à réserver**. L'app ne contient aucun lien vers lui.

#### Règles communes

| Règle | Valeur |
| --- | --- |
| Format | Une colonne, 480 px au plus, centrée, marges de 16 px ; pensé d'abord pour le téléphone |
| Thème | Selon le réglage du téléphone, mêmes jetons que l'app |
| Police | Pile système, sans téléchargement |
| Poids | 100 Ko au plus par page hors FedaPay ; réseau lent pris en compte |
| Sans | Bandeau publicitaire, traceurs, pop-up |
| Pied | BankVi · Conditions · Confidentialité · Contact |

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

#### Le site

Ces pages suivent le même design system, avec ces correspondances :

| Dans ce fichier | Sur le site |
| --- | --- |
| dp, sp | px, avec le même nombre |
| Roboto | Pile de polices système, sans téléchargement : Roboto sur Android |
| Icônes | Mêmes formes, en SVG intégré à la page, sans fichier de police |
| TalkBack | Le lecteur d'écran du navigateur |
| Retour Android | Le retour du navigateur |

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
| `pot.2` | `#D97A00` | `#C47F00` | Deuxième pot |
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
| **Dépense et revenu** | Même couleur de texte (`#111B21` en clair, `#E9EDEF` en sombre). Le signe et le libellé les distinguent. Un revenu peut s'écrire avec « + ». |
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

#### Règles

- Une icône seule a toujours un nom lu par TalkBack.
- Mixx et Flooz n'ont pas d'icône ni de logo : ce sont des marques tierces. Ils apparaissent en avatar à initiale.
- Pas d'émoji dans l'interface, y compris pour les drapeaux : l'indicatif s'écrit « +228 ».
- Pas d'icône de décoration à côté d'un titre.

### D. Composants de cet écran, et ceux qu'il peut ouvrir

#### Carte

Fond `#FFFFFF` en clair, `#202C33` en sombre, rayon 12 dp, marges intérieures de 16 dp, contour de 1 dp `#E9EDEF` en clair, `#2A3942` en sombre sans ombre. Une seule carte d'information à la fois sur un écran principal (UX).

#### Formats de montant

| Cas | Exemple |
| --- | --- |
| Standard | `12 500 FCFA` |
| Dans une colonne | `12 500` sous un titre « FCFA » |
| Négatif, dans une info-bulle ou une ligne | `−8 000 FCFA`, avec le signe moins U+2212 |
| Revenu dans une ligne | `+120 000 FCFA` |
| Axe | `50 000` |

Aucune décimale, aucune abréviation « k » ni « M » dans l'app, car elles sont moins lisibles pour tous.

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
| Bandeau Annuler | Annoncé, et la durée s'allonge jusqu'à ce que le lecteur l'ait parcouru |

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

Les captures d'écran restent permises en P1. Les outils d'enregistrement d'écran tiers ne sont pas utilisés sur les écrans financiers.

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

Le bandeau reste 10000 ms, soit 10 secondes. Il ne disparaît pas plus tôt, sauf si l'utilisateur le balaye ou touche « Annuler ». Sur un changement d'écran, il reste visible jusqu'à la fin du délai.

#### Interdits

- Pas de compteur qui défile sur un montant : le chiffre doit être lu tout de suite.
- Pas de confettis, de badges ni de série de jours.
- Pas de boucle, de pulsation ni d'attente artificielle.
- Pas d'illustration animée en P1, sauf la dérive très lente du paysage du statut : poids et démarrage de moins de 2 s obligent.

#### Animations réduites

Si le téléphone réduit ou coupe les animations, tous les mouvements deviennent un fondu de 100 ms ou un changement immédiat. La courbe s'affiche d'un coup.

### H. États et système

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

- [ ] Clair et sombre dessinés, selon le réglage du téléphone.
- [ ] Largeurs vérifiées : 320 et 360 px, puis ordinateur avec la colonne de 480 px au plus.
- [ ] Chaque ligne des sections États et Autres formats de la fiche est dessinée ou spécifiée.
- [ ] États appuyé, désactivé et focus visible des composants présents.
- [ ] Texte à 200 % : rien de coupé, sans défilement horizontal.
- [ ] 100 Ko au plus hors FedaPay, sans police téléchargée ni traceur.
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
| MES-03 | Suivi du taux d'abandon entre l'app et le site de paiement |
| PAY-03 | Site de paiement avec FedaPay : mobile money et cartes |
| PRV-01 | Écran d'ouverture « Aujourd'hui » : ce que je peux dépenser, en 0 tap |
| UX-05 | Ouverture en moins de 2 s, cibles de 44 pt, usage à une main |
| VAL-04 | Grille écrite de FedaPay pour le Togo, opérateurs Mixx et Flooz confirmés |
| VAL-06 | Test de la phrase de recette auprès de 8 à 10 testeurs |

#### Autres écrans

| Code | Écran |
| --- | --- |
| EC-01 | Bienvenue |
| EC-10 | Sauvegarde |
| EC-11 | Code |
| EC-35 | Partager |
| EC-37 | Menu |
| EC-41 | Pass Plus |
| EC-50 | Mon statut |
| W-01 | Connexion |
| W-02 | Offres |
| W-04 | Confirmation |

#### Parcours

- PC-15 Acheter le Pass Plus · L1 pour la prévente, L2 pour le reste

<!-- annexe:fin -->
