export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** גלילה רכה לעוגן בדף, תוך כיבוד העדפת "פחות תנועה". */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  // 'auto' יורש את scroll-behavior מה-CSS (שהוא smooth), ולכן למי שביקש
  // פחות תנועה צריך 'instant' במפורש.
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    block: 'start',
  })

  // הגלילה מזיזה את המסך אבל לא את המיקוד. בלי השורה הזו משתמש מקלדת לוחץ CTA,
  // הדף גולל — והמיקוד שלו נשאר על הכפתור שעזב, כך שה-Tab הבא ממשיך מהמקום הישן
  // וקורא מסך לא מקבל שום הודעה שהמיקום השתנה. הסקשנים מקבלים tabIndex={-1}
  // ב-Section.tsx כדי שיוכלו לקבל את המיקוד.
  target.focus({ preventScroll: true })
}
