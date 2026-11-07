# W-03 Paiement

| Fiche | |
| --- | --- |
| **Parcours** | PC-15 |
| **Lot** | L1 |
| **Bible** | PAY-03, MES-03 |
| **Avant** | W-02 |
| **Après** | W-04 ; W-02 en cas d'échec |
| **Cadre** | Page de FedaPay, plus une page d'attente BankVi de 360 px de large d'abord |

## 1. Rôle

Encaisser sans que BankVi touche aux données de paiement : la saisie du paiement se fait chez FedaPay.

## 2. Ce qu'on voit

Une courte page d'attente BankVi : « On t'envoie vers FedaPay. » Puis la page de FedaPay, avec le montant et le moyen de paiement. Au retour, une page d'attente pendant la vérification, puis la confirmation.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ BankVi                             │ 56
│                                    │
│               ◌                    │ 40
│ On t'envoie vers FedaPay.          │ 24
│ 1 000 FCFA · Pass Plus 30 jours    │ 20
│                                    │
│ Ne ferme pas cette page.           │ 20
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| En-tête | 56 px | 32 px |
| Cercle de progression | 40 px, centré | 16 px |
| Texte | 24 px | 4 px |
| Rappel | 20 px | 24 px |
| Consigne | 20 px | — |

## 5. Éléments de la page d'attente

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Marque | BankVi | Roboto 18/24 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Cercle | — | 40 px, trait de 3 px | `#008069` en clair, `#25D366` en sombre |
| Texte | On t'envoie vers FedaPay. | Roboto 16/24 sp, Regular (400), centré | `#111B21` en clair, `#E9EDEF` en sombre |
| Rappel | 1 000 FCFA · Pass Plus 30 jours | Roboto 14/20 sp, Regular (400), tabulaire, centré | `#54656F` en clair, `#AEBAC1` en sombre |
| Consigne | Ne ferme pas cette page. | Roboto 12/16 sp, Regular (400), centré | `#54656F` en clair, `#AEBAC1` en sombre |

La page de FedaPay n'est pas dessinée ici. Elle suit l'apparence de FedaPay et ses règles. **Les moyens Mixx, Flooz et carte restent à confirmer par écrit (VAL-04).**

## 6. États

| État | Affichage |
| --- | --- |
| Après le paiement | On vérifie ton paiement. Cela peut prendre quelques instants. Sans bouton de paiement |
| Vérifié | W-04 |
| Interrompu | W-02 : Paiement interrompu. Rien n'a été débité. |
| Échoué | W-02 : Le paiement n'a pas abouti : [motif de FedaPay]. |
| Attente longue, plus de 2 minutes | Ton paiement n'est pas encore confirmé. Ne paie pas une deuxième fois. Tu seras prévenu dans l'app. Avec le bouton « Vérifier à nouveau » et le contact |
| Réseau coupé | Vérification au retour du réseau, jamais de nouveau débit |

## 7. Comportement

| Situation | Règle |
| --- | --- |
| Double clic ou retour navigateur | Une seule transaction par identifiant ; jamais de double débit |
| Confirmation | Par notification serveur de FedaPay, signature vérifiée. La page de retour ne suffit pas |
| Pass | Activé par le serveur seulement après confirmation |
| Rattachement au compte | Identifiant de compte transmis à la transaction, sans donnée financière |

## 8. Données

BankVi ne reçoit ni le numéro de carte, ni le code de mobile money. Il garde : compte, offre, montant, date, statut, référence FedaPay. Le numéro payeur est utilisé selon ce que FedaPay renvoie, seulement pour le reçu.

## 9. Accessibilité

Le texte d'attente est annoncé par `role="status"`. Le cercle est décoratif. Les messages d'état ne reposent pas sur la couleur.

## 10. Mouvement

Le cercle tourne lentement ; avec `prefers-reduced-motion`, il est remplacé par des points fixes et le texte seul.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 px | Texte sur deux lignes |
| Ordinateur | Colonne de 480 px |
| Thème sombre | Valeurs ci-dessus ; FedaPay garde son thème |

## 12. Mesure

`payment_redirected`, `payment_returned`, `payment_confirmed`, `payment_failed`, avec le motif. Abandon mesuré entre chaque étape. Sans donnée de paiement.
