import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { RevealHeading } from '@/components/RevealHeading'

const steps = [
  {
    title: 'Audit',
    body: 'We dig into your funnel, ad accounts, and analytics to find exactly where growth is leaking.',
  },
  {
    title: 'Strategy',
    body: 'A channel plan built around your unit economics, with budgets, creative angles, and KPIs agreed up front.',
  },
  {
    title: 'Launch',
    body: 'Campaigns, landing pages, and tracking go live fast, instrumented from day one.',
  },
  {
    title: 'Scale',
    body: "Weekly testing and reporting. We double down on what works and cut what doesn't.",
  },
]

function Step({ step, index, progress }: { step: (typeof steps)[number]; index: number; progress: MotionValue<number> }) {
  const at = index / steps.length
  const lit = useTransform(progress, [at - 0.02, at + 0.06], [0, 1])
  const opacity = useTransform(lit, [0, 1], [0.4, 1])

  return (
    <motion.li style={{ opacity }} className="relative pl-12 md:pl-0 md:pt-14">
      <span
        aria-hidden="true"
        className="absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-white/25 bg-surface md:top-0"
      >
        <motion.span style={{ scale: lit }} className="h-[7px] w-[7px] rounded-full bg-[hsl(var(--accent))]" />
      </span>

      <p className="font-mono text-xs tabular-nums text-[hsl(var(--accent))]">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="mt-3 font-display text-3xl tracking-tight text-white md:text-4xl">{step.title}</h3>
      <p className="mt-4 max-w-xs text-base leading-relaxed text-white/65">{step.body}</p>
    </motion.li>
  )
}

export function Process() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="process" className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <RevealHeading lines={['How we', 'work.']} className="text-section" />
          <p className="max-w-sm text-base leading-relaxed text-white/65 lg:pb-3">
            From the first audit to compounding growth, every engagement runs on the same four steps.
          </p>
        </div>

        <ol ref={listRef} className="relative mt-20 grid gap-14 md:mt-28 md:grid-cols-4 md:gap-8">
          {/* Track + fill: horizontal from md up, vertical on phones */}
          <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/10 md:block" />
          <motion.span
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-[hsl(var(--accent))] md:block"
          />
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-white/10 md:hidden" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-[hsl(var(--accent))] md:hidden"
          />

          {steps.map((step, index) => (
            <Step key={step.title} step={step} index={index} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  )
}
