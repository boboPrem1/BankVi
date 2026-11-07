# Horizon : fiches d'écran

*Version 0.2 · 7 novembre 2026 · Détaille EC-23 à EC-26 de [parcours_ecrans_p1.md](../../parcours_ecrans_p1.md), avec le [design system](../00-design-system/README.md). Mon horizon et la simulation sont dans la [maquette](../../maquettes/accueil-statut.html).*

Chaque fiche se suffit à elle-même : l'écran dans ses sections numérotées, tout le reste dans son annexe générée.

## Enchaînement

```text
Onglet Horizon, notification de découvert
                │
                ▼
        EC-23 Mon horizon ─┬─ un chiffre ──────────► EC-24 D'où vient ce chiffre
                           ├─ Puis-je me permettre ► EC-25 (pass ou essai) ou sa description
                           ├─ Ajouter un événement ► EC-26 Événement à venir
                           └─ 90 jours, sans pass ─► EC-41 Pass Plus
```

| Fiche | Écran | Offre |
| --- | --- | --- |
| [EC-23](EC-23-mon-horizon.md) | Mon horizon | Gratuit ; 90 jours avec le Pass Plus |
| [EC-24](EC-24-origine-chiffre.md) | D'où vient ce chiffre | Gratuit |
| [EC-25](EC-25-puis-je.md) | Puis-je me permettre ça ? | 3 essais offerts, puis Pass Plus |
| [EC-26](EC-26-evenement.md) | Événement à venir | Gratuit |

## Chiffres d'exemple

Date de référence : **vendredi 6 novembre 2026**. Camille : 90 000 FCFA aujourd'hui, 3 200 FCFA par jour jusqu'au 28.

| Valeur | Résultat |
| --- | --- |
| Dans 3 jours, le 9 nov. | 80 400 FCFA |
| Dans 7 jours, le 13 nov. | 67 600 FCFA |
| Dans 30 jours, le 6 déc. | 50 400 FCFA |
| Point bas sur 30 jours | 4 800 FCFA, le 27 nov. |
| Après le salaire du 28 nov. | 121 600 FCFA, puis 1 400 FCFA par jour |
| Point bas sur 90 jours | 1 600 FCFA, le 27 janvier |
| Dans 90 jours, le 4 février | 86 100 FCFA |

Situation de manque, avec 9 500 FCFA aujourd'hui : 1 500 FCFA le 15 nov., puis −8 500 FCFA le 20 nov.

## Points à valider

Ces choix complètent les documents. Ils étaient nécessaires pour décrire les écrans.

| # | Point | Choix retenu | Écran |
| --- | --- | --- | --- |
| 1 | Bouton vert et Pass Plus | **Validé :** 3 simulations offertes. Ensuite, « Événement » passe en vert, et « Puis-je me permettre ça ? » à contour, marqué « Pass Plus » | EC-23, EC-25 |
| 2 | Passé sur la courbe | **Validé :** Les 7 derniers jours en trait plein, s'ils existent ; le prévu en pointillés | EC-23 |
| 3 | Événements sur la courbe | **Validé :** Un point de 8 dp sur la courbe par événement, sans texte ; le détail est dans la liste et au toucher | EC-23 |
| 4 | Revenu variable | **Validé :** Le montant attendu est réparti par jour, sans point d'événement ; la bulle dit « au moins » | EC-23, EC-24 |
| 5 | Dates de la simulation | **Validé :** Aujourd'hui, Demain ou Autre date, jusqu'à 90 jours | EC-25 |
| 6 | Réponse de la simulation | **Validé :** Une phrase de faits, sans verdict ni couleur verte ou rouge, avec la courbe avant et après | EC-25 |
| 7 | Rythmes d'un événement récurrent | **Validé :** Une fois, chaque semaine, toutes les 2 semaines ou chaque mois | EC-26 |
| 8 | Événement à une date passée | **Validé :** Refusé ici, avec un renvoi vers l'ajout rapide | EC-26 |
| 9 | Modifier un événement | **Validé :** Toucher une ligne rouvre EC-26, avec « Supprimer » et « Annuler » | EC-23, EC-26 |
