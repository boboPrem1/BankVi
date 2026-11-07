# Simplicité, onboarding, appels à l’action et mesure

*Approfondissement du brainstorming · 4 novembre 2026*

Pour que l’app reste simple, quatre jeux de règles se complètent : un **budget d’action** par tâche avec l’automatisation comme premier réflexe, un **onboarding en paliers** qui débloque les fonctions avec l’usage, **un seul appel à l’action principal** par écran sous le contrôle d’un orchestrateur central, et **huit KPIs** reliés à des tests automatiques. Chaque règle est écrite pour être vérifiable : ce qui n’est ni mesuré ni testé finit par se dégrader.

| Question | Mécanisme | Vérification |
| --- | --- | --- |
| Simplicité et automatisation | Budget d’action par tâche, échelle d’automatisation | Tests de parcours qui comptent les taps ; taps et temps réels en production |
| Onboarding | Paliers de fonctions débloqués par l’usage | Entonnoir par palier, temps jusqu’à la première valeur, activation à 7 jours |
| Appels à l’action | Un CTA principal par écran, orchestrateur de messages | Règle de code, plafonds de messages, taux de rejet |
| Mesure | Huit KPIs de pilotage et des garde-fous | Tableau de bord hebdomadaire, seuils d’alerte, revue mensuelle « simplifier » |

## 1. Simplicité et automatisation

### 1.1 Un budget d’action par tâche

Chaque tâche cœur reçoit un budget de taps, de champs et de secondes, écrit avant de dessiner l’écran. Ces valeurs sont des hypothèses de départ, resserrées ensuite avec les mesures réelles.

| Tâche | Budget | Comment on le tient |
| --- | --- | --- |
| Voir mon reste à vivre | 0 tap | Écran d’ouverture, widget, notification quotidienne facultative |
| Ajouter une dépense | 3 taps, 5 s | Clavier numérique déjà ouvert, catégorie prédite, date et compte par défaut ; saisie en phrase (« café 3,5 ») |
| Corriger une catégorie | 2 taps | Appui long ; « appliquer aux 4 autres ? » crée une règle |
| Confirmer un récurrent détecté | 1 tap | Carte « Confirmer » ou « Pas récurrent » |
| « Puis-je me permettre ça ? » | Montant + 1 tap | Bouton sur l’horizon, date du jour par défaut |
| Adopter un style du catalogue | 3 taps | Aperçu chiffré sur mes 6 derniers mois, puis « Adopter » |
| Créer un style sur mesure | 1 saisie + 1 tap | Phrase « 45 / 25 / 25 / 5 », résultat en euros immédiat |
| Rapprocher une ligne bancaire (Entreprise) | 0 tap, sinon 1 | Suggestion au-dessus d’un seuil de confiance, validation par lot |
| Créer un scénario « et si » (Entreprise) | 1 phrase + 1 tap | L’IA propose le diff d’hypothèses, on confirme |

### 1.2 Huit règles de conception

1. **Ne jamais demander ce qui se déduit.** Date, compte, devise, catégorie, montant d’un récurrent : déduits, avec le dernier choix de l’utilisateur comme défaut. Seul le montant est obligatoire à la saisie.
2. **Annuler plutôt que confirmer.** Une action réversible s’exécute aussitôt et un bandeau « Annuler » reste dix secondes. La confirmation explicite est réservée à l’irréversible et à ce qui déplace de l’argent.
3. **Une décision par écran.** Pour un choix de configuration, trois options visibles au plus (trois recommandées, puis « Tout voir »).
4. **Deux niveaux, découpés selon la fréquence d’usage.** Le niveau 1 sert environ 80 % des tâches ; le niveau 2 vit derrière une porte nommée honnêtement (« Réglages avancés des pots », jamais « Plus… »). Le découpage vient des données : on instrumente d’abord, on arbitre ensuite.
5. **Des emplacements stables.** Pas de menus qui se réordonnent selon l’usage : la mémoire spatiale est un atout, et l’utilisateur peut épingler lui-même un favori.
6. **Jamais d’information décisive cachée.** Hypothèses de prévision, frais, conditions d’un abonnement, usage des données et alertes (découvert prévu) restent au niveau 1.
7. **Même problème, même geste, même mot, en langage courant.** Un patron pour valider, un pour corriger, un pour reporter ; aucun jargon comptable en mode Simple (« reste à vivre », pas « solde disponible après engagements »).
8. **Vitesse et accessibilité d’office.** Ouverture en moins de 2 s, retour visuel immédiat, tâches de base hors ligne, cibles de 44 pt au moins, usage à une main.

