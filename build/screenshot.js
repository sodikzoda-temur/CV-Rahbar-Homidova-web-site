#!/usr/bin/env node
/* QA screenshots of the site using the environment's Chromium. */
const path = require('path');
const { chromium } = require('playwright-core');

const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = process.env.BASE || 'http://localhost:8123';
const OUT = path.resolve(__dirname, 'shots');
require('fs').mkdirSync(OUT, { recursive: true });

async function reveal(page) {
  // Scroll through so IntersectionObserver reveals all sections before capture.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-visible'));
    await new Promise(r => setTimeout(r, 250));
  });
}

async function shot(page, name, full = true) {
  if (full) await reveal(page);
  await page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: full });
  console.log('✓', name);
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });

  // Desktop EN (full + hero)
  const d = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  const p = await d.newPage();
  await p.goto(BASE, { waitUntil: 'networkidle' });
  await p.waitForTimeout(700);
  await shot(p, 'desktop-en-hero', false);
  await shot(p, 'desktop-en-full', true);
  // Switch to RU
  await p.click('[data-lang-btn="ru"]');
  await p.waitForTimeout(600);
  await shot(p, 'desktop-ru-hero', false);
  await shot(p, 'desktop-ru-full', true);
  await d.close();

  // Mobile EN
  const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
  const pm = await m.newPage();
  await pm.goto(BASE, { waitUntil: 'networkidle' });
  await pm.waitForTimeout(700);
  await shot(pm, 'mobile-en-full', true);
  await m.close();

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
