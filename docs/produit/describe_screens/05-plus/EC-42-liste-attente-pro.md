# EC-42 Liste d'attente Pass Pro

| Fiche | |
| --- | --- |
| **Parcours** | PC-15 |
| **Lot** | L1 |
| **Bible** | VAL-08, LEG-05 |
| **Avant** | EC-41 |
| **Après** | EC-41 ; EC-10 sans compte |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp |

## 1. Rôle

Mesurer l'intérêt des indépendants pour le Pass Pro, sans demander aucun paiement.

## 2. Ce qu'on voit

Un titre, trois promesses à venir, le prix prévu et une phrase sans ambiguïté : aucun paiement n'est demandé. Le bouton vert : « M'inscrire sur la liste ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Pass Pro                        │ 56
│ Pour séparer ton activité          │ 64
│ de ton argent                      │
│ Bientôt :                          │ 24
│ ✓ Séparation perso et pro          │ 32
│ ✓ Caisse d'activité                │ 32
│ ✓ Revenu lissé                     │ 32
│ Prix prévu : 2 500 FCFA pour 30    │ 40
│ jours, 25 000 FCFA par an.         │
│ Aucun paiement demandé. On te      │ 48
│ préviendra une seule fois.         │
│ ╭────────────────────────────────╮ │
│ │    M'inscrire sur la liste     │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Titre | 64 dp | 16 dp |
| Liste | 24 dp, puis 32 dp par ligne | 16 dp |
| Prix | 40 dp | 12 dp |
| Mention | 48 dp | 16 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre de barre | Pass Pro | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Titre | Pour séparer ton activité de ton argent | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Libellé | Bientôt : | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Coche | `check` | 20 dp | `#54656F` en clair, `#AEBAC1` en sombre |
| Ligne | Séparation perso et pro | Roboto 14/20 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Prix | Prix prévu : 2 500 FCFA pour 30 jours, 25 000 FCFA par an. | Roboto 14/20 sp, Regular (400), tabulaire | `#54656F` en clair, `#AEBAC1` en sombre |
| Mention | Aucun paiement demandé. On te préviendra une seule fois. | Roboto 16/24 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | M'inscrire sur la liste | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Inscrit | Icône `check_circle` et « Tu es sur la liste. » Bouton texte : Me retirer de la liste |
| Sans compte | Bulle : « Sauvegarde d'abord tes données : il faut un numéro pour te prévenir. » Bouton : Sauvegarder (EC-10) |
| Sans réseau | Il faut du réseau pour cette étape. Tes données restent sur ce téléphone. |
| Hors ligne | Comme sans réseau |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « M'inscrire sur la liste » | Enregistre ; état Inscrit |
| Me retirer de la liste | Immédiat, avec « Annuler » pendant 10 s |
| Retour | EC-41 |

## 8. Données

Le bouton vaut consentement explicite à un seul message, à l'ouverture du Pass Pro. Aucune case cochée d'avance. Aucun autre envoi commercial. Le numéro n'est utilisé pour rien d'autre.

## 9. Accessibilité

Titre déclaré. L'état est annoncé : « Tu es sur la liste. »

## 10. Mouvement

Entrée d'écran standard. Changement d'état en fondu de 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`pro_waitlist_viewed`, `pro_waitlist_joined`, `pro_waitlist_left`. Le plan fixera le seuil après les entretiens.