**Deux tests avant chaque livraison**, adaptés de Jakob Nielsen : le **test du plan de travail** (un nouvel utilisateur accomplit la tâche principale avec ce qui est visible au premier écran, sans ouvrir de tiroir) et le **test du briefing** (un utilisateur de retour comprend en 30 secondes sa situation, sa prochaine échéance et la décision qui l’attend).

### 1.3 L’échelle d’automatisation

Chaque automatisme se range selon la confiance du système, la réversibilité et l’enjeu. Les seuils sont à calibrer sur les données (point de départ : automatique au-dessus de 95 % de confiance, suggéré entre 70 % et 95 %).

| Niveau | Quand | Exemple | Garde-fou |
| --- | --- | --- | --- |
| 1. Automatique, silencieux | Confiance très haute, réversible, faible enjeu | Catégoriser un café ; répartir un revenu selon le style | Journal des actions, « Annuler », apprentissage des corrections |
| 2. Suggéré en un tap | Confiance moyenne ou enjeu moyen | « Confirmer cet abonnement ? » | Accepter ou refuser ; le refus est mémorisé |
| 3. Demandé | Confiance faible, irréversible ou argent réel | Virement, suppression d’un pot, envoi d’un rapport externe | Récapitulatif et confirmation explicite |
| 4. Jamais automatique | Engagement légal ou comptable | Clôture, déclaration fiscale | Validation humaine tracée |

À automatiser en premier :

- **Catégories et natures** : modèle et règles, chaque correction devient une règle (niveau 1, puis 2 si la confiance est basse).
- **Récurrents et répartition** : détection des abonnements avec confirmation en un tap (niveau 2) ; répartition de chaque revenu selon le style dès réception (niveau 1).
- **Alerte de creux à venir** : une seule alerte, avec l’action proposée (« Déplacer 80 € depuis Épargne ? »), au niveau 2.
- **Prévision** : recalculée à chaque transaction, sans action de l’utilisateur.
- **Entreprise** : rapprochement bancaire, relances clients (J+7, J+15) validées une fois, import de factures par e-mail, rappels d’échéances fiscales et sociales, rapport mensuel planifié.

## 2. Onboarding progressif

### 2.1 Principes

- **La valeur avant l’effort.** Un premier « Mon horizon » en moins de 3 minutes, avant toute connexion bancaire : démo sur données d’exemple, saisie manuelle de 30 secondes, ou connexion. Dans les apps à saisie manuelle, la valeur arrive en semaine 3 alors que le verdict tombe dès la première minute.
- **Définir l’activation d’abord.** Une seule action prédit le retour au jour 2 : on l’instrumente et on en fait l’objectif de la première session. En Simple : revenu renseigné, au moins 3 flux récurrents confirmés, premier horizon consulté, retour dans les 7 jours. En Entreprise : banque ou fichier importé, première trésorerie à 13 semaines affichée, un scénario créé.
- **Une nouveauté à la fois.** Un seul conseil contextuel par session, déclenché par une action liée, jamais par le calendrier seul.
- **Demander au moment utile.** L’objectif d’épargne quand on ouvre « Pots » ; l’autorisation des notifications après la première alerte utile et une phrase d’explication, car le système ne la propose qu’une fois.
- **Toujours sautable, toujours reprenable.** La progression est sauvegardée ; après 30 jours d’inactivité, un écran « Reprendre où vous vous êtes arrêté ».
- **La complexité suit les données.** Le simulateur de styles n’a de sens qu’avec un mois d’historique. Une fonction verrouillée reste annoncée en une ligne (« Disponible dans 12 jours »), car une fonction cachée n’est jamais découverte.

### 2.2 Plan en paliers (mode Simple)

