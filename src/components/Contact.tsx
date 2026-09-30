import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { RevealHeading } from '@/components/RevealHeading'
import { EASE_OUT_EXPO } from '@/lib/motion'

const CONTACT_EMAIL = 'buildwitharth@gmail.com'
const WHATSAPP_NUMBER = '919809987999'

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 + i * 0.08 },
  }),
}

const labelClass = 'block text-xs font-medium uppercase tracking-[0.14em] text-white/60'
const inputClass =
  'mt-2 w-full border-b border-white/15 bg-transparent py-3 text-base text-white placeholder:text-white/50 transition-colors duration-300 focus:border-[hsl(var(--accent))] focus:outline-none'

export function Contact() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Hi ARTH! I'm ${name}${company ? ` from ${company}` : ''}.\n\n${message}`
    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
    setSent(true)
  }

  return (
    <section id="contact" className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl">
        <RevealHeading lines={['Book a', 'Strategy Call.']} className="text-hero" />

        <div className="mt-16 grid grid-cols-1 gap-14 border-t border-white/15 pt-12 lg:mt-20 lg:grid-cols-12 lg:gap-16 lg:pt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5"
          >
            <motion.h3 custom={0} variants={rise} className="text-2xl font-bold leading-snug text-white md:text-3xl">
              Let's uncover the bottlenecks in your acquisition funnel.
            </motion.h3>
            <motion.p custom={1} variants={rise} className="mt-6 max-w-md text-base leading-relaxed text-white/65">
              We offer a complimentary marketing audit for qualified brands. Drop your details below, and our team
              will get back to you within 24 hours with actionable insights and next steps.
            </motion.p>

            <motion.div custom={2} variants={rise} className="mt-10">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group inline-flex items-center gap-2 text-lg text-white transition-colors hover:text-[hsl(var(--accent))]"
              >
                <span className="underline decoration-white/25 transition-colors group-hover:decoration-[hsl(var(--accent))]">
                  {CONTACT_EMAIL}
                </span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            onSubmit={handleSubmit}
            className="space-y-10 lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
              <motion.div custom={0} variants={rise}>
                <label htmlFor="contact-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Jane Cooper"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </motion.div>
              <motion.div custom={1} variants={rise}>
                <label htmlFor="contact-company" className={labelClass}>
                  Company or website <span className="normal-case tracking-normal text-white/50">(optional)</span>
                </label>
                <input
                  id="contact-company"
                  name="company"
                  autoComplete="organization"
                  className={inputClass}
                  placeholder="acme.com"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </motion.div>
            </div>

            <motion.div custom={2} variants={rise}>
              <label htmlFor="contact-message" className={labelClass}>
                Growth goals
              </label>
              <textarea
                id="contact-message"
                name="message"
                className={`${inputClass} resize-none`}
                placeholder="Tell us about your goals, channels, and current spend."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </motion.div>

            <motion.div custom={3} variants={rise} className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-8 py-4 text-sm font-semibold text-[hsl(var(--accent-foreground))] shadow-[0_12px_32px_-12px_hsl(var(--accent)/0.7)] transition-[filter,transform] duration-300 ease-out-expo hover:brightness-110 active:scale-[0.98]"
              >
                {sent ? 'Send again' : 'Request audit'}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <p role="status" className="text-sm text-white/65">
                {sent && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check aria-hidden="true" className="h-4 w-4 text-[hsl(var(--accent))]" />
                    Your WhatsApp should open with the message ready to send.
                  </motion.span>
                )}
              </p>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
