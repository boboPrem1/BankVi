import { describe, expect, it } from "vitest";
import { CATALOGUE, calculer, classerStatut, cycleDe, erreursRecette, fraisSuggeres, horizon, prevuProche, repartir, type Ecriture, type Etat, type Prevu, type Recette } from "../src";
import { POCHES, camille, charge, comptage, karim } from "./fixtures";

const salarie = (jour: number, aujourdhui: string, depuis = aujourdhui): Etat => ({
  aujourdhui,
  poches: POCHES,
  ecritures: [comptage("c", "especes", 100000, `${aujourdhui}T07:00`)],
  revenus: [{ type: "regulier", id: "salaire", nom: "Salaire", montant: 150000, jour, depuis }],
  prevus: [],
});

describe("Les fins de mois", () => {
  it("un salaire le 31 tombe le 28 en février", () => {
    expect(cycleDe(salarie(31, "2027-02-10"), "2027-02-10").reference).toBe("2027-02-28");
  });

  it("le 29 en année bissextile", () => {
    expect(cycleDe(salarie(31, "2028-02-10"), "2028-02-10").reference).toBe("2028-02-29");
  });

  it("un salaire le 30, le lendemain du 28 février, revient le 30 mars", () => {
    expect(cycleDe(salarie(30, "2027-02-28"), "2027-02-28").reference).toBe("2027-03-30");
  });

  it("une charge du 31 tombe bien en février sur 90 jours", () => {
    const etat = salarie(28, "2027-01-15");
    etat.prevus = [charge("loyer", "Loyer", 1000, 31, "2027-01-15")];
    const dates = horizon(etat, 90).points.flatMap((p) => p.mouvements.filter((m) => m.id === "loyer").map((m) => m.date));
    expect(dates).toEqual(["2027-01-31", "2027-02-28", "2027-03-31"]);
  });

  it("le passage à l'année suivante garde la bonne référence", () => {
    expect(cycleDe(salarie(5, "2026-12-20"), "2026-12-20").reference).toBe("2027-01-05");
  });

  it("revenu variable en février : prorata sur 28 jours", () => {
    const etat = karim({ aujourdhui: "2027-02-15", ecritures: [comptage("c", "especes", 0, "2027-02-15T07:00")], prevus: [] });
    expect(calculer(etat).jours).toBe(14);
    expect(calculer(etat).revenusAttendus).toBe(45000);
  });

  it("le dernier jour du mois : un seul jour reste", () => {
    const c = calculer(karim({ aujourdhui: "2026-11-30", prevus: [] }));
    expect(c.jours).toBe(1);
    expect(c.revenusAttendus).toBe(3000);
  });

  it("la veille de la paie : un seul jour reste", () => {
    expect(calculer(camille({ aujourdhui: "2026-11-27" })).jours).toBe(1);
  });
});

describe("Le salaire", () => {
  it("le jour de paie, la référence passe au mois suivant et le salaire attend sa confirmation", () => {
    const c = calculer(camille({ aujourdhui: "2026-11-28" }));
    expect(c.reference).toBe("2026-12-28");
    expect(c.enAttente.map((m) => m.id)).toContain("salaire");
  });

  it("en retard : il reste attendu et l'accueil le signale, sans inventer un manque", () => {
    const etat = camille({ aujourdhui: "2026-11-30" });
    const c = calculer(etat);
    expect(c.enAttente.find((m) => m.id === "salaire")?.date).toBe("2026-11-28");
    expect(c.manque).toBeUndefined();
    expect(horizon(etat, 1).points[1]?.solde).toBe(90000 - c.chiffre - 18000 + 120000);
  });

  it("confirmé avec un autre montant : le réel remplace le prévu", () => {
    const etat = camille({ aujourdhui: "2026-11-28" });
    etat.ecritures = [...etat.ecritures, { id: "s", at: "2026-11-28T09:00", type: "revenu", poche: "mixx", montant: 110000, prevu: { id: "salaire", date: "2026-11-28" } }];
    const c = calculer(etat);
    expect(c.soldes.mixx).toBe(168000);
    expect(c.enAttente.map((m) => m.id)).not.toContain("salaire");
  });

  it("ignoré : l'occurrence ne compte plus", () => {
    const etat = camille({ aujourdhui: "2026-11-28" });
    etat.ecritures = [...etat.ecritures, { id: "i", at: "2026-11-28T09:00", type: "prevu-ignore", prevu: { id: "salaire", date: "2026-11-28" } }];
    expect(calculer(etat).enAttente.map((m) => m.id)).not.toContain("salaire");
  });

  it("une charge le jour de paie appartient au cycle suivant", () => {
    const etat = camille({ prevus: [charge("x", "X", 5000, 28)] });
    expect(calculer(etat).mouvements).toEqual([]);
    const jour = horizon(etat, 22).points[22];
    expect(jour?.mouvements.map((m) => m.id).sort()).toEqual(["salaire", "x"]);
  });
});

