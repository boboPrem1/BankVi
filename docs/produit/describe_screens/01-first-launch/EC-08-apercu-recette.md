# EC-08 Aperçu d'une recette

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement ; PC-14 Changer de recette |
| **Lot** | L1 |
| **Bible** | REC-01, REC-04, REC-09, LEG-03, POT-01 |
| **Avant** | EC-07 Recette la plus proche, EC-31 Catalogue, ou EC-36 Recette reçue |
| **Après** | EC-09 Quand noter · EC-32 Ajuster ; EC-30 si l'utilisateur vient du catalogue ou d'une recette reçue ; EC-34 si une nature n'est plus lue |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp |

## 1. Rôle

Montrer la recette en francs CFA, sur le revenu de l'utilisateur, pour qu'il décide en connaissance de cause. Budget : 3 taps pour adopter.

## 2. Ce qu'on voit

La barre du haut porte le nom de la recette. Une phrase indique la base : « Sur ton revenu de 120 000 FCFA ». Une barre colorée fine, puis les pots en liste : pastille, nom, pourcentage, et le montant à droite en chiffres alignés. Dessous, une phrase donne l'effet : « À partir du 28, il te resterait 200 FCFA par jour. » Puis la source de la recette et une mention sobre : « Repère, pas un conseil. » En bas, « Adopter cette recette » en vert et « Ajuster » en texte.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←  70 / 20 / 10                    │ 56
│                                    │
│ Sur ton revenu de 120 000 FCFA     │ 24
│                                    │
│ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬ ▬▬▬  │  8
│                                    │
│ ● Vie courante                     │
│   70 %              84 000 FCFA    │ 72
│ ────────────────────────────────── │
│ ● Épargne                          │
│   20 %              24 000 FCFA    │ 72
│ ────────────────────────────────── │
│ ● Dettes ou dons                   │
│   10 %              12 000 FCFA    │ 72
│                                    │
│ À partir du 28, il te resterait    │
│ 200 FCFA par jour.                 │ 48
│ Source : guides de budget grand    │
│ public (Thrivent, The Penny Hoarder)│ 40
│ Repère, pas un conseil.            │ 20
│                                    │
│ ╭────────────────────────────────╮ │
│ │     Adopter cette recette      │ │ 48
│ ╰────────────────────────────────╯ │
│              Ajuster               │ 48
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Base | 24 dp | 16 dp |
| Barre des pots | 8 dp | 16 dp |
| Ligne de pot | 72 dp | 0, avec séparateur |
| Effet | 48 dp | 8 dp |
| Source | 40 dp | 8 dp |
| Mention | 20 dp | 16 dp |
| Pied | 128 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre de barre | 70 / 20 / 10 | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Base | Sur ton revenu de 120 000 FCFA | Roboto 16/24 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Barre | — | 8 dp, bouts arrondis, trou de 2 dp | `#008069` en clair, `#00A884` en sombre, `#D97A00` en clair, `#C47F00` en sombre, `#7F66FF` en clair, `#8B75FF` en sombre dans l'ordre |
| Pastille | — | 12 dp | Couleur du pot |
| Nom du pot | Vie courante | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Pourcentage | 70 % | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Montant | 84 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire, à droite | `#111B21` en clair, `#E9EDEF` en sombre |
| Séparateur | — | 1 dp, à l'aplomb du nom | `#E9EDEF` en clair, `#2A3942` en sombre |
| Effet | À partir du 28, il te resterait 200 FCFA par jour. | Roboto 16/24 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Source | Source : … | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Mention | Repère, pas un conseil. | Roboto 14/20 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Adopter cette recette | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte | Ajuster | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

## 6. Contenu selon la recette

Les montants portent sur le revenu de référence : le revenu régulier, ou le plancher si le revenu varie. Ils s'arrondissent à la baisse à 100 FCFA, et le dernier pot prend le reste pour que la somme soit juste.

