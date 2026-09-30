import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { RevealHeading } from '@/components/RevealHeading'
import { EASE_OUT_EXPO } from '@/lib/motion'

type CaseStudy = {
  client: string
  sector: string
  location?: string
  summary: string
  delivered: string[]
  /** Leave undefined until the link is available; the row then renders without one */
  href?: string
  linkLabel: string
}

const caseStudies: CaseStudy[] = [
  {
    client: 'Fit Secrets',
    sector: 'Fitness',
    summary:
      'Complete content and growth partner. We shoot and edit their videos, run their social media, manage their Meta Ads and handle SEO.',
    delivered: ['Video shooting', 'Video editing', 'Social media handling', 'Meta Ads', 'SEO'],
    href: undefined,
    linkLabel: 'View on Instagram',
  },
  {
    client: 'Quantumrise Infra',
    sector: 'Real estate',
    location: 'Bangalore',
    summary:
      'A developer of premium plotted communities in East Bangalore. We designed and built their website and handle their SEO.',
    delivered: ['Website design & development', 'SEO'],
    href: 'https://www.quantumriseinfra.com',
    linkLabel: 'quantumriseinfra.com',
  },
  {
    client: 'Samadhai Technologies',
    sector: 'Software',
    location: 'Hyderabad',
    summary:
      'A software company building AI-driven internal tools and enterprise platforms. We built their website and handle their SEO.',
    delivered: ['Website design & development', 'SEO'],
    href: 'https://www.samadhaitechnologies.com',
    linkLabel: 'samadhaitechnologies.com',
  },
  {
    client: 'Acuity Tax',
    sector: 'Tax & compliance',
    location: 'Hyderabad',
    summary:
      'A tax and compliance firm offering GST, income tax filing, company incorporation and business advisory. We built their website and handle their SEO.',
    delivered: ['Website design & development', 'SEO'],
    href: 'https://www.acuitytax.in',
    linkLabel: 'acuitytax.in',
  },
]

function CaseStudyRow({ project }: { project: CaseStudy }) {
  const isLinked = Boolean(project.href)

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO }}
      className="group relative border-t border-white/15 py-12 md:py-16"
    >
      {/* Gold rule sweeps across on hover, matching the services list */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[hsl(var(--accent))] transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h3 className="font-display text-3xl leading-tight tracking-tight text-white transition-colors duration-500 group-hover:text-[hsl(var(--accent))] md:text-4xl lg:text-5xl">
            {isLinked ? (
              // The stretched ::after makes the whole row clickable while the link keeps a short accessible name.
              // Only the inner span moves on hover: a transform on the link would shrink the ::after to the heading.
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
              >
                <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                  {project.client}
                </span>
              </a>
            ) : (
              project.client
            )}
          </h3>
          <p className="mt-3 text-sm text-white/60">
            {project.sector}
            {project.location && (
              <>
                <span aria-hidden="true" className="mx-2 text-white/30">
                  /
                </span>
                {project.location}
              </>
            )}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">{project.summary}</p>

          <h4 className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-white/55">What we did</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.delivered.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/75 transition-colors duration-500 group-hover:border-[hsl(var(--accent)/0.4)]"
              >
                {item}
              </li>
            ))}
          </ul>

          {isLinked && (
            <p
              aria-hidden="true"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300 group-hover:text-[hsl(var(--accent))]"
            >
              {project.linkLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </p>
          )}
        </div>
      </div>

      {/* Focus ring for keyboard users, drawn around the whole clickable row */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg outline outline-2 outline-offset-4 outline-transparent group-has-[:focus-visible]:outline-[hsl(var(--accent))]"
      />
    </motion.article>
  )
}

export function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-8 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <RevealHeading lines={['Case', 'Studies.']} className="text-section" />
          <p className="max-w-md text-lg leading-relaxed text-white/70 lg:pb-3">
            A few of the businesses we've helped with content, websites, SEO and social media.
          </p>
        </div>

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
