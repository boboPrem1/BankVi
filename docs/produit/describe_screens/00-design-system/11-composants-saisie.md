# Composants : saisie

Les champs suivent la convention de WhatsApp : pas de boîte, un simple soulignement. Le clavier s'ouvre déjà au bon format.

## 1. Champ montant

Le champ le plus important de l'app.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 72 dp avec son libellé |
| Libellé | Au-dessus, Roboto 14/20 sp, Medium (500), `#54656F` en clair, `#AEBAC1` en sombre ; `#008069` en clair, `#25D366` en sombre si le champ est actif |
| Valeur | Roboto 36/44 sp, Medium (500), chiffres tabulaires, `#111B21` en clair, `#E9EDEF` en sombre |
| Placeholder | « 0 », même style, `#667781` en clair, `#8696A0` en sombre |
| Unité | « FCFA », Roboto 18/24 sp, Medium (500), `#54656F` en clair, `#AEBAC1` en sombre, fixe à droite du champ |
| Soulignement | Repos : 1 dp `#7A8A94` en clair, `#667781` en sombre. Actif : 2 dp `#008069` en clair, `#25D366` en sombre. Erreur : 2 dp `#B3261E` en clair, `#F2B8B5` en sombre |
| Clavier | Numérique système (`number-pad`) |
| Mise en forme | Espaces des milliers ajoutés en direct : `120 000`. Zéros de tête retirés. Lettres et signes refusés sans message |
| Maximum | 8 chiffres : `99 999 999` ; au-delà, la frappe est ignorée |
| Curseur | Toujours à la fin du nombre |

## 2. Champ compact

Pour les montants secondaires, le jour du mois ou un nom court.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 56 dp, zone tactile comprise |
| Libellé | Au-dessus, Roboto 14/20 sp, Medium (500), `#54656F` en clair, `#AEBAC1` en sombre |
| Valeur | Roboto 16/24 sp, Regular (400), `#111B21` en clair, `#E9EDEF` en sombre |
| Soulignement | Identique au champ montant |

**Message sous un champ :** Roboto 12/16 sp, Regular (400), à 4 dp du soulignement. Aide en `#54656F` en clair, `#AEBAC1` en sombre. Erreur en `#B3261E` en clair, `#F2B8B5` en sombre, avec icône `error` de 16 dp. Il apparaît à la validation ou en quittant le champ, jamais à la première frappe.

## 3. Ligne montant facultatif

Une ligne de 56 dp, avec avatar de 40 dp à gauche, nom au milieu (Roboto 16/24 sp, Medium (500)), et à droite un champ aligné à droite de 120 dp : Roboto 16/24 sp, Regular (400), placeholder « 0 », soulignement de 1 dp, « FCFA » en Roboto 12/16 sp, Regular (400). Toute la ligne donne le focus au champ.

## 4. Champ numéro de téléphone

Inspiré de l'écran d'inscription de WhatsApp.

| Attribut | Valeur |
| --- | --- |
| Indicatif | « +228 », Roboto 16/24 sp, Regular (400), `#111B21` en clair, `#E9EDEF` en sombre, souligné comme le champ, 64 dp de large, non modifiable en P1 |
| Écart | 12 dp |
| Numéro | Roboto 16/24 sp, Regular (400), en groupes : `90 12 34 56`, 8 chiffres |
| Placeholder | « 90 00 00 00 », `#667781` en clair, `#8696A0` en sombre |
| Clavier | Téléphone (`phone-pad`) ; remplissage automatique autorisé |

## 5. Code à 6 chiffres

| Attribut | Valeur |
| --- | --- |
| Cases | 6 cases de 44 × 56 dp, écart de 8 dp, centrées |
| Forme | Case à rayon de 8 dp et contour de 1 dp (2 dp sur la case active), ou soulignement seul |
| Chiffre | Roboto 24/32 sp, Medium (500), chiffres tabulaires, centré, `#111B21` en clair, `#E9EDEF` en sombre |
| Soulignement / contour | Repos 1 dp `#7A8A94` en clair, `#667781` en sombre ; case active 2 dp `#008069` en clair, `#25D366` en sombre ; erreur 2 dp `#B3261E` en clair, `#F2B8B5` en sombre |
| Saisie | Un seul champ caché sur toute la rangée, qui remplit les cases une à une, ce qui permet le coller et l'effacement |
| Clavier | Numérique (`number-pad`), avec lecture automatique du SMS sans permission via l'API SMS Retriever d'Android (`sms-otp` / `one-time-code`) |

## 6. Carte de choix

