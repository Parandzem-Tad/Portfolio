import { Button, Layout, Menu, Switch, Typography } from 'antd'
import { MoonOutlined, RobotOutlined, SunOutlined } from '@ant-design/icons'
import { navItems, profile } from '../portfolioData'
import './styles.css'

type SiteHeaderProps = {
  activeSection: string
  onNavClick: (key: string) => void
  onGeminiOpen: () => void
  onAvatarOpen: () => void
  isDark: boolean
  onThemeToggle: () => void
}

const SiteHeader = ({
  activeSection,
  onNavClick,
  onGeminiOpen,
  onAvatarOpen,
  isDark,
  onThemeToggle,
}: SiteHeaderProps) => {
  return (
    <Layout.Header className="site-header">
      <div className="site-header-inner">
        <Typography.Title level={4} className="site-header-brand">
          {profile.shortName}
        </Typography.Title>

        <Menu
          className="site-header-nav"
          mode="horizontal"
          selectedKeys={[activeSection]}
          items={navItems.map((item) => ({
            key: item.key,
            label: (
              <a href={item.href} onClick={() => onNavClick(item.key)}>
                {item.label}
              </a>
            ),
          }))}
        />

        <div className="site-header-actions">
          <Switch
            className="site-header-theme-switch"
            checked={isDark}
            onChange={onThemeToggle}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          />
          <Button
            type="text"
            icon={<RobotOutlined />}
            onClick={onGeminiOpen}
            aria-label="Open Gemini assistant"
          >
            Gemini
          </Button>
          <Button type="default" onClick={onAvatarOpen} aria-label="Open AI avatar">
            Avatar
          </Button>
          <Button type="primary" href={profile.resumeHref}>
            Resume
          </Button>
        </div>
      </div>
    </Layout.Header>
  )
}

export default SiteHeader
