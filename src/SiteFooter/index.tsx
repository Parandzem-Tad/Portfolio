import { Layout, Typography } from 'antd'
import { profile } from '../portfolioData'
import { FOOTER_COPYRIGHT, FOOTER_LINKS } from './consts'
import './styles.css'

const SiteFooter = () => {
  return (
    <Layout.Footer className="site-footer">
      <div className="site-footer-inner">
        <Typography.Title level={4} className="site-footer-brand">
          {profile.shortName}
        </Typography.Title>

        <nav className="site-footer-links" aria-label="Social links">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.key}
              className="site-footer-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Typography.Text className="site-footer-copy">{FOOTER_COPYRIGHT}</Typography.Text>
      </div>
    </Layout.Footer>
  )
}

export default SiteFooter
