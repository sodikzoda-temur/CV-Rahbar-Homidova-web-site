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
      about_p1: "Rahbar Homidova is a WASH (Water, Sanitation and Hygiene) expert committed to advancing equitable, sustainable access to safe water, sanitation and hygiene for communities. Her practice connects people-centred social mobilisation with gender-responsive programming, behaviour-change and hygiene promotion, and climate-resilient approaches to the WASH sector.",
      about_p2: "She partners with communities, institutions and development organisations to design and deliver programmes that are inclusive, evidence-informed and built to last — placing dignity, equity and local ownership at the centre of every intervention.",

      fact_focus_label: "Focus",
      fact_focus_value: "WASH sector",
      fact_location_label: "Location",
      fact_location_value: "Tajikistan",
      fact_languages_label: "Languages",
      fact_languages_value: "Tajik · Russian · English",

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
      education_title: "Education & Certifications",

      skills_eyebrow: "Toolkit",
      skills_title: "Key Skills",
      languages_eyebrow: "Communication",
      languages_title: "Languages",

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
      about_p1: "Рахбар Хомидова — эксперт в области WASH (водоснабжение, санитария и гигиена), нацеленный на расширение равного и устойчивого доступа сообществ к безопасной воде, санитарии и гигиене. В своей работе она объединяет социальную мобилизацию, ориентированную на людей, с гендерно-чувствительными программами, изменением поведения и продвижением гигиены, а также подходами к адаптации сектора WASH к изменению климата.",
      about_p2: "Она сотрудничает с сообществами, учреждениями и организациями развития, чтобы разрабатывать и реализовывать инклюзивные, основанные на данных и долгосрочные программы — ставя достоинство, равенство и местную вовлечённость в центр каждого вмешательства.",

      fact_focus_label: "Направление",
      fact_focus_value: "Сектор WASH",
      fact_location_label: "Локация",
      fact_location_value: "Таджикистан",
      fact_languages_label: "Языки",
      fact_languages_value: "Таджикский · Русский · Английский",

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
      education_title: "Образование и сертификаты",

      skills_eyebrow: "Инструментарий",
      skills_title: "Ключевые навыки",
      languages_eyebrow: "Коммуникация",
      languages_title: "Языки",

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
