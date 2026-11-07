# Plus : fiches d'écran

*Version 0.1 · 7 novembre 2026 · Détaille EC-37 à EC-46 et EC-52 de [parcours_ecrans_p1.md](../../parcours_ecrans_p1.md), avec le [design system](../00-design-system/README.md). Ces écrans ne sont pas dans la maquette.*

Chaque fiche se suffit à elle-même : l'écran dans ses sections numérotées, tout le reste dans son annexe générée.

```text
Onglet Plus ► EC-37 Menu ─┬─ EC-38 Mes poches ─────────► EC-19 Compter
                          ├─ EC-39 Revenus et charges
                          ├─ EC-40 Mon rituel et alertes
                          ├─ EC-41 Pass Plus ──────────► EC-42 Liste d'attente Pass Pro
                          ├─ EC-43 Ce que l'app a appris
                          ├─ EC-44 Mes natures
                          ├─ EC-45 Mes données
                          ├─ EC-52 Sécurité
                          ├─ EC-46 À propos
                          └─ Donner mon avis, pendant le test
```

| Fiche | Écran |
| --- | --- |
| [EC-37](EC-37-menu.md) | Menu |
| [EC-38](EC-38-mes-poches.md) | Mes poches |
| [EC-39](EC-39-revenus-charges.md) | Revenus et charges |
| [EC-40](EC-40-rituel-alertes.md) | Mon rituel et alertes |
| [EC-41](EC-41-pass-plus.md) | Pass Plus |
| [EC-42](EC-42-liste-attente-pro.md) | Liste d'attente Pass Pro |
| [EC-43](EC-43-ce-que-app-a-appris.md) | Ce que l'app a appris |
| [EC-44](EC-44-mes-natures.md) | Mes natures |
| [EC-45](EC-45-mes-donnees.md) | Mes données |
| [EC-46](EC-46-a-propos.md) | À propos |
| [EC-52](EC-52-securite.md) | Sécurité |

## Points à valider

| # | Point | Choix retenu | Écran |
| --- | --- | --- | --- |
| 1 | **Texte de la mention du site** | « Le Pass Plus s'achète sur bankvi.tg », sans lien : **à relire avec les règles de Google Play avant la soumission** | EC-41 |
| 2 | Bouton de EC-41 sans pass | **Validé :** « Fermer » à contour : aucun bouton vert, car aucune action d'achat | EC-41 |
| 3 | Durée de la prévente | **Validé :** Pass actif dès le paiement ; les 30 jours se décomptent à partir du lancement public | EC-41, W-02 |
| 4 | Liste d'attente sans compte | **Validé :** Demande de créer un compte, car il faut un moyen de prévenir | EC-42 |
| 5 | Supprimer une poche | **Validé :** Une poche qui a un historique se masque, sans suppression | EC-38 |
| 6 | Revenu : passage de régulier à variable | **Validé :** Permis, recalcul immédiat, avec « Annuler » | EC-39 |
| 7 | Statistiques d'usage | **Validé :** Coupées par défaut, sans case cochée | EC-45 |
| 8 | **Suppression du compte** | Immédiate après confirmation ; délai légal de conservation **à confirmer avec le juriste** | EC-45 |
| 9 | Colonnes de l'export CSV | **Validé :** Date, type, montant, poche, catégorie, nature, description, origine ; format compatible avec Excel en français, cellules protégées | EC-45 |
| 10 | **Informations légales** | Nom de la société, adresse et contact restent à remplir | EC-46 |
| 11 | Geste des natures | **Validé :** Balayage et boutons visibles, pour que personne ne dépende du geste | EC-44 |
| 12 | Moyen de verrouillage | **Validé :** Empreinte ou code du téléphone, sans code propre à BankVi ; coupé par défaut, proposé une fois | EC-52 |
| 13 | **E-mail de secours** | Facultatif ; **déclaration et mention à valider avec le juriste** | EC-52 |
