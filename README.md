# Rahbar Homidova — сайт-визитка (WASH Expert)

Премиальный двуязычный (EN/RU) сайт-визитка: контакты, описание, экспертиза,
опыт и образование, скачивание резюме в **PDF** и контакта в **vCard (.vcf)**.
Статический сайт — без бэкенда, разворачивается на **GitHub Pages**, домен
**rahbarhomidova.com**.

> Язык по умолчанию определяется по браузеру (RU → русский, иначе английский)
> и запоминается. Английский — британский вариант написания.

---

## ✨ Что внутри

- Адаптивный premium-дизайн в стиле визитки (тёмно-синий · кремовый · золото).
- Переключатель языка EN / RU (весь контент дублируется).
- Скачивание **резюме в PDF** (отдельные файлы EN и RU, кириллица встроена).
- Сохранение **контакта в телефон** одним нажатием (vCard 3.0).
- QR-код «Scan to connect», ведущий на сайт.
- Само-хостинг шрифтов (Montserrat), SEO-разметка, Open Graph, sitemap, PWA-манифест.
- Работает даже при отключённом JavaScript (контент виден всегда).

---

## 📁 Структура

```
index.html              ← разметка и SEO
css/styles.css          ← дизайн-система и все стили
js/
  i18n.js               ← переводы интерфейса и статичных текстов (EN/RU)
  profile.js            ← ★ ЕДИНЫЙ ИСТОЧНИК ДАННЫХ: контакты, опыт, образование, навыки, языки
  app.js                ← логика: язык, рендер секций, vCard, анимации
  vcard.js              ← генерация vCard
assets/
  fonts/                ← Montserrat (woff2 для веба + ttf для PDF)
  img/                  ← portrait.svg (заглушка фото), qr.svg, og-image.png
  icons/                ← favicon и иконки
  Rahbar-Homidova.vcf   ← статический контакт-файл (резерв)
cv/
  Rahbar-Homidova-CV-EN.pdf
  Rahbar-Homidova-CV-RU.pdf
build/                  ← скрипты генерации (PDF, vCard, QR, картинки, скриншоты)
CNAME                   ← домен для GitHub Pages
.github/workflows/deploy.yml ← авто-деплой на GitHub Pages
```

---

## ✏️ Как обновить контент

Почти всё содержимое — в двух файлах. После правок пересоберите PDF (см. ниже).

### 1. Опыт работы и образование → `js/profile.js`
Заполните массивы `experience` и `education`. Пустые массивы → секции скрываются
автоматически. Каждое поле можно задать строкой (одинаково для двух языков) или
объектом `{ en: "...", ru: "..." }`:

```js
experience: [
  {
    period: "2020 — present",                       // или { en:"…", ru:"…" }
    role:   { en: "Senior WASH Specialist", ru: "Старший специалист WASH" },
    org:    { en: "Organisation name",       ru: "Название организации" },
    location: { en: "Dushanbe, Tajikistan",  ru: "Душанбе, Таджикистан" },
    bullets: {
      en: ["Achievement one", "Achievement two"],
      ru: ["Достижение один", "Достижение два"]
    }
  }
],
education: [
  {
    period: "2010 — 2014",
    degree: { en: "BSc in …", ru: "Бакалавр …" },
    place:  { en: "University, City", ru: "Университет, город" }
  }
]
```

`skills` и `languages` тоже в этом файле — отредактируйте по факту (уровни языков
сейчас стоят по умолчанию: таджикский — родной, русский — свободно, английский —
профессиональный).

### 2. Фото → `assets/img/`
Положите фото (например, `portrait.jpg`, портретная ориентация ~4:5) и в
`index.html` замените `src` у `.portrait__img`:
```html
<img class="portrait__img" src="/assets/img/portrait.jpg" alt="Rahbar Homidova" ... >
```

### 3. Тексты интерфейса и описания → `js/i18n.js`
Заголовки, кнопки, текст «Обо мне», описания областей экспертизы.