Pour une décision entre deux à quatre options exclusives.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 72 dp au moins, suit le texte |
| Largeur | Pleine largeur moins les marges |
| Rayon | 12 dp |
| Marges intérieures | 16 dp |
| Disposition | Rond de sélection de 20 dp à gauche, 12 dp, puis titre et description |
| Titre | Roboto 16/24 sp, Medium (500), `#111B21` en clair, `#E9EDEF` en sombre |
| Description | Roboto 14/20 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre |
| Écart entre cartes | 12 dp |

| État | Fond | Contour | Rond |
| --- | --- | --- | --- |
| Repos | `#FFFFFF` en clair, `#202C33` en sombre | 1 dp `#7A8A94` en clair, `#667781` en sombre | Cercle 2 dp `#7A8A94` en clair, `#667781` en sombre |
| Sélectionnée | `#D8FDD2` en clair, `#103529` en sombre | 2 dp `#008069` en clair, `#25D366` en sombre | Cercle 2 dp `#008069` en clair, `#25D366` en sombre et point de 10 dp `#008069` en clair, `#25D366` en sombre |

Sur fond sélectionné, le titre et la description passent en `#0A3D2E` en clair, `#D9FDD3` en sombre.

**Carte contenant une barre de pots :** le fond reste celui du repos et seuls le contour et le rond changent, pour que les six teintes des pots gardent toute leur lisibilité.

## 7. Sélecteur d'heure

Des puces pour les heures habituelles (19 h, 20 h, 21 h, 22 h), plus une puce « Autre heure » qui ouvre le sélecteur d'heure système, au format 24 heures.

## 8. Choix à deux segments

Pour deux modes exclusifs d'un même écran : Dépense ou Revenu, Jours ou Période.

| Attribut | Valeur |
| --- | --- |
| Hauteur | 40 dp, zone tactile 48 dp |
| Forme | Pilule, contour de 1 dp `#7A8A94` en clair, `#667781` en sombre |
| Segment choisi | Fond `#D8FDD2` en clair, `#103529` en sombre, texte `#0A3D2E` en clair, `#D9FDD3` en sombre, icône `check` de 18 dp |
| Segment au repos | Transparent, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Texte | Roboto 14/20 sp, Medium (500) |

## 9. Calendrier

| Attribut | Valeur |
| --- | --- |
| En-tête | Mois en Roboto 18/24 sp, Medium (500), flèches `chevron_left` et `chevron_right` de 48 dp |
| Jours de la semaine | L M M J V S D, Roboto 12/16 sp, Regular (400), `#54656F` en clair, `#AEBAC1` en sombre ; la semaine commence le lundi |
| Cellule | 7 colonnes égales, 48 dp de haut, chiffre en Roboto 16/24 sp, Regular (400) tabulaire dans un cercle de 40 dp |
| Aujourd'hui | Cercle de 1 dp `#008069` en clair, `#25D366` en sombre |
| Date choisie | Cercle plein `#25D366` (clair et sombre), chiffre `#0B141A` (clair et sombre) |
| Date future | Petit point de 4 dp `#667781` en clair, `#8696A0` en sombre sous le chiffre ; la légende « Prévu » est écrite sous le calendrier |
| Période | Bande `#D8FDD2` en clair, `#103529` en sombre entre le début et la fin |
| TalkBack | « Vendredi 6 novembre, aujourd'hui, sélectionné » |

## 10. Curseur

| Attribut | Valeur |
| --- | --- |
| Rail | 4 dp, pilule ; parcouru dans la couleur du pot ; reste en `#E9EDEF` en clair, `#2A3942` en sombre |
| Poignée | 24 dp, zone tactile 48 dp, anneau de 2 dp `#FFFFFF` en clair, `#0B141A` en sombre |
| Pas | 1 % |
| Boutons − et + | Aux deux extrémités, zone 48 dp, en `#00735E` en clair, `#25D366` en sombre, pour éviter le glissement |
| TalkBack | « Vie courante, 80 %, 96 000 francs CFA, curseur » |

## 11. Interrupteur

| Attribut | Valeur |
| --- | --- |
| Taille | 52 × 32 dp, zone tactile sur toute la ligne, 48 dp au moins |
| Coupé | Rail à contour de 2 dp `#7A8A94` en clair, `#667781` en sombre, poignée de 16 dp `#7A8A94` en clair, `#667781` en sombre |
| Activé | Rail `#008069` en clair, `#25D366` en sombre, poignée de 24 dp `#FFFFFF` en clair, `#0B141A` en sombre |
| Consentement | Jamais activé d'avance pour un usage facultatif |
| TalkBack | « Statistiques d'usage, désactivé » |

