# W-01 Connexion

| Fiche | |
| --- | --- |
| **Parcours** | PC-15 |
| **Lot** | L1 |
| **Bible** | DON-03, DON-20, PAY-04 |
| **Avant** | L'utilisateur saisit lui-même l'adresse dans son navigateur |
| **Après** | W-02 |
| **Cadre** | 360 px de large d'abord ; colonne de 480 px au plus, centrée ; marges de 16 px |

## 1. Rôle

Rattacher l'achat au bon compte, avec le même numéro que dans l'app.

## 2. Ce qu'on voit

Une page blanche et légère. La marque BankVi, un titre : « Connecte-toi avec ton numéro ». Le champ souligné avec +228, puis le bouton vert « Continuer ». Après l'envoi, le même écran affiche six cases pour le code.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ BankVi                             │ 56
│ Connecte-toi avec ton numéro       │ 64
│ Le même que dans l'app.            │ 20
│ Ton numéro                         │ 20
│ +228   90 12 34 56                 │ 48
│ ────   ━━━━━━━━━━━━━━━━━━━━━━━━━   │
│ ╭────────────────────────────────╮ │
│ │            Continuer           │ │ 48
│ ╰────────────────────────────────╯ │
│ BankVi · Conditions · Confidentialité │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| En-tête | 56 px | 16 px |
| Titre | 64 px | 8 px |
| Aide | 20 px | 24 px |
| Champ | 56 px | 16 px |
| Bouton | 48 px | 32 px |
| Pied | 48 px | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Marque | BankVi | Roboto 18/24 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Titre | Connecte-toi avec ton numéro | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Aide | Le même que dans l'app. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Libellé | Ton numéro | Roboto 14/20 sp, Medium (500) | `#008069` en clair, `#25D366` en sombre |
| Indicatif | +228 | Roboto 16/24 sp, Regular (400), 64 px | `#111B21` en clair, `#E9EDEF` en sombre |
| Numéro | 90 12 34 56 | Roboto 16/24 sp, Regular (400), groupes de deux | `#111B21` en clair, `#E9EDEF` en sombre |
| Soulignement | — | Actif 2 px | `#008069` en clair, `#25D366` en sombre |
| Bouton principal | Continuer | Roboto 16/24 sp, Medium (500), pilule, pleine largeur | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Pied | BankVi · Conditions · Confidentialité · Contact | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre ; liens `#00735E` en clair, `#25D366` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| Indicatif, à partir du L2 | Sélecteur des 8 pays de l'UEMOA, Togo par défaut, comme EC-10 |
| Moins de 8 chiffres | Bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Code envoyé | Six cases, 44 × 56 px : « Entre le code reçu au +228 90 12 34 56 », « Renvoyer le code dans 0:42 », lien « Modifier le numéro » |
| Code erroné | Traits en `#B3261E` en clair, `#F2B8B5` en sombre : « Ce code ne marche pas. Vérifie-le ou demande-en un autre. » |
| 5 essais échoués | Trop d'essais. Réessaie dans 15 minutes. |
| Numéro sans compte | Le compte se crée ; l'app le retrouvera avec ce numéro |
| Déjà connecté | Passage direct à W-02 |
| Réseau coupé | Le réseau a coupé. Réessaie : rien n'a été débité. |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Continuer » | Envoie le code |
| Code complet | Vérification, puis W-02 |
| Liens du pied | Pages de texte |

## 8. Données

Les mêmes règles que l'app : 6 chiffres, 10 minutes, 5 essais, session de 30 minutes sans activité, dans un cookie `HttpOnly`, `Secure` et `SameSite`. Le numéro n'est utilisé que pour le compte et le reçu.

## 9. Accessibilité

Vrais `label`, `h1`, et `autocomplete="tel-national"` puis `one-time-code`. Focus visible. Erreurs annoncées par `role="status"`. Contraste identique à l'app.

## 10. Mouvement

Aucun, sauf l'apparition des cases en fondu de 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 px | Cases de 41 px |
| Ordinateur | Colonne de 480 px au centre |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`web_login_started`, `web_login_completed`. Sans numéro ni traceur tiers. Sert au suivi de l'abandon entre l'app et le site.
