# EC-06 Premier horizon

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement, la première valeur |
| **Lot** | L1 |
| **Bible** | ONB-02, PRV-01, PRV-02, PRV-03, MES-02 |
| **Avant** | EC-05 Mes charges |
| **Après** | EC-07 Recette la plus proche · EC-09 Quand noter |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp |

## 1. Rôle

C'est l'écran le plus important du parcours : l'utilisateur voit, pour la première fois et avec ses chiffres, ce qu'il peut dépenser aujourd'hui. Cible : moins de 3 minutes après le début.

## 2. Ce qu'on voit

Aucune progression : la tâche est finie, et la récompense est là. En grand, sur un fond blanc : « Aujourd'hui, tu peux dépenser », **3 200 FCFA**, « jusqu'au 28 ». Dessous, une bulle gris pâle explique le calcul en une phrase. Puis une courbe en pointillés sur 30 jours : elle descend en marches jusqu'au 27, saute au salaire du 28, puis redescend. Une ligne explique ce que la courbe suppose. En bas, le bouton vert « Répartir mon argent » et, dessous, « Plus tard ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←                                  │ 56
│ Aujourd'hui, tu peux dépenser      │ 24
│ 3 200 FCFA                         │ 56
│ jusqu'au 28                        │ 24
│                                    │
│ ╭──────────────────────────────╮   │
│ ┆ 90 000 FCFA aujourd'hui, moins │ │
│ │ 18 000 FCFA de charges d'ici   │ │ 84  bulle
│ │ le 28 : il reste 72 000 FCFA   │ │
│ │ pour 22 jours.                 │ │
│ ╰────────────────────────────────╯ │
│ Ton argent sur 30 jours            │ 24
│ 90 000 ●╴╴               ╴+120 000 │
│           ╴╴╴           ┆  ╴╴     │
│ 50 000 ─────╴╴╴─────────┆────╴╴─── │ 200 courbe
│                ╴╴╴      ┆          │
│ 0 ───────────────── 4 800 ──────── │
│ 6 nov.       21 nov.        6 déc. │
│ Si tu dépenses ton chiffre chaque  │ 32
│ jour. Le prévu n'est pas certain.  │
│ Une scolarité ou un loyer au       │ 32
│ trimestre ? Ajoute-les dans Plus.  │
│ ╭────────────────────────────────╮ │
│ │      Répartir mon argent       │ │ 48
│ ╰────────────────────────────────╯ │
│             Plus tard              │ 48
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut, retour seul | 56 dp | 0 |
| Amorce | 24 dp | 0 |
| Chiffre | 56 dp | 0 |
| Échéance | 24 dp | 16 dp |
| Bulle | 84 dp | 16 dp |
| Titre du graphique | 24 dp | 8 dp |
| Courbe | 200 dp | 8 dp |
| Hypothèse | 32 dp | 4 dp |
| Rappel des autres charges | 32 dp | 12 dp |
| Pied | 128 dp | — |

Total cadre de référence : tout tient sans défilement, de justesse selon la longueur de la bulle. Le contenu défile sinon, le pied restant fixe.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Amorce | Aujourd'hui, tu peux dépenser | Roboto 16/24 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Nombre | 3 200 | Roboto 48/56 sp, Bold (700), chiffres proportionnels | `#111B21` en clair, `#E9EDEF` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500), ligne de base du nombre, 8 dp | `#111B21` en clair, `#E9EDEF` en sombre |
| Échéance | jusqu'au 28 | Roboto 16/24 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bulle | Voir les phrases plus bas | Roboto 14/20 sp, Regular (400), rayon 12 dp, haut gauche 4 dp, ombre `e1` en clair | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Titre du graphique | Ton argent sur 30 jours | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Hypothèse | Si tu dépenses ton chiffre chaque jour. Le prévu n'est pas certain. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Rappel | Une scolarité ou un loyer au trimestre ? Ajoute-les dans Plus. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Répartir mon argent | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte | Plus tard | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

### Phrases de la bulle

| Cas | Texte |
| --- | --- |
| Régulier | 90 000 FCFA aujourd'hui, moins 18 000 FCFA de charges d'ici le 28 : il reste 72 000 FCFA pour 22 jours. |
| Variable | 65 000 FCFA aujourd'hui, plus au moins 75 000 FCFA d'ici le 30, moins 21 000 FCFA de charges : il reste 119 000 FCFA pour 25 jours. |
| Sans charge | 90 000 FCFA aujourd'hui, pour 22 jours jusqu'au 28. |

Si la date de paie tombe aujourd'hui, la date de référence est celle du mois suivant, et le revenu du jour se note à part.

## 6. Calculs

