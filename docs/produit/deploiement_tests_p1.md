# Déploiement progressif des tests — P1

*Version 1.0, validée · 7 novembre 2026 · Découpe le lot L1 de [parcours_ecrans_p1.md](parcours_ecrans_p1.md).*

**L'idée : ne pas construire 51 écrans pour apprendre au mois 4 que les gens ne notent pas leurs dépenses.** On teste d'abord la question qui peut tuer le projet, avec 20 écrans et une dizaine de personnes. Chaque étape ne se construit que si la précédente passe.

## 1. Vue d'ensemble

| Étape | Question | Personnes | Écrans ajoutés | Semaines | Pour continuer |
| --- | --- | --- | --- | --- | --- |
| **0** Sans app | Comprend-on le chiffre ? Le calcul tient-il ? | 3 à 5, puis 3 à 5 en journal | 0 | S1 à S6 | 4 personnes sur 5 expliquent le chiffre ; moteur fiable |
| **1** Noter et voir | Note-t-on son réel chaque jour ? | 10 à 15 | 20 | Construction S2 à S8, test S9 à S11 | 40 % notent 5 jours sur 7 |
| **2** Répartir et revenir | Recettes et statut donnent-ils envie de rester ? | 25 à 30 | 21 | Construction S9 à S13, test S14 à S15 | Le suivi tient ; aucune donnée perdue |
| **3** Test fermé et prévente | Paie-t-on ? | 50 à 100 | 10 | Construction S14 à S16, test S17 à S19 | Critères du business plan (section 5) |
| **4** Lancement public | La rétention suit-elle ? | Tout le monde | 6 | Après S19 | Décision de la fin du mois 6 |

Ces durées sont des estimations : **l'étape 1 mesurera ta vraie vitesse,** et le calendrier se corrige à ce moment-là. Le test de l'étape 3 finit vers le début du mois 5, soit deux à trois semaines après le plan d'origine. C'est le prix des deux contrôles ajoutés.

## 2. Étape 0 : sans app

### Montrer la maquette

Montre [la maquette](maquettes/accueil-statut.html) à 3 à 5 personnes de Lomé, salariées et indépendantes, 20 minutes chacune, sans expliquer d'abord.

1. « Que veut dire ce chiffre ? Qu'est-ce que tu ferais avec ? »
2. « Tu ferais ce bilan chaque soir ? Qu'est-ce qui t'en empêcherait ? »
3. Montre les 200 FCFA par jour de la recette 70 / 20 / 10 : « Qu'est-ce que tu ressens ? Que fais-tu ? »
4. « Dans quelle langue préférerais-tu utiliser cette app ? »

Note leurs mots exacts, et ne corrige personne.

### Prototyper le moteur

Voir [prototype_moteur.md](prototype_moteur.md).

## 3. Étape 1 : noter et voir

**La seule question : les gens notent-ils ?** C'est l'hypothèse la plus risquée du projet.

| Parcours | Écrans |
| --- | --- |
| Démarrage | EC-03, EC-04, EC-05, EC-06 |
| Accueil et saisie | EC-12, EC-13, EC-14, EC-17, EC-18 |
| Bilan | EC-19, EC-20, EC-21 |
| Horizon | EC-23, EC-24 |
| Réglages | EC-37, EC-39, EC-40, EC-46 |
| Sécurité | EC-51, EC-52 (verrouillage seul) |

**Version allégée :** EC-12 sans anneau de statut ni pots, EC-23 sans simulation, EC-37 limité aux lignes construites.

**Ce qu'on ne construit pas encore :** compte, serveur, synchronisation, recettes, pots, suggestions, statut, paiement.

**Ce qu'on prépare malgré tout :** le registre définitif (DON-01) et le moteur, pour que les données passent à l'étape 2 sans rien perdre, et des textes séparés du code, pour pouvoir traduire l'app.

| Point | Choix |
| --- | --- |
| Distribution | Test interne Google Play |
| Testeurs | Moitié salariés, moitié indépendants, pas seulement des proches |
| Mesure sans serveur | Un bouton « Envoyer ma semaine » prépare un message WhatsApp sans montant : « 5 jours notés sur 7, 23 saisies, 2 bilans ». Qui n'envoie rien compte comme inactif |
| Entretiens | Deux par testeur : au jour 3 et à la fin |
| Risque annoncé aux testeurs | Sans sauvegarde : un téléphone perdu, ce sont les données perdues |

| Résultat | Décision |
| --- | --- |
| 40 % ou plus notent 5 jours sur 7 | Étape 2 |
| De 20 à 40 % | Corriger ce que disent les entretiens, puis refaire deux semaines |
| Moins de 20 %, encore après une correction | Arrêter de construire et repenser le suivi du réel |

Avec 10 à 15 personnes, ce résultat est un **signal, pas une preuve** : une ou deux personnes le font basculer. Les entretiens comptent autant que le chiffre.

## 4. Étape 2 : répartir et revenir

