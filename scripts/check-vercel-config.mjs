/**
 * מאמת את vercel.json לפני שהוא מגיע ל-Vercel.
 *
 * למה זה קיים: Vercel מפרש כל "source" עם path-to-regexp, ודפוס שהוא לא מצליח
 * לפרסר נדחה בשלב יצירת הדפלוי — לא בבנייה. התוצאה היא שהאתר החי פשוט נשאר
 * על הגרסה הקודמת בלי הודעת שגיאה בקוד, וזה בדיוק מה שקרה כאן: קבוצת לכידה
 * מקוננת ב-‎/([^/]+\.(webp|jpg|...))‎ הפילה את הדפלוי בשקט.
 *
 * הרצה: npm run check:vercel
 */
import { readFileSync } from 'node:fs'
import { pathToRegexp } from 'path-to-regexp'

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))

let failed = 0
for (const group of ['headers', 'redirects', 'rewrites']) {
  for (const rule of config[group] ?? []) {
    try {
      pathToRegexp(rule.source)
      console.log(`PASS  ${group}: ${rule.source}`)
    } catch (error) {
      failed++
      console.log(`FAIL  ${group}: ${rule.source}\n        ${error.message}`)
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} invalid source pattern(s) — Vercel would reject this deployment.`)
  process.exit(1)
}
console.log('\nvercel.json source patterns are valid.')
