# Composants : navigation

## 1. Barre du haut

| Attribut | Valeur |
| --- | --- |
| Hauteur | 56 dp |
| Fond | `#FFFFFF` en clair, `#0B141A` en sombre, sans ombre ni trait au repos ; 1 dp `#E9EDEF` en clair, `#2A3942` en sombre dessous si le contenu défile |
| Icône retour | `arrow_back`, 24 dp, `#111B21` en clair, `#E9EDEF` en sombre, zone de 48 dp, à 4 dp du bord gauche |
| Titre | Roboto 22/28 sp, Medium (500), `#111B21` en clair, `#E9EDEF` en sombre, à gauche, une ligne avec coupure en fin |
| Actions | 2 icônes au plus, à droite |

Dans le parcours de premier lancement, la barre ne porte en général que le retour : la question fait office de titre.

## 2. Barre de navigation du bas

Présente sur les écrans principaux seulement, jamais pendant une tâche ni au premier lancement.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 64 dp, plus la barre système |
| Fond | `#FFFFFF` en clair, `#0B141A` en sombre, trait du haut 1 dp `#E9EDEF` en clair, `#2A3942` en sombre |
| Onglets | Quatre, dans cet ordre et sans jamais bouger : Aujourd'hui, Horizon, Pots, Plus |
| Icône inactive | Contour, 24 dp, `#54656F` en clair, `#AEBAC1` en sombre |
| Icône active | Pleine, `#0A3D2E` en clair, `#D9FDD3` en sombre, sur une pastille de 56 × 32 dp en `#D8FDD2` en clair, `#103529` en sombre, en pilule |
| Libellé | Roboto 12/16 sp, Medium (500) ; inactif `#54656F` en clair, `#AEBAC1` en sombre ; actif `#111B21` en clair, `#E9EDEF` en sombre |
| Changement d'onglet | Pastille en fondu, 100 ms, sans glissement d'écran |

## 3. Progression du premier lancement

Elle n'apparaît que sur les trois questions, EC-03 à EC-05 : la promesse est « trois questions ».

| Attribut | Valeur |
| --- | --- |
| Position | Sous la barre du haut, marges de 24 dp |
| Barres | 3 segments égaux, hauteur 4 dp, en pilule, écart de 4 dp |
| Segment fait ou actuel | `#25D366` (clair et sombre) |
| Segment à venir | `#E9EDEF` en clair, `#2A3942` en sombre |
| Libellé | « Question 1 sur 3 », Roboto 12/16 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre, 8 dp sous les barres |
| TalkBack | Lit uniquement « Question 1 sur 3 » |

Le vert de ces segments n'est pas une action, mais il est très fin et il informe : c'est la seule exception à la règle du vert.

## 4. Retour Android

Le geste ou le bouton retour fait la même chose que `arrow_back`. Une feuille ou un dialogue ouverts se ferment d'abord. Sur le premier écran d'une pile, l'app se ferme.
