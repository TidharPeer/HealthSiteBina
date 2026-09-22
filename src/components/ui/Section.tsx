import type { ReactNode } from 'react'

type Tone = 'cream' | 'sage' | 'brand' | 'white'

const toneClasses: Record<Tone, string> = {
  cream: 'bg-cream text-ink',
  sage: 'bg-sage text-ink',
  brand: 'bg-brand text-white',
  white: 'bg-white text-ink',
}

type SectionProps = {
  id?: string
  tone?: Tone
  /** רוחב המכולה הפנימית. ברירת מחדל מתאימה לטקסט קריא. */
  width?: 'narrow' | 'wide'
  /** ריווח אנכי מצומצם. */
  compact?: boolean
  className?: string
  children: ReactNode
}

export function Section({
  id,
  tone = 'cream',
  width = 'narrow',
  compact = false,
  className = '',
  children,
}: SectionProps) {
  const padding = compact
    ? 'py-10 sm:py-12'
    : 'py-16 sm:py-20 lg:py-24'

  return (
    <section
      id={id}
      // סקשן שמשמש יעד גלילה חייב להיות מסוגל לקבל מיקוד (ראו scrollToSection).
      // אין טבעת מיקוד: זה מכולה ולא פקד, והמשתמש הגיע לכאן ביוזמתו.
      tabIndex={id ? -1 : undefined}
      className={`${toneClasses[tone]} px-5 sm:px-8 ${padding} focus:outline-none ${className}`}
    >
      <div
        className={`mx-auto ${width === 'narrow' ? 'max-w-3xl' : 'max-w-5xl'}`}
      >
        {children}
      </div>
    </section>
  )
}

type SectionTitleProps = {
  eyebrow?: string
  children: ReactNode
  className?: string
}

export function SectionTitle({
  eyebrow,
  children,
  className = '',
}: SectionTitleProps) {
  return (
    <header className={`mb-8 ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-small font-bold tracking-wide text-terracotta-ink">
          {eyebrow}
        </p>
      )}
      <h2 className="text-h2 text-balance">{children}</h2>
    </header>
  )
}
