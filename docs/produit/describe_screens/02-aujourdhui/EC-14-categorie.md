# EC-14 Choix de la catégorie

| Fiche | |
| --- | --- |
| **Parcours** | PC-02, PC-08 |
| **Lot** | L1 |
| **Bible** | NAT-01, NAT-02, NAT-06, SAI-16 |
| **Avant** | EC-12, EC-13, EC-17, EC-18 |
| **Après** | L'écran d'origine ; EC-48 pour un libellé sensible |
| **Cadre** | Feuille basse sur 360 × 800 dp, 90 % de la hauteur, marges de 16 dp |

## 1. Rôle

Choisir ou corriger une catégorie d'un seul toucher. Corriger depuis l'historique tient en 2 taps.

## 2. Ce qu'on voit

Une feuille monte du bas sur un voile sombre. Titre : « Catégorie ». En haut, les catégories récentes en puces. Dessous, une liste groupée par nature : Besoin, Envie, Épargne, etc. Chaque ligne a un rond à icône et un nom. La catégorie actuelle porte une coche. Il n'y a pas de bouton de validation : toucher suffit.

## 3. Maquette

```text
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒ voile ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│╭──────────────────────────────────╮│
││               ▬▬▬                ││
││ Catégorie                        ││ 24
││ Récentes                         ││
││ (Transport) (Déjeuner) (Courses) ││ 32
││ Besoin                           ││ 32
││ ◉ Transport                    ✓ ││ 56
││ ◉ Déjeuner                       ││ 56
││ ◉ Courses                        ││ 56
││ ◉ Loyer                          ││ 56
││ Envie                            ││ 32
││ ◉ Sorties                        ││ 56
││ …                                ││
│╰──────────────────────────────────╯│
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Poignée, 32 × 4 dp | Haut 8 dp | 12 dp |
| Titre | 24 dp | 12 dp |
| Libellé « Récentes » | 16 dp | 8 dp |
| Puces récentes, 6 au plus | 32 dp par rangée | 16 dp |
| Titre de nature | 32 dp | 0 |
| Ligne | 56 dp | 0 |

La liste défile, le titre reste fixe.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Feuille | — | Coins hauts 28 dp, ombre `e3` | `#FFFFFF` en clair, `#202C33` en sombre |
| Voile | — | — | `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre |
| Poignée | — | Pilule | `#7A8A94` en clair, `#667781` en sombre |
| Titre | Catégorie | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Libellé | Récentes | Roboto 12/16 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Puce | Transport | 32 dp, Roboto 14/20 sp, Medium (500) | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Titre de nature | Besoin | Roboto 12/16 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Avatar | Icône de la catégorie | 40 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre, icône `#54656F` en clair, `#AEBAC1` en sombre |
| Nom | Transport | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Coche | `check` | 24 dp | `#00735E` en clair, `#25D366` en sombre |
| Séparateur | — | 1 dp, à l'aplomb du texte | `#E9EDEF` en clair, `#2A3942` en sombre |

## 6. Contenu de départ

| Nature | Catégories de dépense |
| --- | --- |
| Besoin | Transport, Déjeuner, Courses, Loyer, Électricité et eau, Crédit téléphone, Frais de retrait, Santé |
| Éducation | École |
| Envie | Sorties, Habillement |
| Tontine | Tontine |
| Soutien familial | Famille |
| Solidarité et dons | Dons |
| Épargne | Épargne |
| Dette | Remboursement |
| Imprévu | Imprévus |

Revenus : Salaire, Vente, Prêt rendu, Don reçu, Autre revenu. **Cette liste de départ est à vérifier en entretien.**

Santé et les libellés de religion, de politique ou de syndicat sont sensibles : ils ne sont jamais prédits et passent par EC-48.

## 7. États

| État | Affichage |
| --- | --- |
| Pas encore de récentes | Le bloc « Récentes » est absent |
| Mode Revenu | Seules les catégories de revenus, sans titre de nature |
| Depuis un appui long, EC-17 | La correction est immédiate, avec « Annuler » pendant 10 s |
| Hors ligne | Identique |

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher une catégorie | La sélectionne et ferme la feuille |
| Toucher une catégorie sensible pour la première fois | EC-48 d'abord |
| Glisser vers le bas, toucher le voile, retour | Ferme sans changement |

## 9. Données

Une catégorie porte une nature, qui sert à toutes les recettes : changer de recette ne demande aucune recatégorisation. Une correction reste réversible et ne modifie aucune écriture passée de façon visible.

## 10. Accessibilité

Titre annoncé à l'ouverture. Lignes : « Transport, nature besoin, sélectionné ». Le focus revient sur l'élément d'origine à la fermeture.

## 11. Mouvement

Feuille en 300 ms, et fermeture immédiate après le choix.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp, 4 puces récentes |
| Texte à 200 % | Lignes plus hautes, puces sur plusieurs rangées |
| Thème sombre | Valeurs ci-dessus |

## 13. Mesure

`category_changed`, avec l'origine (`deduced`, `suggestion`, `manual`). **Aucun montant ni libellé sensible.**
