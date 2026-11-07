# EC-41 Pass Plus

| Fiche | |
| --- | --- |
| **Parcours** | PC-15 |
| **Lot** | L1 |
| **Bible** | PAY-01, PAY-02, PAY-04, PAY-05, PAY-06, REC-03, UX-06, MSG-05, B2B-01 |
| **Avant** | EC-37, EC-23, EC-25 |
| **Après** | L'écran d'origine, EC-42 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Dire honnêtement ce que le gratuit contient, ce que le pass ajoute et où l'acheter. **Cet écran ne contient aucun lien, aucun bouton d'achat et aucun renvoi vers le navigateur.**

## 2. Ce qu'on voit

Le prix en haut : 1 000 FCFA pour 30 jours, 10 000 FCFA par an. Deux listes simples : ce qui est inclus gratuitement, ce que le pass ajoute. Une phrase en texte simple indique où l'acheter. En bas, un bouton à contour, « Fermer ». Aucun vert : il n'y a rien à faire ici.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Pass Plus                       │ 56
│ 1 000 FCFA pour 30 jours           │ 32
│ 10 000 FCFA par an                 │ 24
│ Le Pass Plus ajoute                │ 24
│ ✓ L'horizon à 90 jours             │ 32
│ ✓ « Puis-je me permettre ça ? »    │ 32
│ ✓ Plusieurs recettes               │ 32
│ ✓ Écrire une recette               │ 32
│ ✓ Exports mis en forme             │ 32
│ Toujours gratuit                   │ 24
│ ✓ Saisie, bilan, une recette       │ 32
│ ✓ Horizon à 30 jours               │ 32
│ ✓ Alertes de découvert             │ 32
│ ✓ Export complet en CSV            │ 32
│ Le Pass Plus s'achète sur          │
│ bankvi.tg avec Mixx, Flooz ou une  │ 60
│ carte.                             │
│ (              Fermer            ) │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Prix | 56 dp | 16 dp |
| Titre de liste | 24 dp | 4 dp |
| Ligne de liste | 32 dp | 0 |
| Mention du site | 60 dp | 12 dp |
| Pied | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Pass Plus | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Prix principal | 1 000 FCFA pour 30 jours | Roboto 24/32 sp, Medium (500), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Prix annuel | 10 000 FCFA par an | Roboto 16/24 sp, Regular (400), tabulaire | `#54656F` en clair, `#AEBAC1` en sombre |
| Titres de liste | Le Pass Plus ajoute ; Toujours gratuit | Roboto 18/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Coche | `check` | 20 dp | `#00735E` en clair, `#25D366` en sombre |
| Ligne | Horizon à 90 jours | Roboto 14/20 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Mention du site | Le Pass Plus s'achète sur bankvi.tg avec Mixx, Flooz ou une carte. Hors du Togo, à partir du L2 : Le Pass Plus s'achète sur bankvi.tg avec le mobile money ou une carte. | Roboto 16/24 sp, Regular (400), en texte simple, **non touchable** | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton à contour | Fermer | Roboto 16/24 sp, Medium (500), pilule | Contour `#7A8A94` en clair, `#667781` en sombre, texte `#00735E` en clair, `#25D366` en sombre |
| Lien, revenu variable | Pass Pro : m'inscrire sur la liste | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

**Aucune URL touchable :** `bankvi.tg` n'est ni un lien, ni un bouton, et ne s'ouvre pas au toucher.

## 6. États

| État | Affichage |
| --- | --- |
| Pass actif | Bandeau : « Pass actif jusqu'au 6 décembre. », icône `check_circle`, en `#00735E` en clair, `#25D366` en sombre. Plus de mention du site |
| Pass offert par une organisation | Pass actif. Offert par ton employeur. |
| Pass bientôt fini | Ton pass se termine le 6 décembre. Sans compte à rebours ni urgence |
| Pass terminé | Ton pass s'est terminé le 6 décembre. Tes données sont toutes là. Tes recettes en trop restent lisibles, une seule reste active. |
| Pendant le test | Mention en plus : « Prévente à 1 000 FCFA, remboursée si le lancement est annulé. » |
| Prévente payée, avant le lancement | Pass actif. Tes 30 jours commenceront au lancement public. |
| Revenu variable | Le lien vers le Pass Pro s'ajoute |
| Essais de simulation | Dans la liste : « Puis-je me permettre ça ? », 3 essais offerts |
| Pas d'accès avant le premier horizon | L'écran n'est pas proposé tant que le premier horizon n'a pas été vu |
| Hors ligne | Identique ; l'état du pass est le dernier connu |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Fermer » ou retour | Écran d'origine |
| Lien Pass Pro | EC-42 |
| Ouvrir le site | Par l'utilisateur lui-même, dans son navigateur : W-01 |

Après l'achat, le pass s'active à la prochaine synchronisation, sur tous ses appareils.

## 8. Données

Droits rattachés au compte. Le gratuit ne perd aucune donnée quand un pass se termine.

**Google Play :** la règle retenue, sans lien ni bouton, doit être relue avant la soumission. Ce point n'a pas été validé par Google ni par un juriste.

## 9. Accessibilité

Prix et listes lus dans l'ordre. `bankvi.tg` est lu comme du texte. Pas de lien annoncé.

## 10. Mouvement

Entrée d'écran standard, sans animation ni élément clignotant.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Le contenu défile, pied fixe |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`pass_viewed`, avec l'origine ; `pass_closed`. Le taux d'abandon entre l'app et le site se mesure par le rattachement au compte. **Aucun montant de l'utilisateur.**
