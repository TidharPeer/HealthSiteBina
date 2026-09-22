import { jumpTiles } from '../content/problem'
import { scrollToSection } from '../lib/scroll'

/**
 * קוביות ניווט לתכנים בהמשך הדף.
 * משניות ויזואלית ל-CTA הראשי — ניווט, לא פעולה.
 */
export function JumpTiles() {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {jumpTiles.map((tile) => (
        <li key={tile.target}>
          <button
            type="button"
            onClick={() => scrollToSection(tile.target)}
            className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-brand/15 bg-white px-3 py-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-terracotta hover:shadow-md"
          >
            <span aria-hidden="true" className="text-2xl">
              {tile.emoji}
            </span>
            <span className="text-small leading-snug font-bold text-brand">
              {tile.label}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
