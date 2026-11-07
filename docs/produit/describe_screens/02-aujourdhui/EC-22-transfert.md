# EC-22 Transfert entre poches

| Fiche | |
| --- | --- |
| **Parcours** | PC-07 |
| **Lot** | L1 |
| **Bible** | POC-03 |
| **Avant** | EC-12, en touchant un solde |
| **Après** | EC-12 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 24 dp, clavier ouvert |

## 1. Rôle

Noter un retrait ou un dépôt sans fausser les comptes : l'argent change de poche, seuls les frais sont une dépense.

## 2. Ce qu'on voit

Deux lignes empilées : De, Mixx, puis Vers, Espèces, avec un bouton d'inversion entre elles. Dessous, le montant en grands chiffres, puis un petit champ pour les frais. Une phrase confirme : « Seuls les frais comptent comme une dépense. » Au-dessus du clavier : « Transférer ».

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Transfert                       │ 56
│ Ⓜ De      Mixx · 58 000 FCFA     › │ 56
│                 ⇅                  │ 24
│ ▣ Vers    Espèces · 32 000 FCFA  › │ 56
│ Montant                            │
│ 20 000|                       FCFA │ 72
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Frais (facultatif)             500 │ 56
│ Seuls les frais comptent           │
│ comme une dépense.                 │ 32
│ ╭────────────────────────────────╮ │
│ │           Transférer           │ │ 48
│ ╰────────────────────────────────╯ │
├────────────────────────────────────┤
│              clavier               │ ≈270
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 0 |
| Ligne De | 56 dp | 0 |
| Inverser | 48 dp, centré, chevauche les lignes | 0 |
| Ligne Vers | 56 dp | 12 dp |
| Champ montant | 72 dp | 8 dp |
| Frais | 56 dp | 8 dp |
| Aide | 32 dp | 12 dp |
| Pied | 76 dp | — |

Avec le clavier, De et Vers peuvent défiler : le champ actif et le bouton restent visibles.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Transfert | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Avatar | M, F, ou icône `payments` | 40 dp | Fond `#F0F2F5` en clair, `#111B21` en sombre, contenu `#54656F` en clair, `#AEBAC1` en sombre |
| Libellé | De, Vers | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Poche | Mixx · 58 000 FCFA | Roboto 16/24 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Inverser | `swap_vert` | 24 dp, zone 48 dp | `#00735E` en clair, `#25D366` en sombre |
| Valeur | 20 000 | Roboto 36/44 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre ; placeholder « 0 » `#667781` en clair, `#8696A0` en sombre |
| Unité | FCFA | Roboto 18/24 sp, Medium (500) | `#54656F` en clair, `#AEBAC1` en sombre |
| Frais | Libellé : Frais (facultatif) | Roboto 16/24 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre ; trait `#7A8A94` en clair, `#667781` en sombre |
| Aide | Seuls les frais comptent comme une dépense. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton principal | Transférer | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Frais déjà connus pour un transfert proche | Sous le champ, une puce : « 500 FCFA, comme la dernière fois ». Le champ reste vide tant qu'elle n'est pas touchée |
| Arrivée depuis un solde | Cette poche en De ; Vers est la dernière autre poche utilisée ; montant actif |
| Montant vide | Bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Une seule poche active | Message : « Ajoute une autre poche pour faire un transfert. » avec le bouton texte « Mes poches » (EC-38) |
| Montant supérieur au solde | Sous le champ, avec `warning`, en `#8A4B00` en clair, `#FFD27A` en sombre : « C'est plus que le solde noté de 58 000 FCFA. » Sans blocage |
| Vers la poche d'activité, ou depuis elle | Aide : « Ce transfert change ce que tu peux dépenser. » |
| Hors ligne | Identique |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Toucher De ou Vers | Feuille avec les poches actives et leur solde. La poche déjà prise de l'autre côté est échangée |
| Inverser | Échange De et Vers |
| Suivant du clavier | Montant → Frais → ferme le clavier |
| « Transférer » | Soldes mis à jour, retour à EC-12 avec le bandeau « Transfert noté », « Annuler » pendant 10 s |
| Retour | Revient sans enregistrer |

## 8. Données

| Élément | Effet |
| --- | --- |
| Montant | Sort de De et entre dans Vers. Ni dépense ni revenu |
| Frais | Sortent de De et comptent comme une dépense de catégorie « Frais de retrait » |
| Poche d'activité | Hors du chiffre du jour ; un transfert vers une poche perso y entre |
| Historique | Un repère neutre : « Mixx vers Espèces : 20 000 FCFA » ; les frais apparaissent en dépense |

**Exemple.** Mixx 58 000, Espèces 32 000. Retrait de 20 000 avec 500 de frais : Mixx 37 500, Espèces 52 000. Le chiffre du jour ne baisse que du fait des 500 FCFA de frais : (89 500 − 18 000) ÷ 22 = 3 250, arrondi à 3 200 FCFA.

P1 ne contient aucune grille de frais d'opérateur : l'utilisateur saisit le montant facturé. L'app propose le dernier montant pour un transfert proche : mêmes poches, montant à 20 % près. Ce calcul se fait sur le téléphone.

## 9. Accessibilité

Lignes : « De, Mixx, 58 000 francs CFA, modifier ». Inverser : « Inverser De et Vers », puis annonce du résultat. L'avertissement est annoncé, sans bloquer.

## 10. Mouvement

L'inversion échange les lignes en 200 ms. Vibration légère à la validation.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | 298 dp utiles : De et Vers défilent quand un champ est actif |
| 320 × 568 dp | Valeur à 30 sp ; marges de 16 dp |
| Texte à 200 % | Solde sous le nom de la poche |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`transfer_saved`, avec les types de poches et la présence de frais. **Aucun montant.**
