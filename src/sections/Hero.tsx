import { HERO_IMAGE } from '../config/images'
import { hero } from '../content/hero'

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-cream px-5 pt-14 pb-14 sm:px-8 sm:pt-20 sm:pb-16">
      {/* הילה רכה ברקע — נותנת עומק בלי להסיח מהטקסט */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-sage blur-3xl"
      />
      <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h1 className="text-h1 text-balance">
            {hero.title}
            <span className="mt-2 block text-brand">{hero.titleAccent}</span>
          </h1>

          <p className="mt-5 text-h3 font-medium text-balance text-muted">
            {hero.subtitle}
          </p>

          <div className="mt-6 space-y-3">
            {hero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <img
          src={HERO_IMAGE.src}
          width={HERO_IMAGE.width}
          height={HERO_IMAGE.height}
          alt={hero.imageAlt}
          loading="eager"
          fetchPriority="high"
          className="aspect-[3/2] w-full rounded-2xl object-cover shadow-[0_8px_40px_rgba(38,51,46,0.18)] lg:order-last"
        />
      </div>
    </header>
  )
}
