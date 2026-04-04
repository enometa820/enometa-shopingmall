'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const lookbookData = {
  hero1: {
    src: '/images/lookbook/wide_01.png',
    alt: 'Enometa Lookbook Hero',
  },
  hero2: {
    src: '/images/lookbook/wide_02.png',
    alt: 'Enometa Lookbook Mood',
  },
  grid2: [
    {
      src: '/images/lookbook/codi_01.png',
      alt: 'Wrinkle Knit Top Styling',
      productSlug: '',
    },
    {
      src: '/images/lookbook/codi_02.png',
      alt: 'Satin Easy Pants Styling',
      productSlug: '',
    },
  ],
  grid3: [
    {
      src: '/images/products/05_main.png',
      alt: 'Trench Coat Look',
      productSlug: '',
    },
    {
      src: '/images/products/07_main.png',
      alt: 'Midi Skirt Look',
      productSlug: '',
    },
    {
      src: '/images/products/08_main.png',
      alt: 'Wide Trousers Look',
      productSlug: '',
    },
  ],
}

function FadeInSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function LookbookImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
      />
    </div>
  )
}

export default function LookbookPage() {
  return (
    <div>
      {/* Title */}
      <FadeInSection className="px-5 md:px-10 pt-16 pb-10 md:pt-24 md:pb-14">
        <h1 className="text-xs tracking-[3px] uppercase text-sub text-center">
          Lookbook — SS 2026
        </h1>
      </FadeInSection>

      {/* Hero 1 — Full Width */}
      <FadeInSection>
        <img
          src={lookbookData.hero1.src}
          alt={lookbookData.hero1.alt}
          className="w-full h-auto"
        />
      </FadeInSection>

      {/* Spacing */}
      <div className="h-16 md:h-24" />

      {/* 2 Column Grid */}
      <FadeInSection className="px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {lookbookData.grid2.map((item, i) => (
            <div key={i} className="aspect-[2/3]">
              {item.productSlug ? (
                <Link href={`/product/${item.productSlug}`}>
                  <LookbookImage src={item.src} alt={item.alt} className="w-full h-full" />
                </Link>
              ) : (
                <LookbookImage src={item.src} alt={item.alt} className="w-full h-full" />
              )}
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Brand Text */}
      <FadeInSection className="py-20 md:py-28 text-center px-5">
        <p className="text-sm tracking-[4px] uppercase text-sub">
          Quiet Elegance, Effortless Movement
        </p>
      </FadeInSection>

      {/* Hero 2 — Full Width Mood */}
      <FadeInSection>
        <img
          src={lookbookData.hero2.src}
          alt={lookbookData.hero2.alt}
          className="w-full h-auto"
        />
      </FadeInSection>

      {/* Spacing */}
      <div className="h-16 md:h-24" />

      {/* 3 Column Grid */}
      <FadeInSection className="px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {lookbookData.grid3.map((item, i) => (
            <div key={i} className="aspect-[2/3]">
              {item.productSlug ? (
                <Link href={`/product/${item.productSlug}`}>
                  <LookbookImage src={item.src} alt={item.alt} className="w-full h-full" />
                </Link>
              ) : (
                <LookbookImage src={item.src} alt={item.alt} className="w-full h-full" />
              )}
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Bottom CTA */}
      <FadeInSection className="py-20 md:py-28 text-center">
        <Link
          href="/shop"
          className="inline-block text-sm tracking-[2px] uppercase text-body border-b border-body pb-1 hover:opacity-60 transition-opacity duration-300"
        >
          Shop All
        </Link>
      </FadeInSection>
    </div>
  )
}
