# EC-23 Mon horizon

| Fiche | |
| --- | --- |
| **Parcours** | PC-11, PC-12, PC-13, PC-15 |
| **Lot** | L1 |
| **Bible** | PRV-03, PRV-04, PRV-05, PRV-06, PRV-15, MSG-03, ONB-05 |
| **Avant** | Onglet Horizon, EC-12, notification de découvert |
| **Après** | EC-24, EC-25, EC-26, EC-41 |
| **Cadre** | 360 × 800 dp, portrait, marges de 16 dp |

## 1. Rôle

Répondre à « où en serai-je dans quelques jours, une semaine, un mois ? » d'un seul regard. C'est le cœur du produit.

## 2. Ce qu'on voit

En haut, un choix : 30 jours ou 90 jours. Trois blocs gris pâle donnent la réponse directe : dans 3 jours, dans 7 jours, dans 30 jours, avec le solde prévu et la date. Dessous, la courbe : elle descend en petites marches, saute au salaire, et reste en pointillés car c'est du prévu. Une ligne écrit ce qu'elle suppose. Puis la liste de ce qui arrive : les charges et les revenus. Au-dessus des onglets, le bouton vert « Puis-je me permettre ça ? », à côté de « Événement » ; une fois les essais offerts utilisés sans pass, c'est « Événement » qui passe en vert.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ Mon horizon                        │ 56
│ ( ✓ 30 jours  |   90 jours  )      │ 40
│ ┌────────┐ ┌────────┐ ┌────────┐   │
│ │Dans 3 j│ │Dans 7 j│ │Dans 30 j│  │
│ │ 80 400 │ │ 67 600 │ │ 50 400 │   │ 80
│ │FCFA · 9│ │FCFA ·13│ │FCFA · 6│   │
│ └────────┘ └────────┘ └────────┘   │
│ Ton argent prévu                   │ 24
│ 100 000 ─────────────────╴╴─────   │
│ ●╴╴╴                    ┆  ╴╴╴     │
│ 50 000 ──╴╴╴─────────────┆─────╴╴  │ 200
│             ╴╴╴╴·╴╴╴╴·╴╴╴┆         │
│ 0 ───────────────── 4 800 ──────── │
│ 6 nov.       21 nov.       6 déc.  │
│ Si tu dépenses ton chiffre chaque  │ 32
│ jour. Le prévu n'est pas certain.  │
│ À venir                            │ 16
│ ϟ Électricité · le 15     −8 000   │ 56
├────────────────────────────────────┤
│ ( + Événement ) ( Puis-je… ça ? )  │ 64
├────────────────────────────────────┤
│  Aujourd'hui ◉Horizon  Pots  Plus  │ 72
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut, titre seul | 56 dp | 0 |
| Choix 30 ou 90 jours | 40 dp | 12 dp |
| Trois repères, largeur égale, écart 8 dp | 80 dp | 16 dp |
| Bandeau de manque, s'il y en a un | Selon le texte | 12 dp |
| Titre du graphique | 24 dp | 8 dp |
| Courbe | 200 dp | 8 dp |
| Hypothèse | 32 dp | 16 dp |
| Titre « À venir » | 16 dp | 8 dp |
| Lignes d'événement | 56 dp chacune | 12 dp en bas |
| Barre d'action, fixe | 64 dp | 0 |
| Barre du bas, fixe | 72 dp | — |

