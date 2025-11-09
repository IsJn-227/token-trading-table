import fs from "node:fs";
const p="package.json"; const pkg=JSON.parse(fs.readFileSync(p,"utf8"));
pkg.scripts = {
  ...(pkg.scripts??{}),
  "start": pkg.scripts?.start ?? "next start -p 3000",
  "snap:baseline":"node tests/visual/snapshots-baseline.mjs",
  "snap:test":"node tests/visual/snapshots-test.mjs",
  "lh:desktop":"lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --preset=desktop --output=json --output-path=./docs/lighthouse-desktop.json",
  "lh:mobile":"lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --preset=mobile --output=json --output-path=./docs/lighthouse-mobile.json"
};
pkg.devDependencies = {
  ...(pkg.devDependencies??{}),
  "playwright":"^1.48.0","pixelmatch":"^5.3.0","pngjs":"^7.0.0","lighthouse":"^12.0.0","serve":"^14.2.3"
};
fs.writeFileSync(p, JSON.stringify(pkg,null,2));
console.log("✅ package.json updated");
