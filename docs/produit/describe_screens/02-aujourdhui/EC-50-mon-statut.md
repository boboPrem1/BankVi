# EC-50 Mon statut

| Fiche | |
| --- | --- |
| **Parcours** | PC-21 |
| **Lot** | L1 ; le son en L2 |
| **Bible** | UX-11, UX-12, UX-13, PRV-01, PRV-03, UX-05 |
| **Avant** | EC-12, anneau |
| **Après** | EC-12 |
| **Cadre** | 360 × 800 dp, plein écran, sans barre de navigation |

## 1. Rôle

Montrer sa situation du jour comme on regarde un statut : un plaisir de quelques secondes, sans rien à remplir.

## 2. Ce qu'on voit

L'écran entier devient le paysage : le ciel en dégradé, un grand soleil orangé, des oiseaux, des collines dont la forme vient de la courbe à 30 jours. En haut, quatre traits fins indiquent les faits, comme dans un statut, le trait en cours se remplit. Dessous, à droite, trois icônes blanches : pause, son, fermer. Dans le ciel, en blanc : **3 200 FCFA**, puis une phrase : « Ça suit ton rythme. »

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ━━━━━━━ ─────── ─────── ───────    │  2 segments
│                       ⏸   🔇   ✕   │ 48 outils
│                                    │
│ Aujourd'hui, tu peux dépenser      │ 24
│ 3 200 FCFA                         │ 56
│ jusqu'au 28                        │ 24
│                                    │
│ Ça suit ton rythme.                │ 24
│                                    │
│                         ⌄   ⌄ ⌄    │
│     ◯ soleil                       │
│              ╱╲                    │
│ ▁▂▃▂▁▁▂▂▃▄▃▂╱  ╲▁▁▂▃▅▇▆▄▂          │ collines
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     │
│ Toucher pour avancer · appui long… │ 16
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Élément | Position | Dimensions |
| --- | --- | --- |
| Segments | Haut 12 dp, côtés 12 dp, sous la barre d'état | 2 dp de haut, écart 4 dp |
| Outils | Haut 20 dp, droite 8 dp | 3 × 48 dp |
| Texte du fait | Haut 104 dp, côtés 24 dp | Reste au-dessus de 400 dp de haut |
| Soleil | Sur un arc de gauche à droite ; centre vers 450 dp | Cercle de 64 dp |
| Collines lointaines | Sommets de 462 à 610 dp | Jusqu'au bas |
| Collines proches | Sommets de 540 à 690 dp | Jusqu'au bas |
| Aide | Bas 24 dp | 16 dp |

## 5. Éléments

Identiques en thème clair et sombre.

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Segment | — | Pilule | À venir `rgba(255,255,255,0.40)` ; rempli `#FFFFFF` |
| Icônes | `pause` ou `play_arrow`, `volume_off` ou `volume_up`, `close` | 24 dp | `#FFFFFF` |
| Amorce | Selon le fait | Roboto 16/24 sp, Regular (400) | `#FFFFFF` |
| Nombre | 3 200 | Roboto 48/56 sp, Bold (700) | `#FFFFFF` |
| Unité | FCFA | Roboto 18/24 sp, Medium (500), ligne de base du nombre | `#FFFFFF` |
| Détail | jusqu'au 28 | Roboto 16/24 sp, Regular (400) | `#FFFFFF` |
| Phrase d'état | Ça suit ton rythme. | Roboto 18/24 sp, Medium (500), 16 dp au-dessus | `#FFFFFF` |
| Soleil | — | Plat, sans halo | `#FFBC38` |
| Collines lointaines | — | Silhouette | `rgba(255,255,255,0.12)` |
| Collines proches | — | Silhouette | `rgba(11,20,26,0.55)` |
| Oiseaux | — | 3 à 7, traits de 1,5 dp, à droite | `rgba(255,255,255,0.70)` |
| Aide | Toucher pour avancer · appui long pour mettre en pause | Roboto 12/16 sp, Regular (400) | `#FFFFFF` |

## 6. Les faits

Chaque fait reste 5 secondes. Le statut en compte 4 au plus, soit 20 secondes.

