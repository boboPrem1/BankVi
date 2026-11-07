# EC-53 Numéro perdu

| Fiche | |
| --- | --- |
| **Parcours** | PC-23 |
| **Lot** | L2 |
| **Bible** | DON-06, DON-19, DON-20 |
| **Avant** | EC-10, avec « J'ai perdu ce numéro » ; EC-11, si le compte est inactif depuis 90 jours |
| **Après** | EC-10 et EC-11 pour le nouveau numéro, puis EC-12 |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp, clavier ouvert |

## 1. Rôle

Rendre son compte à la bonne personne quand le numéro ne suffit plus, et empêcher le nouveau titulaire d'un numéro réattribué de voir les données de l'ancien.

## 2. Ce qu'on voit

Un titre, une phrase et un champ pour l'e-mail de secours. Après l'envoi, six cases pour le code. Un lien permet de contacter BankVi si aucun e-mail n'a été ajouté.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←                                  │ 56
│ Retrouve ton compte                │ 32
│ Saisis ton ancien numéro et ton    │
│ e-mail de secours.                 │ 40
│ Ancien numéro                      │ 20
│ +228   90 12 34 56                 │ 32
│ Ton e-mail                         │ 20
│ camille@exemple.tg                 │ 32
│ Je n'ai pas ajouté d'e-mail        │ 48
│ ╭────────────────────────────────╮ │
│ │       Recevoir mon code        │ │ 48
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
| Aide | 40 dp | 24 dp |
| Champ numéro | 56 dp | 12 dp |
| Champ e-mail | 56 dp | 8 dp |
| Lien | 48 dp | 12 dp |
| Pied, bouton seul | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Retrouve ton compte | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Aide | Saisis ton ancien numéro et ton e-mail de secours. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Libellés | Ancien numéro ; Ton e-mail | Roboto 14/20 sp, Medium (500) | Actif `#008069` en clair, `#25D366` en sombre ; repos `#54656F` en clair, `#AEBAC1` en sombre |
| Valeurs | +228 90 12 34 56 ; camille@exemple.tg | Roboto 16/24 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre |
| Soulignement | — | Actif 2 dp ; repos 1 dp ; erreur 2 dp | `#008069` en clair, `#25D366` en sombre ; `#7A8A94` en clair, `#667781` en sombre ; `#B3261E` en clair, `#F2B8B5` en sombre |
| Lien | Je n'ai pas ajouté d'e-mail | Roboto 14/20 sp, Medium (500), zone 48 dp | `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Recevoir mon code | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

## 6. Variante : compte inactif depuis 90 jours

Ouverte après un code valide sur EC-11, sur un nouveau téléphone. Le numéro est connu : le champ du numéro disparaît. Aucune donnée du compte n'est affichée ni téléchargée avant la vérification.

| Élément | Texte exact |
| --- | --- |
| Titre | Vérifions que c'est bien toi |
| Aide | Ce compte n'a pas servi depuis longtemps. Saisis son e-mail de secours. |
| Lien | Ce n'est pas mon compte |
| Résultat du lien | Dialogue : « Ouvrir un nouveau compte avec ce numéro ? Tu pars de zéro. » Boutons : Annuler, Nouveau compte |

## 7. États

| État | Affichage |
| --- | --- |
| Indicatif | Sélecteur des 8 pays de l'UEMOA, Togo par défaut, comme EC-10 |
| Arrivée | Premier champ actif, bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| Code envoyé | Six cases, 44 × 56 dp : « Entre le code reçu par e-mail », « Renvoyer le code dans 0:42 » |
| Numéro ou e-mail inconnu | Même écran de code que si tout était juste, pour ne pas révéler qu'un compte existe. L'e-mail n'arrive que si le couple est bon |
| Code valide | EC-10 : « Ton nouveau numéro », puis EC-11, puis la récupération de EC-11, puis EC-12 |
| 5 essais échoués | Trop d'essais. Réessaie dans 15 minutes. |
| « Je n'ai pas ajouté d'e-mail » | Ce texte : « Sans e-mail, on ne peut pas vérifier que le compte est à toi. Écris-nous : on ne promet pas de le retrouver. » Bouton à contour : Contacter BankVi |
| Sans réseau | Il faut du réseau pour cette étape. |

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| « Recevoir mon code » | Envoie un code à l'e-mail de secours |
| « Contacter BankVi » | Le contact de EC-46 |
| Retour | Écran précédent, valeurs conservées |

## 9. Données

| Élément | Règle |
| --- | --- |
| Seuil d'inactivité | 90 jours sans synchronisation, à calibrer. Ne s'applique qu'à un nouveau téléphone |
| Après récupération | Le nouveau numéro remplace l'ancien ; le numéro perdu se libère ; un SMS informe l'ancien numéro |
| Nouveau compte sur un numéro réattribué | L'ancien compte est gelé, sans numéro, et reste récupérable par e-mail. **Durée de conservation à confirmer avec le juriste** |

Le délai d'inactivité avant la désactivation d'un numéro n'a pas été confirmé : **le seuil de 90 jours est à vérifier auprès de l'ARCEP et des opérateurs.**

## 10. Accessibilité

Vrais libellés, adresse lue caractère par caractère, erreurs annoncées. Clavier e-mail sur le champ d'adresse. Remplissage automatique de l'e-mail autorisé.

## 11. Mouvement

Entrée d'écran standard. Apparition des cases en fondu de 200 ms.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp, cases de 41 dp |
| Texte à 200 % | Le contenu défile, le bouton reste visible |
| Thème sombre | Valeurs ci-dessus |

## 13. Mesure

`recovery_started`, `recovery_completed`, `recovery_no_email`, `inactive_account_check`, sans numéro ni adresse. Le nombre de `recovery_no_email` dira si l'e-mail est assez proposé.