| Recette | Titre | Pots sur 120 000 FCFA | Source |
| --- | --- | --- | --- |
| 50 / 30 / 20 | 50 / 30 / 20 | Besoins 60 000 · Envies 36 000 · Épargne et dettes 24 000 | Elizabeth Warren |
| 70 / 20 / 10 | 70 / 20 / 10 | Vie courante 84 000 · Épargne 24 000 · Dettes ou dons 12 000 | Guides de budget grand public (Thrivent, The Penny Hoarder) |
| Payez-vous d'abord | Payez-vous d'abord | Épargne 24 000, en premier · Libre 96 000 | Guides de budget grand public (Thrivent, The Penny Hoarder) |

**Effet sur le chiffre, pour Camille :** (121 600 − 78 000 − réservé) ÷ 30.

| Recette | Réservé | Phrase |
| --- | --- | --- |
| 70 / 20 / 10 | 36 000 | À partir du 28, il te resterait 200 FCFA par jour. |
| 50 / 30 / 20 | 24 000 | À partir du 28, il te resterait 600 FCFA par jour. |
| Payez-vous d'abord | 24 000 | À partir du 28, il te resterait 600 FCFA par jour. |

Sans recette, ce serait 1 400 FCFA par jour. Si le résultat est négatif : « À partir du 28, tes charges et tes pots dépasseraient ton argent de 4 000 FCFA. » C'est un fait, sans conseil.

**Revenu plancher prudent, cas de Karim.** Titre : Revenu plancher prudent. Base : « Sur le moins que tu gagnes : 90 000 FCFA ». Pots : Vie courante 63 000, Imprévus 18 000, Épargne 9 000. Quatrième ligne sans pourcentage ni pastille de couleur : « Le reste », avec en sous-titre « Tout ce qui dépasse 90 000 FCFA » et le montant « Selon le mois ». Source : « Méthode pour revenus irréguliers, adaptée par BankVi ».

**Effet sur le chiffre, pour Karim :** (1 500 + 90 000 − 21 000 − réservé) ÷ 31. Un revenu variable remplit les pots à partir du 1er du mois suivant, d'où cette date dans la phrase.

| Recette | Réservé | Phrase |
| --- | --- | --- |
| Revenu plancher prudent | 27 000 | À partir du 1er décembre, il te resterait 1 400 FCFA par jour. |
| 70 / 20 / 10 | 27 000 | À partir du 1er décembre, il te resterait 1 400 FCFA par jour. |
| 50 / 30 / 20 | 18 000 | À partir du 1er décembre, il te resterait 1 600 FCFA par jour. |

Sans recette, ce serait 2 200 FCFA par jour.

## 7. États

| État | Affichage |
| --- | --- |
| Revenu variable à 0 | Pourcentages seuls, sans montant ; base : « Indique ton revenu pour voir les montants » |
| Recette déjà active, depuis le catalogue | Bouton principal remplacé par la marque « Recette active » ; « Ajuster » reste |
| Depuis EC-31 ou EC-36 | Bouton : « Adopter cette recette » ; EC-34 si une nature n'est plus lue, puis retour vers EC-30, avec le bandeau |
| Sans réseau | Aucun changement. Le choix sera synchronisé plus tard |

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Adopter cette recette » | Active la recette ; ouvre EC-09 ; bandeau bas « Recette adoptée. », « Annuler » pendant 10 s |
| « Annuler » | Retire la recette, l'utilisateur reste sur EC-09 |
| « Ajuster » | EC-32, avec duplication de cette recette ; au retour, cet écran montre la recette ajustée |
| Flèche ou retour | EC-07 |

Adopter ne déplace pas d'argent réel. La répartition se fera à chaque revenu. Aucune recatégorisation n'est demandée.

## 9. Accessibilité

Déclaré titre : « 70 / 20 / 10 ». Lecture d'une ligne : « Vie courante, 70 %, 84 000 francs CFA. » La barre est ignorée. La mention est lue, et jamais masquée.

## 10. Mouvement

Entrée d'écran standard. Le bandeau apparaît sur l'écran suivant, en 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Le montant passe sous le pourcentage |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`recipe_previewed`, `recipe_adopted`, avec l'identifiant, et le nombre de taps depuis EC-07 pour vérifier le budget. **Aucun montant.**
