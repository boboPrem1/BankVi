# EC-24 D'où vient ce chiffre

| Fiche | |
| --- | --- |
| **Parcours** | PC-11 |
| **Lot** | L1 |
| **Bible** | PRV-08 |
| **Avant** | EC-12, en touchant le chiffre ; EC-23, en touchant un solde |
| **Après** | L'écran d'origine ; EC-38, EC-39, EC-17, EC-30 |
| **Cadre** | Feuille basse sur 360 × 800 dp, 90 % de la hauteur au plus, marges de 16 dp |

## 1. Rôle

Rendre chaque chiffre vérifiable : aucun calcul caché, et chaque ligne renvoie à sa source. C'est ce qui fonde la confiance dans la prévision.

## 2. Ce qu'on voit

Une feuille monte du bas. Le titre reprend le chiffre : « 3 200 FCFA par jour ». Dessous, le calcul se lit comme une addition d'épicier, ligne par ligne : ce qu'on a, ce qui va sortir, ce qui reste, divisé par les jours. Chaque ligne a un chevron et ouvre sa source. Rien à valider : on regarde, on referme.

## 3. Maquette

```text
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒ voile ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│╭──────────────────────────────────╮│
││               ▬▬▬                ││
││ 3 200 FCFA par jour              ││ 24
││ Jusqu'au 28                      ││ 20
││ Espèces              32 000 FCFA ›││ 48
││ Mixx                 58 000 FCFA ›││ 48
││ Électricité, le 15   −8 000 FCFA ›││ 48
││ Tontine, le 20      −10 000 FCFA ›││ 48
││ ──────────────────────────────── ││
││ Reste à vivre        72 000 FCFA  ││ 48
││ Pour 22 jours         3 272 FCFA  ││ 48
││ Arrondi, par jour     3 200 FCFA  ││ 48
│╰──────────────────────────────────╯│
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Poignée, 32 × 4 dp | Haut 8 dp | 12 dp |
| Titre | 24 dp | 4 dp |
| Sous-titre | 20 dp | 12 dp |
| Lignes de calcul | 48 dp chacune | 0 |
| Trait de total | 1 dp | 0 |
| Lignes de résultat | 48 dp chacune | 24 dp en bas |

La feuille défile si le calcul est long.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Feuille | — | Coins hauts 28 dp, ombre `e3` | `#FFFFFF` en clair, `#202C33` en sombre |
| Voile | — | — | `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre |
| Poignée | — | Pilule | `#7A8A94` en clair, `#667781` en sombre |
| Titre | 3 200 FCFA par jour | Roboto 18/24 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Sous-titre | Jusqu'au 28 | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Nom de ligne | Espèces | Roboto 16/24 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Montant | 32 000 FCFA | Roboto 16/24 sp, Regular (400), tabulaire, à droite | `#111B21` en clair, `#E9EDEF` en sombre |
| Chevron | `chevron_right` | 20 dp | `#54656F` en clair, `#AEBAC1` en sombre |
| Trait de total | — | 1 dp | `#7A8A94` en clair, `#667781` en sombre |
| Résultat | Reste à vivre | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Dernière ligne | Arrondi, par jour / 3 200 FCFA | Roboto 16/24 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |

## 6. Contenu selon le chiffre

### Chiffre du jour, revenu régulier

| Ligne | Camille | Ouvre |
| --- | --- | --- |
| Espèces | 32 000 FCFA | EC-38 |
| Mixx | 58 000 FCFA | EC-38 |
| Électricité, le 15 | −8 000 FCFA | EC-39 |
| Tontine, le 20 | −10 000 FCFA | EC-39 |
| Réservé dans tes pots | Affiché seulement si différent de 0 | EC-27 |
| **Reste à vivre** | **72 000 FCFA** | — |
| Pour 22 jours | 3 272 FCFA | — |
| **Arrondi, par jour** | **3 200 FCFA** | — |

### Chiffre du jour, revenu variable

| Ligne | Karim |
| --- | --- |
| Espèces | 45 000 FCFA |
| Mixx | 20 000 FCFA |
| Revenu encore attendu, au moins | 75 000 FCFA |
| Loyer, le 10 | −15 000 FCFA |
| Téléphone, le 18 | −6 000 FCFA |
| **Reste à vivre** | **119 000 FCFA** |
| Pour 25 jours | 4 760 FCFA |
| **Arrondi, par jour** | **4 700 FCFA** |

Sous la ligne du revenu, en Roboto 12/16 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre : « Le plus petit de : ton plancher pour les jours restants, ou ce qu'il reste à recevoir. »

### Solde prévu à une date

Titre : « 67 600 FCFA le 13 nov. »

| Ligne | Camille |
| --- | --- |
| Aujourd'hui | 90 000 FCFA |
| Dépenses supposées : 7 jours à 3 200 FCFA | −22 400 FCFA |
| Charges et revenus d'ici là | 0 FCFA |
| **Solde prévu** | **67 600 FCFA** |

Sous le résultat, en Roboto 12/16 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre : « Le prévu n'est pas certain. »

## 7. États

| État | Affichage |
| --- | --- |
| Il manque de l'argent | Titre : « Il manque 8 500 FCFA jusqu'au 28 », en `#8A4B00` en clair, `#FFD27A` en sombre, avec l'icône `warning`. Dernières lignes : Reste à vivre −8 500 FCFA, sans division par les jours |
| Chiffre de 0 FCFA | Dernière ligne : « Arrondi, par jour : 0 FCFA » |
| Poche d'activité active | Une ligne, sans montant additionné : « Activité : 45 000 FCFA, hors de ce calcul » |
| Hors ligne | Identique |

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une ligne avec chevron | Ouvre sa source. Le retour revient à cette feuille |
| Glisser vers le bas, toucher le voile, retour | Ferme la feuille |

Aucune action principale et aucun bouton vert. Le texte n'énonce que des faits, sans « tu devrais ».

## 9. Données

Ce sont les valeurs du moteur, recalculées à l'ouverture. Les lignes viennent des écritures et des récurrents déclarés, jamais d'une estimation d'IA.

## 10. Accessibilité

Titre annoncé à l'ouverture. Lignes : « Tontine, le 20, moins 10 000 francs CFA, ouvrir les charges ». L'ordre de lecture suit le calcul. Le focus revient sur le chiffre d'origine à la fermeture.

## 11. Mouvement

Feuille en 300 ms. Aucune animation des montants.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp ; noms sur deux lignes si besoin |
| Texte à 200 % | Montant sous le nom |
| Thème sombre | Valeurs ci-dessus |

## 13. Mesure

`figure_explained`, avec l'origine ; `figure_source_opened`. **Aucun montant.**
