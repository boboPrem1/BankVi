# Brainstorming — App de prévision et de suivi des revenus et dépenses

*Mode Simple × Mode Entreprise · v0.1 · 4 novembre 2026 · Document vivant : on itère section par section ; « Décision » signale un point à trancher ; l’onglet « Styles de budget » approfondit les méthodes de répartition.*

## 1. Vision en bref

**Une seule app, un seul moteur financier, deux niveaux d’expérience.**

La plupart des apps de budget regardent dans le rétroviseur (« où est passé mon argent ? »). Les outils professionnels sont puissants, mais lourds, chers et souvent déconnectés de la banque comme d’Excel. Notre pari : faire de la **prévision** le cœur du produit (savoir où l’on en sera dans 30 jours, 6 mois ou 3 ans), pour une personne comme pour une entreprise.

|  | Mode Simple | Mode Entreprise |
| --- | --- | --- |
| Question centrale | « Combien puis-je dépenser sans stress, et que se passe-t-il si… ? » | « Où en sera ma trésorerie, et que change cette décision (embauche, investissement, client en retard) ? » |
| Livrable phare | « Mon horizon » : solde projeté et reste à vivre | Prévisionnel vivant : trésorerie à 13 semaines, compte de résultat, bilan et flux liés, scénarios, réel vs prévu |
| Effort de saisie | Quasi nul (synchronisation et règles) | Faible (banque, factures et compta connectées) |
| Promesse | Sérénité | Maîtrise et crédibilité (banque, associés, investisseurs) |

**Hypothèse structurante :** les deux modes reposent sur le même moteur (un registre d’écritures et un moteur de projection). Le mode Simple n’est pas une version au rabais : c’est le même cœur, présenté avec moins de jargon et moins de réglages (*divulgation progressive*).

**Étoile polaire (à débattre) :** le nombre d’utilisateurs qui consultent leur prévision chaque semaine.

## 2. Pour qui ?

| Persona | Contexte | Douleur principale | Ce qu’il lui faut |
| --- | --- | --- | --- |
| **Camille**, salariée | Revenus réguliers, loyer, abonnements, un projet à financer | Ne sait pas ce qu’elle peut dépenser ; saisie fastidieuse ; apps culpabilisantes | Un reste à vivre clair, des alertes avant les creux, des objectifs d’épargne |
| **Karim**, indépendant | Revenus irréguliers, TVA, cotisations et impôt à provisionner, perso et pro mélangés | Ne sait pas ce qui est vraiment « à lui » ; peur des mois creux | Revenu lissé, provisions automatiques, séparation perso/pro |
| **Sophie**, dirigeante de TPE/PME | 5 à 50 salariés, banquier, associés | Prévisionnel sous Excel fragile et déconnecté de la compta et de la banque | Trésorerie à 13 semaines, budget, scénarios, écarts réel/prévu |
| **Marc**, expert-comptable ou DAF externe | 30 à 100 dossiers | Collecte et révision chronophages, peu de temps pour le conseil | Portail multi-clients, données propres, modèles de prévisionnel réutilisables |

> **Décision :** quel persona est le « héros » du MVP ? Voir la section 14.

## 3. État de l’art : ce qui se fait de mieux

### 3.1 Grand public

| Référence | Ce qu’on en retient | Angle mort / opportunité |
| --- | --- | --- |
| **YNAB** | Budget « base zéro » : chaque euro a un rôle ; une méthode qui change les comportements | Courbe d’apprentissage ; prévision limitée |
| **Monarch Money** | Tout-en-un (budget, patrimoine, objectifs), partage en couple, automatisation | Centré sur l’Amérique du Nord ; projection peu fine |
| **Copilot Money** | Design soigné ; catégorisation qui apprend de vos corrections | Historiquement centré sur l’écosystème Apple et les États-Unis |
| **Simplifi (Quicken)** | Plan de dépenses simple, flux projetés et factures à venir | Peu de scénarios « et si » |
| **PocketGuard** | Un seul chiffre : ce qu’il reste à dépenser après factures et objectifs | Peu de profondeur au-delà |
| **Origin** | Se positionne en « centre de commande financier », avec une IA qui interprète au lieu de seulement suivre | Jeune acteur, centré sur les États-Unis |
| **Rocket Money** | Détection et résiliation d’abonnements, négociation de factures | Monétisation liée à ces services |
| **Tiller** | Données bancaires dans un tableur : puissance pour les utilisateurs avancés | Public de niche |
| **Actual Budget, Firefly III** | Open source ; Actual : local-first et enveloppes | UX moins grand public |
| **Néobanques (Revolut, Monzo…)** | Budgets et « pots » directement dans la banque | En général limité aux comptes de la banque |

