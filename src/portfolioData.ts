export type Project = {
  title: string
  description: string
  stack: string[]
  github?: string
  live?: string
}

export const profile = {
  name: 'Your Name',
  role: 'Frontend Developer',
  tagline: 'I build modern, accessible, and user-friendly web experiences.',
  location: 'Your City',
  email: 'you@example.com',
  about:
    'I am a frontend developer focused on React, TypeScript, and design systems. I enjoy turning ideas into polished products with clean UI and good UX.',
  skills: ['React', 'TypeScript', 'Ant Design', 'Vite', 'JavaScript', 'HTML', 'CSS', 'REST APIs', 'Git'],
  social: {
    github: 'https://github.com/your-username',
    linkedin: 'https://linkedin.com/in/your-linkedin',
  },
}

export const projects: Project[] = [
  {
    title: 'E-commerce Dashboard',
    description: 'Admin dashboard with analytics, product management, and order tracking.',
    stack: ['React', 'TypeScript', 'Ant Design', 'Chart.js'],
    github: 'https://github.com/your-username/project-1',
    live: 'https://your-project-1.vercel.app',
  },
  {
    title: 'Task Management App',
    description: 'Kanban-style productivity app with drag-and-drop and team collaboration features.',
    stack: ['React', 'TypeScript', 'Vite', 'Ant Design'],
    github: 'https://github.com/your-username/project-2',
  },
  {
    title: 'Personal Blog UI',
    description: 'Responsive blog frontend focused on readability and clean typography.',
    stack: ['React', 'TypeScript', 'CSS'],
    live: 'https://your-blog-ui.vercel.app',
  },
]
