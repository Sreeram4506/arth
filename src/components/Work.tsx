import { motion } from 'framer-motion'

const caseStudies = [
  {
    client: 'Lumina Skincare',
    sector: 'DTC E-commerce',
    year: '2025',
    summary:
      'Scaled customer acquisition through high-converting UGC creatives and an aggressive Meta Ads scaling strategy, dominating the Q4 holiday season.',
    metrics: [
      { value: '4.2x', label: 'Return on Ad Spend' },
      { value: '$2.8M', label: 'Revenue Generated' },
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
      { value: '+310%', label: 'Organic Traffic' },
      { value: '85', label: 'Enterprise Leads' },
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
      { value: '150k', label: 'Waitlist Signups' },
      { value: '$1M+', label: 'Day 1 Sales' },
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
      { value: '+65%', label: 'Repeat Purchase Rate' },
      { value: '+42%', label: 'Average Order Value' },
    ],
    stack: ['Brand Strategy', 'UI/UX', 'Email Marketing', 'SMS'],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: 'easeOut' },
}

export function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="font-mono text-xs text-[hsl(var(--accent))] tracking-[0.3em] uppercase font-bold">
            Proven Results
          </span>
          <div className="w-6 h-px bg-[hsl(var(--accent))] mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[8vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          Case<br />Studies.
        </motion.h2>

        <div className="space-y-0">
          {caseStudies.map((project, index) => (
            <motion.article
              key={project.client}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
              className="border-t border-gray-800 py-8 md:py-12 lg:py-16 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-5">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">
                    {project.client}
                  </h3>
                  <p className="text-base text-gray-400">{project.sector}</p>
                </div>

                <div className="lg:col-span-2">
                  <p className="font-mono text-xs text-gray-500 tracking-[0.2em] uppercase group-hover:text-[hsl(var(--accent)/0.7)] transition-colors duration-300">
                    {project.year}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-gray-400 leading-relaxed mb-8 text-sm lg:text-base">
                    {project.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="border-l-2 border-[hsl(var(--accent)/0.3)] pl-4">
                        <p className="font-display text-3xl lg:text-4xl text-white leading-none">
                          {metric.value}
                        </p>
                        <p className="font-mono text-[10px] tracking-widest uppercase text-gray-500 mt-2 font-semibold">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-gray-400 border border-gray-800 rounded-md group-hover:border-[hsl(var(--accent)/0.5)] transition-colors duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
