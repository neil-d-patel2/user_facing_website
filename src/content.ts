// Product context and planned capabilities are documented in docs/product-context.md.
export const siteContent = {
  brand: 'SafeSock',
  introduction:
    'SafeSock is building a clearer view of gait, weight-bearing, and recovery—connecting patients and clinicians beyond the clinic.',
  status: 'Gait. Weight-bearing. Recovery.',
  announcement: 'The next step in connected recovery',
  headline: ['See more.', 'Care better.'],
  cta: 'See how SafeSock works',
  footer: 'Better insight. More time for people.',
  developmentStatus: 'Connected care, in development',
  videoUrl:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4',
} as const

export const navigation = [
  { label: 'Home', id: 'home' },
  { label: 'Our approach', id: 'approach' },
  { label: 'For clinicians', id: 'clinicians' },
  { label: 'For patients', id: 'patients' },
  { label: 'Our roadmap', id: 'roadmap' },
  { label: 'Contact us', id: 'contact' },
] as const

export type PanelId = Exclude<(typeof navigation)[number]['id'], 'home'>

type PanelContent = {
  eyebrow: string
  title: string
  description: string
  details?: string[]
  note?: string
  action?: { label: string; target: PanelId }
}

// These explain the product direction; they do not simulate clinical services.
export const panels: Record<PanelId, PanelContent> = {
  approach: {
    eyebrow: 'The SafeSock approach',
    title: 'Recovery happens between visits.',
    description:
      'SafeSock’s concept connects a pressure-sensing wearable with a shared view of loading and recovery over time. We’re building on that foundation to bring patients and clinicians closer.',
    details: [
      'A sensor-embedded sleeve designed for a cast, boot, or brace.',
      'Pressure distribution and weight-bearing trends in one view.',
      'A planned care workflow connecting home check-ins with clinician review.',
    ],
    action: { label: 'Explore clinician tools', target: 'clinicians' },
  },
  clinicians: {
    eyebrow: 'Planned clinician tools',
    title: 'More context. More focused care.',
    description:
      'A workspace designed to help you understand how a patient is moving, prepare for visits, and follow progress between appointments.',
    details: [
      'Review gait recordings alongside weight-bearing trends and patient summaries.',
      'Connect through individual or clinician-led group video visits.',
      'Rotate a synchronized 3D movement model to explore estimated joint angles.',
    ],
    note: 'Joint loading is a separate modeling goal. Measured foot pressure and estimated joint forces will be clearly distinguished.',
    action: { label: 'See the care roadmap', target: 'roadmap' },
  },
  patients: {
    eyebrow: 'Planned patient experience',
    title: 'Less phone tag. More connection.',
    description:
      'We’re planning a simpler way to find your clinician, arrange visits, and stay connected to your care team from home.',
    details: [
      'Choose an available clinician and book a suitable appointment.',
      'Complete intake and device checks before your visit.',
      'Share movement check-ins and follow your clinician’s recovery plan.',
    ],
    note: 'Booking and remote care are planned capabilities. Your care team will guide which visits are appropriate.',
    action: { label: 'Explore the roadmap', target: 'roadmap' },
  },
  roadmap: {
    eyebrow: 'Our development roadmap',
    title: 'Make time for better care.',
    description:
      'Our priority is helping care teams spend less time coordinating and more time understanding their patients.',
    details: [
      'First: patient summaries, recorded check-ins, and a focused review queue.',
      'Next: self-service booking, reminders, intake, and individual video visits.',
      'Then: interactive 3D assessment, supervised group visits, and validated joint-loading estimates.',
    ],
    note: 'These are planned capabilities. This site introduces the vision while the clinical platform is in development.',
  },
  contact: {
    eyebrow: 'Connect with SafeSock',
    title: 'Help shape the next step.',
    description:
      'We’re building around the everyday needs of patients and care teams. Contact details and opportunities to participate in a pilot will be shared here when our intake is ready.',
    action: { label: 'Explore the roadmap', target: 'roadmap' },
  },
}