| Fait | Condition | Amorce | Nombre | Détail |
| --- | --- | --- | --- | --- |
| 1. Aujourd'hui | Toujours | Aujourd'hui, tu peux dépenser | 3 200 FCFA | jusqu'au 28, puis la phrase d'état |
| 2. À venir | Toujours | Dans 7 jours | 67 600 FCFA | Prochaine charge : Électricité, le 15 |
| 3. Hier | S'il y a une saisie hier | Hier | 2 500 FCFA | 3 dépenses notées |
| 4. Mes pots | Si une recette est active et a déjà reçu un revenu | Vie courante | 24 000 FCFA restants, exemple du 6 décembre | jusqu'au 28 |

Un fait dont la condition manque est retiré, et le nombre de segments suit.

## 7. États

| État | Ciel | Phrase | Contraste du blanc |
| --- | --- | --- | --- |
| Ça suit, 90 % ou plus du chiffre de début de cycle | `#054D43` → `#0E7A6A` | Ça suit ton rythme. | 9,77:1 et 5,24:1 |
| Ça se resserre, de 60 à 90 % | `#123A5C` → `#2A6A8F` | Ça se resserre un peu. | 11,76:1 et 5,90:1 |
| Serré, moins de 60 % | `#33275C` → `#66478C` | C'est serré jusqu'au 28. | 13,24:1 et 7,38:1 |
| Il manque, reste à vivre négatif | `#40270F` → `#8A4B00` | Fait 1 : Il manque / 8 500 FCFA / pour tes charges jusqu'au 28 | 13,86:1 et 6,80:1 |

Aucun orage, aucun rouge. Le même jour et les mêmes chiffres donnent la même image.

| Autre état | Comportement |
| --- | --- |
| Hors ligne | Identique : tout se calcule sur le téléphone |
| Après une saisie | Le paysage suit à la prochaine ouverture |
| Son activé (L2) | Boucle douce de 20 s selon l'état, sans voix ni montant ; coupé par défaut ; mode silencieux respecté |

Jamais d'ouverture automatique, d'offre, de bouton d'action ni de partage : le statut contient des montants.

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher les deux tiers droits | Fait suivant ; après le dernier, retour à l'accueil |
| Toucher le tiers gauche | Fait précédent |
| Appui long | Pause tant que le doigt reste posé |
| Bouton pause | Pause et reprise, pour ceux qui ne peuvent pas maintenir l'appui |
| Glisser vers le bas, `close` ou retour | Retour à l'accueil |
| Fin | L'anneau passe à « déjà vu » jusqu'au prochain nouveau statut |

Un nouveau statut apparaît à la première ouverture de chaque jour, et après un bilan.

## 9. Données

Calculé sur le téléphone en moins de 300 ms, sans réseau, sans IA, sans donnée envoyée.

| Élément | Vient de |
| --- | --- |
| Collines | Courbe à 30 jours, normalisée, échantillonnée tous les 3 jours et lissée. La lointaine est décalée de 7 jours |
| Soleil | Jours écoulés ÷ jours du cycle : 9 ÷ 31 pour Camille |
| Ciel | Chiffre du jour ÷ chiffre de début de cycle |
| Oiseaux | La date, qui sert de graine |

## 10. Accessibilité

Avec TalkBack, aucune avance automatique : chaque fait est lu, et on passe au suivant d'un geste. Image : « Paysage du jour : ça suit ton rythme ». Boutons : « Fait suivant », « Fait précédent », « Mettre en pause », « Activer le son », « Fermer le statut ». Le focus revient sur l'anneau à la fermeture.

## 11. Mouvement

Le soleil et les collines lointaines dérivent de 2 dp au plus sur 5 s, sans aller plus vite. Les changements de fait sont immédiats. Avec les animations réduites ou sur un appareil lent, le paysage reste immobile. Ouverture et fermeture en fondu de 300 ms.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le paysage est cadré par le bas ; le texte reste en haut |
| 320 × 568 dp | Marges de 16 dp ; le soleil passe à 48 dp |
| Texte à 200 % | Chiffre plafonné à 64 sp ; un voile `rgba(11,20,26,0.40)` garantit la lecture si le texte touche les collines |

## 13. Mesure

`status_viewed`, avec l'état et le nombre de faits vus ; `status_sound_on`. **Aucun montant.** À comparer : retour le lendemain et saisie du réel, entre ceux qui l'ouvrent et les autres.
