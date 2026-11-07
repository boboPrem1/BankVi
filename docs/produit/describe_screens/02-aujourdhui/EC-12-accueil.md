# EC-12 Accueil

| Fiche | |
| --- | --- |
| **Parcours** | PC-02, PC-05, PC-07, PC-09, PC-19, PC-20, PC-21 |
| **Lot** | L1 |
| **Bible** | PRV-01, PRV-02, POC-02, UX-02, UX-03, UX-05, UX-06, UX-07, UX-10, UX-11, UX-13, SAI-15, SAI-27, ONB-04, ONB-05 |
| **Avant** | Ouverture de l'app, fin d'une tâche |
| **Après** | EC-50, EC-13, EC-14, EC-17, EC-18, EC-19, EC-22, EC-23, EC-24, EC-27, EC-40 |
| **Cadre** | 360 × 800 dp, portrait, marges de 16 dp |

## 1. Rôle

Répondre sans aucun tap à la question « combien puis-je dépenser aujourd'hui ? », puis permettre de noter. C'est l'écran d'ouverture de l'app.

## 2. Ce qu'on voit

Le haut de l'écran, jusque sous la barre d'état, est un paysage : ciel en dégradé, soleil, collines calculées à partir de la prévision. En haut à gauche, un anneau blanc entoure une miniature de ce paysage, à côté de la date. Par-dessus, en blanc et en très grand : **3 200 FCFA**. Dessous, sur fond blanc : ce qui arrive, les poches, puis les saisies du jour sous forme de conversation : les dépenses partent à droite en vert, les revenus arrivent à gauche en gris. Juste au-dessus des onglets, une barre fixe porte le bouton vert « Noter une dépense », sur toute la largeur. Le soir, avant le bilan, elle porte deux boutons côte à côte : « Noter » en blanc et « Faire mon bilan » en vert. Rien ne recouvre jamais le contenu. Tout en bas, les quatre onglets.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ◉  Vendredi 6 novembre             │ ┐
│ Aujourd'hui, tu peux dépenser      │ │
│ 3 200 FCFA                 ⌄ ⌄     │ │ 280 héros
│ jusqu'au 28                        │ │
│       ☼    ▂▃▅▃▂▁▂▃▅▆▄▂            │ │
│ ▁▂▃▂▁▁▂▂▃▄▃▂▁▁▁▁▂▃▅▇▆▄             │ ┘
│ À venir                            │ 16
│ ┌──────────────┐ ┌──────────────┐  │
│ │ Électricité  │ │ Salaire      │  │ 72
│ │ le 15 −8 000 │ │ le 28 +120 000│ │
│ └──────────────┘ └──────────────┘  │
│ Mes poches                         │ 16
│ ┌──────────────┐ ┌──────────────┐  │
│ │ Espèces      │ │ Mixx         │  │ 56
│ │ 32 000 FCFA  │ │ 58 000 FCFA  │  │
│ └──────────────┘ └──────────────┘  │
│ Noté aujourd'hui         Tout voir │ 48
│        ╭ Taxi · 500 FCFA · 8 h 12 ╮│
│╭ Prêt rendu · +2 000 FCFA ╮        │
├────────────────────────────────────┤
│ (      + Noter une dépense       ) │ 64 barre d'action
├────────────────────────────────────┤
│  ◉Aujourd'hui Horizon  Pots  Plus  │ 72
└────────────────────────────────────┘
```

## 4. Structure et mesures

L'ordre est fixe et ne se personnalise pas.

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Héros plein bord, barre d'état comprise | 280 dp | 16 dp |
| Titre « À venir » | 16 dp | 8 dp |
| Deux blocs à venir | 72 dp | 16 dp |
| Titre « Mes poches » | 16 dp | 8 dp |
| Poches | 56 dp | 16 dp |
| Carte, s'il y en a une | Selon le texte | 16 dp |
| Titre « Noté aujourd'hui » et « Tout voir » | 48 dp | 8 dp |
| Bulles, 3 au plus | 32 dp chacune, écart 8 dp | 16 dp |
| Barre d'action, fixe | 64 dp | 0 |
| Barre du bas, fixe | 72 dp | — |

Le contenu défile, héros compris, et s'arrête au-dessus de la barre d'action : celle-ci ne recouvre rien. Elle reste toujours au même endroit.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond sous le héros | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Ciel | — | Dégradé vertical à deux couleurs, selon l'état | Voir la section 6 |
| Soleil | — | Cercle de 36 dp, sur un arc, selon les jours avant le revenu | `#FFBC38` |
| Collines lointaines et proches | — | Silhouettes calculées sur la courbe à 30 jours, sans contour | `rgba(255,255,255,0.12)`, `rgba(11,20,26,0.55)` |
| Oiseaux | — | 3 à 7 traits de 1,5 dp, à droite, selon la date | `rgba(255,255,255,0.70)` |
| Anneau | — | Avatar de 40 dp, trait de 2,5 dp, zone 48 dp, miniature du paysage | À voir `#FFFFFF` ; déjà vu `rgba(255,255,255,0.45)` |
| Date | Vendredi 6 novembre | Roboto 14/20 sp, Medium (500) | `#FFFFFF` |
| Amorce | Aujourd'hui, tu peux dépenser | Roboto 16/24 sp, Regular (400) | `#FFFFFF` |
| Nombre | 3 200 | Roboto 48/56 sp, Bold (700), chiffres proportionnels | `#FFFFFF` |
| Unité | FCFA | Roboto 18/24 sp, Medium (500), même ligne de base, 8 dp | `#FFFFFF` |
| Échéance | jusqu'au 28 | Roboto 16/24 sp, Regular (400) | `#FFFFFF` |
| Titres de zone | À venir, Mes poches, Noté aujourd'hui | Roboto 12/16 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bloc à venir | Électricité / le 15 / −8 000 FCFA | Rayon 12 dp, marges 12 dp ; Roboto 14/20 sp, Medium (500), Roboto 12/16 sp, Regular (400), Roboto 14/20 sp, Regular (400) tabulaire | Fond `#F0F2F5` en clair, `#111B21` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre, date `#54656F` en clair, `#AEBAC1` en sombre |
| Bloc poche | Espèces / 32 000 FCFA | Rayon 12 dp, contour 1 dp ; Roboto 12/16 sp, Regular (400), Roboto 16/24 sp, Medium (500) tabulaire | Contour `#E9EDEF` en clair, `#2A3942` en sombre, nom `#54656F` en clair, `#AEBAC1` en sombre, solde `#111B21` en clair, `#E9EDEF` en sombre |
| Tout voir | Tout voir | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Dépense | Taxi · 500 FCFA · 8 h 12 | Bulle à droite, 80 % au plus, haut droit 4 dp, autres coins 12 dp, Roboto 14/20 sp, Regular (400) | Fond `#D9FDD3` en clair, `#005C4B` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Revenu | Prêt rendu · +2 000 FCFA · 8 h 00 | Bulle à gauche, haut gauche 4 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Barre d'action | — | 64 dp, marges 8 et 16 dp, trait du haut de 1 dp | Fond `#FFFFFF` en clair, `#0B141A` en sombre, trait `#E9EDEF` en clair, `#2A3942` en sombre |
| Bouton principal | Noter une dépense, icône `add` | 48 dp de haut, pilule, toute la largeur, Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Onglet actif | Aujourd'hui, icône `today` pleine | Pastille 56 × 32 dp, Roboto 12/16 sp, Medium (500) | Pastille `#D8FDD2` en clair, `#103529` en sombre, icône `#0A3D2E` en clair, `#D9FDD3` en sombre, libellé `#111B21` en clair, `#E9EDEF` en sombre |
| Onglets inactifs | Horizon, Pots, Plus | Icônes `show_chart`, `savings`, `menu` à contour | `#54656F` en clair, `#AEBAC1` en sombre |

