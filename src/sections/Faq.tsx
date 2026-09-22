import { SECTION_IDS } from '../config/links'
import { faq } from '../content/faq'
import { Section, SectionTitle } from '../components/ui/Section'

export function Faq() {
  return (
    <Section id={SECTION_IDS.faq} tone="sage">
      <SectionTitle eyebrow={faq.eyebrow}>{faq.title}</SectionTitle>

      <div className="space-y-3">
        {faq.items.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(38,51,46,0.05)] sm:p-6"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-bold text-brand [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-terracotta-ink transition-transform group-open:rotate-45"
              >
                ✚
              </span>
            </summary>
            <p className="mt-3 text-small text-ink/90">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
