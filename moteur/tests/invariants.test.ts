import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { CATALOGUE, calculer, horizon, rejouer, repartir, statutDuJour, type Ecriture, type Etat, type Recette, type SourceRevenu } from "../src";
import { POCHES, charge } from "./fixtures";

const DEBUT = Date.UTC(2026, 0, 1);
const date = (j: number) => new Date(DEBUT + j * 86_400_000).toISOString().slice(0, 10);
const JOURS = 500;

const montant = fc.integer({ min: 0, max: 2_000_000 });
const poche = fc.constantFrom("especes", "mixx", "flooz", "activite");
const horodatage = fc.record({ j: fc.integer({ min: 0, max: JOURS }), h: fc.integer({ min: 0, max: 23 }) }).map(({ j, h }) => `${date(j)}T${String(h).padStart(2, "0")}:00`);

const sansId = fc.oneof(
  fc.record({ type: fc.constant("depense" as const), poche, montant, nature: fc.constantFrom("epargne", "dette", "imprevu", "besoin") }),
  fc.record({ type: fc.constant("revenu" as const), poche, montant }),
  fc.record({ type: fc.constant("comptage" as const), poche, montant }),
  fc.record({ type: fc.constant("transfert" as const), de: poche, vers: poche, montant, frais: fc.integer({ min: 0, max: 5000 }) }),
);

const ecritures: fc.Arbitrary<Ecriture[]> = fc
  .array(fc.tuple(sansId, horodatage), { maxLength: 40 })
  .map((liste) => liste.map(([e, at], i) => ({ ...e, at, id: `e${i}` }) as Ecriture));

const source: fc.Arbitrary<SourceRevenu[]> = fc.oneof(
  fc.record({ montant: fc.integer({ min: 0, max: 1_000_000 }), jour: fc.integer({ min: 1, max: 31 }) }).map(({ montant: m, jour }) => [
    { type: "regulier" as const, id: "s", nom: "Salaire", montant: m, jour, depuis: date(0) },
  ]),
  fc.integer({ min: 0, max: 1_000_000 }).map((plancher) => [{ type: "variable" as const, id: "v", nom: "Activité", plancher, depuis: date(0) }]),
  fc.constant<SourceRevenu[]>([]),
);

const recettes = fc.option(fc.constantFrom<Recette>(...Object.values(CATALOGUE)), { nil: undefined });

const etat: fc.Arbitrary<Etat> = fc
  .record({
    jour: fc.integer({ min: 0, max: JOURS }),
    ecritures,
    revenus: source,
    recette: recettes,
    charges: fc.array(fc.record({ montant: fc.integer({ min: 0, max: 300_000 }), jour: fc.integer({ min: 1, max: 31 }) }), { maxLength: 5 }),
  })
  .map(({ jour, ecritures: e, revenus, recette, charges }) => ({
    aujourdhui: date(jour),
    poches: POCHES,
    ecritures: e,
    revenus,
    prevus: charges.map((c, i) => charge(`c${i}`, `Charge ${i}`, c.montant, c.jour, date(0))),
    ...(recette ? { recettes: [{ recette, effetDepuis: date(0) }] } : {}),
  }));

const tousEntiers = (valeur: unknown): boolean => {
  if (typeof valeur === "number") return Number.isSafeInteger(valeur);
  if (Array.isArray(valeur)) return valeur.every(tousEntiers);
  if (valeur && typeof valeur === "object") return Object.values(valeur).every(tousEntiers);
  return true;
};

const RUNS = { numRuns: 300 };