*Les angles morts sont des hypothèses tirées de lectures publiques : à confirmer en testant chaque outil (phase 0).*

### 3.2 Entreprise

| Référence | Ce qu’on en retient | Angle mort / opportunité |
| --- | --- | --- |
| **Pennylane** | Compta, facturation et trésorerie dans un outil partagé avec l’expert-comptable ; plateforme agréée de facturation électronique | Prévision moins poussée que chez les spécialistes |
| **Agicap** | Prévision de trésorerie multi-scénarios, multi-entités, glissante à 13 semaines | Ne tient pas la compta : un outil de plus |
| **Qonto** | La banque pro qui remonte la chaîne vers la compta (annonce Acasi, juillet 2026) | La prévision n’est pas son cœur de métier |
| **Float, Tesorio, Fathom** | Prévision et reporting branchés sur la compta ou l’ERP ; Fathom : conseil pour cabinets | Écosystèmes surtout anglo-saxons |
| **Causal, Runway** | Modèles par *drivers* lisibles (fini les références de cellules), scénarios, versions, audit trail | Orientés startups et scale-ups |
| **Pigment, Anaplan, Planful, Cube, Datarails** | Planification d’entreprise multidimensionnelle ; ponts avec Excel (Cube, Datarails) | Souvent trop lourd et trop cher pour une TPE/PME |
| **Digits, Puzzle, Rillet** | Grand livre « AI-native » : écritures proposées par l’IA, validées par l’humain | Surtout marché américain à ce stade |
| **Excel, Google Sheets** | Le vrai concurrent : souple et connu de tous (environ 68 % des structures britanniques de moins de 50 personnes, selon une étude relayée par Spendesk) | Fragile, non connecté, sans audit |

### 3.3 Signaux forts à intégrer (fin 2026)

- **L’IA passe de « catégoriser » à « agir sous contrôle »** : grands livres « AI-native », agents de planification ; les éditeurs eux-mêmes insistent sur la validation humaine.
- **La qualité d’une prévision dépend plus des données d’entrée que de l’interface** : une connexion bancaire fiable et un réel normalisé sont la fondation.
- **Banque, compta et prévision convergent** : beaucoup de PME empilent trois outils (banque, compta, prévision fine). Un moteur unique est une vraie opportunité.
- **Facturation électronique** : en France, la réception est obligatoire pour toutes les entreprises depuis le 1er septembre 2026 ; l’émission l’est dès 2026 pour les grandes entreprises et les ETI, et le 1er septembre 2027 pour les PME, TPE et micro-entreprises (la Belgique et l’Italie ont déjà basculé). Des factures structurées permettent de mieux prévoir les encaissements.
- **Open banking européen en transition** : PSD2 reste la base ; PSD3/PSR a fait l’objet d’un accord politique fin 2025 (application attendue vers 2028) ; FiDA (open finance : épargne, assurance, retraite) était encore en négociation début 2026. À ne pas considérer comme acquis.
- **Les modèles par drivers deviennent le standard de la planification** : hypothèses lisibles, scénarios, versions.
- **Portabilité et confiance** : l’export des données figure parmi les critères de choix des guides 2026 ; les fermetures de Mint (2024) et de l’app grand public de Moneyhub (annoncée pour août 2026, Royaume-Uni) rappellent le risque de dépendance et la fragilité du B2C pur.

### 3.4 Les trous du marché (nos angles d’attaque)

- **Le pont perso → indépendant → PME** : aujourd’hui, trois outils et deux migrations.
- **La prévision honnête** : à notre connaissance, peu d’outils affichent leur propre fiabilité (fourchettes d’incertitude, backtests).
- **L’entre-deux entre Excel et Anaplan** : une planification sérieuse, lisible et abordable pour les TPE/PME.
- **Les marchés hors États-Unis et hors UE** : référentiels comptables et moyens de paiement locaux, agrégation bancaire limitée ; souvent mal servis par les acteurs ci-dessus.

## 4. Principes directeurs

