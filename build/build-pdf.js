#!/usr/bin/env node
/* =========================================================================
   build-pdf.js — generate branded, bilingual CV PDFs (EN + RU)
   Source of truth: ../js/profile.js + ../js/i18n.js (same data as the site).
   Fonts: Montserrat TTF (embedded → full Cyrillic support).
   Output: ../cv/Rahbar-Homidova-CV-EN.pdf  and  -RU.pdf
   ========================================================================= */
const path = require('path');
const fs = require('fs');
const PdfPrinter = require('pdfmake');

const ROOT = path.resolve(__dirname, '..');
const FONTS = path.join(ROOT, 'assets', 'fonts');
const OUT = path.join(ROOT, 'cv');

const PROFILE = require(path.join(ROOT, 'js', 'profile.js'));
const I18N = require(path.join(ROOT, 'js', 'i18n.js'));

// Brand palette
const NAVY = '#1E3A5C', NAVY_DK = '#13273E', GOLD = '#C2A15A', GOLD_DK = '#A8854A',
      INK = '#1F2D3D', INK_SOFT = '#41505F', MUTED = '#65707C';

const fonts = {
  Montserrat: {
    normal: path.join(FONTS, 'Montserrat-Regular.ttf'),
    bold: path.join(FONTS, 'Montserrat-Bold.ttf'),
    italics: path.join(FONTS, 'Montserrat-Medium.ttf'),
    bolditalics: path.join(FONTS, 'Montserrat-SemiBold.ttf')
  },
  MontserratSemiBold: {
    normal: path.join(FONTS, 'Montserrat-SemiBold.ttf'),
    bold: path.join(FONTS, 'Montserrat-Bold.ttf')
  },
  MontserratMedium: {
    normal: path.join(FONTS, 'Montserrat-Medium.ttf'),
    bold: path.join(FONTS, 'Montserrat-SemiBold.ttf')
  }
};
const printer = new PdfPrinter(fonts);

const pick = (f, lang) => (f == null ? '' : (typeof f === 'object' ? (f[lang] || f.en || '') : f));
const CONTENT_W = 515; // A4 595 − 40×2 margins

function ruleLine(width = CONTENT_W, color = GOLD, lw = 0.8, mt = 2, mb = 8) {
  return { canvas: [{ type: 'line', x1: 0, y1: 0, x2: width, y2: 0, lineWidth: lw, lineColor: color }], margin: [0, mt, 0, mb] };
}
function sectionHead(txt) {
  return [
    { text: txt.toUpperCase(), style: 'h2', margin: [0, 12, 0, 4] },
    ruleLine(CONTENT_W, GOLD, 0.8, 0, 8)
  ];
}

