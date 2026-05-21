import { useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { Button, Input, Modal, Typography } from 'antd'
import { cvData } from '../cvData'
import {
  GEMINI_EMPTY_RESPONSE,
  GEMINI_ERROR_MESSAGE,
  GEMINI_MODEL_PATH,
  GEMINI_MODAL_TITLE,
  GEMINI_PLACEHOLDER,
  GEMINI_THINKING_MESSAGE,
} from './consts'
import './styles.css'

type GeminiChatProps = {
  open: boolean
  onClose: () => void
}

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>
    }
  }>
}

const GeminiChat = ({ open, onClose }: GeminiChatProps) => {
  const [userInput, setUserInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true)
    setResponse(GEMINI_THINKING_MESSAGE)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    const url = `${GEMINI_MODEL_PATH}?key=${apiKey}`
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Context:${JSON.stringify(cvData)}. User question:${userInput}. Answer based on the context.`,
            },
          ],
        },
      ],
    }

    try {
      const res = await axios.post<GeminiResponse>(url, payload);
      const geminiText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text
      setResponse(geminiText ?? GEMINI_EMPTY_RESPONSE)
    } catch (error: unknown) {
      setResponse(GEMINI_ERROR_MESSAGE)
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Modal
      title={GEMINI_MODAL_TITLE}
      open={open}
      onCancel={handleClose}
      footer={null}
      width={640}
      destroyOnHidden
      className="responsive-modal"
      styles={{ body: { maxHeight: 'min(70vh, 520px)', overflowY: 'auto' } }}
    >
      <Input.TextArea
        rows={4}
        placeholder={GEMINI_PLACEHOLDER}
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
      />
      <Button
        className="gemini-send-btn"
        type="primary"
        onClick={handleSend}
        disabled={loading || !userInput.trim()}
        loading={loading}
        block
      >
        Send answer
      </Button>

      {response ? (
        <div className="gemini-response">
          <Typography.Text className="gemini-response-label">Answer</Typography.Text>
          <div className="gemini-response-text">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}

export default GeminiChat
