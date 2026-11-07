# Composants : actions

## 1. Hiérarchie

| Niveau | Composant | Par écran |
| --- | --- | --- |
| Principal | Bouton principal | **1 exactement**, sauf écran de pure consultation |
| Secondaire | Bouton à contour | 1 au plus |
| Tertiaire | Bouton texte | 2 au plus ; « Plus tard » en fait partie |
| Destructif | Bouton texte rouge | Jamais plein, jamais principal |

## 2. Bouton principal

| Attribut | Valeur |
| --- | --- |
| Hauteur | 48 dp |
| Largeur | Pleine largeur moins les marges |
| Forme | Pilule |
| Libellé | Roboto 16/24 sp, Medium (500), centré, une ligne ; deux lignes si le texte est agrandi, la hauteur suit |
| Texte | Verbe et résultat. Jamais « Suivant » ni « OK » |
| Position | Dans le pied d'action |

| État | Fond | Texte | Remarque |
| --- | --- | --- | --- |
| Repos | `#25D366` (clair et sombre) | `#0B141A` (clair et sombre) | |
| Appuyé | `#1FAD56` (clair et sombre) | `#0B141A` (clair et sombre) | Ondulation |
| Désactivé | `#E9EDEF` en clair, `#202C33` en sombre | `#667781` en clair, `#8696A0` en sombre | Un champ manquant ; une aide dit lequel. Non annoncé comme action par TalkBack, mais lu avec « désactivé » |
| Chargement | `#25D366` (clair et sombre) | Cercle de progression de 20 dp, trait 2 dp, `#0B141A` (clair et sombre), à gauche du libellé | Bouton inactif, libellé modifié (« Envoi… »), après 300 ms d'attente seulement |

## 3. Bouton à contour

Même hauteur et forme que le principal. Fond transparent, contour de 1 dp `#7A8A94` en clair, `#667781` en sombre, libellé Roboto 16/24 sp, Medium (500) en `#00735E` en clair, `#25D366` en sombre. Pressé : ondulation.

## 4. Bouton texte

| Attribut | Valeur |
| --- | --- |
| Texte | Roboto 14/20 sp, Medium (500), `#00735E` en clair, `#25D366` en sombre |
| Zone tactile | Hauteur 48 dp, largeur du texte plus 12 dp de chaque côté |
| Pleine largeur | Centré sous le bouton principal |
| Destructif | `#B3261E` en clair, `#F2B8B5` en sombre |

## 5. Barre d'action

Sur les écrans principaux, l'action reste dans une barre fixe, juste au-dessus des onglets. Il n'y a **aucun bouton flottant** : rien ne recouvre le contenu, et le pouce retrouve toujours le même endroit.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 64 dp : 8 dp, bouton de 48 dp, 8 dp |
| Marges latérales | 16 dp |
| Fond | `#FFFFFF` en clair, `#0B141A` en sombre |
| Trait du haut | 1 dp `#E9EDEF` en clair, `#2A3942` en sombre |
| Ombre | Aucune |
| Un seul bouton | Bouton principal, toute la largeur, icône de 24 dp et libellé |
| Deux boutons | Écart de 8 dp ; à gauche, bouton à contour, 40 % de la largeur ; à droite, bouton principal, 60 % |
| Bandeau Annuler | 8 dp au-dessus de la barre |
| Présence | Accueil et Mon horizon, ainsi que les autres écrans principaux qui ont une action ; absente pendant une tâche et au premier lancement |

Un seul bouton reste vert. Le libellé peut se raccourcir quand deux boutons se partagent la barre (« Noter ») ; TalkBack lit toujours le libellé complet. À 200 % de texte, les deux boutons s'empilent et la barre grandit.

## 6. Puce

| Attribut | Valeur |
| --- | --- |
| Hauteur | 32 dp, zone tactile 48 dp |
| Forme | Pilule |
| Marges intérieures | 12 dp ; 8 dp entre l'icône et le texte |
| Icône | 20 dp, facultative |
| Texte | Roboto 14/20 sp, Medium (500) |
| Disposition | Rangée qui passe à la ligne, écart de 8 dp |

| État | Fond | Contour | Texte |
| --- | --- | --- | --- |
| Repos | Transparent | 1 dp `#7A8A94` en clair, `#667781` en sombre | `#111B21` en clair, `#E9EDEF` en sombre |
| Appuyée | Ondulation | 1 dp `#7A8A94` en clair, `#667781` en sombre | `#111B21` en clair, `#E9EDEF` en sombre |
| Sélectionnée | `#D8FDD2` en clair, `#103529` en sombre | Aucun | `#0A3D2E` en clair, `#D9FDD3` en sombre, avec icône `check` |
| Désactivée | Transparent | 1 dp `#E9EDEF` en clair, `#2A3942` en sombre | `#667781` en clair, `#8696A0` en sombre |
