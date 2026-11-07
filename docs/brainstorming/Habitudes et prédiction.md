# Modèle d’habitudes : prédire pour économiser des gestes, sans surveiller

*Approfondissement du brainstorming · 4 novembre 2026*

Oui, suivre les habitudes de saisie permet de prédire la catégorie, la description, le montant et le moment de la prochaine saisie, donc de supprimer des gestes. La condition : apprendre sur l’appareil, pour l’utilisateur seul, à partir de son propre registre, et mesurer l’app sans jamais lire l’argent. Concrètement, un **modèle d’habitudes** par utilisateur, lisible et modifiable par lui, alimente la saisie, les rappels, la prévision et les alertes.

Une nuance change tout : deux questions différentes se cachent derrière « prédire ». *Que va-t-il saisir maintenant ?* se prédit avec l’heure de saisie. *Qu’a-t-il probablement dépensé sans le noter ?* se prédit avec l’heure estimée de la dépense, car beaucoup de gens saisissent le soir, en bloc.

## 1. Ce qu’on prédit

| Prédiction | Exemple | Où ça sert | Niveau d’automatisation |
| --- | --- | --- | --- |
| Catégorie et nature | « Café » vers 8 h en semaine : Restauration, envie | Saisie éclair, natures des styles | 1, puis 2 |
| Description probable | Les 3 libellés les plus fréquents du créneau | Autocomplétion du champ | 2 |
| Montant probable | Plage habituelle par libellé (2,50 à 3,50 €) | Pré-remplissage, jamais validé seul | 2 |
| Dépense fantôme | Café attendu mais non saisi | Carte « À confirmer » en fin de journée | 2 |
| Moment de saisie | Fenêtre où l’utilisateur ouvre l’app | Rappels et cartes au bon moment, sinon silence | 1 |
| Dépenses variables à venir | Courses du samedi, 40 à 80 € | Bande d’incertitude de « Mon horizon », reste à vivre | 1 |
| Anomalie | Dépense quatre fois supérieure à l’habitude pour ce marchand, doublon | Alerte douce | 2 |
| Entreprise | Compte comptable d’une écriture, délai de paiement d’un client, jour d’encaissement attendu | Rapprochement, trésorerie à 13 semaines, relances au bon jour | 1 ou 2 |

Les niveaux renvoient à l’échelle d’automatisation de l’onglet « Simplicité et onboarding ». On prédit pour enregistrer et pour prévoir, jamais pour inciter à dépenser.

## 2. Les signaux à suivre

| Famille | Signaux | Sert à |
| --- | --- | --- |
| Saisie et transactions | Date, heure, jour de semaine, jour du mois, distance à la paie, jour férié ; catégorie, nature, libellé normalisé, montant, compte ; source (manuelle, banque, import, photo) ; délai entre la dépense et la saisie ; **corrections** (ancienne puis nouvelle catégorie) | Catégorie, description, montant, dépenses fantômes |
| Usage de l’app | Heures d’ouverture, écrans visités, séquences d’actions, mode de saisie préféré (clavier, phrase, voix, photo), suggestions acceptées, refusées ou annulées, messages ouverts ou ignorés | Moment de saisie, rappels, prochaine meilleure action |
| Contexte (opt-in) | Fuseau horaire, jours de vacances, zone géographique approximative | Régimes de vie (travail, vacances) ; **désactivé par défaut** |
| Entreprise | Fournisseur vers compte comptable, délais de paiement par client, cycles de facturation, saisonnalité du chiffre d’affaires, heures de validation | Codage, encaissements, relances |

Une correction ou un refus pèse plus lourd qu’une acceptation passive : c’est la seule étiquette explicite que l’utilisateur nous donne.

## 3. Un exemple concret

Le modèle tient dans une carte par créneau : pour chaque contexte (type de jour et tranche horaire), les libellés vus, leur poids récent et leur plage de montants.

| Créneau | Suggestions | Confiance |
| --- | --- | --- |
| Jours ouvrés, 7 h à 9 h | Café (3 €), Transport (1,90 €) | 0,82 |
| Jours ouvrés, 12 h à 14 h | Déjeuner (11 à 14 €) | 0,76 |
| Jours ouvrés, 17 h à 19 h | Courses (25 à 60 €) | 0,48 |
| Samedi matin | Marché ou courses (40 à 80 €) | 0,66 |

*Exemple illustratif, données fictives. Sous 0,5, on n’affiche pas de suggestion automatique.*

