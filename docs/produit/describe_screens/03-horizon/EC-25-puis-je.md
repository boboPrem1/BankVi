# EC-25 Puis-je me permettre ça ?

| Fiche | |
| --- | --- |
| **Parcours** | PC-12 |
| **Lot** | L1 ; 3 essais offerts, puis Pass Plus |
| **Bible** | PRV-07, UX-01, LEG-04 |
| **Avant** | EC-23 |
| **Après** | EC-23 ; EC-41 sans pass ; EC-15 pour une autre date |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp, clavier ouvert, sans barre du bas |

## 1. Rôle

Voir la conséquence d'un achat avant de le faire. Budget : le montant et 1 tap. C'est une simulation : rien n'est enregistré, et l'app ne dit jamais oui ou non.

## 2. Ce qu'on voit

Le clavier numérique est ouvert. En haut, le montant en grands chiffres, puis des puces de date où « Aujourd'hui » est déjà choisi. Le bouton vert : « Voir la conséquence ». Après le toucher, le clavier se ferme : une bulle donne le fait en une phrase, et la courbe montre deux lignes, sans et avec cet achat. Rien n'a bougé dans les comptes.

## 3. Maquette

Saisie :

```text
┌────────────────────────────────────┐
│ ✕  Puis-je me permettre ça ?       │ 56
│ Montant                            │
│ 15 000|                       FCFA │ 72
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ (✓Aujourd'hui) (Demain) (Autre date)│ 48
│ (▣ Espèces ▾)                      │ 48
│ ╭────────────────────────────────╮ │
│ │       Voir la conséquence      │ │ 48
│ ╰────────────────────────────────╯ │
├────────────────────────────────────┤
│              clavier               │ ≈270
└────────────────────────────────────┘
```

Résultat :

```text
┌────────────────────────────────────┐
│ ✕  Puis-je me permettre ça ?       │ 56
│ 15 000 FCFA, aujourd'hui      Modifier│ 48
│ ╭──────────────────────────────╮   │
│ ┆ Il te resterait 2 500 FCFA    │  │ 56
│ │ par jour jusqu'au 28.         │  │
│ ╰──────────────────────────────╯   │
│ ── Sans cet achat ╴╴ Avec cet achat│ 16
│ ●╴╴╴                    ┆╴╴╴       │
│    ╴╴╴╴╴                ┆   ╴╴╴    │ 200
│         ╴╴╴╴╴╴╴╴╴╴╴     ┆          │
│ 6 nov.       21 nov.       6 déc.  │
│ Simulation : rien n'est enregistré.│ 16
│ ╭────────────────────────────────╮ │
│ │     L'ajouter à mes prévus     │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc, saisie | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Champ montant | 72 dp | 8 dp |
| Dates | 48 dp | 0 |
| Poche | 48 dp | 12 dp |
| Pied | 76 dp | — |

| Bloc, résultat | Hauteur | Écart après |
| --- | --- | --- |
| Rappel | 48 dp | 8 dp |
| Bulle | 56 dp | 12 dp |
| Légende | 16 dp | 8 dp |
| Courbe | 200 dp | 8 dp |
| Mention | 16 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Fermer | `close` | Zone 48 dp | `#111B21` en clair, `#E9EDEF` en sombre |
| Titre | Puis-je me permettre ça ? | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Libellé | Montant | Roboto 14/20 sp, Medium (500) | `#008069` en clair, `#25D366` en sombre |
| Valeur | 15 000 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre ; placeholder « 0 » `#667781` en clair, `#8696A0` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Dates | Aujourd'hui, Demain, Autre date | Puces de 32 dp | Choisie : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Poche | Espèces, icône `payments` | Puce avec chevron | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Voir la conséquence | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Rappel | 15 000 FCFA, aujourd'hui | Roboto 16/24 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Lien | Modifier | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Bulle | Voir les réponses plus bas | Roboto 14/20 sp, Regular (400), haut gauche 4 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Courbe sans l'achat | Sans cet achat | 2 dp plein | `#7A8A94` en clair, `#667781` en sombre |
| Courbe avec l'achat | Avec cet achat | 2 dp, pointillés 6 et 4 dp | `#008069` en clair, `#25D366` en sombre |
| Légende | — | Deux séries : trait court et nom, Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Mention | Simulation : rien n'est enregistré. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal, résultat | L'ajouter à mes prévus | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. Les réponses

Pour Camille, à 90 000 FCFA et 3 200 FCFA par jour. La phrase énonce un fait : ni « oui », ni « non », ni couleur verte ou rouge.

