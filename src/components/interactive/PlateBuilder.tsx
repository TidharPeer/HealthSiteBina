import { useState } from 'react'
import { SECTION_IDS } from '../../config/links'
import {
  allFoodItems,
  plateBuilder,
  plateFeedback,
} from '../../content/plateBuilder'
import { widgetCta } from '../../content/program'
import { trackWidgetOnce } from '../../lib/analytics'
import { Cta } from '../ui/Cta'

export function PlateBuilder() {
  const [selected, setSelected] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const toggle = (id: string) => {
    setShowResult(false)
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const onPlate = allFoodItems.filter((item) => selected.includes(item.id))
  const messages = showResult ? plateFeedback(selected) : []

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(38,51,46,0.06)] sm:p-8">
      <h4 className="text-h3 text-balance">{plateBuilder.title}</h4>
      <p className="mt-2 text-small text-muted">{plateBuilder.intro}</p>

      {/* הצלחת */}
      <div className="mt-7 flex justify-center">
        <div className="flex aspect-square w-56 items-center justify-center rounded-full bg-cream p-5 ring-8 ring-sage sm:w-64">
          <div className="flex h-full w-full flex-wrap content-center items-center justify-center gap-2 rounded-full border-2 border-dashed border-brand/20 p-4">
            {onPlate.length === 0 ? (
              <p className="max-w-[18ch] text-center text-xs text-muted">
                {plateBuilder.emptyPlate}
              </p>
            ) : (
              onPlate.map((item) => (
                <span
                  key={item.id}
                  title={item.label}
                  className="text-2xl sm:text-3xl"
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  <span className="sr-only">{item.label}</span>
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* כרטיסי המאכלים */}
      <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {plateBuilder.items.map((item) => {
          const isSelected = selected.includes(item.id)
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(item.id)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 transition-colors ${
                isSelected
                  ? 'border-brand bg-brand/10'
                  : 'border-brand/15 bg-cream hover:border-brand/50'
              }`}
            >
              <span aria-hidden="true" className="text-2xl">
                {item.emoji}
              </span>
              <span className="text-xs font-bold sm:text-small">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          disabled={selected.length === 0}
          onClick={() => {
            trackWidgetOnce('plate_builder')
            setShowResult(true)
          }}
          className="rounded-full bg-brand px-6 py-3 font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          {plateBuilder.submit}
        </button>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setSelected([])
              setShowResult(false)
            }}
            className="text-small font-bold text-muted underline underline-offset-4 hover:text-brand"
          >
            {plateBuilder.reset}
          </button>
        )}
      </div>

      <div aria-live="polite">
        {showResult && (
          <div className="mt-6 space-y-3 rounded-xl bg-sage p-5 sm:p-6">
            <p className="font-bold text-brand">{plateBuilder.resultTitle}</p>
            {messages.map((message) => (
              <p key={message} className="text-small">
                {message}
              </p>
            ))}
            <div className="rounded-xl border-r-4 border-terracotta bg-white p-4">
              <p className="mb-1 text-small font-bold text-terracotta-ink">
                {plateBuilder.tipLabel}
              </p>
              <p className="text-small">{plateBuilder.tip}</p>
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
