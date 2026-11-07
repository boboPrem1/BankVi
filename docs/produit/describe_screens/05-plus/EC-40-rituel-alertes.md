# EC-40 Mon rituel et alertes

| Fiche | |
| --- | --- |
| **Parcours** | PC-13, PC-19 |
| **Lot** | L1 ; le son en L2 |
| **Bible** | MSG-01, MSG-02, MSG-03, MSG-04, MSG-05, SAI-08 |
| **Avant** | EC-37, EC-12 |
| **Après** | EC-37 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Choisir quand l'app parle, et savoir ce qui reste toujours inclus. Aucun réglage n'empêche de noter.

## 2. Ce qu'on voit

D'abord le choix : Au fil de la journée ou Le soir, avec l'heure du rituel. Une ligne indique si le rituel est actif. Dessous, les alertes, chacune avec un interrupteur. L'alerte de découvert porte la mention : « Toujours gratuite ». Une phrase rassure : « Aucune notification la nuit. » Le bouton vert : « Enregistrer ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Mon rituel et alertes           │ 56
│ ( ○ Au fil de la journée         ) │ 72
│ ( ◉ Le soir                      ) │ 72
│ Rappel à                           │ 20
│ (19 h) (✓20 h) (21 h) (22 h) (Autre)│ 48
│ Rituel actif                       │ 20
│ Alertes                            │ 16
│ Découvert prévu              (● ) │ 72
│ Toujours gratuite                  │
│ Fin de mon pass              (● ) │ 56
│ Aucune notification la nuit.       │ 20
│ ╭────────────────────────────────╮ │
│ │           Enregistrer          │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Cartes de choix | 72 dp chacune | 12 dp |
| Libellé et puces d'heure | 68 dp | 8 dp |
| État | 20 dp | 16 dp |
| Lignes d'alerte | 56 à 72 dp | 0 |
| Mention | 20 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Mon rituel et alertes | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Carte choisie | Le soir | Rayon 12 dp, contour 2 dp, Roboto 16/24 sp, Medium (500) | Fond `#D8FDD2` en clair, `#103529` en sombre, contour `#008069` en clair, `#25D366` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Puce d'heure | 20 h | 32 dp, Roboto 14/20 sp, Medium (500) | Choisie : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| État | Rituel actif, ou Rituel en pause | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Titre | Alertes | Roboto 12/16 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Alerte | Découvert prévu | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Sous-titre | Toujours gratuite | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Mention | Aucune notification la nuit. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Enregistrer | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Verrouillage actif (EC-52) | Notifications sans montant : « Ton statut du jour est prêt. » |
| Au fil de la journée | Pas de puces ni d'état de rituel |
| Rituel en pause, après 5 jours ignorés | Rituel en pause. Avec le bouton texte « Relancer » |
| Notifications coupées dans le téléphone | Bandeau d'information : « Les notifications sont coupées dans les réglages du téléphone. » avec « Ouvrir les réglages ». Le rappel s'affiche sur l'accueil |
| Sans pass | La ligne « Fin de mon pass » est absente |
| Son du statut, L2 | Ligne : Son du statut, Coupé par défaut |
| Heure de nuit, de 23 h à 5 h 59 | En `#B3261E` en clair, `#F2B8B5` en sombre : « Choisis une heure entre 6 h et 22 h 59. » Bouton désactivé |
| Sans changement | Bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Hors ligne | Identique : le rappel est programmé sur le téléphone |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une carte | Change la préférence ; l'accueil et le rappel suivent |
| Autre heure | Sélecteur d'heure système, 24 h |
| Interrupteur | Change aussitôt |
| « Enregistrer » | Enregistre, retour avec le bandeau « Enregistré. » |
| Retour | Abandonne les changements non enregistrés |

## 8. Données

| Message | Règle |
| --- | --- |
| Mon rituel | Heure choisie, hors plafond ; pause après 5 jours ignorés |
| Notifications de l'app | 3 par semaine au plus, jamais la nuit |
| Découvert prévu | Toujours gratuit |
| Fin de pass | Rappel sans fausse urgence |

La préférence change seulement le rappel et l'accueil : tout reste possible, à toute heure.

## 9. Accessibilité

Interrupteur : « Découvert prévu, toujours gratuite, activé ». Choix en groupes, avec leur état.

## 10. Mouvement

Puces et cartes en 100 ms. Dépliage en 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Puces sur plusieurs rangées |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`ritual_changed`, `alert_toggled`, avec l'alerte ; `ritual_resumed`. **Aucun montant.**
