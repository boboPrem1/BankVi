# EC-11 Code

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement ; PC-16 Nouveau téléphone |
| **Lot** | L1 |
| **Bible** | DON-03, DON-06 |
| **Avant** | EC-10 Sauvegarde |
| **Après** | EC-12 Accueil |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp, clavier ouvert |

## 1. Rôle

Vérifier le numéro. Ce code n'est demandé qu'à la création du compte et sur un nouvel appareil, jamais à chaque ouverture.

## 2. Ce qu'on voit

Comme l'écran de vérification de WhatsApp : un titre, le numéro rappelé avec un lien pour le corriger, puis six cases soulignées, centrées, où les chiffres s'affichent à mesure. Sous les cases, un compte à rebours : « Renvoyer le code dans 0:42 ». Le clavier numérique est ouvert. Le bouton « Valider » est juste au-dessus. Quand le SMS arrive sur le téléphone, le code peut se remplir tout seul.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←                                  │ 56
│ Entre le code reçu                 │ 32
│ Envoyé au +228 90 12 34 56.        │
│ Modifier le numéro                 │ 40
│                                    │
│       4   8   2   _   _   _        │ 56
│      ─── ─── ─── ━━━ ─── ───       │
│                                    │
│     Renvoyer le code dans 0:42     │ 48
│                                    │
│ ╭────────────────────────────────╮ │
│ │            Valider             │ │ 48
│ ╰────────────────────────────────╯ │
├────────────────────────────────────┤
│              clavier               │ ≈270
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut, retour seul | 56 dp | 8 dp |
| Titre | 32 dp | 8 dp |
| Numéro et lien | 44 dp | 24 dp |
| Cases | 44 × 56 dp, écart 8 dp, largeur totale 304 dp, centrées | 12 dp |
| Renvoi | 48 dp | 12 dp |
| Pied, bouton seul | 76 dp | — |

Sur un écran de 320 dp, marges de 16 dp : largeur disponible 288 dp, donc cases de 41 dp de large.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Entre le code reçu | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Rappel | Envoyé au +228 90 12 34 56. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Lien | Modifier le numéro | Roboto 14/20 sp, Medium (500), zone 48 dp | `#00735E` en clair, `#25D366` en sombre |
| Chiffre | 4 | Roboto 24/32 sp, Medium (500), tabulaire, centré | `#111B21` en clair, `#E9EDEF` en sombre |
| Trait de case, repos | — | 1 dp | `#7A8A94` en clair, `#667781` en sombre |
| Trait de case active | — | 2 dp | `#008069` en clair, `#25D366` en sombre |
| Trait de case, erreur | — | 2 dp | `#B3261E` en clair, `#F2B8B5` en sombre |
| Renvoi, compte à rebours | Renvoyer le code dans 0:42 | Roboto 14/20 sp, Regular (400), centré | `#54656F` en clair, `#AEBAC1` en sombre |
| Renvoi disponible | Renvoyer le code | Roboto 14/20 sp, Medium (500), centré | `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Valider | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. États

| État | Affichage |
| --- | --- |
| Arrivée | Première case active, compte à rebours à 1:00, bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Lecture automatique | Les six chiffres s'affichent, puis validation immédiate |
| 6 chiffres saisis | Validation immédiate, sans attendre le bouton |
| Validation en cours | Bouton : cercle de 20 dp et « Vérification… », après 300 ms ; cases verrouillées |
| Code erroné | Traits en `#B3261E` en clair, `#F2B8B5` en sombre ; sous les cases, icône `error` et : « Ce code ne marche pas. Vérifie-le ou demande-en un autre. » ; chiffres effacés au prochain appui ; première case active |
| Code expiré, après 10 min | « Ce code a expiré. Demande-en un autre. » ; bouton « Renvoyer le code » disponible |
| 5 essais échoués | Cases verrouillées ; « Trop d'essais. Réessaie dans 15 minutes. Tes données restent sur ce téléphone. » |
| Renvoi disponible | Après 60 s ; le toucher relance le compteur et affiche un bandeau de 4 s : « Code renvoyé. » |
| Sans réseau | Sous les cases, avec `cloud_off`, en `#54656F` en clair, `#AEBAC1` en sombre : « Il faut du réseau pour cette étape. Tes données restent sur ce téléphone. » Bouton actif pour réessayer si le code est complet |
| Service indisponible | Bandeau d'état, fond `#FBE9E7` en clair, `#3C1F1E` en sombre, texte `#B3261E` en clair, `#F2B8B5` en sombre : « La vérification n'a pas abouti. Réessaie dans un instant. » |
| Succès, nouveau compte | Vibration légère, EC-12, bandeau de 4 s : « Tes données sont sauvegardées. » |
| Succès, compte retrouvé | Écran de récupération ci-dessous |
| Succès, compte inactif depuis 90 jours sur un nouveau téléphone, à partir du L2 | EC-53, sans afficher ni télécharger aucune donnée |

