import { SECTION_IDS, WHATSAPP_COMMUNITY_URL } from '../config/links'
import { community } from '../content/holdon'
import { Cta } from '../components/ui/Cta'
import { Section } from '../components/ui/Section'

export function Community() {
  return (
    <Section id={SECTION_IDS.community} tone="sage">
      <div className="rounded-2xl bg-white p-7 sm:p-10">
        <h2 className="text-h2 text-balance">{community.title}</h2>
        <p className="mt-3">{community.intro}</p>

        <p className="mt-6 font-bold text-brand">{community.benefitsTitle}</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {community.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-small">
              <span aria-hidden="true" className="text-olive">
                ✓
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-small text-muted">{community.note}</p>

        <Cta className="mt-6" variant="secondary" href={WHATSAPP_COMMUNITY_URL}>
          {community.cta}
        </Cta>
      </div>
    </Section>
  )
}
