import { chromium } from "playwright";
import fs from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
const sizes = [320, 768, 1280];
const outDir = "docs/screens";
const testDir = "docs/screens/test";
fs.mkdirSync(testDir, { recursive: true });
const url = process.env.SITE_URL || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage();
let totalDiff = 0;
for (const w of sizes) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const shot = `${testDir}/${w}.png`;
  await page.screenshot({ path: shot, fullPage: true });
  const baseline = PNG.sync.read(fs.readFileSync(`${outDir}/${w}.png`));
  const current  = PNG.sync.read(fs.readFileSync(shot));
  const { width, height } = baseline;
  const diff = new PNG({ width, height });
  const num = pixelmatch(baseline.data, current.data, diff.data, width, height, { threshold: 0.1 });
  totalDiff += num;
  fs.writeFileSync(`${testDir}/${w}-diff.png`, PNG.sync.write(diff));
  console.log(`diff ${w}: ${num}`);
}
const limit = 2 * sizes.length;
if (totalDiff > limit) {
  console.error(`❌ Visual diff too high: ${totalDiff} > ${limit}`);
  process.exit(1);
} else {
  console.log(`✅ Visual diff ok: ${totalDiff} <= ${limit}`);
}
await browser.close();