### Récupération sur un nouveau téléphone

Écran sans action : au centre, cercle de progression de 40 dp en `#008069` en clair, `#25D366` en sombre, puis « Récupération de tes données… » en Roboto 16/24 sp, Regular (400), `#111B21` en clair, `#E9EDEF` en sombre. Après 3 s : « Ça prend un peu plus de temps. » À la fin, EC-12, identique à l'ancien téléphone. Sans réseau : le message réseau ci-dessus, avec « Réessayer » en bouton principal.

### Numéro déjà associé à un compte, depuis le parcours neuf

Après un code valide, si ce numéro a déjà un compte et que le téléphone contient des chiffres saisis, une feuille basse s'ouvre et ne se ferme pas seule.

| Élément | Texte exact |
| --- | --- |
| Titre | Tu as déjà un compte avec ce numéro |
| Texte | Tes données enregistrées sur ce compte vont remplacer les chiffres que tu viens de saisir sur ce téléphone. |
| Bouton principal | Retrouver mon compte |
| Bouton texte | Utiliser un autre numéro |

« Retrouver mon compte » ouvre la récupération. « Utiliser un autre numéro » revient à EC-10. Les chiffres saisis ne sont effacés qu'à la fin de la récupération réussie.

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Frappe | Remplit les cases de gauche à droite ; effacer revient en arrière |
| Coller | 6 chiffres acceptés, les autres caractères ignorés |
| Toucher les cases | Rouvre le clavier |
| « Modifier le numéro » ou retour | EC-10, numéro conservé |
| « Renvoyer le code » | Nouveau SMS, nouveau délai |
| « Valider » | Vérification ; utile après une erreur réseau |

## 8. Données

| Donnée | Valeur |
| --- | --- |
| Longueur du code | 6 chiffres |
| Validité | 10 minutes |
| Renvoi | Après 60 s |
| Essais | 5, puis 15 minutes d'attente |
| Lecture automatique | API Android sans permission de lecture des SMS |
| Session | Reste ouverte sur l'appareil, sans nouveau SMS à chaque ouverture |
| Après succès | Les données locales partent au serveur par synchronisation, sans action de l'utilisateur |

Ces valeurs de sécurité sont une proposition à confirmer au moment de la conception du serveur.

## 9. Accessibilité

Les six cases forment un seul champ : « Code à 6 chiffres, 3 sur 6 saisis. » Chaque chiffre est annoncé. Le compte à rebours n'est annoncé qu'au moment où le renvoi devient disponible. Erreur annoncée aussitôt.

## 10. Mouvement

Le chiffre apparaît en 100 ms. Pas de secousse en cas d'erreur. Feuille basse en 300 ms. Passage vers l'accueil en fondu de 300 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Environ 298 dp utiles : le titre défile vers le haut ; cases et bouton restent visibles |
| 320 × 568 dp | Cases de 41 dp ; marges de 16 dp |
| Texte à 200 % | Cases plus hautes, chiffre plafonné ; le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`otp_verified`, `otp_failed` avec le motif, `otp_resent`, `account_restored`, `account_conflict`. **Jamais de numéro ni de code** dans les événements.