| Simulation | Calcul | Texte exact |
| --- | --- | --- |
| 15 000 FCFA aujourd'hui | (75 000 − 18 000) ÷ 22 = 2 590 | Il te resterait 2 500 FCFA par jour jusqu'au 28. |
| 60 000 FCFA aujourd'hui | (30 000 − 18 000) ÷ 22 = 545 | Il te resterait 500 FCFA par jour jusqu'au 28. |
| 80 000 FCFA aujourd'hui | 10 000 − 18 000 = −8 000 | Il manquerait 8 000 FCFA le 20. |
| 40 000 FCFA le 3 décembre | (121 600 − 78 000 − 40 000) ÷ 30 = 120 | Ton chiffre ne change pas avant le 28. Ensuite, il te resterait 100 FCFA par jour jusqu'au 28 décembre. |

Une réponse de manque porte l'icône `warning`, avec le texte en `#8A4B00` en clair, `#FFD27A` en sombre sur `#FFF3D6` en clair, `#3A2C10` en sombre. Pas de rouge.

## 7. États

| État | Affichage |
| --- | --- |
| Montant vide | Bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Poche d'activité choisie | Bulle : « Cette poche n'entre pas dans ce que tu peux dépenser. Ton chiffre ne change pas. » |
| Revenu variable | La bulle précise : « si tu gagnes au moins 90 000 FCFA ce mois-ci » |
| Hors ligne | Identique : le calcul se fait sur le téléphone |

### Essais offerts

Sans pass, l'utilisateur dispose de **3 simulations complètes**, avec ses propres chiffres. Un essai compte au toucher de « Voir la conséquence ». Modifier le montant puis relancer consomme un autre essai. Les essais ne se rechargent pas, sont liés au compte ou au téléphone, et ne s'affichent jamais avec un compte à rebours.

| Moment | Texte, en Roboto 12/16 sp, `#54656F` en clair, `#AEBAC1` en sombre |
| --- | --- |
| Avant la simulation | 3 essais offerts |
| Après la première | Il te reste 2 essais offerts. |
| Après la dernière | C'était ton dernier essai offert. |

### Sans Pass Plus, essais utilisés

L'écran décrit la fonction. Il ne contient **aucun lien, aucun bouton d'achat, aucun renvoi vers le navigateur**.

| Élément | Texte exact | Style |
| --- | --- | --- |
| Titre | Puis-je me permettre ça ? | Roboto 24/32 sp, Medium (500) |
| Description | Indique un montant : tu vois tout de suite ce qu'il te resterait par jour, sans rien enregistrer. | Roboto 16/24 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Exemple | Il te resterait 2 500 FCFA par jour jusqu'au 28. | Bulle marquée « Exemple », fond `#F0F2F5` en clair, `#202C33` en sombre |
| Mention | Cette fonction fait partie du Pass Plus. | Roboto 14/20 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton texte | Voir le Pass Plus | Ouvre EC-41, `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Fermer | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

L'alerte de découvert et les repères à 3, 7 et 30 jours restent gratuits.

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Voir la conséquence » | Affiche le résultat, ferme le clavier |
| Autre date | EC-15, jusqu'à 90 jours en avant |
| « Modifier » | Revient à la saisie, valeurs gardées |
| Glisser sur la courbe | Info-bulle avec les deux soldes |
| « L'ajouter à mes prévus » | Crée une ligne prévue, retour à EC-23, bandeau « Ajouté à tes prévus. » avec « Annuler » pendant 10 s |
| `close` ou retour | Revient à EC-23, sans rien enregistrer |

## 9. Données

Le moteur calcule sur une copie : aucune écriture n'est créée. La ligne prévue n'existe que si l'utilisateur touche « L'ajouter à mes prévus ». Ce n'est ni du réel ni un conseil.

## 10. Accessibilité

La réponse est annoncée dès qu'elle paraît. Courbes : « Avec cet achat : 75 000 francs aujourd'hui, 4 500 au plus bas le 27 novembre. Sans cet achat : 4 800. » Les deux séries se distinguent par le trait et par la légende, jamais par la seule couleur.

## 11. Mouvement

La deuxième courbe se trace en 300 ms au-dessus de la première. Clavier géré par le système. Aucune alerte animée.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Courbe à 150 dp au résultat ; le contenu défile, pied fixe |
| 320 × 568 dp | Valeur à 30 sp, marges de 16 dp |
| Texte à 200 % | Légende sur deux lignes ; le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 13. Mesure

`affordability_opened`, `affordability_result`, `affordability_added`, avec le type de réponse (`ok`, `lack`), et `pass_description_viewed`, `trial_used`, avec le rang de l'essai, et `pass_description_closed`. **Aucun montant.** Le plan mesure aussi, en entretien, si la prévision change une décision.
