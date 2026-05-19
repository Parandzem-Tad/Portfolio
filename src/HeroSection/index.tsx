import { Button, Col, Image, Row, Tag, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { profile } from '../portfolioData'
import { HERO_SECTION_ID } from './consts'
import './styles.css'

const HeroSection = () => {
  return (
    <section className="hero-section" id={HERO_SECTION_ID}>
      <Row gutter={[48, 40]} align="middle">
        <Col xs={24} lg={13}>
          <Tag className="hero-role-tag" color="purple">
            {profile.roleBadge}
          </Tag>
          <Typography.Title level={1} className="hero-title">
            {profile.heroTitle[0]}
            <br />
            {profile.heroTitle[1]}
          </Typography.Title>
          <Typography.Paragraph className="hero-description">
            {profile.heroText}
          </Typography.Paragraph>
          <div className="hero-actions">
            <Button type="primary" size="large" href="#projects">
              View My Work
            </Button>
            <Button type="link" size="large" href="#contact" icon={<ArrowRightOutlined />}>
              Let&apos;s Talk
            </Button>
          </div>
        </Col>
        <Col xs={24} lg={11}>
          <div className="hero-portrait-wrap">
            <Image
              className="hero-portrait"
              src={profile.portraitSrc}
              alt={`Portrait of ${profile.fullName}`}
              preview={false}
            />
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default HeroSection
