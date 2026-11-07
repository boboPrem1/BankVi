import { describe, expect, it } from "vitest";
import { CATALOGUE, calculer, ecartDuBilan, effetRecette, horizon, recettePlusProche, repartir, soldeAttendu, type Ecriture } from "../src";
import { charge, comptage, karim } from "./fixtures";

const revenu = (id: string, at: string, montant: number, poche = "mixx"): Ecriture => ({ id, at, type: "revenu", poche, montant });

describe("EC-06 : le chiffre de Karim", () => {
  it("donne 4 700 FCFA jusqu'à la fin du mois", () => {
    const c = calculer(karim());
    expect(c.soldesPerso).toBe(65000);
    expect(c.reference).toBe("2026-11-30");
    expect(c.jours).toBe(25);
    expect(c.revenusAttendus).toBe(75000);
    expect(c.resteAVivre).toBe(119000);
    expect(c.chiffre).toBe(4700);
  });

  it("noter 30 000 FCFA le 6 ne change pas le chiffre : c'est l'attendu qui arrive", () => {
    const etat = karim();
    etat.ecritures = [...etat.ecritures, revenu("r", "2026-11-06T12:00", 30000)];
    const c = calculer(etat);
    expect(c.revenusAttendus).toBe(45000);
    expect(c.chiffre).toBe(4700);
  });

  it("sans rien noter jusqu'au 20, l'attendu tombe à 33 000 FCFA", () => {
    const c = calculer(karim({ aujourdhui: "2026-11-20" }));
    expect(c.revenusAttendus).toBe(33000);
  });

  it("le chiffre ne monte que si le revenu noté dépasse l'attendu", () => {
    const etat = karim();
    etat.ecritures = [...etat.ecritures, revenu("r", "2026-11-06T12:00", 100000)];
    const c = calculer(etat);
    expect(c.revenusAttendus).toBe(0);
    expect(c.chiffre).toBeGreaterThan(4700);
  });
});

describe("EC-06 : la courbe de Karim", () => {
  const { points, recalculs } = horizon(karim(), 30);
  const a = (date: string) => points.find((p) => p.date === date)?.solde;

  it("passe à 43 200 FCFA le 10 novembre après le loyer", () => expect(a("2026-11-10")).toBe(43200));
  it("touche 1 500 FCFA le 1er décembre", () => {
    expect(a("2026-12-01")).toBe(1500);
    expect(Math.min(...points.map((p) => p.solde))).toBe(1500);
  });
  it("revient à environ 5 000 FCFA le 6 décembre", () => {
    expect(Math.abs((a("2026-12-06") as number) - 5000)).toBeLessThanOrEqual(50);
  });
  it("prend un rythme de 2 200 FCFA en décembre", () => {
    expect(recalculs[0]).toMatchObject({ date: "2026-12-01", chiffre: 2200 });
  });
  it("descend sans saut : son revenu est réparti par jour", () => {
    for (let i = 1; i < points.length; i++) {
      expect((points[i] as { solde: number }).solde - (points[i - 1] as { solde: number }).solde).toBeLessThan(5000);
    }
  });
});

describe("EC-07 : les cartes de Karim, à partir du 1er décembre", () => {
  it("donne le chiffre affiché sur chaque carte", () => {
    expect(effetRecette(karim())).toEqual({ depuis: "2026-12-01", chiffre: 2200 });
    expect(effetRecette(karim(), CATALOGUE["70-20-10"]).chiffre).toBe(1400);
    expect(effetRecette(karim(), CATALOGUE["50-30-20"]).chiffre).toBe(1600);
    expect(effetRecette(karim(), CATALOGUE["plancher-prudent"]).chiffre).toBe(1400);
  });

  it("propose le revenu plancher prudent", () => {
    expect(recettePlusProche({ variable: true, revenuMensuel: 90000, chargesMensuelles: 21000 }).recette.id).toBe("plancher-prudent");
  });

  it("répartit le plancher sans rien laisser dans « Le reste »", () => {
    expect(repartir(90000, CATALOGUE["plancher-prudent"])).toEqual({ "vie-courante": 63000, imprevus: 18000, epargne: 9000, "le-reste": 0 });
  });

  it("noter un revenu avant l'effet de la recette ne fait pas chuter le chiffre", () => {
    const etat = karim({ recettes: [{ recette: CATALOGUE["plancher-prudent"], effetDepuis: "2026-12-01" }] });
    etat.ecritures = [...etat.ecritures, revenu("r", "2026-11-06T12:00", 30000)];
    const c = calculer(etat);
    expect(c.reserve).toBe(0);
    expect(c.chiffre).toBe(4700);
  });

  it("une fois la recette en place, noter un revenu garde le chiffre stable", () => {
    const base = karim({
      aujourdhui: "2026-12-01",
      recettes: [{ recette: CATALOGUE["plancher-prudent"], effetDepuis: "2026-12-01" }],
      prevus: [charge("loyer", "Loyer", 15000, 10, "2026-12-01"), charge("telephone", "Téléphone", 6000, 18, "2026-12-01")],
      ecritures: [comptage("c", "especes", 1500, "2026-12-01T07:00")],
    });
    const avant = calculer(base);
    expect(avant.chiffre).toBe(1400);
    const apres = calculer({ ...base, ecritures: [...base.ecritures, revenu("r", "2026-12-01T12:00", 30000)] });
    expect(apres.reserve).toBe(9000);
    expect(apres.chiffre).toBe(1400);
  });

  it("le réservé s'accumule de mois en mois : 27 000 FCFA de plus en janvier", () => {
    const etat = karim({ recettes: [{ recette: CATALOGUE["plancher-prudent"], effetDepuis: "2026-12-01" }] });
    const { points, recalculs } = horizon(etat, 60);
    const janvier = recalculs.find((r) => r.date === "2027-01-01");
    const solde = points.find((p) => p.date === "2027-01-01")?.solde as number;
    expect(janvier?.reste).toBe(solde + 90000 - 21000 - 27000 - 27000);
  });

  it("le surplus au-delà du plancher va dans « Le reste », hors du chiffre du jour", () => {
    const base = karim({
      aujourdhui: "2026-12-05",
      recettes: [{ recette: CATALOGUE["plancher-prudent"], effetDepuis: "2026-12-01" }],
      ecritures: [comptage("c", "especes", 1500, "2026-12-01T07:00"), revenu("r", "2026-12-05T12:00", 100000)],
    });
    const c = calculer(base);
    expect(c.reserve).toBe(27000 + 10000);
  });
});

