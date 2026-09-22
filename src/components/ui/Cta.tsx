import type { ReactNode } from 'react'
import { SECTION_IDS, WHATSAPP_COMMUNITY_URL } from '../../config/links'
import { track } from '../../lib/analytics'
import { scrollToSection } from '../../lib/scroll'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-btn font-bold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 px-7 py-3.5 text-center'

const variants: Record<Variant, string> = {
  // CTA ראשי — תמיד טרקוטה, תמיד מוביל לאותה פעולה.
  primary: `${base} bg-terracotta-ink text-white shadow-lg shadow-terracotta/25 hover:bg-[#8f472c]`,
  // CTA משני — קהילה.
  secondary: `${base} border-2 border-brand bg-transparent text-brand hover:bg-brand hover:text-white`,
  // גרסה על רקע כהה.
  ghost: `${base} border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-brand`,
  // CTA שלישוני — קישורי מוצר.
  link: 'inline-flex items-center gap-1.5 font-bold text-brand underline decoration-olive decoration-2 underline-offset-4 hover:text-terracotta-ink hover:decoration-terracotta-ink',
}

type CtaProps = {
  children: ReactNode
  variant?: Variant
  className?: string
} & (
  | { href: string; scrollTo?: never; onClick?: never }
  | { scrollTo: string; href?: never; onClick?: never }
  | { onClick: () => void; href?: never; scrollTo?: never }
  | { href?: never; scrollTo?: never; onClick?: never }
)

export function Cta({
  children,
  variant = 'primary',
  className = '',
  href,
  scrollTo,
  onClick,
}: CtaProps) {
  const classes = `${variants[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        // נגזר מהיעד ולא מ-prop בכל אתר קריאה: אין דרך לשכוח לסמן CTA חדש.
        onClick={() => {
          if (href === WHATSAPP_COMMUNITY_URL) track('community_click')
        }}
      >
        {children}
      </a>
    )
  }

  const handleClick = () => {
    if (scrollTo === SECTION_IDS.program) track('program_cta_click')
    if (onClick) onClick()
    else if (scrollTo) scrollToSection(scrollTo)
  }

  return (
    <button type="button" className={classes} onClick={handleClick}>
      {children}
    </button>
  )
}
