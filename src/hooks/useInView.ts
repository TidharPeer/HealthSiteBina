import { useEffect, useRef, useState } from 'react'

/**
 * מחזיר ref ודגל "נכנס לתצוגה" — משמש לאנימציית החשיפה בגלילה.
 * החשיפה קורית פעם אחת בלבד ולא חוזרת לאחור.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = '-10% 0px',
  /** ברירת המחדל דורשת שחלק מהאלמנט ייראה. אלמנט ללא גובה חייב threshold 0. */
  threshold = 0.05,
) {
  const ref = useRef<T>(null)
  // ללא IntersectionObserver פשוט מציגים הכול מיד, בלי אנימציה.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { ref, inView }
}
