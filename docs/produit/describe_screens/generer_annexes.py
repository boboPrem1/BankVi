#!/usr/bin/env python3
"""Rend chaque fiche d'écran autonome.

Ajoute en bas de chaque fiche une annexe générée depuis le design system, le
parcours, la bible et l'index du dossier : philosophie, fondations, composants
utilisés, rédaction, accessibilité, contexte produit et critères de fin.

    python generer_annexes.py             écrit les annexes
    python generer_annexes.py --verifier  échoue si une annexe n'est plus à jour

Les règles se changent dans leur document source, jamais dans une annexe : on
relance ensuite ce script.
"""
import glob
import os
import re
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
PRODUIT = os.path.dirname(ICI)
DS = os.path.join(ICI, "00-design-system")
DEBUT_TETE = "<!-- fiche-autonome:debut -->"
FIN_TETE = "<!-- fiche-autonome:fin -->"
DEBUT = "<!-- annexe:debut — partie générée par generer_annexes.py, à ne pas modifier à la main -->"
FIN = "<!-- annexe:fin -->"

TETE = (
    "**Fiche autonome.** Ce fichier suffit pour finir cet écran, sans aucun autre document. "
    "Les sections numérotées décrivent l'écran ; l'annexe en bas donne la philosophie de BankVi, "
    "le design system, les composants utilisés, le contexte produit et les critères de fin. "
    "Pour cet écran, les sections numérotées priment sur l'annexe."
)

BREF = """BankVi est une app Android de prévision de budget pour le Togo, en FCFA, pensée pour une vie où l'argent est d'abord en espèces et en mobile money (Mixx, Flooz). Elle répond à une question : **combien puis-je dépenser aujourd'hui ?**

Les personnes de référence sont Camille, salariée, et Karim, indépendant. L'app doit tenir sur un téléphone d'entrée de gamme, en plein soleil, avec un réseau instable et pour des personnes qui lisent peu ou lentement le français.

| Terme | Sens |
| --- | --- |
| L1 | Premier lot : test restreint |
| L2 | Second lot : lancement public |
| Pass Plus | L'offre payante. Elle s'achète sur le site, jamais dans l'app |
| dp, sp | Unités d'Android : dp pour les dimensions, sp pour le texte |"""

TRAVAIL = """1. Partir du cadre de référence : 360 × 800 dp, thème clair, puis décliner en sombre.
2. Reprendre uniquement les composants et les valeurs de ce fichier. Ne rien inventer : si rien ne convient, le signaler au lieu de créer une valeur.
3. Vérifier la règle d'or : **un seul bouton vert par écran**, sauf si la fiche dit qu'il n'y en a aucun.
4. Reprendre les textes de la fiche mot pour mot, et appliquer la rédaction ci-dessous à tout texte d'adaptation."""

FINI_APP = """- [ ] Clair et sombre dessinés, avec des valeurs propres à chaque thème.
- [ ] Les 4 cadres vérifiés : 360 × 800, 360 × 640, 320 × 568 et 412 × 915 dp.
- [ ] Chaque ligne des sections États et Autres formats de la fiche est dessinée ou spécifiée.
- [ ] États appuyé et désactivé des composants présents.
- [ ] Texte à 130 % et à 200 % : rien de coupé, le bouton principal reste accessible.
- [ ] Ordre de lecture et noms pour TalkBack repris de la fiche.
- [ ] Hors ligne : écran utilisable, sans message d'erreur, sauf si la fiche dit le contraire.
- [ ] Aucun texte, geste ou élément absent de ce fichier."""

FINI_WEB = """- [ ] Clair et sombre dessinés, selon le réglage du téléphone.
- [ ] Largeurs vérifiées : 320 et 360 px, puis ordinateur avec la colonne de 480 px au plus.
- [ ] Chaque ligne des sections États et Autres formats de la fiche est dessinée ou spécifiée.
- [ ] États appuyé, désactivé et focus visible des composants présents.
- [ ] Texte à 200 % : rien de coupé, sans défilement horizontal.
- [ ] 100 Ko au plus hors FedaPay, sans police téléchargée ni traceur.
- [ ] Aucun texte, geste ou élément absent de ce fichier."""

