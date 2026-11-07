# Prototype du moteur de calcul

*Version 0.2 · 7 novembre 2026 · Étape 0 du [déploiement progressif](deploiement_tests_p1.md). Vérifie les formules de la [section 3 du parcours](parcours_ecrans_p1.md#3-calculs-affichés) (DON-01, DON-02).*

**Le but est de vérifier les formules avant de construire les écrans dessus.** C'est une petite bibliothèque en TypeScript, sans écran ni serveur : on lui donne des saisies et une date, elle rend le chiffre du jour, la courbe, l'écart et l'état du statut. Elle pourra devenir le vrai moteur. Le code est dans [moteur/](../../moteur/README.md).

**État : les étapes 1 à 4 sont faites, l'étape 5 reste à mener avec de vraies personnes.**

## 1. Les étapes

| # | Ce qu'on fait | Durée estimée |
| --- | --- | --- |
| 1 | **Écrire le moteur** à partir des formules du parcours | 2 à 3 jours |
| 2 | **Transformer les exemples de Camille et Karim en tests :** chaque chiffre affiché dans les fiches doit ressortir à l'identique | 1 jour |
| 3 | **Tester les cas limites :** février, salaire en retard, revenu nul, solde négatif, correction, transfert | 2 jours |
| 4 | **Vérifier les règles générales :** montants entiers, mêmes données pour le même résultat, une correction donne le même résultat qu'une saisie juste, aucun franc perdu | 1 jour |
| 5 | **Rejouer de vrais mois :** 3 à 5 personnes notent tout pendant 30 jours sur papier ou WhatsApp, puis on compare le solde prévu et le solde réel | 4 semaines, en parallèle |

Les étapes 1 à 4 se font au poste. L'étape 5 repose sur le fondateur et les personnes de Lomé : le groupe qui voit la maquette peut aussi tenir ce journal.

## 2. Ce que l'étape 5 doit dire

Ce dernier test dira si la prévision à 7 jours est assez juste, si le chiffre du jour ne saute pas trop et si les seuils du statut sont bons.

| Question | Ce qu'on mesure | Seuil de départ, à ajuster avec les premières données |
| --- | --- | --- |
| La prévision est-elle juste ? | Écart entre le solde prévu à 7 jours et le solde réel | Moins de 15 % pour la moitié des prévisions |
| Le chiffre du jour est-il stable ? | Variation d'un jour à l'autre, hors revenu | Moins de 20 % la plupart des jours |
| Les seuils du statut sont-ils bons ? | Répartition des jours entre les états | Personne bloqué en « Serré » tout le mois |
| Les revenus variables tiennent-ils ? | Karim : revenu attendu et revenu reçu | Le plancher reste prudent |

## 3. Limites

- Le moteur ne prévoit pas les dépenses : il suppose qu'on dépense le chiffre du jour. L'écart à 7 jours mesure donc aussi le comportement de la personne.
- Les résultats de 5 personnes guident les réglages, sans prouver la justesse en général.

## 4. Décision à prendre en route

**Partie double (DON-01) : tranché.** Le registre stocke des écritures simples et immuables. Les lignes de partie double s'en déduisent pour vérifier que rien ne se perd, sans être stockées. Les transferts, frais, comptages et corrections sont restés simples, et cette vérification se fait à chaque test sur des registres générés au hasard. Les pots restent une couche virtuelle : le quotidien se déduit des poches, donc la somme des pots égale toujours la somme des poches.

## 5. Règles fixées en écrivant le moteur

| Situation | Règle | Origine |
| --- | --- | --- |
| Ligne prévue arrivée à sa date, sans réponse | Elle compte comme encore à venir, et l'accueil demande | Choix technique |
| Lignes jamais confirmées | Un comptage de toutes les poches utilisées referme celles d'avant ce jour | **Ta décision** |
| Saisie qui ressemble à une ligne prévue | Même catégorie, à 7 jours près : l'app demande en une touche | **Ta décision** |
| Surplus au-delà du plancher | Dans « Le reste », hors du chiffre du jour | **Ta décision** |
| Recette adoptée, revenu variable | Elle agit à partir du 1er du mois suivant, comme l'annoncent les cartes de EC-07 | Déduit des fiches |
| Transfert de l'activité vers le perso | Compte comme un revenu noté, sinon l'argent serait compté deux fois | Choix technique |
| Salaire et revenu variable ensemble | Référence à la fin du mois ; le salaire d'avant cette date compte | Choix technique |
| Montant fixe d'une recette | Versé une seule fois par mois, même avec plusieurs revenus | Choix technique |
| Saisie à une date future | Agit comme une ligne prévue : le solde ne bouge pas avant sa date | Choix technique |
| Saisie tardive, datée d'avant un comptage | Détaille l'écart, sans changer le solde compté | Fiche EC-20 |
| Répartition par jour du revenu variable | Sans perdre un franc à l'arrondi ; le 6 décembre, Karim est à 5 016 FCFA (« environ 5 000 » dans EC-06) | Choix technique |

## 6. Ce que le moteur ne fait pas encore

- La synchronisation elle-même : le moteur accepte les écritures dans n'importe quel ordre et en double, mais aucun serveur n'existe.
- Le résumé du mois (EC-17), les habitudes et les suggestions, le dessin du paysage (EC-50).
- L'essai sur un vrai téléphone : le calcul n'a tourné que sur un ordinateur, sans mesure de vitesse sur un appareil modeste.
- L'outil pour comparer les journaux de l'étape 5.
