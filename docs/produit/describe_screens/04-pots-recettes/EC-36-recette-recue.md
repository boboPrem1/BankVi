# EC-36 Recette reçue

| Fiche | |
| --- | --- |
| **Parcours** | PC-17 |
| **Lot** | L2 |
| **Bible** | PAR-02, DON-12 |
| **Avant** | Lien de partage ouvert depuis une conversation |
| **Après** | EC-08 ; EC-34 ; EC-12 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp |

## 1. Rôle

Découvrir une recette reçue sans risque : rien ne change sans confirmation, et son contenu n'est jamais du code.

## 2. Ce qu'on voit

Une bulle gris pâle annonce : « Partagée par un autre utilisateur. » Le nom de la recette, sa barre colorée, puis ses pots exacts avec leurs pourcentages, en texte simple. Une mention rappelle : « Repère, pas un conseil. » Le bouton vert : « Voir avec mes chiffres ». Un lien : « Ignorer ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ✕  Recette reçue                   │ 56
│ ╭──────────────────────────────╮   │
│ ┆ Partagée par un autre          │ │ 56
│ │ utilisateur.                   │ │
│ ╰──────────────────────────────╯   │
│ 45 / 25 / 25 / 5                   │ 32
│ ▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬ ▬▬▬▬▬▬ ▬        │  8
│ ● Besoins                    45 %  │ 48
│ ● Épargne                    25 %  │ 48
│ ● Projets                    25 %  │ 48
│ ● Plaisir                     5 %  │ 48
│ Repère, pas un conseil.            │ 20
│ ╭────────────────────────────────╮ │
│ │      Voir avec mes chiffres    │ │ 48
│ ╰────────────────────────────────╯ │
│              Ignorer               │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Bulle | 56 dp | 16 dp |
| Nom | 32 dp | 8 dp |
| Barre des pots | 8 dp | 12 dp |
| Lignes de pot | 48 dp chacune | 12 dp |
| Mention | 20 dp | 16 dp |
| Pied | 128 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Fermer | `close` | Zone 48 dp | `#111B21` en clair, `#E9EDEF` en sombre |
| Titre | Recette reçue | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bulle | Partagée par un autre utilisateur. | Roboto 14/20 sp, Regular (400), haut gauche 4 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Nom | 45 / 25 / 25 / 5 | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Barre | — | 8 dp, trou de 2 dp | `#008069` en clair, `#00A884` en sombre, `#D97A00` en clair, `#C47F00` en sombre, `#7F66FF` en clair, `#8B75FF` en sombre, `#E0568A` en clair, `#E0588A` en sombre |
| Pastille | — | 12 dp | Couleur du pot |
| Pot | Besoins | Roboto 16/24 sp, Regular (400), 24 caractères au plus | `#111B21` en clair, `#E9EDEF` en sombre |
| Pourcentage | 45 % | Roboto 16/24 sp, Regular (400), tabulaire, à droite | `#111B21` en clair, `#E9EDEF` en sombre |
| Mention | Repère, pas un conseil. | Roboto 14/20 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Voir avec mes chiffres | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte | Ignorer | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| App pas encore configurée | Le premier lancement d'abord (EC-01), puis retour sur cet écran |
| Sans revenu indiqué | EC-08 montre seulement les pourcentages |
| Lien invalide ou recette mal formée | « Cette recette ne peut pas s'ouvrir. » avec le bouton « Fermer ». Rien n'est enregistré |
| Sans réseau | « Il faut du réseau pour ouvrir ce lien. Tes données restent sur ce téléphone. » |
| Recette identique à la recette active | Mention : « Tu utilises déjà cette recette. » ; bouton « Fermer » |
| En gratuit, une recette déjà active | Sur EC-08, l'adoption demande : « Elle remplacera ta recette actuelle. » |
| Nom sensible | Affiché comme du texte, sans déduction. EC-48 s'applique au choix |
| Hors ligne | Comme sans réseau |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Voir avec mes chiffres » | EC-08, avec le bandeau de confirmation à l'adoption |
| « Ignorer », `close`, retour | Ferme sans rien enregistrer, vers EC-12 |

Rien n'est adopté depuis cet écran : deux étapes au moins, et une confirmation.

## 8. Données

**Sécurité :** la recette reçue est une entrée non fiable.

| Règle | Application |
| --- | --- |
| Données seules | Validée par un schéma ; jamais de code ni d'instruction exécutée |
| Texte simple | Noms limités à 24 caractères, sans lien, sans balise, sans mise en forme |
| Limites | 12 pots au plus, somme à 100 %, valeurs numériques vérifiées |
| Aucune identité | Aucun nom d'auteur, aucun numéro |
| Modération | Aucune galerie publique en P1 |

Une nature non lue passe ensuite par EC-34.

## 9. Accessibilité

La bulle est lue d'abord, et le nom de la recette est le titre. « Besoins, 45 %. » La barre est ignorée.

## 10. Mouvement

Entrée d'écran standard, sans autre animation.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Pourcentage sous le nom |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`shared_recipe_opened`, `shared_recipe_previewed`, `shared_recipe_ignored`, `shared_recipe_invalid`. **Aucun nom ni montant.**
