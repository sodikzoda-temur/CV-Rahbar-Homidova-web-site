#!/usr/bin/env node
/* =========================================================================
   gen-images.js — raster assets via sharp:
   · assets/img/og-image.png        (1200×630 social card)
   · assets/icons/icon-192.png / icon-512.png / apple-touch-icon.png
   ========================================================================= */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const IMG = path.join(ROOT, 'assets', 'img');
const ICONS = path.join(ROOT, 'assets', 'icons');

const NAVY = '#1E3A5C', NAVY_DK = '#13273E', NAVY_MID = '#274a72', GOLD = '#C2A15A', CREAM = '#F7F2E8';

/* ----------------------------- OG image ------------------------------- */
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY_MID}"/>
      <stop offset="0.55" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${NAVY_DK}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.3" r="0.5">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0.20"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="14" height="630" fill="${GOLD}"/>

  <!-- drop watermark -->
  <g transform="translate(995 150)" opacity="0.9" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M0 0C0 0 52 62 52 104a52 52 0 0 1-104 0C-52 62 0 0 0 0Z"/>
    <path d="M-26 104a26 26 0 0 0 18 30"/>
    <path d="M-52 150c9-8 17-8 26 0s17 8 26 0 17-8 26 0"/>
  </g>

  <text x="92" y="232" font-family="Montserrat" font-size="26" font-weight="600" letter-spacing="9" fill="${GOLD}">WASH EXPERT</text>

  <text x="88" y="330" font-family="Montserrat" font-size="92" font-weight="700" letter-spacing="1" fill="#ffffff">RAHBAR</text>
  <text x="88" y="430" font-family="Montserrat" font-size="92" font-weight="700" letter-spacing="1" fill="${CREAM}">HOMIDOVA</text>

  <rect x="92" y="470" width="120" height="3" fill="${GOLD}"/>

  <text x="92" y="520" font-family="Montserrat" font-size="22" font-weight="500" fill="#cdd7e3">Social Mobilisation  ·  Gender Integration  ·  Hygiene Promotion  ·  Climate Adaptation</text>

  <text x="92" y="585" font-family="Montserrat" font-size="22" font-weight="600" letter-spacing="2" fill="${GOLD}">rahbarhomidova.com</text>
</svg>`;

/* ------------------------------ icons --------------------------------- */
const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${NAVY_DK}"/>
  <g fill="none" stroke="${GOLD}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <path d="M32 11C32 11 48 30 48 42a16 16 0 0 1-32 0C16 30 32 11 32 11Z"/>
    <path d="M24 42a8 8 0 0 0 5.6 9"/>
    <path d="M16 53c2.7-2.4 5.3-2.4 8 0s5.3 2.4 8 0 5.3-2.4 8 0"/>
  </g>
</svg>`;

async function main() {
  fs.mkdirSync(IMG, { recursive: true });
  fs.mkdirSync(ICONS, { recursive: true });

  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(IMG, 'og-image.png'));
  console.log('✓ og-image.png');

  await sharp(Buffer.from(iconSvg(192))).png().resize(192, 192).toFile(path.join(ICONS, 'icon-192.png'));
  await sharp(Buffer.from(iconSvg(512))).png().resize(512, 512).toFile(path.join(ICONS, 'icon-512.png'));
  await sharp(Buffer.from(iconSvg(180))).png().resize(180, 180).toFile(path.join(ICONS, 'apple-touch-icon.png'));
  console.log('✓ icon-192 / icon-512 / apple-touch-icon');
}
main().catch((e) => { console.error(e); process.exit(1); });