describe("Règles vraies pour n'importe quel registre", () => {
  it("tous les montants sont entiers", () => {
    fc.assert(fc.property(etat, (e) => tousEntiers(calculer(e)) && tousEntiers(horizon(e, 90))), RUNS);
  });

  it("le chiffre est positif ou nul, multiple de 100, et n'excède jamais le reste", () => {
    fc.assert(
      fc.property(etat, (e) => {
        const c = calculer(e);
        expect(c.chiffre).toBeGreaterThanOrEqual(0);
        expect(c.chiffre % 100).toBe(0);
        if (c.resteAVivre >= 0) expect(c.chiffre * c.jours).toBeLessThanOrEqual(c.resteAVivre);
        expect(c.manque !== undefined).toBe(c.resteAVivre < 0);
        expect(c.jours).toBeGreaterThanOrEqual(1);
      }),
      RUNS,
    );
  });

  it("mêmes données, même résultat", () => {
    fc.assert(fc.property(etat, (e) => {
      expect(calculer(e)).toEqual(calculer(structuredClone(e)));
    }), RUNS);
  });

  it("l'ordre de réception ne change rien (synchronisation)", () => {
    fc.assert(
      fc.property(etat, fc.integer(), (e, graine) => {
        const melange = [...e.ecritures].sort((a, b) => ((hash(a.id) ^ graine) % 7) - ((hash(b.id) ^ graine) % 7));
        expect(calculer({ ...e, ecritures: melange })).toEqual(calculer(e));
      }),
      RUNS,
    );
  });

  it("une écriture reçue deux fois ne compte qu'une fois", () => {
    fc.assert(fc.property(etat, (e) => {
      expect(calculer({ ...e, ecritures: [...e.ecritures, ...e.ecritures] })).toEqual(calculer(e));
    }), RUNS);
  });

  it("aucun franc ne disparaît : les lignes du registre s'équilibrent", () => {
    fc.assert(
      fc.property(etat, (e) => {
        const r = rejouer(e, e.aujourdhui);
        expect(r.lignes.reduce((s, l) => s + l.montant, 0)).toBe(0);
        for (const p of POCHES) {
          const ligne = r.lignes.filter((l) => l.compte === p.id).reduce((s, l) => s + l.montant, 0);
          expect(ligne).toBe(r.soldes[p.id]);
        }
      }),
      RUNS,
    );
  });

  it("annuler toutes les écritures revient à un registre vide", () => {
    fc.assert(
      fc.property(etat, (e) => {
        const annulations: Ecriture[] = e.ecritures.map((x) => ({ id: `a-${x.id}`, at: x.at, type: "annulation", cible: x.id }));
        expect(calculer({ ...e, ecritures: [...e.ecritures, ...annulations] })).toEqual(calculer({ ...e, ecritures: [] }));
      }),
      RUNS,
    );
  });

  it("un transfert ne change le total des poches que de ses frais", () => {
    fc.assert(
      fc.property(etat, poche, poche, montant, fc.integer({ min: 0, max: 5000 }), (e, de, vers, m, frais) => {
        const ligne: Ecriture = { id: "transfert-test", at: `${e.aujourdhui}T23:59`, type: "transfert", de, vers, montant: m, frais };
        const total = (s: Record<string, number>) => Object.values(s).reduce((a, b) => a + b, 0);
        const avant = total(rejouer(e, e.aujourdhui).soldes);
        const apres = total(rejouer({ ...e, ecritures: [...e.ecritures, ligne] }, e.aujourdhui).soldes);
        expect(apres).toBe(avant - frais);
      }),
      RUNS,
    );
  });

  it("une dépense ne fait jamais monter le chiffre", () => {
    fc.assert(
      fc.property(etat, fc.integer({ min: 1, max: 500_000 }), (e, m) => {
        const ligne: Ecriture = { id: "depense-test", at: `${e.aujourdhui}T23:59`, type: "depense", poche: "mixx", montant: m };
        expect(calculer({ ...e, ecritures: [...e.ecritures, ligne] }).chiffre).toBeLessThanOrEqual(calculer(e).chiffre);
      }),
      RUNS,
    );
  });

  it("la courbe à 30 jours est le début de la courbe à 90 jours", () => {
    fc.assert(
      fc.property(etat, (e) => {
        const c30 = horizon(e, 30);
        const c90 = horizon(e, 90);
        expect(c90.points.slice(0, 31)).toEqual(c30.points);
      }),
      { numRuns: 100 },
    );
  });

  it("le premier point de la courbe est le solde réel d'aujourd'hui", () => {
    fc.assert(fc.property(etat, (e) => {
      expect(horizon(e, 1).points[0]?.solde).toBe(calculer(e).soldesPerso);
    }), RUNS);
  });

  it("salarié sans dette : en dépensant son chiffre, on ne passe pas sous zéro avant la paie", () => {
    fc.assert(
      fc.property(etat, (e) => {
        const c = calculer(e);
        if (c.resteAVivre < 0 || e.revenus[0]?.type !== "regulier") return;
        // Une entrée future peut arriver après les dépenses : la courbe peut alors creuser avant elle.
        if (c.mouvements.some((m) => m.montant > 0)) return;
        const { points } = horizon(e, c.jours);
        const avantPaie = points.slice(0, c.jours);
        for (const p of avantPaie) expect(p.solde).toBeGreaterThanOrEqual(0);
      }),
      { numRuns: 100 },
    );
  });

  it("une répartition de recette égale toujours sa base", () => {
    fc.assert(
      fc.property(montant, fc.constantFrom<Recette>(...Object.values(CATALOGUE)), (base, r) => {
        const total = Object.values(repartir(base, r)).reduce((a, b) => a + b, 0);
        expect(total).toBe(base);
        for (const part of Object.values(repartir(base, r))) expect(part).toBeGreaterThanOrEqual(0);
      }),
      RUNS,
    );
  });

  it("le statut est toujours l'un des quatre états, sans erreur", () => {
    fc.assert(
      fc.property(etat, (e) => {
        const s = statutDuJour(e);
        expect(["suit", "resserre", "serre", "manque"]).toContain(s.etat);
        expect(s.soleil.ecoules).toBeGreaterThanOrEqual(0);
        expect(s.soleil.ecoules).toBeLessThanOrEqual(s.soleil.total);
      }),
      RUNS,
    );
  });
});

function hash(s: string): number {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}
