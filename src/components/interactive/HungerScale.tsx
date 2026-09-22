import { useId, useState } from 'react'
import { SECTION_IDS } from '../../config/links'
import { hungerScale, zoneForValue } from '../../content/hungerScale'
import { widgetCta } from '../../content/program'
import { trackWidgetOnce } from '../../lib/analytics'
import { Tip } from '../ui/Card'
import { Cta } from '../ui/Cta'

const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function HungerScale() {
  const sliderId = useId()
  const [value, setValue] = useState(5)
  const [touched, setTouched] = useState(false)
  const zone = zoneForValue(value)

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(38,51,46,0.06)] sm:p-8">
      <h4 className="text-h3 text-balance">{hungerScale.title}</h4>
      {hungerScale.intro.map((line) => (
        <p key={line} className="mt-2 text-small text-muted">
          {line}
        </p>
      ))}
      <p className="mt-4 text-h3 text-brand">{hungerScale.pause}</p>
      <p className="mt-1 font-bold text-balance">{hungerScale.question}</p>
      <p className="mt-1 text-small text-muted">{hungerScale.instruction}</p>

      <p className="mt-7 mb-2 font-bold text-brand">
        {hungerScale.scaleLabel}
      </p>

      {/* פס האזורים — הרוחב של כל אזור פרופורציונלי לטווח שלו */}
      <div className="flex gap-1" aria-hidden="true">
        {hungerScale.zones.map((z) => {
          const span = z.range[1] - z.range[0] + 1
          const isActive = touched && z.id === zone.id
          return (
            <div
              key={z.id}
              style={{ flexGrow: span }}
              className={`rounded-md px-1 py-2 text-center text-[0.72rem] leading-tight font-bold transition-colors sm:text-xs ${
                isActive
                  ? 'bg-brand text-white'
                  : 'bg-sage text-brand/70'
              }`}
            >
              {z.label}
            </div>
          )
        })}
      </div>

      <label htmlFor={sliderId} className="sr-only">
        {hungerScale.title}
      </label>
      <input
        id={sliderId}
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        aria-valuetext={`${value} — ${zone.label}`}
        onChange={(event) => {
          trackWidgetOnce('hunger_scale')
          setValue(Number(event.target.value))
          setTouched(true)
        }}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-l from-terracotta/40 via-olive/50 to-terracotta/40 accent-brand [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand"
      />

      <div
        className="mt-2 flex justify-between px-1 text-xs text-muted"
        aria-hidden="true"
      >
        {VALUES.map((n) => (
          <span
            key={n}
            className={n === value && touched ? 'font-bold text-brand' : ''}
          >
            {n}
          </span>
        ))}
      </div>

      <div aria-live="polite">
        {touched ? (
          <div
            className={`mt-6 space-y-4 rounded-xl border-r-4 p-5 sm:p-6 ${zone.accent}`}
          >
            <p className="text-h3">
              {zone.range[0] === zone.range[1]
                ? zone.range[0]
                : `${zone.range[0]}–${zone.range[1]}`}{' '}
              | {zone.title} <span aria-hidden="true">{zone.emoji}</span>
            </p>
            <p className="text-h3 font-medium text-brand">"{zone.quote}"</p>
            <p className="text-small">{zone.body}</p>
            <Tip label={zone.tipLabel}>{zone.tip}</Tip>
          </div>
        ) : (
          <p className="mt-6 rounded-xl bg-cream p-5 text-center text-small text-muted">
            בחרו מספר על הסולם כדי לקבל הסבר אישי.
          </p>
        )}
      </div>

      <div className="mt-6 rounded-xl bg-brand p-5 text-white sm:p-6">
        <p className="font-bold">{hungerScale.closing.title}</p>
        <p className="mt-2 text-balance">{hungerScale.closing.question}</p>
        <p className="mt-3 text-small text-white/85">
          {hungerScale.closing.yes}
        </p>
        <p className="text-small text-white/85">{hungerScale.closing.no}</p>
        <p className="mt-4 border-t border-white/20 pt-4 text-small">
          {hungerScale.closing.message}
        </p>
      </div>

      {touched && (
        <div className="mt-6 text-center">
          <Cta variant="link" scrollTo={SECTION_IDS.program}>
            {widgetCta} ←
          </Cta>
        </div>
      )}
    </div>
  )
}
