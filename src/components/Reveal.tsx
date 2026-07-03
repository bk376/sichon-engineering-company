import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Stagger delay in seconds */
  delay?: number
  /** Distance to travel upward, px */
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'span'
}

/**
 * Subtle scroll-into-view reveal. Respects prefers-reduced-motion
 * automatically (motion disables transforms; base state remains visible
 * via the `once` viewport + short travel).
 */
export default function Reveal({ children, delay = 0, y = 22, className, as = 'div' }: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
