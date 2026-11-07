# Parcours et écrans — P1 (MVP)

*Version 0.14 · 7 novembre 2026 · Complète [funcs_bible.md](funcs_bible.md) : la bible dit quoi construire, ce fichier dit comment l'utilisateur s'en sert. En cas de conflit sur le périmètre, la bible prime.*

P1 se construit en deux lots. Le **lot 1** sert au test restreint et valide le produit ; le **lot 2** complète l'app pour le lancement public, si le test passe. Le [déploiement progressif](deploiement_tests_p1.md) construit et teste le lot 1 en trois étapes.

| Lot | Pour qui | Quand | Ce qu'il doit prouver |
| --- | --- | --- | --- |
| **L1** Test restreint | 10 à 15, puis 25 à 30, puis 50 à 100 testeurs | Mois 1 à début du mois 5 | 40 % des testeurs ont du réel enregistré 5 jours sur 7 ; 5 % achètent la prévente |
| **L2** Lancement public | Tout le monde | Après le test, au mois 5 | Paiements réels, rétention au jour 30, part de payeurs |

## 1. Règles communes à tous les écrans

- **Langue :** français, tutoiement, mots courants. On dit « recette », « pot », « poche », « reste à vivre ».
- **Montants :** FCFA, sans décimales, avec espace pour les milliers (12 500 FCFA).
- **Une action principale par écran,** en bas, sous le pouce, avec un verbe et un résultat.
- **Hors ligne :** tout fonctionne sans réseau, sauf la connexion et le paiement. Un petit indicateur « Enregistré sur ce téléphone » remplace tout message d'erreur.
- **Annuler plutôt que confirmer :** une action réversible s'exécute aussitôt, avec un bandeau « Annuler » pendant 10 secondes. La confirmation est réservée à l'irréversible.
- **Pas de reproche :** un écart, un jour oublié ou un pot dépassé s'énoncent comme des faits.
- **Pas de conseil :** l'app montre des faits, la règle de l'utilisateur et la conséquence. Jamais « tu devrais ».
- **Le plaisir sans la pression :** l'app emprunte aux réseaux sociaux leurs gestes et leur plaisir, jamais leur pression : ni série de jours, ni points, ni classement, ni fil public. L'app est affirmée sur sa disposition, neutre sur les choix de l'utilisateur.
- **Fonction du Pass Plus :** elle reste visible, avec sa description. L'offre n'apparaît qu'après le premier horizon, et elle se ferme toujours.

## 2. Carte de l'app

```text
Premier lancement
  EC-01 Bienvenue ─ EC-02 Exemple
  EC-03 Mon argent ─ EC-04 Mon revenu ─ EC-05 Mes charges
  EC-06 Premier horizon ─ EC-07 Recette la plus proche ─ EC-08 Aperçu de la recette
  EC-09 Quand noter ─ EC-10 Sauvegarde ─ EC-11 Code

Navigation principale
  Aujourd'hui   EC-12 Accueil ─ EC-50 Mon statut
                EC-13 Ajout rapide ─ EC-14 Catégorie ─ EC-15 Autre date ─ EC-16 Plusieurs dates
                EC-17 Historique ─ EC-18 Détail d'une saisie
                EC-19 Bilan : compter ─ EC-20 Bilan : écart ─ EC-21 Bilan : résultat
                EC-22 Transfert entre poches
  Horizon       EC-23 Mon horizon ─ EC-24 D'où vient ce chiffre
                EC-25 Puis-je me permettre ça ? ─ EC-26 Événement à venir
  Pots          EC-27 Mes pots ─ EC-28 Détail d'un pot ─ EC-29 Ajouter un pot
                EC-30 Ma recette ─ EC-31 Catalogue ─ EC-32 Ajuster
                EC-33 Écrire une recette ─ EC-34 Natures non rangées
                EC-35 Partager ─ EC-36 Recette reçue
  Plus          EC-37 Menu ─ EC-38 Mes poches ─ EC-39 Revenus et charges
                EC-40 Mon rituel et alertes ─ EC-41 Pass Plus ─ EC-42 Liste d'attente Pass Pro
                EC-43 Ce que l'app a appris ─ EC-44 Mes natures
                EC-45 Mes données ─ EC-46 À propos ─ EC-52 Sécurité

Partout         EC-47 Pourquoi cette suggestion ─ EC-48 Libellé sensible ─ EC-49 Reprendre
                EC-51 Déverrouillage ─ EC-53 Numéro perdu
Site web        W-01 Connexion ─ W-02 Offres ─ W-03 Paiement ─ W-04 Confirmation
```

## 3. Calculs affichés

Ces formules de départ fixent ce que les écrans affichent ; elles se vérifient avec le [prototype du moteur](prototype_moteur.md).

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

Le [prototype du moteur](prototype_moteur.md) liste toutes les règles fixées.

## 4. Parcours

### PC-01 Premier lancement jusqu'au premier horizon · L1

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

### PC-02 Noter en temps réel · L1

*Camille paie un taxi à 500 FCFA.*