```json
{
  "context": { "daytype": "weekday", "slot": "07-09" },
  "items": [
    { "label": "Café", "category": "food_out", "nature": "want",
      "weight": 9.4, "amount_q": [2.5, 3.0, 3.5], "last_seen": "2026-11-03" }
  ]
}
```

Le poids est un comptage avec décroissance dans le temps. L’ensemble pèse quelques kilo-octets par utilisateur, donc tient sur l’appareil. Au premier lancement avec l’historique bancaire (90 jours), on rejoue le modèle sur le passé : « Sur vos 90 derniers jours, nous aurions pu pré-remplir 74 % de vos saisies » (chiffre illustratif). C’est une preuve de valeur immédiate, avant même la première saisie.

## 4. Comment prédire : du simple au sophistiqué

| Palier | Méthode | Quand | Pourquoi |
| --- | --- | --- | --- |
| A | Tables de fréquences conditionnelles avec décroissance et lissage ; valeurs initiales par marché | Dès 10 à 20 saisies ; au lancement | Explicable, local, instantané |
| B | Modèles légers (régression logistique, arbres boostés) sur l’heure et le jour en cycles, la distance à la paie, le texte du libellé, le log du montant, le compte | Quand A plafonne, mesure à l’appui | Meilleure précision, toujours léger |
| C | Modèles de séquence et LLM pour comprendre le langage (« café 3,5 », photo de ticket) | Après preuve de valeur | Comprendre, pas calculer : les nombres viennent de A et B |
| D | Bandits contextuels pour choisir quelle suggestion montrer et quand, sous les plafonds de l’orchestrateur | Tardif | Apprendre du taux d’acceptation |

- **Montants** : distribution empirique par libellé (quantiles), jamais une moyenne seule.
- **Moment** : carte chaleur d’activité heure × jour, avec la latence de saisie (immédiate ou en bloc le soir).
- **Récurrences floues** : une habitude stable (8 occurrences sur 10 créneaux, valeur de départ) se promeut en « dépense attendue » (café d’environ 3 € quatre jours par semaine) qui alimente directement la prévision.
- **Calibration** : la confiance affichée doit refléter le taux de réussite réel ; elle pilote les niveaux de l’échelle d’automatisation (seuils de départ : 95 % et 70 %).
- **Dérive** : fenêtre glissante (demi-vie de départ : 60 jours), détection de rupture (déménagement, nouveau travail, vacances), « régimes » appris séparément.
- **Démarrage à froid** : historique bancaire si connecté, sinon valeurs initiales du marché et derniers choix ; le modèle personnel prend le relais vers 20 saisies.
- **Un « non » est une information** : refuser une dépense fantôme baisse sa probabilité, et « ne plus proposer » est définitif pour ce libellé.

## 5. Où ça tourne : quatre plans de données

La séparation est la règle qui rend l’idée acceptable : ce que l’app apprend de l’argent de l’utilisateur reste sur son appareil, et ce que nous mesurons pour améliorer le produit ne contient aucun contenu financier.

| Plan | Contenu | Où | Sert à | Conservation | Contrôle |
| --- | --- | --- | --- | --- | --- |
| 1. Registre | Transactions, catégories, montants | Appareil, sauvegarde chiffrée | L’app elle-même | Tant que le compte existe | Export, suppression |
| 2. Habitudes | Signaux d’usage et statistiques dérivées du registre | Appareil ; synchronisation chiffrée de bout en bout entre appareils | Suggestions, prévision, rappels | Fenêtre glissante (12 mois au départ) | Voir, corriger, oublier, désactiver |
| 3. Télémétrie | Événements sans contenu financier (onglet « Simplicité et onboarding », section 4.4) | Serveur | KPIs du produit | Pseudonymisée, durée limitée | Consentement ou exemption selon les règles locales |
| 4. Collectif (opt-in) | Agrégats bruités | Serveur | Améliorer les modèles communs (libellé vers catégorie) | Agrégé | Opt-in révocable |

En Entreprise, le plan 2 est celui de l’entité : calculé côté serveur dans son espace isolé et chiffré, partagé entre ses membres autorisés, jamais mutualisé entre entreprises sans opt-in.

**État de l’art.** Google entraîne les modèles de son clavier sur les téléphones (apprentissage fédéré) et y a ajouté la confidentialité différentielle ; mais des travaux montrent que l’apprentissage fédéré seul ne garantit pas la confidentialité. On le réserve donc à la phase 4, avec bruit et agrégation sécurisée, et seulement si le gain le justifie.