WEB = """Ces pages suivent le même design system, avec ces correspondances :

| Dans ce fichier | Sur le site |
| --- | --- |
| dp, sp | px, avec le même nombre |
| Roboto | Pile de polices système, sans téléchargement : Roboto sur Android |
| Icônes | Mêmes formes, en SVG intégré à la page, sans fichier de police |
| TalkBack | Le lecteur d'écran du navigateur |
| Retour Android | Le retour du navigateur |"""

# Composant : (fichier, section, motif cherché dans la fiche). Mieux vaut trop que pas assez.
COMPOSANTS = [
    ("10", "2", r"[Bb]outon principal|[Bb]outon vert"),
    ("10", "3", r"[Bb]outons? à contour|[Bb]outon secondaire|» à contour|, à contour"),
    ("10", "4", r"[Bb]outons? texte|^\| [^|]*\b[Ll]ien\b"),
    ("10", "5", r"[Bb]arre d'action"),
    ("10", "6", r"\b[Pp]uces?\b"),
    ("09", "1", r"[Bb]arre du haut|[Tt]itre de barre|arrow_back|^│ ←"),
    ("09", "2", r"[Oo]nglets?|[Bb]arre du bas"),
    ("09", "3", r"Question \d sur 3"),
    ("11", "1", r"[Cc]hamp montant|36/44"),
    ("11", "2", r"[Cc]hamp|[Ss]oulignement"),
    ("11", "3", r"montant facultatif|[Ll]igne de poche"),
    ("11", "4", r"90 00 00 00|[Ii]ndicatif"),
    ("11", "5", r"\b[Cc]ases\b"),
    ("11", "6", r"[Cc]artes? de choix|[Rr]ond de sélection|[Cc]arte choisie"),
    ("11", "7", r"Autre heure|[Ss]électeur d'heure|\b19 h\b"),
    ("11", "8", r"Dépense ou Revenu|[Cc]hoix à deux|[Ss]egment choisi|[Dd]eux segments|Trois segments"),
    ("11", "9", r"[Cc]alendrier"),
    ("11", "10", r"[Rr]ail du curseur"),
    ("11", "11", r"[Ii]nterrupteur"),
    ("12", "1", r"^\| [^|]*[Ll]ignes?\b|[Ll]iste"),
    ("12", "2", r"[Aa]vatar"),
    ("12", "3", r"[Bb]ulles?\b"),
    ("12", "4", r"\b[Cc]artes?\b"),
    ("12", "5", r"[Ff]euille"),
    ("12", "6", r"[Bb]andeau bas|Annuler"),
    ("12", "7", r"[Bb]andeau|`warning`|`error`|`info`"),
    ("12", "8", r"[Dd]ialogue|confirmation"),
    ("12", "9", r"Enregistré sur ce téléphone|`smartphone`"),
    ("13", "1", r"48/56|tu peux dépenser"),
    ("13", "2", r"[Cc]ourbe"),
    ("13", "3", r"[Bb]arre des pots|[Bb]arre colorée|^\| Barre \|"),
    ("13", "4", r"[Ll]ignes? (de|du) pot|[Pp]astille"),
    ("13", "5", r"FCFA"),
    ("13", "6", r"Dans \d+ jours|[Rr]epères? d'horizon|[Tt]rois repères|Repère négatif"),
    ("13", "7", r"[Rr]ésumé du mois"),
    ("13", "8", r"[Jj]auge"),
    ("17", "5", r"[Aa]nneau du statut|l'anneau|^\| Anneau"),
    ("17", "7", r"[Pp]aysage"),
    ("17", "8", r"volume_|[Ss]on du statut|[Ss]on coupé"),
    ("17", "9", r"[Pp]aysage"),
]
PAR_ECRAN = {"EC-12": [("17", "4"), ("17", "2")], "EC-50": [("17", "6"), ("17", "2")], "EC-23": [("11", "8")]}
# L'illustration de la bienvenue dessine une carte et une courbe : ce ne sont pas ces composants.
EXCLUS = {("EC-01", "12", "4"), ("EC-01", "13", "2"), ("EC-01", "12", "3"), ("EC-01", "12", "1"), ("EC-01", "13", "1"), ("EC-50", "13", "6")}
TOUJOURS = [("09", "4")]
TOUJOURS_WEB = []


