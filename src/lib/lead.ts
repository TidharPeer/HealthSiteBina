import {
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  isLeadStorageEnabled,
} from '../config/forms'
import { WHATSAPP_LEAD_NUMBER } from '../config/links'
import { source } from '../config/people'
import { PROGRAM_NAME } from '../content/program'

export type Lead = {
  name: string
  phone: string
  note?: string
}

export type LeadErrors = Partial<Record<'name' | 'phone', string>>

/** מספר ישראלי תקין: 05X-XXXXXXX, גם עם רווחים/מקפים או קידומת בינלאומית. */
const ISRAELI_MOBILE = /^(?:\+?972|0)5\d{8}$/

export function validateLead(lead: Lead): LeadErrors {
  const errors: LeadErrors = {}

  if (lead.name.trim().length < 2) {
    errors.name = 'נשמח לדעת איך לפנות אליכם'
  }

  const digits = lead.phone.replace(/[\s-()]/g, '')
  if (!digits) {
    errors.phone = 'צריך מספר טלפון כדי שנוכל לחזור אליכם'
  } else if (!ISRAELI_MOBILE.test(digits)) {
    errors.phone = 'מספר הטלפון לא נראה תקין. לדוגמה: 050-1234567'
  }

  return errors
}

export function buildLeadMessage(lead: Lead): string {
  const lines = [
    'היי! הגעתי מדף המדריך לאיזון תזונתי בחגים.',
    `אשמח לשמוע פרטים על ${PROGRAM_NAME}.`,
    '',
    `שם: ${lead.name.trim()}`,
    `טלפון: ${lead.phone.trim()}`,
  ]

  const note = lead.note?.trim()
  if (note) {
    lines.push(`רציתי לספר: ${note}`)
  }

  return lines.join('\n')
}

/**
 * שמירת הליד ב-Web3Forms (מייל למשווקת), כדי שגם מי שלא ילחץ "שלח" בוואטסאפ
 * לא ייעלם. מחזירה Promise שמסמן אם הליד באמת נקלט — הטופס משתמש בזה כדי
 * להציג "הפרטים הגיעו" רק אחרי מסירה אמיתית, ולא לטעון קבלה שלא קרתה.
 */
function storeLead(lead: Lead): Promise<boolean> {
  if (!isLeadStorageEnabled()) return Promise.resolve(false)

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: 'ליד חדש מדף המדריך לאיזון תזונתי בחגים',
    from_name: 'דף המדריך לחגים',
    שם: lead.name.trim(),
    טלפון: lead.phone.trim(),
    הערה: lead.note?.trim() || '—',
    // שדה נסתר: מאיזה לינק הגיע הליד (?ref=), או "ישיר"
    'הגיע דרך': source ?? 'ישיר',
    botcheck: '',
  }

  return fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    // הבקשה מושלמת גם אם הלשונית מנווטת מיד אחרי כן
    keepalive: true,
  })
    // "נקלט" רק כשה-API מחזיר success: true בגוף התשובה — לא מספיק סטטוס 200
    .then(async (response) => {
      if (!response.ok) return false
      const data = (await response.json().catch(() => null)) as {
        success?: boolean
      } | null
      return data?.success === true
    })
    .catch(() => {
      // כשל בשמירה לא אמור לפגוע במשתמש — הוא ממשיך לוואטסאפ כרגיל
      return false
    })
}

/** קישור הוואטסאפ עם ההודעה המוכנה — גם לפתיחה אוטומטית וגם לקישור הגיבוי. */
export function buildWhatsappUrl(lead: Lead): string {
  const text = encodeURIComponent(buildLeadMessage(lead))
  return `https://wa.me/${WHATSAPP_LEAD_NUMBER}?text=${text}`
}

export type LeadSubmission = {
  whatsappUrl: string
  /** false כשחוסם פופ-אפים מנע את פתיחת החלון — אז הקישור הגלוי הוא הדרך היחידה. */
  opened: boolean
  /** true רק אם הליד באמת נקלט אצל המשווקת (מייל). */
  delivered: Promise<boolean>
}

/**
 * שליחת ליד: שומרים אותו, ומיד פותחים וואטסאפ עם הודעה מוכנה.
 *
 * חשוב: אין כאן await לפני window.open. ברגע שהפתיחה יוצאת מהקשר הלחיצה של
 * המשתמש, חוסמי פופ-אפים חוסמים אותה — ולכן ה-window.open נשאר סינכרוני,
 * ואישור הקליטה מגיע מאוחר יותר דרך ה-Promise שב-delivered.
 *
 * הפתיחה היא בלי 'noopener': לפי המפרט window.open עם noopener מחזיר תמיד null,
 * ואז אי אפשר להבחין בין הצלחה לחסימה. במקום זה מנתקים את opener ידנית — אותה
 * הגנה מפני reverse tabnabbing, אבל עם ערך החזרה שאפשר לבדוק.
 */
export function submitLead(lead: Lead): LeadSubmission {
  const delivered = storeLead(lead)

  const whatsappUrl = buildWhatsappUrl(lead)
  const opened = window.open(whatsappUrl, '_blank')
  if (opened) opened.opener = null

  return { whatsappUrl, opened: opened !== null, delivered }
}
