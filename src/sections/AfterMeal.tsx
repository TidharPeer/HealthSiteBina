import { Fragment } from 'react'
import { SECTION_IDS } from '../config/links'
import { afterMeal } from '../content/afterMeal'
import { Tip } from '../components/ui/Card'
import { Section, SectionTitle } from '../components/ui/Section'

export function AfterMeal() {
  return (
    <Section id={SECTION_IDS.afterMeal} tone="sage">
      <SectionTitle eyebrow={afterMeal.eyebrow}>{afterMeal.title}</SectionTitle>

      <p className="mb-4 font-bold text-muted">{afterMeal.beliefsTitle}</p>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {afterMeal.beliefs.map((belief) => (
          <li
            key={belief}
            className="flex items-start gap-2 rounded-xl bg-white px-4 py-3 text-small text-muted"
          >
            <span aria-hidden="true">❌</span>
            <span>{belief}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl bg-white p-6 sm:p-8">
        <p className="mb-5 text-center text-h3 text-brand">
          {afterMeal.insteadTitle}
        </p>
        {/* שרשרת המחשבה: אופקית בדסקטופ, אנכית במובייל */}
        <ol className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-stretch sm:gap-0">
          {afterMeal.instead.map((step, index) => (
            <Fragment key={step}>
              <li className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl bg-sage px-4 py-4 text-center">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white"
                >
                  {index + 1}
                </span>
                <span className="text-small leading-snug font-medium text-balance">
                  {step}
                </span>
              </li>
              {index < afterMeal.instead.length - 1 && (
                <li
                  aria-hidden="true"
                  className="flex items-center justify-center py-1 text-3xl leading-none font-bold text-terracotta-ink sm:px-2 sm:py-0"
                >
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">←</span>
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>

      <p className="mt-8 rounded-2xl bg-brand p-7 text-h2 text-balance text-white sm:p-9">
        {afterMeal.body}
      </p>

      <Tip className="mt-6">{afterMeal.tip}</Tip>
    </Section>
  )
}
