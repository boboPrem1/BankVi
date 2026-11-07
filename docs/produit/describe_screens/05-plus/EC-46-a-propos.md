# EC-46 À propos

| Fiche | |
| --- | --- |
| **Parcours** | Conformité |
| **Lot** | L1 |
| **Bible** | LEG-03, LEG-01, LEG-02 |
| **Avant** | EC-37 |
| **Après** | Pages de texte, EC-37 |
| **Cadre** | 360 × 800 dp, plein écran, marges de 16 dp |

## 1. Rôle

Dire qui édite l'app, ce qu'elle n'est pas, et comment contacter quelqu'un.

## 2. Ce qu'on voit

La marque BankVi, sa version, puis une mention nette dans une bulle : « Outil d'information, ni conseil financier ni conseil comptable. » Dessous, une liste : Mentions légales, Confidentialité, Conditions d'utilisation, Licences, Contact.

## 3. Maquette

```text
┌────────────────────────────────────┐
│ ←  À propos                        │ 56
│ BankVi                             │ 24
│ Version 1.0.0                      │ 20
│ ╭──────────────────────────────╮   │
│ ┆ Outil d'information, ni conseil│ │ 56
│ │ financier ni conseil comptable.│ │
│ ╰──────────────────────────────╯   │
│ Mentions légales                 › │ 56
│ Confidentialité                  › │ 56
│ Conditions d'utilisation         › │ 56
│ Licences                         › │ 56
│ Contact                          › │ 56
└────────────────────────────────────┘
```

## 4. Structure et mesures

| Bloc | Hauteur | Écart après |
| --- | --- | --- |
| Barre du haut | 56 dp | 8 dp |
| Marque | 24 dp | 0 |
| Version | 20 dp | 12 dp |
| Bulle | 56 dp | 16 dp |
| Lignes | 56 dp | 0 |

## 5. Éléments

| Élément | Texte exact | Style | Couleur |
| --- | --- | --- | --- |
| Fond | — | — | `#FFFFFF` en clair, `#0B141A` en sombre |
| Titre | À propos | Roboto 22/28 sp, Medium (500) | `#111B21` en clair, `#E9EDEF` en sombre |
| Marque | BankVi | Roboto 18/24 sp, Medium (500) | `#00735E` en clair, `#25D366` en sombre |
| Version | Version 1.0.0 | Roboto 12/16 sp, Regular (400) | `#54656F` en clair, `#AEBAC1` en sombre |
| Bulle | Outil d'information, ni conseil financier ni conseil comptable. | Roboto 14/20 sp, Regular (400), haut gauche 4 dp | Fond `#F0F2F5` en clair, `#202C33` en sombre, texte `#111B21` en clair, `#E9EDEF` en sombre |
| Ligne | Mentions légales | Roboto 16/24 sp, Regular (400), `chevron_right` | `#111B21` en clair, `#E9EDEF` en sombre |
| Séparateur | — | 1 dp | `#E9EDEF` en clair, `#2A3942` en sombre |

## 6. Contenu à fournir

Ces textes **restent à rédiger et à faire valider par le juriste**. Aucun n'est inventé ici.

| Page | À remplir |
| --- | --- |
| Mentions légales | [NOM DE LA SOCIÉTÉ], [FORME], [ADRESSE], [NUMÉRO RCCM] |
| Confidentialité | Données, finalités, hébergement, droits, récépissé IPDCP [NUMÉRO] |
| Conditions | Texte du juriste |
| Licences | Roboto, Material Symbols et autres composants tiers |
| Contact | [ADRESSE DE CONTACT] |

## 7. États

| État | Affichage |
| --- | --- |
| Version de test | Version 1.0.0, test |
| Pages hors ligne | Copies intégrées à l'app, lisibles sans réseau |
| Contact | Ouvre l'application de messagerie |

## 8. Gestes et navigation

Toucher une ligne ouvre la page de texte, en Roboto 14/20 sp, Regular (400), sur `#FFFFFF` en clair, `#0B141A` en sombre, avec une barre du haut et le retour. Retour : EC-37. Appui prolongé sur la version : aucun menu caché.

## 9. Données

Aucune saisie. La version est lue depuis l'app.

## 10. Accessibilité

La mention est lue juste après la version. Les pages de texte utilisent de vrais titres et respectent le grossissement du texte.

## 11. Mouvement

Entrée d'écran standard.

## 12. Autres formats

| Cas | Adaptation |
| --- | --- |
| 320 × 568 dp | Marges de 16 dp |
| Texte à 200 % | Lignes plus hautes |
| Thème sombre | Valeurs ci-dessus |

## 13. Mesure

Aucune, en dehors de `menu_item_opened` sur EC-37.
