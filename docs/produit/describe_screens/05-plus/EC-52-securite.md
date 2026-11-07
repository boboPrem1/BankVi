# EC-52 Sécurité

| Fiche | |
| --- | --- |
| **Parcours** | PC-22, PC-23 |
| **Lot** | L1 pour le verrouillage ; L2 pour le numéro et l'e-mail de secours |
| **Bible** | DON-17, DON-18, DON-19 |
| **Avant** | EC-37 |
| **Après** | EC-37, EC-10, EC-11 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Protéger les montants sur un téléphone prêté, et éviter de perdre son compte avec son numéro.

## 2. Ce qu'on voit

Une liste de réglages. Un interrupteur pour le verrouillage, coupé par défaut. Dessous, le numéro du compte avec « Changer », puis l'e-mail de secours avec « Ajouter ». Pas de bouton vert.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Sécurité                        │ 56
│ Verrouiller l'app            (○ ) │ 72
│ Avec ton empreinte ou le code      │
│ de ton téléphone.                  │
│ ────────────────────────────────── │
│ Mon numéro                 Changer │ 72
│ +228 90 12 34 56                   │
│ ────────────────────────────────── │
│ E-mail de secours          Ajouter │ 72
│ Pour retrouver ton compte si tu    │
│ perds ton numéro.                  │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Ligne | 72 dp au moins | 0, avec séparateur |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Sécurité | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Titre de ligne | Verrouiller l'app ; Mon numéro ; E-mail de secours | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Description | Avec ton empreinte ou le code de ton téléphone. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Numéro | +228 90 12 34 56 | Roboto 14/20 sp, Regular (400), tabulaire | `#54656F` en clair, `#AEBAC1` en sombre |
| Action de ligne | Changer ; Ajouter ; Modifier | Roboto 14/20 sp, Medium (500), zone 48 dp | `#00735E` en clair, `#25D366` en sombre |
| Séparateur | — | 1 dp | `#E9EDEF` en clair, `#2A3942` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| Lot 1 | Seule la ligne « Verrouiller l'app » s'affiche. Une aide en cas de numéro perdu passe par le contact de EC-46 |
| Téléphone sans code | L'interrupteur reste coupé. Dialogue : « Choisis d'abord un code pour ton téléphone. » Boutons : Plus tard, Ouvrir les réglages |
| Sans compte | Numéro et e-mail remplacés par : « Crée d'abord ta sauvegarde. » Lien vers EC-10 |
| E-mail ajouté | Adresse affichée, action « Modifier » |
| E-mail à vérifier | Vérifie ton e-mail. Lien : Renvoyer le code |
| Sans réseau | Le verrouillage marche. Numéro et e-mail : « Il faut du réseau pour cette étape. Tes données restent sur ce téléphone. » |

### Proposition unique du verrouillage

À la deuxième ouverture de l'app, une feuille basse s'ouvre une seule fois, jamais pendant une saisie. Coins hauts 28 dp, fond `#FFFFFF` en clair, `#202C33` en sombre, voile `rgba(11,20,26,0.40)` en clair, `rgba(0,0,0,0.60)` en sombre.

| Élément | Texte exact |
| --- | --- |
| Titre | Protège tes montants |
| Texte | Si ton téléphone se prête, BankVi peut demander ton empreinte ou ton code à l'ouverture. |
| Bouton principal | Activer |
| Bouton texte | Plus tard |

« Plus tard » ne repropose rien : le réglage reste ici.

### Changer de numéro

| Étape | Comportement |
| --- | --- |
| 1 | EC-10 s'ouvre, titre : « Ton nouveau numéro » |
| 2 | EC-11 vérifie le nouveau numéro |
| 3 | Bandeau de 4 s : « Ton numéro est changé. Tes données n'ont pas bougé. » |
| Numéro déjà pris | « Ce numéro a déjà un compte. Il faut d'abord le supprimer, ou choisir un autre numéro. » Jamais de fusion |

### Ajouter un e-mail

Un champ souligné, libellé « Ton e-mail », puis six cases pour le code reçu, comme EC-11. Bouton vert : « Recevoir mon code ». Mention : « Il sert seulement à retrouver ton compte. Jamais de publicité. »

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Interrupteur, pour activer | Demande d'Android ; activé seulement si elle réussit |
| Interrupteur, pour couper | Demande d'Android, puis coupé |
| « Changer » | EC-10, puis EC-11 |
| « Ajouter » | Saisie de l'e-mail, puis code |
| Retour | EC-37 |

## 8. Données

| Élément | Valeur |
| --- | --- |
| Verrouillage | Réglage local au téléphone |
| Changement de numéro | Possible seulement depuis un téléphone déjà connecté ; un SMS informe l'ancien numéro |
| E-mail | Facultatif, vérifié par un code de 6 chiffres, 10 minutes, 5 essais. Sur le serveur, jamais dans les statistiques. **Déclaration et mention à valider avec le juriste** |

## 9. Accessibilité

Interrupteur : « Verrouiller l'app, avec ton empreinte ou le code de ton téléphone, désactivé ». Actions annoncées avec leur objet : « Changer mon numéro », « Ajouter un e-mail de secours ». Numéro lu chiffre par chiffre.

## 10. Mouvement

Interrupteur en 100 ms, feuille en 300 ms, aucune autre animation.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp, action sous le titre si besoin |
| Texte à 200 % | Hauteur libre, action sous le titre ; le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`lock_prompt_answered`, `lock_toggled`, `number_changed`, `recovery_email_added`, sans numéro ni adresse.
