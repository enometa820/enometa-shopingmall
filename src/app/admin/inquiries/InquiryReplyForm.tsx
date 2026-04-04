'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminReplyInquiry } from '@/actions/admin'

export default function InquiryReplyForm({ inquiryId }: { inquiryId: string }) {
  const router = useRouter()
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim()) return
    setLoading(true)

    await adminReplyInquiry(inquiryId, reply)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="답변을 입력하세요..."
        className="flex-1 text-xs py-2 px-3 border border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
      />
      <button
        type="submit"
        disabled={loading || !reply.trim()}
        className="px-4 py-2 bg-dark text-white text-xs uppercase tracking-wide hover:bg-accent transition-colors disabled:opacity-50"
      >
        {loading ? '...' : '답변'}
      </button>
    </form>
  )
}
