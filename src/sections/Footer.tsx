import { WHATSAPP_COMMUNITY_URL, WHATSAPP_SHARE_URL } from '../config/links'
import { track } from '../lib/analytics'

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-10 text-center text-small text-white/70">
      <p>מדריך איזון תזונתי לחגים — ליהנות מהחגים ולהישאר באיזון</p>

      <p className="mt-4">
        <a
          href={WHATSAPP_SHARE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('guide_shared')}
          className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-5 py-2.5 font-bold text-white transition-colors hover:bg-white hover:text-ink"
        >
          <span aria-hidden="true">💬</span>
          שיתוף המדריך בוואטסאפ
        </a>
      </p>

      <p className="mt-5">
        <a
          href={WHATSAPP_COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('community_click')}
          className="underline underline-offset-4 hover:text-white"
        >
          קהילת הוואטסאפ
        </a>
      </p>

      <div className="mx-auto mt-6 max-w-xl space-y-2 text-xs text-white/60">
        <p>
          התכנים באתר הם מידע כללי להתנהלות יומיומית ואינם מהווים ייעוץ רפואי.
        </p>
        <p>
          הפרטים שנמסרים בטופס משמשים ליצירת קשר בנוגע לליווי בלבד, נשמרים
          אצלנו ואינם מועברים או נמכרים לצד שלישי. אפשר לבקש את מחיקתם בכל רגע
          בהודעת וואטסאפ.
        </p>
      </div>
    </footer>
  )
}
