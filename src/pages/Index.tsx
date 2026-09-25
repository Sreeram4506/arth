import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Work } from '@/components/Work'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
