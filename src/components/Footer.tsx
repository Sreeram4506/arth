import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp, ArrowUpRight } from 'lucide-react'

const serviceLinks = ['Marketing', 'Content', 'Technology', 'Offline Growth']

const companyLinks = [
  { label: 'Process', href: '#process' },
  { label: 'Case Studies', href: '#work' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/arthmarketingmedia' },
  { label: 'Email', href: 'mailto:buildwitharth@gmail.com' },
]

const headingClass = 'mb-6 text-xs font-medium uppercase tracking-[0.14em] text-white/55'
const linkClass = 'text-sm text-white/70 transition-colors duration-300 hover:text-white'

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ['start end', 'end end'] })
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ['45%', '0%'])

  return (
    <footer ref={footerRef} className="w-full overflow-hidden border-t border-white/5 bg-surface-deep">
      <div className="gutter mx-auto max-w-7xl box-content pt-20 lg:pt-28">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-12 lg:gap-8">
          <div className="col-span-2 md:col-span-5">
            <p className="font-display text-3xl tracking-tighter text-white">ARTH</p>
            <p className="mt-2 text-sm font-medium text-white/80">ARTH Marketing Media</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Marketing. Content. Technology. Helping businesses attract customers both online and offline.
            </p>
          </div>

          <nav aria-label="Services" className="md:col-span-3 md:col-start-7">
            <h4 className={headingClass}>Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a href="#services" className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <h4 className={headingClass}>Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social" className="md:col-span-2">
            <h4 className={headingClass}>Connect</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-1 ${linkClass}`}
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 opacity-50 transition-[opacity,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/55">
            © <span className="tabular-nums">{new Date().getFullYear()}</span> ARTH Marketing Media. Online. Offline.
            Everywhere your customers are.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0 })}
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>

      <motion.p
        aria-hidden="true"
        style={{ y: wordmarkY }}
        className="mt-10 select-none text-center font-display text-[34vw] leading-[0.78] tracking-tighter text-white/[0.05]"
      >
        ARTH
      </motion.p>
    </footer>
  )
}