def lire(chemin):
    with open(chemin, encoding="utf-8", newline="") as f:
        return f.read().replace("\r\n", "\n")


def ds(numero):
    return lire(glob.glob(os.path.join(DS, numero + "-*.md"))[0])


def nettoyer(t):
    """Retire les liens : l'annexe ne dépend d'aucun autre fichier."""
    t = re.sub(r"- \*\*Détail :\*\*.*\n", "", t)
    t = t.replace("selon la section 3.", "selon les calculs affichés, plus bas.")
    t = t.replace("les seuils de la bible (section 6.2)", "les seuils de la bible, plus bas")
    t = re.sub(r"\s*Détail : \[[^\]]+\]\([^)]+\)\.?", "", t)
    t = re.sub(r"\s*\(\[[^\]]+\]\([^)]+\)\)", "", t)
    t = re.sub(r" ?(Voir|Les résultats sont calculés dans) \[[^\]]+\]\([^)]+\)\.", "", t)
    t = re.sub(r" ?Les quatre états sont visibles dans la \[maquette\]\([^)]+\)\.", "", t)
    t = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t)
    return t.strip()


def section(numero, n, titre=True):
    """Section « ## n. Titre » d'un fichier du design system, jusqu'à la suivante."""
    m = re.search(rf"^## {n}\. ([^\n]*)\n(.*?)(?=^## |\Z)", ds(numero), flags=re.M | re.S)
    if not m:
        raise SystemExit(f"Section {n} introuvable dans le fichier {numero}")
    corps = re.sub(r"^### ", "##### ", m.group(2), flags=re.M)
    corps = nettoyer(corps)
    return f"#### {m.group(1)}\n\n{corps}" if titre else corps


def fichier_entier(numero, sans=()):
    t = ds(numero)
    blocs = []
    for m in re.finditer(r"^## (\d+)\. ", t, flags=re.M):
        if m.group(1) not in sans:
            blocs.append(section(numero, m.group(1)))
    return "\n\n".join(blocs)


def champ(fiche, nom):
    m = re.search(rf"^\| \*\*{nom}\*\* \| (.*?) \|\s*$", fiche, flags=re.M)
    return m.group(1) if m else ""