describe("Lignes prévues jamais confirmées", () => {
  it("sans comptage, elles restent en attente et l'accueil continue de demander", () => {
    const c = calculer(camille({ aujourdhui: "2027-02-06" }));
    const salaires = c.enAttente.filter((m) => m.id === "salaire").length;
    const charges = c.enAttente.filter((m) => m.id !== "salaire").length;
    expect(salaires).toBe(3);
    expect(charges).toBe(12);
    // 90 000 + 3 salaires − 12 charges passées − Électricité et Tontine de février : le chiffre gonfle.
    expect(c.resteAVivre).toBe(198000);
    expect(c.chiffre).toBe(9000);
  });

  const compte = (date: string, especes: number, mixx: number): Ecriture[] => [
    comptage(`e-${date}`, "especes", especes, `${date}T20:00`),
    comptage(`m-${date}`, "mixx", mixx, `${date}T20:00`),
  ];

  it("un comptage de toutes les poches referme ce qui le précède", () => {
    const base = camille({ aujourdhui: "2027-02-06" });
    const c = calculer({ ...base, ecritures: [...base.ecritures, ...compte("2027-02-06", 30000, 60000)] });
    // Il ne reste que l'École (le 3 est clos) : rien avant le 6, puis Électricité et Tontine.
    expect(c.enAttente).toEqual([]);
    expect(c.resteAVivre).toBe(72000);
    expect(c.chiffre).toBe(3200);
  });

  it("ce qui tombe le jour du comptage reste demandé", () => {
    const base = camille({ aujourdhui: "2026-11-28" });
    const c = calculer({ ...base, ecritures: [...base.ecritures, ...compte("2026-11-28", 30000, 60000)] });
    expect(c.enAttente.map((m) => m.id)).toEqual(["salaire"]);
  });

  it("une seule poche comptée ne referme rien", () => {
    const base = camille({ aujourdhui: "2026-12-06" });
    const c = calculer({ ...base, ecritures: [...base.ecritures, comptage("e", "especes", 30000, "2026-12-06T20:00")] });
    expect(c.enAttente.map((m) => m.id)).toContain("salaire");
  });

  it("une poche jamais utilisée n'empêche pas de refermer", () => {
    const base = camille({ aujourdhui: "2026-12-06" });
    expect(calculer({ ...base, ecritures: [...base.ecritures, ...compte("2026-12-06", 1, 1)] }).enAttente).toEqual([]);
  });

  it("une poche utilisée après le comptage ne rouvre pas ce qui était clos", () => {
    const base = camille({ aujourdhui: "2026-12-07" });
    const clos = [...base.ecritures, ...compte("2026-12-06", 30000, 60000)];
    const avecFlooz: Ecriture[] = [...clos, { id: "f", at: "2026-12-07T09:00", type: "depense", poche: "flooz", montant: 100 }];
    expect(calculer({ ...base, ecritures: clos }).enAttente).toEqual([]);
    expect(calculer({ ...base, ecritures: avecFlooz }).enAttente).toEqual([]);
  });

  it("annuler le comptage fait revenir les lignes", () => {
    const base = camille({ aujourdhui: "2026-12-06" });
    const c = calculer({ ...base, ecritures: [...base.ecritures, ...compte("2026-12-06", 1, 1), { id: "a", at: "2026-12-06T20:01", type: "annulation", cible: "m-2026-12-06" }] });
    expect(c.enAttente.map((m) => m.id)).toContain("salaire");
  });

  it("un salaire en retard peut encore être noté après le comptage", () => {
    const base = camille({ aujourdhui: "2026-12-02" });
    const c = calculer({
      ...base,
      ecritures: [
        ...base.ecritures,
        ...compte("2026-12-01", 30000, 60000),
        { id: "s", at: "2026-12-02T09:00", type: "revenu", poche: "mixx", montant: 120000, prevu: { id: "salaire", date: "2026-11-28" } },
      ],
    });
    expect(c.soldes.mixx).toBe(180000);
    expect(c.enAttente).toEqual([]);
  });
});

