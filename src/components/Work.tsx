import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CountUp } from '@/components/CountUp'
import { RevealHeading } from '@/components/RevealHeading'
import { EASE_OUT_EXPO } from '@/lib/motion'

type Metric = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }

type CaseStudy = {
  client: string
  sector: string
  year: string
  summary: string
  metrics: Metric[]
  stack: string[]
}

const caseStudies: CaseStudy[] = [
  {
    client: 'Lumina Skincare',
    sector: 'DTC E-commerce',
    year: '2025',
    summary:
      'Scaled customer acquisition through high-converting UGC creatives and an aggressive Meta Ads scaling strategy, dominating the Q4 holiday season.',
    metrics: [
      { value: 4.2, decimals: 1, suffix: 'x', label: 'Return on ad spend' },
      { value: 2.8, decimals: 1, prefix: '$', suffix: 'M', label: 'Revenue generated' },
    ],
    stack: ['Meta Ads', 'TikTok Ads', 'Shopify', 'Klaviyo'],
  },
  {
    client: 'Apex Fintech',
    sector: 'B2B SaaS',
    year: '2024',
    summary:
      'Overhauled technical SEO and executed a targeted content cluster strategy to capture high-intent enterprise search traffic from competitors.',
    metrics: [
      { value: 310, prefix: '+', suffix: '%', label: 'Organic traffic' },
      { value: 85, label: 'Enterprise leads' },
    ],
    stack: ['Technical SEO', 'Content Strategy', 'HubSpot', 'LinkedIn Ads'],
  },
  {
    client: 'Neon Energy',
    sector: 'Consumer Electronics',
    year: '2024',
    summary:
      'Engineered a viral brand launch campaign focused on influencer partnerships and a high-converting waitlist funnel.',
    metrics: [
      { value: 150, suffix: 'k', label: 'Waitlist signups' },
      { value: 1, prefix: '$', suffix: 'M+', label: 'Day 1 sales' },
    ],
    stack: ['Influencer Marketing', 'CRO', 'Webflow', 'PR'],
  },
  {
    client: 'Aura Athletics',
    sector: 'Apparel',
    year: '2023',
    summary:
      'Complete brand repositioning and website redesign, coupled with a full-funnel retention strategy to increase customer lifetime value.',
    metrics: [
      { value: 65, prefix: '+', suffix: '%', label: 'Repeat purchase rate' },
      { value: 42, prefix: '+', suffix: '%', label: 'Average order value' },
    ],
    stack: ['Brand Strategy', 'UI/UX', 'Email Marketing', 'SMS'],
  },
]

function CaseStudyRow({ project }: { project: CaseStudy }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: EASE_OUT_EXPO }}
      className="group relative border-t border-white/15 py-12 md:py-16"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h3 className="font-display text-3xl leading-tight tracking-tight text-white transition-colors duration-500 group-hover:text-[hsl(var(--accent))] md:text-4xl lg:text-5xl">
            {project.client}
          </h3>
          <p className="mt-3 text-sm text-white/55">
            {project.sector}
            <span aria-hidden="true" className="mx-2 text-white/25">
              /
            </span>
            <span className="tabular-nums">{project.year}</span>
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="max-w-xl text-base leading-relaxed text-white/65">{project.summary}</p>

          <dl className="mt-10 grid grid-cols-2 gap-6">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="border-t border-white/10 pt-5">
                <dt className="sr-only">{metric.label}</dt>
                <dd className="font-display text-4xl leading-none tracking-tight text-white md:text-5xl">
                  <CountUp
                    value={metric.value}
                    decimals={metric.decimals}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    start={inView}
                    duration={2}
                  />
                </dd>
                <dd aria-hidden="true" className="mt-3 text-sm text-white/55">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label={`${project.client} channels and tools`}>
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65 transition-colors duration-500 group-hover:border-[hsl(var(--accent)/0.35)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  )
}

export function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <RevealHeading lines={['Case', 'Studies.']} className="mb-16 text-section lg:mb-24" />

        <div>
          {caseStudies.map((project) => (
            <CaseStudyRow key={project.client} project={project} />
          ))}
          <div aria-hidden="true" className="h-px bg-white/15" />
        </div>
      </div>
    </section>
  )
}
