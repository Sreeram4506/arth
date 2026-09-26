import { Component, lazy, Suspense, useRef, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { RevealHeading } from '@/components/RevealHeading'
import type { ModelKey } from '@/components/ServiceModels'
import { EASE_OUT_EXPO } from '@/lib/motion'

const ServicesScene = lazy(() => import('@/components/ServicesScene'))

type Scene = { model: ModelKey; title: string; description: string; services: string[] }

const scenes: Scene[] = [
  {
    model: 'microphone',
    title: 'Marketing',
    description: 'Ads, social media and lead generation.',
    services: [
      'Social media management',
      'Instagram marketing',
      'Paid advertising / Meta Ads',
      'Google Ads',
      'Lead generation',
      'Influencer marketing',
      'Google Business Profile / local marketing',
    ],
  },
  {
    model: 'camera',
    title: 'Reels & Video',
    description: 'Reels, product videos and ad creatives.',
    services: ['Reels & short-form videos', 'Product videos', 'Ad creatives'],
  },
  {
    model: 'book',
    title: 'Scripts & Creatives',
    description: 'Scripts, campaigns, posters and banners.',
    services: ['Scripts & campaigns', 'Posters & banners', 'AI-assisted creatives'],
  },
  {
    model: 'laptop',
    title: 'Technology',
    description: 'Websites, e-commerce and catalogues.',
    services: [
      'Business websites',
      'E-commerce websites',
      'Product catalogues',
      'Landing pages',
      'WhatsApp integration',
      'Website maintenance',
    ],
  },
  {
    model: 'storefront',
    title: 'Offline Growth',
    description: 'Promotions, campaigns and local marketing.',
    services: [
      'Local promotional campaigns',
      'Offline advertising ideas',
      'Shop / store promotions',
      'Event promotions',
      'Outdoor promotion concepts',
      'Print campaign ideas',
      'Customer acquisition ideas',
      'Online + offline campaign integration',
    ],
  },
]

// Without WebGL (or if the 3D chunk fails to load) the section keeps working as text only
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const calm = useReducedMotion() ?? false

  // Load the 3D scene shortly before it's needed, and only render frames while it's on screen
  const nearView = useInView(trackRef, { once: true, margin: '600px 0px' })
  const onScreen = useInView(trackRef, { margin: '100px 0px' })

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(scenes.length - 1, Math.max(0, Math.round(v * (scenes.length - 1)))))
  })

  const scene = scenes[active]

  return (
    <section id="services" className="relative">
      <div className="gutter pt-28 md:pt-40 lg:pt-48">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <RevealHeading lines={['What we do.']} className="text-section" />
          <p className="max-w-md text-lg leading-relaxed text-white/70 lg:pb-3">
            We don't just create content. We create ways for businesses to get attention, generate enquiries and
            grow.
          </p>
        </div>
      </div>

      {/* The animated panel below is visual; this list gives screen readers every service at once */}
      <ul className="sr-only">
        {scenes.map((s) => (
          <li key={s.title}>
            {s.title}: {s.description} {s.services.join(', ')}.
          </li>
        ))}
      </ul>

      <div ref={trackRef} className="relative" style={{ height: `${scenes.length * 100}vh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="gutter mx-auto box-content grid h-full max-w-7xl grid-rows-[minmax(0,1fr)_auto] pb-8 pt-20 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-10 lg:py-0">
            <div aria-hidden="true" className="relative min-h-0 lg:order-2 lg:col-span-7 lg:h-[80vh]">
              <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,hsl(var(--accent)/0.14),transparent)]" />
              {nearView && (
                <SceneBoundary>
                  <Suspense fallback={null}>
                    <ServicesScene
                      sequence={scenes.map((s) => s.model)}
                      progress={scrollYProgress}
                      running={onScreen}
                      calm={calm}
                    />
                  </Suspense>
                </SceneBoundary>
              )}
            </div>

            <div aria-hidden="true" className="lg:order-1 lg:col-span-5">
              <div className="mb-6 flex items-center gap-4 font-mono text-xs tabular-nums lg:mb-10">
                <span className="text-[hsl(var(--accent))]">{String(active + 1).padStart(2, '0')}</span>
                <span className="relative h-px flex-1 overflow-hidden bg-white/15">
                  <motion.span
                    style={{ scaleX: scrollYProgress }}
                    className="absolute inset-0 origin-left bg-[hsl(var(--accent))]"
                  />
                </span>
                <span className="text-white/50">{String(scenes.length).padStart(2, '0')}</span>
              </div>

              <div className="relative h-[17rem] md:h-[16rem] lg:h-[20rem]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={scene.title}
                    initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -28, filter: 'blur(8px)' }}
                    transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                    className="absolute inset-0"
                  >
                    <h3 className="font-display text-4xl leading-none tracking-tighter text-white md:text-5xl lg:text-6xl">
                      {scene.title}
                      <span className="text-[hsl(var(--accent))]">.</span>
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-white/75 lg:mt-6">{scene.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-2 lg:mt-8">
                      {scene.services.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/75 md:text-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
