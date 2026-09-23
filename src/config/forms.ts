/**
 * שמירת לידים דרך Web3Forms — כל ליד מגיע כמייל למשווקת.
 *
 * המפתח מגיע מ-web3forms.com (מזינים מייל ומקבלים אותו במייל). הוא מיועד
 * לשימוש בצד לקוח ואינו סוד — הוא מוטמע בבאנדל בכל מקרה. אפשר להחליף אותו
 * בלי לגעת בקוד דרך משתנה סביבה: .env.local מקומית, ו-Environment Variable
 * ב-Vercel. המפתח שמוטמע כאן הוא של הרשומה ב-config/people.ts, כך שגם
 * משווקות נוספות (שלב 2) יקבלו את הלידים שלהן למייל שלהן.
 *
 * אם המפתח חסר — הטופס ממשיך לעבוד בדיוק כמו קודם (פתיחת וואטסאפ בלבד).
 */
import { person } from './people'

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const envKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

export const WEB3FORMS_ACCESS_KEY: string = envKey?.trim()
  ? envKey
  : person.web3formsAccessKey

export const isLeadStorageEnabled = (): boolean =>
  WEB3FORMS_ACCESS_KEY.trim().length > 0
