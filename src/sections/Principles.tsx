import type { ReactNode } from 'react'
import { TABATA_IMAGE } from '../config/images'
import { SECTION_IDS, TABATA_URL } from '../config/links'
import { principles, principlesIntro } from '../content/principles'
import { HungerScale } from '../components/interactive/HungerScale'
import { PlateBuilder } from '../components/interactive/PlateBuilder'
import { TimingQuiz } from '../components/interactive/TimingQuiz'
import { Card } from '../components/ui/Card'
import { Cta } from '../components/ui/Cta'
import { Section, SectionTitle } from '../components/ui/Section'

type PrincipleProps = {
  number: number
  emoji: string
  name: string
  headline?: string
  children: ReactNode
}

function Principle({ number, emoji, name, headline, children }: PrincipleProps) {
  return (
    <article className="border-t border-brand/15 pt-10 first:border-0 first:pt-0">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sage text-2xl"
        >
          {emoji}
        </span>
        <div>
          <p className="text-small font-bold text-terracotta-ink">
            עקרון {number}
          </p>
          <h3 className="text-h3">{name}</h3>
          {headline && (
            <p className="mt-1 font-medium text-brand">{headline}</p>
          )}
        </div>
      </div>
      <div className="mt-6 space-y-5">{children}</div>
    </article>
  )
}

export function Principles() {
  return (
    <Section id={SECTION_IDS.principles} tone="cream" width="wide">
      <SectionTitle>{principlesIntro.title}</SectionTitle>

      <div className="space-y-12">
        <Principle {...principles.timing}>
          <TimingQuiz />
        </Principle>

        <Principle {...principles.portions}>
          {principles.portions.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <HungerScale />
        </Principle>

        <Principle {...principles.composition}>
          <p>{principles.composition.body}</p>
          <PlateBuilder />
        </Principle>

        <Principle {...principles.movement}>
          {principles.movement.body.map((line) => (
            <p key={line}>{line}</p>
          ))}

          <Card>
            <p className="text-h3 text-center">
              {principles.movement.ideasTitle}
            </p>
            <p className="mt-1 mb-5 text-center text-small text-muted">
              {principles.movement.ideasSubtitle}
            </p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3">
              {principles.movement.ideas.map((idea) => (
                <li
                  key={idea.label}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-3xl"
                  >
                    {idea.emoji}
                  </span>
                  <span className="text-small font-medium text-balance">
                    {idea.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* פינת הטאבטה — חלק מסעיף הפעילות, לא כרטיס נפרד */}
            <div className="mt-6 grid items-center gap-5 border-t border-brand/15 pt-6 sm:grid-cols-[1fr_180px]">
              <div>
                <p className="text-h3">{principles.movement.tabata.title}</p>
                <p className="mt-2 text-small">
                  {principles.movement.tabata.body}
                </p>
                <Cta className="mt-4" variant="link" href={TABATA_URL}>
                  {principles.movement.tabata.cta}
                </Cta>
              </div>
              <img
                src={TABATA_IMAGE.src}
                width={TABATA_IMAGE.width}
                height={TABATA_IMAGE.height}
                alt={principles.movement.tabata.imageAlt}
                loading="lazy"
                className="mx-auto aspect-square w-44 rounded-full object-cover sm:w-full"
              />
            </div>
          </Card>
        </Principle>
      </div>

      <div className="mt-14 text-center">
        <Cta scrollTo={SECTION_IDS.program}>{principlesIntro.cta}</Cta>
      </div>
    </Section>
  )
}
