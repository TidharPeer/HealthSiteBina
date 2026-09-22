import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
// סיומת .js נדרשת כאן: tsconfig.node.json מוגדר ל-moduleResolution: nodenext.
import { faq } from './src/content/faq.js'

/**
 * מזריק JSON-LD ל-index.html בזמן ה-build.
 *
 * נבנה מקבצי התוכן ולא נכתב ידנית ב-HTML, כך שעריכת שאלה ב-content/faq.ts
 * מעדכנת גם את הנתונים המובנים — ואי אפשר שהם ייצאו מסנכרון עם מה שהגולש רואה.
 */
function structuredData(): Plugin {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ]

  return {
    name: 'inject-structured-data',
    transformIndexHtml() {
      return schemas.map((schema) => ({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        // JSON.stringify מבריח את התווים המסוכנים; </script> לא יכול להופיע
        // בפלט כי '<' נשאר '<' — ולכן מחליפים אותו במפורש.
        children: JSON.stringify(schema).replace(/</g, '\\u003c'),
        injectTo: 'head' as const,
      }))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), structuredData()],
})
