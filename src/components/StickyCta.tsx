import { useEffect, useState } from 'react'
import { SECTION_IDS } from '../config/links'
import { program } from '../content/program'
import { track } from '../lib/analytics'
import { scrollToSection } from '../lib/scroll'

/**
 * סרגל CTA דביק במובייל. מופיע רק אחרי שגללו מעבר ל-HERO,
 * ומוביל תמיד לאותה פעולה ראשית — הטופס שמוביל לשיחה על הליווי.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    // inert מוציא את כל תת-העץ מסדר המיקוד ומעץ הנגישות כשהסרגל מוסתר —
    // הוא עדיין ב-DOM, רק מוזז מחוץ למסך. מחליף את הצמד tabIndex/aria-hidden.
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-brand/10 bg-cream/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <button
        type="button"
        onClick={() => {
          track('program_cta_click', { source: 'sticky_bar' })
          scrollToSection(SECTION_IDS.program)
        }}
        className="w-full rounded-full bg-terracotta-ink px-6 py-3.5 text-btn font-bold text-white shadow-lg shadow-terracotta/25"
      >
        {program.ctaShort}
      </button>
    </div>
  )
}