describe("Double saisie : la question en une touche", () => {
  const base = () => camille({ aujourdhui: "2026-12-05" });

  it("reconnaît le loyer prévu, sans tenir compte des majuscules", () => {
    const m = prevuProche(base(), { type: "depense", categorie: "loyer", date: "2026-12-05" });
    expect([m?.id, m?.date, m?.montant]).toEqual(["loyer", "2026-12-05", -35000]);
  });

  it("choisit l'occurrence la plus proche, à 7 jours près", () => {
    expect(prevuProche(base(), { type: "depense", categorie: "Loyer", date: "2026-12-11" })?.date).toBe("2026-12-05");
    expect(prevuProche(base(), { type: "depense", categorie: "Loyer", date: "2026-12-13" })).toBeUndefined();
  });

  it("ne confond ni une autre catégorie ni un revenu", () => {
    expect(prevuProche(base(), { type: "depense", categorie: "Taxi", date: "2026-12-05" })).toBeUndefined();
    expect(prevuProche(base(), { type: "revenu", categorie: "Loyer", date: "2026-12-05" })).toBeUndefined();
    expect(prevuProche(camille({ aujourdhui: "2026-11-28" }), { type: "revenu", categorie: "Salaire", date: "2026-11-28" })?.id).toBe("salaire");
  });

  it("ne propose plus une ligne déjà confirmée", () => {
    const e = base();
    e.ecritures = [...e.ecritures, { id: "l", at: "2026-12-05T09:00", type: "depense", poche: "mixx", montant: 35000, prevu: { id: "loyer", date: "2026-12-05" } }];
    expect(prevuProche(e, { type: "depense", categorie: "Loyer", date: "2026-12-05" })).toBeUndefined();
  });

  it("relié au prévu, le loyer ne compte qu'une fois ; laissé seul, il compte deux fois", () => {
    const e = base();
    const avant = calculer(e).resteAVivre;
    const relie = calculer({ ...e, ecritures: [...e.ecritures, { id: "l", at: "2026-12-05T09:00", type: "depense", poche: "mixx", montant: 35000, prevu: { id: "loyer", date: "2026-12-05" } }] }).resteAVivre;
    const seul = calculer({ ...e, ecritures: [...e.ecritures, { id: "l", at: "2026-12-05T09:00", type: "depense", poche: "mixx", montant: 35000 }] }).resteAVivre;
    expect(relie).toBe(avant);
    expect(avant - seul).toBe(35000);
  });
});

describe("Revenu nul ou absent", () => {
  it("sans aucun revenu déclaré : la référence est la fin du mois", () => {
    const c = calculer(camille({ revenus: [] }));
    expect(c.reference).toBe("2026-11-30");
    expect(c.jours).toBe(25);
    expect(c.chiffre).toBe(2800);
  });

  it("plancher à 0 : rien n'est attendu", () => {
    const c = calculer(karim({ revenus: [{ type: "variable", id: "v", nom: "V", plancher: 0, depuis: "2026-11-06" }] }));
    expect(c.revenusAttendus).toBe(0);
    expect(c.resteAVivre).toBe(44000);
  });

  it("aucun argent, aucune charge : le chiffre est de 0, sans manque", () => {
    const c = calculer(camille({ ecritures: [], prevus: [] }));
    expect(c.chiffre).toBe(0);
    expect(c.manque).toBeUndefined();
  });

  it("revenu variable et salaire ensemble : le salaire d'avant la fin du mois compte", () => {
    const etat = karim({
      revenus: [
        { type: "variable", id: "v", nom: "V", plancher: 90000, depuis: "2026-11-06" },
        { type: "regulier", id: "s", nom: "S", montant: 50000, jour: 15, depuis: "2026-11-06" },
      ],
      prevus: [],
    });
    const c = calculer(etat);
    expect(c.reference).toBe("2026-11-30");
    expect(c.resteAVivre).toBe(65000 + 75000 + 50000);
  });
});

