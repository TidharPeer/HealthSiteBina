# מדריך איזון תזונתי לחגים — דף נחיתה

דף נחיתה אינטראקטיבי בעברית (RTL), בנוי ב-Vite + React + TypeScript + Tailwind v4.
התוכן והמבנה נלקחו מהמפרט המלא ("מפרט מלא למדריך לאיזון תזונתי בחגים").

## הרצה

```bash
npm install
npm run dev      # שרת פיתוח
npm run build    # בדיקת טיפוסים + build לפרודקשן
npm run preview  # תצוגה מקדימה של ה-build
npm run lint
```

## מבנה

```
src/
  config/links.ts          כל הקישורים החיצוניים ומזהי העוגנים
  lib/lead.ts              ולידציה + בניית הודעת הוואטסאפ של הטופס
  lib/scroll.ts            גלילה לעוגן, מכבדת prefers-reduced-motion
  content/                 כל הטקסטים בעברית, לפי אזור בדף
  components/ui/           פרימיטיבים: Section, Cta, Card, Reveal
  components/interactive/  שלושת האינטראקטיבים
  sections/                אזורי הדף לפי סדר הופעתם ב-App.tsx
```

הטקסטים כולם ב-`src/content/` — לעריכת נוסח אין צורך לגעת בקומפוננטות.

## תמונות

`public/` מכיל רק את הגרסאות הדחוסות שנפרסות בפועל, והן מקושרות דרך
`src/config/images.ts`. שמות הקבצים באנגלית — אין צורך ב-`encodeURI`.

| מיקום | קובץ | גודל |
|---|---|---|
| HERO | `hero-holiday-table.webp` | 157KB |
| אימון טאבטה | `tabata.webp` — בחיתוך עגול, כדי להסתיר את הרקע הכחול | 33KB |
| מוצרי HoldOn | `product-wake-shake.webp`, `product-my-sia.webp` — `object-contain`, הבאנר נכנס שלם | 65KB |
| תצוגה בשיתוף | `og-image.jpg` — 1200×630, חתוך מצילום שולחן החג | 172KB |

**הקבצים המקוריים שמורים ב-`assets-source/`**, שנמצא מחוץ ל-`public/` ולכן
אינו נכלל ב-build. שם נמצאים גם קבצים שאינם בשימוש: לוגו HoldOn, הבאנרים
בגרסה הקטנה, שלוש תמונות "מהאתר", ו-`פעילות על הדרך.png` ששימשה מקור
לשישה הסעיפים ב-`principles.movement.ideas`.

להוספת תמונה: לדחוס ולשמור ב-`public/` בשם באנגלית, להוסיף קבוע
ב-`src/config/images.ts`, ולשמור את המקור ב-`assets-source/`.

## ערכים ב-`src/config/links.ts`

| קבוע | ערך נוכחי |
|---|---|
| `WHATSAPP_LEAD_NUMBER` | `972556677949` — היעד של טופס הלידים |
| `WHATSAPP_COMMUNITY_URL` | קבוצת הקהילה |
| `TABATA_URL` | `bit.ly/2G8Ff2m` |
| `HOLDON_*` | דפי המוצר (כולל `refid`) |

## טופס הלידים

`submitLead()` ב-`src/lib/lead.ts` עושה שני דברים, בסדר הזה:

1. **שומר את הליד** ב-Web3Forms — כל ליד מגיע כמייל.
2. **פותח וואטסאפ** עם הודעה מוכנה הכוללת את השם והטלפון.

השמירה קודמת בכוונה: בלעדיה, מי שממלא את הטופס אבל לא לוחץ "שלח" בוואטסאפ
נעלם בלי זכר. הבקשה נשלחת עם `keepalive` וללא `await` — אסור שתהיה המתנה
לפני `window.open`, אחרת חוסמי פופ-אפים יחסמו את פתיחת וואטסאפ.

### הגדרת המפתח

1. להיכנס ל-web3forms.com, להזין מייל ולקבל `access key` במייל.
2. **מקומית:** ליצור `.env.local` (ראו `.env.example`) עם
   `VITE_WEB3FORMS_ACCESS_KEY=המפתח`.
3. **בפרודקשן:** Vercel → Settings → Environment Variables, אותו שם ואותו ערך,
   ואז Redeploy.

**בלי המפתח הטופס לא נשבר** — הוא פשוט מדלג על השמירה וממשיך לוואטסאפ,
בדיוק כמו קודם.

## מדידה

שני ספקים, בכוונה:

- **`@vercel/analytics`** (`src/main.tsx`) — צפיות בדפים בלבד. Web Analytics
  מופעל בלוח הבקרה של Vercel.
- **Google Analytics 4** (`src/lib/analytics.ts`) — האירועים העסקיים.

### למה GA4 ולא Custom Events של Vercel