1. **Un moteur, deux expériences.** Divulgation progressive : on peut monter en gamme sans perdre ses données.
2. **La prévision est le produit, pas un onglet.** Chaque écran répond à « et ensuite ? ».
3. **Chaque chiffre est explicable**, du total jusqu’à la transaction, la règle ou l’hypothèse qui le produit.
4. **Zéro saisie par défaut, correction en un geste.** Synchronisation, import, OCR ; l’utilisateur corrige, le système apprend.
5. **Calme et confiance.** Ni culpabilisation, ni publicité, ni revente de données.
6. **L’IA est copilote, pas pilote.** Elle propose et explique ; le moteur déterministe calcule ; l’humain valide.
7. **Données portables.** Export complet (CSV, XLSX, formats comptables) et API ouverte.
8. **Local par conception.** Devises, référentiels comptables, jours fériés et moyens de paiement paramétrables par marché.

## 5. Mode Simple

**Noyau (Must)**

- Comptes (courant, épargne, carte, prêt, espèces), multi-devises en option ; import automatique quand c’est possible, sinon CSV ou OFX ; saisie manuelle en trois secondes.
- Catégories, règles et apprentissage ; détection des récurrents (salaire, loyer, abonnements).
- Budget au choix : « reste à vivre » par défaut, enveloppes en option, modèles prêts à l’emploi.

**Prévision (le différenciateur)**

- **« Mon horizon »** : courbe du solde projeté (de 30 jours à 1 an) avec les événements à venir (impôts, assurances annuelles, vacances) et une bande d’incertitude sur le variable.
- **« Puis-je me permettre ça ? »** : on glisse un achat, un crédit ou un déménagement sur la ligne du temps et l’on voit l’impact (date du premier découvert, épargne retardée).
- Objectifs et « pots » (épargne de précaution, vacances) alimentés automatiquement.
- Alertes proactives : « solde négatif prévu le 24 », abonnement augmenté, frais bancaires.
- Revenus irréguliers : revenu lissé et plancher prudent.

**Intelligence et partage (Should / Could)**

- Récapitulatif hebdomadaire ou mensuel en langage naturel ; assistant (« combien en restaurants ce trimestre ? »).
- Espaces partagés (couple, colocation) ; mode « manuel seulement » pour qui refuse la connexion bancaire.

**Écran signature :** un grand chiffre (« Aujourd’hui, je peux dépenser X € sans stress jusqu’à la prochaine paie ») et, dessous, la ligne du temps interactive.

## 6. Le palier « Indépendant » (la passerelle)

Le brief parle de deux modes ; nous proposons plutôt un continuum à trois paliers : **Simple → Indépendant → Entreprise**.

Le palier Indépendant couvre : la séparation perso/pro (deux « poches » sur les mêmes comptes), les provisions de TVA, de cotisations et d’impôt (« ce qui est vraiment à moi »), une facturation légère avec suivi des encaissements, les revenus irréguliers, et un passage guidé vers Entreprise (détection automatique : « vous émettez des factures, activer ce mode ? »).

Pourquoi : c’est un segment à forte douleur et à forte volonté de payer, et surtout le levier de conversion entre les deux univers.

> **Décision :** créer ce palier explicite, ou en faire une option du mode Simple ?

## 7. Mode Entreprise (la « vraie » compta prévisionnelle)

**A. Socle comptable**

- Partie double, plan comptable par modèle (PCG, SYSCOHADA, IFRS…), journaux, grand livre, balance, lettrage.
- Rapprochement bancaire assisté, TVA, immobilisations et amortissements, emprunts, régularisations, clôture et états financiers, exports réglementaires (par exemple le FEC en France).
- Facturation (devis, facture, encaissement), relances, notes de frais (OCR), facturation électronique selon le marché.

**B. Trésorerie prévisionnelle**

- Prévision glissante à 13 semaines : banque, factures clients et fournisseurs, paie, échéances fiscales et sociales, emprunts, pipeline pondéré.
- Délais de paiement réellement observés par client, plutôt que le « 30 jours » théorique.
- Alertes : runway (mois de trésorerie restants), covenants bancaires, découvert prévu.

**C. Prévisionnel financier**

- Modèle par drivers : chiffre d’affaires (volume × prix, ou clients × revenu moyen), effectifs et masse salariale chargée, investissements, BFR (délais clients DSO, fournisseurs DPO, stocks DIO), financement.
- Trois états liés (compte de résultat, bilan, flux de trésorerie) avec contrôle d’équilibre automatique.
- Budget annuel, reforecast mensuel, écarts réel / budget / N-1 commentés.
- Scénarios (base, haut, bas, libres), comparaison côte à côte, analyse de sensibilité ; Monte-Carlo en option.
- Modèles sectoriels (SaaS, commerce, restauration, services, BTP) et plan de financement prêt pour la banque.

