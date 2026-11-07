import { describe, expect, it } from "vitest";
import {
  CATALOGUE,
  calculer,
  effetRecette,
  expliquer,
  horizon,
  premierManque,
  recettePlusProche,
  repartir,
  repartirMaintenant,
  reperes,
  simuler,
  statutDuJour,
  type Ecriture,
  type Recette,
} from "../src";
import { POCHES, camille, charge, comptage } from "./fixtures";

describe("EC-06 et EC-12 : le chiffre du jour", () => {
  it("donne 3 200 FCFA jusqu'au 28", () => {
    const c = calculer(camille());
    expect(c.soldesPerso).toBe(90000);
    expect(c.reference).toBe("2026-11-28");
    expect(c.jours).toBe(22);
    expect(c.revenusAttendus).toBe(0);
    expect(c.mouvements.map((m) => m.montant)).toEqual([-8000, -10000]);
    expect(c.resteAVivre).toBe(72000);
    expect(c.chiffreBrut).toBe(3272);
    expect(c.chiffre).toBe(3200);
  });

  it("dit ce qui manque, sans chiffre négatif seul", () => {
    const c = calculer(
      camille({ ecritures: [comptage("c", "especes", 5000)], prevus: [charge("a", "A", 3500, 15), charge("b", "B", 10000, 20)] }),
    );
    expect(c.resteAVivre).toBe(-8500);
    expect(c.manque).toBe(8500);
    expect(c.chiffre).toBe(0);
  });
});

describe("EC-06 : la courbe de 30 jours", () => {
  const attendu: [string, number][] = [
    ["2026-11-06", 90000], ["2026-11-07", 86800], ["2026-11-08", 83600], ["2026-11-09", 80400],
    ["2026-11-10", 77200], ["2026-11-11", 74000], ["2026-11-12", 70800], ["2026-11-13", 67600],
    ["2026-11-14", 64400], ["2026-11-15", 53200], ["2026-11-16", 50000], ["2026-11-17", 46800],
    ["2026-11-18", 43600], ["2026-11-19", 40400], ["2026-11-20", 27200], ["2026-11-21", 24000],
    ["2026-11-22", 20800], ["2026-11-23", 17600], ["2026-11-24", 14400], ["2026-11-25", 11200],
    ["2026-11-26", 8000], ["2026-11-27", 4800], ["2026-11-28", 121600], ["2026-11-29", 120200],
    ["2026-11-30", 118800], ["2026-12-01", 117400], ["2026-12-02", 116000], ["2026-12-03", 89600],
    ["2026-12-04", 88200], ["2026-12-05", 51800], ["2026-12-06", 50400],
  ];

  it("ressort à l'identique sur les 31 lignes", () => {
    const { points } = horizon(camille(), 30);
    expect(points.map((p) => [p.date, p.solde])).toEqual(attendu);
  });

  it("recalcule le rythme à 1 400 FCFA le 28", () => {
    const { recalculs } = horizon(camille(), 30);
    expect(recalculs).toEqual([{ date: "2026-11-28", chiffre: 1400, reste: 43600, reference: "2026-12-28" }]);
  });
});

describe("EC-23 : mon horizon", () => {
  it("donne les trois repères", () => {
    const r = reperes(camille());
    expect([r.j3.date, r.j3.solde]).toEqual(["2026-11-09", 80400]);
    expect([r.j7.date, r.j7.solde]).toEqual(["2026-11-13", 67600]);
    expect([r.j30.date, r.j30.solde]).toEqual(["2026-12-06", 50400]);
  });

  it("à 90 jours, le point bas est de 1 600 FCFA le 27 janvier", () => {
    const { points } = horizon(camille(), 90);
    expect(points[90]?.date).toBe("2027-02-04");
    const avecDepart = points.slice(1);
    const bas = avecDepart.reduce((a, b) => (b.solde < a.solde ? b : a));
    expect([bas.date, bas.solde]).toEqual(["2027-01-27", 1600]);
  });

  it("annonce le manque de 8 500 FCFA le 20", () => {
    const etat = camille({ ecritures: [comptage("c", "especes", 9500)] });
    expect(calculer(etat).manque).toBe(8500);
    expect(premierManque(etat)).toEqual({ date: "2026-11-20", solde: -8500 });
  });
});

describe("EC-24 : d'où vient ce chiffre", () => {
  it("rend les lignes de l'addition", () => {
    const e = expliquer(camille());
    expect(e.lignes).toEqual([
      { libelle: "Espèces", montant: 32000 },
      { libelle: "Mixx", montant: 58000 },
      { libelle: "Électricité", montant: -8000, date: "2026-11-15" },
      { libelle: "Tontine", montant: -10000, date: "2026-11-20" },
    ]);
    expect(e.resteAVivre).toBe(72000);
    expect(e.jours).toBe(22);
    expect(e.brut).toBe(3272);
    expect(e.chiffre).toBe(3200);
  });
});