## 6. Ce que l’utilisateur voit et contrôle

- **« Ce que l’app a appris de moi »** : une page lisible, par créneau (« en semaine vers 8 h, vous notez souvent Café, 2,50 à 3,50 € »), avec Juste, Faux, Oublier.
- **« Pourquoi cette suggestion ? »** sur chaque suggestion, avec la preuve (« 9 fois sur les 12 derniers jours ouvrés »).
- **Interrupteurs** par domaine (saisie, horaires, contexte), **réinitialisation**, **export**, et un **mode privé** sans apprentissage.
- **Habitude vers règle** : une habitude stable se promeut en dépense attendue en un tap.
- **Ton factuel** : on montre des comptes, jamais « je sais que vous êtes au café ».

## 7. Fonctions concrètes qui en découlent

1. **Saisie éclair** : l’écran de saisie s’ouvre avec les trois suggestions les plus probables du créneau (« Café · 3 € », « Transport · 1,90 € ») ; une dépense en 2 taps. Les suggestions occupent une zone fixe : la navigation ne bouge pas.
2. **Dépenses fantômes** : une seule carte « À confirmer » par jour, qui regroupe 1 à 3 dépenses probables non saisies (Oui, Non, Autre).
3. **Rappel au bon moment** : une notification seulement s’il y a quelque chose à confirmer et que l’utilisateur ouvre d’habitude l’app à ce moment ; sinon, silence.
4. **Prévision affinée** : les habitudes alimentent le variable par jour de semaine et distance à la paie, d’où une bande d’incertitude plus étroite et un reste à vivre plus fiable.
5. **Alertes douces** : « Cette dépense est quatre fois votre habitude pour ce marchand : normal ? », doublons.
6. **Natures et styles** : la nature (besoin, envie) est prédite d’après les corrections passées ; le simulateur de styles projette les pots avec les habitudes (« au rythme actuel, le pot Envies est vide le 22 »).
7. **Entreprise** : codage comptable prédit par fournisseur, délai de paiement attendu par client (donc encaissements et relances au bon jour), saisonnalité du chiffre d’affaires.

Toutes ces cartes passent par l’orchestrateur de messages et son budget d’attention.

## 8. Garde-fous éthiques et juridiques

- **Aucune inférence d’attributs sensibles.** Les catégories de dépense peuvent révéler la santé, la religion, les opinions politiques ou l’orientation. La Cour de justice de l’UE juge que des données permettant de déduire de telles informations relèvent des catégories particulières du RGPD (article 9), quelle que soit l’intention du responsable de traitement. On ne déduit, ne stocke et n’affiche donc aucun attribut sensible : santé, dons ou cotisations restent de simples libellés choisis par l’utilisateur, sans profil dérivé.
- **Prédire pour enregistrer, pas pour vendre.** Ni publicité ciblée, ni revente, ni suggestion qui pousse à dépenser ; un pot vide n’est jamais contourné par une suggestion.
- **Pas de score de solvabilité.** Le modèle d’habitudes ne sert jamais à évaluer la capacité de remboursement d’une personne (domaine très réglementé).
- **Localisation désactivée par défaut**, activable fonction par fonction, jamais conservée avec l’horodatage hors de l’appareil.
- **Couples et comptes partagés** : un modèle par personne ; un pot commun ne révèle pas les habitudes de l’un à l’autre sans partage explicite.
- **Sécurité** : modèle chiffré dans le coffre de l’appareil ; libellés et documents traités comme des entrées non fiables (injection de prompt) ; aucun SDK tiers n’accède au contenu.
- **À faire valider par un juriste ou un DPO.** L’apprentissage d’habitudes ressemble à du profilage au sens du RGPD (article 4) : prévoir une information claire, la minimisation, la protection dès la conception (article 25), une analyse d’impact probable (article 35) et le droit d’opposition. Je ne suis pas juriste : ce sont des pistes, pas un avis.

## 9. Mesures

Ces mesures se calculent sur l’appareil et ne remontent que sous forme de compteurs (acceptée, refusée, annulée), jamais avec les libellés. Un groupe témoin de 5 à 10 % d’utilisateurs sans prédictions mesure le gain réel. Cibles et alertes sont des hypothèses de départ.