describe("EC-19 à EC-21 : le bilan du soir de Karim", () => {
  const dejeuner: Ecriture = { id: "dej", at: "2026-11-06T12:30", type: "depense", poche: "especes", montant: 1000, categorie: "Déjeuner" };
  const soir = karim();
  soir.ecritures = [...soir.ecritures, dejeuner];

  it("attend 44 000 FCFA en espèces, compte 41 500 : 2 500 FCFA d'écart", () => {
    const attendu = soldeAttendu(soir, "especes", "2026-11-06T20:00");
    expect(attendu).toBe(44000);
    expect(ecartDuBilan(attendu, 41500, 1500 + 500)).toEqual({ ecart: 2500, nonDetaille: 500 });
  });

  it("le chiffre de demain est de 4 600 FCFA", () => {
    const etat = karim({
      aujourdhui: "2026-11-07",
      ecritures: [
        ...soir.ecritures,
        { id: "p1", at: "2026-11-06T19:59", type: "depense", poche: "especes", montant: 1500, categorie: "Transport" },
        { id: "p2", at: "2026-11-06T19:59", type: "depense", poche: "especes", montant: 500, categorie: "Crédit téléphone" },
        comptage("bilan", "especes", 41500, "2026-11-06T20:00"),
      ],
    });
    const c = calculer(etat);
    expect(c.soldesPerso).toBe(61500);
    expect(c.revenusAttendus).toBe(72000);
    expect(c.resteAVivre).toBe(112500);
    expect(c.jours).toBe(24);
    expect(c.chiffreBrut).toBe(4687);
    expect(c.chiffre).toBe(4600);
  });

  it("une saisie tardive détaille l'écart sans changer le solde compté", () => {
    const sans = karim({ ecritures: [...soir.ecritures, comptage("bilan", "especes", 41500, "2026-11-06T20:00")] });
    const avec = karim({
      ecritures: [...sans.ecritures, { id: "tard", at: "2026-11-06T15:00", type: "depense", poche: "especes", montant: 800, categorie: "Jus" }],
    });
    expect(calculer(avec).soldes.especes).toBe(41500);
    expect(calculer(avec).chiffre).toBe(calculer(sans).chiffre);
  });
});

describe("Poche d'activité", () => {
  it("reste hors du reste à vivre", () => {
    const etat = karim();
    etat.ecritures = [...etat.ecritures, comptage("a", "activite", 200000)];
    expect(calculer(etat).soldesPerso).toBe(65000);
    expect(calculer(etat).chiffre).toBe(4700);
  });

  it("se verser 30 000 FCFA compte comme un revenu noté, sans gonfler le chiffre", () => {
    const etat = karim();
    etat.ecritures = [
      ...etat.ecritures,
      comptage("a", "activite", 200000),
      { id: "t", at: "2026-11-06T10:00", type: "transfert", de: "activite", vers: "mixx", montant: 30000, frais: 0 },
    ];
    const c = calculer(etat);
    expect(c.soldesPerso).toBe(95000);
    expect(c.revenusAttendus).toBe(45000);
    expect(c.chiffre).toBe(4700);
  });
});
