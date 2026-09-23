/**
 * Every external destination the page can send a visitor to.
 * Change a link here and it changes everywhere on the page.
 *
 * הלינקים האישיים (וואטסאפ, קהילה, חנות) נגזרים מ-person — הרשומה שנפתרה
 * מהפרמטר ?ref= בלינק. ראו config/people.ts.
 */
import { person } from './people'

/**
 * הכתובת הציבורית של הדף.
 * שימו לב: היא מופיעה גם ב-index.html (canonical/og), public/robots.txt
 * ו-public/sitemap.xml — החלפת דומיין דורשת עדכון בכל ארבעת המקומות.
 */
export const SITE_URL = 'https://fitk-bina.vercel.app/'

/** שיתוף הדף בוואטסאפ — ערוץ ההפצה העיקרי, ולכן בלחיצה אחת ולא בהעתקת URL. */
export const WHATSAPP_SHARE_URL = `https://wa.me/?text=${encodeURIComponent(
  `מדריך איזון תזונתי לחגים — 4 עקרונות פשוטים וכלים אינטראקטיביים:\n${SITE_URL}`,
)}`

/** מספר הוואטסאפ שאליו נשלחים לידים מהטופס — של המשווקת מהלינק. */
export const WHATSAPP_LEAD_NUMBER = person.whatsappLeadNumber

/** קבוצת הוואטסאפ של הקהילה — ה-CTA המשני. */
export const WHATSAPP_COMMUNITY_URL = person.whatsappCommunityUrl

/** אימוני טאבטה קצרים — מוצג בעקרון "פעילות יזומה". */
export const TABATA_URL = 'https://bit.ly/2G8Ff2m'

/** מוצרי HoldOn — ה-CTA השלישוני, עם ה-refid של המשווקת מהלינק. */
export const HOLDON_WAKE_SHAKE_URL = person.holdonWakeShakeUrl
export const HOLDON_MY_SIA_URL = person.holdonMySiaUrl

/**
 * מזהי העוגנים שאליהם גוללים כפתורי ה-CTA — וגם מה שמאפשר לשתף קישור ישיר
 * לסקשן מסוים בוואטסאפ, שהוא ערוץ ההפצה העיקרי של הדף.
 */
export const SECTION_IDS = {
  main: 'main',
  problem: 'problem',
  principles: 'principles',
  afterMeal: 'after-meal',
  program: 'program',
  holdon: 'holdon',
  community: 'community',
  faq: 'faq',
} as const
