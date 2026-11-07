# Site de paiement : fiches d'écran

*Version 0.1 · 7 novembre 2026 · Détaille W-01 à W-04 de [parcours_ecrans_p1.md](../../parcours_ecrans_p1.md). Le site reprend le [design system](../00-design-system/README.md). Ces pages ne sont pas dans la maquette.*

Le site est accessible en saisissant son adresse. « bankvi.tg » est un nom de travail : **le domaine reste à réserver**. L'app ne contient aucun lien vers lui.

```text
L'utilisateur ouvre lui-même son navigateur
W-01 Connexion ─► W-02 Offres ─► W-03 Paiement FedaPay ─► W-04 Confirmation
                       ▲               │
                       └── échec ──────┘
```

| Fiche | Page |
| --- | --- |
| [W-01](W-01-connexion.md) | Connexion |
| [W-02](W-02-offres.md) | Offres |
| [W-03](W-03-paiement.md) | Paiement |
| [W-04](W-04-confirmation.md) | Confirmation |

## Règles communes

| Règle | Valeur |
| --- | --- |
| Format | Une colonne, 480 px au plus, centrée, marges de 16 px ; pensé d'abord pour le téléphone |
| Thème | Selon le réglage du téléphone, mêmes jetons que l'app |
| Police | Pile système, sans téléchargement |
| Poids | 100 Ko au plus par page hors FedaPay ; réseau lent pris en compte |
| Sans | Bandeau publicitaire, traceurs, pop-up |
| Pied | BankVi · Conditions · Confidentialité · Contact |

## Points à valider

| # | Point | Choix retenu | Page |
| --- | --- | --- | --- |
| 1 | **Grille FedaPay** | Mixx, Flooz et carte supposés au Togo ; opérateurs des 7 autres pays de l'UEMOA : **à confirmer par écrit** (VAL-04) | W-03 |
| 2 | Conditions de la prévente | Remboursement si le lancement est annulé ; **les modalités restent à rédiger avec le juriste** | W-02 |
| 3 | Départ du pass | **Validé :** Dès le paiement, sauf la prévente, décomptée à partir du lancement public ; un nouvel achat s'ajoute à la fin du pass en cours | W-02, W-04 |
| 4 | Reçu | **Validé :** Affiché et téléchargeable, sans envoi commercial | W-04 |
| 5 | Sans compte existant | **Validé :** Le site crée le compte avec le numéro ; l'app le retrouve ensuite avec EC-10 | W-01 |
| 6 | Session | **Validé :** 30 minutes, sans mot de passe | W-01 |
