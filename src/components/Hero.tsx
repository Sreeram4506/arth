import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // As user scrolls through the hero section:
  // Scale: 1 → 0.18 (large centered text → small navbar-sized text)
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.18])
  // Move upward as scrolling
  const y = useTransform(scrollYProgress, [0, 0.8], ['0vh', '-38vh'])
  // Fade out slightly so the navbar version takes over
  const opacity = useTransform(scrollYProgress, [0.6, 0.85], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '200vh' }} // Extra height to give scroll room
    >
      {/* Sticky container that pins "arth" to the center of the viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-[hsl(var(--background))]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        {/* Centered "arth" text */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1
            style={{ scale, y, opacity }}
            className="font-display text-[22vw] md:text-[16vw] lg:text-[14vw] leading-none tracking-tighter text-white select-none will-change-transform"
          >
            arth
          </motion.h1>
        </div>

        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
