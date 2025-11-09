import { chromium } from "playwright";
import fs from "node:fs";
const sizes = [320, 768, 1280];
const outDir = "docs/screens";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const url = process.env.SITE_URL || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage();
for (const w of sizes) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/${w}.png`, fullPage: true });
  console.log("baseline", w);
}
await browser.close();
