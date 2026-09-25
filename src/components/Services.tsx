import { motion } from 'framer-motion'

const services = [
  {
    index: '01',
    title: 'Performance Marketing',
    description:
      'Data-driven paid acquisition across search and social channels, optimized for lowest CAC and maximum LTV.',
    stack: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'Programmatic', 'LinkedIn'],
  },
  {
    index: '02',
    title: 'SEO & Search Strategy',
    description:
      'Technical SEO, content strategy, and authoritative link building that drives high-intent organic traffic to your brand.',
    stack: ['Technical SEO', 'Content Clusters', 'Ahrefs', 'Semrush', 'Analytics'],
  },
  {
    index: '03',
    title: 'Brand Strategy',
    description:
      'Positioning, messaging, and visual identity that cuts through the noise and creates a premium perception in the market.',
    stack: ['Positioning', 'Messaging', 'Visual Identity', 'Market Research'],
  },
  {
    index: '04',
    title: 'Web & CRO',
    description:
      'High-converting landing pages and websites engineered for speed, aesthetics, and optimal conversion rates.',
    stack: ['Shopify', 'Webflow', 'Next.js', 'A/B Testing', 'UI/UX'],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Services() {
  return (
    <section id="services" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="font-mono text-xs text-[hsl(var(--accent))] tracking-[0.3em] uppercase font-bold">
            What we do
          </span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[8vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          Capabilities.
        </motion.h2>

        <div className="border-t border-gray-800">
          {services.map((service, index) => (
            <motion.article
              key={service.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.08 }}
              className="border-b border-gray-800 py-10 md:py-14 group hover:bg-white/[0.02] transition-colors duration-500 rounded-lg px-4 md:px-8 -mx-4 md:-mx-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-1">
                  <span className="font-mono text-xs text-gray-600 tracking-widest">
                    {service.index}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-[hsl(var(--accent))] transition-colors duration-500">
                    {service.title}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm lg:text-base max-w-2xl">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.stack.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-gray-400 border border-gray-800 rounded-full group-hover:border-[hsl(var(--accent)/0.3)] transition-colors duration-500"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