| Palier | Quand | Visible | Reste caché | Passage au suivant |
| --- | --- | --- | --- | --- |
| **0. Découverte** | Minute 0 à 1 | Promesse en une phrase, démo de « Mon horizon » ; trois chemins : connecter la banque, importer un fichier, démarrer à la main | Tout le reste | Choix d’un chemin |
| **1. Premier horizon** | Jour 0, 5 min au plus | Trois questions au plus (revenu net et jour de paie, charges fixes, style conseillé), puis « Mon horizon » et le reste à vivre | Catégories fines, pots, objectifs | Horizon affiché |
| **2. Prise en main** | Jours 1 à 7 | « Aujourd’hui », ajout rapide, récurrents à confirmer, natures par balayage | Style sur mesure, simulateur, partage | 5 transactions confirmées ou 3 jours d’usage |
| **3. Régularité** | Semaines 2 à 4 | Pots, objectifs, « Puis-je me permettre ça ? », récapitulatif hebdomadaire | Rituels, trajectoire, espaces partagés | 30 jours d’historique |
| **4. Maîtrise** | Mois 2 à 3 | Simulateur de styles, style sur mesure, trajectoire, exports | Rien | À la demande |
| **5. Passage au pro** | Selon les signaux | Proposition « Indépendant » quand des factures émises sont détectées, « Entreprise » à la création d’une société | Rien | Accord explicite |

Un interrupteur « Tout afficher » dans les réglages respecte les utilisateurs avancés.

### 2.3 Plan pour le mode Entreprise

Une première question commune oriente le parcours (« Vous gérez : votre argent personnel, votre activité indépendante, une entreprise ? ») ; elle reste modifiable.

| Étape | Ce qui se passe | Résultat visible | Durée visée |
| --- | --- | --- | --- |
| 1. Compte et rôle | Pays, forme juridique, régime de TVA | — | 2 min |
| 2. Banque ou fichier | Connexion bancaire, ou import Excel et CSV (« Apportez votre Excel ») | Transactions chargées | 5 min |
| 3. Première trésorerie | Construite depuis la banque, les récurrents et les factures | Courbe à 13 semaines | Moins de 15 min |
| 4. Budget et scénarios | Modèle guidé par secteur, premier scénario | Budget vs réel | Semaines 1 à 2 |
| 5. Comptabilité et trois états | Plan comptable, rapprochements, clôture | États financiers | Mois 1 à 3 |
| 6. Équipe | Invitation de l’expert-comptable, rôles | Accès partagé | À la demande |

## 3. Appels à l’action

### 3.1 Hiérarchie

| Niveau | Rôle | Règle | Exemple |
| --- | --- | --- | --- |
| Principal | Fait avancer la tâche | Un seul par écran, en bas (zone du pouce), verbe et résultat | « Confirmer mes 3 abonnements » |
| Secondaire | Alternative raisonnable | Un au plus, contour ou texte | « Modifier » |
| Tertiaire | Échappatoire | Lien discret, toujours présent | « Plus tard » |
| Destructif | Irréversible | Jamais plein ni principal ; annulation prévue | « Supprimer le pot » |

### 3.2 Huit règles

1. **Un écran, une intention, un CTA principal.** Le composant « bouton principal » ne peut apparaître qu’une fois par écran.
2. **Le CTA suit l’état de l’utilisateur**, pas nos priorités commerciales : la « prochaine meilleure action » est choisie par urgence, valeur et effort.
3. **Verbe plus résultat** : « Confirmer mes 3 abonnements », pas « Suivant ».
4. **Un message hors tâche par session au plus** (promotion, nouveauté, enquête, permission), jamais pendant une tâche et jamais au premier lancement. Après un refus : 7 jours de pause ; après 3 refus du même type : arrêt pendant 90 jours.
5. **Pas de CTA concurrents dans un flux.** Navigation globale et bandeaux se masquent pendant une tâche ; la sortie reste possible. Un conseil est une carte avec un CTA et « Ignorer », une seule en tête.
6. **Offre payante seulement après la première valeur**, à un moment de valeur ou à une limite atteinte ; toujours fermable, sans compte à rebours artificiel. Notre penchant : aucune alerte de sécurité ou d’échéance derrière un mur payant.
7. **Aucune manipulation** : ni culpabilisation, ni fausse urgence, ni case pré-cochée pour un consentement, ni coût caché. L’information décisive reste au niveau 1.
8. **Chaque CTA est instrumenté** (affiché, cliqué, résultat) avec un identifiant stable ; même place, même forme, même libellé partout.

### 3.3 Un orchestrateur central de messages

