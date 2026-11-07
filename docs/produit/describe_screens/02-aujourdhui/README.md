# Aujourd'hui : fiches d'écran

*Version 0.2 · 7 novembre 2026 · Détaille EC-12 à EC-22 et EC-50 de [parcours_ecrans_p1.md](../../parcours_ecrans_p1.md), avec le [design system](../00-design-system/README.md). Rendu visible dans la [maquette](../../maquettes/accueil-statut.html) pour l'accueil, le statut et le bilan du soir.*

Chaque fiche se suffit à elle-même : l'écran dans ses sections numérotées, tout le reste dans son annexe générée.

## Enchaînement

```text
                ┌─ anneau ───────► EC-50 Mon statut
                ├─ Noter ────────► EC-13 Ajout rapide ─┬► EC-14 Catégorie
EC-12 Accueil ──┤                                      ├► EC-15 Autre date
                │                                      └► EC-16 Plusieurs dates
                ├─ Tout voir ────► EC-17 Historique ───► EC-18 Détail d'une saisie
                ├─ Mon bilan ────► EC-19 Compter ─► EC-20 Écart ─► EC-21 Résultat
                └─ un solde ─────► EC-22 Transfert entre poches
```

| Fiche | Écran |
| --- | --- |
| [EC-12](EC-12-accueil.md) | Accueil |
| [EC-50](EC-50-mon-statut.md) | Mon statut |
| [EC-13](EC-13-ajout-rapide.md) | Ajout rapide |
| [EC-14](EC-14-categorie.md) | Choix de la catégorie |
| [EC-15](EC-15-autre-date.md) | Autre date |
| [EC-16](EC-16-plusieurs-dates.md) | Plusieurs dates |
| [EC-17](EC-17-historique.md) | Historique |
| [EC-18](EC-18-detail-saisie.md) | Détail d'une saisie |
| [EC-19](EC-19-bilan-compter.md) | Bilan : compter |
| [EC-20](EC-20-bilan-ecart.md) | Bilan : écart |
| [EC-21](EC-21-bilan-resultat.md) | Bilan : résultat |
| [EC-22](EC-22-transfert.md) | Transfert entre poches |

## Chiffres d'exemple

Date de référence : **vendredi 6 novembre 2026**.

| Donnée | Camille, au fil de la journée | Karim, le soir |
| --- | --- | --- |
| Soldes au matin | Espèces 32 000, Mixx 58 000 | Espèces 45 000, Mixx 20 000 |
| Chiffre du jour | 3 200 FCFA jusqu'au 28 | 4 700 FCFA jusqu'au 30 |
| Noté aujourd'hui | Taxi 500, Pain 300 ; revenu : Prêt rendu +2 000 | Déjeuner 1 000 |
| Bilan du soir | — | Compté 41 500 en espèces : écart de 2 500 FCFA |
| Répartition | — | Transport 1 500, Crédit téléphone 500, Non détaillé 500 |
| Chiffre de demain | — | 4 600 FCFA |

**Calcul de Karim.** Soldes du soir : 41 500 + 20 000 = 61 500. Revenu encore attendu demain : min(90 000 × 24 ÷ 30 ; 75 000) = 72 000. Charges : 21 000. Reste : 112 500 pour 24 jours, soit 4 687, arrondi à 4 600.

## Points à valider

Ces choix complètent les documents. Ils étaient nécessaires pour décrire les écrans.

| # | Point | Choix retenu | Écran |
| --- | --- | --- | --- |
| 1 | Boutons de l'accueil le soir | **Validé :** barre d'action fixe ; après l'heure du rituel, « Noter » à contour et « Faire mon bilan » en vert, côte à côte | EC-12 |
| 2 | Quitter une saisie en cours | **Validé :** Le montant reste en brouillon jusqu'à la fermeture de l'app, sans question | EC-13 |
| 3 | Revenus proposés | **Validé :** Le mode Revenu montre ses propres catégories et suggestions | EC-13, EC-14 |
| 4 | Liste de départ des catégories | **Validé :** 17 dépenses et 5 revenus | EC-14 |
| 5 | Limites du calendrier | **Validé :** Passé : jusqu'à 12 mois. Futur : jusqu'à 12 mois | EC-15, EC-16 |
| 6 | Plusieurs dates | **Validé :** 62 dates au plus | EC-16 |
| 7 | Une ligne « prévue » arrivée à sa date | **Validé :** L'accueil demande de la confirmer ; dans le détail, « C'est fait » la rend réelle | EC-18 |
| 8 | Montant attendu dans le bilan | **Validé :** absent de cet écran, pour que l'utilisateur compte vraiment. Le champ n'est jamais pré-rempli | EC-19 |
| 9 | Plusieurs bilans le même jour | **Validé :** Permis : le dernier comptage fait foi | EC-19 |
| 10 | Répartition plus grande que l'écart | **Validé :** Message factuel, et validation impossible tant que la somme dépasse | EC-20 |
| 11 | Transfert supérieur au solde | **Validé :** Avertissement, sans blocage : le solde affiché peut être en retard sur le réel | EC-22 |
| 12 | Frais d'un transfert | **Validé :** Saisis par l'utilisateur, sans grille d'opérateur ; le dernier montant est proposé pour un transfert proche | EC-22 |
| 13 | Accueil après le bilan | **Validé :** Le héros montre « Demain, tu pourras dépenser » jusqu'à minuit | EC-12 |
| 14 | Puces présélectionnées | **Validé :** Seulement tant que leur somme tient dans l'écart | EC-20 |
| 15 | Une saisie qui ressemble à une ligne prévue | **Validé :** « C'est ton loyer du 5 ? », en une touche, à 7 jours près | EC-13 |
| 16 | Lignes jamais confirmées | **Validé :** un comptage de toutes les poches utilisées referme celles qui le précèdent | EC-19 |
