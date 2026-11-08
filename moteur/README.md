# Moteur de calcul de BankVi

Bibliothèque TypeScript pure : sans écran, sans base, sans réseau et sans dépendance à l'exécution. Elle reçoit un état et rend les chiffres que l'app affiche. Mêmes données, même résultat.

Les formules viennent de la [section 3 du parcours](../docs/produit/parcours_ecrans_p1.md), et les règles fixées en route sont dans [prototype_moteur.md](../docs/produit/prototype_moteur.md).

## Lancer

Les dépendances s'installent depuis la racine du dépôt, qui regroupe le moteur et l'[app](../app/README.md) en workspaces npm. Les commandes se lancent ensuite ici :

```bash
npm install   # à la racine
npm test
npm run typecheck
```

## Utiliser

```ts
import { calculer, horizon, simuler } from "./src";

const etat = {
  aujourdhui: "2026-11-06",
  poches: [{ id: "mixx", nom: "Mixx", genre: "perso" }],
  ecritures: [{ id: "c1", at: "2026-11-06T07:00", type: "comptage", poche: "mixx", montant: 90000 }],
  revenus: [{ type: "regulier", id: "salaire", nom: "Salaire", montant: 120000, jour: 28, depuis: "2026-11-06" }],
  prevus: [],
};

calculer(etat).chiffre; // 4 000 : 90 000 FCFA pour 22 jours, arrondi à la baisse à 100 FCFA
horizon(etat, 30).points; // Le solde du matin, jour par jour
simuler(etat, { montant: 15000, date: "2026-11-06" }).apres; // Calculé sur une copie : rien n'est écrit
```

## Fichiers

| Fichier | Rôle |
| --- | --- |
| [src/types.ts](src/types.ts) | L'état reçu : poches, écritures, revenus, lignes prévues, recettes |
| [src/registre.ts](src/registre.ts) | Rejoue les écritures : soldes, pots réservés, lignes closes, partie double de contrôle |
| [src/prevision.ts](src/prevision.ts) | Chiffre du jour, courbe, repères, ligne prévue proche |
| [src/recettes.ts](src/recettes.ts) | Catalogue, validation et répartition |
| [src/scenarios.ts](src/scenarios.ts) | Statut, simulation, effet d'une recette, explication du chiffre |
| [tests/](tests) | Exemples des fiches, cas limites, règles générales sur des registres au hasard |

## Règles de code

- Les montants sont des entiers en FCFA : un montant à virgule ou négatif est refusé.
- La date du jour est toujours passée en entrée, jamais lue sur l'horloge.
- Les écritures sont immuables : une correction annule, puis écrit de nouveau.
- Le moteur rend des données, jamais de phrases : les textes restent dans l'app.