## 6. États

### Selon la situation d'argent

Le chiffre du début de cycle est celui du premier jour après le dernier revenu. Pour Camille : 3 200 FCFA.

| État | Condition | Ciel, du haut vers le bas | Exemple |
| --- | --- | --- | --- |
| Ça suit | 90 % ou plus du chiffre de début de cycle | `#054D43` → `#0E7A6A` | 3 200 FCFA |
| Ça se resserre | De 60 à 90 % | `#123A5C` → `#2A6A8F` | 2 400 FCFA |
| Serré | Moins de 60 % | `#33275C` → `#66478C` | 1 400 FCFA |
| Il manque | Reste à vivre négatif | `#40270F` → `#8A4B00` | Il manque / **8 500** FCFA / pour tes charges jusqu'au 28 |

Le texte reste blanc : il dépasse 5:1 sur chaque couleur du ciel. Jamais de nombre négatif seul.

### Selon l'action principale

| Situation | Barre d'action | Ouvre |
| --- | --- | --- |
| Préférence « Au fil de la journée » | Noter une dépense | EC-13 |
| Préférence « Le soir », en journée | Noter une dépense | EC-13 |
| Bilan non fait, après l'heure du rituel | **Noter** à gauche, à contour (fond de l'écran, contour `#7A8A94` en clair, `#667781` en sombre, texte `#00735E` en clair, `#25D366` en sombre) ; **Faire mon bilan** à droite, en vert, plus large ; écart de 8 dp | EC-13 ; EC-19 |
| Récurrent à confirmer aujourd'hui | Confirmer mon salaire | Confirme, avec « Annuler » |