describe("Solde négatif", () => {
  it("un comptage très bas : le chiffre est de 0 et la courbe passe sous zéro", () => {
    const etat = camille({ ecritures: [comptage("c", "especes", 1000)] });
    const { points } = horizon(etat, 30);
    expect(calculer(etat).chiffre).toBe(0);
    expect(points[9]?.solde).toBe(-7000);
    expect(points[1]?.solde).toBe(1000);
  });

  it("un cycle suivant négatif est signalé avec son montant", () => {
    const etat = camille({ prevus: [charge("gros", "Gros", 200000, 3)] });
    const r = horizon(etat, 30).recalculs[0];
    expect(r?.chiffre).toBe(0);
    expect(r?.reste).toBeLessThan(0);
  });
});

describe("Correction et annulation", () => {
  const depense = (id: string, montant: number): Ecriture => ({ id, at: "2026-11-06T12:00", type: "depense", poche: "mixx", montant });

  it("annuler une dépense revient à ne jamais l'avoir saisie", () => {
    const base = camille();
    const avec: Etat = { ...base, ecritures: [...base.ecritures, depense("d", 5000), { id: "a", at: "2026-11-06T12:01", type: "annulation", cible: "d" }] };
    expect(calculer(avec)).toEqual(calculer(base));
  });

  it("corriger un montant donne le même résultat qu'une saisie juste", () => {
    const base = camille();
    const corrige: Etat = { ...base, ecritures: [...base.ecritures, depense("faux", 5000), { id: "a", at: "2026-11-06T12:01", type: "annulation", cible: "faux" }, depense("juste", 500)] };
    const juste: Etat = { ...base, ecritures: [...base.ecritures, depense("juste", 500)] };
    expect(calculer(corrige)).toEqual(calculer(juste));
  });

  it("annuler un comptage rend le solde précédent", () => {
    const base = camille();
    const etat: Etat = { ...base, ecritures: [...base.ecritures, comptage("c2", "mixx", 1000, "2026-11-06T20:00"), { id: "a", at: "2026-11-06T20:01", type: "annulation", cible: "c2" }] };
    expect(calculer(etat).soldes.mixx).toBe(58000);
  });

  it("annuler une confirmation fait revenir le prévu en attente", () => {
    const base = camille({ aujourdhui: "2026-11-28" });
    const etat: Etat = {
      ...base,
      ecritures: [
        ...base.ecritures,
        { id: "s", at: "2026-11-28T09:00", type: "revenu", poche: "mixx", montant: 120000, prevu: { id: "salaire", date: "2026-11-28" } },
        { id: "a", at: "2026-11-28T09:01", type: "annulation", cible: "s" },
      ],
    };
    expect(calculer(etat).enAttente.map((m) => m.id)).toContain("salaire");
  });
});

