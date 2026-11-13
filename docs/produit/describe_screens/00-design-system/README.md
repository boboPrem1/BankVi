# Design system BankVi

*Version 0.6 · 13 novembre 2026 · Pour : designer, modèle de génération d'écrans et développeur de l'app Android.*

BankVi possède sa propre identité visuelle chaleureuse (**Terracotta & Lagune** : fond sable ivoire au soleil, bleu nuit atlantique en sombre, terracotta pour agir, capsules de flux à barre latérale et boutons adoucis à rayon de 16 dp), tout en conservant des gestes familiers (listes simples, barre du bas, soulignement des champs) pour que l'utilisateur togolais n'ait rien à réapprendre.

BankVi garde sa propre marque : son nom, son logo, ses couleurs et ses composants ne ressemblent pas à ceux de WhatsApp (voir [les limites](01-principes-et-reference-whatsapp.md#3-ce-quon-ne-reprend-pas)).

## Lire ce dossier

| Fichier | Contenu |
| --- | --- |
| [tokens.json](tokens.json) | Toutes les valeurs, lisibles par une machine. **Une valeur se change ici, puis dans les documents, puis on relance `generer_annexes.py`.** |
| [01 Principes et référence WhatsApp](01-principes-et-reference-whatsapp.md) | Ce qu'on reprend, ce qu'on adapte, ce qu'on écarte, et pourquoi |
| [02 Couleurs](02-couleurs.md) | Palette claire et sombre, rôles, contrastes calculés |
| [03 Typographie](03-typographie.md) | Police, échelle, chiffres, grossissement du texte |
| [04 Espacements, grille et cadres](04-espacements-grille-cadres.md) | Unité de base, marges, formats d'écran, clavier |
| [05 Formes et élévations](05-formes-elevations.md) | Rayons, ombres, séparateurs |
| [06 Iconographie](06-iconographie.md) | Jeu d'icônes, tailles, liste des icônes |
| [07 Illustrations et marque](07-illustrations-et-marque.md) | Style d'illustration, logo, icône de l'app |
| [08 Mouvement et retours](08-mouvement-et-retours.md) | Durées, transitions, retour tactile |
| [09 Composants : navigation](09-composants-navigation.md) | Barres, onglets, progression |
| [10 Composants : actions](10-composants-actions.md) | Boutons, barre d'action, puces |
| [11 Composants : saisie](11-composants-saisie.md) | Montant, numéro, code, choix, heure |
| [12 Composants : contenu](12-composants-contenu.md) | Lignes, cartes, bulles, feuilles, bandeaux |
| [13 Graphiques et montants](13-graphiques-et-montants.md) | Chiffre du jour, courbe, barre des pots |
| [14 Rédaction](14-redaction.md) | Ton, vocabulaire, formats |
| [15 Accessibilité](15-accessibilite.md) | Contrastes, TalkBack, cibles, texte agrandi |
| [16 États et système](16-etats-systeme.md) | Chargement, vide, erreur, hors ligne, permissions |
| [17 Statut, accueil et expérience](17-statut-et-experience.md) | Philosophie, accueil affirmé, statut du jour, paysage généré, son |

## Comment l'utiliser pour dessiner un écran

1. Partir du cadre de référence : 360 × 800 dp, thème clair, puis décliner en sombre.
2. Reprendre uniquement les composants décrits ici. Un besoin nouveau s'ajoute au système avant d'apparaître sur un écran.
3. Vérifier la règle d'or : **un seul bouton principal terracotta par écran.**
4. Vérifier les textes avec la [rédaction](14-redaction.md) : montants, tutoiement, aucun reproche, aucun conseil.

## Fiches autonomes

Chaque fiche d'écran contient en annexe ce qu'il faut du design system, de la philosophie, du parcours et de la bible pour finir l'écran avec ce seul fichier. Ces annexes sont générées : **une règle se change dans son document source, jamais dans une annexe.** On relance ensuite `python generer_annexes.py` depuis le dossier `describe_screens`, et `--verifier` signale une annexe qui n'est plus à jour.

## Origine des valeurs et évolution de marque

À l'origine (v0.1 à v0.5), BankVi s'appuyait sur des repères visuels proches de WhatsApp afin de réduire l'appréhension au premier lancement. Depuis la v0.6, l'identité visuelle est entièrement propre à BankVi (**Terracotta & Lagune**) tout en gardant les gestes familiers (navigation basse à 4 onglets, champs soulignés, listes simples).

| Domaine | Choix BankVi (v0.6 Terracotta & Lagune) |
| --- | --- |
| **Action et marque** | Terracotta `#B83B20` en clair (`#FFFFFF` dessus), `#F07B5A` en sombre (`#1C120E` dessus) ; rayon de `16 dp` sur les boutons (au lieu de pilules) |
| **Fonds et neutres** | Sable ivoire `#FAF7F2` en clair, bleu nuit atlantique `#0D1520` en sombre ; textes `#1C1613` / `#F5F0EB` ; surfaces `#FFFFFF` / `#172436` |
| **Flux financier et horizon** | Lagune `#0E6BA8` / `#4DA8DA` pour les revenus et ciels d'horizon ; capsules de flux à `16 dp` avec barre latérale de `3 dp` |
| **Ergonomie conservée** | Navigation à 4 onglets sans glissement, soulignement de saisie, typographie système Roboto sans téléchargement, cibles tactiles ≥ `48 dp` |
