// Sous Windows, un dossier ouvert en « c:\ » minuscule fait croire à Vitest qu'il n'y a aucun test.
// Ce lanceur rétablit la majuscule du lecteur, puis laisse Vitest travailler normalement.
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dossier = dirname(fileURLToPath(import.meta.url)).replace(/^[a-z]:/, (lecteur) => lecteur.toUpperCase());
// Vitest peut être installé ici ou à la racine du dépôt (workspaces npm) : Node le trouve.
const vitest = join(dirname(createRequire(import.meta.url).resolve("vitest/package.json")), "vitest.mjs");
const { status } = spawnSync(process.execPath, [vitest, "run", ...process.argv.slice(2)], {
  cwd: dossier,
  stdio: "inherit",
});
process.exit(status ?? 1);
