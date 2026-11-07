# EC-38 Mes poches

| Fiche | |
| --- | --- |
| **Parcours** | PC-05, PC-07 |
| **Lot** | L1 |
| **Bible** | POC-01, POC-02, POC-06, IND-01 |
| **Avant** | EC-37 |
| **Après** | EC-19, EC-22 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Voir son argent réel par poche, avec la date du dernier comptage, et séparer l'argent de son activité.

## 2. Ce qu'on voit

Le total en haut, puis une ligne par poche : icône ou initiale, nom, dernier comptage, solde à droite. Une ligne propose d'ajouter Flooz. Plus bas, un interrupteur active la poche d'activité. Le bouton vert : « Compter mes poches ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Mes poches                      │ 56
│ Total                              │ 16
│ 90 000 FCFA                        │ 32
│ ▣ Espèces            32 000 FCFA   │ 72
│   Compté hier à 20 h               │
│ Ⓜ Mixx               58 000 FCFA   │ 72
│   Compté il y a 3 jours            │
│ Ⓕ Flooz                  Ajouter   │ 56
│ ────────────────────────────────── │
│ Poche d'activité              (○ ) │ 72
│ Sépare l'argent de ton activité    │
│ du tien.                           │
│ ╭────────────────────────────────╮ │
│ │       Compter mes poches       │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Total | 48 dp | 12 dp |
| Ligne de poche | 72 dp | 0 |
| Interrupteur | 72 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Mes poches | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Libellé du total | Total | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Total | 90 000 FCFA | Roboto 24/32 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Avatar | `payments`, M, F, `storefront` pour l'activité | 40 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre, contenu `#54656F` en clair, `#AEBAC1` en sombre |
| Poche | Espèces | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Comptage | Compté hier à 20 h | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Solde | 32 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Ajouter | Ajouter | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Interrupteur | Poche d'activité / Sépare l'argent de ton activité du tien. | Voir [saisie](../00-design-system/11-composants-saisie.md#11-interrupteur) ; Roboto 16/24 sp, Medium (500), Roboto 14/20 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre, `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Compter mes poches | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Hors du Togo, à partir du L2 | La poche Mon mobile money se renomme : Orange Money, Wave, MTN… Une seule en P1 |
| Activité activée | Une ligne en plus sous un titre « Activité » : Solde 45 000 FCFA, « hors de ce que tu peux dépenser ». Elle ne compte pas dans le total du haut |
| Jamais comptée | Solde de départ, le 6 novembre |
| Comptage ancien, plus de 30 jours | Texte factuel : Compté il y a 40 jours, sans alerte |
| Une poche masquée | Ligne « Poches masquées » en bas ; toucher pour les retrouver |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une poche | EC-22, avec cette poche en « De » |
| Appui long | Feuille : Corriger le solde, Masquer cette poche |
| « Ajouter » | Feuille : solde de départ, en champ montant |
| Interrupteur | Feuille : solde de départ de l'activité ; 0 permis |
| « Compter mes poches » | EC-19 |
| Retour | EC-37 |

## 8. Données

Une poche qui a un historique se masque, sans suppression : le registre reste juste. Le total additionne les poches perso. La poche d'activité reste hors du reste à vivre, sauf transfert vers une poche perso.

**Exemple.** Karim active l'activité avec 45 000 FCFA. Son chiffre du jour ne change pas.

## 9. Accessibilité

Ligne : « Espèces, 32 000 francs CFA, compté hier à 20 h ». Interrupteur : « Poche d'activité, désactivée ». Action personnalisée pour l'appui long.

## 10. Mouvement

Une nouvelle ligne se déplie en 200 ms. Feuille en 300 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Solde sous le nom |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`pocket_added`, `activity_pocket_enabled`, `count_started`. **Aucun montant.**
