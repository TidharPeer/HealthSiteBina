/**
 * מדידה ב-Google Analytics 4.
 *
 * @vercel/analytics נותן צפיות בדף בלבד — Custom Events חסומים במסלול Hobby,
 * ולכן האירועים המותאמים הוסרו בעבר. GA4 חינמי וללא הגבלת אירועים, אז המדידה
 * העסקית (מה נלחץ, מי משתמש בווידג'טים, כמה טפסים נשלחו) חזרה לכאן.
 *
 * מזהה המדידה (G-XXXXXXXXXX) אינו סוד — הוא גלוי בכל דף שמריץ GA — אבל הוא נשמר
 * כמשתנה סביבה כדי שיהיה אפשר להחליף אותו בלי לגעת בקוד, ובעיקר כדי שסביבת
 * הפיתוח לא תזהם את הנתונים: בלי מזהה, סקריפט GA לא נטען בכלל.
 */
export const GA_MEASUREMENT_ID: string =
  import.meta.env.VITE_GA_MEASUREMENT_ID ?? ''

export const isAnalyticsEnabled = (): boolean =>
  GA_MEASUREMENT_ID.trim().length > 0