Tout défile entre la barre du haut et la barre d'action.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Mon horizon | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Choix | 30 jours, 90 jours | 40 dp, pilule, Roboto 14/20 sp, Medium (500) | Choisi : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre. Repos : contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Échéance du repère | Dans 7 jours | Roboto 12/16 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Solde du repère | 67 600 | Roboto 16/24 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Unité et date | FCFA · 13 nov. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bloc repère | — | Rayon 12 dp, marges 8 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre |
| Bloc choisi | — | Curseur placé sur la courbe | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Titre du graphique | Ton argent prévu | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Courbe, prévu | — | 2 dp, pointillés 6 et 4 dp, bouts ronds | `#008069` en clair, `#25D366` en sombre |
| Courbe, réel | — | 2 dp plein, pour les 7 derniers jours s'ils existent | `#008069` en clair, `#25D366` en sombre |
| Lavis | — | Sous la courbe | `rgba(0,128,105,0.10)` en clair, `rgba(37,211,102,0.10)` en sombre |
| Grille | — | Horizontale, 1 dp plein | `#E9EDEF` en clair, `#2A3942` en sombre |
| Ligne du zéro | — | 1 dp plein | `#7A8A94` en clair, `#667781` en sombre |
| Point d'aujourd'hui | — | 8 dp, anneau de 2 dp couleur du fond | `#008069` en clair, `#25D366` en sombre |
| Point d'événement | — | 8 dp, anneau de 2 dp couleur du fond, zone tactile de 48 dp | `#008069` en clair, `#25D366` en sombre |
| Axes | 0, 50 000, 100 000 ; 6 nov., 21 nov., 6 déc. | Roboto 12/16 sp, Regular (400), tabulaire | `#667781` en clair, `#8696A0` en sombre |
| Étiquettes directes, 3 au plus | 90 000 ; 4 800 ; +120 000 | Roboto 12/16 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Hypothèse | Si tu dépenses ton chiffre chaque jour. Le prévu n'est pas certain. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Titre de liste | À venir | Roboto 12/16 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Avatar d'événement | Icône de la catégorie | 40 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre, icône `#54656F` en clair, `#AEBAC1` en sombre |
| Nom | Électricité | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Date | le 15 | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Montant | −8 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire, à droite ; `+` pour une entrée | `#111B21` en clair, `#E9EDEF` en sombre |
| Barre d'action | — | 64 dp | Fond `#FFFFFF` en clair, `#0B141A` en sombre, trait `#E9EDEF` en clair, `#2A3942` en sombre |
| Bouton à contour | Événement, icône `add` | 48 dp, pilule, 40 % | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Puis-je me permettre ça ? | 48 dp, pilule, 60 %, Roboto 14/20 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Onglet actif | Horizon, icône `show_chart` | Pastille 56 × 32 dp | Pastille `#D8FDD2` en clair, `#103529` en sombre, icône `#0A3D2E` en clair, `#D9FDD3` en sombre |

**Liste de Camille :** Électricité −8 000, le 15 ; Tontine −10 000, le 20 ; Salaire +120 000, le 28 ; École −25 000, le 3 décembre ; Loyer −35 000, le 5 décembre.

## 6. États

| État | Affichage |
| --- | --- |
| 30 jours | Axe du 6 nov. au 6 déc. ; domaine de 0 à 125 000 |
| 90 jours, avec pass | Axe du 6 nov. au 4 févr., repères : 6 nov., 21 déc., 4 févr. Point bas : 1 600 FCFA, le 27 janv. Les trois repères ne changent pas |
| 90 jours, sans pass | Le segment reste visible et porte « Pass Plus » en Roboto 12/16 sp, Regular (400). Le toucher ouvre EC-41. La courbe reste sur 30 jours |
| Argent qui manque | Bandeau d'attention, voir plus bas |
| Avec du réel | Les 7 derniers jours en trait plein, à gauche d'aujourd'hui |
| Revenu variable | Courbe sans saut ; hypothèse : « Si tu dépenses ton chiffre chaque jour, et si tu gagnes au moins 90 000 FCFA par mois. Le prévu n'est pas certain. » |
| Depuis la notification de découvert | L'écran s'ouvre avec le curseur sur la date concernée |
| Aucun événement | Sous « À venir » : « Ajoute une charge ou un revenu pour affiner ta courbe. » |
| Hors ligne | Identique : tout est calculé sur le téléphone. L'alerte de découvert reste gratuite |

### Barre d'action selon le pass

| Situation | Bouton vert, 60 % | Bouton à contour, 40 % |
| --- | --- | --- |
| Avec le pass | Puis-je me permettre ça ? | Événement |
| Sans pass, essais restants | Puis-je me permettre ça ?, avec « 3 essais offerts » dessous en Roboto 12/16 sp | Événement |
| Sans pass, essais utilisés | Événement, 40 % | Puis-je me permettre ça ?, avec « Pass Plus » dessous, 60 % |