| Parcours | Écrans |
| --- | --- |
| Premier lancement complet | EC-01, EC-02, EC-07, EC-08, EC-09, EC-10, EC-11 |
| Saisie complète | EC-15, EC-22, EC-38, EC-49 |
| Événements | EC-26 |
| Pots et recettes | EC-27, EC-28, EC-29, EC-30, EC-31, EC-32, EC-34 |
| Statut | EC-50 |
| Données | EC-45 |

S'y ajoutent le compte et la synchronisation : c'est le plus gros risque technique du plan.

| Point | Choix |
| --- | --- |
| Distribution | Test fermé Google Play, pour démarrer tôt les 14 jours exigés |
| Mesure | Statistiques d'usage sans montant, avec consentement |

| Pour continuer | Valeur |
| --- | --- |
| Suivi du réel | Il reste à 40 % ou plus, avec plus de testeurs |
| Synchronisation | Aucune saisie perdue ni comptée deux fois, changement de téléphone testé sur de vrais appareils |
| Recettes | Seuil à fixer après l'étape 1. À observer : les 200 FCFA par jour font-ils fuir ? |
| Statut | Seuil à fixer : part des actifs qui l'ouvrent, retour le lendemain |

## 5. Étape 3 : test fermé et prévente

| Parcours | Écrans |
| --- | --- |
| Suggestions | EC-43, EC-47, EC-48 |
| Simulation | EC-25 |
| Pass | EC-41, EC-42 |
| Site | W-01, W-02, W-03, W-04 |

Ce sont les critères déjà écrits dans le [business plan](../business/Business%20plan%20et%20business%20model.md#10-hypothèses-à-valider-et-décisions-restantes), sans changement :

- 40 % des testeurs ont du réel enregistré 5 jours sur 7 ;
- 5 % de la liste de bêta paient la prévente ;
- la moitié citent un exemple concret de décision changée.

## 6. Étape 4 : lancement public

| Écran | Pourquoi il attend |
| --- | --- |
| EC-16 Plusieurs dates | **Sorti du L1 :** contournable en notant plusieurs fois |
| EC-44 Mes natures | **Sorti du L1 :** les catégories gardent leur nature par défaut. Sans ce tri, l'app reste utilisable |
| EC-33, EC-35, EC-36 | Déjà en L2 : phrase de recette et partage |
| EC-53 Numéro perdu | Aucun compte n'atteindra 90 jours d'inactivité pendant le test. D'ici là, tu traites les cas à la main |

S'y ajoutent le changement de numéro et l'e-mail de secours dans EC-52, ainsi que les numéros de la zone UEMOA.

## 7. Prototyper le moteur

Le détail est dans [prototype_moteur.md](prototype_moteur.md).

## 8. Ce que ce plan change hors du produit

| Sujet | Plan d'origine | Avec ce plan | Pourquoi |
| --- | --- | --- | --- |
| **Déclaration à l'IPDCP** | Dépôt dès le mois 3 | **Dès le mois 1 ou 2** | Le serveur arrive à l'étape 2, vers le mois 3-4, et le récépissé doit la précéder. Le délai annoncé est d'un mois, prorogeable une fois |
| **Avis du juriste** | Mois 1 | Inchangé, avec une question en plus | L'étape 1 garde tout sur le téléphone : faut-il déjà le récépissé ? |
| **Hébergement** | Avant la synchronisation | Inchangé | Requis avant l'étape 2 |
| **Entreprise et FedaPay** | Mois 1 à 3 | Peuvent attendre l'issue de l'étape 1, si les délais le permettent | Inutile de payer avant de savoir si les gens notent |
| **Zone UEMOA** | Bénin ou Côte d'Ivoire étudiés en année 2 | Numéros acceptés au lancement public, sans acquisition active | Trois vérifications avant d'ouvrir : obligations du juriste hors du Togo, opérateurs chez FedaPay, prix des SMS par pays |
| **Compte Google Play** | — | À choisir tôt | Un compte personnel récent doit faire 14 jours de test fermé avec au moins 12 testeurs avant la production ; un compte d'organisation en est dispensé |

## 9. Décisions

| # | Point | Décision |
| --- | --- | --- |
| 1 | EC-16 et EC-44 | **Validé :** sortis du L1, à revoir si les entretiens les réclament |
| 2 | Pas de serveur à l'étape 1 | **Validé :** avec le message WhatsApp sans montant |
| 3 | Calendrier | **Validé :** deux à trois semaines de plus |
| 4 | Testeurs | **Validé :** les mêmes personnes passent d'une étape à l'autre, et de nouvelles s'ajoutent |
| 5 | Seuils de l'étape 2 et du moteur | Fixés après les premières données |
| 6 | Consentement aux statistiques | Elles restent coupées par défaut. Les critères des étapes 2 et 3 en dépendent : le recrutement explique ce qui est mesuré et demande d'activer. **Qui refuse compte à part, et cette règle est à relire avec le juriste** |

## Sources

- [Google : exigences de test pour les nouveaux comptes personnels](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en-GB)
