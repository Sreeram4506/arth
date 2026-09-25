import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Contact() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Growth Strategy Audit — ${company || name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}${company ? `, ${company}` : ''}`)
    window.location.href = `mailto:hello@nexusdigital.agency?subject=${subject}&body=${body}`
  }

  const inputClass =
    'w-full bg-transparent border-b border-gray-800 py-4 text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-[hsl(var(--accent))] transition-colors duration-300'

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="font-mono text-xs text-[hsl(var(--accent))] tracking-[0.3em] uppercase font-bold">
            Audit & Strategy
          </span>
          <div className="w-6 h-px bg-[hsl(var(--accent))] mt-2" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-display text-[10vw] lg:text-hero leading-none tracking-tight mb-8"
        >
          Book a<br />Strategy Call.
        </motion.h2>

        <motion.div {...fadeInUp} className="w-full h-px bg-gray-700 mb-12 lg:mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div {...fadeInUp} className="lg:col-span-5">
            <h3 className="text-xl md:text-2xl text-white font-bold leading-snug mb-6">
              Let's uncover the bottlenecks in your acquisition funnel.
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-10">
              We offer a complimentary marketing audit for qualified brands. 
              Drop your details below, and our team will get back to you within 24 hours 
              with actionable insights and next steps.
            </p>

            <div className="space-y-4 font-mono text-xs tracking-[0.2em] uppercase text-[hsl(var(--accent)/0.8)] font-semibold">
              <p>hello@nexusdigital.agency</p>
              <p>New York, NY / Global</p>
            </div>
          </motion.div>

          <motion.form
            {...fadeInUp}
            onSubmit={handleSubmit}
            className="lg:col-span-7 space-y-8"
          >
            <input
              className={inputClass}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className={inputClass}
              placeholder="Company / Website URL"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <textarea
              className={`${inputClass} resize-none`}
              placeholder="What are your current growth goals?"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              type="submit"
              className="font-mono text-xs tracking-[0.25em] uppercase text-white bg-[hsl(var(--accent))] border border-[hsl(var(--accent))] px-8 py-4 hover:bg-transparent hover:text-[hsl(var(--accent))] transition-colors font-bold rounded-md"
            >
              Request Audit ↗
            </button>
          </motion.form>
        </div>

      </div>
    </section>
  )
}