1. **EC-12** Elle touche « Noter une dépense ».
2. **EC-13** Le clavier est ouvert, et trois suggestions du créneau s'affichent.
3. **Avec suggestion (2 taps) :** elle touche « Taxi · 500 », puis « Enregistrer ».
4. **Sans suggestion (montant + 3 taps au plus) :** elle tape le montant, touche la catégorie si celle qui est déduite ne convient pas, puis « Enregistrer ».
5. Retour sur **EC-12**, chiffre du jour recalculé, bandeau « Annuler ».

### PC-03 Noter à une autre date · L1

1. **EC-13** « Aujourd'hui » est présélectionné.
2. **Hier ou Avant-hier :** un tap sur le raccourci.
3. **Autre date :** **EC-15**, calendrier.
4. **Date future :** l'écran annonce « Prévu, pas encore du réel », et la ligne s'enregistre comme prévue.
5. **Date antérieure au dernier comptage :** le solde compté ne change pas, et la saisie vient détailler l'écart de la période.

### PC-04 Même dépense sur plusieurs dates · L2

*Karim déjeune à 1 000 FCFA, du lundi au vendredi, et note tout d'un coup.*

1. **EC-13** Il tape 1 000 et choisit « Déjeuner ».
2. Il touche « Plusieurs dates » : **EC-16**.
3. Il sélectionne les 5 jours, à la main ou en période.
4. L'écran affiche « 5 dépenses de 1 000 FCFA, soit 5 000 FCFA ». Il touche « Enregistrer les 5 dépenses ».
5. **EC-17** montre une ligne par date, reliée au groupe.

### PC-05 Bilan du soir · L1

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

### PC-06 Plusieurs saisies le soir · L1

1. **EC-13** en mode « Ajouter une autre » : après « Enregistrer », le formulaire se rouvre avec la même date.
2. Le compteur affiche « 3 dépenses notées · 2 500 FCFA ».
3. « Terminer » ramène à **EC-12**, ou à **EC-19** si l'utilisateur est venu du bilan.

### PC-07 Retrait Mixx vers les espèces · L1

1. **EC-12** Il touche un solde, puis « Transférer » : **EC-22**.
2. Il choisit De Mixx vers Espèces et indique le montant, puis les frais éventuels.
3. Les soldes changent. Seuls les frais comptent comme une dépense.

### PC-08 Corriger ou supprimer · L1

1. **EC-17** Un appui long sur une ligne ouvre le choix de catégorie, en 2 taps au total.
2. **EC-18** Le toucher ouvre le détail, où l'on modifie le montant, la date ou la poche.
3. **Saisie d'un groupe :** « Seulement celle-ci » ou « Toutes les 5 ».
4. **Suppression :** immédiate, avec « Annuler » pendant 10 secondes.

### PC-09 Recevoir un revenu · L1

1. **EC-13** Il note un revenu, ou un revenu prévu arrive à sa date et l'app demande de le confirmer.
2. La recette répartit automatiquement le montant dans les pots. Avec un revenu variable, elle agit à partir du 1er du mois suivant son adoption.
3. **EC-12** affiche « 120 000 FCFA répartis », avec « Annuler » et « Voir mes pots » : **EC-27**.

### PC-10 Vérifier ses pots · L1

