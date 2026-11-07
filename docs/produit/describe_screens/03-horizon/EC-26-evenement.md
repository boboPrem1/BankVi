# EC-26 Événement à venir

| Fiche | |
| --- | --- |
| **Parcours** | PC-11 |
| **Lot** | L1 |
| **Bible** | PRV-05, SAI-07 |
| **Avant** | EC-23 |
| **Après** | EC-23 ; EC-15 pour la date ; EC-13 pour une date passée |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp |

## 1. Rôle

Faire entrer dans la prévision ce que l'app ne peut pas deviner : une tontine, des frais d'école, un mariage, un client qui doit payer.

## 2. Ce qu'on voit

Un choix en haut : Sortie ou Entrée. Des puces proposent des événements courants. Puis trois champs simples : le nom, le montant, la date. Une rangée indique le rythme : Une fois, Chaque semaine, Toutes les 2 semaines, Chaque mois. Le bouton vert : « Ajouter à mon horizon ». Une phrase montre l'effet avant de valider : « Ton chiffre passerait à 2 300 FCFA par jour. »

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Événement à venir               │ 56
│ ( ✓ Sortie  |    Entrée  )         │ 40
│ (Tontine) (Frais d'école) (Mariage)│ 32
│ (Fête) (Santé)                     │ 32
│ Nom                                │
│ Mariage                            │ 56
│ ─────────────────────────────────  │
│ Montant                            │
│ 20 000                        FCFA │ 72
│ ─────────────────────────────────  │
│ Date                               │
│ ▦ Samedi 14 novembre             › │ 56
│ (✓Une fois) (Chaque semaine) (Toutes l│ 48
│ Ton chiffre passerait à            │
│ 2 300 FCFA par jour.               │ 40
│ ╭────────────────────────────────╮ │
│ │     Ajouter à mon horizon      │ │ 48
│ ╰────────────────────────────────╯ │
│         ◁      ○      ▢            │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Choix Sortie ou Entrée | 40 dp | 12 dp |
| Puces | 32 dp par rangée, écart 8 dp | 16 dp |
| Nom | 56 dp | 12 dp |
| Montant | 72 dp | 12 dp |
| Date | 56 dp | 8 dp |
| Rythme | 48 dp, rangée qui défile | 12 dp |
| Effet | 40 dp | 12 dp |
| Pied | 76 dp | — |

Le contenu défile derrière le pied. Le clavier s'ouvre seulement sur un champ touché.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Événement à venir | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Choix | Sortie, Entrée | 40 dp, pilule, Roboto 14/20 sp, Medium (500) | Choisi : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Puces, en Sortie | Tontine, Frais d'école, Mariage, Fête, Santé | 32 dp, Roboto 14/20 sp, Medium (500) | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Puces, en Entrée | Salaire, Vente, Prêt rendu, Tontine reçue | Identique | Identique |
| Libellés | Nom, Montant, Date | Roboto 14/20 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Nom | Mariage | Roboto 16/24 sp, Regular (400), 30 caractères | `#111B21` en clair, `#E9EDEF` en sombre |
| Montant | 20 000 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre ; placeholder « 0 » `#667781` en clair, `#8696A0` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Soulignement | — | Repos 1 dp ; actif 2 dp | `#7A8A94` en clair, `#667781` en sombre ; `#008069` en clair, `#25D366` en sombre |
| Date | Samedi 14 novembre, icône `calendar_month` | Roboto 16/24 sp, Regular (400), chevron | `#111B21` en clair, `#E9EDEF` en sombre |
| Rythme | Une fois, Chaque semaine, Toutes les 2 semaines, Chaque mois | Puces, une seule choisie | Choisie : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Effet | Ton chiffre passerait à 2 300 FCFA par jour. | Roboto 16/24 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Ajouter à mon horizon | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Arrivée | Sortie, Une fois, pas de date. Bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Complet | Nom, montant de 1 ou plus, date : bouton actif et effet affiché |
| Après la date de référence | Effet : « Ton chiffre ne change pas avant le 28. Ta courbe en tient compte. » |
| Il manquerait de l'argent | Effet, avec `warning`, en `#8A4B00` en clair, `#FFD27A` en sombre : « Il pourrait manquer 8 000 FCFA le 14. » Sans blocage |
| Date passée | Sous le champ, en `#B3261E` en clair, `#F2B8B5` en sombre : « Cette date est passée. » avec le bouton texte « Noter une saisie », qui ouvre EC-13 |
| Récurrent | L'événement apparaît aussi dans Revenus et charges, EC-39 |
| Modification | Titre : Modifier l'événement. Bouton : « Enregistrer ». En plus, « Supprimer » en `#B3261E` en clair, `#F2B8B5` en sombre, immédiat, avec « Annuler » pendant 10 s |
| Libellé sensible | Santé, ou un nom sensible : EC-48 s'ouvre à la première utilisation |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une puce | Remplit le nom et ouvre le montant |
| Toucher Date | EC-15 |
| Sortie, Entrée | Change le signe et les puces, sans perdre les valeurs |
| « Ajouter à mon horizon » | Retour à EC-23, courbe à jour, bandeau « Événement ajouté. » avec « Annuler » pendant 10 s |
| Retour | EC-23, sans rien enregistrer ; aucune question |

## 8. Données

Un événement crée une ligne prévue, jamais du réel. Quand sa date arrive, l'accueil demande de le confirmer ; en cas de confirmation, il devient une saisie.

| Rythme | Effet sur la courbe |
| --- | --- |
| Une fois | Un point à sa date |
| Chaque semaine, toutes les 2 semaines, chaque mois | Un point à chaque occurrence, sur l'horizon affiché |

**Exemple.** Camille, Mariage, 20 000 FCFA, le 14 novembre : (90 000 − 18 000 − 20 000) ÷ 22 = 2 363, arrondi à 2 300 FCFA par jour.

## 9. Accessibilité

Chaque champ a son libellé. L'effet est annoncé dès qu'il change. Date : « Date, samedi 14 novembre, modifier ». Le choix Sortie ou Entrée annonce son état.

## 10. Mouvement

Entrée d'écran standard. L'effet apparaît en fondu de 200 ms. Au retour, le nouveau point apparaît sur la courbe en 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Valeur à 30 sp, marges de 16 dp |
| Texte à 200 % | Rythme sur plusieurs rangées ; le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`event_added`, avec le sens, le rythme et le type de puce ; `event_deleted`. **Aucun montant ni nom libre.**
