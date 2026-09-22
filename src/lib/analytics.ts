import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from '../config/analytics'

/**
 * האירועים שהדף מודד. הרשימה סגורה בכוונה — שם אירוע שגוי הוא נתון שאבד בשקט,
 * ובלוח המחוונים אי אפשר להבחין בינו לבין "לא קרה".
 */
export type EventName =
  /** הגולש הגיע בפועל לסקשן הליווי (לא רק לחץ CTA) */
  | 'program_view'
  /** התנסות באחד משלושת הווידג'טים — נמדד פעם אחת לווידג'ט */
  | 'widget_used'
  /** לחיצה על CTA ראשי שמוביל לטופס */
  | 'program_cta_click'
  /** הטופס נשלח בהצלחה */
  | 'lead_submit'
  /** הדפדפן חסם את פתיחת הוואטסאפ — מודד כמה גולשים נתקלים בקישור הגיבוי */
  | 'whatsapp_blocked'
  /** לחיצה על קישור קהילת הוואטסאפ */
  | 'community_click'
  /** שיתוף הדף בוואטסאפ — ערוץ ההפצה העיקרי */
  | 'guide_shared'

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

let initialized = false

/**
 * טוען את סקריפט GA פעם אחת. נקרא מ-main.tsx.
 * בלי VITE_GA_MEASUREMENT_ID לא נטען כלום ו-track() הופך ל-no-op.
 */
export function initAnalytics(): void {
  if (initialized || !isAnalyticsEnabled()) return
  initialized = true

  window.dataLayer = window.dataLayer || []
  const gtag: Gtag = (...args) => {
    window.dataLayer!.push(args)
  }
  window.gtag = gtag

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)
}

const usedWidgets = new Set<string>()

/**
 * מדידת התנסות בווידג'ט — פעם אחת בלבד לכל ווידג'ט בביקור.
 * בלי זה גרירה אחת בסקאלת הרעב הייתה נספרת כעשרות אירועים.
 */
export function trackWidgetOnce(widget: string): void {
  if (usedWidgets.has(widget)) return
  usedWidgets.add(widget)
  track('widget_used', { widget })
}

/** שליחת אירוע. בטוח לקריאה תמיד — בלי מזהה מדידה זו פעולה ריקה. */
export function track(
  name: EventName,
  params?: Record<string, string | number | boolean>,
): void {
  if (!isAnalyticsEnabled()) return
  window.gtag?.('event', name, params)
}
