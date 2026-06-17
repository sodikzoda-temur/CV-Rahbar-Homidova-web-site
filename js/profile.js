/* =========================================================================
   profile.js — SINGLE SOURCE OF TRUTH for structured CV data.
   Consumed by:  the website (js/app.js)  AND  the PDF builder (build/build-pdf.js)
   and the vCard generator (js/vcard.js).
   Fields may be a plain string (same in both languages) or an {en, ru} object.
   ========================================================================= */
(function (root, factory) {
  var data = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  if (typeof window !== 'undefined') window.PROFILE = data;
})(typeof self !== 'undefined' ? self : this, function () {

  var ORG_ISW = {
    en: 'International Secretariat for Water (ISW) / Swiss Development Cooperation (SDC)',
    ru: 'Международный секретариат по воде (ISW) / Швейцарское управление по развитию и сотрудничеству (SDC)'
  };
  var TJ = { en: 'Tajikistan', ru: 'Таджикистан' };

  return {
    contact: {
      firstName: { en: 'Rahbar', ru: 'Рахбар' },
      lastName:  { en: 'Homidova', ru: 'Хомидова' },
      fullName:  { en: 'Rahbar Homidova', ru: 'Рахбар Хомидова' },
      role:      { en: 'WASH Expert', ru: 'Эксперт WASH' },
      currentTitle: { en: 'Social, Hygiene and Sanitation Coordinator', ru: 'Координатор по социальным вопросам, гигиене и санитарии' },
      org:       ORG_ISW,
      phoneDisplay: '+992 991 222 202',
      phoneE164: '+992991222202',
      email: 'rahbar.homidova@gmail.com',
      website: 'https://rahbarhomidova.com',
      location: TJ,
      // Personal details — shown only in the PDF CV (omitted from the public site).
      personal: {
        dob: { en: '9 April 1983', ru: '9 апреля 1983' },
        nationality: { en: 'Tajik', ru: 'Таджикское' },
        marital: { en: 'Married', ru: 'Замужем' }
      }
    },

    // Short facts for the "About" section.
    facts: {
      experience: { en: '18+ years', ru: '18+ лет' },
      languagesShort: { en: 'Tajik · Russian · English · French · Uzbek', ru: 'Таджикский · Русский · Английский · Французский · Узбекский' }
    },

    /* Reverse-chronological. "Present" roles first. */
    experience: [
      {
        period: { en: 'Jan 2021 — Present', ru: 'Янв 2021 — наст. время' },
        role: { en: 'Social, Hygiene and Sanitation Coordinator', ru: 'Координатор по социальным вопросам, гигиене и санитарии' },
        org: ORG_ISW,
        location: TJ,
        note: { en: 'Comprehensive Rural Water Supply & Sanitation Project — Sughd Region', ru: 'Комплексный проект сельского водоснабжения и санитарии — Согдийская область' },
        bullets: {
          en: [
            'Organising consultations with communities and authorities',
            'Supporting establishment and registration of Drinking Water Organisations (DWOs)',
            'Capacity building and mentoring of local water institutions',
            'Supporting tariff systems and financial sustainability',
            'Promoting governance, gender equality and participation',
            'Coordinating hygiene and sanitation programmes',
            'Implementing PHAST-based training programmes',
            'Supporting district WASH planning processes',
            'Monitoring implementation across schools and healthcare facilities',
            'Conducting awareness campaigns and stakeholder engagement activities'
          ],
          ru: [
            'Организация консультаций с сообществами и органами власти',
            'Поддержка создания и регистрации питьевых водных организаций (DWO)',
            'Развитие потенциала и наставничество местных водных институтов',
            'Поддержка тарифных систем и финансовой устойчивости',
            'Продвижение управления, гендерного равенства и участия',
            'Координация программ гигиены и санитарии',
            'Внедрение обучающих программ по методологии PHAST',
            'Поддержка процессов районного WASH-планирования',
            'Мониторинг реализации в школах и медицинских учреждениях',
            'Проведение информационных кампаний и работа со стейкхолдерами'
          ]
        }
      },
      {
        period: '2026',
        role: { en: 'Training of Trainers (ToT) — OSCE', ru: 'Тренинг для тренеров (ToT) — ОБСЕ' },
        org: { en: 'OSCE', ru: 'ОБСЕ' },
        location: TJ,
        bullets: {
          en: [
            'Facilitation and training delivery using participatory methods',
            'Delivered university training on Integrated Water Resources Management (IWRM)'
          ],
          ru: [
            'Фасилитация и проведение тренингов с использованием партисипативных методов',
            'Проведение университетского тренинга по интегрированному управлению водными ресурсами (IWRM)'
          ]
        }
      },
      {
        period: { en: '2025 — 2026', ru: '2025 — 2026' },
        role: { en: 'Local Consultant — RSK / GEF-funded Programme', ru: 'Местный консультант — программа RSK / ГЭФ' },
        org: { en: 'RSK / GEF', ru: 'RSK / ГЭФ' },
        location: TJ,
        bullets: {
          en: [
            'Local coordination and implementation support',
            'Community consultations and data collection'
          ],
          ru: [
            'Местная координация и поддержка реализации',
            'Консультации с сообществами и сбор данных'
          ]
        }
      },
      {
        period: { en: '2022 — 2025', ru: '2022 — 2025' },
        role: { en: 'District WASH Planning & Local Governance', ru: 'Районное WASH-планирование и местное управление' },
        org: { en: 'WASH governance assignments', ru: 'Проекты в сфере WASH-управления' },
        location: TJ,
        bullets: {
          en: [
            'Development of District WASH Plans',
            'Stakeholder consultations',
            'Community participation and gender integration'
          ],
          ru: [
            'Разработка районных планов WASH',
            'Консультации со стейкхолдерами',
            'Участие сообществ и гендерная интеграция'
          ]
        }
      },
      {
        period: { en: 'Apr 2020 — Dec 2020', ru: 'Апр 2020 — Дек 2020' },
        role: { en: 'Project Coordinator', ru: 'Координатор проекта' },
        org: ORG_ISW,
        location: TJ,
        note: { en: 'COVID-19 Emergency Response', ru: 'Экстренное реагирование на COVID-19' },
        bullets: {
          en: [
            'Coordination of emergency WASH response',
            'Procurement and distribution of hygiene and sanitation supplies',
            'Coordination with hospitals and schools',
            'Supplier and stakeholder management',
            'Public awareness and prevention campaigns'
          ],
          ru: [
            'Координация экстренного WASH-реагирования',
            'Закупка и распределение средств гигиены и санитарии',
            'Координация с больницами и школами',
            'Управление поставщиками и стейкхолдерами',
            'Информационные и профилактические кампании'
          ]
        }
      },
      {
        period: { en: 'Jan 2014 — Dec 2019', ru: 'Янв 2014 — Дек 2019' },
        role: { en: 'Social, Hygiene and Sanitation Coordinator', ru: 'Координатор по социальным вопросам, гигиене и санитарии' },
        org: ORG_ISW,
        location: TJ,
        note: { en: 'Rural Water Supply & Sanitation Project — Ferghana Valley', ru: 'Проект сельского водоснабжения и санитарии — Ферганская долина' },
        bullets: {
          en: [
            'Community engagement and institutional support',
            'Establishment of Drinking Water Organisations',
            'Training and monitoring of local water operators',
            'Hygiene promotion programmes',
            'School sanitation initiatives',
            'Coordination with education and health sectors'
          ],
          ru: [
            'Вовлечение сообществ и институциональная поддержка',
            'Создание питьевых водных организаций',
            'Обучение и мониторинг местных операторов водоснабжения',
            'Программы продвижения гигиены',
            'Инициативы по школьной санитарии',
            'Координация с секторами образования и здравоохранения'
          ]
        }
      },
      {
        period: { en: 'Apr 2008 — Dec 2013', ru: 'Апр 2008 — Дек 2013' },
        role: { en: 'Social and Hygiene Coordinator', ru: 'Координатор по социальным вопросам и гигиене' },
        org: ORG_ISW,
        location: TJ,
        note: { en: 'Regional Rural Water Supply & Sanitation Project', ru: 'Региональный проект сельского водоснабжения и санитарии' },
        bullets: {
          en: [
            'Capacity building of water associations',
            'Community surveys and hygiene assessments',
            'Development of awareness materials',
            'Coordination of training and behaviour change programmes',
            'Promotion of project activities and stakeholder relations'
          ],
          ru: [
            'Развитие потенциала водных ассоциаций',
            'Опросы сообществ и оценка гигиены',
            'Разработка информационных материалов',
            'Координация программ обучения и изменения поведения',
            'Продвижение проектной деятельности и связи со стейкхолдерами'
          ]
        }
      },
      {
        period: { en: '2007 — 2008', ru: '2007 — 2008' },
        role: { en: 'Leading Specialist', ru: 'Ведущий специалист' },
        org: { en: 'Kairakkum City State Administration — Department of Youth Affairs', ru: 'Государственная администрация г. Кайраккум — Отдел по делам молодёжи' },
        location: TJ,
        bullets: {
          en: [
            'Youth empowerment activities',
            'Cooperation with NGOs and donors',
            'Event and logistics coordination'
          ],
          ru: [
            'Деятельность по расширению возможностей молодёжи',
            'Сотрудничество с НПО и донорами',
            'Координация мероприятий и логистики'
          ]
        }
      },
      {
        period: { en: '2003 — 2007', ru: '2003 — 2007' },
        role: { en: 'Coordinator for Program Trainers / Youth Centre Coordinator', ru: 'Координатор тренеров программ / координатор молодёжного центра' },
        org: { en: 'Population Services International (PSI)', ru: 'Population Services International (PSI)' },
        location: { en: 'Sughd Province, Tajikistan', ru: 'Согдийская область, Таджикистан' },
        note: { en: 'Drug Demand Reduction & HIV/AIDS Prevention Programmes', ru: 'Программы снижения спроса на наркотики и профилактики ВИЧ/СПИД' },
        bullets: {
          en: [
            'Training and mentoring teams',
            'Educational programme implementation',
            'Monitoring and reporting',
            'Coordination with government institutions'
          ],
          ru: [
            'Обучение и наставничество команд',
            'Реализация образовательных программ',
            'Мониторинг и отчётность',
            'Координация с государственными учреждениями'
          ]
        }
      },
      {
        period: { en: '2001 — 2003', ru: '2001 — 2003' },
        role: { en: 'Monitor / Trainer', ru: 'Монитор / тренер' },
        org: { en: 'UNICEF — WASH in Schools Programme', ru: 'ЮНИСЕФ — программа «WASH в школах»' },
        location: { en: 'Sughd Province, Tajikistan', ru: 'Согдийская область, Таджикистан' },
        bullets: {
          en: [
            'School sanitation activities',
            'Hygiene education',
            'Volunteer mobilisation',
            'Water quality and waste management activities'
          ],
          ru: [
            'Мероприятия по школьной санитарии',
            'Гигиеническое просвещение',
            'Мобилизация волонтёров',
            'Контроль качества воды и управление отходами'
          ]
        }
      }
    ],

    education: [
      {
        period: { en: '2006 — 2012', ru: '2006 — 2012' },
        degree: { en: 'Diploma in Diplomacy', ru: 'Диплом по специальности «Дипломатия»' },
        place: { en: 'Tajik State University of Law, Business and Politics — Faculty of International Relations', ru: 'Таджикский государственный университет права, бизнеса и политики — факультет международных отношений' }
      },
      {
        period: { en: '2001 — 2006', ru: '2001 — 2006' },
        degree: { en: 'Diploma with Distinction — Designer-Technologist', ru: 'Диплом с отличием — дизайнер-технолог' },
        place: { en: 'Tajik State Technical University, Khujand Branch — Faculty of Technology', ru: 'Таджикский технический университет, Худжандский филиал — технологический факультет' }
      }
    ],

    skills: [
      { en: 'Community Mobilisation & Empowerment', ru: 'Мобилизация и расширение возможностей сообществ' },
      { en: 'Rural Water Supply & Sanitation (WASH)', ru: 'Сельское водоснабжение и санитария (WASH)' },
      { en: 'Hygiene Promotion & Behaviour Change', ru: 'Продвижение гигиены и изменение поведения' },
      { en: 'PHAST Methodology', ru: 'Методология PHAST' },
      { en: 'Capacity Building & Training Facilitation', ru: 'Развитие потенциала и фасилитация обучения' },
      { en: 'Educational Materials & Manuals', ru: 'Образовательные материалы и пособия' },
      { en: 'Government & Institutional Cooperation', ru: 'Сотрудничество с госструктурами и институтами' },
      { en: 'Project Coordination', ru: 'Координация проектов' },
      { en: 'Stakeholder Engagement', ru: 'Работа со стейкхолдерами' },
      { en: 'Governance & Institutional Strengthening', ru: 'Управление и институциональное укрепление' },
      { en: 'Social Inclusion & Gender Mainstreaming', ru: 'Социальная инклюзия и гендерное равенство' },
      { en: 'Microsoft Office (Word, Excel, PowerPoint, Access)', ru: 'Microsoft Office (Word, Excel, PowerPoint, Access)' }
    ],

    languages: [
      { name: { en: 'Tajik',   ru: 'Таджикский' }, level: { en: 'Native',       ru: 'Родной' },        value: 100 },
      { name: { en: 'Russian', ru: 'Русский' },    level: { en: 'Fluent',       ru: 'Свободно' },      value: 95 },
      { name: { en: 'English', ru: 'Английский' }, level: { en: 'Fluent',       ru: 'Свободно' },      value: 90 },
      { name: { en: 'Uzbek',   ru: 'Узбекский' },  level: { en: 'Intermediate', ru: 'Средний' },       value: 60 },
      { name: { en: 'French',  ru: 'Французский' }, level: { en: 'Intermediate', ru: 'Средний' },       value: 50 }
    ],

    memberships: [
      { en: 'Member, People’s Democratic Party of Tajikistan', ru: 'Член Народно-демократической партии Таджикистана' },
      { en: 'Member, TajWSS Network Group', ru: 'Член сети TajWSS Network Group' },
      { en: 'Active participant, Syrdarya Basin Dialogue', ru: 'Активный участник Диалога бассейна реки Сырдарья' },
      { en: 'Member, Syrdarya River Basin Women’s Council', ru: 'Член Женского совета бассейна реки Сырдарья' }
    ],

    trainings: [
      { year: '2002', en: 'OSCE Civil Education Summer Camp', ru: 'Летний лагерь гражданского образования ОБСЕ', place: { en: '', ru: '' } },
      { year: '2012', en: '6th World Water Forum', ru: '6-й Всемирный водный форум', place: { en: 'France', ru: 'Франция' } },
      { year: '2014', en: 'Water Safety Plan Training', ru: 'Тренинг по планам безопасного водоснабжения', place: { en: '', ru: '' } },
      { year: '2014', en: 'Staff Exchange Visit', ru: 'Обменный визит специалистов', place: { en: 'Moldova', ru: 'Молдова' } },
      { year: '2016', en: 'Water Team Days', ru: 'Дни водной команды (Water Team Days)', place: { en: 'Switzerland', ru: 'Швейцария' } },
      { year: '2018, 2019', en: 'AGUASAN', ru: 'AGUASAN', place: { en: 'Switzerland', ru: 'Швейцария' } },
      { year: '2019', en: 'Regional Water Team Days', ru: 'Региональные Дни водной команды', place: { en: 'Bosnia and Herzegovina', ru: 'Босния и Герцеговина' } },
      { year: '—', en: 'International Volunteer Exchange', ru: 'Международный волонтёрский обмен', place: { en: 'Germany, Belgium', ru: 'Германия, Бельгия' } },
      { year: '—', en: 'Regional PSI Meetings', ru: 'Региональные встречи PSI', place: { en: 'Kazakhstan', ru: 'Казахстан' } },
      { year: '—', en: 'Human Rights Courses', ru: 'Курсы по правам человека', place: { en: '', ru: '' } }
    ]
  };
});
