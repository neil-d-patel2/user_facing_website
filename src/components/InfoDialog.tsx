import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { panels, type PanelId } from '../content'

type InfoDialogProps = {
  panel: PanelId | null
  onClose: () => void
  onApply: () => void
}

export default function InfoDialog({ panel, onClose, onApply }: InfoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !panel) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [panel])

  const content = panel ? panels[panel] : null

  return (
    <dialog
      ref={dialogRef}
      className="info-dialog fixed m-auto w-[calc(100%_-_2rem)] max-w-lg rounded-3xl border border-white/15 bg-[#090c12] p-0 text-white shadow-2xl"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect()
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
        }
      }}
    >
      {content && (
        <div className="relative overflow-hidden p-8 pt-14 sm:p-12 sm:pt-16">
          <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-sky-400/10 blur-3xl" aria-hidden="true" />
          <button type="button" onClick={onClose} aria-label="Close dialog" className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            <X size={20} aria-hidden="true" />
          </button>
          <span className="mb-7 inline-block text-[10px] uppercase tracking-[0.18em] text-[#64CEFB]">{content.eyebrow}</span>
          <h2 id="dialog-title" className="mb-5 text-4xl font-medium leading-[1.08] tracking-tight">{content.title}</h2>
          <p id="dialog-description" className="text-sm leading-7 text-white/80">{content.description}</p>
          {panel === 'enrollment' || panel === 'contact' ? (
            <button type="button" onClick={onClose} className="mt-9 rounded-full border border-white/20 px-6 py-3 text-sm transition-colors hover:bg-white/10">Back to home</button>
          ) : (
            <button type="button" onClick={onApply} className="group mt-9 inline-flex items-center gap-6 rounded-full bg-white px-6 py-3 text-sm text-black transition-colors hover:bg-sky-100">
              Explore the next program <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </dialog>
  )
}
