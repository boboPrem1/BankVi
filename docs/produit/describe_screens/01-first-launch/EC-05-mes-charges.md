# EC-05 Mes charges fixes

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement, question 3 sur 3 |
| **Lot** | L1 |
| **Bible** | ONB-02, SAI-17 |
| **Avant** | EC-04 Mon revenu |
| **Après** | EC-06 Premier horizon |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp, sans clavier sur l'écran principal |

## 1. Rôle

Connaître les grosses sorties qui reviennent chaque mois, avec le moins de frappe possible.

## 2. Ce qu'on voit

Les trois segments de progression sont verts. La question : « Quelles charges reviennent chaque mois ? » Dessous, des puces arrondies : Loyer, Électricité, École, Tontine, Autre. Toucher une puce fait monter une feuille basse pour indiquer le montant et le jour. Chaque charge ajoutée devient une ligne avec une icône, son nom, son montant et son jour, et sa puce disparaît. Le total s'affiche sous la liste. En bas, le bouton « Voir mon horizon ». Tant que rien n'est ajouté, ce bouton est grisé et un lien « Je n'en ai pas » est proposé.

## 3. Maquette

Avec quatre charges :

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←                                  │ 56
│ ▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬▬▬▬▬   │  4
│ Question 3 sur 3                   │ 16
│ Quelles charges reviennent         │
│ chaque mois ?                      │ 64
│ Ajoute les plus grosses.           │ 20
│ Tu compléteras plus tard.          │
│ ( + Autre )                        │ 32
│ ⌂  École             25 000 FCFA ✕ │ 72
│    le 3                            │
│ ⌂  Loyer             35 000 FCFA ✕ │ 72
│    le 5                            │
│ ϟ  Électricité        8 000 FCFA ✕ │ 72
│    le 15                           │
│ ⚇  Tontine           10 000 FCFA ✕ │ 72
│    le 20                           │
│ 4 charges · 78 000 FCFA par mois   │ 16
│ ╭────────────────────────────────╮ │
│ │        Voir mon horizon        │ │ 48
│ ╰────────────────────────────────╯ │
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

Feuille basse :

```text
│▒▒▒▒▒▒▒▒▒▒▒▒ voile ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│╭──────────────────────────────────╮│
││              ▬▬▬                 ││
││ Loyer                            ││ 24
││ Combien ?                        ││
││ 35 000|                     FCFA ││ 72
││ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ││
││ Le combien du mois ?             ││
││ 5                                ││ 56
││ ────────                         ││
││ ╭──────────────────────────────╮ ││
││ │           Ajouter            │ ││ 48
││ ╰──────────────────────────────╯ ││
│├──────────────────────────────────┤│
││              clavier             ││
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 0 |
| Progression et libellé | 28 dp | 16 dp |
| Question | 64 dp | 8 dp |
| Aide | 40 dp | 16 dp |
| Puces | 32 dp par rangée, écart 8 dp | 16 dp |
| Lignes de charge | 72 dp chacune | 8 dp |
| Total | 16 dp | 12 dp |
| Pied | 76 dp, ou 128 dp avec « Je n'en ai pas » | — |

Le contenu entre la barre du haut et le pied défile.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Segments | — | 4 dp | `#25D366` (clair et sombre) |
| Libellé de progression | Question 3 sur 3 | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Question | Quelles charges reviennent chaque mois ? | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Aide | Ajoute les plus grosses. Tu compléteras plus tard. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Puces | Loyer (`home`), Électricité (`bolt`), École (`school`), Tontine (`groups`), Autre (`add`) | 32 dp, pilule, Roboto 14/20 sp, Medium (500), icône 20 dp | Contour 1 dp `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Avatar de ligne | Icône de la charge ; `receipt_long` pour Autre | 40 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre, icône `#54656F` en clair, `#AEBAC1` en sombre |
| Nom | Loyer | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Jour | le 5 | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Montant | 35 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire, à droite | `#111B21` en clair, `#E9EDEF` en sombre |
| Retirer | Icône `close` de 20 dp, zone 48 dp | — | `#54656F` en clair, `#AEBAC1` en sombre |
| Séparateur | — | 1 dp, à l'aplomb du texte | `#E9EDEF` en clair, `#2A3942` en sombre |
| Total | 4 charges · 78 000 FCFA par mois | Roboto 14/20 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Voir mon horizon | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte, liste vide | Je n'en ai pas | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

