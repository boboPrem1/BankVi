# EC-13 Ajout rapide

| Fiche | |
| --- | --- |
| **Parcours** | PC-02, PC-03, PC-04, PC-06, PC-09 |
| **Lot** | L1 |
| **Bible** | SAI-01, SAI-02, SAI-03, SAI-07, SAI-14, HAB-01, HAB-02, HAB-03, HAB-04, HAB-08, UX-01, SAI-28 |
| **Avant** | EC-12, EC-20, EC-17 |
| **Après** | EC-12 ou EC-19 ; EC-14, EC-15, EC-16 |
| **Cadre** | 360 × 800 dp, portrait, marges de 16 dp, clavier ouvert, sans barre du bas |

## 1. Rôle

Noter en quelques secondes. Budget : **2 taps avec une suggestion**, ou le montant et 3 taps au plus sans suggestion. Seul le montant est obligatoire.

## 2. Ce qu'on voit

Un écran dépouillé, avec le clavier numérique déjà ouvert sur la moitié basse. En haut, le choix Dépense ou Revenu. Au centre, le montant en grands chiffres. Dessous, trois suggestions du moment, en puces : « Taxi · 500 ». Puis deux puces déduites, la catégorie et la poche, et une rangée de dates où « Aujourd'hui » est déjà choisi. Juste au-dessus du clavier, le bouton vert « Enregistrer ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ✕  Noter                           │ 56
│ ( ✓ Dépense  |    Revenu  )        │ 40
│ Montant                            │
│ 500|                          FCFA │ 72
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ (Taxi · 500) (Déjeuner · 1 000) (… │ 48 suggestions
│ (⚡ Transport ▾) (▣ Espèces ▾)     │ 48 déduites
│ (✓Aujourd'hui)(Hier)(Avant-hier)(… │ 48 dates
│ Ajouter une autre  ╭──────────────╮│
│                    │ Enregistrer  ││ 76
│                    ╰──────────────╯│
├────────────────────────────────────┤
│   1      2      3                  │
│   4      5      6                  │ ≈270 clavier
│   7      8      9                  │
│          0      ⌫                  │
└────────────────────────────────────┘
```

## 4. Structure et mesures

Dans le cadre de référence, 458 dp restent au-dessus du clavier.

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 0 |
| Choix Dépense ou Revenu | 40 dp | 12 dp |
| Champ montant | 72 dp | 8 dp |
| Suggestions, **zone de hauteur fixe** | 48 dp | 0 |
| Catégorie et poche | 48 dp | 0 |
| Dates, rangée qui défile | 48 dp | 4 dp |
| Description, sous le pied, atteinte en défilant | 56 dp | — |
| Pied | 76 dp | — |

La zone des suggestions garde sa hauteur même vide : rien ne bouge d'une saisie à l'autre.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Fermer | `close` | 24 dp, zone 48 dp | `#111B21` en clair, `#E9EDEF` en sombre |
| Titre | Noter | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Choix | Dépense, Revenu | 40 dp, pilule, Roboto 14/20 sp, Medium (500) | Choisi : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre. Repos : contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Libellé | Montant | Roboto 14/20 sp, Medium (500) | `#008069` en clair, `#25D366` en sombre si actif |
| Valeur | 500 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre ; placeholder « 0 » `#667781` en clair, `#8696A0` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Soulignement | — | Actif 2 dp | `#008069` en clair, `#25D366` en sombre |
| Suggestion | Taxi · 500 | Puce de 32 dp, Roboto 14/20 sp, Medium (500) | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Suggestion présélectionnée | Taxi · 500 | Icône `check` | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Puce catégorie | Transport, icône selon la catégorie | Puce, chevron bas | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Puce poche | Espèces, icône `payments` | Puce, chevron bas | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Dates | Aujourd'hui, Hier, Avant-hier, Autre date, Plusieurs dates | Puces, écart 8 dp | Choisie : fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre |
| Description | Libellé : Description (facultatif) | 56 dp | `#111B21` en clair, `#E9EDEF` en sombre ; libellé `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton texte | Ajouter une autre | Roboto 14/20 sp, Medium (500), à gauche du bouton principal | `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Enregistrer | Roboto 16/24 sp, Medium (500), prend le reste de la largeur | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| La saisie ressemble à une ligne prévue, même catégorie, à 7 jours près | Après « Noter », une bulle : « C'est ton loyer du 5 ? » Oui : la saisie confirme cette ligne. Non : elle reste une saisie à part. Sans réponse, la saisie reste à part et l'accueil continue de demander |
| Arrivée | Dépense, Aujourd'hui, clavier ouvert, bouton **désactivé** (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre), sauf si une suggestion est présélectionnée |
| Mode Revenu | Suggestions et catégories de revenus. Après l'enregistrement, la bulle arrive à gauche |
| Confiance de moins de 0,5 | Aucune suggestion affichée |
| Confiance de 0,5 à 0,7 | Proposée, non présélectionnée |
| Confiance de 0,7 à 0,95 | Présélectionnée, un tap pour valider |
| Confiance de 0,95 et plus | Catégorie seule déduite ; **jamais un montant** |
| Sans habitudes | Dans la zone fixe : « Tes habitudes apparaîtront ici. », Roboto 12/16 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Date future | Bandeau d'information au-dessus du pied : « Prévu, pas encore du réel » ; bouton « Enregistrer comme prévu » |
| Date antérieure au dernier comptage | Bandeau : « Ton solde compté ne change pas. Cette saisie détaille l'écart de cette période. » |
| Mode « Ajouter une autre » | Après l'enregistrement, le formulaire se rouvre avec la même date. Au-dessus du pied : « 3 dépenses notées · 2 500 FCFA ». `close` devient « Terminer » |
| Libellé sensible | Au premier choix, EC-48 s'ouvre |
| Hors ligne | Identique : l'enregistrement est immédiat |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une suggestion | Remplit le montant, la catégorie et la description |
| Appui long sur une suggestion | EC-47 Pourquoi cette suggestion |
| Toucher la catégorie | EC-14 |
| Toucher la poche | Feuille avec les poches actives |
| Hier, Avant-hier | Sélection en un tap |
| Autre date | EC-15 |
| Plusieurs dates | EC-16 ; à partir du L2, absent avant |
| « Enregistrer » | Enregistre ; retour à EC-12 avec le chiffre recalculé et « Annuler » pendant 10 s |
| « Ajouter une autre » | Enregistre et reste en mode saisie |
| « Terminer » | Retour à EC-12, ou à EC-19 si l'utilisateur vient du bilan |
| `close` ou retour | Revient en arrière ; le montant reste en brouillon jusqu'à la fermeture de l'app |

## 8. Données

| Donnée | Valeur par défaut |
| --- | --- |
| Montant | Vide, sauf suggestion ; 8 chiffres au plus, zéro refusé |
| Date | Aujourd'hui |
| Catégorie | Déduite du créneau et de l'habitude |
| Poche | Dernière utilisée |
| Description | Vide, avec autocomplétion |

**Exemple, sans suggestion.** Camille tape 500, garde Transport et Espèces, touche « Enregistrer ». **Avec suggestion.** Elle touche « Taxi · 500 », puis « Enregistrer » : 2 taps.

Un prévu n'entre jamais dans le réel. Les habitudes restent sur le téléphone.

## 9. Accessibilité

Focus initial sur le montant : « Montant, en francs CFA ». Suggestion : « Taxi, 500 francs CFA, suggestion ». Le choix Dépense ou Revenu annonce son état. L'enregistrement est annoncé : « Dépense notée. Tu peux dépenser 3 200 francs CFA aujourd'hui. »

## 10. Mouvement

Ouverture : l'écran monte en 300 ms, le clavier est déjà ouvert à la fin. Vibration légère à l'enregistrement. Les bandeaux apparaissent en 200 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | 298 dp utiles : la barre du haut se réduit à 48 dp ; catégorie et dates défilent ; montant et bouton restent visibles |
| 320 × 568 dp | Valeur à 30 sp ; le bouton texte passe sous le bouton principal, dans le contenu |
| Texte à 200 % | Le contenu défile ; le pied garde le bouton principal |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`entry_started`, `entry_saved`, avec le nombre de taps et la durée ; `suggestion_shown`, `suggestion_accepted`. **Aucun montant ni libellé.**
