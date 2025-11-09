import { chromium } from "playwright";

const url = process.env.SITE_URL || "http://localhost:3000";

const sleep = (ms)=> new Promise(r=>setTimeout(r,ms));

/** Utility: click tab text if it exists */
async function clickIfVisible(page, text) {
  const el = page.getByRole("tab", { name: text }).or(page.getByText(text, { exact: true }));
  try { await el.first().click({ timeout: 1500 }); return true; } catch { return false; }
}
/** Utility: click column header */
async function clickHeader(page, name) {
  const h = page.getByRole("button", { name }).or(page.getByText(name));
  await h.first().click({ timeout: 2000 });
}

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"]
  });
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: "networkidle" });
  await sleep(1200); // let header load, shimmers appear briefly

  // 1) Tabs/sections
  await clickIfVisible(page, "New Pairs");
  await sleep(700);
  await clickIfVisible(page, "Final Stretch");
  await sleep(700);
  await clickIfVisible(page, "Migrated");
  await sleep(700);

  // 2) Sorting
  await clickHeader(page, "Market Cap"); // desc
  await sleep(500);
  await clickHeader(page, "Market Cap"); // asc
  await sleep(500);
  await clickHeader(page, "Price");
  await sleep(700);

  // 3) Tooltip / contract hover (first row)
  const firstRow = page.locator("table tbody tr").first();
  await firstRow.hover({ timeout: 2000 });
  await sleep(400);
  // try hover contract address text/icon if available
  const contractCell = firstRow.locator('text=/0x[0-9a-fA-F]{4,}/').first()
    .or(firstRow.getByTitle(/contract/i)).or(firstRow.getByRole("img"));
  try { await contractCell.hover({ timeout: 1200 }); await sleep(700); } catch {}

  // 4) Modal open/scroll/close
  try {
    await firstRow.click({ timeout: 1500 }); // open modal
    await sleep(900);
    await page.mouse.wheel(0, 400);
    await sleep(700);
    await page.keyboard.press("Escape");
    await sleep(600);
  } catch {}

  // 5) Realtime price flash — wait a bit so update arrives
  await sleep(3500);

  // Back to New Pairs for closing shot
  await clickIfVisible(page, "New Pairs");
  await sleep(800);

  await browser.close();
})();