| Valeur | Formule | Camille | Karim |
| --- | --- | --- | --- |
| Soldes | Espèces + Mixx + Flooz | 90 000 | 65 000 |
| Date de référence | Prochain revenu, ou fin du mois si variable | 28 nov. | 30 nov. |
| Jours | Régulier : de aujourd'hui au jour avant la paie. Variable : jusqu'à la fin du mois comprise | 22 | 25 |
| Revenus attendus | Régulier : aucun avant la date. Variable : le plus petit de « plancher × jours restants ÷ jours du mois » et « montant attendu au départ − revenus déjà notés » | 0 | 90 000 × 25 ÷ 30 = 75 000 |
| Charges avant la date | Occurrences à venir, avant la date ; variable : jusqu'à la date comprise | 18 000 | 21 000 |
| Réservé dans les pots | Aucun, sans recette | 0 | 0 |
| Reste à vivre | Soldes + revenus − charges − réservé | 72 000 | 119 000 |
| **Chiffre du jour** | Reste ÷ jours, arrondi à la baisse à 100 FCFA | **3 200** | **4 700** |

**Revenu variable au fil du mois, pour Karim :**

| Situation | Revenu encore attendu | Effet sur le chiffre |
| --- | --- | --- |
| 6 novembre, rien de noté | 75 000 FCFA | 4 700 FCFA par jour |
| Il note 30 000 FCFA le 6 | min(75 000 ; 75 000 − 30 000) = 45 000 FCFA | Inchangé : c'est le revenu attendu qui arrive |
| Rien de noté jusqu'au 20 | min(90 000 × 11 ÷ 30 ; 75 000) = 33 000 FCFA | Il baisse |

Le chiffre ne monte que si le revenu noté dépasse le montant attendu.

## 7. La courbe

| Attribut | Valeur |
| --- | --- |
| Zone | 200 dp de haut, pleine largeur moins les marges |
| Trait | 2 dp, pointillés de 6 dp et espace de 4 dp, `#008069` en clair, `#25D366` en sombre |
| Lavis | `rgba(0,128,105,0.10)` en clair, `rgba(37,211,102,0.10)` en sombre |
| Grille | Horizontale, 1 dp plein, `#E9EDEF` en clair, `#2A3942` en sombre |
| Ligne du zéro | 1 dp plein, `#7A8A94` en clair, `#667781` en sombre |
| Axes | Roboto 12/16 sp, Regular (400), `#667781` en clair, `#8696A0` en sombre, chiffres tabulaires. Axe vertical à droite : 0, 50 000, 100 000 ; domaine de 0 à 125 000 |
| Axe horizontal | 6 nov., 21 nov., 6 déc. |
| Point d'aujourd'hui | Rond de 8 dp `#008069` en clair, `#25D366` en sombre, anneau de 2 dp couleur du fond |
| Étiquettes | Roboto 12/16 sp, Regular (400), `#111B21` en clair, `#E9EDEF` en sombre : « 90 000 » au départ, « 4 800 » au point bas le 27 nov., « +120 000 » au saut du 28 nov. |
| Tracé | Par jours, en ligne droite, sans lissage |
| Légende | Aucune : une seule série, nommée par le titre |

**Règle de la courbe :** chaque point est le solde du matin, après les événements du jour. Chaque jour, on retire le chiffre du jour. À la date de référence, on recalcule le chiffre pour le cycle suivant.

Pour Camille, le chiffre passe à 1 400 FCFA le 28 : 4 800 − 3 200 + 120 000 = 121 600 ; 121 600 − 78 000 = 43 600 ; 43 600 ÷ 30 = 1 453, arrondi à 1 400.

| Date | Solde du matin | Événement du jour |
| --- | --- | --- |
| 6 nov. | 90 000 | Aujourd'hui |
| 7 nov. | 86 800 | |
| 8 nov. | 83 600 | |
| 9 nov. | 80 400 | |
| 10 nov. | 77 200 | |
| 11 nov. | 74 000 | |
| 12 nov. | 70 800 | |
| 13 nov. | 67 600 | |
| 14 nov. | 64 400 | |
| 15 nov. | 53 200 | Électricité −8 000 |
| 16 nov. | 50 000 | |
| 17 nov. | 46 800 | |
| 18 nov. | 43 600 | |
| 19 nov. | 40 400 | |
| 20 nov. | 27 200 | Tontine −10 000 |
| 21 nov. | 24 000 | |
| 22 nov. | 20 800 | |
| 23 nov. | 17 600 | |
| 24 nov. | 14 400 | |
| 25 nov. | 11 200 | |
| 26 nov. | 8 000 | |
| 27 nov. | 4 800 | Point bas |
| 28 nov. | 121 600 | Salaire +120 000 |
| 29 nov. | 120 200 | |
| 30 nov. | 118 800 | |
| 1er déc. | 117 400 | |
| 2 déc. | 116 000 | |
| 3 déc. | 89 600 | École −25 000 |
| 4 déc. | 88 200 | |
| 5 déc. | 51 800 | Loyer −35 000 |
| 6 déc. | 50 400 | |

