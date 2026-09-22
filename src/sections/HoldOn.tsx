import { SECTION_IDS } from '../config/links'
import { holdon } from '../content/holdon'
import { Card } from '../components/ui/Card'
import { Cta } from '../components/ui/Cta'
import { Section, SectionTitle } from '../components/ui/Section'

export function HoldOn() {
  return (
    <Section id={SECTION_IDS.holdon} tone="cream" width="wide">
      <SectionTitle eyebrow={holdon.eyebrow}>{holdon.title}</SectionTitle>
      <p>{holdon.intro}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {holdon.products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <img
              src={product.image.src}
              width={product.image.width}
              height={product.image.height}
              alt={product.imageAlt}
              loading="lazy"
              className="mb-5 aspect-[3/4] w-full rounded-xl bg-white object-contain"
            />
            <h3 className="text-h3">{product.name}</h3>
            <p className="mt-2 text-small">{product.description}</p>
            <ul className="mt-4 space-y-1.5">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-small text-muted"
                >
                  <span aria-hidden="true" className="text-olive">
                    ✓
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-1">
              <Cta variant="link" href={product.url}>
                {holdon.productCta} ←
              </Cta>
            </div>
          </Card>
        ))}
      </div>

    </Section>
  )
}
