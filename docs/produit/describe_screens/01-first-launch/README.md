# Premier lancement : fiches d'écran

*Version 0.1 · 6 novembre 2026 · Détaille EC-01 à EC-11 de [parcours_ecrans_p1.md](../../parcours_ecrans_p1.md), avec le [design system](../00-design-system/README.md).*

Chaque fiche se suffit à elle-même : l'écran dans ses sections numérotées, tout le reste dans son annexe générée. Les valeurs viennent de [tokens.json](../00-design-system/tokens.json).

## Enchaînement

```text
EC-01 Bienvenue ──► EC-03 Mon argent ──► EC-04 Mon revenu ──► EC-05 Mes charges ──► EC-06 Premier horizon
   │    │                ▲                                                            │ "Répartir"   │ "Plus tard"
   │    └► EC-02 Exemple ┘                                                            ▼              │
   │                                                          EC-07 Recette la plus proche ─ "Plus tard"┤
   │                                                                   ▼                             │
   │                                                          EC-08 Aperçu de la recette             │
   │                                                                   ▼                             ▼
   │                                                          EC-09 Quand noter ◄────────────────────┘
   │                                                                   ▼
   └─ "J'ai déjà un compte" ─────────────────────────────────► EC-10 Sauvegarde ─ "Plus tard" ─► EC-12 Accueil
                                                                       ▼                            ▲
                                                               EC-11 Code ──────────────────────────┘
```

| Fiche | Écran |
| --- | --- |
| [EC-01](EC-01-bienvenue.md) | Bienvenue |
| [EC-02](EC-02-exemple.md) | Exemple |
| [EC-03](EC-03-mon-argent.md) | Mon argent aujourd'hui |
| [EC-04](EC-04-mon-revenu.md) | Mon revenu |
| [EC-05](EC-05-mes-charges.md) | Mes charges fixes |
| [EC-06](EC-06-premier-horizon.md) | Premier horizon |
| [EC-07](EC-07-recette-proche.md) | La recette la plus proche |
| [EC-08](EC-08-apercu-recette.md) | Aperçu d'une recette |
| [EC-09](EC-09-quand-noter.md) | Quand préfères-tu noter ? |
| [EC-10](EC-10-sauvegarde.md) | Sauvegarde |
| [EC-11](EC-11-code.md) | Code |

## Personnes et chiffres d'exemple

La date de référence des exemples est le **vendredi 6 novembre 2026**.

| Donnée | Camille, salariée | Karim, indépendant |
| --- | --- | --- |
| Espèces | 32 000 FCFA | 45 000 FCFA |
| Mixx | 58 000 FCFA | 20 000 FCFA |
| Flooz | — | — |
| Revenu | Régulier : 120 000 FCFA, le 28 | Variable : au moins 90 000 FCFA par mois |
| Charges | École 25 000 (le 3), Loyer 35 000 (le 5), Électricité 8 000 (le 15), Tontine 10 000 (le 20) | Loyer 15 000 (le 10), Téléphone 6 000 (le 18) |
| Total des charges | 78 000 FCFA, soit 65 % du revenu | 21 000 FCFA |
| Date de référence | 28 novembre, dans 22 jours | 30 novembre, 25 jours en comptant aujourd'hui |
| Reste à vivre | 90 000 − 18 000 = 72 000 FCFA | 65 000 + 75 000 − 21 000 = 119 000 FCFA |
| Chiffre du jour | 3 272 → **3 200 FCFA** | 4 760 → **4 700 FCFA** |
| Recette la plus proche | 70 / 20 / 10 | Revenu plancher prudent |

## Points à valider

Ces choix complètent les documents existants. Ils ont été nécessaires pour décrire les écrans complètement.

| # | Point | Choix retenu dans les fiches | Écran |
| --- | --- | --- | --- |
| 1 | Revenu variable dans le reste à vivre | **Validé :** le plus petit de « plancher × jours restants ÷ jours du mois » et « montant attendu au départ − revenus notés » | EC-06 |
| 2 | Courbe de l'horizon | **Validé :** elle suppose qu'on dépense son chiffre du jour, avec un nouveau rythme après la date de référence ; l'hypothèse est écrite à l'écran | EC-06 |
| 3 | Pots de la recette « revenu plancher prudent » | **Validé :** Vie courante 70 %, Imprévus 20 %, Épargne 10 %, sur le plancher ; ce qui dépasse va dans « Le reste » | EC-07, EC-08 |
| 4 | Ordre des deux autres recettes | **Validé :** Ordre du catalogue ; le revenu plancher n'est proposé qu'aux revenus variables | EC-07 |
| 5 | Limites du rappel du soir | **Validé :** Heures de 6 h à 22 h 59 ; défaut 20 h | EC-09 |
| 6 | Code SMS | **Validé :** 6 chiffres, 10 minutes de validité, 5 essais, puis 15 minutes d'attente | EC-11 |
| 7 | Numéro déjà associé à un compte | **Validé :** jamais de fusion. L'utilisateur retrouve son compte, avec confirmation, ou utilise un autre numéro | EC-11 |
| 8 | Mentions sur le serveur et les conditions | Texte court à valider par le juriste | EC-10 |
| 9 | Charges dans le parcours | **Validé :** Mensuelles au démarrage ; une ligne sous le premier horizon (EC-06) rappelle : « Une scolarité ou un loyer au trimestre ? Ajoute-les dans Plus. » ; ils se règlent dans EC-39 | EC-05 |
| 10 | Numéros hors du Togo | **Validé :** +228 pendant le test ; les 8 pays de l'UEMOA au lancement public, sans acquisition active | EC-10 |

Le verrouillage (EC-51, EC-52) et le numéro perdu (EC-53) sont décidés : ils ajoutent un lien à EC-10 et un état à EC-11. P1 reste en français : les entretiens poseront la question des langues locales.
