'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import '@fontsource/montserrat/800.css'

const LINES = [
  { text: 'ENOMETA', delay: 0.3 },
  { text: 'SHOPPING MALL', delay: 0.9 },
  { text: 'PORTFOLIO', delay: 1.5 },
]

const CARD_IMAGES = [
  { src: '/images/products/01_main.png', color: 'from-stone-200 to-stone-300' },
  { src: '/images/products/04_main.png', color: 'from-neutral-300 to-neutral-400' },
  { src: '/images/products/06_main.png', color: 'from-stone-300 to-stone-400' },
  { src: '/images/products/03_main.png', color: 'from-zinc-200 to-zinc-300' },
  { src: '/images/products/05_main.png', color: 'from-neutral-200 to-neutral-300' },
]

export default function IntroPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'loading'>('intro')
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

  const handleEnter = () => {
    setPhase('loading')
    router.push('/shop')
  }

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {phase === 'intro' ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
          >
            {/* Main Title — Mask Reveal */}
            <div className="text-center mb-16 select-none cursor-default">
              {LINES.map((line, i) => (
                <MaskRevealLine
                  key={i}
                  text={line.text}
                  delay={line.delay}
                  isFirst={i === 0}
                />
              ))}
            </div>

            {/* Divider Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[60px] h-[1px] bg-body/30 origin-center mb-12"
            />

            {/* Image Cards — Stagger Fade Up */}
            <div className="flex gap-2 md:gap-5 mb-14 justify-center [&_*]:!cursor-default">
              {CARD_IMAGES.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 2.4 + i * 0.12,
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="group w-[60px] h-[84px] sm:w-[80px] sm:h-[112px] md:w-[120px] md:h-[168px] overflow-hidden relative"
                  style={{ cursor: 'default' }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} group-hover:scale-[1.03] transition-transform duration-500`} style={{ cursor: 'default' }} />
                  {!failedImages.has(i) && (
                    <Image
                      src={card.src}
                      alt={`Enometa collection ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, 120px"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      style={{ cursor: 'default' }}
                      onError={() => setFailedImages((prev) => new Set(prev).add(i))}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Enter Button — Fade In */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.6 }}
              onClick={handleEnter}
              className="relative text-[11px] tracking-[3px] uppercase text-body/70 hover:text-body transition-colors duration-500 pb-[2px]"
            >
              ENTER SHOP
              <span className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-current" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="min-h-screen flex flex-col items-center justify-center gap-6"
          >
            <p
              className="text-[14px] tracking-[0.3em] uppercase text-body/30"
              style={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 800 }}
            >
              ENOMETA
            </p>
            <div className="w-16 h-[1px] bg-body/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 w-full bg-body/40 rounded-full"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Mask Reveal Line ─── */

function MaskRevealLine({
  text,
  delay,
  isFirst,
}: {
  text: string
  delay: number
  isFirst: boolean
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{
          delay,
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <h1
          className={`
            uppercase tracking-[0.15em] text-dark leading-[1.1]
            ${isFirst
              ? 'text-[48px] md:text-[72px] lg:text-[88px] tracking-[0.12em]'
              : 'text-[14px] md:text-[16px] tracking-[0.3em] text-body/60 mt-2'
            }
          `}
          style={{
            fontFamily: isFirst ? '"Montserrat", sans-serif' : '"Pretendard", sans-serif',
            fontWeight: isFirst ? 800 : 300,
          }}
        >
          {text}
        </h1>
      </motion.div>
    </div>
  )
}