**D. Pilotage, gouvernance, intégrations**

- Indicateurs par secteur, tableaux de bord, rapports PDF ou PowerPoint pour le conseil ou la banque ; multi-entités et consolidation ; analytique (projets, centres de coûts).
- Rôles et permissions, journal d’audit inaltérable, commentaires, versions de scénarios, portail expert-comptable.
- Intégrations : banques, paiements (Stripe…), CRM (pipeline vers chiffre d’affaires), paie, e-commerce, import/export Excel et Sheets, API et webhooks.

**Écran signature :** une frise unique « réel jusqu’à aujourd’hui, prévision ensuite » ; hypothèses en phrases lisibles à gauche, trois états liés au centre, scénarios à droite ; et un « Et si j’embauche en mars ? » qui met à jour le runway en direct.

## 8. Cœur technique commun

### 8.1 Les briques

1. **Registre (ledger)**, source de vérité : écritures en partie double, immuables (correction par contre-passation), montants en entiers (centimes) avec devise, provenance (banque, import, saisie, IA) et statut (brouillon, validé). En mode Simple, les « transactions » sont une vue simplifiée de ces écritures.
2. **Moteur de projection** : transforme règles récurrentes, événements ponctuels, budgets, drivers et hypothèses, plus l’historique, en flux futurs datés par scénario. Fonctions pures, déterministes, testables ; calendrier bancaire (jours ouvrés, fériés) ; incertitude propagée (fourchettes P10 / P50 / P90) ; calcul incrémental par graphe de dépendances.
3. **Scénarios « façon Git »** : un scénario est un diff d’hypothèses sur la base ; comparaison, fusion, promotion en budget.
4. **Ingestion** : agrégateur bancaire agréé, imports (CSV, OFX, CAMT.053, MT940, FEC), OCR et extraction de documents, webhooks ; dédoublonnage et réconciliation.
5. **Intelligence** : catégorisation (règles, puis ML, puis LLM en dernier recours), récurrences, prévision statistique de base (ETS, Prophet) avant tout modèle lourd, anomalies, assistant.
6. **Plateforme** : authentification (passkeys), multi-tenant, rôles, audit, chiffrement, sauvegardes.

### 8.2 Une prévision qui se note elle-même

Backtests automatiques : « sur les 6 derniers mois, votre prévision à 30 jours s’écartait de X € en médiane ». Afficher sa propre fiabilité est un puissant levier de confiance.

### 8.3 Options de stack

| Option | Principe | Avantages | Limites |
| --- | --- | --- | --- |
| **A. Cloud-first** | Web et mobile, Postgres, moteur côté serveur | Rapide à bâtir ; collaboration et audit simples | Dépendance au réseau ; confiance et confidentialité à construire |
| **B. Local-first** | Base embarquée (SQLite), synchronisation, moteur en WASM | Rapidité, hors-ligne, confidentialité | Synchronisation multi-utilisateurs et permissions complexes |
| **C. Hybride** | Local-first pour Simple, serveur faisant autorité pour Entreprise | Colle au produit | Deux architectures à maintenir |

**Notre penchant :** écrire d’abord le moteur de projection comme une bibliothèque pure (TypeScript, ou Rust compilé en WASM), indépendante de l’interface et du stockage. C’est l’actif stratégique, et cela laisse le choix entre A, B et C pour plus tard.

> **Décision :** registre unique en partie double dès le mode Simple (invisible pour l’utilisateur), ou deux modèles de données reliés par une passerelle ? Notre penchant : le registre unique, à valider par un prototype.

## 9. IA : où elle apporte vraiment de la valeur

| Cas d’usage | Valeur | Risque | Garde-fou |
| --- | --- | --- | --- |
| Catégorisation et nettoyage des libellés | Haute | Faible | Règles puis ML ; correction mémorisée |
| Extraction de factures et reçus vers une écriture proposée | Haute | Moyen | Score de confiance, validation humaine |
| Rapprochement bancaire | Haute | Moyen | Suggestions ; validation automatique au-dessus d’un seuil |
| Prévision (récurrents, variable, délais de paiement) | Très haute | Moyen | Base explicable, backtests, fourchettes d’incertitude |
| Assistant en langage naturel | Haute | Moyen (hallucinations) | Le LLM appelle des outils et des requêtes ; il ne calcule jamais lui-même |
| « Et si… » en langage naturel vers un scénario | Haute (effet démo) | Moyen | Diff d’hypothèses affiché et à confirmer |
| Commentaire d’écarts réel / budget | Moyenne | Faible | Brouillon éditable, lignes sources citées |
| Anomalies, doublons, fraude | Moyenne | Moyen | Alertes, jamais de blocage automatique |

