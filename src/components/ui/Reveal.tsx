import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

type RevealProps = {
  children: ReactNode
  className?: string
  /** השהיה במילישניות, לחשיפה מדורגת של רשימת כרטיסים. */
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${inView ? 'reveal-in' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
