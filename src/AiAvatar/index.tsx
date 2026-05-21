import { useState } from 'react'
import axios from 'axios'
import { Button, Modal, Spin, Typography } from 'antd'
import {
  AVATAR_MODAL_TITLE,
  AVATAR_POLL_INTERVAL_MS,
  AVATAR_SCRIPT,
  AVATAR_SOURCE_URL,
  AVATAR_VOICE_ID,
  DID_TALKS_URL,
} from './consts'
import './styles.css'

type TalkCreateResponse = {
  id: string
}

type TalkStatusResponse = {
  status: string
  result_url?: string
}

type AiAvatarProps = {
  open: boolean
  onClose: () => void
}

const AiAvatar = ({ open, onClose }: AiAvatarProps) => {
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const apiKey = import.meta.env.VITE_DID_API_KEY

  const generateVideo = async () => {
    setLoading(true)
    setVideoUrl('')

    try {
      const createRes = await axios.post<TalkCreateResponse>(
        DID_TALKS_URL,
        {
          script: {
            type: 'text',
            input: AVATAR_SCRIPT,
            provider: { type: 'microsoft', voice_id: AVATAR_VOICE_ID },
          },
          source_url: AVATAR_SOURCE_URL,
        },
        {
          headers: {
            Authorization: `Basic ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const talkId = createRes.data.id

      const checkStatus = window.setInterval(async () => {
        const statusRes = await axios.get<TalkStatusResponse>(`${DID_TALKS_URL}/${talkId}`, {
          headers: { Authorization: `Basic ${apiKey}` },
        })

        if (statusRes.data.status === 'done' && statusRes.data.result_url) {
          setVideoUrl(statusRes.data.result_url)
          setLoading(false)
          window.clearInterval(checkStatus)
        }
      }, AVATAR_POLL_INTERVAL_MS)
    } catch (error: unknown) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <Modal
      title={AVATAR_MODAL_TITLE}
      open={open}
      onCancel={onClose}
      footer={null}
      width={520}
      className="responsive-modal"
      styles={{ body: { maxHeight: 'min(75vh, 560px)', overflowY: 'auto' } }}
    >
      <div className="ai-avatar-panel">
        <Typography.Paragraph type="secondary">
          Generate a short speaking avatar clip powered by D-ID.
        </Typography.Paragraph>
        <Button type="primary" onClick={generateVideo} disabled={loading} loading={loading}>
          {loading ? 'Generating...' : 'Create video'}
        </Button>

        {loading ? <Spin className="ai-avatar-video-wrap" /> : null}

        {videoUrl ? (
          <div className="ai-avatar-video-wrap">
            <video className="ai-avatar-video" src={videoUrl} controls autoPlay />
          </div>
        ) : null}
      </div>
    </Modal>
  )
}

export default AiAvatar