Toute notification, carte, coach mark ou demande passe par un seul service qui décide quoi montrer, quand… ou rien. Priorité : alerte critique, puis demande de l’utilisateur, puis aide et prévision, puis découverte, puis promotion. « Silencieux par défaut » ne veut pas dire « muet » : une étude d’Airship sur 63 millions d’utilisateurs relie l’absence totale de notification à un abandon bien plus fréquent, alors que les éditeurs situent le seuil de lassitude vers 5 à 6 messages par semaine.

| Canal | Plafond de départ | Règle |
| --- | --- | --- |
| Notifications | 3 par semaine, jamais la nuit | Déclenchées par un comportement ou une échéance ; catégories réglables |
| Carte de conseil | 1 prioritaire | 3 refus d’un même type : pause de 30 jours |
| Coach mark | 1 par session | Seulement après une action liée |
| Demande hors tâche | 1 par session | Jamais pendant une tâche ; pause de 7 jours après un refus |
| E-mail | 1 par semaine | Récapitulatif hebdomadaire facultatif |

## 4. Mesures et KPIs

### 4.1 Cadre

On s’appuie sur le cadre HEART de Google (Happiness, Engagement, Adoption, Retention, Task success) et sa méthode objectifs–signaux–mesures, avec peu d’objectifs à la fois : **Adoption** (onboarding), **Task success** (simplicité) et **Retention** (valeur durable). L’étoile polaire reste le nombre d’utilisateurs actifs qui consultent leur prévision chaque semaine. « Actif » veut dire avoir accompli une action cœur, pas seulement ouvert l’app.

### 4.2 Les huit KPIs de pilotage

Cibles et seuils d’alerte sont des hypothèses de départ, à calibrer sur nos premières cohortes.

| KPI | Définition | Cible de départ | Alerte |
| --- | --- | --- | --- |
| 1. Temps jusqu’à la première valeur | De l’installation au premier « Mon horizon » affiché (médiane) | 3 min en Simple, 15 min en Entreprise | Plus de 5 min en Simple |
| 2. Activation à 7 jours | Part des nouveaux utilisateurs qui remplissent la définition d’activation | À calibrer, viser 50 % | Baisse de 5 points sur deux cohortes |
| 3. Tâches dans le budget | Part des tâches cœur terminées dans leur budget de taps et de temps | 90 % | Sous 80 % |
| 4. Catégories sans correction | Part des transactions dont la catégorie et la nature ne sont pas corrigées | 90 % | Sous 85 % |
| 5. Saisies manuelles | Saisies par utilisateur actif et par semaine, selon l’ancienneté | En baisse avec l’ancienneté | Hausse sur deux semaines |
| 6. Réussite et effort | Réussite des tâches cœur sans aide ; score d’effort (1 question, de 1 à 7) | 90 % ; 6 sur 7 | Sous 85 % ; sous 5,5 |
| 7. Pression de messages | Messages hors tâche par utilisateur et par semaine ; part de désactivation des notifications | Sous le plafond ; moins de 5 % par mois | Plafond dépassé ; plus de 8 % |
| 8. Rétention et étoile polaire | Part encore active au jour 30 (action cœur) ; actifs qui consultent leur prévision chaque semaine | Améliorer la tendance de nos cohortes | Cohorte en baisse deux mois de suite |

Repère : au jour 30, la rétention des apps de finance est de 6,6 % sur iOS et de 3,1 % sur Android (données AppsFlyer reprises par Braze en 2026). Il n’existe pas de cible universelle : on compare surtout nos cohortes entre elles.

### 4.3 KPIs de diagnostic

- **Simplicité** : taps et temps par tâche (médiane et p90), erreurs par tâche, abandon par écran de formulaire, signaux de frustration (appuis répétés, retours en boucle) sous 2 % des sessions, questions « comment faire » pour 1 000 actifs.
- **Automatisation** : taux d’acceptation des suggestions, taux d’annulation des actions automatiques (garde-fou : moins de 3 %), part des revenus répartis automatiquement, rapprochement automatique en Entreprise.
- **Onboarding** : abandon et saut par étape, succès de la connexion bancaire, délai avant la deuxième session, nombre de fonctions exposées au jour 7 (4 au plus).
- **CTA** : taux de clic du CTA principal par écran, efficacité du chemin (étapes optimales ÷ étapes réelles, au moins 0,8), offres payantes affichées avant la première valeur (zéro).
- **Qualité et confiance** : erreur de prévision à 30 jours, sessions sans plantage (99,5 % au moins), démarrage à froid sous 2 s, score SUS chaque trimestre (objectif 80 ; moyenne tous produits : 68) sur 30 à 50 répondants.

