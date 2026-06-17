/* =========================================================================
   profile.js — SINGLE SOURCE OF TRUTH for structured CV data.
   Consumed by:  the website (js/app.js)  AND  the PDF builder (build/build-pdf.js)
   and the vCard generator (js/vcard.js).

   Fields can be a plain string (same in both languages) or an {en, ru} object.
   ----------------------------------------------------------------------------
   ▸ contact   — verified from the business card.
   ▸ experience / education — EMPTY until the CV text is provided, then filled in.
   ▸ skills / languages — seeded conservatively from the stated areas of
     expertise; adjust freely. Language levels are sensible defaults — confirm.
   ========================================================================= */
(function (root, factory) {
  var data = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  if (typeof window !== 'undefined') window.PROFILE = data;
})(typeof self !== 'undefined' ? self : this, function () {
  return {
    contact: {
      firstName: { en: 'Rahbar', ru: 'Рахбар' },
      lastName:  { en: 'Homidova', ru: 'Хомидова' },
      fullName:  { en: 'Rahbar Homidova', ru: 'Рахбар Хомидова' },
      role:      { en: 'WASH Expert', ru: 'Эксперт WASH' },
      org:       { en: '', ru: '' },            // organisation — add if desired
      phoneDisplay: '+992 991 222 202',
      phoneE164: '+992991222202',
      email: 'rahbar.homidova@gmail.com',
      website: 'https://rahbarhomidova.com',
      location: { en: 'Tajikistan', ru: 'Таджикистан' }   // add city if desired
    },

    /* Filled in from the CV. Each item:
       { period, role:{en,ru}, org:{en,ru}, location:{en,ru},
         bullets:{ en:[...], ru:[...] } }                                   */
    experience: [],

    /* Filled in from the CV. Each item:
       { period, degree:{en,ru}, place:{en,ru} }                           */
    education: [],

    /* Seeded from the four areas of expertise on the card + natural
       sub-competencies. Edit to taste. */
    skills: [
      { en: 'WASH Programming', ru: 'Программы WASH' },
      { en: 'Social Mobilisation', ru: 'Социальная мобилизация' },
      { en: 'Community Engagement', ru: 'Работа с сообществами' },
      { en: 'Gender & Social Inclusion', ru: 'Гендер и социальная инклюзия' },
      { en: 'Hygiene Promotion', ru: 'Продвижение гигиены' },
      { en: 'Behaviour Change Communication', ru: 'Коммуникация для изменения поведения' },
      { en: 'Climate Resilience', ru: 'Климатическая устойчивость' },
      { en: 'Capacity Building', ru: 'Развитие потенциала' },
      { en: 'Stakeholder Coordination', ru: 'Координация со стейкхолдерами' }
    ],

    /* Levels are sensible defaults — please confirm/adjust. value = 0–100. */
    languages: [
      { name: { en: 'Tajik',   ru: 'Таджикский' }, level: { en: 'Native',        ru: 'Родной' },          value: 100 },
      { name: { en: 'Russian', ru: 'Русский' },    level: { en: 'Fluent',        ru: 'Свободно' },        value: 95 },
      { name: { en: 'English', ru: 'Английский' }, level: { en: 'Professional',  ru: 'Профессиональный' }, value: 85 }
    ]
  };
});
