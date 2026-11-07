# EC-51 Déverrouillage

| Fiche | |
| --- | --- |
| **Parcours** | PC-22 |
| **Lot** | L1 |
| **Bible** | DON-17 |
| **Avant** | Ouverture de l'app, ou retour après plus d'une minute hors de l'app |
| **Après** | L'écran qui était ouvert ; EC-12 après un démarrage |
| **Cadre** | 360 × 800 dp, portrait, marges de 24 dp |

## 1. Rôle

Cacher les montants quand le téléphone passe entre d'autres mains, sans créer un code de plus à retenir : BankVi utilise l'empreinte ou le code du téléphone.

## 2. Ce qu'on voit

Un écran calme, sans aucun montant : le nom BankVi, un cadenas, une phrase. La demande d'empreinte ou de code d'Android s'ouvre aussitôt par-dessus. Si elle est fermée, le bouton vert « Déverrouiller » la rouvre.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ 09:41                        ▮▮ ▲  │ 24
│                                    │
│               BankVi               │ 24
│                                    │
│                 🔒                 │ 48
│         Tes montants sont          │
│              protégés.             │ 56
│                                    │
│ ╭────────────────────────────────╮ │
│ │          Déverrouiller         │ │ 48
│ ╰────────────────────────────────╯ │
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Marque | 24 dp, à 96 dp du haut | 48 dp |
| Icône | 48 dp, centrée | 16 dp |
| Phrase | 56 dp, centrée | Espace libre |
| Pied, bouton seul | 76 dp | — |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Marque | BankVi | Roboto 18/24 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Icône | `lock` | 48 dp | `#54656F` en clair, `#AEBAC1` en sombre |
| Phrase | Tes montants sont protégés. | Roboto 16/24 sp, Regular (400), centré | `#111B21` en clair, `#E9EDEF` en sombre |
| Bouton principal | Déverrouiller | Roboto 16/24 sp, Medium (500) | Fond `#25D366` (clair et sombre), texte `#0B141A` (clair et sombre) |

La demande d'empreinte ou de code est celle d'Android. Elle n'est pas dessinée ici.

## 6. États

| État | Affichage |
| --- | --- |
| Arrivée | Demande d'Android ouverte aussitôt |
| Demande fermée ou empreinte refusée | L'écran reste affiché avec le bouton ; aucun compteur propre à BankVi : Android gère les essais |
| Empreinte non reconnue | Android propose le code du téléphone |
| Code du téléphone retiré depuis | Le verrouillage se coupe, l'app s'ouvre, et EC-12 affiche : « Ton téléphone n'a plus de code. Le verrouillage de BankVi est coupé. » |
| Sans réseau | Identique : rien ne passe par le réseau |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Réussite | Retour à l'écran qui était ouvert, saisie en cours conservée |
| « Déverrouiller » | Rouvre la demande d'Android |
| Retour | Quitte l'app |

## 8. Données

| Règle | Valeur |
| --- | --- |
| Activation | Facultative, coupée par défaut, proposée une fois (EC-52) |
| Quand demander | À chaque démarrage ; après plus d'une minute hors de l'app |
| Ce que BankVi garde | Le réglage seul. Ni empreinte ni code : ils restent chez Android |
| Notifications, verrouillage actif | Sans montant : « Ton statut du jour est prêt. » |
| Aperçu dans les apps récentes, verrouillage actif | Masqué. Sur Android, ce réglage bloque aussi les captures d'écran |

## 9. Accessibilité

À l'arrivée, TalkBack annonce : « BankVi est verrouillée. » Le bouton reste atteignable si la demande d'Android est fermée, et le code du téléphone remplace toujours l'empreinte. L'icône est décorative.

## 10. Mouvement

Aucun. Le passage à l'écran suivant se fait sans transition pour ne pas laisser voir de montant.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marque à 48 dp du haut, marges de 16 dp |
| Texte à 200 % | La phrase s'allonge ; le contenu défile, le bouton reste visible |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`app_unlocked` et `app_unlock_cancelled`, sans donnée biométrique. Sert à vérifier que le verrouillage ne gêne pas la saisie.
