// Henter de to runde prikker til "Skru ned for solen"-logoet på Solsikkerhed fra Figma ind i public/figma/.
// Kør fra projektmappen:  node scripts/download-figma-assets.mjs
// Figma-linkene udløber ca. 7 dage efter de blev genereret (20. nov. 2026).

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const base = "https://www.figma.com/api/mcp/asset/c8a99d3c-7c67-4694-8bc6-64e7b3ae507d";

const assets = {
  "logo-dot-round-left": `${base}/6cee7.svg`,
  "logo-dot-round-right": `${base}/bdc41.svg`,
};

const outDir = path.join(process.cwd(), "public", "figma");
await mkdir(outDir, { recursive: true });

let failed = 0;
for (const [name, url] of Object.entries(assets)) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = Buffer.from(await res.arrayBuffer());
    if (body.length === 0) throw new Error("tom fil");
    await writeFile(path.join(outDir, `${name}.svg`), body);
    console.log(`✓ ${name}.svg`);
  } catch (err) {
    failed++;
    console.error(`✗ ${name}.svg – ${err.message}`);
  }
}

console.log(failed === 0 ? "\nFærdig." : `\n${failed} filer fejlede. Linkene er måske udløbet.`);
