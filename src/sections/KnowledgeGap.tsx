import { knowledgeGap } from '../content/afterMeal'
import { Reveal } from '../components/ui/Reveal'
import { Section, SectionTitle } from '../components/ui/Section'

export function KnowledgeGap() {
  return (
    <Section tone="cream">
      <SectionTitle>{knowledgeGap.title}</SectionTitle>

      <ul className="space-y-3">
        {knowledgeGap.situations.map((situation, index) => (
          <li key={situation}>
            <Reveal delay={index * 70}>
              <p className="rounded-xl border-r-4 border-olive bg-white px-5 py-4">
                "{situation}"
              </p>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* המסר המסכם — האלמנט הבולט של האזור */}
      <div className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-bl from-brand to-olive px-6 py-12 text-center text-white shadow-[0_10px_40px_rgba(49,92,76,0.25)] sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10"
        />
        <div className="relative">
          <span
            aria-hidden="true"
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-3xl ring-1 ring-white/25"
          >
            💡
          </span>
          <p className="mx-auto mt-6 max-w-2xl text-h2 text-balance">
            {knowledgeGap.keyMessageLead}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-white/85">
            {knowledgeGap.keyMessage}
          </p>
        </div>
      </div>
    </Section>
  )
}