describe("Transferts", () => {
  it("un transfert sans frais ne change pas le chiffre", () => {
    const base = camille();
    const etat: Etat = { ...base, ecritures: [...base.ecritures, { id: "t", at: "2026-11-06T10:00", type: "transfert", de: "mixx", vers: "flooz", montant: 10000, frais: 0 }] };
    expect(calculer(etat).chiffre).toBe(calculer(base).chiffre);
    expect(calculer(etat).soldesPerso).toBe(90000);
  });

  it("un transfert perso vers l'activité réduit le reste à vivre", () => {
    const base = camille();
    const etat: Etat = { ...base, ecritures: [...base.ecritures, { id: "t", at: "2026-11-06T10:00", type: "transfert", de: "mixx", vers: "activite", montant: 10000, frais: 0 }] };
    expect(calculer(etat).soldesPerso).toBe(80000);
    expect(calculer(etat).soldes.activite).toBe(10000);
  });

  it("propose les derniers frais pour un transfert proche", () => {
    const t = (id: string, at: string, montant: number, frais: number): Ecriture => ({ id, at, type: "transfert", de: "mixx", vers: "especes", montant, frais });
    const ecritures = [t("a", "2026-11-01T10:00", 20000, 400), t("b", "2026-11-02T10:00", 21000, 500)];
    expect(fraisSuggeres(ecritures, "mixx", "especes", 20000)).toBe(500);
    expect(fraisSuggeres(ecritures, "mixx", "especes", 50000)).toBeUndefined();
    expect(fraisSuggeres(ecritures, "especes", "mixx", 20000)).toBeUndefined();
  });
});

describe("Saisies à une autre date", () => {
  const depense = (id: string, at: string, montant: number): Ecriture => ({ id, at, type: "depense", poche: "mixx", montant, categorie: "Courses" });

  it("une dépense passée, sans comptage depuis, réduit le solde", () => {
    const base = camille();
    const etat: Etat = { ...base, aujourdhui: "2026-11-08", ecritures: [...base.ecritures, depense("d", "2026-11-07T10:00", 2000)] };
    expect(calculer(etat).soldes.mixx).toBe(56000);
  });

  it("une dépense future agit comme un prévu, sans toucher au solde", () => {
    const base = camille();
    const etat: Etat = { ...base, ecritures: [...base.ecritures, depense("d", "2026-11-10T10:00", 2000)] };
    const c = calculer(etat);
    expect(c.soldes.mixx).toBe(58000);
    expect(c.resteAVivre).toBe(70000);
    expect(horizon(etat, 4).points[4]?.solde).toBe(90000 - 4 * c.chiffre - 2000);
  });

  it("une dépense future annulée ne compte plus", () => {
    const base = camille();
    const etat: Etat = {
      ...base,
      ecritures: [...base.ecritures, depense("d", "2026-11-10T10:00", 2000), { id: "a", at: "2026-11-06T10:00", type: "annulation", cible: "d" }],
    };
    expect(calculer(etat).resteAVivre).toBe(72000);
  });
});

describe("Les rythmes", () => {
  const prevu = (p: Partial<Prevu> & Pick<Prevu, "rythme">): Prevu => ({ id: "p", nom: "P", montant: 1000, sens: "sortie", ...p }) as Prevu;

  it("chaque trimestre : une scolarité revient tous les 3 mois", () => {
    const etat = camille({ prevus: [prevu({ rythme: "trimestre", date: "2026-11-10" } as Prevu)] });
    const dates = horizon(etat, 200).points.flatMap((p) => p.mouvements.filter((m) => m.id === "p").map((m) => m.date));
    expect(dates).toEqual(["2026-11-10", "2027-02-10", "2027-05-10"]);
  });

  it("chaque semaine, et une date de fin arrête les occurrences", () => {
    const etat = camille({ prevus: [prevu({ rythme: "semaine", date: "2026-11-07", fin: "2026-11-15" } as Prevu)] });
    expect(calculer(etat).mouvements.map((m) => m.date)).toEqual(["2026-11-07", "2026-11-14"]);
  });

  it("une entrée prévue augmente le chiffre", () => {
    const etat = camille({ prevus: [prevu({ rythme: "une-fois", date: "2026-11-10", sens: "entree", montant: 22000 } as Prevu)] });
    expect(calculer(etat).resteAVivre).toBe(112000);
  });
});

