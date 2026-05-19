import { cvData } from './cvData'

export type NavItem = {
  key: string
  label: string
  href: string
}

export type StackIconKey = 'html' | 'css' | 'js' | 'react' | 'git' | 'api'

export type StackItem = {
  key: string
  title: string
  description: string
  iconKey: StackIconKey
  iconClass: string
}

export type ProjectItem = {
  key: string
  title: string
  description: string
  image: string
  tags: string[]
  github?: string
  live?: string
}

const { social } = cvData.personalInfo

export const profile = {
  shortName: 'Parandzem T.',
  fullName: cvData.personalInfo.fullName,
  role: 'Junior Frontend Developer',
  roleBadge: 'JUNIOR FRONTEND DEVELOPER',
  location: cvData.personalInfo.location,
  email: 'tadevosyan.parandzem@mail.ru',
  portraitSrc: '/mine.png',
  heroTitle: ['Parandzem', 'Tadevosyan'] as const,
  heroText:
    'Hello! I\'m a Frontend Developer focused on building clean, accessible, and modern web experiences. I love creating beautiful and functional websites and web applications.',
  aboutSummary: cvData.personalInfo.heroSummary,
  resumeHref: '#',
  social: {
    github: social.github,
    linkedin: social.linkedin,
    email: 'mailto:tadevosyan.parandzem@mail.ru',
    portfolioRepo: social.portfolioRepo,
  },
}

export const navItems: NavItem[] = [
  { key: 'work', label: 'Home', href: '#work' },
  { key: 'stack', label: 'Tech Stack', href: '#stack' },
  { key: 'about', label: 'About', href: '#about' },
  { key: 'projects', label: 'Projects', href: '#projects' },
  { key: 'contact', label: 'Contact', href: '#contact' },
]

export const stackItems: StackItem[] = [
  {
    key: 'html',
    title: 'HTML5',
    description:
      'Semantic structures and SEO-best practices for a robust web foundation.',
    iconKey: 'html',
    iconClass: 'stack-icon-html',
  },
  {
    key: 'css',
    title: 'CSS3 & Tailwind',
    description:
      'Advanced layouts, responsive design, and pixel-perfect modern styling.',
    iconKey: 'css',
    iconClass: 'stack-icon-css',
  },
  {
    key: 'js',
    title: 'JavaScript',
    description:
      'ES6+ DOM manipulation and building interactive client-side logic.',
    iconKey: 'js',
    iconClass: 'stack-icon-js',
  },
  {
    key: 'react',
    title: 'React & TypeScript',
    description:
      'Component-driven UIs with strict typing and maintainable architecture.',
    iconKey: 'react',
    iconClass: 'stack-icon-react',
  },
  {
    key: 'git',
    title: 'Git & GitHub',
    description:
      'Version control, branching workflows, and collaborative development.',
    iconKey: 'git',
    iconClass: 'stack-icon-git',
  },
  {
    key: 'api',
    title: 'REST & AI APIs',
    description:
      'Integrating backend services and AI providers into polished interfaces.',
    iconKey: 'api',
    iconClass: 'stack-icon-api',
  },
]

export const projectItems: ProjectItem[] = [
  {
    key: 'nova-saas',
    title: 'Nova SaaS Interface',
    description:
      'A high-performance dashboard built with a focus on user experience and real-time data visualization.',
    image: '/project-saas.png',
    tags: ['React', 'TypeScript', 'Ant Design'],
    github: social.portfolioRepo,
  },
  {
    key: 'portfolio',
    title: cvData.projects[1]?.name ?? 'Personal Portfolio Website',
    description: cvData.projects[1]?.description ?? '',
    image: '/portfolio.png',
    tags: cvData.projects[1]?.technologies ?? ['React', 'Vite', 'TypeScript'],
    github: social.portfolioRepo,
  },
  {
    key: 'ai-chat',
    title: cvData.projects[0]?.name ?? 'AI Chat Interface',
    description: cvData.projects[0]?.description ?? '',
    image: '/portfolio.png',
    tags: cvData.projects[0]?.technologies ?? ['React', 'Axios', 'Gemini API'],
    github: social.portfolioRepo,
  },
]

export const contactCopy = {
  label: 'GET IN TOUCH',
  title: "Let's create something extraordinary together",
  description:
    "I'm currently looking for new opportunities and collaborations. Whether you have a project in mind or just want to say hi, my inbox is always open.",
}

export const footerCopy = {
  copyright: `© ${new Date().getFullYear()} Designed & Coded by Parandzem T.`,
}
