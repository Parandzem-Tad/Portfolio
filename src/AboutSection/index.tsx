import { BookOutlined, BulbOutlined } from '@ant-design/icons'
import { Card, Col, Row, Tag, Typography } from 'antd'
import { cvData } from '../cvData'
import { profile } from '../portfolioData'
import { ABOUT_LABEL, ABOUT_SECTION_ID, ABOUT_TITLE } from './consts'
import './styles.css'

const AboutSection = () => {
  return (
    <section className="about-section" id={ABOUT_SECTION_ID}>
      <Typography.Text className="about-section-label">{ABOUT_LABEL}</Typography.Text>
      <Typography.Title level={2} className="about-section-title">
        {ABOUT_TITLE}
      </Typography.Title>
      <Typography.Paragraph className="about-summary">
        {profile.aboutSummary}
      </Typography.Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card className="about-card" bordered={false}>
            <Typography.Title level={4} className="about-card-title">
              <BookOutlined /> Education
            </Typography.Title>
            {cvData.education.map((item) => (
              <div
                key={`${item.institution}-${item.degree}`}
                className="about-education-item"
              >
                <Typography.Text strong className="about-education-degree">
                  {item.degree}
                </Typography.Text>
                <br />
                <Typography.Text type="secondary">{item.institution}</Typography.Text>
              </div>
            ))}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="about-card" bordered={false}>
            <Typography.Title level={4} className="about-card-title">
              <BulbOutlined /> Skills
            </Typography.Title>
            <div className="about-skill-group">
              <Typography.Text className="about-skill-label">TECHNICAL</Typography.Text>
              {cvData.skills.technical.map((skill) => (
                <Tag key={skill} color="purple">
                  {skill}
                </Tag>
              ))}
            </div>
            <div className="about-skill-group">
              <Typography.Text className="about-skill-label">SOFT SKILLS</Typography.Text>
              {cvData.skills.soft.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  )
}

export default AboutSection