| KPI | Définition | Cible de départ | Alerte |
| --- | --- | --- | --- |
| Couverture | Part des saisies où une suggestion était affichée | 70 % à 30 jours | Sous 50 % |
| Précision top-3 | La valeur finale figure parmi les 3 suggestions | 85 % | Sous 75 % |
| Acceptation | Suggestions acceptées ÷ affichées | 60 % | Sous 40 % |
| Annulation et correction | Suggestions acceptées puis annulées ou corrigées | Moins de 3 % annulées, moins de 10 % corrigées | Plus de 5 % ; plus de 15 % |
| Gestes économisés | Taps et secondes par saisie, avec et sans suggestion | 40 % de moins | Moins de 20 % |
| Dépenses fantômes | Taux de « Oui » | 50 % | « Non » au-dessus de 40 % |
| Timing | Part des rappels suivis d’une ouverture dans l’heure | 40 % | Sous 20 % |
| Prévision | Baisse de l’erreur à 30 jours avec habitudes, comparée à sans | 15 % | Aucune baisse |
| Calibration | Écart entre confiance annoncée et réussite réelle | Sous 5 points | Au-dessus de 10 points |
| Confiance | Part des utilisateurs qui coupent l’apprentissage ; plaintes « inquiétant » | Moins de 5 % | Plus de 10 % |

## 10. Phasage

| Phase | Contenu | Prérequis | Critère de passage |
| --- | --- | --- | --- |
| 1. MVP | Tables de fréquences locales, autocomplétion, « Pourquoi ? », page « Ce que l’app a appris », réinitialisation | Registre local, catégories et natures | Top-3 à 80 % ou plus sur le rejeu de l’historique |
| 2. Prévoir | Dépenses fantômes, timing des rappels, variable dans l’horizon, groupe témoin | Orchestrateur de messages | Acceptation de 50 % ou plus, annulation sous 5 % |
| 3. Affiner | Modèles légers locaux, calibration, anomalies, Entreprise (codage, délais de paiement) | Mesures de la phase 2 | Gain mesuré par rapport à la phase 2 |
| 4. Collectif | Apprentissage agrégé opt-in avec bruit, bandits contextuels pour le timing | Analyse d’impact validée | Gain qui justifie la complexité |

## 11. Décisions à trancher et prochaines étapes

1. **Apprentissage 100 % local au lancement ?** Notre penchant : oui, rien d’appris sur l’argent ne quitte l’appareil.
2. **Activé par défaut ou sur demande ?** Notre penchant : activé par défaut pour le modèle local, expliqué et désactivable ; opt-in pour tout ce qui sort de l’appareil (à valider juridiquement).
3. **Localisation** : jamais, ou opt-in tardif ?
4. **Durée de conservation** des signaux : 12 mois glissants ?
5. **Apprentissage collectif** : oui ou non, et à partir de quelle phase ?
6. **Seuils de confiance** : alignés sur l’échelle d’automatisation (95 % et 70 %) ?

**Prochaines étapes proposées**

- Prototype « Saisie éclair » avec des transactions fictives et le rejeu sur 90 jours.
- Liste finale des signaux, avec durée de conservation et finalité de chacun (base de l’analyse d’impact).
- Maquette de la page « Ce que l’app a appris de moi », testée auprès de 8 à 10 personnes (inquiétante ou rassurante ?).
- Spécification de la carte « À confirmer » dans l’orchestrateur de messages.

## Sources consultées (4 novembre 2026)

*Aperçus de recherche, à recouper ; le droit est à faire valider par un professionnel.*

- **Apprentissage sur l’appareil :** [Applied Federated Learning: Improving Google Keyboard Query Suggestions](https://arxiv.org/pdf/1812.02903) · [Federated Learning of Gboard Language Models with Differential Privacy](https://arxiv.org/pdf/2305.18465) · [Federated Learning Is Not Private For Google GBoard Next Word Prediction](https://arxiv.org/pdf/2210.16947)
- **Données sensibles déduites :** [Baker McKenzie, Sensitive data under the CJEU’s spotlight](https://connectontech.bakermckenzie.com/sensitive-data-under-the-cjeus-spotlight-practical-implications/) · [DLA Piper, arrêt Meta Platforms c. Bundeskartellamt (C-252/21, 4 juillet 2023)](https://dlapiper.com/insights/publications/2023/07/cjeus-landmark-decision-in-meta-vs-bundeskartellamt)