### 4.4 Plan d’événements

Un petit vocabulaire stable : tâche commencée, terminée, abandonnée (identifiant, nombre d’étapes, durée) ; CTA affiché, cliqué ; message affiché, ignoré, désactivé ; suggestion affichée, acceptée, refusée, annulée ; étape d’onboarding vue, terminée, sautée ; palier débloqué. Propriétés : palier, mode (Simple ou Entreprise), style, version. **Jamais de montant ni de libellé bancaire dans les événements de télémétrie**, consentement explicite, outil d’analytics respectueux de la vie privée (auto-hébergé si possible), pas d’enregistrement d’écran sur les écrans financiers.

### 4.5 Comment s’assurer que les règles tiennent

| Mécanisme | Ce qu’il garantit | Quand |
| --- | --- | --- |
| Budgets d’action écrits dans le dépôt et tests de parcours qui comptent les taps ; build rouge en cas de dépassement (à prototyper) | Les tâches restent dans leur budget | À chaque build |
| Règles de composants : un seul bouton principal par écran, cibles de 44 pt, contraste, libellés | CTA et accessibilité | À chaque build |
| Orchestrateur central : plafonds, priorités, pauses | Budget d’attention | En continu |
| Définition de « terminé » UX : budget d’action, défaut, état vide, annulation, événement, texte simple, revue éthique ; fiche d’entrée de fonctionnalité (tâche visée, budget, critère d’arrêt) | Pas de complexité sans raison | Chaque fonction |
| Tableau de bord hebdomadaire des huit KPIs avec seuils d’alerte | Détection de la dérive | Chaque semaine |
| Tests du plan de travail et du briefing : 5 nouveaux utilisateurs et 5 habitués par palier | Compréhension réelle | Chaque palier et version |
| Revue mensuelle « simplifier » : fonctions sous le seuil d’usage rétrogradées ou retirées | Complexité maîtrisée | Chaque mois |
| Expériences contrôlées avec garde-fous (activation, jour 7, plaintes) | Effet réel d’un changement | Avant déploiement |

## 5. Décisions à trancher et prochaines étapes

1. **Définition d’activation**, en Simple et en Entreprise (section 2.1).
2. **Navigation** : quatre destinations au plus en Simple (Aujourd’hui, Horizon, Pots, Plus) et six en Entreprise ?
3. **Plafond de messages** par défaut : trois par semaine ?
4. **Seuils de confiance** de l’automatisation : 95 % pour l’automatique, 70 % pour le suggéré ?
5. **Analytics** : outil auto-hébergé ou service tiers, et texte de consentement.
6. **Alertes protégées** : lesquelles ne passeront jamais derrière un mur payant ?

**Prochaines étapes proposées**

- Écrire les budgets d’action des tâches cœur dans un fichier de configuration.
- Maquetter les paliers 0 et 1 de l’onboarding et les passer au test du premier clic.
- Spécifier l’orchestrateur de messages (priorités, plafonds, pauses).
- Définir le plan d’événements v0 et le tableau de bord des huit KPIs.

## Sources consultées (4 novembre 2026)

*Pages lues en entier : Nielsen et Braze. Les autres sont des aperçus de recherche, à recouper ; plusieurs sont des blogs d’éditeurs.*

- **Divulgation progressive :** [Jakob Nielsen, UX Tigers](https://www.uxtigers.com/post/progressive-disclosure) (9 juillet 2026)
- **Rétention et notifications :** [Braze](https://www.braze.com/resources/articles/mobile-app-retention) (24 juillet 2026) · [Airship](https://grow.urbanairship.com/rs/313-QPJ-195/images/WP_App_Retention_Rates_Benchmarks.pdf) · [MessageFlow](https://messageflow.com/?p=3404)
- **Mesure :** [Amplitude, cadre HEART](https://www.amplitude.com/blog/heart-framework-software-ux.md) · [MeasuringU, SUS](https://www.measuringu.com/sus/)
- **Onboarding :** [mwm.ai](https://mwm.ai/guides/app-onboarding-best-practices) · [Level Up, apps à saisie manuelle](https://levelup.gitconnected.com/onboarding-that-drops-users-into-a-working-app-not-an-empty-shell-fa957fedbba6)
