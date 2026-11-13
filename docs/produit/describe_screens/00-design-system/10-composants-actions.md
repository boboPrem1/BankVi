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
| Forme | Rectangle adouci (rayon `16 dp`) |
| Libellé | Roboto 16/24 sp, Medium (500), centré, une ligne ; deux lignes si le texte est agrandi, la hauteur suit |
| Texte | Verbe et résultat. Jamais « Suivant » ni « OK » |
| Position | Dans le pied d'action |

| État | Fond | Texte | Remarque |
| --- | --- | --- | --- |
| Repos | `#B83B20` en clair, `#F07B5A` en sombre | `#FFFFFF` en clair, `#1C120E` en sombre | Terracotta de Lomé / terracotta solaire |
| Appuyé | `#962E17` en clair, `#D96443` en sombre | `#FFFFFF` en clair, `#1C120E` en sombre | Ondulation |
| Désactivé | `#E6DFD5` en clair, `#1B2A3E` en sombre | `#6B5E57` en clair, `#948B84` en sombre | Un champ manquant ; une aide dit lequel. Non annoncé comme action par TalkBack, mais lu avec « désactivé » |
| Chargement | `#B83B20` en clair, `#F07B5A` en sombre | Cercle de progression de 20 dp, trait 2 dp, `#FFFFFF` en clair, `#1C120E` en sombre, à gauche du libellé | Bouton inactif, libellé modifié (« Envoi… »), après 300 ms d'attente seulement |

## 3. Bouton à contour

Même hauteur et forme (`rayon 16 dp`) que le principal. Fond transparent, contour de 1 dp `#7A6D65` en clair, `#728399` en sombre, libellé Roboto 16/24 sp, Medium (500) en `#A6331A` en clair, `#FF8B6B` en sombre. Pressé : ondulation.

## 4. Bouton texte

| Attribut | Valeur |
| --- | --- |
| Texte | Roboto 14/20 sp, Medium (500), `#A6331A` en clair, `#FF8B6B` en sombre |
| Zone tactile | Hauteur 48 dp, largeur du texte plus 12 dp de chaque côté |
| Pleine largeur | Centré sous le bouton principal |
| Destructif | `#B3261E` en clair, `#F2B8B5` en sombre |

## 5. Barre d'action

Sur les écrans principaux, l'action reste dans une barre fixe, juste au-dessus des onglets. Il n'y a **aucun bouton flottant** : rien ne recouvre le contenu, et le pouce retrouve toujours le même endroit.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 64 dp : 8 dp, bouton de 48 dp, 8 dp |
| Marges latérales | 16 dp |
| Fond | `#FAF7F2` en clair, `#0D1520` en sombre |
| Trait du haut | 1 dp `#E3DCD2` en clair, `#26384F` en sombre |
| Ombre | Aucune |
| Un seul bouton | Bouton principal, toute la largeur, icône de 24 dp et libellé |
| Deux boutons | Écart de 8 dp ; à gauche, bouton à contour, 40 % de la largeur ; à droite, bouton principal, 60 % |
| Bandeau Annuler | 8 dp au-dessus de la barre |
| Présence | Accueil et Mon horizon, ainsi que les autres écrans principaux qui ont une action ; absente pendant une tâche et au premier lancement |

Un seul bouton reste plein. Le libellé peut se raccourcir quand deux boutons se partagent la barre (« Noter ») ; TalkBack lit toujours le libellé complet. À 200 % de texte, les deux boutons s'empilent et la barre grandit.

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
| Repos | Transparent | 1 dp `#7A6D65` en clair, `#728399` en sombre | `#1C1613` en clair, `#F5F0EB` en sombre |
| Appuyée | Ondulation | 1 dp `#7A6D65` en clair, `#728399` en sombre | `#1C1613` en clair, `#F5F0EB` en sombre |
| Sélectionnée | `#F9DFD3` en clair, `#4D2318` en sombre | Aucun | `#5E1D0E` en clair, `#FDE5DA` en sombre, avec icône `check` |
| Désactivée | Transparent | 1 dp `#E3DCD2` en clair, `#26384F` en sombre | `#6B5E57` en clair, `#948B84` en sombre |
