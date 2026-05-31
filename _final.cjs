const PW = 'C:/Users/leech/.claude/plugins/cache/playwright-skill/playwright-skill/4.1.0/skills/playwright-skill/node_modules/playwright';
const { chromium } = require(PW);
const fs = require('fs');
const T = 'http://localhost:3001';
const OPT = { waitUntil: 'domcontentloaded', timeout: 60000 };
async function go(page, url) {
  await page.goto(T + url, OPT);
  await page.waitForSelector('article', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(500);
}
async function count(page, url) { await go(page, url); return page.locator('article').count(); }
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const out = [];
  // run each twice to dodge any first-hit compile and confirm stability
  const wAll = await count(page, '/women');
  const wOuter = await count(page, '/women?category=outerwear');
  const wDress = await count(page, '/women?category=dress');
  const wSkirt = await count(page, '/women?category=skirt');
  const wBag = await count(page, '/women?category=bags');
  out.push(`womenAll=${wAll} outer=${wOuter} dress=${wDress} skirt=${wSkirt} bag=${wBag}`);
  const mAll = await count(page, '/men');
  const mOuter = await count(page, '/men?category=outerwear');
  const mBottom = await count(page, '/men?category=bottoms');
  const mDressInvalid = await count(page, '/men?category=dress');
  out.push(`menAll=${mAll} outer=${mOuter} bottom=${mBottom} dressInvalid=${mDressInvalid}`);
  out.push(`FILTER_WORKS=${wOuter < wAll && wDress < wAll && mOuter < mAll && mDressInvalid === mAll}`);
  fs.writeFileSync('e:/SeoulArts/2026_1/sable-webstie/_result.txt', out.join('\n') + '\nDONE\n', 'utf8');
  await browser.close();
})().catch((e) => { fs.writeFileSync('e:/SeoulArts/2026_1/sable-webstie/_result.txt', 'FATAL ' + e.message + '\n'); });