**Karim :** départ à 65 000 ; 43 200 le 10 nov. après le loyer ; 1 500 au plus bas le 1er déc. ; 5 000 environ le 6 déc. Le chiffre passe à 2 200 FCFA en décembre. Son revenu est réparti par jour, donc la courbe descend plus doucement et sans saut. Pas d'étiquette de revenu.

**Glisser le doigt :** ligne verticale 1 dp `#7A8A94` en clair, `#667781` en sombre et info-bulle en haut du graphique, fond `#FFFFFF` en clair, `#202C33` en sombre, ombre `e2`, rayon 8 dp, Roboto 12/16 sp, Regular (400) : « 15 nov. · 53 200 FCFA » puis « Électricité −8 000 FCFA ».

## 8. États

### Il manque de l'argent

Exemple : soldes 5 000, charges avant la date 13 500, reste −8 500.

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Icône et amorce | `warning` et « Il manque » | 24 dp, Roboto 16/24 sp, Regular (400) | `#8A4B00` en clair, `#FFD27A` en sombre |
| Nombre | 8 500 | Roboto 48/56 sp, Bold (700) | `#8A4B00` en clair, `#FFD27A` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#8A4B00` en clair, `#FFD27A` en sombre |
| Suite | pour tes charges jusqu'au 28 | Roboto 16/24 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bulle | 5 000 FCFA aujourd'hui, moins 13 500 FCFA de charges d'ici le 28. | Roboto 14/20 sp, Regular (400) | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Courbe | Passe sous zéro ; zone en `rgba(138,75,0,0.12)` en clair, `rgba(255,210,122,0.14)` en sombre ; ligne du zéro bien visible ; étiquette « −8 500 » | — | Trait `#008069` en clair, `#25D366` en sombre |
| Hypothèse | Sans autre dépense. Le prévu n'est pas certain. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |

Jamais de rouge, jamais de nombre négatif seul, jamais de conseil. Le bouton principal reste le même.

### Autres états

| État | Affichage |
| --- | --- |
| Chiffre de 0 FCFA | « 0 FCFA » en héros ; bulle : « 50 FCFA pour 22 jours, soit moins de 100 FCFA par jour. » |
| Sans charge | Bulle adaptée ; courbe sans marche |
| Sans revenu, variable à 0 | Bulle sans la ligne de revenu ; pas de saut |
| Retour depuis EC-07 | Écran identique, valeurs à jour |
| Sans réseau | Aucun changement : le calcul se fait sur le téléphone |

Aucun chargement : le calcul doit être immédiat. Aucune offre du Pass Plus sur cet écran.

## 9. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Répartir mon argent » | EC-07 |
| « Plus tard » | EC-09, sans recette |
| Flèche ou retour | EC-05, pour corriger une valeur, le calcul se refait au retour |
| Glisser sur la courbe | Info-bulle |

## 10. Accessibilité

La phrase du chiffre est lue d'un bloc et déclarée comme titre : « Aujourd'hui, tu peux dépenser trois mille deux cents francs CFA jusqu'au 28. »

Graphique : « Ton argent sur 30 jours, prévision. 90 000 francs aujourd'hui, 4 800 au plus bas le 27 novembre, 121 600 après ton salaire du 28, 50 400 le 6 décembre. » La bulle et l'hypothèse donnent la même information en texte.

Cas du manque : « Il manque huit mille cinq cents francs CFA pour tes charges jusqu'au 28. »

## 11. Mouvement

Le chiffre apparaît en fondu, sans compteur, en 200 ms. La courbe se trace de gauche à droite en 300 ms, une seule fois. Une vibration légère confirme l'arrivée. Pas de confettis.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Courbe à 150 dp ; le contenu défile ; le chiffre reste visible à l'arrivée |
| 320 × 568 dp | Courbe à 130 dp ; marges de 16 dp |
| Texte à 200 % | Chiffre plafonné à 64 sp ; le contenu défile |
| Thème sombre | Valeurs ci-dessus ; la bulle n'a pas d'ombre |

## 13. Mesure

`first_horizon_viewed`, avec la durée depuis EC-01 : c'est la mesure de la première valeur. **Aucun montant.** Sont aussi enregistrés le choix suivant (`distribute` ou `later`) et l'état `lack`, oui ou non.
