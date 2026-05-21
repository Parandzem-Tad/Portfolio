import { useState } from 'react'
import { Button, Drawer, Layout, Menu, Switch, Typography } from 'antd'
import {
  MenuOutlined,
  MoonOutlined,
  RobotOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons'
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

const navMenuItems = navItems.map((item) => ({
  key: item.key,
  label: item.label,
}))

const SiteHeader = ({
  activeSection,
  onNavClick,
  onGeminiOpen,
  onAvatarOpen,
  isDark,
  onThemeToggle,
}: SiteHeaderProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleNavSelect = (key: string) => {
    onNavClick(key)
    setDrawerOpen(false)
  }

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
          <Button
            className="site-header-menu-btn"
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
          />

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
            <span className="site-header-btn-label site-header-btn-label--compact">
              Gemini
            </span>
          </Button>
          <Button
            type="default"
            icon={<UserOutlined />}
            onClick={onAvatarOpen}
            aria-label="Open AI avatar"
          >
            <span className="site-header-btn-label site-header-btn-label--compact">
              Avatar
            </span>
          </Button>
          <Button type="primary" href={profile.resumeHref} className="site-header-resume-btn">
            Resume
          </Button>
        </div>
      </div>

      <Drawer
        title="Navigation"
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="site-header-drawer"
        width={280}
      >
        <Menu
          mode="vertical"
          selectedKeys={[activeSection]}
          items={navMenuItems.map((item) => {
            const href = navItems.find((nav) => nav.key === item.key)?.href ?? '#'
            return {
              key: item.key,
              label: (
                <a href={href} onClick={() => handleNavSelect(item.key)}>
                  {item.label}
                </a>
              ),
            }
          })}
        />
      </Drawer>
    </Layout.Header>
  )
}

export default SiteHeader
