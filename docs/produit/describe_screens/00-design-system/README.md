# Design system BankVi

*Version 0.2 · 7 novembre 2026 · Pour : designer, modèle de génération d'écrans et développeur de l'app Android.*

BankVi reprend les conventions visuelles de WhatsApp sur Android : fond blanc ou presque noir, vert réservé à l'action, boutons en pilule, listes simples, bulles, barre du bas, soulignement des champs. L'utilisateur togolais connaît déjà ces gestes. L'app n'a rien à lui apprendre avant de lui montrer son chiffre.

BankVi garde sa propre marque : son nom, son logo et son icône ne ressemblent pas à ceux de WhatsApp (voir [les limites](01-principes-et-reference-whatsapp.md#3-ce-quon-ne-reprend-pas)).

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
3. Vérifier la règle d'or : **un seul bouton vert par écran.**
4. Vérifier les textes avec la [rédaction](14-redaction.md) : montants, tutoiement, aucun reproche, aucun conseil.

## Fiches autonomes

Chaque fiche d'écran contient en annexe ce qu'il faut du design system, de la philosophie, du parcours et de la bible pour finir l'écran avec ce seul fichier. Ces annexes sont générées : **une règle se change dans son document source, jamais dans une annexe.** On relance ensuite `python generer_annexes.py` depuis le dossier `describe_screens`, et `--verifier` signale une annexe qui n'est plus à jour.

## D'où viennent les valeurs

WhatsApp ne publie **aucune palette ni aucune échelle officielle** de son interface. La page de marque de Meta ne donne que des règles sur le logo et le nom. Les valeurs de ce dossier viennent donc de relevés tiers et de la refonte de mai 2024 décrite par la presse. Elles restent à contrôler à la pipette sur des captures d'un téléphone Android récent, en clair et en sombre.

| Niveau de certitude | Valeurs |
| --- | --- |
| **Recoupé par plusieurs sources** | Vert `#25D366` ; bulle claire `#D9FDD3` ; texte `#111B21` ; fond sombre `#0B141A` ; barre de navigation en bas ; vert utilisé avec parcimonie ; icônes rondes à contour ; illustrations arrondies à contour noir |
| **Une seule source tierce** | Neutres, bulle sombre `#005C4B`, surface `#202C33`, ombres, rayons, puce sélectionnée |
| **Décision BankVi** | Lien `#00735E`, soulignements, couleurs d'état, palette des pots, tailles de texte, chiffre du jour, courbe |

Un rapport de WABetaInfo, relayé par SamMobile, indique un fond sombre récent encore plus profond, `#0A1014`. Nous gardons `#0B141A` tant que la comparaison n'est pas faite ; l'écart est invisible à l'œil dans la plupart des conditions.

**Sources :** [Android Authority, refonte](https://www.androidauthority.com/whatsapp-gets-makeover-3441545/) · [Design Compass, refonte de 2024](https://designcompass.org/en/2024/05/27/whatsapp-redesign) · [TalkAndroid](https://www.talkandroid.com/465987-whatsapp-design-overhaul/) · [Galerie de design systems, relevé WhatsApp](https://www.oppadu.com/tools/design-systems-site/brand/whatsapp.html) · [Meta, règles de marque WhatsApp](https://www.meta.com/nb-no/brand/resources/whatsapp/whatsapp-brand/)
