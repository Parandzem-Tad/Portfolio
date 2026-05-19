import {
  ApiOutlined,
  CodeOutlined,
  GithubOutlined,
  Html5Outlined,
  JavaScriptOutlined,
  AntDesignOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import type { StackIconKey } from '../portfolioData'
import { stackItems } from '../portfolioData'
import {
  STACK_SECTION_ID,
  STACK_SECTION_LABEL,
  STACK_SECTION_TITLE,
} from './consts'
import './styles.css'

const stackIconMap: Record<StackIconKey, React.ReactNode> = {
  html: <Html5Outlined />,
  css: <CodeOutlined />,
  js: <JavaScriptOutlined />,
  react: <AntDesignOutlined />,
  git: <GithubOutlined />,
  api: <ApiOutlined />,
}

const TechStackSection = () => {
  return (
    <section className="stack-section" id={STACK_SECTION_ID}>
      <Typography.Text className="stack-section-label">{STACK_SECTION_LABEL}</Typography.Text>
      <Typography.Title level={2} className="stack-section-title">
        {STACK_SECTION_TITLE}
      </Typography.Title>

      <Row gutter={[18, 18]}>
        {stackItems.map((item) => (
          <Col key={item.key} xs={24} sm={12} lg={8}>
            <Card className="stack-card" bordered={false}>
              <span className={`stack-card-icon ${item.iconClass}`}>
                {stackIconMap[item.iconKey]}
              </span>
              <Typography.Title level={4}>{item.title}</Typography.Title>
              <Typography.Paragraph type="secondary">{item.description}</Typography.Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default TechStackSection
