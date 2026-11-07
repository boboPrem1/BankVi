# Graphiques et montants

WhatsApp n'a pas de graphiques. Ces composants sont propres à BankVi, mais suivent la même sobriété.

## 1. Chiffre du jour

| Élément | Valeur |
| --- | --- |
| Phrase d'amorce | « Aujourd'hui, tu peux dépenser », Roboto 16/24 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Nombre | Roboto 48/56 sp, Bold (700), `#111B21` en clair, `#E9EDEF` en sombre, chiffres proportionnels |
| Unité | « FCFA », Roboto 18/24 sp, Medium (500), `#111B21` en clair, `#E9EDEF` en sombre, même ligne de base, 8 dp |
| Échéance | « jusqu'au 28 », Roboto 16/24 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Alignement | À gauche |
| Nombre par écran | Un seul |

**S'il manque de l'argent :** jamais de nombre négatif seul. La phrase devient « Il manque », puis le nombre en `#8A4B00` en clair, `#FFD27A` en sombre avec son unité, puis « pour tes charges jusqu'au 28 ». L'icône `warning` de 24 dp précède « Il manque ».

## 2. Courbe de l'horizon

**Forme :** une seule courbe en ligne, car le sujet est l'évolution d'un solde dans le temps. Une seule série, donc pas de légende : le titre la nomme.

| Élément | Valeur |
| --- | --- |
| Hauteur | 200 dp, largeur pleine moins les marges |
| Trait | 2 dp, joints et bouts ronds, `#008069` en clair, `#25D366` en sombre |
| Prévu | Pointillés de 6 dp et d'espace 4 dp |
| Réel | Trait plein |
| Lavis sous la courbe | `rgba(0,128,105,0.10)` en clair, `rgba(37,211,102,0.10)` en sombre |
| Zone sous zéro | `rgba(138,75,0,0.12)` en clair, `rgba(255,210,122,0.14)` en sombre |
| Interpolation | Linéaire par paliers quotidiens, sans lissage : un lissage ferait croire à un solde qu'on n'a pas eu |
| Axe horizontal | 3 repères : aujourd'hui, milieu, fin. Roboto 12/16 sp, Regular (400), `#667781` en clair, `#8696A0` en sombre, format « 6 nov. » |
| Axe vertical | 3 ou 4 valeurs rondes à droite, chiffres tabulaires, Roboto 12/16 sp, Regular (400), `#667781` en clair, `#8696A0` en sombre, avec nombres en entier : `50 000` |
| Grille | Horizontale seulement, 1 dp plein `#E9EDEF` en clair, `#2A3942` en sombre |
| Ligne du zéro | 1 dp plein `#7A8A94` en clair, `#667781` en sombre, visible seulement si la courbe passe sous zéro ou s'en approche |
| Point d'aujourd'hui | Rond de 8 dp `#008069` en clair, `#25D366` en sombre, anneau de 2 dp couleur du fond |

**Étiquettes directes, trois au plus :**

1. Le solde d'aujourd'hui ;
2. Le point le plus bas ;
3. Le prochain revenu.

Elles sont en Roboto 12/16 sp, Regular (400) et en `#111B21` en clair, `#E9EDEF` en sombre, jamais en couleur de courbe. Si deux se chevauchent, on garde le point le plus bas.

**Interaction :** glisser le doigt affiche une ligne verticale de 1 dp `#7A8A94` en clair, `#667781` en sombre et un point de 8 dp sur la courbe. Une info-bulle en haut du graphique, fond `#FFFFFF` en clair, `#202C33` en sombre, ombre `e2`, rayon 8 dp, affiche : « 15 nov. · 53 200 FCFA », et l'événement du jour s'il y en a un : « Électricité −8 000 FCFA ». La zone tactile fait 48 dp autour du point. En relâchant, l'info-bulle disparaît.

**Lecture sans la vue :** le graphique porte une phrase lue par TalkBack, qui donne les trois valeurs clés. La même information existe sous forme de texte à l'écran (la bulle d'explication), et en lignes dans « D'où vient ce chiffre » (EC-24).

## 3. Barre des pots

