'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createInquiry } from '@/actions/inquiries'

export default function FloatingInquiry() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const result = await createInquiry(formData)
    if (result.error) return

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setIsOpen(false)
      form.reset()
    }, 2000)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-20 z-40 w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center text-xs hover:bg-accent transition-colors duration-300"
        aria-label="문의하기"
      >
        ?
      </button>

      {/* Inquiry Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-8 z-50 w-[320px] bg-white border border-border shadow-lg"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="text-xs uppercase tracking-[1.25px]">문의하기</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sub hover:text-body text-sm"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="px-5 py-8 text-center text-xs text-sub">
                문의가 접수되었습니다. 감사합니다.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">
                <input
                  name="name"
                  required
                  placeholder="이름"
                  className="w-full text-xs py-2 border-b border-border outline-none focus:border-body transition-colors placeholder:text-muted"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="이메일"
                  className="w-full text-xs py-2 border-b border-border outline-none focus:border-body transition-colors placeholder:text-muted"
                />
                <select
                  name="category"
                  defaultValue="general"
                  className="w-full text-xs py-2 border-b border-border outline-none bg-transparent text-body"
                >
                  <option value="product">상품 문의</option>
                  <option value="shipping">배송 문의</option>
                  <option value="general">기타 문의</option>
                </select>
                <textarea
                  name="content"
                  required
                  rows={3}
                  placeholder="내용을 입력해주세요"
                  className="w-full text-xs py-2 border-b border-border outline-none resize-none focus:border-body transition-colors placeholder:text-muted"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-dark text-white text-xs uppercase tracking-[1.25px] hover:bg-accent transition-colors duration-300"
                >
                  보내기
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