### Feuille basse

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Surface | — | Coins hauts 28 dp, ombre `e3` | `#FFFFFF` en clair, `#202C33` en sombre |
| Voile | — | — | `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre |
| Poignée | — | 32 × 4 dp | `#7A8A94` en clair, `#667781` en sombre |
| Titre | Nom de la puce, par exemple Loyer | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Champ nom, pour Autre | Libellé : Nom de la charge. Placeholder : Par exemple, Téléphone | 56 dp, 30 caractères | `#111B21` en clair, `#E9EDEF` en sombre, placeholder `#667781` en clair, `#8696A0` en sombre |
| Champ montant | Libellé : Combien ? | 72 dp, Roboto 36/44 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Champ jour | Libellé : Le combien du mois ? | 56 dp, 120 dp de large | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Ajouter | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

Pour Autre, la feuille s'appelle « Nouvelle charge ». Modification d'une charge : le titre garde le nom, et le bouton devient « Enregistrer ».

## 6. États

| État | Affichage |
| --- | --- |
| Liste vide | Toutes les puces ; bouton principal désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) ; « Je n'en ai pas » sous le bouton |
| Une charge ou plus | Bouton actif ; lien « Je n'en ai pas » masqué ; puce de la charge retirée, « Autre » reste |
| Ajout incomplet | « Ajouter » désactivé tant que le montant (1 ou plus) et le jour ne sont pas valides |
| Jour hors limites | Sous le champ, en `#B3261E` en clair, `#F2B8B5` en sombre : « Indique un jour entre 1 et 31. » |
| Charge retirée | Ligne retirée, puce de retour, bandeau « Loyer retiré. » avec « Annuler » pendant 10 s |
| Nom libre sensible | Si le nom correspond à un libellé sensible, la feuille EC-48 s'ouvre avant l'ajout |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une puce | Feuille basse, montant actif, clavier ouvert |
| « Ajouter » | Ferme la feuille, ajoute la ligne en triant par jour du mois |
| Toucher une ligne | Feuille de modification |
| Toucher ✕ | Retrait immédiat, avec « Annuler » |
| « Voir mon horizon » | Enregistre et ouvre EC-06 |
| « Je n'en ai pas » | Ouvre EC-06 sans charge |
| Retour | Ferme la feuille si elle est ouverte, sinon EC-04 |

## 8. Données

Charges mensuelles seulement dans ce parcours : une charge par nom, montant et jour. Les autres rythmes se règlent ensuite dans EC-39.

**Total :** somme des montants, avec le pluriel adapté : « 1 charge · 8 000 FCFA par mois ».

**Exemples.** Camille : École 25 000 le 3, Loyer 35 000 le 5, Électricité 8 000 le 15, Tontine 10 000 le 20, soit 78 000 FCFA. Karim : Loyer 15 000 le 10, Téléphone 6 000 le 18, soit 21 000 FCFA.

## 9. Accessibilité

Les puces sont des boutons : « Ajouter Loyer ». Une ligne : « Loyer, 35 000 francs CFA, le 5. Toucher pour modifier. » La croix : « Retirer Loyer ». L'ajout est annoncé : « Loyer ajouté. Total 78 000 francs CFA. »

## 10. Mouvement

Feuille en 300 ms. Une nouvelle ligne apparaît en se dépliant sur 200 ms. La puce s'efface en 100 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile derrière le pied fixe, avec trait du haut |
| 320 × 568 dp | Dans la feuille, valeur à 30 sp ; marges de 16 dp |
| Texte à 200 % | Montant sous le nom dans chaque ligne ; hauteur libre |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`onboarding_step_viewed` et `onboarding_step_completed` (`charges`), avec le nombre de charges et `none` si l'utilisateur n'en a pas. **Aucun montant ni nom libre.**
