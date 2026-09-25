import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

const socialLinks = [
  { label: 'Audit', href: '#contact' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
]

export function Navigation() {
  const activeSection = useActiveSection()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNavLogo, setShowNavLogo] = useState(false)

  // Show the logo in navbar once user has scrolled past the hero section
  useEffect(() => {
    const handleScroll = () => {
      // The hero section has height: 200vh, so when scrolled ~85% through it,
      // the hero "arth" text has faded out — show nav logo
      const threshold = window.innerHeight * 1.4
      setShowNavLogo(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ─── Top Navigation Bar ─── */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          showNavLogo
            ? 'bg-[hsl(var(--background))]/80 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        )}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          {/* Logo — fades in from the hero scroll */}
          <AnimatePresence>
            {showNavLogo && (
              <motion.button
                initial={{ opacity: 0, y: -12, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.85 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={scrollToTop}
                className="font-display text-xl md:text-2xl text-white tracking-tighter cursor-pointer hover:text-[hsl(var(--accent))] transition-colors duration-300"
              >
                arth
              </motion.button>
            )}
          </AnimatePresence>

          {/* Spacer when logo is hidden so right-side items stay right */}
          {!showNavLogo && <div />}

          {/* Desktop nav items + social links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'text-sm text-white/60 transition-all duration-300 relative py-1 hover:text-white',
                  activeSection === item.id && 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[hsl(var(--accent))]'
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="w-px h-4 bg-white/10" />
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('#') ? undefined : '_blank'}
                rel={link.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                className="text-sm text-white/40 hover:text-white transition-opacity duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-sm text-white"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[hsl(var(--background))]/95 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-1 px-6 py-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'text-left text-base text-white/60 py-3 transition-all duration-300 hover:text-white hover:pl-2',
                      activeSection === item.id && 'text-white pl-2'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-white/[0.06] my-3" />
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('#') ? undefined : '_blank'}
                    rel={link.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                    className="text-base text-white/40 py-2 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
