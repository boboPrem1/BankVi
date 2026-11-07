# EC-19 Bilan : compter

| Fiche | |
| --- | --- |
| **Parcours** | PC-05, PC-19 |
| **Lot** | L1 |
| **Bible** | SAI-09, SAI-08, SAI-12, PRV-16 |
| **Avant** | Notification « Mon rituel », EC-12, EC-38, EC-49 |
| **Après** | EC-20 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp, clavier ouvert |

## 1. Rôle

Commencer le rituel du soir par un seul geste : compter ses espèces. Budget : 30 secondes pour tout le bilan, espèces seules.

## 2. Ce qu'on voit

Comme une conversation : une bulle grise à gauche, à la manière d'un message reçu, demande : « Combien te reste-t-il en espèces ? » Dessous, un grand champ de montant, en attente, avec le clavier ouvert. Un lien permet d'ajouter Mixx et Flooz. L'écran n'affiche aucun montant attendu et le champ n'est jamais pré-rempli : il faut compter. Le bouton vert « Voir mon écart » reste au-dessus du clavier.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ✕  Mon bilan                       │ 56
│                                    │
│ ╭────────────────────────────╮     │
│ ┆ Combien te reste-t-il       │    │ 56
│ │ en espèces ?                │    │
│ ╰────────────────────────────╯     │
│                                    │
│ Espèces                            │
│ 41 500|                       FCFA │ 72
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Ajouter Mixx et Flooz              │ 48
│ ╭────────────────────────────────╮ │
│ │         Voir mon écart         │ │ 48
│ ╰────────────────────────────────╯ │
├────────────────────────────────────┤
│              clavier               │ ≈270
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Bulle | 56 dp, 80 % de large au plus | 24 dp |
| Champ montant | 72 dp | 8 dp |
| Bouton texte | 48 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Fermer | `close` | 24 dp | `#111B21` en clair, `#E9EDEF` en sombre |
| Titre | Mon bilan | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bulle | Combien te reste-t-il en espèces ? | Roboto 14/20 sp, Regular (400), haut gauche 4 dp, autres coins 12 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Libellé | Espèces | Roboto 14/20 sp, Medium (500) | `#008069` en clair, `#25D366` en sombre |
| Valeur | 41 500 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre ; placeholder « 0 » `#667781` en clair, `#8696A0` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Soulignement | — | Actif 2 dp | `#008069` en clair, `#25D366` en sombre |
| Bouton texte | Ajouter Mixx et Flooz | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Ligne facultative | Mixx, Flooz | 56 dp, avatar à initiale de 40 dp, champ à droite | Fond d'avatar `#F0F2F5` en clair, `#111B21` en sombre, valeur `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Voir mon écart | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Toutes les poches utilisées sont comptées | Les lignes prévues d'avant ce jour et non confirmées sont closes, sans message. Celles du jour restent demandées. Un revenu en retard peut encore être noté |
| Arrivée | Champ actif, bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) jusqu'à la première frappe ; 0 est permis |
| Mixx et Flooz dépliés | Une ligne par poche active, vide : une poche vide n'est pas comptée |
| Depuis la notification | L'app s'ouvre directement ici |
| Reprise après 30 jours | Bulle : « Combien as-tu en espèces aujourd'hui ? » ; l'écart couvrira toute la période |
| Bilan déjà fait aujourd'hui | Permis : le dernier comptage fait foi |
| Hors ligne | Identique |

Aucune remarque sur les jours sans bilan.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Frappe | Mise en forme en direct |
| « Ajouter Mixx et Flooz » | Déplie les lignes |
| « Voir mon écart » | Enregistre le comptage et ouvre EC-20 |
| `close` ou retour | Revient en arrière sans enregistrer ; le bilan reste à faire |

## 8. Données

Chaque valeur saisie crée un comptage de la poche. L'écart se calcule à l'écran suivant : solde attendu − solde compté. Le solde attendu vient du dernier comptage, plus les revenus, moins les dépenses, plus ou moins les transferts. Il n'apparaît pas sur cet écran. Le solde de l'accueil reste visible avant d'ouvrir le bilan : il n'est pas masqué.

**Exemple.** Karim : Espèces 45 000 au dernier comptage, Déjeuner 1 000 noté, soit 44 000 attendus. Il compte 41 500.

## 9. Accessibilité

La bulle est lue comme titre de l'écran, puis le champ : « Espèces, en francs CFA ». Le bouton désactivé annonce : « Indique d'abord tes espèces. »

## 10. Mouvement

Entrée d'écran standard. La bulle apparaît en 200 ms. Dépliage en 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | 298 dp utiles : la bulle défile vers le haut si Mixx et Flooz sont dépliés |
| 320 × 568 dp | Valeur à 30 sp, marges de 16 dp |
| Texte à 200 % | « FCFA » passe sous la valeur |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`ritual_opened`, avec l'origine ; `count_saved`, avec le nombre de poches. La durée du bilan commence ici. **Aucun montant.**