### Autres états

| État | Affichage |
| --- | --- |
| Première utilisation sans saisie | Sous « Noté aujourd'hui » : « Rien de noté aujourd'hui, c'est normal », Roboto 14/20 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Plus de 3 saisies | Les 3 plus récentes, puis « Tout voir » |
| Trois poches ou plus | La rangée défile horizontalement, et le bloc suivant dépasse pour le signaler |
| Poche d'activité active | Son bloc porte « Activité » et reste hors du chiffre du jour |
| Aucune charge à venir | Le bloc montre seulement le prochain revenu, sur toute la largeur |
| Revenu variable | Bloc : « Fin du mois » / « au moins 90 000 FCFA attendus » |
| Rituel en pause | Carte : « Rituel en pause. Le relancer ? », avec « Relancer » en bouton texte |
| Sauvegarde reportée | Une seule fois, après une valeur : carte « Garde tes données même si tu changes de téléphone », avec « Sauvegarder » et « Plus tard » |
| Offre du pass | Une seule carte fermable, jamais pendant une tâche et jamais avant le premier horizon |
| Hors ligne | Indicateur sous les poches : icône `smartphone` de 16 dp, « Enregistré sur ce téléphone », Roboto 12/16 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Revenu réparti | Bandeau : « 120 000 FCFA répartis », avec « Annuler » pendant 10 s et « Voir mes pots » |
| Après le bilan, jusqu'à minuit | Le héros montre « Demain, tu pourras dépenser » et le chiffre de demain. Le bouton redevient « Noter une dépense » |
| Après une saisie | Chiffre recalculé aussitôt, bandeau avec « Annuler » pendant 10 s, 8 dp au-dessus de la barre d'action |

Une seule carte à la fois, et aucune au premier lancement.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher l'anneau | EC-50 |
| Toucher le chiffre | EC-24 |
| Toucher un bloc à venir | EC-23, sur cette date |
| Toucher un solde | EC-22, avec cette poche en « De » |
| « Tout voir » | EC-17 |
| « Voir mes pots » | EC-27 |
| « Relancer » | EC-40 |
| Toucher une bulle | EC-18 |
| Appui long sur une bulle | Choix de la catégorie, EC-14 |
| Boutons de la barre d'action | Selon le tableau ci-dessus |
| Onglets | Change d'onglet, sans glissement |
| Retour Android | Ferme l'app |

## 8. Données

Le calcul se fait sur le téléphone et s'affiche aussitôt, sans chargement.

| Valeur | Calcul |
| --- | --- |
| Reste à vivre | Soldes des poches perso + revenus attendus avant la date de référence − charges avant cette date − réservé dans les pots hors quotidien |
| Revenu variable encore attendu | Le plus petit de : plancher × jours restants ÷ jours du mois ; montant attendu au départ − revenus notés |
| Chiffre du jour | Reste ÷ jours restants, arrondi à la baisse à 100 FCFA |

**Exemple.** Camille : (90 000 − 18 000) ÷ 22 = 3 272, arrondi à 3 200 FCFA.

## 9. Accessibilité

Le chiffre se lit d'un bloc, comme titre : « Aujourd'hui, tu peux dépenser trois mille deux cents francs CFA jusqu'au 28. » Anneau : « Mon statut du jour, à voir ». Bulles : « Dépense : Taxi, 500 francs CFA, 8 h 12 » et « Revenu : Prêt rendu, plus 2 000 francs CFA, 8 h 00 ». Le paysage est ignoré, car ses informations sont écrites.

## 10. Mouvement

Le paysage de l'accueil est immobile. Un changement d'état passe en fondu de 300 ms. Le chiffre change sans compteur. Une nouvelle bulle apparaît en 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Héros à 240 dp, le contenu défile |
| 320 × 568 dp | Héros à 220 dp, collines plus basses ; poches l'une sous l'autre si le montant ne tient pas |
| Texte à 200 % | Le héros s'agrandit et le chiffre plafonne à 64 sp ; blocs à venir l'un sous l'autre |
| Thème sombre | Valeurs ci-dessus ; le paysage ne change pas |

## 12. Mesure

`home_viewed`, `cta_clicked` avec le libellé, `status_ring_tapped`. Durée d'ouverture, cible sous 2 s. **Aucun montant.**
