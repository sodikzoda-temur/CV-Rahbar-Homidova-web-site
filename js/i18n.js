/* =========================================================================
   i18n — UI & content strings (chrome + static copy)
   EN = British English · RU = Russian (terminology aligned with the card)
   Structured list data (experience, education, skills, languages) lives in
   profile.js so it stays a single source for the site AND the PDF build.
   ========================================================================= */
(function (root, factory) {
  var data = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  if (typeof window !== 'undefined') window.I18N = data;
})(typeof self !== 'undefined' ? self : this, function () {
  return {
    en: {
      meta_description: "Rahbar Homidova — WASH (Water, Sanitation & Hygiene) expert specialising in social mobilisation, gender integration, hygiene promotion and climate adaptation in the WASH sector.",
      skip_to_content: "Skip to content",
      role: "WASH Expert",
      first_name: "Rahbar",
      last_name: "Homidova",

      nav_about: "About",
      nav_expertise: "Expertise",
      nav_experience: "Experience",
      nav_education: "Education",
      nav_contact: "Contact",

      download_cv: "Download CV (PDF)",
      download_cv_short: "CV",
      save_contact: "Save contact (vCard)",

      hero_tagline: "Advancing equitable access to safe water, sanitation and hygiene — through community mobilisation, gender-responsive programming and climate-resilient solutions.",

      about_eyebrow: "Profile",
      about_title: "About",
      about_p1: "Experienced social development and WASH specialist with over 18 years of expertise in rural water supply, sanitation, hygiene promotion, community mobilisation, institutional capacity building and stakeholder coordination.",
      about_p2: "She currently serves as Social, Hygiene and Sanitation Coordinator, delivering large-scale rural WASH programmes in Tajikistan in partnership with the International Secretariat for Water (ISW) and Swiss Development Cooperation (SDC) — placing community ownership, governance, gender equality and behaviour change at the heart of her work.",

      fact_experience_label: "Experience",
      fact_role_label: "Current role",
      fact_location_label: "Location",
      fact_languages_label: "Languages",

      expertise_eyebrow: "What I do",
      expertise_title: "Areas of Expertise",
      exp1_title: "Social Mobilisation",
      exp1_text: "Engaging and empowering communities to take ownership of WASH initiatives through participatory, locally-led approaches.",
      exp2_title: "Gender Integration",
      exp2_text: "Embedding gender equality and social inclusion across WASH programming, ensuring services respond to the needs of women and girls.",
      exp3_title: "Hygiene Promotion",
      exp3_text: "Driving sustained behaviour change through hygiene education and promotion that improves health and prevents disease.",
      exp4_title: "Climate Adaptation in WASH",
      exp4_text: "Building climate resilience into water and sanitation systems so services withstand a changing climate.",

      experience_eyebrow: "Career",
      experience_title: "Professional Experience",
      education_eyebrow: "Background",
      education_title: "Education",

      skills_eyebrow: "Toolkit",
      skills_title: "Key Skills",
      languages_eyebrow: "Communication",
      languages_title: "Languages",

      memberships_eyebrow: "Engagement",
      memberships_title: "Memberships & Networks",
      trainings_eyebrow: "Continuous learning",
      trainings_title: "Selected Trainings & International Participation",

      contact_eyebrow: "Get in touch",
      contact_title: "Let’s work together",
      contact_lead: "Available for consultancy, partnership and programme collaboration across the WASH sector.",
      label_phone: "Phone",
      label_email: "Email",
      label_location: "Location",
      scan_to_connect: "Scan to connect",

      rights: "All rights reserved.",
      back_to_top: "Back to top ↑",

      content_pending: "Content will be added here.",
      toast_contact_saved: "Contact file downloaded",
      toast_error: "Something went wrong. Please try again."
    },

    ru: {
      meta_description: "Рахбар Хомидова — эксперт WASH (водоснабжение, санитария и гигиена): социальная мобилизация, гендерная экспертиза, продвижение гигиены и адаптация сектора WASH к изменению климата.",
      skip_to_content: "Перейти к содержанию",
      role: "Эксперт WASH",
      first_name: "Рахбар",
      last_name: "Хомидова",

      nav_about: "Обо мне",
      nav_expertise: "Экспертиза",
      nav_experience: "Опыт",
      nav_education: "Образование",
      nav_contact: "Контакты",

      download_cv: "Скачать резюме (PDF)",
      download_cv_short: "Резюме",
      save_contact: "Сохранить контакт (vCard)",

      hero_tagline: "Расширение равного доступа к безопасной воде, санитарии и гигиене — через мобилизацию сообществ, гендерно-ориентированные программы и решения, устойчивые к изменению климата.",

      about_eyebrow: "Профиль",
      about_title: "Обо мне",
      about_p1: "Опытный специалист по социальному развитию и WASH с более чем 18-летним стажем в сфере сельского водоснабжения, санитарии, продвижения гигиены, мобилизации сообществ, укрепления институционального потенциала и координации со стейкхолдерами.",
      about_p2: "В настоящее время занимает должность координатора по социальным вопросам, гигиене и санитарии, реализуя масштабные программы сельского WASH в Таджикистане совместно с Международным секретариатом по воде (ISW) и Швейцарским управлением по развитию и сотрудничеству (SDC) — ставя в центр работы вовлечённость сообществ, управление, гендерное равенство и изменение поведения.",

      fact_experience_label: "Опыт",
      fact_role_label: "Текущая роль",
      fact_location_label: "Локация",
      fact_languages_label: "Языки",

      expertise_eyebrow: "Чем я занимаюсь",
      expertise_title: "Области экспертизы",
      exp1_title: "Социальная мобилизация",
      exp1_text: "Вовлечение и расширение возможностей сообществ для самостоятельной реализации WASH-инициатив через совместные, локально управляемые подходы.",
      exp2_title: "Гендерная экспертиза",
      exp2_text: "Интеграция гендерного равенства и социальной инклюзии в программы WASH, чтобы услуги отвечали потребностям женщин и девочек.",
      exp3_title: "Продвижение гигиены",
      exp3_text: "Устойчивое изменение поведения через гигиеническое просвещение и продвижение практик, улучшающих здоровье и предотвращающих болезни.",
      exp4_title: "Адаптация сектора WASH к изменению климата",
      exp4_text: "Повышение климатической устойчивости систем водоснабжения и санитарии, чтобы услуги выдерживали изменения климата.",

      experience_eyebrow: "Карьера",
      experience_title: "Профессиональный опыт",
      education_eyebrow: "Подготовка",
      education_title: "Образование",

      skills_eyebrow: "Инструментарий",
      skills_title: "Ключевые навыки",
      languages_eyebrow: "Коммуникация",
      languages_title: "Языки",

      memberships_eyebrow: "Вовлечённость",
      memberships_title: "Членство и сети",
      trainings_eyebrow: "Непрерывное обучение",
      trainings_title: "Избранные тренинги и международное участие",

      contact_eyebrow: "Связаться",
      contact_title: "Давайте работать вместе",
      contact_lead: "Открыта для консультаций, партнёрства и совместной реализации программ в секторе WASH.",
      label_phone: "Телефон",
      label_email: "Эл. почта",
      label_location: "Локация",
      scan_to_connect: "Сканируйте, чтобы связаться",

      rights: "Все права защищены.",
      back_to_top: "Наверх ↑",

      content_pending: "Здесь появится информация.",
      toast_contact_saved: "Файл контакта загружен",
      toast_error: "Что-то пошло не так. Попробуйте ещё раз."
    }
  };
});
