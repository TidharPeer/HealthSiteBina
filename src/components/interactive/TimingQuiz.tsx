import { useState } from 'react'
import { SECTION_IDS } from '../../config/links'
import { widgetCta } from '../../content/program'
import { timingQuiz } from '../../content/timingQuiz'
import { trackWidgetOnce } from '../../lib/analytics'
import { Tip } from '../ui/Card'
import { Cta } from '../ui/Cta'

export function TimingQuiz() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = timingQuiz.options.find((o) => o.id === selectedId)

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(38,51,46,0.06)] sm:p-8">
      <p className="text-small font-bold text-terracotta-ink">{timingQuiz.intro}</p>
      <h4 className="mt-2 text-h3">{timingQuiz.title}</h4>
      <p id="timing-question" className="mt-2 text-ink">
        {timingQuiz.question}
      </p>

      <div
        role="radiogroup"
        aria-labelledby="timing-question"
        className="mt-6 grid gap-3 sm:grid-cols-3"
      >
        {timingQuiz.options.map((option) => {
          const isSelected = option.id === selectedId
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => {
                trackWidgetOnce('timing_quiz')
                setSelectedId(option.id)
              }}
              className={`flex h-full flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-colors ${
                isSelected
                  ? 'border-brand bg-brand text-white'
                  : 'border-brand/20 bg-cream text-ink hover:border-brand/60'
              }`}
            >
              <span aria-hidden="true" className="text-3xl">
                {option.emoji}
              </span>
              <span className="text-small font-bold">{option.label}</span>
            </button>
          )
        })}
      </div>

      <div aria-live="polite">
        {selected && (
          <div className="mt-6 space-y-4 rounded-xl bg-sage p-5 sm:p-6">
            <div>
              <p className="mb-1 font-bold text-brand">המשמעות</p>
              <p className="text-small">{selected.meaning}</p>
            </div>
            <Tip label="טיפ">{selected.tip}</Tip>

            <div className="rounded-xl bg-white p-4 sm:p-5">
              <p className="font-bold text-balance text-brand">
                {timingQuiz.summary}
              </p>
              <p className="mt-3 text-small font-bold text-terracotta-ink">
                {timingQuiz.actionTipLabel}
              </p>
              <p className="text-small">{timingQuiz.actionTip}</p>
            </div>

            <div className="text-center">
              <Cta variant="link" scrollTo={SECTION_IDS.program}>
                {widgetCta} ←
              </Cta>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