[טבלת התוכניות של Vercel](https://vercel.com/docs/analytics/limits-and-pricing)
מראה ש-**Custom Events אינם כלולים בתוכנית Hobby** — הם דורשים Pro. בגלל זה
האירועים הוסרו בעבר, והדף נשאר בלי שום ידיעה מה נלחץ. GA4 חינמי וללא הגבלת
אירועים, ולכן המדידה חזרה דרכו.

### האירועים

| אירוע | מתי | למה |
| --- | --- | --- |
| `program_view` | סקשן הליווי נכנס לתצוגה | ההפרש מול `program_cta_click` מראה אם הגלילה עובדת |
| `program_cta_click` | לחיצה על CTA ראשי | נגזר אוטומטית מהיעד ב-`Cta.tsx`, כולל `source` לסרגל הדביק |
| `widget_used` | התנסות ראשונה בווידג'ט | פעם אחת לווידג'ט (`trackWidgetOnce`) |
| `lead_submit` | טופס נשלח בהצלחה | כולל `has_note` |
| `whatsapp_blocked` | הדפדפן חסם את פתיחת הוואטסאפ | אם השיעור גבוה, ההעברה היא צוואר בקבוק אמיתי |
| `community_click` | לחיצה על קישור הקהילה | |
| `guide_shared` | שיתוף הדף בוואטסאפ | ערוץ ההפצה העיקרי |

### הגדרה

`VITE_GA_MEASUREMENT_ID` (Admin → Data Streams → Measurement ID), מקומית
ב-`.env.local` ובפרודקשן ב-Environment Variables של Vercel.
**בלי המזהה סקריפט GA לא נטען כלל** ו-`track()` הוא פעולה ריקה — כך סביבת
פיתוח לא מזהמת את הנתונים.

## נתונים מובנים (JSON-LD)

`vite.config.ts` מזריק ל-`index.html` בזמן ה-build בלוק `FAQPage`
**שנבנה מקבצי התוכן עצמם**. עריכת שאלה ב-`src/content/faq.ts`
מעדכנת גם את הנתונים המובנים, כך שאי אפשר שהם ייצאו מסנכרון עם מה שהגולש רואה.

לבדיקה: להריץ את הכתובת ב-[Rich Results Test](https://search.google.com/test/rich-results).

## היררכיית CTA

לפי המפרט, ובקוד היא נשמרת:

1. **ראשי** (טרקוטה) — שמיעת פרטים על הליווי. כל CTA ראשי בדף גולל לאותו טופס.
2. **משני** (מסגרת ירוקה) — הצטרפות לקהילת הוואטסאפ.
3. **שלישוני** (קישור) — מוצרי HoldOn.

הדף לא מציג מחיר: המפרט לא כולל מחיר, והמסלול שהוא מתאר מוביל לשיחה מקדימה.

## צבע ונגישות

### שתי טרקוטות, לא אחת

טרקוטת המפרט (`--color-terracotta: #c9795b`) יפה אבל נופלת ב-WCAG AA ככל שהיא
נושאת טקסט: כ-3:1 מול לבן, ו-2.8:1 מול `sage`. לכן היא פוצלה:

- `--color-terracotta` — **דקורטיבי בלבד**: גבולות, רקעים שקופים (`bg-terracotta/8`), הילות.
- `--color-terracotta-ink: #9e5236` — **כל מה שנושא טקסט**: eyebrows, הודעות שגיאה,
  מילוי כפתור ה-CTA הראשי. עובר AA (≥4.8:1) על cream, sage ולבן.

`--color-muted` הוכהה מ-`#66716c` ל-`#5c6763` מאותה סיבה — הוא נפל על רקע `sage`,
והוא נושא טקסט גוף בכל הסקשנים הירוקים.

**לפני שינוי צבע**: לחשב את היחס, לא להעריך בעין.

```bash
npm run check:contrast
```

`scripts/check-contrast.mjs` בודק את כל צירופי הצבעים שהדף באמת משתמש בהם —
כולל שכבות שקופות כמו `bg-terracotta/8` ו-`text-white/85` — ונכשל עם קוד יציאה 1.
הטוקנים בסקריפט חייבים להישאר זהים ל-`@theme` ב-`src/index.css`.

### טבעת המיקוד דו-צבעית

מתאר בטרקוטה כהה **פלוס** `box-shadow` לבן. המתאר לבדו נבלע ברקע הכהה של
`FinalCta`, והלבן לבדו נבלע ב-cream — יחד, אחד מהשניים תמיד בניגוד מספיק.

### גלילה מזיזה גם את המיקוד

`scrollToSection()` קורא `target.focus({ preventScroll: true })` אחרי הגלילה.
בלי זה משתמש מקלדת לוחץ CTA, הדף גולל — והמיקוד נשאר על הכפתור שעזב.
בגלל זה כל `Section` עם `id` מקבל `tabIndex={-1}`.

## הערה על כתובת האתר

`SITE_URL` ב-`src/config/links.ts` היא רק אחד מארבעה מקומות שבהם מופיעה הכתובת.
מעבר לדומיין אחר דורש עדכון גם ב-`index.html` (canonical + og), `public/robots.txt`
ו-`public/sitemap.xml`.
