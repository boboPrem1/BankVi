# Business plan et business model — BankVi au Togo

*Version 0.8 · 7 novembre 2026 · Tous les chiffres de projection sont des hypothèses à tester, pas des résultats.*

## 1. Synthèse

**BankVi peut être une petite entreprise rentable en année 3 au Togo, mais elle ne paiera pas son fondateur au mois 6.** Le scénario de base vise 18,6 M FCFA de chiffre d'affaires net en année 3 (environ 28 400 €) et 2,3 M FCFA de résultat. Pour rémunérer le fondateur 300 000 FCFA par mois dès le mois 7, le besoin de trésorerie atteint environ 6,6 M FCFA ; nous recommandons d'en prévoir 9 M FCFA (environ 13 700 €).

**Le produit.** Une app de prévision en FCFA pour les personnes qui gèrent surtout des espèces. L'utilisateur choisit une recette de budget, voit son argent à venir, puis enregistre le réel à son rythme : dépense par dépense dans la journée, ou d'un seul geste le soir.

**Le modèle.** Une offre gratuite, un pass de 1 000 à 2 500 FCFA pour 30 jours, un dossier de flux à l'acte et des licences pour employeurs et institutions de microfinance. Ni publicité, ni revente de données.

**Pour que cela fonctionne, quatre choses doivent être vraies :**

1. **L'enregistrement du réel tient dans la durée.** Sans lui, la prévision perd sa valeur. C'est le premier point à tester.
2. **La cible peut payer facilement.** Le mobile money ne peut pas être proposé dans une app Google Play au Togo (section 5.3).
3. **Environ 5 % des actifs paient.** En dessous, le plan de base ne tient pas.
4. **Des organisations achètent des licences.** Elles représentent 39 % du chiffre d'affaires de l'année 3 dans le scénario de base.

**Décisions déjà prises :** marché togolais, Camille et Karim comme personas héros, fondateur seul, pas de comptabilité complète, recettes dans le MVP, pas de connexion bancaire, données synchronisées sur serveur, lancement sur Google Play sans achat dans l'app, mobile money via FedaPay sur le site, six mois au maximum sans revenu pour le fondateur.

## 2. Marché togolais

**L'accès au numérique n'est pas le principal frein : c'est la capacité à payer.** Le mobile money est massif et en forte croissance, mais les revenus restent bas et l'emploi très majoritairement informel.