**Règle d’or :** les chiffres sortent du moteur déterministe ; l’IA interprète, propose et explique.

**Sécurité :** traiter les libellés bancaires et les PDF comme des entrées non fiables (injection de prompt) et ne pas entraîner de modèle sur les données clients sans consentement explicite.

**Ton :** en mode Simple, une IA sobre : pas de coaching culpabilisant, pas de nudges manipulateurs.

## 10. Confiance, conformité et risques

| Sujet | Pourquoi c’est critique | Parade envisagée |
| --- | --- | --- |
| Périmètre : deux produits en un | Dilution, retards | Un seul moteur, des phases, un persona héros |
| Agrégation bancaire | Couverture, coût et fiabilité varient selon les pays ; sans données bancaires fiables, la valeur d’un outil de prévision chute | Agrégateur agréé plutôt que licence propre ; imports en secours |
| Conformité comptable | Obligations propres à chaque pays (FEC, facturation électronique en France…) et responsabilité en cas d’erreur | Commencer par le pilotage (prévisionnel, trésorerie) ; partenariat avec un cabinet avant la tenue légale complète |
| Confiance dans la prévision | Une prévision fausse détruit la confiance | Fourchettes d’incertitude, backtests, explications |
| Données sensibles | RGPD et équivalents ; une fuite peut tuer le produit | Chiffrement, minimisation, hébergement adapté au marché, journal d’audit, SOC 2 ou ISO 27001 en B2B |
| Modèle économique B2C | Fermetures de Mint (2024) et de l’app grand public de Moneyhub (2026) | Pont vers le pro, abonnement, jamais de publicité ni de revente de données |
| Concurrence | Pennylane, Agicap, Qonto, YNAB, Monarch… | Niche : pont perso-pro, prévision honnête, marché local |

**Positionnement juridique :** outil d’aide à la décision, ni conseil financier ni conseil comptable ; mentions claires dans l’app.

## 11. Modèle économique et distribution

- **Simple :** freemium (suivi manuel gratuit ; connexion bancaire, prévision avancée et IA en abonnement) ; formule famille.
- **Indépendant :** abonnement intermédiaire.
- **Entreprise :** tarification par entité et par utilisateur, paliers (Starter, Growth, Scale), options (consolidation, API, IA).
- **Canal expert-comptable :** tarif cabinet multi-clients, portail, marque blanche ; les cabinets cherchent à vendre davantage de conseil.
- **Partenariats :** banques et néobanques, fintechs, assureurs.
- **Indicateurs clés :** premier « horizon » en moins de 5 minutes ; rétention à 3 mois ; part des transactions catégorisées sans correction ; fiabilité mesurée de la prévision ; conversion Simple → Indépendant → Entreprise.

## 12. Nos paris à tester vite

| Pari | Pourquoi ça peut marcher | Ce qui l’invaliderait | Test rapide |
| --- | --- | --- | --- |
| **Un moteur du perso à la PME** | Une même base évite les migrations | Les deux publics n’ont presque rien en commun | Prototype du moteur et de deux interfaces |
| **Prévision honnête** (incertitude et backtests visibles) | La confiance nourrit la rétention | Les utilisateurs veulent un chiffre unique, pas une fourchette | Test A/B auprès de 50 bêta-testeurs |
| **IA calculatrice, pas oracle** | L’explicable rassure | Les utilisateurs préfèrent la magie à la vérifiabilité | Tests utilisateurs de l’assistant |
| **« Apportez votre Excel »** | Reconstruire un prévisionnel existant en modèle par drivers lisible abaisse la barrière d’entrée | Les fichiers réels sont trop hétérogènes | 10 fichiers réels de PME |
| **Dossier « banquier »** | Plan de financement et prévisionnel prêts à envoyer : valeur immédiate pour une TPE qui cherche un crédit | La demande est trop ponctuelle | 5 TPE en recherche de financement |

