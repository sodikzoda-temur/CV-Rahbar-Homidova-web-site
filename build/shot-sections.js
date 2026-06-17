#!/usr/bin/env node
const path = require('path');
const { chromium } = require('playwright-core');
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = process.env.BASE || 'http://localhost:8123';
const OUT = path.resolve(__dirname, 'shots');

(async () => {
  const b = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  for (const id of ['about', 'expertise', 'skills', 'contact']) {
    const el = await p.$('#' + id);
    if (el) { await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await el.screenshot({ path: path.join(OUT, 'sec-' + id + '.png') }); console.log('✓ sec-' + id); }
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
