import { SECTION_IDS } from '../config/links'
import { problem } from '../content/problem'
import { JumpTiles } from '../components/JumpTiles'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'

export function Problem() {
  return (
    <Section id={SECTION_IDS.problem} tone="sage" width="wide" compact>
      <header className="mb-6 text-center">
        <p className="mb-2 text-small font-bold tracking-wide text-terracotta-ink">
          {problem.eyebrow}
        </p>
        <h2 className="text-h2 text-balance">{problem.title}</h2>
      </header>

      <Reveal>
        <ol className="mx-auto max-w-md">
          {problem.spiral.map((step, index) => (
            <li key={step.text}>
              <div className="flex items-center gap-2.5 rounded-lg bg-white px-4 py-2.5">
                <span aria-hidden="true" className="text-lg">
                  {step.emoji}
                </span>
                <span className="text-small font-medium">{step.text}</span>
              </div>
              {index < problem.spiral.length - 1 && (
                <div
                  aria-hidden="true"
                  className="py-1 text-center text-3xl leading-none font-bold text-terracotta-ink"
                >
                  ↓
                </div>
              )}
            </li>
          ))}
        </ol>
      </Reveal>

      <p className="mx-auto mt-7 max-w-2xl text-center text-h3 text-balance text-brand">
        {problem.message}
      </p>

      <h3 className="mt-12 mb-5 text-center text-h3">{problem.tilesTitle}</h3>
      <JumpTiles />
    </Section>
  )
}
