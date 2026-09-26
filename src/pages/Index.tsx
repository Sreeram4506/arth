import { MotionConfig } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { ArthIntro } from '@/components/ArthIntro'
import { Services } from '@/components/Services'
import { Process } from '@/components/Process'
import { Work } from '@/components/Work'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground">
        <GrainOverlay />
        <Navigation />
        <main>
          <ArthIntro />
          <Services />
          <Process />
          <Work />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
