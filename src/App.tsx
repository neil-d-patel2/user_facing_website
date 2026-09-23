import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Menu, Pause, Play, X } from 'lucide-react'
import ShinyText from './components/ShinyText'
import InfoDialog from './components/InfoDialog'
import { navigation, siteContent, type PanelId } from './content'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [panel, setPanel] = useState<PanelId | null>(null)
  const [paused, setPaused] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()
  const motionPaused = paused || Boolean(reducedMotion)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (motionPaused) video.pause()
    else void video.play().catch(() => setPaused(true))
  }, [motionPaused])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  function navigate(id: (typeof navigation)[number]['id']) {
    if (menuOpen) menuButtonRef.current?.focus()
    setMenuOpen(false)
    setPanel(id === 'home' ? null : id)
  }

  return (
    <main id="home" className="hero relative isolate h-screen min-h-[680px] overflow-hidden bg-black text-white">
      <a href="#hero-content" className="skip-link">Skip to content</a>

      <div className="video-fallback absolute inset-0 -z-30" aria-hidden="true" />
      {!videoFailed && (
        <video
          ref={videoRef}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src={siteContent.videoUrl}
          autoPlay={!reducedMotion}
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        />
      )}
      <div className="hero-overlay pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 sm:px-9 lg:px-10">
        <header className="relative flex shrink-0 items-center justify-between pt-7 md:pt-9">
          <a href="#home" aria-label={`${siteContent.brand} home`} onClick={() => navigate('home')} className="inline-flex items-center gap-2.5 rounded-sm">
            <span className="flex size-9 items-center justify-center rounded-full border-2 border-white" aria-hidden="true">
              <span className="size-3.5 rounded-full bg-white" />
            </span>
            <span className="text-[23px] font-semibold tracking-[-0.055em]">{siteContent.brand}</span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 rounded-full border border-gray-700 bg-black/10 p-1.5 backdrop-blur-md lg:flex">
            {navigation.map(({ id, label }) => (
              <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); navigate(id) }} aria-current={id === 'home' ? 'page' : undefined} className={`nav-link flex items-center gap-2 rounded-full px-3.5 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/8 hover:text-white ${id === 'contact' ? 'ml-1 border border-white/15 bg-white/5' : ''}`}>
                {label}
                {id === 'contact' && <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />}
              </a>
            ))}
          </nav>

          <button ref={menuButtonRef} type="button" onClick={() => setMenuOpen(!menuOpen)} className="flex size-11 items-center justify-center rounded-full border border-gray-700 bg-black/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation">
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav id="mobile-navigation" aria-label="Mobile navigation" initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: 0.18 }} className="absolute inset-x-0 top-[calc(100%+1rem)] z-30 rounded-2xl border border-gray-700 bg-black/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
                {navigation.map(({ id, label }) => (
                  <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); navigate(id) }} aria-current={id === 'home' ? 'page' : undefined} className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                    {label}<ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <div className="intro-row mt-12 grid shrink-0 gap-7 text-sm text-white/80 md:mt-12 md:text-base lg:grid-cols-2 lg:items-start">
          <p className="max-w-[390px] leading-[1.65]">{siteContent.introduction}</p>
          <p className="flex items-center gap-3 leading-[1.6] lg:justify-end lg:text-right">
            <span className="relative flex size-2 shrink-0" aria-hidden="true"><span className="absolute inset-0 rounded-full bg-[#64CEFB]/30 blur-[3px]" /><span className="relative size-2 rounded-full bg-[#9adfff]" /></span>
            <span>8000+ Talented Designers <span className="whitespace-nowrap">Launched !</span></span>
          </p>
        </div>

        <section id="hero-content" aria-labelledby="hero-heading" className="hero-content flex flex-1 flex-col items-center justify-center pb-14 pt-12 text-center outline-none md:pb-10 md:pt-8" tabIndex={-1}>
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="flex w-full flex-col items-center">
            <p className="mb-8 flex items-center justify-center gap-2.5 text-xs uppercase tracking-tight text-white/80 md:mb-9 md:text-sm">
              <span className="size-1 rounded-full bg-[#64CEFB]" aria-hidden="true" />
              {siteContent.announcement}
            </p>
            <h1 id="hero-heading" className="hero-heading flex flex-col items-center text-5xl font-medium leading-[0.85] tracking-tighter sm:text-7xl md:text-8xl xl:text-9xl">
              <span className="block">{siteContent.headline[0]}</span>
              <ShinyText text={siteContent.headline[1]} className="mt-3 block whitespace-nowrap pb-[0.12em] md:mt-4" paused={motionPaused} />
            </h1>
            <button type="button" onClick={() => setPanel('enrollment')} className="group mt-8 inline-flex items-center gap-7 rounded-full border border-white/10 bg-black px-6 py-3 text-sm font-medium text-white transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-gray-900 md:mt-9 md:px-8 md:py-4">
              {siteContent.cta}
              <ArrowRight size={19} strokeWidth={1.6} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </motion.div>
        </section>

        <footer className="hero-footer flex shrink-0 items-end justify-between border-t border-white/15 pb-6 pt-5 md:pb-7">
          <p className="text-[10px] uppercase tracking-[0.13em] text-white/80 sm:text-[11px]">A new perspective starts here.</p>
          <div className="flex items-center gap-5">
            <span className="hidden text-[10px] uppercase tracking-[0.13em] text-white/80 sm:inline">Designed for what’s next</span>
            {!videoFailed && !reducedMotion && (
              <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play background animation' : 'Pause background animation'} aria-pressed={paused} className="flex size-8 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                {paused ? <Play size={11} fill="currentColor" aria-hidden="true" /> : <Pause size={11} fill="currentColor" aria-hidden="true" />}
              </button>
            )}
          </div>
        </footer>
      </div>

      <InfoDialog panel={panel} onClose={() => setPanel(null)} onApply={() => setPanel('enrollment')} />
    </main>
  )
}
