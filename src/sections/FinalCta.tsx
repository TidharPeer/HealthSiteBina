import { SECTION_IDS, WHATSAPP_COMMUNITY_URL } from '../config/links'
import { finalCta } from '../content/program'
import { Cta } from '../components/ui/Cta'
import { Section } from '../components/ui/Section'

export function FinalCta() {
  return (
    <Section tone="brand">
      <div className="text-center">
        <h2 className="text-h2 text-balance">{finalCta.title}</h2>

        <div className="mt-6 space-y-1 text-white/85">
          {finalCta.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-balance">{finalCta.body}</p>

        <Cta className="mt-8" scrollTo={SECTION_IDS.program}>
          {finalCta.primary}
        </Cta>

        <p className="mt-10 text-small text-white/80">
          {finalCta.secondaryIntro}
        </p>
        <Cta className="mt-3" variant="ghost" href={WHATSAPP_COMMUNITY_URL}>
          {finalCta.secondary}
        </Cta>
      </div>
    </Section>
  )
}
