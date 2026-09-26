import { ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <main className="gutter flex min-h-screen flex-col items-start justify-center bg-background">
      <div className="mx-auto w-full max-w-7xl">
        <p className="font-display text-[30vw] leading-none tracking-tighter text-white/[0.06] md:text-[18vw]">404</p>
        <h1 className="-mt-[0.4em] font-display text-hero leading-none tracking-tighter text-white">
          Page not found.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
          The page you're looking for doesn't exist or has moved.
        </p>
        <a
          href="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to arth
        </a>
      </div>
    </main>
  )
}

export default NotFound
