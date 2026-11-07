# EC-10 Sauvegarde

| Fiche | |
| --- | --- |
| **Parcours** | PC-01 Premier lancement ; PC-16 Nouveau téléphone |
| **Lot** | L1 |
| **Bible** | DON-03, DON-05, DON-06, DON-20, LEG-05 |
| **Avant** | EC-09 Quand noter, ou EC-01 avec « J'ai déjà un compte » |
| **Après** | EC-11 Code · EC-12 Accueil avec « Plus tard » |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp, clavier ouvert |

## 1. Rôle

Proposer de créer un compte seulement après la valeur, pour une raison concrète : retrouver ses données en changeant de téléphone. L'étape reste facultative.

## 2. Ce qu'on voit

Le même dépouillement que l'inscription de WhatsApp : un titre, une phrase, puis un champ souligné, « +228 » à gauche et le numéro à droite. Le clavier téléphonique est ouvert. Une petite mention indique le stockage et les conditions, avec deux liens. Au-dessus du clavier : le bouton vert « Recevoir mon code ». Plus haut, le lien « Plus tard » reste à portée.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│ ←                                  │ 56
│ Garde tes données même si tu       │
│ changes de téléphone.              │ 64
│ On t'envoie un code par SMS, une   │
│ seule fois.                        │ 40
│                                    │
│ Ton numéro                         │ 20
│ +228   90 12 34 56|                │ 32
│ ────   ━━━━━━━━━━━━━━━━━━━━━━━━━   │  2
│                                    │
│ Tes chiffres seront aussi gardés   │
│ sur notre serveur. En continuant,  │ 48
│ tu acceptes les conditions et la   │
│ politique de confidentialité.      │
│              Plus tard             │ 48
│ ╭────────────────────────────────╮ │
│ │      Recevoir mon code         │ │ 48
│ ╰────────────────────────────────╯ │
├────────────────────────────────────┤
│              clavier               │ ≈270
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut, retour seul | 56 dp | 8 dp |
| Titre | 64 dp | 8 dp |
| Aide | 40 dp | 24 dp |
| Libellé | 20 dp | 4 dp |
| Champ numéro | 56 dp | 12 dp |
| Mention | 64 dp | 4 dp |
| Plus tard | 48 dp | 4 dp |
| Pied, bouton seul | 76 dp | — |

Le contenu défile derrière le pied si le clavier réduit l'espace.

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Garde tes données même si tu changes de téléphone. | Roboto 24/32 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Aide | On t'envoie un code par SMS, une seule fois. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Libellé | Ton numéro | Roboto 14/20 sp, Medium (500) | Actif `#008069` en clair, `#25D366` en sombre ; repos `#54656F` en clair, `#AEBAC1` en sombre |
| Indicatif | +228 | Roboto 16/24 sp, Regular (400), 64 dp, non modifiable | `#111B21` en clair, `#E9EDEF` en sombre ; trait 1 dp `#7A8A94` en clair, `#667781` en sombre |
| Numéro | 90 12 34 56 | Roboto 16/24 sp, Regular (400), tabulaire, groupes de deux | `#111B21` en clair, `#E9EDEF` en sombre |
| Placeholder | 90 00 00 00 | Roboto 16/24 sp, Regular (400) | `#667781` en clair, `#8696A0` en sombre |
| Soulignement | — | Actif 2 dp ; erreur 2 dp | `#008069` en clair, `#25D366` en sombre ; `#B3261E` en clair, `#F2B8B5` en sombre |
| Mention | Tes chiffres seront aussi gardés sur notre serveur. En continuant, tu acceptes les conditions et la politique de confidentialité. | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre ; liens `#00735E` en clair, `#25D366` en sombre, soulignés |
| Bouton texte | Plus tard | Roboto 14/20 sp, Medium (500), centré | `#00735E` en clair, `#25D366` en sombre |
| Bouton principal | Recevoir mon code | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

Aucune case à cocher pré-cochée, et aucun consentement facultatif sur cet écran. **Le texte de la mention est à faire valider par le juriste.**

## 6. Variante : j'ai déjà un compte

Ouverte depuis EC-01.

