# EC-45 Mes données

| Fiche | |
| --- | --- |
| **Parcours** | PC-18 |
| **Lot** | L1 ; l'export mis en forme en L2 |
| **Bible** | DON-05, DON-07, DON-09, DON-11, DON-16, LEG-05, MES-01 |
| **Avant** | EC-37 |
| **Après** | EC-37, EC-10 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Dire clairement où sont les données, permettre de les emporter et de tout supprimer. Une promesse de confiance, gratuite.

## 2. Ce qu'on voit

D'abord l'état : « Sauvegardé, à l'instant ». Deux blocs simples : ce qui est sur le serveur, ce qui reste sur le téléphone. Un interrupteur, coupé par défaut, pour partager des statistiques d'usage. Puis « Exporter en CSV », et, tout en bas, en rouge, « Supprimer mon compte ». Pas de bouton vert.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  Mes données                     │ 56
│ ☁ Sauvegardé, à l'instant          │ 40
│ Sur notre serveur                  │ 24
│ Tes saisies, poches, recettes,     │ 40
│ revenus et charges.                │
│ Seulement sur ce téléphone         │ 24
│ Tes habitudes. Elles se recalculent│ 40
│ sur un nouveau téléphone.          │
│ ────────────────────────────────── │
│ Statistiques d'usage         (○ ) │ 72
│ Sans montant ni libellé.           │
│ ────────────────────────────────── │
│ ⇩ Exporter en CSV           Gratuit│ 56
│ ⇩ Export mis en forme     Pass Plus│ 56
│ ────────────────────────────────── │
│ Supprimer mon compte               │ 48
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| État | 40 dp | 12 dp |
| Blocs d'explication | 64 dp chacun | 12 dp |
| Interrupteur | 72 dp | 12 dp |
| Lignes d'export | 56 dp | 12 dp |
| Supprimer | 48 dp | 24 dp |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | Mes données | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| État | Sauvegardé, à l'instant ; icône `cloud_done` | Roboto 14/20 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Titres de bloc | Sur notre serveur ; Seulement sur ce téléphone | Roboto 16/24 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Texte de bloc | Tes saisies, poches, recettes, revenus et charges. | Roboto 14/20 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Interrupteur | Statistiques d'usage / Sans montant ni libellé. | Roboto 16/24 sp, Medium (500), Roboto 14/20 sp, Regular (400) | `#111B21` en clair, `#E9EDEF` en sombre, `#54656F` en clair, `#AEBAC1` en sombre |
| Export | Exporter en CSV, Export mis en forme | Roboto 16/24 sp, Regular (400), icône `download` | `#111B21` en clair, `#E9EDEF` en sombre |
| Marques | Gratuit, Pass Plus | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bouton destructif | Supprimer mon compte | Roboto 14/20 sp, Medium (500) | `#B3261E` en clair, `#F2B8B5` en sombre |

## 6. États

| État | Affichage |
| --- | --- |
| Sans compte | État : Seulement sur ce téléphone. Bouton vert : Sauvegarder (EC-10). « Supprimer mon compte » devient « Effacer mes données » |
| Sync en attente | Enregistré sur ce téléphone. Sera sauvegardé dès que possible. Sans alerte |
| Export mis en forme, L1 | Absent |
| Export mis en forme, L2, sans pass | Visible, le toucher ouvre EC-41 |
| Sans réseau | La suppression demande du réseau : « Il faut du réseau pour cette étape. Tes données restent sur ce téléphone. » |
| Hors ligne | L'export CSV fonctionne : le fichier est créé sur le téléphone |

## 7. Gestes et navigation

| Geste | Résultat |
| --- | --- |
| Interrupteur | Change aussitôt ; **coupé par défaut, jamais coché d'avance** |
| « Exporter en CSV » | Crée le fichier ; ouvre la feuille de partage Android |
| « Supprimer mon compte » | Écran récapitulatif, puis dialogue |
| Retour | EC-37 |

### Supprimer mon compte

| Étape | Texte exact |
| --- | --- |
| Récapitulatif | Tu vas supprimer tes saisies, poches, recettes, habitudes et ton compte. Pense à exporter tes données avant. |
| Bouton | Exporter en CSV (à contour) ; Continuer (texte en `#B3261E` en clair, `#F2B8B5` en sombre) |
| Dialogue | Supprimer définitivement ? Cette action ne s'annule pas. Boutons : Annuler, Supprimer en `#B3261E` en clair, `#F2B8B5` en sombre |
| Pass en cours | Mention : « Ton pass en cours se termine avec ton compte. » |
| Fin | Retour à EC-01, avec le bandeau « Ton compte est supprimé. » |

C'est l'une des seules confirmations de l'app : l'action est irréversible.

## 8. Données

| Élément | Valeur |
| --- | --- |
| Serveur | Saisies, poches, recettes, revenus et charges, chiffrés au repos ; accès limités et journalisés |
| Téléphone seul | Habitudes, recalculées depuis les saisies |
| CSV | Date, type, montant, poche, catégorie, nature, description, origine |
| Format du CSV | UTF-8 avec BOM, séparateur point-virgule pour Excel en français, dates AAAA-MM-JJ, montants entiers et positifs (le type donne le sens) |
| Protection du CSV | Un texte qui commence par =, +, -, @, une tabulation ou un retour à la ligne est précédé d'une apostrophe : un libellé ne s'exécute jamais comme une formule |
| Statistiques | Événements sans montant ni libellé |
| Délai de conservation légal | **À confirmer avec le juriste** |

## 9. Accessibilité

Interrupteur : « Statistiques d'usage, sans montant ni libellé, désactivé ». Dialogue avec focus sur Annuler. Le mot rouge n'est pas seul : « Supprimer » le dit.

## 10. Mouvement

Pas d'animation sur les étapes de suppression. Le cercle de chargement apparaît après 300 ms.

## 11. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Marques sous les libellés ; le contenu défile |
| Thème sombre | Valeurs ci-dessus |

## 12. Mesure

`data_exported`, avec le format ; `telemetry_toggled` ; `account_deleted`, sans donnée personnelle. Si la personne n'a pas consenti, aucune statistique d'usage n'est envoyée.
