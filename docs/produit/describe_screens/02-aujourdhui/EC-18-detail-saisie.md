# EC-18 Détail d'une saisie

| Fiche | |
| --- | --- |
| **Parcours** | PC-08 |
| **Lot** | L1 |
| **Bible** | SAI-06, SAI-15, DON-01 |
| **Avant** | EC-17, EC-12 |
| **Après** | L'écran d'origine ; EC-14, EC-15 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp, sans barre du bas |

## 1. Rôle

Corriger une saisie sans crainte : tout reste modifiable, et une suppression s'annule.

## 2. Ce qu'on voit

Le montant en grand, déjà modifiable. Dessous, des lignes : date, poche, catégorie, description, chacune ouvrant son choix. Une petite mention indique l'origine : « Noté par toi », « Depuis une suggestion » ou « Depuis ton bilan ». En bas, « Enregistrer les changements » et, plus discret, « Supprimer » en rouge.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Dépense                         │ 56
│ Montant                            │
│ 500                           FCFA │ 72
│ ─────────────────────────────────  │
│ ▦ Date           Vendredi 6 nov. › │ 56
│ ▣ Poche                  Espèces › │ 56
│ ◉ Catégorie            Transport › │ 56
│ ✎ Description                 Taxi │ 56
│ Noté par toi, à 8 h 12             │ 16
│                                    │
│ ╭────────────────────────────────╮ │
│ │  Enregistrer les changements   │ │ 48
│ ╰────────────────────────────────╯ │
│             Supprimer              │ 48
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Champ montant | 72 dp | 12 dp |
| Lignes | 56 dp chacune | 0 |
| Origine | 16 dp | 24 dp |
| Pied | 128 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Dépense ou Revenu | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Valeur | 500 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Soulignement | — | Repos 1 dp ; actif 2 dp | Repos `#7A8A94` en clair, `#667781` en sombre ; actif `#008069` en clair, `#25D366` en sombre |
| Icône de ligne | `calendar_month`, `account_balance_wallet`, selon la catégorie, `edit` | 24 dp | `#54656F` en clair, `#AEBAC1` en sombre |
| Nom de ligne | Date, Poche, Catégorie, Description | Roboto 16/24 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Valeur de ligne | Vendredi 6 nov., Espèces, Transport, Taxi | Roboto 16/24 sp, Regular (400), à droite | `#54656F` en clair, `#AEBAC1` en sombre |
| Origine | Noté par toi, à 8 h 12 | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Enregistrer les changements | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton destructif | Supprimer | Roboto 14/20 sp, Medium (500), centré | `#B3261E` en clair, `#F2B8B5` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| Sans changement | Bouton principal désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Saisie d'un groupe | Mention : « Fait partie d'un groupe de 5 », icône `link`. Après « Enregistrer » ou « Supprimer », une feuille demande : **Seulement celle-ci** ou **Toutes les 5** |
| Ligne prévue | Mention « Prévu ». Le bouton texte « C'est fait » la rend réelle, à la date d'aujourd'hui, avec « Annuler ». Toute autre date passée la rend réelle aussi |
| Revenu | Titre « Revenu », catégories de revenus |
| Comptage | Lecture seule : « Comptage : 32 800 FCFA en espèces, jeudi 5 novembre ». Le bouton « Compter à nouveau » ouvre EC-19. Sans bouton de suppression |
| Transfert | De, Vers, montant, frais ; se corrige comme une saisie |
| « Non détaillé » | Montant, période. Le bouton « Détailler » ouvre EC-13 |
| Origine | Noté par toi · Depuis une suggestion · Depuis ton bilan |
| Montant vide ou 0 | Sous le champ, en `#B3261E` en clair, `#F2B8B5` en sombre : « Indique un montant, ou supprime cette saisie. » |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher le montant | Clavier numérique |
| Toucher Date | EC-15 |
| Toucher Poche | Feuille avec les poches actives |
| Toucher Catégorie | EC-14 |
| Toucher Description | Champ de texte avec autocomplétion |
| « Enregistrer les changements » | Applique, puis retour avec « Annuler » pendant 10 s |
| « Supprimer » | **Immédiat, sans confirmation** ; retour à l'écran d'origine avec « Annuler » pendant 10 s |
| Retour avec des changements | Les changements sont abandonnés, sans question |

## 8. Données

Le registre reste immuable : une correction ou une suppression s'enregistre comme une contre-écriture invisible pour l'utilisateur, et l'écran montre simplement la valeur à jour. Le chiffre du jour et l'horizon se recalculent aussitôt. Un changement de date avant le dernier comptage suit la règle : le solde compté ne change pas.

**Exemple.** Camille corrige Taxi de 500 à 700 FCFA : Espèces passe de 32 000 à 31 800 FCFA.

## 9. Accessibilité

Chaque ligne se lit « Date, vendredi 6 novembre, modifier ». L'action « Supprimer » annonce le résultat : « Supprimée. Annuler disponible 10 secondes. »

## 10. Mouvement

Entrée d'écran standard, sans animation sur les montants.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp ; valeurs de ligne coupées en fin |
| Texte à 200 % | Valeur sous le nom |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`entry_edited`, avec les champs modifiés ; `entry_deleted`, `entry_undo`. **Aucun montant.**
