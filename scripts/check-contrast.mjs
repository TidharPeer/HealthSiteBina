/**
 * בדיקת ניגודיות WCAG על צירופי הצבעים שהדף באמת משתמש בהם.
 *
 * טוקני הצבע כאן חייבים להישאר זהים ל-@theme ב-src/index.css.
 * הרצה: npm run check:contrast
 *
 * הסף: 4.5:1 לטקסט רגיל (AA), 3:1 לגרפיקה ולרכיבי ממשק — מתאר מיקוד, גבולות.
 */

const hex = (h) => {
  const v = h.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16))
}

const linear = (c) => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

const luminance = (rgb) =>
  0.2126 * linear(rgb[0]) + 0.7152 * linear(rgb[1]) + 0.0722 * linear(rgb[2])

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** שכבה שקופה מעל רקע אטום — כך נראה בפועל bg-terracotta/8 או text-white/85. */
const over = (fg, bg, alpha) =>
  hex(fg).map((c, i) => Math.round(alpha * c + (1 - alpha) * hex(bg)[i]))

const T = {
  cream: '#f8f6f0',
  sage: '#e8efe8',
  brand: '#315c4c',
  olive: '#78916f',
  terracotta: '#c9795b',
  terracottaInk: '#9e5236',
  ink: '#26332e',
  muted: '#5c6763',
  white: '#ffffff',
}

const rgb = (h) => hex(h)

const checks = [
  ['muted on cream', rgb(T.muted), rgb(T.cream), 4.5],
  ['muted on sage', rgb(T.muted), rgb(T.sage), 4.5],
  ['muted on white', rgb(T.muted), rgb(T.white), 4.5],
  ['ink on cream', rgb(T.ink), rgb(T.cream), 4.5],
  ['ink on sage', rgb(T.ink), rgb(T.sage), 4.5],
  ['terracotta-ink on cream', rgb(T.terracottaInk), rgb(T.cream), 4.5],
  ['terracotta-ink on sage', rgb(T.terracottaInk), rgb(T.sage), 4.5],
  ['terracotta-ink on white', rgb(T.terracottaInk), rgb(T.white), 4.5],
  // תווית ה-Tip יושבת על bg-terracotta/8 שמעל cream או sage
  ['Tip label on tint over cream', rgb(T.terracottaInk), over(T.terracotta, T.cream, 0.08), 4.5],
  ['Tip label on tint over sage', rgb(T.terracottaInk), over(T.terracotta, T.sage, 0.08), 4.5],
  ['CTA: white on terracotta-ink', rgb(T.white), rgb(T.terracottaInk), 4.5],
  ['CTA hover: white on #8f472c', rgb(T.white), rgb('#8f472c'), 4.5],
  ['white on brand', rgb(T.white), rgb(T.brand), 4.5],
  ['white/85 on brand', over(T.white, T.brand, 0.85), rgb(T.brand), 4.5],
  ['white/80 on brand', over(T.white, T.brand, 0.8), rgb(T.brand), 4.5],
  ['footer white/60 on ink', over(T.white, T.ink, 0.6), rgb(T.ink), 4.5],
  ['footer white/70 on ink', over(T.white, T.ink, 0.7), rgb(T.ink), 4.5],
  // טבעת המיקוד: מתאר terracotta-ink על רקע בהיר, הילה לבנה על רקע כהה
  ['focus outline on cream', rgb(T.terracottaInk), rgb(T.cream), 3.0],
  ['focus outline on sage', rgb(T.terracottaInk), rgb(T.sage), 3.0],
  ['focus outline on white', rgb(T.terracottaInk), rgb(T.white), 3.0],
  ['focus halo (white) on brand', rgb(T.white), rgb(T.brand), 3.0],
  ['focus halo (white) on ink', rgb(T.white), rgb(T.ink), 3.0],
  ['border terracotta on cream', rgb(T.terracotta), rgb(T.cream), 3.0],
  ['olive underline on cream', rgb(T.olive), rgb(T.cream), 3.0],
]

let failed = 0
for (const [label, fg, bg, min] of checks) {
  const r = ratio(fg, bg)
  const ok = r >= min
  if (!ok) failed++
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)} (need ${min})  ${label}`,
  )
}

if (failed > 0) {
  console.error(`\n${failed} contrast check(s) failing.`)
  process.exit(1)
}
console.log('\nAll contrast checks pass.')