1. **EC-27** Pour chaque pot : cible, réel, reste jusqu'au prochain revenu.
2. **EC-28** Il déplace de l'argent vers un autre pot.
3. **Pot vide :** une alerte factuelle, sans blocage (« Plaisir est vide jusqu'au 28 »).

### PC-11 Consulter l'horizon · L1

1. **EC-23** Courbe à 30 jours, avec les événements à venir, et le solde prévu dans 3, 7 et 30 jours.
2. **EC-24** Le toucher d'un chiffre en montre l'origine.
3. **EC-26** Il ajoute un événement ponctuel : tontine, frais d'école.
4. **90 jours :** réservé au Pass Plus (voir PC-15).

### PC-12 « Puis-je me permettre ça ? » · L1

1. **EC-23** Il touche « Puis-je me permettre ça ? ».
2. **EC-25** Il indique le montant ; la date par défaut est aujourd'hui.
3. L'app affiche la conséquence : « Il te resterait 2 500 FCFA par jour jusqu'au 28 » ou « Il manquerait 8 000 FCFA le 20 ».
4. C'est une simulation, rien n'est enregistré. « L'ajouter à mes prévus » reste possible.

### PC-13 Alerte de découvert · L1

1. Une saisie ou un comptage fait passer la projection sous zéro.
2. La notification indique : « Il pourrait manquer 8 500 FCFA le 20 ». Elle est toujours gratuite.
3. Le toucher ouvre **EC-23**, sur la date concernée.

### PC-14 Changer de recette · L1 et L2

1. **EC-30** Recette active, avec ses pots exacts.
2. **EC-31** Catalogue de 4 recettes (L1).
3. **EC-08** Aperçu en FCFA, puis « Adopter cette recette ». Rien n'est à recatégoriser.
4. **EC-32** Il duplique une recette et ajuste les pourcentages, dont la somme reste à 100 % (L1).
5. **EC-33** Il écrit une phrase : « 45 / 25 / 25 / 5 » (L2, Pass Plus).
6. **EC-34** L'app signale les natures qu'aucun pot ne lit, et il les range.

### PC-15 Acheter le Pass Plus · L1 pour la prévente, L2 pour le reste

1. **EC-41** Il voit le contenu et le prix, et lit « Le Pass Plus s'achète sur bankvi.tg ». L'écran ne contient **aucun lien ni bouton d'achat**.
2. Il ouvre lui-même son navigateur : **W-01**, connexion par son numéro.
3. **W-02** Il choisit 30 jours ou 1 an.
4. **W-03** Il paie via FedaPay.
5. **W-04** Confirmation : « Retourne dans l'app ».
6. **EC-41** affiche « Pass actif jusqu'au 6 décembre » à la prochaine synchronisation, sur tous ses appareils.

**Fin de pass :** un rappel sans fausse urgence, et la bascule vers le gratuit ne supprime aucune donnée. Les recettes en trop restent lisibles, mais une seule reste active.

### PC-16 Nouveau téléphone · L1

1. **EC-01** Il touche « J'ai déjà un compte ».
2. **EC-10 et EC-11** Il saisit son numéro et le code reçu.
3. Ses données se téléchargent, et les habitudes se recalculent sur l'appareil.
4. Arrivée sur **EC-12**, identique à l'ancien téléphone.

### PC-17 Partager une recette · L2

1. **EC-30** Il touche l'icône de partage. **EC-35** Il touche « Partager sur WhatsApp » pour envoyer l'image, ou « Copier le lien ». Seuls les pourcentages et les noms des pots partent, jamais ses montants.
2. **EC-36** Le destinataire voit les pots et confirme avant d'adopter. La recette reste de la donnée, jamais du code.

### PC-18 Garder la main sur ses données · L1 et L2

1. **EC-47** « Pourquoi cette suggestion ? » montre la preuve : « 9 fois sur les 12 derniers jours ouvrés » (L1).
2. **EC-43** Par créneau : Juste, Faux, Oublier. Réinitialiser et désactiver sont possibles (L1).
3. **EC-48** Au premier libellé sensible choisi : explication et consentement (L1).
4. **EC-45** Export CSV gratuit (L1), export mis en forme (L2, Pass Plus), suppression du compte (L1).

### PC-19 Revenir après une absence · L1

1. **Rituel ignoré 5 jours :** il se met en pause, et l'app le dit sur **EC-12** (« Rituel en pause. Le relancer ? »).
2. **Absence de 30 jours :** **EC-49** « Reprendre ». L'utilisateur compte sa poche et l'écart couvre toute la période.

### PC-20 Faire le point sur son mois · L1

*Camille veut savoir ce qui est entré et sorti ce mois-ci.*

1. **EC-12** Elle touche « Tout voir » : **EC-17**.
2. Le résumé du mois s'affiche en haut : revenus reçus et attendus, dépenses, répartition par catégorie.
3. Elle touche une catégorie, ou choisit Revenus ou Dépenses : la liste se filtre.
4. Elle peut revenir sur un mois précédent.

### PC-21 Voir mon statut du jour · L1, son en L2

*Camille ouvre l'app le matin, sans rien à noter.*

1. **EC-12** Le chiffre du jour est déjà là. L'anneau signale un nouveau statut, sans rien ouvrir tout seul.
2. Elle touche l'anneau : **EC-50**. Son paysage du jour, calculé à partir de sa prévision, s'affiche.
3. Elle regarde jusqu'à 4 faits : aujourd'hui, à venir, hier, ses pots. Elle touche pour avancer ou revenir, appuie longuement pour mettre en pause.
4. Retour sur **EC-12**. L'anneau passe à « déjà vu ».

### PC-22 Protéger ses montants · L1

1. **EC-52** À la deuxième ouverture, l'app propose une fois de verrouiller. L'utilisateur active, ou le fera plus tard dans Plus.
2. **EC-51** À l'ouverture, ou après plus d'une minute hors de l'app, Android demande l'empreinte ou le code du téléphone.

### PC-23 Changer ou perdre son numéro · L2

1. **Il a encore son téléphone : EC-52** « Changer », puis **EC-10** et **EC-11** avec le nouveau numéro.
2. **Il a perdu téléphone et numéro : EC-10** « J'ai perdu ce numéro », puis **EC-53** : ancien numéro et e-mail de secours, code, nouveau numéro, données retrouvées.
3. **Un nouveau téléphone ouvre un compte inactif depuis 90 jours : EC-11**, puis **EC-53** : l'e-mail de secours est demandé avant d'afficher quoi que ce soit. « Ce n'est pas mon compte » ouvre un nouveau compte, vide.

## 5. Écrans

### 5.1 Premier lancement

#### EC-01 Bienvenue · L1
- **Contenu :** « Sache ce que tu peux dépenser aujourd'hui. » Une illustration du chiffre du jour.
- **Action principale :** « Commencer ».
- **Autres :** « Voir un exemple », « J'ai déjà un compte ».
- **Bible :** ONB-01, ONB-06.

#### EC-02 Exemple · L1
- **Contenu :** horizon fictif, clairement marqué « Exemple ».
- **Action principale :** « Commencer avec mes chiffres ».
- **Bible :** ONB-01.

#### EC-03 Mon argent aujourd'hui · L1
- **Contenu :** « Combien as-tu aujourd'hui ? » Espèces au clavier ; Mixx et Flooz facultatifs.
- **Action principale :** « Continuer ».
- **Autres :** « Je n'ai pas de Mixx ou de Flooz » ne demande rien de plus.
- **Bible :** ONB-02, SAI-24, POC-01, POC-06.

#### EC-04 Mon revenu · L1
- **Contenu :** choix « Régulier » ou « Variable ». Régulier : montant et jour. Variable : « Le moins que tu gagnes sur un mois ».
- **Action principale :** « Continuer ».
- **Bible :** ONB-02, REC-07, SAI-17.

#### EC-05 Mes charges fixes · L1
- **Contenu :** propositions à toucher (loyer, électricité, école, tontine), avec montant et jour ; liste des charges ajoutées.
- **Action principale :** « Voir mon horizon ».
- **Autres :** « Je n'en ai pas ».
- **Bible :** ONB-02, SAI-17.

#### EC-06 Premier horizon · L1
- **Contenu :** grand chiffre (« Aujourd'hui, tu peux dépenser 3 200 FCFA jusqu'au 28 »), courbe à 30 jours, phrase d'explication.
- **Action principale :** « Répartir mon argent ».
- **Autres :** « Plus tard ».
- **État :** reste à vivre négatif, selon la section 3.
- **Bible :** ONB-02, PRV-01, PRV-02, PRV-03, MES-02.

#### EC-07 La recette la plus proche · L1
- **Contenu :** « La plus proche de ce que tu as indiqué », avec la raison (« Tes charges prennent 65 % de ton revenu ») ; trois recettes, avec leurs pots et leur effet sur le chiffre du jour.
- **Action principale :** « Voir cette recette ».
- **Autres :** les deux autres recettes, « Plus tard ».
- **Règle de départ :** revenu variable : revenu plancher prudent ; charges à 60 % ou plus du revenu : 70/20/10 ; sinon : 50/30/20. Les deux autres places vont aux recettes restantes.
- **Bible :** REC-02, REC-10, LEG-04.

#### EC-08 Aperçu d'une recette · L1
- **Contenu :** pots exacts, pourcentages, montants en FCFA sur le revenu indiqué, effet sur le chiffre du jour à partir du prochain revenu, ou du 1er du mois suivant si le revenu est variable, source de la recette, mention « Repère, pas un conseil ».
- **Action principale :** « Adopter cette recette ».
- **Autres :** « Ajuster ».
- **Bible :** REC-01, REC-04, REC-09, LEG-03, POT-01.

#### EC-09 Quand préfères-tu noter ? · L1
- **Contenu :** « Au fil de la journée » ou « Le soir », avec l'heure du rappel pour le soir. Le choix se modifie à tout moment et n'empêche rien.
- **Action principale :** « Activer mon rappel » si le soir est choisi, sinon « Continuer ».
- **Après :** la permission de notification s'explique par une phrase, puis la demande système.
- **Bible :** ONB-03, SAI-08, MSG-01, ONB-07.

#### EC-10 Sauvegarde · L1
- **Contenu :** « Garde tes données même si tu changes de téléphone. » Numéro de téléphone.
- **Action principale :** « Recevoir mon code ».
- **Autres :** « Plus tard », avec un rappel à la prochaine valeur, un seul.
- **Bible :** DON-03, DON-05, DON-06, LEG-05, DON-20.

#### EC-11 Code · L1
- **Contenu :** code à saisir, renvoi après 60 secondes. Le code n'est demandé qu'à la création et sur un nouvel appareil.
- **Action principale :** « Valider ».
- **État :** sans réseau : « Il faut du réseau pour cette étape. Tes données restent sur ce téléphone. »
- **Bible :** DON-03, DON-06.

### 5.2 Aujourd'hui

#### EC-12 Accueil · L1
- **Disposition fixe, de haut en bas :** héros plein bord avec le paysage du jour, l'anneau du statut et le grand chiffre du jour ; à venir : prochaine charge et prochain revenu ; soldes par poche ; une seule carte au plus ; saisies du jour en conversation : dépenses en messages sortants, à droite ; revenus en messages entrants, à gauche ; barre d'action fixe au-dessus des onglets. Détail : [design system, fichier 17](describe_screens/00-design-system/17-statut-et-experience.md#4-accueil--la-disposition-affirmée-ec-12).
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

#### EC-13 Ajout rapide · L1
- **Contenu :** choix Dépense ou Revenu ; clavier ouvert ; trois suggestions dans une zone fixe ; catégorie et poche déduites ; dates : **Aujourd'hui** (sélectionné), Hier, Avant-hier, Autre date, Plusieurs dates.
- **Action principale :** « Enregistrer ».
- **Autres :** « Ajouter une autre » ; une description est facultative et s'autocomplète.
- **Règles :** seul le montant est obligatoire. Les suggestions suivent les seuils de la bible (section 6.2). Un montant suggéré n'est jamais validé tout seul.
- **Bible :** SAI-01, SAI-02, SAI-03, SAI-07, SAI-14, HAB-01, HAB-02, HAB-03, HAB-04, HAB-08, UX-01, SAI-28.

#### EC-50 Mon statut · L1, son en L2
- **Contenu :** plein écran ; paysage généré sur le téléphone : collines selon la courbe à 30 jours, soleil selon les jours avant le prochain revenu, ciel selon l'état du jour ; 4 faits au plus, de 5 s chacun : aujourd'hui, à venir, hier, mes pots ; phrase d'état factuelle.
- **Action principale :** aucune.
- **Autres :** toucher pour avancer ou revenir, appui long pour mettre en pause, glisser vers le bas pour fermer, son coupé par défaut (L2).
- **Règles :** ne s'ouvre jamais tout seul et ne remplace jamais le chiffre de l'accueil. Aucune offre. Aucune donnée ne part du téléphone. Ne se partage pas, car il contient des montants.
- **Hors ligne :** identique.
- **Détail :** [design system, fichier 17](describe_screens/00-design-system/17-statut-et-experience.md).
- **Bible :** UX-11, UX-12, UX-13, PRV-01, PRV-03, UX-05.

#### EC-14 Choix de la catégorie · L1
- **Contenu :** catégories récentes, puis toutes, avec leur nature.
- **Action :** toucher une catégorie la sélectionne et ferme l'écran.
- **Bible :** NAT-01, NAT-02, NAT-06, SAI-16.

#### EC-15 Autre date · L1
- **Contenu :** calendrier d'une seule date ; aujourd'hui marqué. Les dates futures portent la mention « Prévu ».
- **Bible :** SAI-04, SAI-07, SAI-13.

#### EC-16 Plusieurs dates · L2
- **Contenu :** calendrier en sélection multiple, ou période ; total en direct : « 5 dépenses de 1 000 FCFA, soit 5 000 FCFA ». Si des dates sont futures : « 3 réelles, 2 prévues ».
- **Action principale :** « Enregistrer les 5 dépenses ».
- **Bible :** SAI-05, SAI-06, SAI-07.

#### EC-17 Historique · L1
- **Contenu :** résumé du mois en haut ; filtre Tout, Revenus, Dépenses ; saisies par jour, avec poche et catégorie, en conversation : dépenses à droite, revenus à gauche ; les comptages, les transferts et les « Non détaillé » apparaissent en repères neutres, au centre ; les prévus sont marqués.
- **Résumé du mois :** mois choisi (le mois en cours par défaut) ; revenus reçus et attendus (« 0 sur 120 000 FCFA attendus », ou « au moins 90 000 FCFA » pour un revenu variable) ; total des dépenses ; répartition par catégorie, de la plus grosse à la plus petite, avec le « Non détaillé » sur sa propre ligne.
- **Règles de calcul :** le résumé ne compte que le réel. Les prévus, les comptages et les transferts entre poches n'y entrent pas ; les frais d'un transfert comptent comme une dépense. Si la poche d'activité est active, ses mouvements sont affichés à part.
- **Action :** toucher une saisie ouvre EC-18 ; un appui long change la catégorie ; toucher une catégorie filtre la liste.
- **Ton :** des faits seulement, sans comparaison jugée ni « tu as trop dépensé ».
- **État vide :** « Tes saisies apparaîtront ici. »
- **Bible :** SAI-25, SAI-26, SAI-27, SAI-06, SAI-11, SAI-16.

#### EC-18 Détail d'une saisie · L1
- **Contenu :** montant, date, poche, catégorie, description ; origine (saisie, suggestion, bilan).
- **Action principale :** « Enregistrer les changements ».
- **Autres :** « Supprimer » (destructif, avec annulation). Pour un groupe : « Seulement celle-ci » ou « Toutes les 5 ».
- **Bible :** SAI-06, SAI-15, DON-01.

#### EC-19 Bilan : compter · L1
- **Contenu :** présenté comme un échange. Bulle de l'app : « Combien te reste-t-il en espèces ? » ; la réponse se saisit dessous, sans montant attendu ni champ pré-rempli ; Mixx et Flooz facultatifs, repliés.
- **Action principale :** « Voir mon écart ».
- **Bible :** SAI-09, SAI-08, SAI-12, PRV-16.

#### EC-20 Bilan : écart · L1
- **Contenu :** la suite de l'échange. Bulle de l'utilisateur avec le montant compté ; bulle de l'app avec le déjà noté et l'écart ; propositions de répartition en réponses rapides (« Transport · 1 500 », « Déjeuner · 1 000 ») ; le reste apparaît en « Non détaillé ». Les cas sont décrits dans PC-05.
- **Action principale :** « Valider mon bilan ».
- **Autres :** « Tout laisser en non détaillé », « Ajouter une dépense » (EC-13).
- **Bible :** SAI-10, SAI-11, SAI-12, SAI-13, HAB-02.

#### EC-21 Bilan : résultat · L1
- **Contenu :** « Bilan fait », chiffre de demain, changement de l'horizon s'il y en a un, avec le paysage de demain en fond. Aucune série de jours et aucune félicitation appuyée.
- **Action principale :** « Terminer ».
- **Bible :** SAI-09, PRV-06, MES-01, MES-02.

#### EC-22 Transfert entre poches · L1
- **Contenu :** De, Vers, montant, frais éventuels.
- **Action principale :** « Transférer ».
- **Bible :** POC-03.

### 5.3 Horizon

#### EC-23 Mon horizon · L1
- **Contenu :** trois repères au-dessus de la courbe : « Dans 3 jours », « Dans 7 jours », « Dans 30 jours », chacun avec sa date et son solde prévu ; courbe du solde projeté ; événements ; choix 30 ou 90 jours ; date du premier manque s'il y en a un. Le prévu se distingue du réel.
- **Repères :** toujours gratuits, quelle que soit la durée affichée. Toucher un repère place le curseur de la courbe sur cette date. Si le solde prévu est négatif : « Il manquerait 4 000 FCFA », jamais un chiffre négatif seul.
- **Action principale :** « Puis-je me permettre ça ? », dans la barre d'action fixe, avec le pass ou tant qu'il reste des essais offerts ; sinon « Événement ».
- **Autres :** l'autre bouton, à côté, à contour.
- **État sans pass :** 90 jours visible, description du Pass Plus au toucher (EC-41).
- **Bible :** PRV-03, PRV-04, PRV-05, PRV-06, PRV-15, MSG-03, ONB-05.

#### EC-24 D'où vient ce chiffre · L1
- **Contenu :** le calcul en lignes lisibles (soldes, revenus, charges, réservé), chacune renvoyant à sa source.
- **Bible :** PRV-08.

#### EC-25 Puis-je me permettre ça ? · L1, Pass Plus
- **Contenu :** montant, date (aujourd'hui par défaut), poche, conséquence en phrase et sur la courbe.
- **Action principale :** « Voir la conséquence ».
- **Autres :** « L'ajouter à mes prévus ».
- **État sans pass :** 3 simulations complètes offertes, sans recharge. Ensuite, l'écran décrit la fonction et renvoie à EC-41, sans lien ni bouton d'achat.
- **Bible :** PRV-07, UX-01, LEG-04.

#### EC-26 Événement à venir · L1
- **Contenu :** nom, montant, date, unique ou récurrent, entrée ou sortie.
- **Action principale :** « Ajouter à mon horizon ».
- **Bible :** PRV-05, SAI-07.

### 5.4 Pots et recettes

#### EC-27 Mes pots · L1
- **Contenu :** pour chaque pot : cible, réel, reste jusqu'au prochain revenu. Recette active en en-tête.
- **Action principale :** « Déplacer de l'argent ».
- **Autres :** « Ajouter un pot », « Ma recette ».
- **État sans recette :** « Choisis une recette pour répartir ton argent » (EC-07).
- **Bible :** POT-01, POT-02, POT-03, POT-06, ONB-05, POT-12.

#### EC-28 Détail d'un pot · L1
- **Contenu :** règle du pot, natures lues, mouvements récents.
- **Action principale :** « Déplacer de l'argent ».
- **Bible :** POT-03, POT-04, NAT-01.

#### EC-29 Ajouter un pot · L1
- **Contenu :** propositions : tontine, famille, imprévus ; ou nom libre ; règle (pourcentage, montant fixe, le reste).
- **Action principale :** « Créer ce pot ».
- **Bible :** POT-05, REC-06.

#### EC-30 Ma recette · L1
- **Contenu :** pots, pourcentages, règles et priorités ; revenu de référence.
- **Action principale :** « Changer de recette ».
- **Autres :** « Ajuster », icône de partage (L2).
- **Bible :** REC-03, REC-06, REC-09.

#### EC-31 Catalogue · L1
- **Contenu :** 50/30/20, 70/20/10, payez-vous d'abord, revenu plancher prudent ; pour chacune, pots exacts et source.
- **Action :** toucher ouvre EC-08.
- **Bible :** REC-02, REC-09.

#### EC-32 Ajuster · L1
- **Contenu :** curseurs par pot, somme tenue à 100 %, le dernier pot absorbe « le reste » ; montants en direct.
- **Action principale :** « Enregistrer ma recette ».
- **Bible :** REC-04, REC-06, UX-01.

#### EC-33 Écrire une recette · L2, Pass Plus
- **Contenu :** champ de phrase (« 45 besoins, 25 épargne, 25 projets, 5 plaisir » ou « 45 / 25 / 25 / 5 ») ; résultat en FCFA en direct, par analyseur déterministe. Les pots sans nom se nomment ensuite.
- **Action principale :** « Créer cette recette ».
- **État :** phrase non reconnue : l'app montre ce qu'elle a compris et demande de corriger.
- **Bible :** REC-05, UX-01.

#### EC-34 Natures non rangées · L1
- **Contenu :** « Aucun pot ne lit ces natures : dette, impôt. » Choix du pot pour chacune.
- **Action principale :** « Tout est rangé ».
- **Bible :** REC-08, NAT-01.

#### EC-35 Partager · L2
- **Contenu :** aperçu de l'image « Ma recette » ; rappel : aucun montant ne part.
- **Action principale :** « Partager sur WhatsApp ».
- **Autres :** « Copier le lien ».
- **Bible :** PAR-01, LEG-06.

#### EC-36 Recette reçue · L2
- **Contenu :** pots exacts, source indiquée comme « Partagée par un autre utilisateur ». Les libellés s'affichent comme du texte simple.
- **Action principale :** « Voir avec mes chiffres » (EC-08).
- **Autres :** « Ignorer ».
- **Bible :** PAR-02, DON-12.

### 5.5 Plus

#### EC-37 Menu · L1
- **Contenu :** Mes poches, Revenus et charges, Mon rituel et alertes, Pass Plus, Ce que l'app a appris, Mes natures, Mes données, Sécurité, À propos. Pendant le test : « Donner mon avis », vers le groupe WhatsApp.
- **Bible :** UX-03, VAL-09.

#### EC-38 Mes poches · L1
- **Contenu :** espèces, Mixx, Flooz ; solde, dernier comptage. Activer la poche d'activité : « Sépare l'argent de ton activité du tien. »
- **Action principale :** « Compter mes poches » (EC-19).
- **Bible :** POC-01, POC-02, IND-01, POC-06.

#### EC-39 Revenus et charges · L1
- **Contenu :** liste des récurrents déclarés, avec montant et prochaine date.
- **Action principale :** « Ajouter ».
- **Bible :** SAI-17, ONB-04.

#### EC-40 Mon rituel et alertes · L1
- **Contenu :** préférence de saisie, heure du rituel, état (actif ou en pause), alertes, son du statut (L2). L'alerte de découvert s'affiche comme incluse dans le gratuit. Aucune notification la nuit.
- **Action principale :** « Enregistrer ».
- **Bible :** MSG-01, MSG-02, MSG-03, MSG-04, MSG-05, SAI-08.

#### EC-41 Pass Plus · L1
- **Contenu :** contenu du gratuit et du pass ; 1 000 FCFA pour 30 jours, 10 000 FCFA par an ; « Le Pass Plus s'achète sur bankvi.tg avec Mixx, Flooz ou une carte » ; état du pass.
- **Règle :** aucun lien, aucun bouton d'achat, aucun renvoi vers le navigateur dans l'app.
- **Action principale :** aucune en l'absence de pass ; « Fermer » seulement.
- **Autres :** « Pass Pro : m'inscrire sur la liste » (EC-42), pour les revenus variables.
- **Bible :** PAY-01, PAY-02, PAY-04, PAY-05, PAY-06, REC-03, UX-06, MSG-05, B2B-01.

#### EC-42 Liste d'attente Pass Pro · L1
- **Contenu :** ce que le Pass Pro prévoit ; aucun paiement demandé.
- **Action principale :** « M'inscrire sur la liste ».
- **Bible :** VAL-08, LEG-05.

#### EC-43 Ce que l'app a appris · L1
- **Contenu :** par créneau : « En semaine vers 8 h, tu notes souvent Taxi, 500 à 700 FCFA » ; Juste, Faux, Oublier.
- **Action principale :** aucune par défaut.
- **Autres :** interrupteur « Apprendre de mes saisies », « Tout oublier ».
- **Bible :** HAB-06, HAB-07, NAT-04.

#### EC-44 Mes natures · L2
- **Contenu :** cartes à balayer pour classer les catégories (besoin, envie…), proposées une à une, sautables. Ne s'ouvre jamais pour un libellé sensible.
- **Bible :** NAT-02, NAT-03, NAT-04, ONB-04.

#### EC-45 Mes données · L1 et L2
- **Contenu :** état de la synchronisation ; ce qui est sur le serveur et ce qui reste sur le téléphone ; choix de partager ou non les statistiques d'usage.
- **Autres :** « Exporter en CSV » (L1, gratuit), « Export mis en forme » (L2, Pass Plus), « Supprimer mon compte » (récapitulatif et confirmation).
- **Bible :** DON-05, DON-07, DON-09, DON-11, DON-16, LEG-05, MES-01.

#### EC-46 À propos · L1
- **Contenu :** version, mentions légales, confidentialité, « Outil d'information, ni conseil financier ni conseil comptable », contact.
- **Bible :** LEG-03, LEG-01, LEG-02.

#### EC-52 Sécurité · L1 et L2
- **Contenu :** interrupteur de verrouillage (L1) ; numéro du compte et e-mail de secours (L2). Proposition unique du verrouillage à la deuxième ouverture.
- **Action principale :** aucune.
- **Bible :** DON-17, DON-18, DON-19.

### 5.6 Éléments partagés

#### EC-47 Pourquoi cette suggestion ? · L1
- **Contenu :** feuille basse avec la preuve chiffrée, et « Ne plus proposer ». Ton factuel.
- **Bible :** HAB-05.

#### EC-48 Libellé sensible · L1
- **Contenu :** à la première utilisation d'un libellé de santé, de religion, de politique ou de syndicat : « Ce libellé peut révéler une information sensible. Il reste choisi par toi, n'est jamais prédit et ne sert à aucun profil. » Case non cochée.
- **Action principale :** « Utiliser ce libellé ».
- **Autres :** « Choisir une autre catégorie ».
- **Bible :** NAT-04, NAT-05, LEG-05.

#### EC-49 Reprendre · L1
- **Contenu :** après 30 jours : « Reprendre où tu t'étais arrêté. »
- **Action principale :** « Compter ma poche ».
- **Autres :** « Repartir de zéro ».
- **Bible :** ONB-06, SAI-12.

#### EC-51 Déverrouillage · L1
- **Contenu :** marque, cadenas, « Tes montants sont protégés. », sans aucun montant. La demande d'Android s'ouvre aussitôt.
- **Action principale :** « Déverrouiller ».
- **Bible :** DON-17.

#### EC-53 Numéro perdu · L2
- **Contenu :** ancien numéro et e-mail de secours, puis code. Variante pour un compte inactif depuis 90 jours sur un nouveau téléphone.
- **Action principale :** « Recevoir mon code ».
- **Autres :** « Je n'ai pas ajouté d'e-mail », « Ce n'est pas mon compte ».
- **Bible :** DON-06, DON-19, DON-20.

### 5.7 Site web

*Le site est simple et léger, et accessible en saisissant son adresse. « bankvi.tg » est un nom de travail : le domaine reste à réserver.*

#### W-01 Connexion · L1
- **Contenu :** numéro de téléphone, code.
- **Action principale :** « Continuer ».
- **Bible :** DON-03, PAY-04, DON-20.

#### W-02 Offres · L1
- **Contenu :** Pass Plus 30 jours ou 1 an. Pendant le test : prévente à 1 000 FCFA, avec les conditions de remboursement.
- **Action principale :** « Payer 1 000 FCFA ».
- **Bible :** PAY-02, PAY-03, VAL-07.

#### W-03 Paiement · L1
- **Contenu :** page FedaPay : mobile money ou carte.
- **État :** paiement interrompu ou échoué : retour à W-02 avec le motif, sans double débit.
- **Bible :** PAY-03, MES-03.

#### W-04 Confirmation · L1
- **Contenu :** « Ton Pass Plus est actif jusqu'au 6 décembre. Retourne dans l'app. » Reçu.
- **Bible :** PAY-03, PAY-04, MES-03.

## 6. Lignes de la bible sans écran

Ces lignes de P1 n'ont pas d'écran propre :

| Lignes | Où elles vivent |
| --- | --- |
| DON-01, DON-02, DON-04, DON-08, DON-10 | Socle technique |
| DON-07 | Moteur d'habitudes, recalcul après une restauration (PC-16) |
| HAB-08 | Règle appliquée dans EC-13 et EC-20 |
| PRV-06 | Recalcul du moteur après chaque saisie |
| POT-02 | Répartition du moteur (PC-09) |
| B2B-01 | Droits attribués à la main par le fondateur, sans écran en P1 |
| UX-01, UX-04, UX-05 | Règles vérifiées sur tous les écrans |
| MES-01, MES-03, MES-04 | Événements et tableau simple, vus par le fondateur |
| LEG-01, LEG-02, LEG-06 | Démarches et règles de conformité |
| PAY-06 | Fiche Play et test fermé |
| VAL-01, VAL-02, VAL-04, VAL-05, VAL-06 | Entretiens, test restreint, grille FedaPay, juriste, test de la phrase |

## 7. Points à valider

Ces choix ont été faits en écrivant ce document :

1. **L'horizon arrive avant la recette.** Il n'en a pas besoin, et l'utilisateur voit la valeur plus tôt.
2. **Le compte se crée après le premier horizon,** par numéro de téléphone et code, seulement à la création et sur un nouvel appareil.
3. **Le solde de départ est la première question** (SAI-24) : sans lui, ni l'horizon ni l'écart ne se calculent.
4. **Le « Non détaillé » réduit le solde et compte dans le pot du quotidien,** et il a sa propre ligne dans le résumé du mois. Sinon, la somme des pots ne correspondrait plus à l'argent réel.
5. **La poche d'activité reste hors du reste à vivre,** sauf transfert vers une poche perso.
6. **Le découpage en lots :** phrase de recette, partage, export mis en forme, son du statut, plusieurs dates et tri des natures viennent en L2.
7. **Le ludique passe par la beauté et le geste,** sans série de jours, points ni classement : ils contrediraient « pas de reproche ».
8. **Les états du statut :** Ça suit (90 % ou plus du chiffre de début de cycle), Ça se resserre (de 60 à 90 %), Serré (moins de 60 %), Il manque (reste à vivre négatif). Ces seuils sont à calibrer pendant le test.
9. **Le verrouillage utilise l'empreinte ou le code du téléphone,** sans code propre à BankVi : rien de plus à retenir ni à récupérer. Il reste facultatif.
10. **Le second moyen de récupération est un e-mail facultatif.** Un code de secours sur papier se perd plus facilement, et l'e-mail ressemble à ce que les gens connaissent. Sans e-mail, aucune promesse de récupération.
11. **Un compte inactif depuis 90 jours ne s'ouvre plus avec le seul SMS sur un nouveau téléphone,** car un numéro désactivé peut être réattribué à quelqu'un d'autre au Togo. Le seuil reste à vérifier.

12. **P1 reste en français.** Les entretiens posent la question des langues locales, et les textes de l'app sont séparés du code pour pouvoir les traduire sans rien refaire.
13. **La zone UEMOA s'ouvre au lancement public** : les huit pays partagent le franc CFA. Le test reste en +228, et rien n'est adapté pays par pays en dehors du numéro et de la poche mobile money.

Aucune question de produit ne reste ouverte. Ce qui attend le juriste ou FedaPay est listé dans les index des fiches.
