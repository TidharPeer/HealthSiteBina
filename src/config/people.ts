/**
 * פרסונליזציה של הדף לפי משווק/ת — התשתית לשלב 2 (פתיחת הדף לצוות).
 *
 * כל רשומה מחזיקה את מה שמשתנה בין משווקים: מספר הוואטסאפ שאליו מגיע הליד,
 * המייל שאליו נשלח עותק, מפתח ה-Web3Forms של אותו מייל, וקישורי החנות עם
 * ה-refid האישי. המבקר מגיע עם ?ref=<id> בלינק; ברירת המחדל היא בינה.
 *
 * הוספת משווקת חדשה (שלב 2): מוסיפים רשומה ל-PEOPLE ומפיקים לה מפתח
 * Web3Forms פעם אחת ב-web3forms.com עם המייל שלה.
 */

export type Person = {
  /** המזהה שמופיע בפרמטר ?ref= בלינק. */
  id: string
  /** מספר הוואטסאפ שאליו נשלחים לידים (פורמט בינלאומי, בלי +). */
  whatsappLeadNumber: string
  /** המייל שאליו נשלח עותק של כל ליד — חייב להתאים למפתח ה-Web3Forms. */
  leadEmail: string
  /** מפתח Web3Forms של המייל (פומבי מטבעו — מוטמע בבאנדל בכל מקרה). */
  web3formsAccessKey: string
  holdonWakeShakeUrl: string
  holdonMySiaUrl: string
  whatsappCommunityUrl: string
}

const BINA: Person = {
  id: 'bina',
  whatsappLeadNumber: '972556677949',
  leadEmail: 'binamaa@gmail.com',
  web3formsAccessKey: '34314232-de22-4b01-b906-964c3eedea36',
  holdonWakeShakeUrl: 'https://holdon.co.il/shop/product/107?refid=u_O6rEZw',
  holdonMySiaUrl: 'https://holdon.co.il/shop/product/106?refid=u_O6rEZw',
  whatsappCommunityUrl: 'https://chat.whatsapp.com/G4FjxQhh0VeF9aQ1pkZnAy',
}

/** טבלת המיפוי של הצוות. כרגע בינה בלבד; בשלב 2 מוסיפים שורה לכל משווקת. */
export const PEOPLE: Record<string, Person> = {
  bina: BINA,
}

const STORAGE_KEY = 'fitk_ref'

/**
 * פותר את זהות המשווקת מהלינק (?ref=) פעם אחת בטעינת הדף.
 * נשמר ב-sessionStorage כדי שהזהות תלווה את המבקר גם אם הפרמטר ייעלם
 * מהכתובת בהמשך הגלישה (למשל בשיתוף חוזר מהדף).
 */
export function resolvePerson(): Person {
  try {
    const ref = new URLSearchParams(window.location.search).get('ref')
    if (ref && PEOPLE[ref]) {
      window.sessionStorage.setItem(STORAGE_KEY, ref)
      return PEOPLE[ref]
    }
    const saved = window.sessionStorage.getItem(STORAGE_KEY)
    if (saved && PEOPLE[saved]) return PEOPLE[saved]
  } catch {
    // סביבה ללא window — נופלים לברירת המחדל
  }
  return BINA
}

/** הרשומה הפעילה של הדף הנוכחי — כל הקישורים והטופס נגזרים ממנה. */
export const person = resolvePerson()
