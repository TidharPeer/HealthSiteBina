/**
 * שמירת לידים דרך Web3Forms — כל ליד מגיע כמייל.
 *
 * המפתח מגיע מ-web3forms.com (מזינים מייל ומקבלים אותו במייל). הוא מיועד
 * לשימוש בצד לקוח ואינו סוד, אבל הוא נשמר כמשתנה סביבה כדי שיהיה אפשר להחליף
 * אותו בלי לגעת בקוד: .env.local מקומית, ו-Environment Variable ב-Vercel.
 *
 * אם המפתח חסר — הטופס ממשיך לעבוד בדיוק כמו קודם (פתיחת וואטסאפ בלבד).
 */
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export const WEB3FORMS_ACCESS_KEY: string =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? ''

export const isLeadStorageEnabled = (): boolean =>
  WEB3FORMS_ACCESS_KEY.trim().length > 0
