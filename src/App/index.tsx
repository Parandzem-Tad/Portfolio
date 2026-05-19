import { useEffect, useState } from 'react'
import { ConfigProvider, Layout } from 'antd'
import AiAvatar from '../AiAvatar'
import AboutSection from '../AboutSection'
import ContactSection from '../ContactSection'
import GeminiChat from '../GeminiChat'
import HeroSection from '../HeroSection'
import ProjectsSection from '../ProjectsSection'
import SiteFooter from '../SiteFooter'
import SiteHeader from '../SiteHeader'
import TechStackSection from '../TechStackSection'
import { getPortfolioTheme } from '../theme/consts'
import { useThemeMode } from '../theme/useThemeMode'
import { navItems } from '../portfolioData'
import './styles.css'

const sectionIds = navItems.map((item) => item.key)

const App = () => {
  const { isDark, toggleTheme } = useThemeMode()
  const [activeSection, setActiveSection] = useState(sectionIds[0])
  const [isGeminiOpen, setIsGeminiOpen] = useState(false)
  const [isAvatarOpen, setIsAvatarOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const topEntry = visible[0]
        if (topEntry?.target.id) {
          setActiveSection(topEntry.target.id)
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.2, 0.45, 0.7] },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <ConfigProvider theme={getPortfolioTheme(isDark)}>
      <Layout className="app-layout">
        <SiteHeader
          activeSection={activeSection}
          onNavClick={setActiveSection}
          onGeminiOpen={() => setIsGeminiOpen(true)}
          onAvatarOpen={() => setIsAvatarOpen(true)}
          isDark={isDark}
          onThemeToggle={toggleTheme}
        />

        <Layout.Content className="app-content">
          <main>
            <HeroSection />
            <TechStackSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
          </main>
        </Layout.Content>

        <SiteFooter />

        <GeminiChat open={isGeminiOpen} onClose={() => setIsGeminiOpen(false)} />
        <AiAvatar open={isAvatarOpen} onClose={() => setIsAvatarOpen(false)} />
      </Layout>
    </ConfigProvider>
  )
}

export default App