| Élément | Différence |
| --- | --- |
| Titre | Retrouve tes données |
| Aide | Saisis le numéro de ton compte. On t'envoie un code par SMS. |
| Mention | Tu as déjà accepté les conditions et la politique de confidentialité. Le texte reste accessible avec les mêmes liens. |
| Plus tard | Absent. La sortie se fait par la flèche |
| Lien, à partir du L2 | J'ai perdu ce numéro : ouvre EC-53 |
| Retour | EC-01 |

## 7. États

| État | Affichage |
| --- | --- |
| Arrivée | Champ actif, clavier ouvert, bouton désactivé (fond `#E9EDEF` en clair, `#202C33` en sombre, texte `#667781` en clair, `#8696A0` en sombre) |
| 8 chiffres saisis | Bouton actif |
| Moins de 8 chiffres et sortie du champ | Sous le champ, en `#B3261E` en clair, `#F2B8B5` en sombre : « Il faut 8 chiffres. » |
| Envoi en cours | Dans le bouton : cercle de 20 dp et « Envoi… », après 300 ms ; champ verrouillé |
| Sans réseau | Sous le champ : « Il faut du réseau pour cette étape. Tes données restent sur ce téléphone. », en `#54656F` en clair, `#AEBAC1` en sombre avec icône `cloud_off`. « Plus tard » reste actif. Une tentative s'échoue sans blocage |
| Service indisponible | Bandeau d'état, fond `#FBE9E7` en clair, `#3C1F1E` en sombre, texte `#B3261E` en clair, `#F2B8B5` en sombre : « Le code n'a pas pu partir. Réessaie dans un instant. Tes données restent sur ce téléphone. » |
| Trop de demandes | Sous le champ : « Trop de demandes pour ce numéro. Réessaie dans 15 minutes. » |
| Retour depuis EC-11 | Numéro conservé |
| Indicatif, à partir du L2 | « +228 » devient un sélecteur avec `arrow_drop_down`, Togo par défaut ; il ouvre une feuille basse avec les 8 pays. L'erreur devient : « Ce numéro n'a pas la bonne longueur pour ce pays. » |

## 8. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Frappe | Mise en groupes en direct, 8 chiffres au plus ; le collage retire « +228 » et les espaces |
| « Recevoir mon code » | Envoi du SMS, puis EC-11 |
| « Plus tard » | EC-12 sans compte ; rappel unique à la prochaine valeur |
| Lien conditions ou confidentialité | Page dans une feuille web in-app ; le retour revient ici, valeur conservée |
| Flèche ou retour | Écran précédent |

## 9. Données

| Donnée | Règle |
| --- | --- |
| Numéro, L1 | 8 chiffres, Togo uniquement. Aucun filtrage par préfixe |
| Numéro, à partir du L2 | Les 8 pays de l'UEMOA : Bénin +229, Burkina Faso +226, Côte d'Ivoire +225, Guinée-Bissau +245, Mali +223, Niger +227, Sénégal +221, Togo +228. Longueur vérifiée par pays avec une bibliothèque tenue à jour (libphonenumber), jamais en dur |
| Stockage | Le numéro part au serveur seulement au toucher de « Recevoir mon code » |
| Plus tard | Les données restent sur le téléphone. Elles ne sont pas protégées en cas de perte |
| Le rappel | Un seul, à la prochaine valeur, par exemple après le premier bilan |

**Exemple.** Camille : +228 90 12 34 56.

## 10. Accessibilité

Titre déclaré. Champ : « Ton numéro, indicatif plus deux cent vingt-huit, champ de saisie. » Lecture du numéro chiffre par chiffre. La mention est lue avant le bouton, et ses liens sont atteignables séparément. Les erreurs sont annoncées.

## 11. Mouvement

Entrée d'écran standard, clavier ouvert à la fin de la transition. Aucune autre animation.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 360 × 640 dp | Environ 298 dp utiles : le titre défile vers le haut quand le champ est actif ; champ et bouton restent visibles |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | « +228 » reste à côté du numéro ; la mention s'allonge ; le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 13. Mesure

`account_step_viewed`, `otp_requested`, `account_postponed`. Le numéro n'apparaît **jamais** dans les événements.
