# Composants : navigation

## 1. Barre du haut

| Attribut | Valeur |
| --- | --- |
| Hauteur | 56 dp |
| Fond | `#FAF7F2` en clair, `#0D1520` en sombre, sans ombre ni trait au repos ; 1 dp `#E3DCD2` en clair, `#26384F` en sombre dessous si le contenu défile |
| Icône retour | `arrow_back`, 24 dp, `#1C1613` en clair, `#F5F0EB` en sombre, zone de 48 dp, à 4 dp du bord gauche |
| Titre | Roboto 22/28 sp, Medium (500), `#1C1613` en clair, `#F5F0EB` en sombre, à gauche, une ligne avec coupure en fin |
| Actions | 2 icônes au plus, à droite |

Dans le parcours de premier lancement, la barre ne porte en général que le retour : la question fait office de titre.

## 2. Barre de navigation du bas

Présente sur les écrans principaux seulement, jamais pendant une tâche ni au premier lancement.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 64 dp, plus la barre système |
| Fond | `#FAF7F2` en clair, `#0D1520` en sombre, trait du haut 1 dp `#E3DCD2` en clair, `#26384F` en sombre |
| Onglets | Quatre, dans cet ordre et sans jamais bouger : Aujourd'hui, Horizon, Pots, Plus |
| Icône inactive | Contour, 24 dp, `#5C514B` en clair, `#B8AFA8` en sombre |
| Icône active | Pleine, `#5E1D0E` en clair, `#FDE5DA` en sombre, sur une pastille de 56 × 32 dp en `#F9DFD3` en clair, `#4D2318` en sombre, en pilule |
| Libellé | Roboto 12/16 sp, Medium (500) ; inactif `#5C514B` en clair, `#B8AFA8` en sombre ; actif `#1C1613` en clair, `#F5F0EB` en sombre |
| Changement d'onglet | Pastille en fondu, 100 ms, sans glissement d'écran |

## 3. Progression du premier lancement

Elle n'apparaît que sur les trois questions, EC-03 à EC-05 : la promesse est « trois questions ».

| Attribut | Valeur |
| --- | --- |
| Position | Sous la barre du haut, marges de 24 dp |
| Barres | 3 segments égaux, hauteur 4 dp, en pilule, écart de 4 dp |
| Segment fait ou actuel | `#B83B20` en clair, `#F07B5A` en sombre |
| Segment à venir | `#E3DCD2` en clair, `#26384F` en sombre |
| Libellé | « Question 1 sur 3 », Roboto 12/16 sp, Regular (400), `#5C514B` en clair, `#B8AFA8` en sombre, 8 dp sous les barres |
| TalkBack | Lit uniquement « Question 1 sur 3 » |

La couleur terracotta de ces segments n'est pas une action, mais le trait est très fin et il informe : c'est la seule exception à la règle du bouton principal unique.

## 4. Retour Android

Le geste ou le bouton retour fait la même chose que `arrow_back`. Une feuille ou un dialogue ouverts se ferment d'abord. Sur le premier écran d'une pile, l'app se ferme.
