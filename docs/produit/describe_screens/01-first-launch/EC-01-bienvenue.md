# EC-01 Bienvenue

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement ; PC-16 Nouveau téléphone |
| **Lot** | L1 |
| **Bible** | ONB-01, ONB-06 |
| **Avant** | Écran de lancement Android |
| **Après** | EC-03 Mon argent · EC-02 Exemple · EC-10 Sauvegarde (variante compte existant) |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp |

## 1. Rôle

Dire la promesse en une phrase, puis faire démarrer sans friction.

## 2. Ce qu'on voit

Un écran blanc, calme, dans l'esprit de l'accueil de WhatsApp. Le nom « BankVi » en vert foncé tout en haut. Au centre, une illustration arrondie à contour noir : une grande carte vert menthe affiche « 3 200 FCFA », entourée de pièces et d'un billet. Dessous, une phrase en grand : « Sache ce que tu peux dépenser aujourd'hui. » Tout en bas, un seul bouton vert, « Commencer », et deux liens discrets. Pas de barre du haut, pas de champ, pas de carrousel.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24  barre d'état
│                                    │
│               BankVi               │     marque écrite
│                                    │
│       ╭───────────────────╮   ⟋    │
│       │ Aujourd'hui       │  ⟋     │
│       │ 3 200 FCFA        │ ⟋      │     illustration 240 × 200
│       ╰─╮─────────────────╯        │
│    ◯◯◯                    ▭▭▭      │
│                                    │
│     Sache ce que tu peux           │     titre centré, 2 lignes
│     dépenser aujourd'hui.          │
│                                    │
│ ╭────────────────────────────────╮ │
│ │           Commencer            │ │ 48  bouton principal
│ ╰────────────────────────────────╯ │
│ Voir un exemple  J'ai déjà un compte│ 48  boutons texte
│                                    │
│         ◁      ○      ▢            │ 48  barre de navigation
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Position | Dimensions |
| --- | --- | --- |
| Marque écrite | Centrée, à 24 dp sous la barre d'état | Hauteur 24 dp |
| Groupe central | Illustration et titre, centrés verticalement dans l'espace restant | — |
| Illustration | Centrée | 240 × 200 dp |
| Écart illustration et titre | — | 32 dp |
| Titre | Centré, largeur 312 dp au plus | 2 lignes, 64 dp |
| Pied | Fixé en bas | Haut 12 dp, bouton 48 dp, écart 4 dp, boutons texte 48 dp, bas 16 dp |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Marque écrite | BankVi | Roboto 18/24 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Titre | Sache ce que tu peux dépenser aujourd'hui. | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Commencer | Roboto 16/24 sp, Medium (500), pilule, pleine largeur | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |
| Bouton texte gauche | Voir un exemple | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Bouton texte droit | J'ai déjà un compte | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |

Les deux boutons texte sont sur une même ligne, en deux moitiés, centrés dans leur moitié.

### Illustration ILL-01

Vecteur de 240 × 200 dp, sans dégradé ni ombre. Contour de 2,5 dp, bouts ronds, en `#111B21` en clair, `#E9EDEF` en sombre.

| Partie | Forme et position | Remplissage |
| --- | --- | --- |
| Carte | Rectangle à coins de 20 dp, 176 × 96 dp, centré, un peu plus haut que le milieu, avec un petit pli en bas à gauche, sans forme ronde ni téléphone | `#D9FDD3` en clair, `#005C4B` en sombre |
| Texte de la carte | « Aujourd'hui » en Roboto Regular 14, « 3 200 FCFA » en Roboto Bold 28, alignés à gauche | `#111B21` en clair, `#E9EDEF` en sombre |
| Pièces | Pile de 3 pièces rondes de 32 dp, sous la carte à gauche, légèrement décalées | `#FFBC38` (clair et sombre) |
| Billet | Rectangle à coins de 6 dp, 64 × 36 dp, sous la carte à droite, incliné de −8°, avec un petit cercle central | `#25D366` (clair et sombre) |
| Courbe | Trait de 2,5 dp en ligne brisée montante, en haut à droite de la carte, sans remplissage | Contour seul |

TalkBack ignore l'illustration : le titre porte la promesse.

## 6. États

| État | Comportement |
| --- | --- |
| Premier lancement | Écran décrit ci-dessus |
| Parcours déjà commencé | L'écran n'apparaît pas : l'app reprend à l'étape en cours |
| Sans réseau | Identique, sans indicateur : ici rien ne dépend du réseau, sauf « J'ai déjà un compte », traité sur EC-10 |

Le bouton principal n'est jamais désactivé.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Commencer » | EC-03, sans attente |
| « Voir un exemple » | EC-02 |
| « J'ai déjà un compte » | EC-10, variante compte existant |
| Retour Android | Ferme l'app |

Aucun message hors tâche, aucune demande de permission, aucune offre sur cet écran (UX-06, UX-07).

## 8. Données

Aucune saisie, et aucun appel réseau n'est nécessaire pour afficher l'écran. Le chiffre 3 200 FCFA de l'illustration est fixe et fictif.

## 9. Accessibilité

Ordre TalkBack : « BankVi » → titre (déclaré comme titre) → « Commencer » → « Voir un exemple » → « J'ai déjà un compte ».

## 10. Mouvement

Fondu d'entrée de 200 ms depuis l'écran de lancement. Aucune animation d'illustration.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Illustration à 180 × 150 dp, écart de 16 dp avant le titre |
| 320 × 568 dp | Illustration à 150 × 125 dp ; marges de 16 dp |
| Texte à 200 % | Illustration masquée ; boutons texte l'un sous l'autre ; le contenu défile |
| Thème sombre | Valeurs ci-dessus ; illustration en version sombre |

## 12. Mesure

Événements `onboarding_step_viewed` (`welcome`) et `onboarding_step_completed`, avec le choix. Le chrono du temps jusqu'à la première valeur démarre ici.
