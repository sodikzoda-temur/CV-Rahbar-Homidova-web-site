#!/usr/bin/env node
/* Generate a static vCard (.vcf) fallback from the same single source. */
const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const PROFILE = require(path.join(ROOT, 'js', 'profile.js'));
const VCard = require(path.join(ROOT, 'js', 'vcard.js'));

const out = path.join(ROOT, 'assets', 'Rahbar-Homidova.vcf');
fs.writeFileSync(out, VCard.build(PROFILE, 'en'), 'utf8');
console.log('✓ vCard', path.relative(ROOT, out), '(' + fs.statSync(out).size + ' bytes)');
