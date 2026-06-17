/* =========================================================================
   vcard.js — builds a vCard 3.0 (broadest phone/OS compatibility).
   Used by the website (download button) and by the build script (static .vcf).
   ========================================================================= */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.VCard = api;
})(typeof self !== 'undefined' ? self : this, function () {

  function pick(field, lang) {
    if (field == null) return '';
    return typeof field === 'object' ? (field[lang] || field.en || '') : field;
  }

  // Escape per RFC 6350/2426 for vCard text values.
  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;');
  }

  function rev() {
    return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  }

  /**
   * Build a vCard 3.0 string from PROFILE.contact.
   * @param {object} profile  the PROFILE object
   * @param {string} lang     'en' | 'ru'
   * @param {object} [opts]   { photoBase64, photoType }  optional embedded photo
   */
  function build(profile, lang, opts) {
    lang = lang || 'en';
    opts = opts || {};
    var c = profile.contact;
    var given = pick(c.firstName, lang);
    var family = pick(c.lastName, lang);
    var full = pick(c.fullName, lang) || (given + ' ' + family).trim();
    var role = pick(c.role, lang);
    var org = pick(c.org, lang);
    var country = pick(c.location, lang);

    var L = ['BEGIN:VCARD', 'VERSION:3.0'];
    L.push('N:' + esc(family) + ';' + esc(given) + ';;;');
    L.push('FN:' + esc(full));
    if (org) L.push('ORG:' + esc(org));
    if (role) L.push('TITLE:' + esc(role));
    if (c.phoneE164) L.push('TEL;TYPE=CELL,VOICE:' + c.phoneE164);
    if (c.email) L.push('EMAIL;TYPE=INTERNET,PREF:' + c.email);
    if (c.website) L.push('URL:' + c.website);
    if (country) L.push('ADR;TYPE=WORK:;;;;;;' + esc(country));
    // Keep a Latin full name in a NOTE so search works regardless of UI language.
    var latinFull = pick(c.fullName, 'en');
    if (latinFull && latinFull !== full) L.push('NOTE:' + esc(latinFull + ' — ' + pick(c.role, 'en')));
    if (opts.photoBase64) {
      L.push('PHOTO;ENCODING=b;TYPE=' + (opts.photoType || 'JPEG') + ':' + opts.photoBase64);
    }
    L.push('REV:' + rev());
    L.push('END:VCARD');
    return L.join('\r\n') + '\r\n';
  }

  function filename(profile, lang) {
    var full = pick(profile.contact.fullName, 'en') || 'contact';
    return full.replace(/\s+/g, '-') + '.vcf';
  }

  // Browser-only: trigger a download of the vCard.
  function download(profile, lang) {
    var text = build(profile, lang);
    var blob = new Blob([text], { type: 'text/vcard;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename(profile, lang);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  return { build: build, download: download, filename: filename };
});