## 13. Roadmap indicative (à ajuster selon l’équipe)

| Phase | Contenu | Durée indicative | Critère de succès |
| --- | --- | --- | --- |
| **0. Discovery** | Marché cible, 15 à 20 entretiens, benchmark en conditions réelles, prototype « Mon horizon », spike du moteur, choix de l’agrégateur | 3 à 4 semaines | Persona héros et stack décidés |
| **1. MVP Simple** | Comptes, imports et un agrégateur, règles, récurrents, horizon à 90 jours, « et si » basique, alertes | 8 à 12 semaines | 50 à 100 bêta-testeurs, usage hebdomadaire |
| **2. Simple+ et Indépendant** | Objectifs, partage, assistant, revenus irréguliers, provisions de TVA et de cotisations | 8 à 12 semaines | Rétention à 3 mois, premiers abonnés payants |
| **3. Entreprise v1** | Rapprochement, trésorerie à 13 semaines, budget, scénarios, écarts, trois états simplifiés | 12 à 16 semaines | 5 à 10 entreprises pilotes, 2 à 3 cabinets |
| **4. Entreprise v2** | Compta complète, TVA, immobilisations, multi-entités, portail, API | 16 semaines et plus | Une clôture réelle réalisée dans l’outil |

## 14. Questions ouvertes et prochaines étapes

### À trancher en priorité

1. **Marché de départ :** pays ou zone, devise, référentiel comptable (PCG, SYSCOHADA, IFRS…), moyens de paiement locaux (virements, cartes, mobile money…). Cela conditionne l’agrégation bancaire, la TVA, la compta et la langue.
2. **Persona héros du MVP :** Camille, Karim ou Sophie ?
3. **Contexte du projet :** solo ou équipe, budget, délais ; produit commercial, open source ou interne ?
4. **Plateforme prioritaire :** mobile d’abord (Simple) ou web d’abord (Entreprise) ?
5. **Profondeur comptable visée :** tenue légale complète, ou prévisionnel et pilotage branchés sur un logiciel comptable existant ?
6. **Stockage :** cloud, local-first ou hybride (section 8.3).
7. **Registre unique ou deux modèles de données** (section 8.3).
8. **Ambition IA et budget associé.**

### Prochaines étapes proposées

- Trancher les points 1 à 3, puis approfondir dans cet ordre : modèle de données et moteur de projection, parcours « Mon horizon », spécification du mode Entreprise.
- Livrables possibles ensuite : maquettes interactives, schéma d’architecture, backlog priorisé, prototype du moteur.

## Sources consultées (novembre 2026)

*À recouper : plusieurs de ces pages sont des blogs d’éditeurs ou des comparatifs, donc partiaux.*

- **Budget grand public :** [Motley Fool](https://www.fool.com/money/personal-finance/best-budgeting-apps) · [Origin](https://useorigin.com/resources/blog/the-10-best-budgeting-apps-for-2026-unbiased-reviews-and-comparisons) · [MoneyToTheMasses (Moneyhub)](https://moneytothemasses.com/quick-savings/tips/the-best-budgeting-apps-in-the-uk-how-to-budget-without-trying)
- **Prévision de trésorerie et FP&A :** [Trovata](https://trovata.io/blog/best-cash-flow-forecasting-software-in-2026) · [Runway vs Causal](https://runway.com/blog/choosing-between-runway-and-causal-read-this-before-you-decide) · [Spendesk](https://www.spendesk.com/blog/best-fpa-software/)
- **Compta AI-native :** [Puzzle](https://puzzle.io/blog/top-ai-native-bookkeeping-firm-software) · [CFOtech (CLA et Digits)](https://cfotech.news/story/cla-partners-with-digits-on-ai-native-accounting-model)
- **Écosystème français :** [Agicap, Pennylane et Qonto](https://hayot-expertise.fr/blog/agicap-vs-pennylane-vs-qonto-tresorerie-pme-2026) · [Impli](https://www.impli.fr/comparatif/logiciel-gestion-financiere) · [FrenchWeb (Qonto et Acasi)](https://www.frenchweb.fr/avec-acasi-qonto-ouvre-un-nouveau-front-dans-la-comptabilite-des-pme/462660)
- **Réglementation :** [Calendrier de la facturation électronique](https://abby.fr/guide/facturation-electronique/facturation-electronique-date) · [PSD3, PSR et FiDA](https://crassula.io/guides/licenses/psd3-psr/)