| Indicateur | Valeur | Date | Source |
| --- | --- | --- | --- |
| Population | 8,76 M (ARCEP) ou 9,77 M (DataReportal, ONU) | T1 2026 ; oct. 2025 | [ARCEP](https://arcep.tg/wp-content/uploads/2026/06/Obs-marches_T1-2026.pdf), [DataReportal](https://datareportal.com/reports/digital-2026-togo) |
| Âge médian ; population urbaine | 19,1 ans ; 45,8 % | Fin 2025 | [DataReportal](https://datareportal.com/reports/digital-2026-togo) |
| Internautes | 3,62 M (37 %) | Fin 2025 | [DataReportal](https://datareportal.com/reports/digital-2026-togo) |
| Abonnements data haut débit | 5,46 M (cartes SIM, pas des personnes) | T1 2026 | [ARCEP](https://arcep.tg/wp-content/uploads/2026/06/Obs-marches_T1-2026.pdf) |
| Comptes mobile money | 5,20 M (59,3 %) : Mixx 3,05 M, Flooz 2,15 M | T1 2026 | [ARCEP](https://arcep.tg/wp-content/uploads/2026/06/Obs-marches_T1-2026.pdf) |
| Valeur des transactions mobile money | 1 844 Mds FCFA par trimestre, +52 % sur un an | T1 2026 | [ARCEP](https://arcep.tg/wp-content/uploads/2026/06/Obs-marches_T1-2026.pdf) |
| Points de vente mobile money | 61 157 | T1 2026 | [ARCEP](https://arcep.tg/wp-content/uploads/2026/06/Obs-marches_T1-2026.pdf) |
| Identités sur les réseaux sociaux | 644 000 (6,6 %), sans doute pas des personnes uniques | Oct. 2025 | [DataReportal](https://datareportal.com/reports/digital-2026-togo) |
| SMIG | 52 500 FCFA par mois | Depuis janv. 2023 | [wage.is](https://wage.is/togo/) |
| Salaire moyen du secteur formel | Environ 100 000 FCFA par mois (estimation) | 2024 | [wage.is](https://wage.is/togo/) |
| Main-d'œuvre informelle | 92,8 % (OIT, chiffre ancien) | Non datée dans la note | [WIEGO](https://wiego.org/wp-content/uploads/2022/04/social-protection-brief-4-francais.pdf) |

*Manquent encore : le nombre de smartphones et la part des dépenses réglées en espèces. L'hypothèse « priorité aux espèces » reste donc à confirmer sur le terrain.*

**Estimation de la cible.** Seule la première ligne est une donnée ; les suivantes sont nos hypothèses.

| Étape | Effectif | Hypothèse |
| --- | --- | --- |
| Internautes | 3 620 000 | Donnée DataReportal |
| Adultes avec un revenu à gérer et un smartphone | 1 086 000 | 30 % des internautes |
| Personnes prêtes à essayer un outil de budget | 108 600 | 10 % de l'étape précédente |
| Actifs mensuels visés en année 3 | 20 000 | Scénario de base |
| Payeurs visés en année 3 | 1 000 | 5 % des actifs |

**Levier d'expansion.** Le franc CFA ouest-africain est commun aux huit pays de l'UEMOA : la devise ne change pas au Bénin ou en Côte d'Ivoire. Les règles locales et les moyens de paiement, eux, restent à vérifier pays par pays.

## 3. Concurrence et alternatives

**Le vrai concurrent est l'absence d'outil : la mémoire, le cahier et le solde du mobile money.** Nous n'avons trouvé aucune app de budget propre au Togo, mais une seule recherche web ne suffit pas pour conclure.

| Alternative | Force | Limite | Réponse de BankVi |
| --- | --- | --- | --- |
| Mémoire, cahier | Gratuit, immédiat | Pas de prévision, abandon fréquent (hypothèse) | Un rituel aussi court, avec la prévision en plus |
| Applis Mixx et Flooz | Déjà installées | Centrées sur les opérations du portefeuille, sans espèces | Une vue unique sur espèces, Mixx et Flooz |
| [Sika App](https://www.sika-app.org/) (Côte d'Ivoire) | FCFA, hors ligne, gamification ; 1 500 FCFA par mois | Suivi et budgets ; alertes de dépassement en Pro | Recettes, horizon et bilan par écart de caisse |
| Tontine | Discipline collective, confiance | Ne dit rien du reste du budget | La tontine devient un pot de la recette |
| Apps mondiales de budget | Produits matures | Pensées pour des comptes bancaires connectés | Conçu pour les espèces et le FCFA |

**Risque à surveiller.** Sika App occupe déjà le créneau en Côte d'Ivoire, et un opérateur de mobile money pourrait ajouter un budget gratuit. L'avantage de BankVi doit donc venir de la prévision et du rituel, pas de la seule saisie.

## 4. Proposition de valeur et MVP

**La promesse : « Sache chaque matin ce que tu peux dépenser, et garde ton réel à jour à ton rythme. »**

### 4.1 Le suivi du réel sans corvée

Deux façons de faire coexistent, sans réglage à verrouiller : on peut noter au fil de la journée, faire le point le soir, ou mélanger les deux. La question posée à l'accueil (« Quand préfères-tu noter ? ») ne change que le rappel et l'écran d'accueil.

| | Au fil de la journée | Le soir |
| --- | --- | --- |
| Geste | Montant, suggestion, valider | Compter sa poche, ou noter plusieurs dépenses d'affilée |
| Rappel | Aucun par défaut | À l'heure choisie |
| Fin de journée | Comptage facultatif pour vérifier | L'app calcule l'écart et propose de le répartir |

**Saisir une dépense ou un revenu**

1. **La date « Aujourd'hui » est présélectionnée.** Le cas courant n'ajoute donc aucun tap.
2. **Les autres dates sont à un tap :** Hier, Avant-hier, Autre date (calendrier).
3. **« Plusieurs dates »** ouvre le calendrier en sélection multiple ou par période. Avant de valider, l'app affiche le total : « 5 dépenses de 1 000 FCFA, soit 5 000 FCFA ». Le montant saisi vaut donc pour chaque date.

**Règles du moteur à fixer dès le début**

- **Une ligne par date.** Chaque date crée sa propre opération, reliée à un groupe. On peut modifier ou supprimer une seule date, ou tout le groupe.
- **Le réel s'arrête à aujourd'hui.** Une date future crée une ligne « prévue », affichée comme telle, jamais du réel.
- **Le comptage fait foi.** Une saisie tardive, antérieure au dernier comptage, ne change pas le solde compté : elle vient détailler l'écart de la période. Si elle le dépasse, l'app signale un nouvel écart à expliquer.
- **Pas de doublon à la synchronisation.** Chaque ligne reçoit son identifiant sur l'appareil, pour qu'une saisie hors ligne ne soit jamais comptée deux fois.

**Le bilan du soir.** L'utilisateur indique ce qu'il lui reste en espèces, avec ses soldes Mixx et Flooz s'il le souhaite. L'app déduit les dépenses déjà notées, calcule l'écart et propose de le répartir selon les habitudes (« Déjeuner, transport ? »). Un écart peut rester « non détaillé » sans reproche. Un bilan oublié ne casse rien : le comptage suivant rattrape l'écart sur plusieurs jours.

La recette et l'horizon se recalculent après chaque saisie ou comptage, et le matin suivant s'appuie sur ce réel. C'est la principale hypothèse produit de ce plan, et elle se teste avec le MVP, auprès d'un groupe restreint, avant le lancement public (section 10).

### 4.2 Camille et Karim

| | Camille, salariée | Karim, indépendant |
| --- | --- | --- |
| Question | « Vais-je tenir jusqu'à la paie ? » | « Qu'est-ce qui est vraiment à moi ? » |
| Revenu | Régulier | Irrégulier, souvent en espèces |
| Recette type | 50/30/20 ou « payez-vous d'abord » | Revenu plancher prudent, le reste en pots |
| Spécifique | Date de paie, charges fixes | Séparation perso/pro, caisse d'activité |
| Offre | Pass Plus | Pass Pro, dossier de flux |

### 4.3 Périmètre

| Dans le MVP | Après le MVP |
| --- | --- |
| Poches : espèces, Mixx, Flooz, en saisie manuelle ; poche d'activité simple pour les indépendants | Lecture ou collage des SMS de mobile money |
| Recettes : 3 ou 4 au catalogue et création par phrase (« 45 / 25 / 25 / 5 ») | Simulateur de recettes, galerie publique, trajectoires |
| Pots adaptés au pays : tontine, famille, imprévus | Espaces partagés |
| « Mon horizon » à 30 et 90 jours, solde prévu dans 3, 7 et 30 jours, « Puis-je me permettre ça ? » | Horizon à un an, scénarios avancés |
| Saisie en temps réel, dates passées et multiples, bilan du soir, écart de caisse, résumé du mois, statut du jour, rappel choisi | Saisie en texte libre (« jus 100 »), orchestrateur complet de messages |
| Habitudes par tables de fréquences | Modèles plus lourds, LLM, assistant |
| Hors ligne et synchronisation sur serveur chiffrée | Banque, comptabilité, mode Entreprise |

**À adapter dans les notes existantes.** Le FCFA n'a pas de centimes en usage courant, et les exemples sont en euros. Les natures doivent intégrer la tontine et le soutien familial.

## 5. Business model

### 5.1 Canvas

| Bloc | Choix |
| --- | --- |
| Clients | Salariés et indépendants urbains ; ensuite employeurs, institutions de microfinance, associations |
| Proposition de valeur | Savoir quoi dépenser et suivre le réel à son rythme, sans banque |
| Canaux | Bouche-à-oreille, partage de recettes sur WhatsApp, associations, employeurs |
| Relation | Rituel quotidien, ton sans culpabilisation, support WhatsApp |
| Revenus | Pass prépayés, dossier de flux, licences B2B |
| Ressources clés | Moteur de projection, format de recette, données de l'utilisateur sous son contrôle |
| Activités clés | Produit, terrain, conformité |
| Partenaires | FedaPay, Google Play, employeurs, microfinance, juriste local |
| Coûts | Temps du fondateur, hébergement, codes de connexion, conformité, acquisition |

### 5.2 Offres

Les prix sont à tester. Repère : Sika App affiche [1 500 FCFA par mois et 15 000 FCFA par an](https://www.sika-app.org/).

| Offre | Prix | Contenu |
| --- | --- | --- |
| Gratuit | 0 FCFA | Saisie, résumé du mois, 3 simulations « Puis-je me permettre ça ? » offertes, une recette, bilan du soir, horizon à 30 jours avec solde prévu dans 3, 7 et 30 jours, alertes de découvert, poche d'activité, export complet en CSV |
| Pass Plus | 1 000 FCFA pour 30 jours ; 10 000 FCFA par an | Horizon à 90 jours, recettes illimitées, « Puis-je me permettre ça ? », exports mis en forme |
| Pass Pro | 2 500 FCFA pour 30 jours ; 25 000 FCFA par an | Plus, avec séparation perso/pro, caisse d'activité, revenu lissé |
| Dossier de flux | 2 000 FCFA l'unité | PDF de ses flux, généré et partagé par l'utilisateur lui-même, sans score |
| Licence B2B | 500 FCFA par bénéficiaire et par mois (repère : 1,2 M FCFA par an pour 200 personnes) | Pass Plus et ateliers, sans aucun accès de l'organisation aux données individuelles |

**Pourquoi un pass prépayé.** Il se rapproche de l'achat de forfaits, et un prélèvement automatique par mobile money via FedaPay reste à vérifier. Si le renouvellement est manuel, le taux de renouvellement devient l'indicateur à suivre de près.

**Sources de revenus exclues :** publicité, revente de données, commissions sur le crédit. Elles contrediraient la promesse de confiance.

### 5.3 Encaisser : les règles des stores décident du montage

**L'app est distribuée sur Google Play, et FedaPay encaisse sur le site de BankVi, pas dans l'app.** Les quatre moyens de paiement envisagés ne peuvent pas cohabiter dans l'app.

| Moyen | Verdict | Pourquoi |
| --- | --- | --- |
| **FedaPay** | Oui, sur le site uniquement | [Togo pris en charge](https://support.fedapay.com/portal/en/kb/articles/fedapay-fonctionne-t-il-dans-mon-pays), [Moov et T-Money ainsi que Visa et Mastercard](https://docs-v1.fedapay.com/payments/payment-methods) listés dans une documentation ancienne. Il faut une existence légale et confirmer Mixx et Flooz. |
| **Google Play Billing** | Non, l'app ne vend rien en interne | Obligatoire pour [les fonctions numériques vendues dans l'app](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en). [15 %](https://support.google.com/googleplay/android-developer/answer/112622?hl=en) de commission. Le fondateur a constaté que Play ne propose pas le mobile money ; [la règle par défaut](https://support.google.com/googleplay/answer/2651410?hl=en), dont relève le Togo, indique les cartes. |
| **Achat intégré Apple** | Oui, si une version iOS existe | [Obligatoire pour débloquer des fonctions numériques](https://developer.apple.com/app-store/review/guidelines/) (règle 3.1.1). iOS pèse [environ 16 % au Togo](https://gs.statcounter.com/os-market-share/mobile/togo) en octobre 2026. |
| **Apple Pay** | Non | Réservé par Apple aux biens et services physiques et à quelques cas précis (règles 3.1.3 et 3.2.1), et [non disponible au Togo](https://support.apple.com/en-us/102775). |
| **Stripe** | Pas au lancement | [Le Togo ne figure pas parmi les pays listés](https://stripe.com/global). Il faudrait une société étrangère, et FedaPay couvre déjà les cartes. |

**Le blocage principal.** Une app Play ne peut pas proposer FedaPay ni [orienter vers un autre moyen de paiement](https://support.google.com/googleplay/android-developer/answer/10281818?hl=en). Les programmes d'exception [ne citent aucun pays africain](https://support.google.com/googleplay/android-developer/answer/17161464?hl=en). Un guide tiers annonce [le reste du monde pour septembre 2027](https://www.revenuecat.com/app-to-web-purchase-guidelines), sans confirmation de Google.

**Décision : aucun achat dans l'app Android.** Puisque Play ne propose pas le mobile money, un bouton d'achat Play exclurait une grande partie de la cible et interdirait de parler du site dans l'app. L'app gère la connexion et les droits du pass, et peut [mentionner le site sans lien](https://support.google.com/googleplay/android-developer/answer/10281818?hl=en) (« Rends-toi sur bankvi.tg »). Le paiement se fait sur le site via FedaPay, pour environ 3 % de frais. Cette lecture des règles reste à confirmer avant de soumettre l'app.

**Si une version iOS arrive,** Apple [autorise l'accès à un achat fait ailleurs](https://developer.apple.com/app-store/review/guidelines/), à condition que l'achat intégré soit aussi proposé dans l'app (règle 3.1.3(b)). Elle n'est pas prévue au lancement : son public est plus petit et elle coûte 99 $ par an, plus du temps de test.

**Frais et formalités à confirmer.** FedaPay affiche [1,80 % en mobile money et 3,60 % par carte au Bénin](https://www.fedapay.com/pricing), sans tarif pour le Togo. Le modèle garde 3 % en attendant une grille écrite ; [des taxes et frais de reversement](https://kolonell.com/fr/blog/frais-caches-paiement-mobile-money-benin-togo-moov-mtn-2026) peuvent s'y ajouter. Google [permet l'inscription depuis le Togo](https://support.google.com/googleplay/android-developer/answer/9306917?hl=en), et [reverse en dollars par virement, à partir de 100 $](https://support.google.com/googleplay/android-developer/answer/3092739?hl=en). Un compte développeur personnel récent doit faire [un test fermé avec 12 testeurs pendant 14 jours consécutifs](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en) avant la production.

### 5.4 Économie unitaire

| Mesure | Hypothèse | Résultat |
| --- | --- | --- |
| Revenu moyen par payeur | 80 % Plus, 20 % Pro | 1 300 FCFA par mois |
| Revenu net de frais de paiement | 3 % de frais | 1 261 FCFA par mois |
| Durée de vie d'un payeur | 12 % de non-renouvellement par mois | 8,3 mois, soit 10 500 FCFA |
| Coût d'un actif | Serveur, codes de connexion, support | 40 FCFA par mois |
| Marge par payeur, après le coût de 20 actifs | 5 % de payeurs | 461 FCFA par mois, soit environ 3 800 FCFA sur sa durée de vie |

**Deux conséquences :**

- **La publicité payante n'est pas viable à ce stade.** L'acquisition doit rester quasi gratuite tant que la marge n'est pas prouvée.
- **Le coût d'un actif est le principal levier.** À 15 FCFA par mois au lieu de 40, la marge par payeur double (961 FCFA). Cela plaide pour le stockage sur l'appareil avec synchronisation légère, et pour éviter les SMS à chaque connexion.

## 6. Mise sur le marché

**Objectif : 1 000 actifs sans publicité payante, en passant par des groupes de confiance plutôt que par les réseaux sociaux.** Avec 644 000 identités sociales, cette portée semble limitée, et la marge ne permet pas de l'acheter.

1. **50 à 100 testeurs** recrutés par le réseau du fondateur, avec un groupe WhatsApp de retours, sur le test fermé de Google Play.
2. **20 entretiens parmi ces testeurs,** salariés et indépendants à Lomé, pendant qu'ils utilisent le MVP.
3. **Partage de recettes :** un lien ou une image « ma recette » à envoyer sur WhatsApp. C'est le seul mécanisme viral du produit.
4. **Groupes existants :** associations, tontines, groupes professionnels, incubateurs et espaces de coworking, avec un atelier de 30 minutes.
5. **Premières organisations :** un employeur et une institution de microfinance en pilote gratuit, pour obtenir des preuves avant de vendre.

**Attention :** la [prospection directe sans consentement préalable est interdite](https://www.lqdd.org/donnees-personnelles-entreprise-togo/) (article 26), y compris par SMS ou WhatsApp. Le partage doit venir de l'utilisateur, jamais d'envois à des listes de numéros.

## 7. Plan d'exécution en solo

**Le fondateur s'accorde six mois sans revenu : le plan se concentre donc sur une décision à la fin du mois 6.** Les seuils sont des hypothèses de départ.

| Période | Contenu | Condition pour continuer |
| --- | --- | --- |
| Mois 1 à 3 | MVP Android [construit par étapes](../produit/deploiement_tests_p1.md) : moteur et maquette testés d'abord, puis saisie, bilan et horizon avec 10 à 15 testeurs, puis recettes, statut et synchronisation avec 25 à 30. En parallèle : avis d'un juriste, grille FedaPay, déclaration à l'IPDCP dès le mois 1 ou 2 ; création de l'entreprise après le premier test, si les délais le permettent | Chaque étape passe son critère ; récépissé obtenu avant la synchronisation |
| Mois 4 à début du mois 5 | Test restreint complet avec site de paiement : test fermé Play (14 jours au moins), entretiens, prévente. Premiers rendez-vous B2B, recherche de financement | Au moins 40 % des testeurs ont du réel enregistré 5 jours sur 7 |
| Mois 5 | Lancement public et payant, partage de recettes, un ou deux pilotes B2B | Paiements réels reçus |
| Mois 6 | Mesure, puis décision | Voir ci-dessous |

**Décision de la fin du mois 6.** Elle ne peut porter que sur des signaux précoces : une cohorte lancée au mois 5 n'atteint son jour 30 que vers le mois 6, et les revenus resteront très faibles.

| Signaux | Décision |
| --- | --- |
| Rétention du jour 30 d'au moins 20 %, 3 % de payeurs, et une lettre d'intention B2B ou un financement obtenu | Continuer à plein temps |
| Rétention et payeurs atteints, mais ni contrat ni financement | Continuer à temps partiel, avec un revenu extérieur |
| Rétention sous les 20 % ou aucun paiement | Arrêter ou changer de produit |

**Dès le lancement public,** les numéros de la zone UEMOA sont acceptés, sans acquisition active ni adaptation locale.

**Après le mois 6, si le projet continue :** Pass Pro et dossier de flux, licences B2B, puis lecture des SMS et étude du Bénin ou de la Côte d'Ivoire en année 2.

**Le calendrier reste serré pour un développeur seul :** trois mois couvrent à peine ce MVP. Si un délai glisse, couper le périmètre vaut mieux que repousser le lancement, en commençant par la création de recette par phrase et les exports mis en forme.

**Socle technique.** Moteur de projection en TypeScript pur, app Android hors ligne avec base locale, site de paiement et serveur Postgres qui fait référence pour la synchronisation. Une base React Native (Expo) réutiliserait le moteur et faciliterait une future version iOS ; ce choix reste à confirmer au moment de l'architecture. L'utilisateur retrouve tout en changeant d'appareil, et le pass est rattaché à son compte. Le chiffrement au repos protège contre le vol de disque, mais pas contre un accès au serveur en fonctionnement ; il faudra donc limiter strictement les accès et les journaliser.

**Forme juridique.** Une entreprise individuelle suffit au départ (environ [40 000 FCFA](https://kolonell.com/fr/blog/creer-entreprise-togo-cfe-lome-2026)). Une SARL (environ 130 000 à 300 000 FCFA) devient utile avec les contrats B2B ou un associé. Ces montants viennent d'un article d'éditeur et sont à confirmer auprès du CFE, tout comme le régime fiscal.

**Risque de personne clé.** Le fondateur seul est le point de fragilité principal : sauvegardes testées, documentation et une personne de confiance capable de reprendre l'accès aux serveurs sont à prévoir.

## 8. Prévisions financières sur 3 ans

**Avec un fondateur payé dès le mois 7, le scénario de base atteint l'équilibre en année 3 ; le scénario bas ne doit pas être poursuivi.** Montants en millions de FCFA, arrondis.

| Scénario | Année | Actifs en fin d'année | Payeurs en fin d'année | Contrats B2B | CA net | Coûts | Résultat |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bas | 1 | 800 | 24 | 0 | 0,1 | 3,5 | -3,4 |
| Bas | 2 | 2 500 | 75 | 1 | 2,0 | 6,9 | -4,9 |
| Bas | 3 | 6 000 | 180 | 2 | 4,4 | 9,6 | -5,2 |
| **Base** | 1 | 2 000 | 100 | 0 | 0,6 | 4,1 | -3,6 |
| **Base** | 2 | 8 000 | 400 | 2 | 6,5 | 9,5 | -3,0 |
| **Base** | 3 | 20 000 | 1 000 | 6 | 18,6 | 16,3 | +2,3 |
| Haut | 1 | 4 000 | 320 | 1 | 3,0 | 4,8 | -1,8 |
| Haut | 2 | 18 000 | 1 440 | 4 | 19,2 | 14,4 | +4,8 |
| Haut | 3 | 45 000 | 3 600 | 12 | 55,6 | 31,1 | +24,5 |

**Hypothèses du modèle.**

| Poste | Bas | Base | Haut |
| --- | --- | --- | --- |
| Part de payeurs parmi les actifs | 3 % | 5 % | 8 % |
| Achat annuel d'un dossier de flux (part des actifs) | 1 % | 3 % | 5 % |
| Acquisition, années 1 / 2 / 3 (M FCFA) | 0,4 / 1 / 2 | 0,8 / 2 / 4 | 1,2 / 4 / 8 |
| Rémunération du fondateur, années 1 / 2 / 3 (M FCFA) | 1,8 / 3,6 / 3,6 | 1,8 / 3,6 / 3,6 | 1,8 / 3,6 / 6 |

Communs aux trois : 1 300 FCFA par payeur et par mois, 3 % de frais de paiement sur les pass et dossiers, 8 mois de vente en année 1, 40 FCFA de coût par actif et par mois, 1,2 M FCFA par contrat B2B, 1,2 / 1,5 / 2 M FCFA de frais fixes (outils, juridique, comptable). Le fondateur reçoit 300 000 FCFA par mois à partir du mois 7, montant de travail à remplacer par son besoin réel. Les actifs de l'année sont approchés par la moyenne entre début et fin d'année.

**Ce que cela veut dire :**

- **BankVi ne remplacera pas un revenu au mois 6.** Même au mois 12, 100 payeurs ne rapportent qu'environ 130 000 FCFA par mois dans le scénario de base. Payer le fondateur après le mois 6 suppose un financement, des contrats B2B ou un revenu extérieur.
- **Financement.** Avec cette rémunération, le creux de trésorerie du scénario de base atteint 6,6 M FCFA fin d'année 2. D'où la recommandation de 9 M FCFA, avec la même marge de 2 à 2,5 M FCFA qu'avant. Un financement se cherche dès le mois 4 : au mois 6, il serait trop tard.
- **Le coût de la décision du mois 6 est faible.** Il faut environ 1 M FCFA de frais, plus les dépenses personnelles du fondateur pendant six mois. C'est une estimation, sans développeur ni agence à payer.
- **Le scénario bas n'est pas à financer.** Il cumulerait -13,5 M FCFA en trois ans ; le point de décision sert à l'éviter.
- **Le temps partiel n'est pas modélisé.** Il réduirait le besoin de financement, mais aussi la croissance : ces projections ne s'y appliqueraient pas telles quelles.
- **Le B2B est le levier le plus rapide, s'il se vend.** À 1,2 M FCFA par an, trois contrats rapportent 300 000 FCFA par mois. Le cycle de vente reste inconnu, d'où les rendez-vous dès le mois 4.
- **Seuil de rentabilité, sans B2B.** Pour couvrir 650 000 FCFA de charges fixes par mois, salaire inclus, il faut environ 28 200 actifs à 40 FCFA par actif, et 13 500 à 15 FCFA.
- **Échelle.** Même le scénario haut reste à environ 85 000 € de chiffre d'affaires. L'expansion dans l'UEMOA est nécessaire pour dépasser une petite activité.

## 9. Cadre légal et risques

**C'est le droit togolais qui s'applique d'abord, pas le RGPD.** La [loi n° 2019-014](https://edutech.gouv.tg/wp-content/uploads/2020/01/Loi-n-2019-014-du-29-octobre-2019-relative-a-la-protection-des-donnees-a-caractere-personnel-in-JO29102019.pdf) encadre les données personnelles, sous le contrôle de l'IPDCP. Le RGPD pourrait s'y ajouter si BankVi visait des personnes dans l'UE. Ceci n'est pas un avis juridique : un juriste togolais doit le valider avant le lancement.

| Sujet | Règle | Conséquence pour BankVi |
| --- | --- | --- |
| Formalité préalable | [Déclaration et récépissé avant la mise en œuvre](https://www.lqdd.org/donnees-personnelles-entreprise-togo/) (art. 6), délai annoncé d'un mois au plus, prorogeable une fois | À déposer dès le mois 1 ou 2, avant la synchronisation |
| Données sensibles | Traitement interdit (art. 21) ; exceptions dont le consentement écrit et l'exécution d'un contrat (art. 22) | Voir la gouvernance des natures, section 9.1 |
| Décision automatisée | Pas de décision à effet juridique fondée uniquement sur un profil automatisé (art. 27) | Aucun score, aucune décision de crédit |
| Serveur à l'étranger | Niveau de protection suffisant et information préalable de l'IPDCP, qui rend un avis (art. 28) ; [un commentateur y assimile l'hébergement à l'étranger](https://www.lqdd.org/donnees-personnelles-entreprise-togo/) | À trancher avec le juriste avant de choisir l'hébergeur |
| Prospection | Consentement préalable (art. 26) | Aucun envoi sans accord |
| Sanctions | [Amende administrative jusqu'à 100 M FCFA](https://www.lqdd.org/donnees-personnelles-entreprise-togo/) (art. 71) et sanctions pénales | Conformité dès le MVP |

**À vérifier :** BankVi ne détient pas de fonds ; il ne devrait donc pas relever du régime des services de paiement. Ce point et l'encadrement éventuel du conseil financier n'ont pas été vérifiés auprès de la BCEAO.

### 9.1 Règles proposées pour les natures et le conseil

- **Natures.** Une nature décrit le rôle de l'argent dans le budget, jamais la personne. « Don » devient « Solidarité et dons » et n'est jamais déduit d'un libellé.
- **Libellés sensibles.** Santé, religion, politique et syndicat : pas de prédiction automatique, pas de profil dérivé, exclusion de la télémétrie et de toute offre B2B.
- **Conseil.** Pas de « recette conseillée » : on affiche la recette la plus proche de ce que l'utilisateur a déclaré, avec la raison, et l'utilisateur choisit. Aucune recommandation de produit financier.

### 9.2 Principaux risques

| Risque | Effet | Parade |
| --- | --- | --- |
| Le suivi du réel s'essouffle | Prévision sans réel, abandon, constaté seulement au mois 4 | Test restreint avant le lancement public ; deux modes de saisie ; rattrapage sans reproche |
| Faible volonté de payer | Revenus insuffisants | Dossier à l'acte, B2B, prix testés |
| Quitter l'app pour payer freine l'achat | Moins de payeurs | Parcours web très court, connexion conservée, mesure du taux d'abandon |
| Google refuse ou change les règles de paiement | App bloquée ou montage à refaire | Relecture des règles avant soumission ; site de paiement indépendant de l'app |
| Six mois insuffisants | Décision prise sans assez de données | Périmètre coupé plutôt que lancement repoussé ; pas de nouveau délai sans revenu |
| Fuite de données | Perte de confiance, sanctions | Minimisation, accès journalisés, audit externe dès que possible |
| Fondateur seul | Arrêt du service | Sauvegardes, documentation, personne de relais |
| Acteur local ou opérateur | Budget gratuit concurrent | Avance sur la prévision et les recettes, export des données |
| Les utilisateurs n'ont pas assez de stockage ou de data | Moins d'installations | App légère, hors ligne |

## 10. Hypothèses à valider et décisions restantes

| Hypothèse | Test | Seuil de départ | Quand |
| --- | --- | --- | --- |
| Suivre le réel ne semble pas être une corvée | MVP en test fermé, 50 à 100 testeurs, chacun choisit son mode | 40 % ont du réel enregistré 5 jours sur 7 ; répartition entre modes notée | Mois 4 |
| Les espèces dominent chez la cible | Entretiens, saisies des testeurs par poche | Plus de la moitié des dépenses en nombre | Mois 4 |
| La prévision change une décision | « As-tu fait quelque chose de différent ? » | La moitié cite un exemple concret | Mois 4 |
| Le statut du jour fait revenir | Part des actifs qui l'ouvrent, retour le lendemain, entretiens | À fixer après les premiers testeurs | Mois 4 |
| Le prix du Pass Plus est acceptable | Prévente à 1 000 FCFA aux testeurs de la bêta, par FedaPay, remboursée si le lancement est annulé | 5 % de la liste de bêta paient | Mois 4 |
| Le Pass Pro intéresse les indépendants | Liste d'attente, sans paiement | À fixer après les entretiens | Mois 4 |
| La rétention suit | Cohortes de bêta et du lancement | 20 % actifs au jour 30 | Mois 5 à 6 |
| Les organisations paient | 5 rendez-vous employeurs et microfinance | 1 lettre d'intention | Mois 4 à 6 |

**Décisions qui restent à prendre :**

- [ ] Quel est le budget disponible pour les six mois, et le revenu minimal nécessaire ensuite ?
- [ ] Où héberger les données : au Togo si possible, ou à l'étranger après information de l'IPDCP ? En attente, à reprendre avant de construire la synchronisation.
- [ ] Quel contenu reste gratuit ? Notre penchant : les alertes de découvert ne passent jamais derrière le pass.

## Sources consultées (5 novembre 2026)

*Certaines sont des blogs d'éditeurs ou des estimations : les tarifs, coûts et règles sont à confirmer auprès des organismes concernés. La [note de Togo First](https://www.togofirst.com/fr/telecoms/0807-19499-mobile-money-moov-africa-togo-lance-de-nouveaux-services-pour-renforcer-sa-position) a servi de recoupement sur le mobile money.*

- **Marché :** [ARCEP, observatoire T1 2026](https://arcep.tg/wp-content/uploads/2026/06/Obs-marches_T1-2026.pdf) · [DataReportal, Digital 2026 Togo](https://datareportal.com/reports/digital-2026-togo) · [wage.is](https://wage.is/togo/) · [WIEGO](https://wiego.org/wp-content/uploads/2022/04/social-protection-brief-4-francais.pdf)
- **Concurrence :** [Sika App](https://www.sika-app.org/)
- **Paiement :** [Règles de paiement Google Play](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en) · [Interprétation des règles Google Play](https://support.google.com/googleplay/android-developer/answer/10281818?hl=en) · [Programme de choix de facturation](https://support.google.com/googleplay/android-developer/answer/17161464?hl=en) · [Moyens de paiement Google Play](https://support.google.com/googleplay/answer/2651410?hl=en) · [Commissions Google Play](https://support.google.com/googleplay/android-developer/answer/112622?hl=en) · [Pays des développeurs Google Play](https://support.google.com/googleplay/android-developer/answer/9306917?hl=en) · [Reversements Google Play](https://support.google.com/googleplay/android-developer/answer/3092739?hl=en) · [Test fermé Google Play](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en) · [Règles de l'App Store](https://developer.apple.com/app-store/review/guidelines/) · [Apple Pay, pays](https://support.apple.com/en-us/102775) · [StatCounter, Togo](https://gs.statcounter.com/os-market-share/mobile/togo) · [Stripe, pays](https://stripe.com/global) · [FedaPay, pays](https://support.fedapay.com/portal/en/kb/articles/fedapay-fonctionne-t-il-dans-mon-pays) · [FedaPay, moyens de paiement](https://docs-v1.fedapay.com/payments/payment-methods) · [FedaPay, tarifs](https://www.fedapay.com/pricing) · [RevenueCat](https://www.revenuecat.com/app-to-web-purchase-guidelines) · [Beebom](https://beebom.com/accepted-payment-methods-google-play-store-ultimate-list) · [Kolonell, frais](https://kolonell.com/fr/blog/frais-caches-paiement-mobile-money-benin-togo-moov-mtn-2026)
- **Droit et création d'entreprise :** [Loi n° 2019-014](https://edutech.gouv.tg/wp-content/uploads/2020/01/Loi-n-2019-014-du-29-octobre-2019-relative-a-la-protection-des-donnees-a-caractere-personnel-in-JO29102019.pdf) · [LQDD, obligations des entreprises](https://www.lqdd.org/donnees-personnelles-entreprise-togo/) · [Kolonell, création au CFE](https://kolonell.com/fr/blog/creer-entreprise-togo-cfe-lome-2026)