describe("Pots", () => {
  const avecRecette = (plus: Ecriture[]): Etat => {
    const base = camille({ aujourdhui: "2026-11-28", recettes: [{ recette: CATALOGUE["70-20-10"], effetDepuis: "2026-11-28" }] });
    return {
      ...base,
      ecritures: [...base.ecritures, { id: "s", at: "2026-11-28T08:00", type: "revenu", poche: "mixx", montant: 120000, prevu: { id: "salaire", date: "2026-11-28" } }, ...plus],
    };
  };

  it("une dépense lue par un pot réservé le réduit", () => {
    const c = calculer(avecRecette([{ id: "d", at: "2026-11-28T10:00", type: "depense", poche: "mixx", montant: 4000, nature: "epargne" }]));
    expect(c.reserve).toBe(32000);
  });

  it("un pot dépassé reste à 0, sans bloquer la dépense", () => {
    const c = calculer(avecRecette([{ id: "d", at: "2026-11-28T10:00", type: "depense", poche: "mixx", montant: 50000, nature: "epargne" }]));
    expect(c.reserve).toBe(12000);
    expect(c.soldes.mixx).toBe(128000);
  });

  it("une dépense sans pot réservé prend sur le quotidien", () => {
    expect(calculer(avecRecette([{ id: "d", at: "2026-11-28T10:00", type: "depense", poche: "mixx", montant: 4000 }])).reserve).toBe(36000);
  });

  it("un comptage en baisse ne touche pas aux pots réservés", () => {
    expect(calculer(avecRecette([comptage("b", "mixx", 100000, "2026-11-28T20:00")])).reserve).toBe(36000);
  });

  it("un montant fixe n'est versé qu'une fois dans le mois", () => {
    const recette: Recette = {
      id: "f",
      nom: "F",
      pots: [
        { id: "tontine", nom: "Tontine", regle: { type: "fixe", valeur: 10000 }, quotidien: false },
        { id: "libre", nom: "Libre", regle: { type: "reste" }, quotidien: true },
      ],
    };
    const base = camille({ recettes: [{ recette, effetDepuis: "2026-11-01" }] });
    const r = (id: string, montant: number): Ecriture => ({ id, at: `2026-11-06T1${id}:00`, type: "revenu", poche: "mixx", montant });
    expect(calculer({ ...base, ecritures: [...base.ecritures, r("1", 6000), r("2", 6000), r("3", 6000)] }).reserve).toBe(10000);
  });

  it("montants fixes d'abord, puis pourcentages sur ce qui reste, puis le reste", () => {
    const recette: Recette = {
      id: "m",
      nom: "M",
      pots: [
        { id: "a", nom: "A", regle: { type: "pourcentage", valeur: 50 }, quotidien: false },
        { id: "b", nom: "B", regle: { type: "fixe", valeur: 20000 }, quotidien: false },
        { id: "c", nom: "C", regle: { type: "reste" }, quotidien: true },
      ],
    };
    expect(repartir(100000, recette)).toEqual({ b: 20000, a: 40000, c: 40000 });
  });

  it("refuse une recette dont la somme n'est pas de 100 %", () => {
    const fausse: Recette = { id: "x", nom: "X", pots: [{ id: "a", nom: "A", regle: { type: "pourcentage", valeur: 90 }, quotidien: true }] };
    expect(erreursRecette(fausse)).toHaveLength(1);
    for (const r of Object.values(CATALOGUE)) expect(erreursRecette(r)).toEqual([]);
  });
});

describe("Seuils du statut", () => {
  it("place 90 % et 60 % dans la bonne catégorie", () => {
    expect(classerStatut(900, 1000)).toBe("suit");
    expect(classerStatut(899, 1000)).toBe("resserre");
    expect(classerStatut(600, 1000)).toBe("resserre");
    expect(classerStatut(599, 1000)).toBe("serre");
    expect(classerStatut(0, 0)).toBe("serre");
    expect(classerStatut(100, 0)).toBe("suit");
  });
});

describe("Refus des montants invalides", () => {
  it("rejette un montant à virgule ou négatif", () => {
    const base = camille();
    const avec = (montant: number): Etat => ({ ...base, ecritures: [...base.ecritures, { id: "d", at: "2026-11-06T12:00", type: "depense", poche: "mixx", montant }] });
    expect(() => calculer(avec(10.5))).toThrow(RangeError);
    expect(() => calculer(avec(-10))).toThrow(RangeError);
  });
});
