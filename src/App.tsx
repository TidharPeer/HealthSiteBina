import { StickyCta } from './components/StickyCta'
import { AfterMeal } from './sections/AfterMeal'
import { Community } from './sections/Community'
import { Faq } from './sections/Faq'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { HoldOn } from './sections/HoldOn'
import { KnowledgeGap } from './sections/KnowledgeGap'
import { Principles } from './sections/Principles'
import { Problem } from './sections/Problem'
import { Program } from './sections/Program'

export default function App() {
  return (
    // ריווח תחתון במובייל כדי שסרגל ה-CTA הדביק לא יכסה תוכן
    <div className="pb-20 lg:pb-0">
      <Hero />
      <main>
        {/* בעיה → הזדהות → הבנה → התנסות → ערך → הפער בין ידע ליישום → הליווי */}
        <Problem />
        <Principles />
        <AfterMeal />
        <KnowledgeGap />
        <Program />
        <HoldOn />
        <Community />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
