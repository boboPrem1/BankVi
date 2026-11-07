# EC-27 Mes pots

| Fiche | |
| --- | --- |
| **Parcours** | PC-09, PC-10 |
| **Lot** | L1 |
| **Bible** | POT-01, POT-02, POT-03, POT-06, POT-12, ONB-05 |
| **Avant** | Onglet Pots, EC-12 avec « Voir mes pots » |
| **Après** | EC-28, EC-29, EC-30, EC-07 |
| **Cadre** | 360 × 800 dp, portrait, marges de 16 dp |

## 1. Rôle

Montrer d'un regard où en est chaque part de son argent. Un pot est un repère : il ne bloque jamais une dépense.

## 2. Ce qu'on voit

En haut, une ligne rappelle la recette active. Dessous, une carte par pot : une pastille de couleur, le nom, ce qui reste en grand, et une fine jauge de la même couleur qui montre la part restante sur la cible. Au-dessus des onglets : « Ajouter un pot » à contour et le bouton vert « Déplacer de l'argent ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ Mes pots                           │ 56
│ 70 / 20 / 10 · Ma recette        › │ 48
│ ┌────────────────────────────────┐ │
│ │ ● Vie courante                 │ │
│ │ 24 000 FCFA       sur 84 000   │ │ 96
│ │ ▬▬▬▬▬▬───────────────────      │ │
│ │ Reste jusqu'au 28 · 18 000 de  │ │
│ │ charges à venir                │ │
│ └────────────────────────────────┘ │
│ ┌────────────────────────────────┐ │
│ │ ● Épargne                      │ │ 96
│ │ 24 000 FCFA       sur 24 000   │ │
│ │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬      │ │
│ └────────────────────────────────┘ │
│ ┌ ● Dettes ou dons ───────────────┐│
│ │ 12 000 FCFA       sur 12 000   ││ 96
├────────────────────────────────────┤
│ ( + Ajouter un pot ) ( Déplacer  ) │ 64
├────────────────────────────────────┤
│  Aujourd'hui Horizon ◉Pots  Plus   │ 72
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 0 |
| Ligne de recette | 48 dp | 8 dp |
| Carte de pot | 96 dp, plus la ligne de détail | 12 dp |
| Barre d'action | 64 dp | 0 |
| Barre du bas | 72 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Mes pots | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Ligne de recette | 70 / 20 / 10 · Ma recette | Roboto 14/20 sp, Medium (500), `chevron_right` | `#00735E` en clair, `#25D366` en sombre |
| Carte | — | Rayon 12 dp, marges 16 dp, contour 1 dp | Fond `#FFFFFF` en clair, `#202C33` en sombre, contour `#E9EDEF` en clair, `#2A3942` en sombre |
| Pastille | — | 12 dp | Pot 1 `#008069` en clair, `#00A884` en sombre ; pot 2 `#D97A00` en clair, `#C47F00` en sombre ; pot 3 `#7F66FF` en clair, `#8B75FF` en sombre |
| Nom | Vie courante | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Reste | 24 000 FCFA | Roboto 18/24 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Cible | sur 84 000 | Roboto 14/20 sp, Regular (400), tabulaire, à droite | `#54656F` en clair, `#AEBAC1` en sombre |
| Jauge | — | 8 dp, bouts arrondis, reste ÷ cible | Remplie : couleur du pot. Fond : `#E9EDEF` en clair, `#2A3942` en sombre |
| Détail | Reste jusqu'au 28 · 18 000 de charges à venir | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton à contour | Ajouter un pot | 48 dp, pilule, 40 % | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Déplacer de l'argent | 48 dp, pilule, 60 % | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Onglet actif | Pots, icône `savings` | Pastille 56 × 32 dp | Pastille `#D8FDD2` en clair, `#103529` en sombre, icône `#0A3D2E` en clair, `#D9FDD3` en sombre |

Le texte ne prend jamais la couleur du pot.

## 6. États

