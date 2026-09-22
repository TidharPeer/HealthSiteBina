import { useEffect } from 'react'
import { SECTION_IDS } from '../config/links'
import { program } from '../content/program'
import { useInView } from '../hooks/useInView'
import { track } from '../lib/analytics'
import { LeadForm } from '../components/LeadForm'
import { Card } from '../components/ui/Card'
import { Section, SectionTitle } from '../components/ui/Section'

export function Program() {
  // "הגיע לליווי" נמדד לפי מה שנראה בפועל, לא לפי לחיצה על CTA — ההפרש בין
  // program_cta_click ל-program_view הוא בדיוק מה שמראה אם הגלילה עובדת.
  // threshold 0: הסנטינל הוא div ללא גובה, ולכן לעולם לא יחצה סף אחוזים.
  const { ref, inView } = useInView<HTMLDivElement>('-10% 0px', 0)

  useEffect(() => {
    if (inView) track('program_view')
  }, [inView])

  return (
    <Section id={SECTION_IDS.program} tone="sage" width="wide">
      <div ref={ref} />
      <SectionTitle eyebrow={program.eyebrow}>{program.title}</SectionTitle>

      <ul className="mb-7 space-y-2">
        {program.positioning.not.map((line) => (
          <li key={line} className="flex items-start gap-2 text-muted">
            <span aria-hidden="true">❌</span>
            <span>{line}</span>
          </li>
        ))}
        <li className="flex items-start gap-2 text-h3 font-bold text-brand">
          <span aria-hidden="true">✅</span>
          <span className="text-balance">{program.positioning.but}</span>
        </li>
      </ul>

      <div className="space-y-4">
        {program.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <h3 className="text-h3">{program.offerTitle}</h3>
          <ul className="mt-5 space-y-3">
            {program.offer.map((block) => (
              <li key={block.title}>
                <Card tone="white" className="p-5 sm:p-5">
                  <p className="flex items-center gap-2 font-bold text-brand">
                    <span aria-hidden="true" className="text-xl">
                      {block.emoji}
                    </span>
                    {block.title}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {block.items.map((item) => (
                      <li key={item} className="text-small text-ink/90">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h3 className="text-h3">{program.advantageTitle}</h3>
            <p className="mt-2">{program.advantage}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-h3">{program.howTitle}</h3>
            <p className="mt-2">{program.how}</p>
          </div>
        </div>

        <div className="lg:sticky lg:top-8">
          <LeadForm />
        </div>
      </div>
    </Section>
  )
}
