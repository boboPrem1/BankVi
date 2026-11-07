# Pots et recettes : fiches d'écran

*Version 0.1 · 7 novembre 2026 · Détaille EC-27 à EC-36 de [parcours_ecrans_p1.md](../../parcours_ecrans_p1.md), avec le [design system](../00-design-system/README.md). Ces écrans ne sont pas encore dans la maquette.*

Chaque fiche se suffit à elle-même : l'écran dans ses sections numérotées, tout le reste dans son annexe générée.

## Enchaînement

```text
Onglet Pots ► EC-27 Mes pots ─┬─ un pot ───────────► EC-28 Détail d'un pot
                              ├─ Ajouter un pot ───► EC-29 Ajouter un pot
                              └─ en-tête recette ──► EC-30 Ma recette ─┬► EC-31 Catalogue ─► EC-08 Aperçu
                                                                       ├► EC-32 Ajuster
                                                                       └► EC-35 Partager (L2)
EC-31 ─► EC-33 Écrire une recette (L2, Pass Plus)
Toute recette nouvelle ─► EC-34 Natures non rangées, si besoin
Lien reçu ─► EC-36 Recette reçue (L2) ─► EC-08 Aperçu
```

| Fiche | Écran | Lot |
| --- | --- | --- |
| [EC-27](EC-27-mes-pots.md) | Mes pots | L1 |
| [EC-28](EC-28-detail-pot.md) | Détail d'un pot | L1 |
| [EC-29](EC-29-ajouter-pot.md) | Ajouter un pot | L1 |
| [EC-30](EC-30-ma-recette.md) | Ma recette | L1 |
| [EC-31](EC-31-catalogue.md) | Catalogue | L1 |
| [EC-32](EC-32-ajuster.md) | Ajuster | L1 |
| [EC-33](EC-33-ecrire-recette.md) | Écrire une recette | L2, Pass Plus |
| [EC-34](EC-34-natures-non-rangees.md) | Natures non rangées | L1 |
| [EC-35](EC-35-partager.md) | Partager | L2 |
| [EC-36](EC-36-recette-recue.md) | Recette reçue | L2 |

## Comment fonctionnent les pots

Les pots sont **virtuels** : l'argent reste dans les poches réelles (espèces, Mixx, Flooz). Un pot sert de repère et **ne bloque jamais une dépense**.

| Moment | Ce qui se passe |
| --- | --- |
| Adoption d'une recette | Rien ne bouge. Les pots se rempliront au prochain revenu, ou à partir du 1er du mois suivant si le revenu est variable |
| Revenu reçu | Le montant est réparti selon la recette, avec « Annuler ». Ce qui restait avant le revenu va dans le pot du quotidien |
| Dépense | Elle réduit le pot qui lit sa nature |
| Non détaillé | Il réduit le pot du quotidien |

**Pot du quotidien :** Vie courante, Besoins et Envies, ou Libre, selon la recette. Les autres pots sont **réservés** : ce qu'ils contiennent sort du chiffre du jour.

## Chiffres d'exemple

Camille a adopté 70 / 20 / 10 le 6 novembre et reçu son salaire le 28. Date de l'exemple : **dimanche 6 décembre 2026**.

| Pot | Cible | Reste aujourd'hui |
| --- | --- | --- |
| Vie courante | 84 000 FCFA | 24 000 FCFA, dont 18 000 FCFA de charges à venir |
| Épargne | 24 000 FCFA | 24 000 FCFA |
| Dettes ou dons | 12 000 FCFA | 12 000 FCFA |
| **Total** | 120 000 FCFA | **60 000 FCFA**, égal à ses soldes |

**Calcul.** Au 28 novembre, il restait 1 600 FCFA avant le salaire, ajoutés au quotidien : 85 600 FCFA. École et Loyer : −60 000. Huit jours à 200 FCFA : −1 600. Reste : 24 000 FCFA.

**Chiffre du jour :** (60 000 − 18 000 − 36 000 réservés) ÷ 22 = 272, arrondi à **200 FCFA**. Si elle déplace 12 000 FCFA d'Épargne vers Vie courante : 818, arrondi à **800 FCFA**.

### Effet de chaque recette sur le rythme de Camille, après le salaire

(121 600 − 78 000 de charges − réservé) ÷ 30 jours.

| Recette | Réservé | Par jour |
| --- | --- | --- |
| Sans recette | 0 | 1 400 FCFA |
| 50 / 30 / 20 | 24 000 | 600 FCFA |
| Payez-vous d'abord | 24 000 | 600 FCFA |
| **70 / 20 / 10**, la plus proche selon la règle actuelle | 36 000 | **200 FCFA** |

## Points à valider

| # | Point | Choix retenu | Écran |
| --- | --- | --- | --- |
| 1 | Un pot bloque-t-il une dépense ? | **Validé :** jamais. Alerte factuelle seulement | EC-27, EC-28 |
| 2 | **Effet de la recette sur le chiffre** | **Validé :** écrit sur chaque carte de EC-07 et dans l'aperçu EC-08. La règle de proposition reste inchangée, à observer au test | EC-07, EC-08 |
| 3 | Premier remplissage des pots | **Validé :** Au prochain revenu, ou à partir du 1er du mois suivant si le revenu est variable, sans bouger l'argent déjà présent ; « Répartir mon argent maintenant » reste possible, avec l'effet affiché avant de valider | EC-27 |
| 4 | Pot du quotidien | **Validé :** Vie courante, Besoins et Envies, ou Libre | EC-27 |
| 5 | Pot dépassé | **Validé :** Reste à 0 ; le dépassement s'écrit sans rouge et prend sur le quotidien | EC-27, EC-28 |
| 6 | Déplacer de l'argent | **Validé :** Immédiat, avec « Annuler » ; effet sur le chiffre écrit avant de valider | EC-28 |
| 7 | Ordre de répartition | **Validé :** Montants fixes d'abord, puis pourcentages sur le reste, puis « le reste » | EC-29, EC-30 |
| 8 | Pas de réglage | **Validé :** 1 % avec le curseur et les boutons + et − | EC-32 |
| 9 | Natures à ranger | **Validé :** Seulement celles des catégories et charges utilisées ; à défaut, elles vont au quotidien | EC-34 |
| 10 | Image partagée | **Validé :** Noms des pots et pourcentages seulement, sans montant, ni prénom, ni logo tiers | EC-35 |
| 11 | Recette reçue en gratuit | **Validé :** L'adopter remplace la recette active, avec confirmation | EC-36 |