| État | Affichage |
| --- | --- |
| Revenu variable, recette adoptée en cours de mois | Bulle : « Tes pots se rempliront à partir du 1er décembre. » Les revenus notés avant cette date ne remplissent aucun pot |
| Sans recette | Une bulle de l'app : « Choisis une recette pour répartir ton argent. » ; bouton vert « Choisir une recette » (EC-07) ; pas de cartes |
| Recette adoptée, sans revenu encore | Cartes avec la cible seule : « 84 000 FCFA prévus ». Bulle : « Tes pots se rempliront à ton prochain revenu, le 28. » Lien dessous : « Répartir mon argent maintenant ». Bouton « Déplacer » désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Pot vide | Ligne avec `warning`, en `#8A4B00` en clair, `#FFD27A` en sombre : « Plaisir est vide jusqu'au 28. » **Sans blocage** |
| Pot dépassé | Reste à 0 FCFA ; détail, en `#8A4B00` en clair, `#FFD27A` en sombre : « 3 000 FCFA de plus que prévu, pris sur Vie courante. » Jamais de rouge |
| Revenu variable | Sous la recette : « Sur le moins que tu gagnes : 90 000 FCFA ». Carte en plus : Le reste, sans cible, sans jauge : « Ce qui dépasse le plancher » |
| Plus de 6 pots | Les suivants prennent la pastille `#7A8A94` en clair, `#667781` en sombre |
| Hors ligne | Identique, avec l'indicateur « Enregistré sur ce téléphone » |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une carte | EC-28 |
| « Répartir mon argent maintenant » | Feuille basse ci-dessous |
| Ligne de recette | EC-30 |
| « Déplacer de l'argent » | Feuille de déplacement, décrite dans EC-28 |
| « Ajouter un pot » | EC-29 |
| Onglets | Change d'onglet |
| Retour | EC-12 |

### Répartir mon argent maintenant

Feuille basse, coins hauts 28 dp, fond `#FFFFFF` en clair, `#202C33` en sombre, voile `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre.

| Élément | Texte exact |
| --- | --- |
| Titre | Répartir ton argent maintenant ? |
| Texte, exemple | 21 600 FCFA iront dans Imprévus et Épargne. Ton chiffre passerait de 3 200 à 2 200 FCFA par jour. |
| Bouton principal | Répartir |
| Bouton texte | Attendre le 28 |

Après validation : bandeau « Annuler » pendant 10 secondes. **Exemple.** Reste à vivre de 72 000 FCFA, recette 70 / 20 / 10 : 30 % réservés, soit 21 600 FCFA ; (72 000 − 21 600) ÷ 22 jours = 2 290, arrondi à 2 200 FCFA.

## 8. Données

La somme des pots égale toujours la somme des poches perso.

| Valeur | Règle |
| --- | --- |
| Remplissage | Selon la recette, au prochain revenu, ou à partir du 1er du mois suivant si le revenu est variable ; ce qui restait avant va au quotidien |
| Répartir maintenant | Facultatif. La recette s'applique au reste à vivre, jamais à l'argent des charges. Lien masqué si le reste à vivre est négatif, ou après le premier revenu |
| Pot du quotidien | Vie courante, Besoins et Envies, ou Libre |
| Réservé | Les autres pots : ce qu'ils contiennent sort du chiffre du jour |
| Le reste | Réservé : le surplus au-delà du plancher sort du chiffre du jour ; on peut le déplacer vers le quotidien |
| Non détaillé | Réduit le pot du quotidien |

**Exemple.** Camille, le 6 décembre : Vie courante 24 000, Épargne 24 000, Dettes ou dons 12 000, soit 60 000 FCFA. Chiffre du jour : 200 FCFA.

## 9. Accessibilité

Carte : « Vie courante, 24 000 francs CFA restants sur 84 000, jusqu'au 28. » La jauge est ignorée, car sa valeur est écrite. L'alerte est lue dans la carte. Un pot n'est jamais identifié par sa seule couleur.

## 10. Mouvement

Jauge sans animation à l'ouverture. Après un déplacement, elle change en 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile |
| 320 × 568 dp | Marges de 16 dp ; « sur 84 000 » passe sous le reste |
| Texte à 200 % | Boutons empilés ; cartes plus hautes |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`pots_viewed`, avec le nombre de pots ; `pot_empty_shown`. **Aucun montant.**
