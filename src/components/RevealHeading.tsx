import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'

type RevealHeadingProps = {
  lines: string[]
  className?: string
}

export function RevealHeading({ lines, className }: RevealHeadingProps) {
  return (
    <motion.h2
      aria-label={lines.join(' ')}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={cn('font-display leading-none tracking-tighter', className)}
    >
      {lines.map((line, i) => (
        // Padding + negative margin widen the clip box so descenders aren't cut
        <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: '110%' },
              visible: { y: '0%', transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}