class Sources:
    def __init__(self):
        self.parcours = lire(os.path.join(PRODUIT, "parcours_ecrans_p1.md"))
        self.bible = lire(os.path.join(PRODUIT, "funcs_bible.md"))
        self.lignes = {
            m.group(1): re.sub(r" \(section [\d.]+\)", "", m.group(2).strip())
            for m in re.finditer(r"^\| ([A-Z][A-Z0-9]*-\d+) \| (.*?) \|", self.bible, flags=re.M)
        }
        self.ecrans = {
            m.group(1): m.group(2).split(" · ")[0].strip()
            for m in re.finditer(r"^#### ((?:EC|W)-\d+) (.*)$", self.parcours, flags=re.M)
        }
        self.pc = dict(
            (m.group(1), m.group(0).strip())
            for m in re.finditer(r"^### (PC-\d+) .*?(?=^### |^## )", self.parcours, flags=re.M | re.S)
        )
        self.titres_pc = {k: v.splitlines()[0][4:] for k, v in self.pc.items()}
        self.personnes = self._personnes()

    def _personnes(self):
        t = lire(os.path.join(ICI, "01-first-launch", "README.md"))
        m = re.search(r"^## Personnes et chiffres d'exemple\n(.*?)(?=^## )", t, flags=re.M | re.S)
        return nettoyer(m.group(1))

    def calculs(self):
        m = re.search(r"^## 3\. Calculs affichés\n(.*?)(?=^## )", self.parcours, flags=re.M | re.S)
        corps = re.sub(r"^Ces formules de départ.*\n", "", m.group(1), flags=re.M)
        corps = re.sub(r"^Le \[prototype du moteur\].*\n", "", corps, flags=re.M)
        return nettoyer(corps)

    def regles(self):
        m = re.search(r"^## 1\. Règles communes.*?\n(.*?)(?=^## )", self.parcours, flags=re.M | re.S)
        return nettoyer(m.group(1))

    def entree(self, ecran):
        m = re.search(rf"^#### {ecran} .*?\n(.*?)(?=^#### |^### |^## )", self.parcours, flags=re.M | re.S)
        return nettoyer(m.group(1))

    def seuils(self):
        m = re.search(r"^### 6\.2 (.*?)\n(.*?)(?=^### |^## )", self.bible, flags=re.M | re.S)
        return f"#### Seuils de la bible : {m.group(1)}\n\n{nettoyer(m.group(2))}" if m else ""


def contexte_dossier(dossier, ecran):
    """Index du dossier : garde les règles et les chiffres, retire la liste des fiches."""
    t = lire(os.path.join(dossier, "README.md"))
    parties = re.split(r"^(?=## )", t, flags=re.M)
    sortie, decisions = [], []
    for i, p in enumerate(parties):
        titre = p.splitlines()[0] if p.strip() else ""
        if titre.startswith("## Points à valider"):
            for ligne in p.splitlines():
                c = [x.strip() for x in ligne.split("|")]
                if len(c) >= 6 and ecran in c[-2]:
                    decisions.append(f"| {c[2]} | {c[3]} |")
        elif titre.startswith("## Personnes et chiffres"):
            continue
        else:
            blocs = re.findall(r"```text\n.*?```", p, flags=re.S)
            if i == 0 or titre.startswith("## Enchaînement"):
                sortie.extend(blocs)
                if i == 0:
                    for par in p.split("\n\n")[2:]:
                        if par.startswith(("Le site est", "Les pots")) :
                            sortie.append(nettoyer(par))
            else:
                corps = "\n".join(p.splitlines()[1:]).strip()
                sortie.append(f"#### {titre[3:]}\n\n" + nettoyer(re.sub(r"^### ", "##### ", corps, flags=re.M)))
    return "\n\n".join(sortie), decisions


def zone_visible(fiche):
    """De la maquette aux gestes : la prose et les données parlent aussi de ce qui n'est pas affiché."""
    m = re.search(r"^## \d+\. Maquette\n(.*?)(?=^## \d+\. (?:Données|Accessibilité|Comportement\b.*Données)|\Z)", fiche, flags=re.M | re.S)
    return m.group(1) if m else fiche


def composants(ecran, fiche, web):
    """Les composants dont la fiche parle, dans l'ordre du design system."""
    pris = []
    for numero, n, motif in COMPOSANTS:
        if (ecran, numero, n) in EXCLUS:
            continue
        if re.search(motif, zone_visible(fiche), flags=re.M):
            pris.append((numero, n))
    pris += PAR_ECRAN.get(ecran, [])
    pris += TOUJOURS_WEB if web else TOUJOURS
    vus = []
    for c in pris:
        if c not in vus:
            vus.append(c)
    if web:
        vus = [c for c in vus if c not in {("09", "2"), ("09", "4"), ("10", "5")}]
    return vus


def icones(fiche):
    table = re.search(r"^## 2\. Liste des icônes\n(.*?)(?=^## )", ds("06"), flags=re.M | re.S).group(1)
    noms = set(re.findall(r"`([a-z_]+)`", fiche))
    garde = [l for l in table.strip().splitlines()[2:] if noms & set(re.findall(r"`([a-z_]+)`", l))]
    if not garde:
        return ""
    return "##### Icônes de cet écran\n\n| Sens | Nom |\n| --- | --- |\n" + "\n".join(garde)


