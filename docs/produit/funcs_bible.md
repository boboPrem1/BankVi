# Bible des fonctionnalités — BankVi

*Version 0.19 · 7 novembre 2026 · Document de référence : toute fonctionnalité y figure avec sa catégorie, son scope et sa phase.*

**Règle de priorité.** En cas de conflit : cette bible, puis [le business plan](../business/Business%20plan%20et%20business%20model.md), puis les notes de brainstorming ([Tab 1](../brainstorming/Tab%201.md), [Styles de budget](../brainstorming/Styles%20de%20budget.md), [Simplicité et onboarding](../brainstorming/Simplicit%C3%A9%20et%20onboarding.md), [Habitudes et prédiction](../brainstorming/Habitudes%20et%20pr%C3%A9diction.md)). Les notes gardent le détail et le raisonnement ; la section 3 liste ce que nos décisions y remplacent.

**Règle d'entrée.** Une fonctionnalité nouvelle reçoit un identifiant, une ligne dans la bonne catégorie et une phase avant d'être développée. Un identifiant ne se réutilise jamais.

## 1. Comment lire ce document

### 1.1 Scope : pour qui

| Code | Public | Persona | Place |
| --- | --- | --- | --- |
| **Tous** | Tous les publics actifs à cette phase | — | — |
| **Perso** | Salariés et particuliers | Camille | Héros du MVP |
| **Indé** | Indépendants, revenus irréguliers | Karim | Héros du MVP |
| **Orga** | Employeurs, microfinance, associations | — | Acheteurs de licences, après le MVP |
| **Entreprise** | Dirigeants de TPE et PME | Sophie | Conditionnel |
| **Cabinet** | Experts-comptables, DAF externes | Marc | Conditionnel |

### 1.2 Phase : quand