Une barre segmentée fine montre le partage d'un tout.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 8 dp |
| Bouts | Arrondis aux deux extrémités |
| Largeur des segments | Proportionnelle au pourcentage |
| Séparation | Trou de 2 dp de la couleur du fond, jamais de contour |
| Couleurs | Dans l'ordre : `#008069` en clair, `#00A884` en sombre, `#D97A00` en clair, `#C47F00` en sombre, `#7F66FF` en clair, `#8B75FF` en sombre, `#E0568A` en clair, `#E0588A` en sombre, `#027EB5` en clair, `#2E9BD6` en sombre, `#8F7A1F` en clair, `#93852A` en sombre |
| Texte dans la barre | Aucun |
| Accompagnement | Toujours la liste des pots dessous, avec une pastille de 12 dp |
| Segment à 0 % | Non dessiné |
| TalkBack | La barre entière porte un nom : « Vie courante 70 %, Épargne 20 %, Dettes ou dons 10 % » |

## 4. Ligne de pot

Pastille de 12 dp de la couleur du pot, nom en Roboto 16/24 sp, Regular (400), pourcentage en Roboto 16/24 sp, Regular (400) chiffres tabulaires, puis montant à droite. Le texte reste en `#111B21` en clair, `#E9EDEF` en sombre ou `#54656F` en clair, `#AEBAC1` en sombre, jamais dans la couleur du pot.

## 5. Formats de montant

| Cas | Exemple |
| --- | --- |
| Standard | `12 500 FCFA` |
| Dans une colonne | `12 500` sous un titre « FCFA » |
| Négatif, dans une info-bulle ou une ligne | `−8 000 FCFA`, avec le signe moins U+2212 |
| Revenu dans une ligne | `+120 000 FCFA` |
| Axe | `50 000` |

Aucune décimale, aucune abréviation « k » ni « M » dans l'app, car elles sont moins lisibles pour tous.

## 6. Repères d'horizon

Trois blocs côte à côte au-dessus de la courbe, de largeur égale, avec 8 dp d'écart. Ils lisent la courbe à une date précise, sans glisser le doigt.

| Élément | Exemple | Style |
| --- | --- | --- |
| Échéance | Dans 7 jours | Roboto 12/16 sp, Medium (500), `#54656F` en clair, `#AEBAC1` en sombre |
| Solde prévu | 67 600 | Roboto 16/24 sp, Medium (500), chiffres tabulaires, `#111B21` en clair, `#E9EDEF` en sombre |
| Unité et date | FCFA · 13 nov. | Roboto 12/16 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Bloc | — | Fond `#F0F2F5` en clair, `#111B21` en sombre, rayon 12 dp, marges 8 dp, zone tactile de 48 dp au moins |
| Bloc sélectionné | — | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Manque | Il manquerait / 4 000 / FCFA · 24 nov. | Texte `#8A4B00` en clair, `#FFD27A` en sombre, fond `#FFF3D6` en clair, `#3A2C10` en sombre, icône `warning` de 16 dp |

« FCFA » passe sous le nombre, car un bloc ne fait que 104 dp de large. Le chiffre héros reste unique : ces soldes restent en 16 sp. À 200 % de texte, les blocs s'empilent. TalkBack lit : « Dans 7 jours, le 13 novembre, 67 600 francs CFA prévus. »

## 7. Résumé du mois

Bloc en tête de l'historique, sans graphique : des lignes suffisent et restent lisibles pour tous.

| Élément | Exemple | Style |
| --- | --- | --- |
| Mois | Novembre 2026, avec flèches `chevron_left` et `chevron_right` | Roboto 18/24 sp, Medium (500), zones tactiles de 48 dp |
| Revenus | Revenus : 0 sur 120 000 FCFA attendus | Roboto 16/24 sp, Regular (400), chiffres tabulaires |
| Dépenses | Dépenses : 41 500 FCFA | Roboto 16/24 sp, Regular (400), chiffres tabulaires |
| Filtre | Tout, Revenus, Dépenses | Puces de 32 dp, une seule sélectionnée |
| Ligne de catégorie | Transport · 12 000 FCFA | Hauteur de 48 dp, nom à gauche, montant à droite, chiffres tabulaires |

Revenus et dépenses gardent la même couleur de texte. Aucun rouge, aucune mention « trop » ou « bien ».

## 8. Jauge de pot

Barre pleine de 8 dp, bouts arrondis. La part remplie est le reste ÷ la cible, dans la couleur du pot, sur un fond `#E9EDEF` en clair, `#2A3942` en sombre. Pas de seuil de couleur : la couleur identifie le pot, elle ne juge pas son état. Un pot vide s'écrit en toutes lettres, avec une icône.

