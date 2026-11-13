# Statut, accueil et expérience

Ce fichier fixe la philosophie de l'expérience : BankVi emprunte aux réseaux sociaux leur facilité et leur plaisir, sans leur pression. Il décrit aussi l'accueil et le statut du jour.

## 1. Philosophie

| Principe | Ce que cela veut dire |
| --- | --- |
| **Regarder avant de remplir** | On ouvre l'app pour voir où on en est, comme on regarde un statut. Noter vient après |
| **Affirmé sur la disposition, neutre sur les choix** | L'app décide où va chaque chose et ce qui compte en premier. Elle ne dit jamais quoi faire de son argent (LEG-04) |
| **Le plaisir sans la pression** | Beau, vivant, agréable à toucher. Rien qui punit, compare ou fait revenir par peur de perdre |
| **Personnel, jamais public** | Il n'y a ni fil, ni abonnés, ni partage de montants. Le statut est un miroir, pas une publication |

## 2. Ce qu'on emprunte aux réseaux sociaux

Il s'agit surtout de disposition, sur des fonctions déjà prévues.

| Geste connu | Dans BankVi | Écran |
| --- | --- | --- |
| Statut avec anneau | Le statut du jour | EC-12, EC-50 |
| Segments à toucher | Passer d'un fait à l'autre | EC-50 |
| Messages envoyés et reçus | Dépenses à droite, revenus à gauche, échange du bilan du soir | EC-12, EC-17, EC-19 à EC-21 |
| Écrire un message | Noter en texte libre : « jus 100 » (P2) | EC-13 |
| Réponses rapides | Puces de répartition de l'écart | EC-20 |
| Réactions | Juste, Faux, Oublier sur ce que l'app a appris | EC-43 |
| Cartes à balayer | Classer ses natures | EC-44 |
| Partage d'une création | Partager une recette, sans montant, en L2 | EC-35 |

## 3. Ce que le ludique n'a pas le droit de faire

| Interdit | Raison |
| --- | --- |
| Série de jours, flamme, compteur à ne pas perdre | Un jour oublié deviendrait une faute (« pas de reproche ») |
| Points, niveaux, badges de réussite | Récompenser une dépense faible, c'est juger |
| Classement, comparaison avec d'autres | Données financières, et pression sociale |
| Fil public, commentaires, abonnés | Modération exclue avant P3, et risque pour la vie privée |
| Fausse urgence, ou statut qui expire | Aucune manipulation |
| Offre ou publicité dans le statut | Le miroir reste propre |
| Lecture automatique à l'ouverture | Le chiffre du jour reste à 0 tap (PRV-01), et le son pourrait surprendre en public |

Le ludique passe par la beauté, la surprise douce et le plaisir du geste.

## 4. Accueil : la disposition affirmée (EC-12)

L'ordre est fixe et ne se personnalise pas : ce que je peux dépenser, ce qui arrive, où est mon argent, ce que j'ai noté.

```text
┌────────────────────────────────────┐
│ ◉  Vendredi 6 novembre       ▮▮ ▲  │ ┐
│                          ☼         │ │
│ Aujourd'hui, tu peux dépenser      │ │ héros plein bord, 280
│ 3 200 FCFA                         │ │ paysage du jour
│ jusqu'au 28                        │ │
│ ▁▂▃▅▂▁▂▃▅▇▆▄▂▁▂▃▄▃▂▁▁▂▃▅▆▄▃▂       │ ┘
│ À VENIR                            │
│ ⚡ Électricité   ⬇ Salaire          │ 72
│ le 15 · 8 000    le 28 · 120 000   │
│ MES POCHES                         │
│ [Espèces 32 000] [Mixx 58 000]     │ 72
│ NOTÉ AUJOURD'HUI          Tout voir│
│        ╭ Taxi · −500 FCFA · 8 h 12╮│ dépense, à droite
│╭ Prêt rendu · +2 000 FCFA ╮        │ revenu, à gauche
├────────────────────────────────────┤
│ (      + Noter une dépense       ) │ 64 barre d'action
├────────────────────────────────────┤
│ ◉Aujourd'hui  Horizon  Pots  Plus  │ 64
└────────────────────────────────────┘
```