function buildDoc(lang) {
  const t = I18N[lang] || I18N.en;
  const c = PROFILE.contact;
  const fullName = pick(c.fullName, lang);
  const role = pick(c.role, lang);

  const content = [];

  /* ---- header: gold bar + name/role | contacts ---- */
  content.push({
    columns: [
      { width: 4, canvas: [{ type: 'rect', x: 0, y: 3, w: 4, h: 48, color: GOLD }] },
      { width: 14, text: '' },
      {
        width: '*',
        stack: [
          { text: fullName, style: 'name' },
          { text: role.toUpperCase(), style: 'role' }
        ]
      },
      {
        width: 'auto',
        alignment: 'right',
        stack: [
          { text: c.phoneDisplay, style: 'contact' },
          { text: c.email, style: 'contact', link: 'mailto:' + c.email, color: INK_SOFT },
          { text: 'rahbarhomidova.com', style: 'contact', link: c.website, color: INK_SOFT },
          { text: pick(c.location, lang), style: 'contact' }
        ]
      }
    ],
    margin: [0, 0, 0, 6]
  });
  content.push(ruleLine(CONTENT_W, GOLD, 1.2, 6, 4));

  /* ---- personal details (compact) ---- */
  var p = c.personal;
  if (p) {
    var PL = lang === 'ru'
      ? { dob: 'Дата рождения', nat: 'Гражданство', mar: 'Семейное положение' }
      : { dob: 'Date of birth', nat: 'Nationality', mar: 'Marital status' };
    content.push({
      text: [
        { text: PL.dob + ': ', bold: true, color: NAVY }, { text: pick(p.dob, lang) },
        { text: '     ·     ' + PL.nat + ': ', bold: true, color: NAVY }, { text: pick(p.nationality, lang) },
        { text: '     ·     ' + PL.mar + ': ', bold: true, color: NAVY }, { text: pick(p.marital, lang) }
      ],
      style: 'personal', margin: [0, 2, 0, 2]
    });
  }

  /* ---- profile / summary ---- */
  content.push(...sectionHead(t.about_title));
  content.push({ text: t.about_p1, style: 'para', margin: [0, 0, 0, 5] });
  content.push({ text: t.about_p2, style: 'para' });

  /* ---- areas of expertise (2 columns) ---- */
  const areas = [
    { title: t.exp1_title, desc: t.exp1_text },
    { title: t.exp2_title, desc: t.exp2_text },
    { title: t.exp3_title, desc: t.exp3_text },
    { title: t.exp4_title, desc: t.exp4_text }
  ];
  const areaBlock = (a) => ({
    stack: [
      { text: a.title, style: 'areaTitle' },
      { text: a.desc, style: 'areaDesc' }
    ],
    margin: [0, 0, 0, 8]
  });
  content.push(...sectionHead(t.expertise_title));
  content.push({
    columns: [
      { width: '*', stack: [areaBlock(areas[0]), areaBlock(areas[2])] },
      { width: 18, text: '' },
      { width: '*', stack: [areaBlock(areas[1]), areaBlock(areas[3])] }
    ]
  });

  /* ---- professional experience (only if provided) ---- */
  if (PROFILE.experience && PROFILE.experience.length) {
    content.push(...sectionHead(t.experience_title));
    PROFILE.experience.forEach((it) => {
      const bullets = (it.bullets && (it.bullets[lang] || it.bullets.en)) || [];
      const loc = pick(it.location, lang);
      const block = [{
        columns: [
          { width: '*', text: pick(it.role, lang), style: 'expRole' },
          { width: 'auto', text: pick(it.period, lang), style: 'period', alignment: 'right' }
        ]
      }];
      block.push({ text: pick(it.org, lang) + (loc ? '  ·  ' + loc : ''), style: 'expOrg' });
      if (it.note) block.push({ text: pick(it.note, lang), style: 'expNote' });
      if (bullets.length) block.push({ ul: bullets, style: 'bullets', margin: [0, 2, 0, 0] });
      else if (it.summary) block.push({ text: pick(it.summary, lang), style: 'para' });
      content.push({ stack: block, margin: [0, 0, 0, 9] });
    });
  }

  /* ---- education (only if provided) ---- */
  if (PROFILE.education && PROFILE.education.length) {
    content.push(...sectionHead(t.education_title));
    PROFILE.education.forEach((it) => {
      content.push({
        stack: [
          {
            columns: [
              { width: '*', text: pick(it.degree, lang), style: 'expRole' },
              { width: 'auto', text: pick(it.period, lang), style: 'period', alignment: 'right' }
            ]
          },
          { text: pick(it.place, lang), style: 'expOrg' }
        ],
        margin: [0, 0, 0, 7]
      });
    });
  }

  /* ---- skills ---- */
  if (PROFILE.skills && PROFILE.skills.length) {
    content.push(...sectionHead(t.skills_title));
    content.push({
      text: PROFILE.skills.map((s) => pick(s, lang)).join('   ·   '),
      style: 'skills'
    });
  }

  /* ---- languages ---- */
  if (PROFILE.languages && PROFILE.languages.length) {
    content.push(...sectionHead(t.languages_title));
    content.push({
      columns: PROFILE.languages.map((l) => ({
        width: '*',
        stack: [
          { text: pick(l.name, lang), style: 'langName' },
          { text: pick(l.level, lang), style: 'langLevel' }
        ]
      }))
    });
  }

  /* ---- memberships ---- */
  if (PROFILE.memberships && PROFILE.memberships.length) {
    content.push(...sectionHead(t.memberships_title));
    content.push({ ul: PROFILE.memberships.map((m) => pick(m, lang)), style: 'bullets' });
  }

  /* ---- trainings & international participation (2 columns) ---- */
  if (PROFILE.trainings && PROFILE.trainings.length) {
    content.push(...sectionHead(t.trainings_title));
    var trLine = (tr) => ({
      text: [
        (tr.year && tr.year !== '—') ? { text: tr.year + '  ', style: 'period' } : { text: '·  ', color: GOLD_DK, bold: true },
        { text: (tr[lang] || tr.en) + (pick(tr.place, lang) ? ', ' + pick(tr.place, lang) : ''), color: INK_SOFT }
      ],
      fontSize: 9, margin: [0, 1.6, 0, 1.6]
    });
    var half = Math.ceil(PROFILE.trainings.length / 2);
    content.push({
      columns: [
        { width: '*', stack: PROFILE.trainings.slice(0, half).map(trLine) },
        { width: 16, text: '' },
        { width: '*', stack: PROFILE.trainings.slice(half).map(trLine) }
      ]
    });
  }

  return {
    pageSize: 'A4',
    pageMargins: [40, 44, 40, 50],
    defaultStyle: { font: 'Montserrat', fontSize: 10, color: INK, lineHeight: 1.3 },
    info: {
      title: fullName + ' — ' + role,
      author: pick(c.fullName, 'en'),
      subject: 'Curriculum Vitae',
      keywords: 'WASH, water sanitation hygiene, ' + role
    },
    content,
    footer: (currentPage, pageCount) => ({
      margin: [40, 10, 40, 0],
      columns: [
        { text: 'rahbarhomidova.com', style: 'foot', link: c.website },
        { text: pick(c.fullName, 'en') + '  ·  ' + (lang === 'ru' ? 'стр. ' : 'p. ') + currentPage + '/' + pageCount, style: 'foot', alignment: 'right' }
      ]
    }),
    styles: {
      name: { font: 'Montserrat', fontSize: 25, bold: true, color: NAVY, characterSpacing: 0.3 },
      role: { font: 'MontserratSemiBold', fontSize: 11, color: GOLD_DK, characterSpacing: 2.2, margin: [0, 4, 0, 0] },
      h2: { font: 'MontserratSemiBold', fontSize: 11, color: GOLD_DK, characterSpacing: 1.6 },
      contact: { fontSize: 9, color: INK_SOFT, margin: [0, 0.5, 0, 0.5] },
      para: { fontSize: 9.7, color: INK_SOFT, lineHeight: 1.38, alignment: 'justify' },
      areaTitle: { font: 'MontserratSemiBold', fontSize: 10.5, color: NAVY, margin: [0, 0, 0, 1] },
      areaDesc: { fontSize: 9, color: MUTED, lineHeight: 1.32 },
      expRole: { font: 'MontserratSemiBold', fontSize: 11, color: NAVY },
      expOrg: { fontSize: 9.5, color: INK_SOFT, margin: [0, 1, 0, 2] },
      expNote: { fontSize: 9, color: GOLD_DK, italics: true, margin: [0, 0, 0, 2] },
      personal: { fontSize: 8.7, color: INK_SOFT },
      period: { fontSize: 9, color: GOLD_DK, bold: true, characterSpacing: 0.4 },
      bullets: { fontSize: 9.4, color: INK_SOFT, lineHeight: 1.3 },
      skills: { fontSize: 10, color: NAVY, lineHeight: 1.5 },
      langName: { font: 'MontserratSemiBold', fontSize: 10.5, color: NAVY },
      langLevel: { fontSize: 9, color: GOLD_DK, characterSpacing: 0.4 },
      foot: { fontSize: 8, color: MUTED }
    }
  };
}

function render(lang, file) {
  return new Promise((resolve, reject) => {
    const pdf = printer.createPdfKitDocument(buildDoc(lang));
    const stream = fs.createWriteStream(file);
    pdf.pipe(stream);
    stream.on('finish', () => resolve(file));
    stream.on('error', reject);
    pdf.on('error', reject);
    pdf.end();
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const en = await render('en', path.join(OUT, 'Rahbar-Homidova-CV-EN.pdf'));
  const ru = await render('ru', path.join(OUT, 'Rahbar-Homidova-CV-RU.pdf'));
  [en, ru].forEach((f) => console.log('✓ PDF', path.relative(ROOT, f), '(' + fs.statSync(f).size + ' bytes)'));
})().catch((e) => { console.error(e); process.exit(1); });
