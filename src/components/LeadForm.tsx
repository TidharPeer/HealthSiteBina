import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { program } from '../content/program'
import { track } from '../lib/analytics'
import {
  submitLead,
  validateLead,
  type LeadErrors,
  type LeadSubmission,
} from '../lib/lead'

export function LeadForm() {
  const nameId = useId()
  const phoneId = useId()
  const noteId = useId()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<LeadErrors>({})
  const [sent, setSent] = useState<LeadSubmission | null>(null)
  // null = ממתינים לאישור, true = הליד נקלט במייל, false = הקליטה נכשלה/כבויה
  const [delivered, setDelivered] = useState<boolean | null>(null)

  const successRef = useRef<HTMLDivElement>(null)

  // אחרי שליחה מוצלחת המיקוד נשאר על כפתור ששינה משמעות — מעבירים אותו להודעה,
  // שם נמצא גם קישור הגיבוי לוואטסאפ.
  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const lead = { name, phone, note }
    const found = validateLead(lead)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setSent(null)
      setDelivered(null)
      return
    }

    const submission = submitLead(lead)
    setSent(submission)
    setDelivered(null)
    submission.delivered.then(setDelivered)

    track('lead_submit', { has_note: Boolean(note.trim()) })
    // נמדד בנפרד: אם שיעור החסימות גבוה, ההעברה לוואטסאפ היא צוואר בקבוק אמיתי
    // ולא מקרה קצה.
    if (!submission.opened) track('whatsapp_blocked')
  }

  const field =
    'mt-1.5 w-full rounded-xl border-2 border-brand/20 bg-white px-4 py-3 text-ink outline-none focus:border-brand'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(38,51,46,0.08)] sm:p-8"
    >
      <p className="text-h3">{program.form.title}</p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor={nameId} className="text-small font-bold">
            {program.form.name}
          </label>
          <input
            id={nameId}
            type="text"
            name="name"
            autoComplete="name"
            placeholder={program.form.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className={field}
          />
          {errors.name && (
            <p
              id={`${nameId}-error`}
              className="mt-1.5 text-small text-terracotta-ink"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={phoneId} className="text-small font-bold">
            {program.form.phone}
          </label>
          <input
            id={phoneId}
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder={program.form.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
            className={`${field} text-right`}
          />
          {errors.phone && (
            <p
              id={`${phoneId}-error`}
              className="mt-1.5 text-small text-terracotta-ink"
            >
              {errors.phone}
            </p>
          )}
        </div>

        {/* שדה רשות — מקופל כדי ששני שדות החובה ייראו כמו מאמץ קטן ולא כמו טופס. */}
        <details className="group">
          <summary className="text-small font-bold text-brand underline decoration-olive decoration-2 underline-offset-4 marker:content-['']">
            {program.form.note}
          </summary>
          <textarea
            id={noteId}
            name="note"
            rows={3}
            placeholder={program.form.notePlaceholder}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`${field} resize-y`}
          />
        </details>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-terracotta-ink px-7 py-4 text-btn font-bold text-white shadow-lg shadow-terracotta/25 transition-transform hover:-translate-y-0.5 hover:bg-[#8f472c]"
      >
        {program.form.submit}
      </button>

      <p className="mt-3 text-center text-small text-muted">
        {program.form.hint}
      </p>
      <p className="mt-1.5 text-center text-small text-muted">
        {program.form.privacy}
      </p>

      <div aria-live="polite">
        {sent && (
          <div
            ref={successRef}
            tabIndex={-1}
            className="mt-4 rounded-xl bg-sage p-4 text-center text-small font-medium text-brand"
          >
            {/* "מעולה!" ושורת ה-✓ מופיעים רק אחרי אישור אמיתי מה-API */}
            {delivered === true && (
              <p className="mb-1 font-bold">
                {program.form.successConfirmed} {program.form.storedNotice}
              </p>
            )}
            <p>
              {sent.opened
                ? program.form.success
                : program.form.successBlocked}
            </p>
            {/* מוצג תמיד: גם כשהחלון נפתח הוא עלול להיעלם מאחורי הלשונית. */}
            <a
              href={sent.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-bold text-brand underline decoration-olive decoration-2 underline-offset-4 hover:text-terracotta-ink hover:decoration-terracotta-ink"
            >
              {program.form.successFallback}
            </a>
          </div>
        )}
      </div>
    </form>
  )
}