describe("EC-25 : puis-je me permettre ça ?", () => {
  it("15 000 FCFA aujourd'hui : 2 500 FCFA par jour", () => {
    const r = simuler(camille(), { montant: 15000, date: "2026-11-06" });
    expect(r).toMatchObject({ avant: 3200, apres: 2500, jusqua: "2026-11-28" });
    expect(r.manque).toBeUndefined();
  });

  it("60 000 FCFA aujourd'hui : 500 FCFA par jour", () => {
    expect(simuler(camille(), { montant: 60000, date: "2026-11-06" }).apres).toBe(500);
  });

  it("80 000 FCFA aujourd'hui : il manquerait 8 000 FCFA le 20", () => {
    expect(simuler(camille(), { montant: 80000, date: "2026-11-06" }).manque).toEqual({ montant: 8000, date: "2026-11-20" });
  });

  it("40 000 FCFA le 3 décembre : rien avant le 28, puis 100 FCFA par jour", () => {
    const r = simuler(camille(), { montant: 40000, date: "2026-12-03" });
    expect(r.avant).toBe(3200);
    expect(r.apres).toBe(3200);
    expect(r.avantReferenceInchange).toBe(true);
    expect(r.ensuite).toEqual({ chiffre: 100, depuis: "2026-11-28", jusqua: "2026-12-28" });
  });

  it("ne crée aucune écriture", () => {
    const etat = camille();
    const avant = JSON.stringify(etat);
    simuler(etat, { montant: 15000, date: "2026-11-06" });
    expect(JSON.stringify(etat)).toBe(avant);
  });
});

describe("EC-26 : événement à venir", () => {
  it("Mariage, 20 000 FCFA le 14 : 2 300 FCFA par jour", () => {
    const etat = camille();
    etat.prevus = [...etat.prevus, { id: "mariage", nom: "Mariage", montant: 20000, sens: "sortie", rythme: "une-fois", date: "2026-11-14" }];
    expect(calculer(etat).chiffre).toBe(2300);
  });

  it("toutes les 2 semaines : une occurrence sur deux semaines", () => {
    const etat = camille();
    etat.prevus = [{ id: "t", nom: "Tontine", montant: 1000, sens: "sortie", rythme: "2-semaines", date: "2026-11-07" }];
    expect(calculer(etat).mouvements.map((m) => m.date)).toEqual(["2026-11-07", "2026-11-21"]);
  });
});

describe("EC-22 : transfert entre poches", () => {
  it("retrait de 20 000 FCFA avec 500 FCFA de frais", () => {
    const retrait: Ecriture = { id: "t1", at: "2026-11-06T10:00", type: "transfert", de: "mixx", vers: "especes", montant: 20000, frais: 500 };
    const etat = camille();
    etat.ecritures = [...etat.ecritures, retrait];
    const c = calculer(etat);
    expect(c.soldes.mixx).toBe(37500);
    expect(c.soldes.especes).toBe(52000);
    expect(c.resteAVivre).toBe(71500);
    expect(c.chiffreBrut).toBe(3250);
    expect(c.chiffre).toBe(3200);
  });
});

describe("EC-07 et EC-08 : les recettes", () => {
  it("propose 70 / 20 / 10 : les charges prennent 65 % du revenu", () => {
    const choix = recettePlusProche({ variable: false, revenuMensuel: 120000, chargesMensuelles: 78000 });
    expect(choix.recette.id).toBe("70-20-10");
    expect(choix.chargesPct).toBe(65);
  });

  it("propose 50 / 30 / 20 sous 60 % et sans charge", () => {
    expect(recettePlusProche({ variable: false, revenuMensuel: 100000, chargesMensuelles: 40000 }).recette.id).toBe("50-30-20");
    expect(recettePlusProche({ variable: false, revenuMensuel: 100000, chargesMensuelles: 0 }).raison).toBe("sans-charge");
  });

  it("répartit 120 000 FCFA comme dans l'aperçu", () => {
    expect(repartir(120000, CATALOGUE["70-20-10"])).toEqual({ "vie-courante": 84000, epargne: 24000, "dettes-dons": 12000 });
    expect(repartir(120000, CATALOGUE["50-30-20"])).toEqual({ besoins: 60000, envies: 36000, "epargne-dettes": 24000 });
    expect(repartir(120000, CATALOGUE["payez-vous-d-abord"])).toEqual({ epargne: 24000, libre: 96000 });
  });

  it("montre l'effet de chaque carte à partir du 28", () => {
    expect(effetRecette(camille())).toEqual({ depuis: "2026-11-28", chiffre: 1400 });
    expect(effetRecette(camille(), CATALOGUE["70-20-10"]).chiffre).toBe(200);
    expect(effetRecette(camille(), CATALOGUE["50-30-20"]).chiffre).toBe(600);
    expect(effetRecette(camille(), CATALOGUE["payez-vous-d-abord"]).chiffre).toBe(600);
  });

  it("une recette adoptée ne change pas le chiffre avant le prochain revenu", () => {
    const etat = camille({ recettes: [{ recette: CATALOGUE["70-20-10"], effetDepuis: "2026-11-28" }] });
    expect(calculer(etat).chiffre).toBe(3200);
  });
});

