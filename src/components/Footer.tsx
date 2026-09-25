import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-gray-900 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl text-white mb-6">ARTH</h3>
            <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
              We are a premium digital marketing agency focused on driving quantifiable growth through data, strategy, and relentless execution.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" className="text-gray-500 hover:text-[hsl(var(--accent))] transition-colors">
                Twitter
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-[hsl(var(--accent))] transition-colors">
                LinkedIn
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-[hsl(var(--accent))] transition-colors">
                Instagram
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#services" className="hover:text-white transition-colors">Performance Marketing</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">SEO & Search</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Brand Strategy</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Web & CRO</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#work" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] tracking-widest uppercase text-gray-600">
            © {new Date().getFullYear()} ARTH
          </p>
          <p className="font-mono text-[10px] tracking-widest uppercase text-gray-600">
            Premium Performance Marketing
          </p>
        </div>
      </div>
    </footer>
  )
}
