import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { CountUp } from '@/components/CountUp'

const tickerServices = [
  'Social media management',
  'Meta Ads',
  'Google Ads',
  'Reels & short-form videos',
  'Ad creatives',
  'E-commerce websites',
  'WhatsApp integration',
  'Local promotional campaigns',
  'Event promotions',
]

export function ArthIntro() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [statsActive, setStatsActive] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.32 && !statsActive) setStatsActive(true)
  })

  // "arth" shrinks toward the header, where the nav logo takes over
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.15])
  const logoY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-180%'])
  const logoX = useTransform(scrollYProgress, [0, 0.5], ['0%', '-140%'])
  const logoOpacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0])

  const heroOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  const heroY = useTransform(scrollYProgress, [0.3, 0.6], [60, 0])
  const heroPointerEvents = useTransform(heroOpacity, (v) => (v > 0.6 ? 'auto' : 'none'))

  const bgOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const dotGridOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0.03, 0])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-background" />

        <motion.div style={{ opacity: dotGridOpacity }} className="absolute inset-0">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />
        </motion.div>

        {/* ─── Living background: drifting light, data grid, scan line ─── */}
        <motion.div className="absolute inset-0" style={{ opacity: bgOpacity }} aria-hidden="true">
          <motion.div
            className="absolute -left-[10%] -top-[20%] h-[55vw] w-[55vw] rounded-full bg-[hsl(var(--accent)/0.16)] blur-[130px]"
            animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-[15%] top-[10%] h-[45vw] w-[45vw] rounded-full bg-white/[0.04] blur-[140px]"
            animate={{ x: [0, -50, 25, 0], y: [0, -30, 35, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div
            className="absolute -bottom-[15%] left-[25%] h-[40vw] w-[40vw] rounded-full bg-[hsl(var(--accent)/0.1)] blur-[120px]"
            animate={{ x: [0, 40, -20, 0], y: [0, -25, 15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--accent)/0.6)] to-transparent"
            animate={{ top: ['-5%', '105%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* ─── Centered "arth" wordmark ─── */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <motion.h1
            style={{ scale: logoScale, y: logoY, x: logoX, opacity: logoOpacity }}
            className="select-none font-display text-[24vw] leading-none tracking-tighter text-white will-change-transform md:text-[18vw] lg:text-[14vw]"
          >
            arth
          </motion.h1>
        </div>

        {/* ─── Hero content ─── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointerEvents }}
          className="gutter relative z-10 flex h-full items-end pb-28 md:items-center md:pb-0"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-4xl">
              <h2 className="font-display text-[13vw] leading-none tracking-tighter text-white sm:text-[10vw] md:text-hero">
                {['Marketing', 'Content', 'Technology'].map((word) => (
                  <span key={word} className="block">
                    {word}
                    <span className="text-[hsl(var(--accent))]">.</span>{' '}
                  </span>
                ))}
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75 md:mt-8 md:text-xl">
                Helping businesses attract customers both online and offline.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 py-4 text-sm font-semibold text-[hsl(var(--accent-foreground))] shadow-[0_12px_32px_-12px_hsl(var(--accent)/0.7)] transition-[filter,transform] duration-300 ease-out-expo hover:brightness-110 active:scale-[0.98]"
                >
                  Book a free audit
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/5"
                >
                  See our work
                </a>
              </div>

              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/60 md:mt-12">
                <li>
                  <CountUp value={100} prefix="$" suffix="M+" start={statsActive} className="font-semibold text-white" />{' '}
                  ad spend managed
                </li>
                <li>
                  <CountUp value={350} suffix="%" start={statsActive} className="font-semibold text-white" /> avg. ROI
                </li>
                <li>Global reach</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ─── Capabilities ticker ─── */}
        <motion.div
          style={{ opacity: bgOpacity }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/10 bg-background/60 py-4 backdrop-blur-sm"
        >
          <div className="flex w-max animate-marquee items-center whitespace-nowrap font-display text-lg tracking-tight text-white/60 md:text-xl">
            {[...tickerServices, ...tickerServices].map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="px-8">{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
              </span>
            ))}
          </div>
        </motion.div>

        {/* ─── Scroll cue ─── */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          aria-hidden="true"
          className="absolute bottom-20 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