describe("EC-32 : ajuster une recette", () => {
  it("80 / 15 / 5 : réservé 24 000 FCFA, 600 FCFA par jour", () => {
    const ajustee: Recette = {
      id: "ma-recette",
      nom: "Ma recette",
      pots: [
        { id: "vie-courante", nom: "Vie courante", regle: { type: "pourcentage", valeur: 80 }, quotidien: true },
        { id: "epargne", nom: "Épargne", regle: { type: "pourcentage", valeur: 15 }, quotidien: false },
        { id: "dettes-dons", nom: "Dettes ou dons", regle: { type: "pourcentage", valeur: 5 }, quotidien: false },
      ],
    };
    expect(repartir(120000, ajustee)).toEqual({ "vie-courante": 96000, epargne: 18000, "dettes-dons": 6000 });
    expect(effetRecette(camille(), ajustee).chiffre).toBe(600);
  });
});

describe("EC-27 et EC-28 : les pots, le 6 décembre", () => {
  const decembre = (plus: Ecriture[] = []) => {
    const depuis = "2026-12-06";
    return camille({
      aujourdhui: depuis,
      poches: POCHES,
      revenus: [{ type: "regulier", id: "salaire", nom: "Salaire", montant: 120000, jour: 28, depuis: "2026-11-28" }],
      recettes: [{ recette: CATALOGUE["70-20-10"], effetDepuis: "2026-11-28" }],
      prevus: [charge("electricite", "Électricité", 8000, 15, depuis), charge("tontine", "Tontine", 10000, 20, depuis)],
      ecritures: [
        { id: "s", at: "2026-11-28T08:00", type: "revenu", poche: "mixx", montant: 120000, prevu: { id: "salaire", date: "2026-11-28" } },
        comptage("c", "mixx", 60000, "2026-12-06T07:00"),
        ...plus,
      ],
    });
  };

  it("Épargne 24 000, Dettes ou dons 12 000, chiffre 200 FCFA", () => {
    const c = calculer(decembre());
    expect(c.soldesPerso).toBe(60000);
    expect(c.reserve).toBe(36000);
    expect(c.soldesPerso - c.reserve).toBe(24000);
    expect(c.chiffre).toBe(200);
  });

  it("déplacer 12 000 FCFA vers le quotidien donne 800 FCFA par jour, sans toucher aux poches", () => {
    const c = calculer(decembre([{ id: "d", at: "2026-12-06T08:00", type: "deplacement", de: "epargne", vers: "vie-courante", montant: 12000 }]));
    expect(c.reserve).toBe(24000);
    expect(c.soldesPerso).toBe(60000);
    expect(c.chiffreBrut).toBe(818);
    expect(c.chiffre).toBe(800);
  });
});

describe("POT-12 : répartir mon argent maintenant", () => {
  it("met 21 600 FCFA de côté : le chiffre passe de 3 200 à 2 200 FCFA", () => {
    expect(repartirMaintenant(camille(), CATALOGUE["70-20-10"])).toEqual({
      parts: { epargne: 14400, "dettes-dons": 7200 },
      reserve: 21600,
      chiffreAvant: 3200,
      chiffreApres: 2200,
    });
  });

  it("l'écriture de répartition donne le même chiffre que l'aperçu", () => {
    const etat = camille();
    etat.ecritures = [...etat.ecritures, { id: "r", at: "2026-11-06T09:00", type: "repartition", parts: { epargne: 14400, "dettes-dons": 7200 } }];
    expect(calculer(etat).chiffre).toBe(2200);
  });

  it("n'est pas proposée si le reste à vivre est négatif", () => {
    expect(repartirMaintenant(camille({ ecritures: [comptage("c", "especes", 1000)] }), CATALOGUE["70-20-10"])).toBeUndefined();
  });
});

describe("EC-50 : le statut du jour", () => {
  it("le soleil est à 9 jours sur 31", () => {
    const s = statutDuJour(camille());
    expect(s.soleil).toEqual({ ecoules: 9, total: 31 });
    expect(s.etat).toBe("suit");
    expect(s.chiffreDebut).toBe(3200);
  });

  it("une grosse dépense fait changer l'état, le chiffre de référence reste le même", () => {
    const depense = (montant: number): Ecriture => ({ id: "d", at: "2026-11-06T12:00", type: "depense", poche: "mixx", montant });
    const avec = (montant: number) => {
      const etat = camille();
      etat.ecritures = [...etat.ecritures, depense(montant)];
      return statutDuJour(etat);
    };
    expect(avec(20000)).toMatchObject({ etat: "resserre", chiffre: 2300, chiffreDebut: 3200 });
    expect(avec(30000)).toMatchObject({ etat: "serre", chiffre: 1900, chiffreDebut: 3200 });
    expect(avec(85000).etat).toBe("manque");
  });
});
