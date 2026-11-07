# Principes et référence WhatsApp

## 1. Sept principes

1. **Le familier avant l'original.** Un geste connu de WhatsApp vaut mieux qu'une trouvaille. BankVi se distingue par son chiffre du jour, pas par ses composants.
2. **Le vert veut dire « agir ».** Il n'est ni un décor ni un fond. Sur un écran ordinaire, il occupe moins de 10 % de la surface.
3. **Une seule décision par écran.** Un bouton principal, en bas, sous le pouce. Le reste s'efface.
4. **Le chiffre est le héros.** Il a la plus grande taille de l'écran, et il n'y en a qu'un.
5. **Les faits, sans jugement.** Aucun rouge pour de l'argent qui manque, aucune félicitation appuyée, aucun « tu devrais ».
6. **Le plaisir sans la pression.** Beau, vivant et agréable à toucher, comme un réseau social, mais sans série de jours, ni points, ni comparaison ([détail](17-statut-et-experience.md)).
7. **Léger partout.** Téléphone d'entrée de gamme, soleil de Lomé, réseau instable : police système, aucune image lourde, contrastes élevés.

## 2. Ce qu'on reprend de WhatsApp

| Convention WhatsApp | Dans BankVi |
| --- | --- |
| Accueil : illustration au centre, titre, bouton vert en bas | EC-01 Bienvenue |
| Numéro de téléphone avec indicatif, champ souligné | EC-10 Sauvegarde |
| Code reçu par SMS à 6 chiffres, renvoi après un délai, lecture automatique | EC-11 Code |
| Bouton vert en pilule avec texte sombre | Bouton principal |
| Barre du haut sobre, sur le même fond que l'écran, titre à gauche | Tous les écrans |
| Barre de navigation en bas, onglet actif sur une pastille verte pâle | Aujourd'hui, Horizon, Pots, Plus |
| Statut avec anneau et segments à toucher | Statut du jour, avec paysage généré (EC-50) |
| Lignes avec avatar rond, titre, sous-titre et valeur à droite | Poches, charges, saisies |
| Puces de filtre arrondies | Propositions de charges, dates, heures |
| Bulles à un coin aplati, ombre très fine | Explications de l'app ; dépenses en messages sortants, revenus en messages entrants |
| Feuille basse à coins arrondis | Ajout d'une charge, « Pourquoi cette suggestion ? » |
| Bandeau bas temporaire | « Annuler » pendant 10 secondes |
| Thème sombre très profond, sans teinte grise verdâtre | Thème sombre complet |
| Icônes rondes à contour, pleines quand elles sont actives | Toute l'iconographie |
| Illustrations arrondies à contour noir | Bienvenue, états vides |

## 3. Ce qu'on ne reprend pas

Les règles de marque de Meta interdisent notamment de suggérer un partenariat ou une approbation, d'utiliser des images proches du logo au téléphone, et de reprendre le nom dans une marque ou un domaine.

| Écarté | Raison |
| --- | --- |
| Logo WhatsApp, combiné dans une bulle, ou image proche | Règle de marque de Meta |
| Icône de l'app ronde ou en bulle verte avec un téléphone | Risque de confusion, et refus possible sur Google Play pour usurpation |
| Le mot « WhatsApp » dans le nom, la fiche Play ou le domaine | Règle de marque de Meta |
| Mention « comme WhatsApp », « par WhatsApp » ou « compatible » | Suggère un lien qui n'existe pas |
| Motif de fond (doodle) du chat | Élément très reconnaissable, sans utilité ici |
| Queue de bulle identique et coches de lecture | Sans utilité : BankVi n'envoie pas de messages |
| Fond beige `#EFE7DD` du chat | Le bilan du soir en bulles garde le fond de l'app, plus sobre |

Le mot « WhatsApp » n'apparaît dans l'app que là où il décrit un fait : « Partager sur WhatsApp » (EC-35) et « Donner mon avis » vers le groupe de test (EC-37). Il s'écrit alors dans la police et la taille du texte qui l'entoure, sans logo modifié.

**À faire confirmer :** ce que j'ai lu de Meta vise le nom et le logo, pas les couleurs ou la mise en page. Rien n'en garantit pour autant l'absence de risque, notamment au titre de la présentation d'ensemble d'un produit. Ce point s'ajoute aux questions du juriste togolais (VAL-05), avant la soumission sur Google Play.

## 4. Ce qu'on adapte, et pourquoi

| Point | WhatsApp | BankVi | Raison |
| --- | --- | --- | --- |
| Texte en vert sur blanc | Vert moyen, environ `#128C7E` à `#008069` | `#00735E` en clair, `#25D366` en sombre | `#128C7E` donne 4,14:1 sur blanc et `#008069` 4,36:1 sur `#F0F2F5` : c'est sous le seuil de 4,5:1. |
| Texte secondaire | `#667781` partout | `#54656F` en clair, `#AEBAC1` en sombre | `#667781` donne 4,14:1 sur `#F0F2F5` en clair |
| Texte sur le bouton vert | Sombre | `#0B141A` (clair et sombre) | Le blanc sur `#25D366` ne donne que 1,98:1 |
| Chiffre très grand | Inexistant | Roboto 48/56 sp, Bold (700) | C'est la raison d'être de l'app |
| Courbes et barres de pots | Inexistantes | [Fichier 13](13-graphiques-et-montants.md) | Besoin propre à BankVi |
| Action de l'accueil | Bouton flottant vert | [Barre d'action fixe](10-composants-actions.md#5-barre-daction) | Le soir, deux actions : deux boutons flottants cacheraient le contenu |
| Bouton pleine largeur | Largeur réduite sur certains écrans | Pleine largeur moins les marges | Usage à une main, cible plus sûre |

## 5. Vérifications avant de valider un écran

- [ ] Un seul bouton vert.
- [ ] Un seul chiffre héros, ou aucun.
- [ ] Le rouge n'apparaît que pour une erreur de saisie ou une action destructive.
- [ ] Aucune cible tactile sous 48 dp.
- [ ] Clair et sombre décrits.
- [ ] Texte à 200 % : rien de coupé.
- [ ] Hors ligne : écran utilisable, sans message d'erreur.
- [ ] Aucun logo, motif ou libellé qui suggère un lien avec WhatsApp.