| Phase | Contenu | Quand | Condition pour passer à la suite | Correspondance dans les notes |
| --- | --- | --- | --- | --- |
| **P1** MVP | Android : test restreint, puis lancement payant | Mois 1 à 5 | Avant le public : 40 % des testeurs ont du réel enregistré 5 jours sur 7. Ensuite : décision de la fin du mois 6 ([business plan, section 7](../business/Business%20plan%20et%20business%20model.md#7-plan-dexécution-en-solo)) | Tab 1 : phases 0 et 1, sans agrégateur ; Habitudes : phase 1 ; onboarding : paliers 0 à 3 |
| **P2** Consolidation | Pass Pro, dossier, licences, orchestrateur | Mois 7 à 12, si le projet continue | 2 000 actifs ; une lettre d'intention signée | Tab 1 : phase 2, en partie ; Habitudes : phase 2 ; palier 4 |
| **P3** Extension | SMS, iOS, IA, simulateur, Bénin ou Côte d'Ivoire | Année 2 | Rentabilité en vue ; demande d'entreprises constatée | Tab 1 : phase 2, le reste ; Habitudes : phase 3 |
| **P4** Entreprise v1 | Banque, trésorerie, budget, scénarios | Non daté, conditionnel | 5 à 10 entreprises pilotes | Tab 1 : phase 3 ; palier 5 |
| **P5** Entreprise v2 | Multi-entités, portail, API | Non daté, conditionnel | — | Tab 1 : phase 4, sans la comptabilité complète |
| **X** Exclu | Ne se fait pas, sauf nouvelle décision écrite ici | — | — | — |

### 1.3 Autres colonnes

- **Offre :** G (Gratuit), Plus, Pro, Acte (achat à l'unité), B2B, Ent (grilles Entreprise à définir), « — » (socle ou interne, non vendu).
- **Statut :** **D** décidé par le fondateur ; **R** repris des notes ou du plan, phase attribuée ici ; **P** proposé dans cette bible, à confirmer ; **?** à trancher (section 7).
- **Source :** T1 (Tab 1), ST (Styles), SO (Simplicité et onboarding), HP (Habitudes), BP (Business plan), DEC (décision du fondateur en conversation), BIB (ajout de cette bible).

## 2. Vue d'ensemble

| Catégorie | P1 | P2 | P3 | P4 | P5 | X | Total |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **VAL** Validation pendant le MVP | 8 | · | · | · | · | · | 8 |
| **SAI** Saisie et suivi du réel | 22 | 4 | 1 | 1 | · | · | 28 |
| **POC** Poches et comptes | 4 | · | 1 | · | 1 | · | 6 |
| **REC** Recettes de budget | 10 | 7 | 3 | 2 | · | · | 22 |
| **POT** Pots | 7 | 2 | 2 | · | 1 | · | 12 |
| **NAT** Catégories et natures | 6 | · | · | · | · | · | 6 |
| **PRV** Prévision | 10 | 2 | 4 | · | · | · | 16 |
| **HAB** Habitudes et prédiction | 8 | 6 | 2 | 1 | · | 1 | 18 |
| **ONB** Onboarding et accueil | 7 | 3 | · | 2 | · | · | 12 |
| **MSG** Rappels, alertes et messages | 5 | 2 | 2 | · | · | · | 9 |
| **UX** Règles communes | 11 | 2 | · | · | · | · | 13 |
| **DON** Compte, données et sécurité | 17 | · | 1 | 1 | 1 | · | 20 |
| **PAY** Offres et paiement | 6 | 1 | 1 | 1 | 1 | 1 | 11 |
| **PAR** Partage et croissance | 2 | 1 | 1 | · | · | · | 4 |
| **IND** Indépendant | 1 | 4 | 2 | · | · | · | 7 |
| **B2B** Licences pour les organisations | 1 | 4 | · | · | · | · | 5 |
| **ING** Import et connexions | · | · | 2 | 3 | 1 | · | 6 |
| **IA** Assistant et langage naturel | · | · | 4 | 2 | 1 | · | 7 |
| **ENT** Entreprise | · | · | · | 11 | 5 | 1 | 17 |
| **CAB** Cabinets | · | · | · | 1 | 2 | · | 3 |
| **LEG** Conformité dans le produit | 6 | · | · | · | · | · | 6 |
| **MES** Mesure interne | 4 | 3 | 1 | · | · | · | 8 |
| **Total** | **135** | **41** | **27** | **25** | **13** | **3** | **244** |

**Le MVP en bref (P1).** On note le réel à son rythme, en temps réel ou le soir, sur les poches espèces, Mixx et Flooz, plus une poche d'activité pour les indépendants. On choisit ou crée une recette, qui répartit les revenus dans des pots. On voit son horizon et son reste à vivre, recalculés après chaque saisie. L'app suggère à partir des habitudes, sur l'appareil, et le compte retrouve tout sur un nouveau téléphone. Le Pass Plus se paie par FedaPay sur le site, jamais dans l'app.

**Ne sont pas dans le MVP :** banque connectée, comptabilité, iOS, assistant et LLM, Pass Pro, lecture des SMS, partage de compte, mode Entreprise, séries de jours, points, classements, fil public.

## 3. Ce que nos décisions remplacent dans les notes

| Sujet | Les notes disent | La référence est désormais | Base |
| --- | --- | --- | --- |
| Marché et devise | Euros, marché ouvert, RGPD | Togo, FCFA sans décimales, loi togolaise n° 2019-014 d'abord | DEC, BP §9 |
| Personas | Héros à choisir | Camille et Karim | DEC |
| Saisie | « Zéro saisie par défaut », synchronisation bancaire | Saisie manuelle très rapide, ou bilan du soir ; pas de banque en MVP | DEC |
| Comptabilité | Mode Entreprise avec compta complète (T1 §7 A, phase 4) | Pas de comptabilité complète | DEC |
| Stockage | Local-first ; habitudes en chiffrement de bout en bout | Registre synchronisé sur serveur ; habitudes calculées sur l'appareil puis recalculées depuis le registre | DEC, DON-07 |
| Distribution | PWA recommandée par la v0.1 du plan | Google Play, Android d'abord | DEC |
| Paiement | Abonnement dans l'app | Aucun achat dans l'app sur Android ; FedaPay sur le site ; pas d'Apple Pay ; pas de Stripe au lancement | DEC, BP §5.3 |
| Vocabulaire | « Style » côté utilisateur | « Recette » côté utilisateur | DEC |
| Validation | Phase de discovery et tests sur papier avant de développer | Validation directe avec le MVP, auprès d'un groupe restreint de testeurs | DEC |
| Natures | « Don » proposé ou prédit | « Solidarité et dons », jamais déduit ; tontine et soutien familial ajoutés | BP §9.1 |
| Conseil | « Style conseillé » | « Le plus proche de ce que tu as indiqué », avec la raison, parmi trois recettes | BP §9.1 |
| Suggestions | 0,5 d'un côté, 70 % et 95 % de l'autre | Quatre seuils, section 6.2 | DEC |
| Notifications | Quotidienne facultative, mais plafond de 3 par semaine | Le rituel choisi sort du plafond, section 6.3 | DEC |
| Activation | « Une seule action », mais quatre conditions | Un seul événement, section 6.4 | DEC |
| Onboarding | Connecter la banque, importer ou saisir | Démo ou saisie à la main ; import et banque viendront plus tard | DEC |
| Rejeu de 90 jours | Sur l'historique bancaire | Sur des jeux de test en P1 ; sur l'historique réel ensuite | BIB |

## 4. Fonctionnalités par catégorie

### 4.1 VAL — Validation pendant le MVP

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| VAL-01 | 20 entretiens à Lomé parmi les testeurs, salariés et indépendants | Tous | P1 | — | D | DEC, BP §6 |
| VAL-02 | Test du suivi du réel dans le MVP, en test fermé Play, chacun choisit son mode | Tous | P1 | — | D | DEC, BP §10 |
| VAL-04 | Grille écrite de FedaPay pour le Togo, opérateurs Mixx et Flooz confirmés | Tous | P1 | — | R | BP §5.3 |
| VAL-05 | Avis d'un juriste togolais, dès le mois 1 : hébergement, consentement, conseil, montage de paiement | Tous | P1 | — | R | BP §9 |
| VAL-06 | Test de la phrase de recette auprès de 8 à 10 testeurs | Tous | P1 | — | R | ST §8 |
| VAL-07 | Prévente du Pass Plus à 1 000 FCFA aux testeurs de la bêta, par FedaPay, remboursée si le lancement est annulé ; pass actif dès le paiement, 30 jours décomptés à partir du lancement public | Tous | P1 | — | D | DEC, BP §10 |
| VAL-08 | Liste d'attente du Pass Pro auprès des indépendants, sans paiement | Indé | P1 | — | D | DEC, BP §10 |
| VAL-09 | « Donner mon avis » vers le groupe WhatsApp, pendant le test | Tous | P1 | — | P | BIB |

### 4.2 SAI — Saisie et suivi du réel

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| SAI-01 | Ajout rapide d'une dépense ou d'un revenu : clavier ouvert, montant seul obligatoire, poche et catégorie déduites | Tous | P1 | G | D | DEC, SO §1.1 |
| SAI-02 | « Aujourd'hui » présélectionné, sans tap supplémentaire | Tous | P1 | G | D | DEC |
| SAI-03 | Raccourcis Hier et Avant-hier | Tous | P1 | G | D | DEC |
| SAI-04 | Autre date, par calendrier | Tous | P1 | G | D | DEC |
| SAI-05 | Plusieurs dates : sélection multiple ou période, même montant par date, total affiché avant validation | Tous | P1 | G | D | DEC, BP §4.1 |
| SAI-06 | Groupe de saisies : une ligne par date, modifiable seule ou en groupe | Tous | P1 | G | D | BP §4.1 |
| SAI-07 | Une date future crée une ligne « prévue », jamais du réel | Tous | P1 | G | D | BP §4.1 |
| SAI-08 | Deux façons de noter, combinables : au fil de la journée ou le soir ; la préférence ne change que le rappel et l'accueil | Tous | P1 | G | D | DEC |
| SAI-09 | Bilan du soir : compter ses espèces, sans montant attendu sur cet écran ni champ pré-rempli ; soldes Mixx et Flooz facultatifs | Tous | P1 | G | D | DEC, BP §4.1 |
| SAI-10 | Calcul de l'écart et répartition proposée selon les habitudes | Tous | P1 | G | R | BP §4.1 |
| SAI-11 | Écart « non détaillé », accepté sans reproche | Tous | P1 | G | R | BP §4.1 |
| SAI-12 | Rattrapage : le comptage suivant couvre les jours oubliés | Tous | P1 | G | R | BP §4.1 |
| SAI-13 | Une saisie tardive détaille l'écart sans changer le solde compté | Tous | P1 | G | D | BP §4.1 |
| SAI-14 | Saisie de plusieurs dépenses d'affilée le soir | Tous | P1 | G | D | DEC |
| SAI-15 | Annuler pendant 10 secondes au lieu de confirmer | Tous | P1 | G | R | SO §1.2 |
| SAI-16 | Corriger une catégorie en 2 taps | Tous | P1 | G | R | SO §1.1 |
| SAI-17 | Revenus et charges récurrents déclarés (paie, loyer, abonnements) | Tous | P1 | G | R | T1 §5, SO §2.2 |
| SAI-18 | « Appliquer aux 4 autres ? » : une correction crée une règle | Tous | P2 | G | R | SO §1.1 |
| SAI-19 | Fractionner une saisie entre deux natures | Tous | P2 | G | R | ST §3 |
| SAI-20 | Champ de saisie façon message, en texte libre (« salaire 200000 », « jus 100 », « déplacement 1500 ») : revenu ou dépense, montant et catégorie déduits par un analyseur déterministe ; aperçu en bulle, puis « Annuler » | Tous | P2 | G | D | DEC, SO §1.1 |
| SAI-21 | Détection des récurrents, confirmation en 1 tap | Tous | P2 | G | R | T1 §5, SO §1.3 |
| SAI-22 | Saisie vocale | Tous | P3 | ? | R | HP §2 |
| SAI-23 | Photo de ticket vers une écriture proposée | Tous | P4 | Ent | R | T1 §9 |
| SAI-24 | Solde de départ de chaque poche, première question de l'accueil | Tous | P1 | G | P | BIB |
| SAI-25 | Historique des saisies, avec comptages et « Non détaillé » | Tous | P1 | G | P | BIB |
| SAI-26 | Résumé du mois dans l'historique : revenus reçus et attendus, dépenses, répartition par catégorie, filtre revenus ou dépenses | Tous | P1 | G | D | DEC |
| SAI-27 | Saisies affichées comme une conversation : dépenses en messages sortants, à droite ; revenus en messages entrants, à gauche ; comptages, transferts et « Non détaillé » en repères neutres, au centre | Tous | P1 | G | D | DEC |
| SAI-28 | Si une saisie ressemble à une ligne prévue, à 7 jours près : « C'est ton loyer du 5 ? », en une touche, pour ne pas la compter deux fois | Tous | P1 | G | D | DEC |

### 4.3 POC — Poches et comptes

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| POC-01 | Poches espèces, Mixx et Flooz, en saisie manuelle | Tous | P1 | G | D | DEC, BP §4.3 |
| POC-02 | Vue unique du solde total et par poche | Tous | P1 | G | R | BP §3 |
| POC-03 | Transfert entre poches, avec frais éventuels saisis par l'utilisateur, le dernier montant étant proposé pour un transfert proche : un retrait Mixx n'est ni une dépense ni un revenu | Tous | P1 | G | D | BIB |
| POC-04 | Autres comptes (banque, épargne, prêt) en saisie manuelle | Tous | P3 | Plus | R | T1 §5 |
| POC-05 | Multi-devises | Tous | P5 | Ent | R | T1 §5 |
| POC-06 | Poche mobile money à nommer soi-même, pour les opérateurs hors du Togo | Tous | P1 | G | D | DEC |

### 4.4 REC — Recettes de budget

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| REC-01 | Format de recette en données, validé par schéma, jamais de code | Tous | P1 | — | D | DEC, ST §1 |
| REC-02 | Catalogue de 4 recettes : 50/30/20, 70/20/10, payez-vous d'abord, revenu plancher prudent | Tous | P1 | G | D | BP §4.2, §4.3 |
| REC-03 | Une recette active en gratuit, illimitées avec le pass | Tous | P1 | G / Plus | R | BP §5.2 |
| REC-04 | Dupliquer et ajuster, somme maintenue à 100 % | Tous | P1 | G | R | ST §4 |
| REC-05 | Création par phrase (« 45 / 25 / 25 / 5 »), par analyseur déterministe | Tous | P1 | Plus | R | BP §4.3, ST §8 |
| REC-06 | Règles : pourcentage, montant fixe, le reste, priorité | Tous | P1 | G | D | ST §3 |
| REC-07 | Recette « revenu plancher prudent » : base « revenu le plus bas attendu » ; Vie courante 70 %, Imprévus 20 %, Épargne 10 % ; le surplus va dans « Le reste » | Indé | P1 | G | D | DEC, BP §4.2, ST §5 |
| REC-08 | Signaler les natures qu'aucun pot ne lit | Tous | P1 | G | R | ST §4 |
| REC-09 | Toujours afficher les pots exacts d'une recette, avec sa source | Tous | P1 | G | R | ST §7 |
| REC-10 | La recette la plus proche de ce que l'utilisateur a indiqué, avec la raison, parmi trois ; chaque carte écrit son effet sur le chiffre du jour | Tous | P1 | G | D | DEC, BP §9.1 |
| REC-11 | Catalogue complet : base zéro, enveloppes, anti-budget, 6 pots, Barefoot, Flex, Kakeibo et variantes | Tous | P2 | Plus | R | ST §2 |
| REC-12 | Règles : plafond, objectif daté, périodique, moyenne glissante | Tous | P2 | Plus | R | ST §3 |
| REC-13 | Anneau à tirer pour répartir | Tous | P2 | Plus | R | ST §4 |
| REC-14 | Recettes empilables | Tous | P2 | Plus | R | ST §1 |
| REC-15 | Partir de la réalité : répartition actuelle et recette la plus proche | Tous | P2 | Plus | R | ST §4 |
| REC-16 | Versions d'une recette | Tous | P2 | Plus | R | ST §1 |
| REC-17 | Rituels et garde-fous facultatifs : Kakeibo, BISOU, revue trimestrielle des natures | Tous | P2 | Plus | R | ST §5 |
| REC-18 | Simulateur de recettes sur les 6 derniers mois | Tous | P3 | Plus | R | BP §4.3, ST §5 |
| REC-19 | Trajectoire par paliers, avec date d'arrivée | Tous | P3 | Plus | R | BP §4.3, ST §5 |
| REC-20 | Galerie publique, avec signalement et modération ; pas avant P3 | Tous | P3 | G | D | DEC |
| REC-21 | Profit First et règles par paliers de chiffre d'affaires, seuils convertis pour le marché | Entreprise | P4 | Ent | R | ST §6 |
| REC-22 | La recette devient une hypothèse du prévisionnel | Entreprise | P4 | Ent | R | ST §6 |

### 4.5 POT — Pots

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| POT-01 | Pots virtuels | Tous | P1 | G | R | ST §8 |
| POT-02 | Répartition automatique de chaque revenu reçu | Tous | P1 | G | R | ST §5, SO §1.3 |
| POT-03 | « Mes pots » : cible, réel, reste jusqu'au prochain revenu | Tous | P1 | G | R | ST §5 |
| POT-04 | Déplacer de l'argent d'un pot à l'autre | Tous | P1 | G | R | ST §5 |
| POT-05 | Pots adaptés au pays : tontine, famille, imprévus | Tous | P1 | G | R | BP §4.3 |
| POT-06 | Pot vide : alerte factuelle, sans jamais bloquer une dépense | Tous | P1 | G | D | DEC, ST §5 |
| POT-07 | Pot vide : au choix, bloquer ou emprunter à un autre pot | Tous | P2 | Plus | R | ST §5 |
| POT-08 | Objectifs d'épargne datés, alimentés automatiquement | Tous | P2 | Plus | R | T1 §5, ST §3 |
| POT-09 | Liste des virements à faire vers de vrais comptes | Tous | P3 | Plus | R | ST §5 |
| POT-10 | Pot commun au prorata des revenus, sans révéler les habitudes de l'autre | Perso | P3 | Plus | R | ST §5, HP §8 |
| POT-11 | Vrais sous-comptes bancaires | Entreprise | P5 | Ent | R | ST §6 |
| POT-12 | Après l'adoption d'une recette, « Répartir mon argent maintenant », facultatif : applique la recette au reste à vivre, avec l'effet sur le chiffre affiché avant de valider | Tous | P1 | G | D | DEC |

### 4.6 NAT — Catégories et natures

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| NAT-01 | Catégories avec une nature, pivot de toutes les recettes : changer de recette ne demande aucune recatégorisation | Tous | P1 | G | R | ST §1, §3 |
| NAT-02 | Natures : besoin, envie, épargne, dette, investissement, projet, solidarité et dons, éducation, impôt ou provision, imprévu, tontine, soutien familial | Tous | P1 | G | D | ST §3, BP §4.3, §9.1 |
| NAT-03 | Classement des natures par balayage | Tous | P1 | G | R | SO §2.2 |
| NAT-04 | Libellés sensibles (santé, religion, politique, syndicat) : choisis par l'utilisateur, jamais prédits | Tous | P1 | G | D | BP §9.1 |
| NAT-05 | Consentement à la première utilisation d'un libellé sensible | Tous | P1 | G | D | BP §9.1 |
| NAT-06 | Valeurs initiales de catégories pour le Togo | Tous | P1 | G | R | HP §4 |

### 4.7 PRV — Prévision

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| PRV-01 | Écran d'ouverture « Aujourd'hui » : ce que je peux dépenser, en 0 tap | Tous | P1 | G | R | T1 §5, SO §1.1 |
| PRV-02 | Reste à vivre jusqu'au prochain revenu ; pour un revenu variable, le revenu encore attendu est le plus petit de : plancher au prorata des jours restants, montant attendu au départ moins le revenu déjà noté | Tous | P1 | G | D | DEC, T1 §5 |
| PRV-03 | « Mon horizon » à 30 jours ; la courbe suppose qu'on dépense son chiffre du jour, avec un nouveau rythme après la date de référence, et l'écran l'écrit | Tous | P1 | G | D | DEC, BP §5.2 |
| PRV-04 | « Mon horizon » à 90 jours | Tous | P1 | Plus | R | BP §5.2 |
| PRV-05 | Événements à venir sur la ligne du temps | Tous | P1 | G | R | T1 §5 |
| PRV-06 | Recalcul après chaque saisie ou comptage | Tous | P1 | G | D | DEC, SO §1.3 |
| PRV-07 | « Puis-je me permettre ça ? » : montant + 1 tap ; 3 simulations offertes, puis Pass Plus | Tous | P1 | G / Plus | D | DEC, BP §5.2, SO §1.1 |
| PRV-08 | Chaque chiffre explicable, jusqu'à sa saisie ou sa règle | Tous | P1 | G | R | T1 §4 |
| PRV-09 | Bande d'incertitude sur le variable, nourrie par les habitudes | Tous | P2 | Plus | R | T1 §5, HP §10 |
| PRV-10 | Calendrier local : jours fériés du Togo | Tous | P2 | G | R | T1 §4, §8 |
| PRV-11 | Horizon à un an | Tous | P3 | Plus | R | BP §4.3 |
| PRV-12 | Solde de chaque pot à 3, 6 et 12 mois ; baisse de revenu de 20 % | Tous | P3 | Plus | R | ST §5 |
| PRV-13 | Fiabilité affichée : backtests et écart médian | Tous | P3 | G | R | T1 §8.2 |
| PRV-14 | Scénarios avancés côté particulier | Tous | P3 | Plus | R | BP §4.3 |
| PRV-15 | Repères du solde prévu dans 3, 7 et 30 jours sur « Mon horizon » | Tous | P1 | G | D | DEC |
| PRV-16 | Une ligne prévue non confirmée reste demandée ; un comptage de toutes les poches utilisées referme celles qui le précèdent | Tous | P1 | G | D | DEC |

### 4.8 HAB — Habitudes et prédiction

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| HAB-01 | Tables de fréquences par créneau, sur l'appareil | Tous | P1 | G | D | DEC, HP §4, §10 |
| HAB-02 | Saisie éclair : 3 suggestions du créneau, 2 taps | Tous | P1 | G | R | HP §7 |
| HAB-03 | Autocomplétion de la description et de la catégorie | Tous | P1 | G | R | HP §1, §10 |
| HAB-04 | Montant pré-rempli depuis la plage habituelle, jamais validé seul | Tous | P1 | G | R | HP §1 |
| HAB-05 | « Pourquoi cette suggestion ? », avec la preuve | Tous | P1 | G | R | HP §6, §10 |
| HAB-06 | Page « Ce que l'app a appris de moi » : Juste, Faux, Oublier | Tous | P1 | G | R | HP §6, §10 |
| HAB-07 | Réinitialiser et désactiver l'apprentissage | Tous | P1 | G | R | HP §6, §10 |
| HAB-08 | Application des seuils de confiance (section 6.2) | Tous | P1 | — | D | HP §4, SO §1.3 |
| HAB-09 | Dépenses fantômes : une carte « À confirmer » par jour ; à vérifier face au bilan du soir, qui couvre déjà ce besoin | Tous | P2 | G | R | HP §7, §10 |
| HAB-10 | Rappel au moment habituel, sinon silence | Tous | P2 | G | R | HP §7 |
| HAB-11 | Une habitude stable se promeut en dépense attendue | Tous | P2 | G | R | HP §4, §6 |
| HAB-12 | Interrupteurs par domaine, mode privé | Tous | P2 | G | R | HP §6 |
| HAB-13 | Groupe témoin de 5 à 10 % sans prédictions | Tous | P2 | — | R | HP §9, §10 |
| HAB-14 | Rejeu du modèle sur l'historique réel de l'utilisateur | Tous | P2 | G | R | HP §3 |
| HAB-15 | Modèles légers locaux, calibration, détection de rupture | Tous | P3 | — | R | HP §4, §10 |
| HAB-16 | Alertes douces : dépense inhabituelle, doublon | Tous | P3 | G | R | HP §7 |
| HAB-17 | Prédiction Entreprise : codage par fournisseur, délai de paiement par client, saisonnalité | Entreprise | P4 | Ent | R | HP §7 |
| HAB-18 | Apprentissage collectif et bandits contextuels ; ne se rouvre que sur un gain mesuré | Tous | X | — | D | DEC |

### 4.9 ONB — Onboarding et accueil

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| ONB-01 | Palier 0 : promesse, démo de l'horizon, démarrage à la main | Tous | P1 | G | R | SO §2.2 |
| ONB-02 | Palier 1 : trois questions au plus, puis horizon en 3 minutes visées | Tous | P1 | G | R | SO §2.1, §2.2 |
| ONB-03 | « Quand préfères-tu noter ? » | Tous | P1 | G | D | DEC |
| ONB-04 | Palier 2 : Aujourd'hui, ajout rapide, récurrents, natures | Tous | P1 | G | R | SO §2.2 |
| ONB-05 | Palier 3 : pots, « Puis-je me permettre ça ? » | Tous | P1 | G | R | SO §2.2 |
| ONB-06 | Toujours sautable et reprenable ; « Reprendre » après 30 jours | Tous | P1 | G | R | SO §2.1 |
| ONB-07 | Permission de notification après une valeur, avec une phrase d'explication | Tous | P1 | G | R | SO §2.1 |
| ONB-08 | Palier 4 : fonctions avancées, annoncées quand elles sont verrouillées (« Disponible dans 12 jours ») | Tous | P2 | G | R | SO §2.1, §2.2 |
| ONB-09 | Interrupteur « Tout afficher » | Tous | P2 | G | R | SO §2.2 |
| ONB-10 | Récapitulatif hebdomadaire dans l'app | Tous | P2 | G | R | SO §2.2 |
| ONB-11 | Palier 5 : proposition de passer en Indépendant ou Entreprise | Indé, Entreprise | P4 | Ent | R | T1 §6, SO §2.2 |
| ONB-12 | Onboarding Entreprise en six étapes | Entreprise | P4 | Ent | R | SO §2.3 |

### 4.10 MSG — Rappels, alertes et messages

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| MSG-01 | « Mon rituel » : rappel à l'heure choisie, hors plafond | Tous | P1 | G | D | SO §3.3 ; conversation |
| MSG-02 | Pause automatique du rituel s'il est ignoré plusieurs jours | Tous | P1 | G | D | Conversation |
| MSG-03 | Alerte de découvert prévu, jamais derrière le pass | Tous | P1 | G | R | BP §5.2, §10 |
| MSG-04 | Plafond de 3 notifications par semaine, jamais la nuit | Tous | P1 | G | R | SO §3.3 |
| MSG-05 | Rappel de fin de pass, sans fausse urgence | Tous | P1 | G | D | BP §5.2, SO §3.2 |
| MSG-06 | Orchestrateur complet : priorités, plafonds et pauses par canal | Tous | P2 | — | R | BP §4.3, SO §3.3 |
| MSG-07 | Carte de conseil unique, avec action proposée | Tous | P2 | G | R | SO §1.3, §3.3 |
| MSG-08 | Récapitulatif hebdomadaire en langage naturel | Tous | P3 | Plus | R | T1 §5 |
| MSG-09 | Alerte d'abonnement augmenté | Tous | P3 | G | R | T1 §5 |

### 4.11 UX — Règles communes

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| UX-01 | Budgets d'action par tâche (section 6.1), vérifiés par des tests de parcours | Tous | P1 | — | R | SO §1.1, §4.5 |
| UX-02 | Un seul appel à l'action principal par écran, verbe et résultat | Tous | P1 | — | R | SO §3 |
| UX-03 | Navigation stable : Aujourd'hui, Horizon, Pots, Plus | Tous | P1 | — | D | SO §1.2, §5 |
| UX-04 | Langage courant, sans jargon ni culpabilisation | Tous | P1 | — | R | T1 §4, SO §1.2 |
| UX-05 | Ouverture en moins de 2 s, cibles de 44 pt, usage à une main | Tous | P1 | — | R | SO §1.2 |
| UX-06 | Offre payante seulement après la première valeur, toujours fermable | Tous | P1 | — | R | SO §3.2 |
| UX-07 | Aucun message hors tâche au premier lancement, ni pendant une tâche | Tous | P1 | — | R | SO §3.2 |
| UX-08 | Widget « reste à vivre » | Tous | P2 | G | R | SO §1.1 |
| UX-09 | Deux niveaux de réglages, découpés d'après les données d'usage | Tous | P2 | — | R | SO §1.2 |
| UX-10 | Accueil à disposition fixe et affirmée : chiffre du jour, à venir, poches, carte, saisies du jour ; barre d'action fixe au-dessus des onglets, sans bouton flottant | Tous | P1 | G | D | DEC |
| UX-11 | Statut du jour : anneau sur l'accueil, faits à toucher et paysage généré sur l'appareil à partir de la prévision | Tous | P1 | G | D | DEC |
| UX-12 | Son d'ambiance du statut, coupé par défaut, sans voix ni montant | Tous | P1 | G | D | DEC |
| UX-13 | Expérience inspirée des réseaux sociaux et du jeu (bulles, réponses rapides, gestes), sans série de jours, points, classement ni fil public | Tous | P1 | — | D | DEC |

### 4.12 DON — Compte, données et sécurité

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| DON-01 | Registre unique, écritures immuables, correction invisible par contre-passation, montants en entiers ; partie double calculée à partir des écritures pour vérifier l'équilibre, sans être stockée (validé par le prototype) | Tous | P1 | — | D | DEC, T1 §8.1 |
| DON-02 | Moteur de projection en bibliothèque pure, déterministe et testée | Tous | P1 | — | R | T1 §8.1, BP §7 |
| DON-03 | Compte utilisateur, sans SMS à chaque connexion | Tous | P1 | G | R | BP §5.4 |
| DON-04 | Fonctionnement hors ligne, base locale | Tous | P1 | G | D | DEC, BP §7 |
| DON-05 | Synchronisation sur serveur, qui fait référence | Tous | P1 | G | D | DEC |
| DON-06 | Changement d'appareil : tout est retrouvé. Si le numéro a déjà un compte, jamais de fusion : retrouver le compte, avec confirmation, ou utiliser un autre numéro | Tous | P1 | G | D | DEC |
| DON-07 | Habitudes recalculées depuis le registre sur le nouvel appareil, au lieu d'être envoyées au serveur | Tous | P1 | — | D | BIB |
| DON-08 | Identifiant créé sur l'appareil, aucune saisie comptée deux fois | Tous | P1 | — | D | BP §4.1 |
| DON-09 | Chiffrement au repos, accès strictement limités et journalisés | Tous | P1 | — | R | BP §7 |
| DON-10 | Sauvegardes testées, personne de relais | Tous | P1 | — | R | BP §7 |
| DON-11 | Export complet gratuit en CSV, et suppression du compte | Tous | P1 | G | D | DEC, T1 §4 |
| DON-12 | Libellés et documents traités comme des entrées non fiables | Tous | P1 | — | R | T1 §9, HP §8 |
| DON-13 | Connexion par passkeys | Tous | P3 | G | R | T1 §8.1 |
| DON-14 | Rôles, multi-tenant, journal d'audit inaltérable | Entreprise | P4 | Ent | R | T1 §7, §8.1 |
| DON-15 | SOC 2 ou ISO 27001 pour le B2B | Entreprise | P5 | Ent | R | T1 §10 |
| DON-16 | Exports mis en forme | Tous | P1 | Plus | D | DEC, BP §5.2 |
| DON-17 | Verrouillage facultatif de l'app par l'empreinte ou le code du téléphone, proposé une fois ; une fois actif, notifications sans montant et aperçu masqué | Tous | P1 | G | D | DEC |
| DON-18 | Changer de numéro depuis un téléphone connecté, avec un code envoyé au nouveau numéro | Tous | P1 | G | D | DEC |
| DON-19 | E-mail de secours facultatif, vérifié, pour retrouver son compte sans son numéro ; sur un nouveau téléphone, un compte inactif depuis 90 jours n'ouvre plus avec le seul SMS, car un numéro peut être réattribué | Tous | P1 | G | D | DEC |
| DON-20 | Numéros de la zone UEMOA acceptés au lancement public, longueur vérifiée par pays, sans acquisition active ni adaptation locale | Tous | P1 | G | D | DEC |

### 4.13 PAY — Offres et paiement

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| PAY-01 | Offre gratuite | Tous | P1 | G | R | BP §5.2 |
| PAY-02 | Pass Plus : 1 000 FCFA pour 30 jours, 10 000 FCFA par an | Tous | P1 | Plus | R | BP §5.2 |
| PAY-03 | Site de paiement avec FedaPay : mobile money et cartes | Tous | P1 | Plus | D | DEC, BP §5.3 |
| PAY-04 | Droits du pass rattachés au compte, sur tous les appareils | Tous | P1 | Plus | R | BP §7 |
| PAY-05 | Aucun achat dans l'app Android ; mention du site sans lien | Tous | P1 | Plus | D | DEC, BP §5.3 |
| PAY-06 | Distribution sur Google Play, test fermé compris | Tous | P1 | — | D | DEC, BP §5.3 |
| PAY-07 | Pass Pro : 2 500 FCFA pour 30 jours, 25 000 FCFA par an | Indé | P2 | Pro | R | BP §5.2, §7 |
| PAY-08 | Achat intégré Apple, avec la version iOS | Tous | P3 | Plus | R | BP §5.3 |
| PAY-09 | Stripe, seulement avec une société dans un pays couvert | Tous | P5 | Ent | D | BP §5.3 |
| PAY-10 | Grilles Starter, Growth et Scale, tarif cabinet | Entreprise, Cabinet | P4 | Ent | R | T1 §11 |
| PAY-11 | Apple Pay | Tous | X | — | D | BP §5.3 |

### 4.14 PAR — Partage et croissance

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| PAR-01 | Partager « ma recette » par lien ou image sur WhatsApp, à l'initiative de l'utilisateur | Tous | P1 | G | R | BP §6 |
| PAR-02 | Ouvrir une recette reçue, données seules, confirmation avant adoption | Tous | P1 | G | R | ST §4, §7 |
| PAR-03 | QR code et code court | Tous | P2 | G | R | ST §4 |
| PAR-04 | Espace partagé : couple, colocation, un modèle d'habitudes par personne | Perso | P3 | Plus | R | BP §4.3, HP §8 |

### 4.15 IND — Indépendant

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| IND-01 | Poche d'activité simple dans le MVP, pour que Karim distingue déjà ce qui est à lui | Indé | P1 | G | D | DEC |
| IND-02 | Séparation perso/pro | Indé | P2 | Pro | R | BP §4.2, §5.2 |
| IND-03 | Caisse d'activité | Indé | P2 | Pro | R | BP §4.2, §5.2 |
| IND-04 | Revenu lissé | Indé | P2 | Pro | R | T1 §6, BP §5.2 |
| IND-05 | Dossier de flux : PDF généré et partagé par l'utilisateur, sans score, 2 000 FCFA | Indé, Perso | P2 | Acte | R | BP §5.2 |
| IND-06 | Provisions : TVA, cotisations, impôt | Indé | P3 | Pro | R | T1 §6 |
| IND-07 | Facturation légère et suivi des encaissements | Indé | P3 | Pro | ? | T1 §6 |

### 4.16 B2B — Licences pour les organisations

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| B2B-01 | Pilote gratuit : droits attribués manuellement | Orga | P1 | B2B | D | BP §6, §7 |
| B2B-02 | Licence : Pass Plus pour les bénéficiaires, 500 FCFA par mois | Orga | P2 | B2B | R | BP §5.2 |
| B2B-03 | Code d'activation pour les bénéficiaires | Orga | P2 | B2B | D | BP §5.2 |
| B2B-04 | Ateliers | Orga | P2 | B2B | R | BP §5.2 |
| B2B-05 | Aucun accès de l'organisation aux données individuelles | Orga | P2 | B2B | R | BP §5.2 |

### 4.17 ING — Import et connexions

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| ING-01 | Lecture ou collage des SMS de mobile money | Tous | P3 | Plus | R | BP §4.3, §7 |
| ING-02 | Import CSV et OFX, dédoublonnage | Tous | P3 | Plus | R | T1 §5, §8.1 |
| ING-03 | Agrégateur bancaire agréé, si la couverture locale le permet | Tous | P4 | Ent | R | DEC, T1 §8.1 |
| ING-04 | Import de CAMT.053 et MT940 | Entreprise | P4 | Ent | R | T1 §8.1 |
| ING-05 | « Apportez votre Excel » : reconstruire un prévisionnel | Entreprise | P4 | Ent | R | T1 §12 |
| ING-06 | Import de factures par e-mail et OCR, avec validation | Entreprise | P5 | Ent | R | T1 §9, SO §1.3 |

### 4.18 IA — Assistant et langage naturel

*Règle : les chiffres sortent du moteur déterministe ; l'IA interprète, propose et explique. Les libellés sensibles sont exclus de tout LLM.*

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| IA-01 | Écrire une recette à partir d'une demande, avec accord explicite | Tous | P3 | Plus | R | ST §1, §4 |
| IA-02 | Phrase de recette ambiguë : LLM en secours de l'analyseur | Tous | P3 | Plus | R | ST §8 |
| IA-03 | Extraire une recette d'un article collé | Tous | P3 | Plus | R | ST §4 |
| IA-04 | Assistant : « Combien en restaurants ce trimestre ? », par appels d'outils | Tous | P3 | Plus | R | T1 §5, §9 |
| IA-05 | « Et si… » en langage naturel vers un scénario, diff à confirmer | Entreprise | P4 | Ent | R | T1 §9, SO §1.1 |
| IA-06 | Brouillon de commentaire des écarts, lignes sources citées | Entreprise | P4 | Ent | R | T1 §9 |
| IA-07 | Détection d'anomalies et de fraude, sans blocage automatique | Entreprise | P5 | Ent | R | T1 §9 |

### 4.19 ENT — Entreprise

*Tout ce bloc reste conditionnel : il ne démarre qu'après la validation du marché particulier et indépendant.*

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| ENT-01 | Trésorerie glissante à 13 semaines | Entreprise | P4 | Ent | R | T1 §7 B |
| ENT-02 | Délais de paiement réellement observés par client | Entreprise | P4 | Ent | R | T1 §7 B |
| ENT-03 | Alertes : runway, covenants, découvert prévu | Entreprise | P4 | Ent | R | T1 §7 B |
| ENT-04 | Modèle par drivers : CA, effectifs, investissements, BFR, financement | Entreprise | P4 | Ent | R | T1 §7 C |
| ENT-05 | Budget annuel, reforecast, écarts réel / budget / N-1 | Entreprise | P4 | Ent | R | T1 §7 C |
| ENT-06 | Scénarios façon Git : diff, comparaison, promotion en budget | Entreprise | P4 | Ent | R | T1 §7 C, §8.1 |
| ENT-07 | Trois états simplifiés, à but prévisionnel seulement | Entreprise | P4 | Ent | R | T1 §13 |
| ENT-08 | Rapprochement bancaire assisté, validation par lot | Entreprise | P4 | Ent | R | T1 §13, SO §1.1 |
| ENT-09 | Suivi des factures à encaisser et à payer, relances, sans émission de factures | Entreprise | P4 | Ent | D | DEC |
| ENT-10 | Modèles sectoriels et plan de financement pour la banque | Entreprise | P4 | Ent | R | T1 §7 C, §12 |
| ENT-11 | Rappels d'échéances fiscales et sociales, rapport mensuel | Entreprise | P4 | Ent | R | SO §1.3 |
| ENT-12 | Tableaux de bord, rapports PDF ou PowerPoint | Entreprise | P5 | Ent | R | T1 §7 D |
| ENT-13 | Multi-entités, consolidation, analytique | Entreprise | P5 | Ent | R | T1 §7 D |
| ENT-14 | Monte-Carlo et analyse de sensibilité | Entreprise | P5 | Ent | R | T1 §7 C |
| ENT-15 | Notes de frais avec OCR | Entreprise | P5 | Ent | R | T1 §7 A |
| ENT-16 | Intégrations : paiements, CRM, paie, e-commerce, Excel et Sheets, API et webhooks | Entreprise | P5 | Ent | R | T1 §7 D |
| ENT-17 | Comptabilité complète : partie double visible, journaux, TVA, immobilisations, clôture, SYSCOHADA, exports réglementaires | Entreprise | X | — | D | DEC, T1 §7 A |

### 4.20 CAB — Cabinets

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| CAB-01 | Invitation de l'expert-comptable, accès partagé | Entreprise, Cabinet | P4 | Ent | R | SO §2.3 |
| CAB-02 | Portail multi-clients et modèles réutilisables | Cabinet | P5 | Ent | R | T1 §2, §13 |
| CAB-03 | Marque blanche | Cabinet | P5 | Ent | R | T1 §11 |

### 4.21 LEG — Conformité dans le produit

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| LEG-01 | Déclaration et récépissé de l'IPDCP avant la mise en œuvre | Tous | P1 | — | R | BP §9 |
| LEG-02 | Information préalable de l'IPDCP si le serveur est à l'étranger, selon l'avis du juriste | Tous | P1 | — | ? | BP §9 |
| LEG-03 | Mention « outil d'information, ni conseil financier ni conseil comptable » | Tous | P1 | — | R | T1 §10, ST §7 |
| LEG-04 | Faits, règle de l'utilisateur et conséquence ; pas de « tu devrais », ni de produit financier recommandé | Tous | P1 | — | D | BP §9.1 |
| LEG-05 | Consentement explicite, sans case pré-cochée, pour les usages facultatifs | Tous | P1 | — | R | SO §3.2, §4.4 |
| LEG-06 | Aucun envoi commercial sans consentement préalable | Tous | P1 | — | R | BP §6 |

### 4.22 MES — Mesure interne

| ID | Fonctionnalité | Scope | Phase | Offre | Statut | Source |
| --- | --- | --- | --- | --- | --- | --- |
| MES-01 | Événements de télémétrie, sans montant ni libellé | Tous | P1 | — | R | SO §4.4, HP §5 |
| MES-02 | Événement d'activation (section 6.4) | Tous | P1 | — | D | Conversation |
| MES-03 | Suivi du taux d'abandon entre l'app et le site de paiement | Tous | P1 | — | D | BP §9.2 |
| MES-04 | Rétention au jour 30 et part de payeurs, pour la décision du mois 6 | Tous | P1 | — | R | BP §7, §10 |
| MES-05 | Tableau de bord hebdomadaire des huit KPIs | Tous | P2 | — | R | SO §4.2, §4.5 |
| MES-06 | KPIs de prédiction, calculés sur l'appareil et remontés en compteurs | Tous | P2 | — | R | HP §9 |
| MES-07 | Revue mensuelle « simplifier » | Tous | P2 | — | R | SO §4.5 |
| MES-08 | Score SUS chaque trimestre | Tous | P3 | — | R | SO §4.3 |

## 5. Ce qu'on ne fera pas

| ID | Exclusion | Raison | Source |
| --- | --- | --- | --- |
| EXC-01 | Publicité | Contredit la promesse de confiance | T1 §4, BP §5.2 |
| EXC-02 | Revente de données | Idem | T1 §4, BP §5.2 |
| EXC-03 | Commissions sur le crédit | Idem | BP §5.2 |
| EXC-04 | Score de solvabilité, décision de crédit automatisée | Domaine réglementé ; article 27 de la loi togolaise | HP §8, BP §9 |
| EXC-05 | Déduction d'attributs sensibles, profil dérivé | Articles 21 et 22 de la loi togolaise | HP §8, BP §9.1 |
| EXC-06 | Libellés sensibles dans la télémétrie, le B2B ou un LLM | Idem | BP §9.1 |
| EXC-07 | Détention de fonds, exécution de virements | Resterait à vérifier auprès de la BCEAO | BP §9 |
| EXC-08 | Suggestion qui pousse à dépenser ou contourne un pot vide | Prédire pour enregistrer, pas pour vendre | HP §8 |
| EXC-09 | Suggestion validant seule un montant | Le montant reste au choix de l'utilisateur | HP §1 |
| EXC-10 | Géolocalisation | Sans utilité prouvée pour le MVP ; à rouvrir seulement en opt-in | HP §8, §11 |
| EXC-11 | Culpabilisation, fausse urgence, coût caché | Règles de conception | SO §3.2 |
| EXC-12 | Alerte de découvert ou de sécurité derrière le pass | Règles de conception | SO §3.2, BP §10 |

## 6. Paramètres de référence

*Valeurs de départ, à recaler sur les données réelles. Une nouvelle valeur se change ici.*

### 6.1 Budgets d'action

| Tâche | Budget | Phase |
| --- | --- | --- |
| Voir ce que je peux dépenser | 0 tap | P1 |
| Voir mon solde prévu dans 3, 7 ou 30 jours | 1 tap | P1 |
| Ajouter une dépense via une suggestion | 2 taps | P1 |
| Ajouter une dépense sans suggestion | Montant + 3 taps au plus, 5 s | P1 |
| Choisir Hier ou Avant-hier | + 1 tap | P1 |
| Choisir plusieurs dates | + 1 tap, puis la sélection des dates | P1 |
| Bilan du soir, espèces seules | 30 s | P1 |
| Corriger une catégorie | 2 taps | P1 |
| « Puis-je me permettre ça ? » | Montant + 1 tap | P1 |
| Adopter une recette du catalogue | 3 taps | P1 |
| Créer une recette par phrase | 1 saisie + 1 tap | P1 |
| Noter en texte libre (« jus 100 ») | 1 saisie + 1 tap | P2 |
| Confirmer un récurrent détecté | 1 tap | P2 |
| Rapprocher une ligne bancaire | 0 tap, sinon 1 | P4 |
| Créer un scénario « et si » | 1 phrase + 1 tap | P4 |

### 6.2 Seuils de confiance des suggestions

| Confiance | Comportement |
| --- | --- |
| Moins de 0,5 | Rien n'est affiché |
| De 0,5 à 0,7 | Proposée, non présélectionnée |
| De 0,7 à 0,95 | Présélectionnée, un tap pour valider |
| 0,95 et plus | Automatique, seulement si réversible et à faible enjeu ; jamais pour un montant |

### 6.3 Messages

| Canal | Règle |
| --- | --- |
| « Mon rituel » | Heure choisie, hors plafond ; pause après 5 jours ignorés (valeur de départ) |
| Notifications décidées par l'app | 3 par semaine, jamais la nuit |
| Carte de conseil | 1 prioritaire ; pause de 30 jours après 3 refus d'un même type |
| Conseil contextuel | 1 par session, après une action liée |
| Demande hors tâche | 1 par session ; pause de 7 jours après un refus ; 90 jours après 3 refus |
| E-mail | 1 par semaine, facultatif |

### 6.4 Activation et rétention

- **Activation, provisoire :** du réel enregistré sur au moins 3 jours distincts dans les 7 premiers jours, par saisie ou par bilan.
- **Confirmation :** comparer la rétention au jour 30 des activés et des autres, une fois quelques centaines d'utilisateurs atteints. Une corrélation ne prouvera pas la cause.
- **Actif :** a accompli une action cœur, pas seulement ouvert l'app.
- **Étoile polaire, à débattre :** actifs qui consultent leur prévision chaque semaine.
- **Entreprise :** banque ou fichier importé, première trésorerie à 13 semaines affichée, un scénario créé.

### 6.5 Répartition des données

| Plan | Contenu | Où |
| --- | --- | --- |
| Registre | Saisies, comptages, recettes, pots | Appareil et serveur synchronisé |
| Habitudes | Statistiques dérivées du registre | Appareil ; recalculées en cas de changement d'appareil |
| Télémétrie | Événements sans contenu financier | Serveur, durée limitée |

## 7. Points à trancher

| Question | Recommandation | État | Lignes concernées |
| --- | --- | --- | --- |
| Où héberger les données ? | Selon l'avis du juriste ; à reprendre avant de construire la synchronisation (mois 2) | En attente | LEG-02 |
| La facturation légère des indépendants émet-elle de vraies factures ? | Trancher à l'approche de P3 ; l'émission a été écartée pour le mode Entreprise en P4 | À trancher | IND-07 |
