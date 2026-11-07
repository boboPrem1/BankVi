# W-04 Confirmation

| Fiche | |
| --- | --- |
| **Parcours** | PC-15 |
| **Lot** | L1 |
| **Bible** | PAY-03, PAY-04, MES-03 |
| **Avant** | W-03 |
| **Après** | Retour dans l'app, par l'utilisateur |
| **Cadre** | 360 px de large d'abord ; colonne de 480 px au plus, centrée ; marges de 16 px |

## 1. Rôle

Confirmer le paiement sans ambiguïté, fournir un reçu, et ramener à l'app.

## 2. Ce qu'on voit

Une coche, puis la phrase : « Ton Pass Plus est actif jusqu'au 6 décembre. » La consigne : « Retourne dans l'app. » Un reçu clair dessous : offre, montant, date, référence. Un lien permet de le télécharger. Aucun bouton vert et aucune vente complémentaire.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ BankVi                             │ 56
│ ✓                                  │ 48
│ Ton Pass Plus est actif            │
│ jusqu'au 6 décembre.               │ 64
│ Retourne dans l'app.               │ 24
│ ┌────────────────────────────────┐ │
│ │ Reçu                           │ │
│ │ Pass Plus 30 jours  1 000 FCFA │ │ 136
│ │ Vendredi 6 novembre 2026       │ │
│ │ Référence : FP-XXXXXX          │ │
│ │ +228 90 12 34 56               │ │
│ └────────────────────────────────┘ │
│        Télécharger le reçu         │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| En-tête | 56 px | 16 px |
| Icône | 48 px | 12 px |
| Titre | 64 px | 8 px |
| Consigne | 24 px | 24 px |
| Reçu | 136 px | 12 px |
| Télécharger | 48 px | 24 px |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Icône | `check_circle` | 48 px | `#00735E` en clair, `#25D366` en sombre |
| Titre | Ton Pass Plus est actif jusqu'au 6 décembre. | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Consigne | Retourne dans l'app. | Roboto 16/24 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Carte du reçu | — | Rayon 12 px, contour 1 px, marges 16 px | Fond `#FFFFFF` en clair, `#202C33` en sombre, contour `#E9EDEF` en clair, `#2A3942` en sombre |
| Lignes du reçu | Offre, montant, date, référence, numéro | Roboto 14/20 sp, Regular (400), tabulaire | `#111B21` en clair, `#E9EDEF` en sombre |
| Lien | Télécharger le reçu | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

La référence vient de FedaPay : `FP-XXXXXX` n'est qu'une illustration.

## 6. États

| État | Affichage |
| --- | --- |
| Prévente | Ton Pass Plus est actif. Tes 30 jours commenceront au lancement public. Remboursé si le lancement est annulé. |
| Pass prolongé | Ton Pass Plus est prolongé jusqu'au 6 janvier. |
| Un an | Actif jusqu'au 6 novembre 2027 |
| App déjà ouverte | Le pass s'affiche à la prochaine synchronisation |
| Page rouverte | Toujours le même reçu, sans nouveau paiement |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Télécharger le reçu | Fichier PDF léger |
| Retourner dans l'app | Par l'utilisateur. Aucune action automatique |

Dans l'app, EC-41 affiche « Pass actif jusqu'au 6 décembre » à la prochaine synchronisation, sur tous ses appareils.

## 8. Données

Le 6 novembre + 30 jours : 6 décembre. Droits sur le compte. Le reçu n'est pas une facture fiscale : **son contenu légal est à valider avec le juriste.**

## 9. Accessibilité

Titre en `h1`, annoncé à l'arrivée. Icône décorative : le texte dit tout. Reçu en vrais éléments de texte.

## 10. Mouvement

Apparition en fondu de 200 ms. Pas de confettis.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 px | Montant sous l'offre |
| Ordinateur | Colonne de 480 px |
| Impression | Fond blanc, reçu seul |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`payment_confirmation_viewed`, `receipt_downloaded`. Le passage à l'app se mesure à la synchronisation suivante. Sans donnée de paiement.
