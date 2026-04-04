'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIES = [
  { name: 'TOP', href: '/shop?category=top' },
  { name: 'OUTER', href: '/shop?category=outer' },
  { name: 'BOTTOM', href: '/shop?category=bottom' },
  { name: 'SHOES', href: '/shop?category=shoes' },
  { name: 'ACC', href: '/shop?category=acc' },
  { name: 'LOOKBOOK', href: '/lookbook' },
]

const LINKS = [
  { name: 'LOG IN', href: '/auth/login' },
  { name: 'CART', href: '#cart' },
  { name: 'MY PAGE', href: '/mypage' },
]

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: Props) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 bg-black/30 z-[60]"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 bottom-0 w-[320px] max-w-[80vw] bg-white z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 h-[var(--header-height)]">
              <span className="text-sm tracking-[2px] uppercase font-normal text-dark">
                ENOMETA
              </span>
              <button
                onClick={onClose}
                className="text-body hover:opacity-60 transition-opacity duration-300 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Categories */}
            <nav className="flex-1 px-8 pt-8">
              <ul className="space-y-6">
                {CATEGORIES.map((cat) => (
                  <li key={cat.name}>
                    <Link
                      href={cat.href}
                      onClick={onClose}
                      className="text-xs tracking-[1.25px] uppercase font-normal text-body hover:text-dark transition-colors duration-300"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="my-8 border-t border-border" />

              {/* Links */}
              <ul className="space-y-6">
                {LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="text-xs tracking-[1.25px] uppercase font-normal text-sub hover:text-body transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
