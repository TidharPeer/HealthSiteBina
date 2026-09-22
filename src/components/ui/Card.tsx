import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  tone?: 'white' | 'sage' | 'cream'
}

const tones = {
  white: 'bg-white',
  sage: 'bg-sage',
  cream: 'bg-cream',
}

export function Card({ children, className = '', tone = 'white' }: CardProps) {
  return (
    <div
      className={`rounded-2xl ${tones[tone]} p-6 shadow-[0_2px_16px_rgba(38,51,46,0.06)] sm:p-7 ${className}`}
    >
      {children}
    </div>
  )
}

type TipProps = {
  label?: string
  children: ReactNode
  className?: string
}

/** בלוק "טיפ לחג" — מופיע לאורך כל הדף באותו מראה. */
export function Tip({ label = 'טיפ לחג', children, className = '' }: TipProps) {
  return (
    <div
      className={`rounded-xl border-r-4 border-terracotta bg-terracotta/8 p-4 sm:p-5 ${className}`}
    >
      <p className="mb-1 text-small font-bold text-terracotta-ink">{label}</p>
      <p className="text-small text-ink">{children}</p>
    </div>
  )
}

/** משפט מפתח מודגש. */
export function KeyMessage({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`text-h3 font-bold text-balance text-brand ${className}`}
    >
      {children}
    </p>
  )
}
