// The requested DesignPro copy is kept here as editable placeholder content.
export const siteContent = {
  brand: 'SafeSock',
  introduction:
    'We deliver transformative programs that empower emerging product designers with cutting-edge expertise and vision to thrive globally.',
  announcement: 'Seats for Next Program Opening Soon',
  headline: ['Become', 'Product Leader.'],
  cta: 'Apply for Next Enrollment',
  videoUrl:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4',
} as const

export const navigation = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { label: 'Courses', id: 'courses' },
  { label: 'Instructors', id: 'instructors' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact us', id: 'contact' },
] as const

export type PanelId = Exclude<(typeof navigation)[number]['id'], 'home'> | 'enrollment'

// Landing-page previews until the full site and application flow are ready.
export const panels: Record<PanelId, { eyebrow: string; title: string; description: string }> = {
  about: {
    eyebrow: 'About us',
    title: 'A new perspective starts here.',
    description: siteContent.introduction,
  },
  courses: {
    eyebrow: 'Our programs',
    title: 'Make your next move.',
    description:
      'Our next product design program is on the way. The curriculum, program dates, and enrollment details will be shared here soon.',
  },
  instructors: {
    eyebrow: 'Meet your mentors',
    title: 'Learn from a fresh perspective.',
    description:
      'Get to know the people behind the program. Instructor profiles and their areas of expertise are coming soon.',
  },
  testimonials: {
    eyebrow: 'Our community',
    title: 'Every designer has a story.',
    description:
      'This will be a space for the experiences, work, and journeys of our design community. Stories are coming soon.',
  },
  blog: {
    eyebrow: 'The journal',
    title: 'Stay curious.',
    description:
      'Ideas, perspectives, and a closer look at the world of product design. Our first articles are coming soon.',
  },
  contact: {
    eyebrow: 'Contact us',
    title: 'Good things begin with a conversation.',
    description:
      'Our contact channels are being set up. You’ll find the details here when the next program is announced.',
  },
  enrollment: {
    eyebrow: 'Next enrollment',
    title: 'Your next chapter is coming.',
    description:
      'Seats for our next program will open soon. Application dates and the full program details will be announced here. Come back soon to take the next step.',
  },
}
