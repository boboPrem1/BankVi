# Formes et élévations

## 1. Rayons

| Valeur | Usage |
| --- | --- |
| 4 dp | Coin aplati d'une bulle, petite marque, segment de barre |
| 8 dp | Case de code, pastille de la barre du bas (coins intérieurs) |
| 12 dp | Bulle, carte de choix, carte |
| 16 dp | Réservé, sans usage en P1 |
| 28 dp | Coins supérieurs d'une feuille basse, dialogue |
| Pilule (9999) | Bouton principal, bouton secondaire, puce, onglet actif, avatar |

Une bulle a un seul coin aplati : en haut à gauche pour l'app et les revenus, en haut à droite pour les dépenses et les réponses de l'utilisateur. Elle n'a pas de queue.

## 2. Élévations

WhatsApp reste très plat : l'ombre n'apparaît que lorsqu'un élément flotte vraiment.

| Niveau | Ombre (x y flou couleur, en dp) | Élévation Android | Usage |
| --- | --- | --- | --- |
| `e0` | Aucune | 0 | Écran, ligne, barre du haut |
| `e1` | 0 1 0.5 `rgba(11,20,26,0.13)` | 1 | Bulle, carte en clair |
| `e2` | 0 2 5 `rgba(11,20,26,0.16)` | 3 | Bandeau Annuler, info-bulle |
| `e3` | 0 12 32 `rgba(11,20,26,0.20)` | 8 | Feuille basse, dialogue |

**En sombre :** les ombres se voient peu. L'élévation s'exprime par la surface : `#FFFFFF` en clair, `#0B141A` en sombre pour le fond, `#F0F2F5` en clair, `#111B21` en sombre pour un groupe, `#FFFFFF` en clair, `#202C33` en sombre pour ce qui flotte.

## 3. Séparateurs

- Trait de 1 dp en `#E9EDEF` en clair, `#2A3942` en sombre.
- Dans une liste avec avatar, il commence à l'aplomb du texte, pas au bord de l'écran.
- Aucun trait entre deux blocs déjà séparés par un espace de 24 dp.
- Pas de bordure autour d'un écran, d'une image ou d'une barre du haut.