Un seul bouton reste vert, et chaque bouton vert fait une action réelle.

### Argent qui manque

Exemple : 9 500 FCFA aujourd'hui, 18 000 FCFA de charges d'ici le 28.

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Bandeau | Il pourrait manquer 8 500 FCFA le 20. | Rayon 8 dp, marges 12 dp, icône `warning` de 20 dp, Roboto 14/20 sp, Regular (400) | Fond `#FFF3D6` en clair, `#3A2C10` en sombre, texte `#8A4B00` en clair, `#FFD27A` en sombre |
| Repère négatif, si un repère passe sous zéro | Il manquerait / 4 000 / FCFA · 24 nov. | Même bloc, Roboto 16/24 sp, Medium (500) | Fond `#FFF3D6` en clair, `#3A2C10` en sombre, texte `#8A4B00` en clair, `#FFD27A` en sombre |
| Courbe sous zéro | — | Zone sous la ligne du zéro, étiquette « −8 500 » | Zone `rgba(138,75,0,0.12)` en clair, `rgba(255,210,122,0.14)` en sombre, trait `#008069` en clair, `#25D366` en sombre |
| Hypothèse | Sans autre dépense. Le prévu n'est pas certain. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |

Jamais de rouge, jamais de nombre négatif seul dans un repère, jamais de conseil.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher un repère | Le curseur se place sur cette date, avec l'info-bulle |
| Toucher de nouveau | Enlève le curseur |
| Appui long sur un repère | EC-24, pour ce solde |
| Glisser sur la courbe | Ligne verticale de 1 dp `#7A8A94` en clair, `#667781` en sombre, point de 8 dp, info-bulle : « 15 nov. · 53 200 FCFA », puis « Électricité −8 000 FCFA » |
| Toucher l'info-bulle | EC-24, pour ce solde |
| Toucher une ligne d'événement | Ponctuel : EC-26. Récurrent : EC-39 |
| « Puis-je me permettre ça ? » | Avec le pass ou un essai restant : EC-25. Sinon : la description d'EC-25, qui renvoie à EC-41 |
| « Événement » | EC-26 |
| Onglets | Change d'onglet |
| Retour | EC-12 |

## 8. Données

| Valeur | Règle |
| --- | --- |
| Point de la courbe | Solde du matin, après les événements du jour |
| Dépense supposée | Chaque jour, le chiffre du jour ; à la date de référence, un nouveau rythme pour le cycle suivant |
| Repère | Le point de la courbe à J+3, J+7, J+30. Toujours gratuit |
| Recalcul | Après chaque saisie ou comptage, sans action de l'utilisateur |

**Points de Camille sur 30 jours :** 90 000 le 6 nov. ; 80 400 le 9 ; 67 600 le 13 ; 53 200 le 15 ; 27 200 le 20 ; 4 800 le 27 ; 121 600 le 28 ; 89 600 le 3 déc. ; 51 800 le 5 ; 50 400 le 6.

## 9. Accessibilité

Repères : « Dans 7 jours, le 13 novembre, 67 600 francs CFA prévus. » Graphique : « Ton argent prévu sur 30 jours. 90 000 francs aujourd'hui, 4 800 au plus bas le 27 novembre, 121 600 après ton salaire du 28, 50 400 le 6 décembre. » Le glissement a son équivalent dans les repères et la liste. Le prévu n'est pas porté par les seuls pointillés : le titre et l'hypothèse le disent.

## 10. Mouvement

La courbe se trace une fois, en 300 ms, à la première ouverture du jour. Le passage de 30 à 90 jours se fait en fondu de 200 ms. Le chiffre ne défile jamais.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Courbe à 150 dp ; la liste passe sous le pli |
| 320 × 568 dp | Courbe à 130 dp ; marges de 16 dp ; repères à 96 dp |
| Texte à 200 % | Repères empilés, en lignes ; boutons de la barre d'action empilés |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`horizon_viewed`, avec la durée choisie ; `horizon_marker_tapped`, avec le repère ; `horizon_scrubbed`. C'est l'étoile polaire : actifs qui consultent leur prévision chaque semaine. **Aucun montant.**