| Zone | Contenu | Règle |
| --- | --- | --- |
| **Héros** | Paysage plein bord, sous la barre d'état ; anneau du statut et date en haut ; chiffre du jour | 280 dp au repos, barre d'état comprise ; se replie à 120 dp au défilement (le paysage s'efface, la date et le chiffre restent visibles). Texte `#FFFFFF`. Aucun bouton. Toucher le chiffre ouvre EC-24 ; toucher l'anneau ouvre EC-50 |
| **À venir** | Deux blocs : la prochaine charge et le prochain revenu | Hauteur 72 dp, fond `#F0F2F5` en clair, `#111B21` en sombre, contour de 1 dp `#7A8A94` en clair, `#667781` en sombre, rayon 12 dp. Toucher ouvre EC-23 |
| **Mes poches** | Un bloc par poche, en rangée qui défile | Contour de 1 dp `#7A8A94` en clair, `#667781` en sombre. Solde en Roboto 16/24 sp, Medium (500), tabulaire. Toucher ouvre EC-22 |
| **Carte** | Une seule au plus, entre poches et saisies | Absente si rien n'est utile |
| **Noté aujourd'hui** | [Conversation](12-composants-contenu.md#saisies-en-conversation-sai-27) : dépenses à droite, revenus à gauche, les plus récentes en haut | 3 au plus, puis « Tout voir ». Vide : « Rien de noté aujourd'hui, c'est normal » |
| **Action principale** | [Barre d'action](10-composants-actions.md#5-barre-daction) fixe, au-dessus des onglets ; le soir avant le bilan, « Noter » et « Faire mon bilan » côte à côte | Libellé selon l'état, comme le prévoit EC-12 ; un seul bouton vert |

Titres de zone : Roboto 12/16 sp, Medium (500), `#54656F` en clair, `#AEBAC1` en sombre, en casse normale : les majuscules du schéma ci-dessus ne servent qu'à le lire.

## 5. Anneau du statut

| Attribut | Valeur |
| --- | --- |
| Taille | Avatar de 40 dp, anneau de 2,5 dp, 2 dp d'écart, zone tactile 48 dp |
| Contenu | Miniature du paysage du jour |
| À voir | Anneau en `#FFFFFF`, car il est posé sur le paysage |
| Déjà vu | Anneau en `rgba(255,255,255,0.45)` |
| Nouveau statut | À la première ouverture de chaque jour, et après un bilan |
| TalkBack | « Mon statut du jour, à voir » |

## 6. Écran de statut (EC-50)

Plein écran, sans barre de navigation. Il est identique en thème clair et sombre, comme une image.

| Élément | Valeur |
| --- | --- |
| Segments de progression | En haut, sous la barre d'état ; 2 dp de haut, écart de 4 dp, `#FFFFFF` ; à venir à 40 % d'opacité |
| Durée | 5 s par fait ; 4 faits au plus, soit 20 s |
| Fermer | Icône `close` en haut à droite, `#FFFFFF`, zone 48 dp |
| Pause | Icône `pause` ou `play_arrow`, pour ceux qui ne peuvent pas maintenir l'appui |
| Son | Icône `volume_off` ou `volume_up` à côté de `close` (L2) |
| Texte | `#FFFFFF`, dans la moitié haute, à 24 dp des bords |
| Toucher à droite ou à gauche | Fait suivant ou précédent |
| Appui long | Pause |
| Glisser vers le bas, ou retour | Retour à l'accueil |
| Fin | Retour à l'accueil ; l'anneau passe à « déjà vu » |

| Fait | Condition | Texte exact, pour Camille |
| --- | --- | --- |
| 1. Aujourd'hui | Toujours | « Aujourd'hui, tu peux dépenser », **3 200 FCFA** en Roboto 48/56 sp, Bold (700), « jusqu'au 28 », puis la phrase d'état |
| 2. À venir | Toujours | « Dans 7 jours », **67 600 FCFA**, « Prochaine charge : Électricité, le 15 » |
| 3. Hier | Si une saisie existe hier | « Hier », **2 500 FCFA**, « 3 dépenses notées » |
| 4. Mes pots | Si une recette est active et a déjà reçu un revenu | « Vie courante », **24 000 FCFA restants**, « jusqu'au 28 », exemple du 6 décembre |

Les faits s'énoncent sans adjectif, et aucun n'exige d'action. Aucun bouton n'apparaît sur le statut.

## 7. L'artwork : mon horizon en paysage

L'artwork est calculé sur le téléphone, à partir des chiffres de l'utilisateur. Il n'a besoin ni de réseau, ni d'IA, ni de serveur. Aucune donnée ne part. Le même jour et les mêmes chiffres donnent la même image.

| Élément du paysage | Vient de | Rendu |
| --- | --- | --- |
| **Collines proches** | La forme de la courbe à 30 jours | Silhouette calculée, sur 18 à 45 % de la hauteur, couleur `rgba(11,20,26,0.55)` |
| **Collines lointaines** | La même courbe, décalée et adoucie | Silhouette, `rgba(255,255,255,0.12)` |
| **Soleil** | Les jours écoulés avant le prochain revenu | Cercle de 64 dp, `#FFBC38`, sur un arc de gauche à droite : il arrive à droite le jour du revenu |
| **Ciel** | L'état du jour | Dégradé vertical à deux couleurs |
| **Détails** | La date, qui sert de graine | 3 à 7 petits oiseaux ou étoiles, en trait de 1,5 dp, `rgba(255,255,255,0.7)` |

| État | Condition, à valider | Phrase | Ciel, du haut vers le bas | Contraste du texte blanc |
| --- | --- | --- | --- | --- |
| **Ça suit** | Chiffre du jour à 90 % ou plus de celui du début du cycle | Ça suit ton rythme. | `#054D43` → `#0E7A6A` | 9,77:1 et 5,24:1 |
| **Ça se resserre** | De 60 à 90 % | Ça se resserre un peu. | `#123A5C` → `#2A6A8F` | 11,76:1 et 5,90:1 |
| **Serré** | Moins de 60 % | C'est serré jusqu'au 28. | `#33275C` → `#66478C` | 13,24:1 et 7,38:1 |
| **Il manque** | Reste à vivre négatif | Il manque 8 500 FCFA pour tes charges jusqu'au 28. | `#40270F` → `#8A4B00` | 13,86:1 et 6,80:1 |

Ces phrases restent des faits. Aucun orage, aucun rouge, aucun ciel menaçant : le manque ressemble à une fin de journée, pas à une catastrophe.

**Placement :** le texte reste au-dessus du soleil et des collines, et les oiseaux à droite, loin du chiffre. Sur l'accueil, le soleil fait 36 dp et les collines occupent le bas du héros, sous la phrase « jusqu'au 28 ». Les quatre états sont visibles dans la [maquette](../../maquettes/accueil-statut.html).

**Mouvement :** le soleil et les collines lointaines dérivent de 2 dp au plus sur 5 s. Rien d'autre ne bouge. Le paysage de l'accueil reste immobile.

## 8. Le son d'ambiance (L2)

| Attribut | Valeur |
| --- | --- |
| Par défaut | **Coupé.** Un toucher sur l'icône l'active, et le choix est mémorisé |
| Contenu | Une boucle douce par état, sans voix ni montant énoncé |
| Durée et poids | 20 s, 150 Ko au plus, 4 fichiers |
| Origine | Création originale ou licence écrite, jamais une musique connue |
| Mode silencieux | Toujours respecté : l'app reste muette |
| Priorité | S'arrête pour un appel ou une autre lecture, et à la fermeture |

## 9. Accessibilité et performance

| Cas | Règle |
| --- | --- |
| TalkBack | Pas d'avance automatique. Chaque fait est lu, puis on passe au suivant d'un geste. Le paysage porte une phrase : « Paysage du jour : ça suit ton rythme » |
| Animations réduites | Paysage immobile |
| Temps de lecture | L'appui long met en pause, et l'on peut revenir en arrière |
| Couleur | L'état est toujours écrit en phrase |
| Texte à 200 % | Le chiffre est plafonné à 64 sp. Le fait peut déborder sur les collines, et un voile de `rgba(11,20,26,0.40)` garantit alors la lecture |
| Génération | Moins de 300 ms, sans bloquer l'accueil. En cas de lenteur, le dégradé seul s'affiche d'abord |
| Appareil lent | Sans animation si l'affichage passe sous 30 images par seconde |
| Ouverture de l'app | Toujours moins de 2 s (UX-05) ; le paysage ne la retarde pas |

## 10. Mesure

`status_viewed`, avec le nombre de faits vus et l'état ; `status_sound_on`. **Aucun montant.** À comparer : retour le lendemain et saisie du réel, entre les personnes qui ouvrent le statut et les autres. Une différence ne prouvera pas la cause.
