/**
 * Every external destination the page can send a visitor to.
 * Change a link here and it changes everywhere on the page.
 */

/**
 * הכתובת הציבורית של הדף.
 * שימו לב: היא מופיעה גם ב-index.html (canonical/og), public/robots.txt
 * ו-public/sitemap.xml — החלפת דומיין דורשת עדכון בכל ארבעת המקומות.
 *
 * TODO: כתובת זמנית — להחליף בכתובת האמיתית אחרי ההעלאה ל-Vercel
 * (חיפוש CHANGE-ME בפרויקט מוצא את כל ארבעת המקומות).
 */
export const SITE_URL = 'https://CHANGE-ME.vercel.app/'

/** שיתוף הדף בוואטסאפ — ערוץ ההפצה העיקרי, ולכן בלחיצה אחת ולא בהעתקת URL. */
export const WHATSAPP_SHARE_URL = `https://wa.me/?text=${encodeURIComponent(
  `מדריך איזון תזונתי לחגים — 4 עקרונות פשוטים וכלים אינטראקטיביים:\n${SITE_URL}`,
)}`

/** מספר הוואטסאפ שאליו נשלחים לידים מהטופס (פורמט בינלאומי, בלי +). */
export const WHATSAPP_LEAD_NUMBER = '972556677949'

/** קבוצת הוואטסאפ של הקהילה — ה-CTA המשני. */
export const WHATSAPP_COMMUNITY_URL =
  'https://chat.whatsapp.com/G4FjxQhh0VeF9aQ1pkZnAy'

/** אימוני טאבטה קצרים — מוצג בעקרון "פעילות יזומה". */
export const TABATA_URL = 'https://bit.ly/2G8Ff2m'

/** מוצרי HoldOn — ה-CTA השלישוני. */
export const HOLDON_WAKE_SHAKE_URL =
  'https://holdon.co.il/shop/product/107?refid=u_O6rEZw'
export const HOLDON_MY_SIA_URL =
  'https://holdon.co.il/shop/product/106?refid=u_O6rEZw'

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
