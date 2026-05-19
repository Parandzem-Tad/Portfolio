import { footerCopy, profile } from '../portfolioData'

export const FOOTER_LINKS = [
  { key: 'github', label: 'GitHub', href: profile.social.github },
  { key: 'linkedin', label: 'LinkedIn', href: profile.social.linkedin },
  { key: 'email', label: 'Email', href: profile.social.email },
] as const

export const FOOTER_COPYRIGHT = footerCopy.copyright
