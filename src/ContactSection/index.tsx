import { EnvironmentOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Typography, message } from 'antd'
import { contactCopy, profile } from '../portfolioData'
import { CONTACT_SECTION_ID } from './consts'
import { sendContactMessage, type ContactMessagePayload} from '../EmailJs'
import { useState } from 'react'
import './styles.css'


const ContactSection = () => {
  const [form] = Form.useForm<ContactMessagePayload>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ContactMessagePayload) => {
    setLoading(true);
    try {
      await sendContactMessage(values);
      message.success('Message sent successfully');
      form.resetFields()
    } catch (error) {
      message.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id={CONTACT_SECTION_ID}>
      <Card className="contact-card" bordered={false} variant="borderless">
        <Row gutter={[40, 32]}>
          <Col xs={24} lg={12}>
            <Typography.Text className="contact-section-label">
              {contactCopy.label}
            </Typography.Text>
            <Typography.Title level={2} className="contact-section-title">
              {contactCopy.title}
            </Typography.Title>
            <Typography.Paragraph className="contact-section-copy" type="secondary">
              {contactCopy.description}
            </Typography.Paragraph>

            <Typography.Paragraph className="contact-meta-item">
              <MailOutlined /> {profile.email}
            </Typography.Paragraph>
            <Typography.Paragraph className="contact-meta-item">
              <EnvironmentOutlined /> Remote / {profile.location}
            </Typography.Paragraph>
          </Col>

          <Col xs={24} lg={12}>
            <div className="contact-form-panel">
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="FULL NAME"
                  name="fullName"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input placeholder="Your Name" />
                </Form.Item>
                <Form.Item
                  label="EMAIL ADDRESS"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input placeholder="name@example.com" />
                </Form.Item>
                <Form.Item
                  label="MESSAGE"
                  name="message"
                  rules={[{ required: true, message: 'Please enter a message' }]}
                >
                  <Input.TextArea rows={5} placeholder="Tell me about your project..." />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </section>
  )
}

export default ContactSection