def bloc_codes(texte, src, ecran):
    codes = sorted(set(re.findall(r"\b[A-Z][A-Z0-9]{1,3}-\d+\b", texte)))
    lignes = [f"| {c} | {src.lignes[c]} |" for c in codes if c in src.lignes]
    autres = sorted(c for c in set(re.findall(r"\b(?:EC|W)-\d+\b", texte)) if c in src.ecrans and c != ecran)
    pcs = sorted(c for c in set(re.findall(r"\bPC-\d+\b", texte)) if c in src.titres_pc)
    sortie = []
    if lignes:
        sortie.append("#### Lignes de la bible\n\n| Code | Fonctionnalité |\n| --- | --- |\n" + "\n".join(lignes))
    if autres:
        sortie.append(
            "#### Autres écrans\n\n| Code | Écran |\n| --- | --- |\n" + "\n".join(f"| {c} | {src.ecrans[c]} |" for c in autres)
        )
    if pcs:
        sortie.append(
            "#### Parcours\n\n" + "\n".join(f"- {src.titres_pc[c]}" for c in pcs)
        )
    return "\n\n".join(sortie)


def annexe(ecran, fiche, chemin, src):
    web = ecran.startswith("W-")
    dossier = os.path.dirname(chemin)
    b = ["## Annexe : tout ce qu'il faut pour finir cet écran"]

    # A. Philosophie
    b.append("### A. BankVi et sa philosophie\n\n" + BREF)
    b.append("#### Sept principes\n\n" + section("01", "1", titre=False))
    b.append("#### L'expérience\n\n" + section("17", "1", titre=False))
    b.append("#### Ce que le ludique n'a pas le droit de faire\n\n" + section("17", "3", titre=False))
    b.append("#### Règles communes à tous les écrans\n\n" + src.regles())
    b.append("#### Ce qu'on reprend de WhatsApp\n\n" + section("01", "2", titre=False))
    apres = re.sub(r"\*\*À faire confirmer :\*\*.*", "", section("01", "3", titre=False)).strip()
    b.append("#### Ce qu'on ne reprend pas\n\n" + apres)
    b.append("#### Comment dessiner cet écran\n\n" + TRAVAIL)

    # B. Contexte produit de cet écran
    b.append("### B. Cet écran dans le produit")
    b.append("#### Ce que dit le parcours\n\n" + src.entree(ecran))
    cites = set(re.findall(r"PC-\d+", champ(fiche, "Parcours")))
    cites |= {k for k, v in src.pc.items() if re.search(rf"\b{ecran}\b", v)}
    for pc in sorted(cites):
        if pc in src.pc:
            b.append("#### " + src.pc[pc].replace("### ", "", 1).split("\n", 1)[0] + "\n\n" + nettoyer(src.pc[pc].split("\n", 1)[1]))
    regles, decisions = contexte_dossier(dossier, ecran)
    if decisions:
        b.append("#### Décisions déjà prises pour cet écran\n\n| Point | Décision |\n| --- | --- |\n" + "\n".join(decisions))
    if regles:
        b.append(regles)
    b.append("#### Personnes et chiffres d'exemple\n\n" + src.personnes)
    if re.search(r"[Cc]hiffre du jour|[Rr]este à vivre|[Hh]orizon|PRV-", fiche):
        b.append("#### Calculs affichés\n\n" + src.calculs())
    if re.search(r"HAB-0[1-8]", fiche):
        b.append(src.seuils())

    # C. Fondations
    b.append("### C. Fondations du design system")
    if web:
        b.append("#### Le site\n\n" + WEB)
    b.append(section("02", "1"))
    b.append(section("02", "3"))
    if re.search(r"[Pp]astille|[Bb]arre des pots|[Pp]ots?\b", fiche):
        b.append(section("02", "4"))
    b.append(section("03", "1") + "\n\n" + section("03", "2") + "\n\n" + section("03", "3") + "\n\n" + section("03", "4") + "\n\n" + section("03", "5"))
    if web:
        b.append(section("04", "1"))
    else:
        b.append(fichier_entier("04"))
    b.append(fichier_entier("05"))
    ic = icones(fiche)
    b.append(section("06", "1") + ("\n\n" + ic if ic else "") + "\n\n" + section("06", "3"))
    if not web:
        b.append(section("16", "1"))
        b.append(section("16", "8"))

    # D. Composants
    b.append("### D. Composants de cet écran, et ceux qu'il peut ouvrir")
    for numero, n in composants(ecran, fiche, web):
        b.append(section(numero, n))

    # E. Rédaction, accessibilité, mouvement, états, marque
    b.append("### E. Rédaction\n\n" + fichier_entier("14"))
    b.append("### F. Accessibilité\n\n" + fichier_entier("15"))
    b.append("### G. Mouvement et retours\n\n" + fichier_entier("08"))
    etats = ("3", "4", "5", "9") if web else ("2", "3", "4", "5", "6", "7", "9")
    b.append("### H. États et système\n\n" + "\n\n".join(section("16", n) for n in etats))
    marque = [section("07", "1"), section("07", "2")]
    usage = section("07", "3", titre=False).split("\n\n")[0]
    b.append("### I. Marque et illustrations\n\n" + "\n\n".join(marque) + "\n\n#### Usage\n\n" + usage)

    # F. Fin
    b.append("### J. Fini quand\n\n" + (FINI_WEB if web else FINI_APP) + "\n\n" + section("01", "5", titre=False))
    texte = "\n\n".join(x for x in b if x)
    codes = bloc_codes(fiche + texte, src, ecran)
    if codes:
        texte += "\n\n### K. Codes cités\n\n" + codes
    return texte


