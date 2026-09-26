import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollVisibility } from '@/hooks/useScrollVisibility'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
]

export function Navigation() {
  const activeSection = useActiveSection()
  const isVisible = useScrollVisibility()
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastIntro, setPastIntro] = useState(false)

  // The intro's big "arth" hands off to the header logo once it has shrunk away
  useEffect(() => {
    const handleScroll = () => setPastIntro(window.scrollY > window.innerHeight * 1.4)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const goTo = (id: string) => {
    setMenuOpen(false)
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        {/* Scrim keeps the header legible over scrolling content */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/70 to-transparent transition-opacity duration-500',
            pastIntro && !menuOpen ? 'opacity-100' : 'opacity-0'
          )}
        />

        <div className="relative flex items-center justify-between px-6 py-4 md:px-10 md:py-8">
          <div className="flex h-11 items-center">
            <AnimatePresence>
              {pastIntro && (
                <motion.button
                  key="logo"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                  onClick={() => window.scrollTo({ top: 0 })}
                  aria-label="arth — back to top"
                  className="pointer-events-auto font-display text-2xl leading-none tracking-tighter text-white transition-colors duration-300 hover:text-[hsl(var(--accent))]"
                >
                  arth
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="pointer-events-auto flex items-center gap-8">
            <div className="hidden items-center gap-8 md:flex">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/65 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent)/0.5)] bg-background/40 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
              >
                Free audit
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 flex h-11 items-center px-2 text-sm font-medium text-white md:hidden"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile full-screen menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-surface px-6 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Sections">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <li key={item.id} className="overflow-hidden">
                    <motion.button
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.06 }}
                      onClick={() => goTo(item.id)}
                      aria-current={activeSection === item.id ? 'true' : undefined}
                      className={cn(
                        'block py-1 font-display text-5xl leading-tight tracking-tighter transition-colors',
                        activeSection === item.id ? 'text-[hsl(var(--accent))]' : 'text-white'
                      )}
                    >
                      {item.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.45 }}
              className="space-y-8"
            >
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-semibold text-[hsl(var(--accent-foreground))]"
              >
                Book a free audit
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/65 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Desktop section nav — bottom right, rests while you scroll ─── */}
      <nav
        aria-label="Sections"
        className={cn(
          'fixed bottom-0 right-0 z-50 hidden p-10 transition-all duration-500 ease-out-expo md:block',
          !pastIntro && '-translate-y-12',
          isVisible ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-8 opacity-0'
        )}
      >
        <ul className="flex flex-col items-end gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => goTo(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className="group flex items-center gap-3 py-1 text-sm"
                >
                  <span
                    className={cn(
                      'transition-colors duration-300',
                      isActive ? 'text-white' : 'text-white/55 group-hover:text-white'
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="relative h-1.5 w-1.5">
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                        className="absolute inset-0 rounded-full bg-[hsl(var(--accent))]"
                      />
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
