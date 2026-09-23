import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { panels, type PanelId } from '../content'

type InfoDialogProps = {
  panel: PanelId | null
  onClose: () => void
  onNavigate: (panel: PanelId) => void
}

export default function InfoDialog({ panel, onClose, onNavigate }: InfoDialogProps) {
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
      className="info-dialog fixed m-auto max-h-[calc(100svh_-_2rem)] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-3xl border border-white/15 bg-[#090c12] p-0 text-white shadow-2xl"
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
          <h2 id="dialog-title" className="mb-5 text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl">{content.title}</h2>
          <p id="dialog-description" className="text-sm leading-6 text-white/80">{content.description}</p>
          {content.details && (
            <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
              {content.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3 text-sm leading-6 text-white/80">
                  <span className="mt-2.5 size-1 shrink-0 rounded-full bg-[#64CEFB]" aria-hidden="true" />
                  {detail}
                </li>
              ))}
            </ul>
          )}
          {content.note && <p className="mt-5 text-xs leading-5 text-white/80">{content.note}</p>}
          {content.action ? (
            <button type="button" onClick={() => onNavigate(content.action!.target)} className="group mt-7 inline-flex items-center gap-4 rounded-full bg-white px-5 py-3 text-sm text-black transition-colors hover:bg-sky-100">
              {content.action.label} <ArrowUpRight size={17} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          ) : (
            <button type="button" onClick={onClose} className="mt-7 rounded-full border border-white/20 px-6 py-3 text-sm transition-colors hover:bg-white/10">Back to home</button>
          )}
        </div>
      )}
    </dialog>
  )
}
