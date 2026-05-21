import { ArrowRightOutlined, GithubOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Tag, Typography } from 'antd'
import { projectItems } from '../portfolioData'
import {
  PROJECTS_LABEL,
  PROJECTS_SECTION_ID,
  PROJECTS_SUBTITLE,
  PROJECTS_TITLE,
} from './consts'
import './styles.css'

const { Meta } = Card

const ProjectsSection = () => {
  return (
    <section className="projects-section" id={PROJECTS_SECTION_ID}>
      <Typography.Text className="projects-section-label">{PROJECTS_LABEL}</Typography.Text>
      <Typography.Title level={2} className="projects-section-title">
        {PROJECTS_TITLE}
      </Typography.Title>
      <Typography.Paragraph className="projects-section-subtitle" type="secondary">
        {PROJECTS_SUBTITLE}
      </Typography.Paragraph>

      <Row className="projects-grid" gutter={[24, 24]}>
        {projectItems.map((project) => (
          <Col key={project.key} xs={24} md={12}>
            <Card
              className="project-card"
              bordered={false}
              cover={
                <img
                  className="project-card-cover"
                  src={project.image}
                  alt={project.title}
                />
              }
            >
              <Meta title={project.title} description={project.description} />
              <div className="project-card-tags">
                {project.tags.map((tag) => (
                  <Tag key={tag} color="purple">
                    {tag}
                  </Tag>
                ))}
              </div>
              <Button
                className="project-card-link"
                type="link"
                href={project.github}
                target="_blank"
                rel="noreferrer"
                icon={<GithubOutlined />}
              >
                View on GitHub <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default ProjectsSection
