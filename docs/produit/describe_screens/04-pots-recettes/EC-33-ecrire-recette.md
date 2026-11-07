# EC-33 Écrire une recette

| Fiche | |
| --- | --- |
| **Parcours** | PC-14 |
| **Lot** | L2, Pass Plus |
| **Bible** | REC-05, UX-01 |
| **Avant** | EC-31 |
| **Après** | EC-34, EC-30 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp, clavier ouvert |

## 1. Rôle

Créer sa recette en écrivant une phrase, comme un message. Budget : une saisie et un tap.

## 2. Ce qu'on voit

Un champ de texte avec un exemple grisé. Sous le champ, le résultat apparaît en direct : la fine barre colorée, puis chaque pot avec son pourcentage et son montant en francs CFA. Si la phrase est incomplète, l'app montre ce qu'elle a compris et indique ce qui manque, sans deviner. Le bouton vert : « Créer cette recette ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Écrire une recette              │ 56
│ Ta recette en une phrase           │ 20
│ 45 besoins, 25 épargne, 25 projets,│
│ 5 plaisir|                         │ 72
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ ▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬ ▬▬▬▬▬▬ ▬        │  8
│ ● Besoins    45 %     54 000 FCFA  │ 32
│ ● Épargne    25 %     30 000 FCFA  │ 32
│ ● Projets    25 %     30 000 FCFA  │ 32
│ ● Plaisir     5 %      6 000 FCFA  │ 32
│ ╭────────────────────────────────╮ │
│ │      Créer cette recette       │ │ 48
│ ╰────────────────────────────────╯ │
├────────────────────────────────────┤
│              clavier               │ ≈270
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Libellé | 20 dp | 4 dp |
| Champ, 2 lignes, puis grandit | 72 dp | 12 dp |
| Barre des pots | 8 dp | 8 dp |
| Lignes de pot | 32 dp chacune | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Écrire une recette | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Libellé | Ta recette en une phrase | Roboto 14/20 sp, Medium (500) | `#008069` en clair, `#25D366` en sombre |
| Champ | 45 besoins, 25 épargne, 25 projets, 5 plaisir | Roboto 16/24 sp, Regular (400), 120 caractères | `#111B21` en clair, `#E9EDEF` en sombre |
| Exemple | 45 besoins, 25 épargne, 25 projets, 5 plaisir | Roboto 16/24 sp, Regular (400) | `#667781` en clair, `#8696A0` en sombre |
| Soulignement | — | Actif 2 dp | `#008069` en clair, `#25D366` en sombre |
| Barre | — | 8 dp, trou de 2 dp | `#008069` en clair, `#00A884` en sombre, `#D97A00` en clair, `#C47F00` en sombre, `#7F66FF` en clair, `#8B75FF` en sombre, `#E0568A` en clair, `#E0588A` en sombre |
| Pastille | — | 12 dp | Couleur du pot |
| Pot | Besoins | Roboto 14/20 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Pourcentage et montant | 45 %, 54 000 FCFA | Roboto 14/20 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Créer cette recette | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| Phrase | Résultat |
| --- | --- |
| 45 besoins, 25 épargne, 25 projets, 5 plaisir | Quatre pots nommés ; bouton actif |
| 45 / 25 / 25 / 5 | Pot 1, Pot 2, Pot 3, Pot 4, avec un champ de nom pour chacun ; bouton actif une fois nommés |
| 45 besoins, 25 épargne | En `#8A4B00` en clair, `#FFD27A` en sombre, avec `warning` : « La somme fait 70 %. Il manque 30 %. » Bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| 60 besoins, 60 épargne | « La somme fait 120 %. Il y a 20 % de trop. » Bouton désactivé |
| Beaucoup d'épargne | « Je n'ai pas compris. Essaie : 45 besoins, 25 épargne. » Bouton désactivé |
| Vide | L'exemple grisé seul ; pas de résultat |
| Sans pass | La description de la fonction, avec un exemple et sans bouton d'achat ; renvoi à EC-41 |
| Hors ligne | Identique : l'analyseur est sur le téléphone |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Frappe | Résultat mis à jour à chaque caractère |
| « Créer cette recette » | Crée et active la recette ; EC-34 si besoin ; EC-30 ; bandeau « Recette créée. », « Annuler » pendant 10 s |
| Retour | EC-31, phrase gardée en brouillon jusqu'à la fermeture de l'app |

## 8. Données

L'analyseur est **déterministe** et n'utilise aucune IA : il reconnaît les nombres et les mots connus, les associe aux natures, et crée un pot pour les autres. Il ne devine jamais un nombre. Le texte de l'utilisateur est traité comme du texte simple.

| Mot | Nature lue |
| --- | --- |
| besoins | besoin |
| épargne | épargne |
| plaisir, envies | envie |
| projets | projet |
| Autre mot | Un pot libre, sans nature : EC-34 propose de les ranger |

**Exemple.** 45 / 25 / 25 / 5 sur 120 000 FCFA : 54 000, 30 000, 30 000 et 6 000 FCFA.

## 9. Accessibilité

Champ : « Ta recette en une phrase ». Le résultat est annoncé après une pause dans la frappe, pas à chaque caractère. Les messages sont annoncés. La barre est ignorée.

## 10. Mouvement

Les lignes de pot apparaissent en 100 ms. Pas de saut quand le champ grandit : le contenu défile.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | 298 dp utiles : le résultat défile ; champ et bouton restent visibles |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Montant sous le pourcentage |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`recipe_sentence_created`, `recipe_sentence_failed`, avec le motif (`sum`, `unknown`). VAL-06 mesure la part de phrases comprises. **Jamais le texte saisi.**