def assembler(fiche, ecran, chemin, src):
    # Retire ce que le script a déjà ajouté, pour qu'il reste idempotent.
    corps = re.sub(re.escape(DEBUT) + r".*?" + re.escape(FIN) + r"\n?", "", fiche, flags=re.S)
    corps = re.sub(re.escape(DEBUT_TETE) + r".*?" + re.escape(FIN_TETE) + r"\n+", "", corps, flags=re.S)
    corps = corps.rstrip() + "\n"
    tete = f"{DEBUT_TETE}\n{TETE}\n{FIN_TETE}\n\n"
    if "\n## 1. " not in corps:
        raise SystemExit(f"{ecran} : section 1 introuvable")
    avec_tete = corps.replace("\n## 1. ", "\n" + tete + "## 1. ", 1)
    return avec_tete + "\n" + DEBUT + "\n\n" + annexe(ecran, corps, chemin, src) + "\n\n" + FIN + "\n"


def main():
    verifier = "--verifier" in sys.argv
    src = Sources()
    chemins = sorted(glob.glob(os.path.join(ICI, "0[1-7]-*", "*.md")))
    perimes, total = [], 0
    for chemin in chemins:
        m = re.match(r"((?:EC|W)-\d+)-", os.path.basename(chemin))
        if not m:
            continue
        brut = open(chemin, encoding="utf-8", newline="").read()
        crlf = "\r\n" in brut
        fiche = brut.replace("\r\n", "\n")
        neuf = assembler(fiche, m.group(1), chemin, src)
        total += 1
        if neuf != fiche:
            perimes.append(os.path.basename(chemin))
            if not verifier:
                with open(chemin, "w", encoding="utf-8", newline="") as f:
                    f.write(neuf.replace("\n", "\r\n") if crlf else neuf)
    if verifier:
        if perimes:
            sys.exit(f"Annexes à régénérer : {', '.join(perimes)}")
        print(f"{total} fiches : annexes à jour")
    else:
        print(f"{total} fiches, {len(perimes)} mises à jour")


if __name__ == "__main__":
    main()
