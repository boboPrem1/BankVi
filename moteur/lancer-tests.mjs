// Sous Windows, un dossier ouvert en « c:\ » minuscule fait croire à Vitest qu'il n'y a aucun test.
// Ce lanceur rétablit la majuscule du lecteur, puis laisse Vitest travailler normalement.
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dossier = dirname(fileURLToPath(import.meta.url)).replace(/^[a-z]:/, (lecteur) => lecteur.toUpperCase());
const { status } = spawnSync(process.execPath, [join(dossier, "node_modules/vitest/vitest.mjs"), "run", ...process.argv.slice(2)], {
  cwd: dossier,
  stdio: "inherit",
});
process.exit(status ?? 1);