### 4. Контакты (телефон/email/локация) → `js/profile.js` → `contact`.
Город можно добавить в `location`.

---

## 🔧 Пересборка артефактов (PDF, vCard, QR, картинки)

Требуется Node 18+ и Python 3. Один раз установите зависимости:

```bash
cd build
npm install
pip install "qrcode<9"
```

Затем:

```bash
npm run build      # PDF (EN+RU) + vCard + картинки + QR разом
# либо по отдельности:
npm run pdf        # резюме PDF из profile.js + i18n.js
npm run vcf        # статический .vcf
npm run images     # og-image и PNG-иконки
npm run qr         # QR-код
npm run shots      # QA-скриншоты сайта (build/shots/)
```

> PDF собираются из тех же данных, что и сайт (`js/profile.js` + `js/i18n.js`),
> поэтому правьте контент в одном месте и пересобирайте.

---

## 👀 Локальный предпросмотр

Из-за абсолютных путей откройте через локальный сервер (не `file://`):

```bash
python3 -m http.server 8000
# откройте http://localhost:8000
```

---

## 🚀 Публикация на rahbarhomidova.com (GitHub Pages + Cloudflare)

Домен зарегистрирован и обслуживается в **Cloudflare**, поэтому DNS-записи
добавляются в панели Cloudflare (а не у стороннего регистратора).

### Шаг 1. Залить сайт на GitHub Pages
1. Смержить Pull Request в ветку `main`.
2. Репозиторий → *Settings → Pages → Build and deployment → Source:* **GitHub Actions**.
3. Merge запустит workflow `.github/workflows/deploy.yml` — дождитесь зелёной
   галочки во вкладке *Actions* (файл `CNAME` с доменом уже в репозитории).

### Шаг 2. DNS в Cloudflare
Зайдите на **dash.cloudflare.com** → выберите домен `rahbarhomidova.com` →
вкладка **DNS → Records → Add record** и добавьте:

| Type  | Name (host)          | Content (value)            | Proxy status        |
|-------|----------------------|----------------------------|---------------------|
| A     | `rahbarhomidova.com` | `185.199.108.153`          | **DNS only** (серое облако) |
| A     | `rahbarhomidova.com` | `185.199.109.153`          | **DNS only** |
| A     | `rahbarhomidova.com` | `185.199.110.153`          | **DNS only** |
| A     | `rahbarhomidova.com` | `185.199.111.153`          | **DNS only** |
| CNAME | `www`                | `sodikzoda-temur.github.io`| **DNS only** |

> В поле **Name** для apex-домена можно ввести `@` или `rahbarhomidova.com`.
> **Важно:** оставьте **серое облако (DNS only)**, пока GitHub не выпустит
> TLS-сертификат — оранжевый прокси Cloudflare может помешать его выдаче.
>
> (Опционально IPv6 — записи `AAAA` на apex: `2606:50c0:8000::153`,
> `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.)

### Шаг 3. Привязать домен и включить HTTPS
1. *Settings → Pages → Custom domain:* введите `rahbarhomidova.com` → **Save**
   (GitHub проверит DNS — может занять несколько минут).
2. Когда проверка пройдёт, поставьте галочку **Enforce HTTPS**.

### Шаг 4 (опционально). Включить прокси Cloudflare
После того как сайт открывается по `https://rahbarhomidova.com`:
в Cloudflare *SSL/TLS → Overview* выберите режим **Full**, затем при желании
переключите записи на **оранжевое облако** (Proxied) — получите CDN/кэш и защиту
Cloudflare. При режиме *Flexible* будет «redirect loop» — используйте только **Full**.

> Распространение DNS — обычно несколько минут (у Cloudflare быстро), иногда до 24 часов.

---

## 🛠 Технологии
Чистый HTML + CSS + JavaScript (без фреймворков). PDF — `pdfmake`,
изображения — `sharp`, QR — `qrcode` (Python). Деплой — GitHub Actions → Pages.
