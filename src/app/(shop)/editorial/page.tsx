'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

// b컷 이미지 매핑 (한글 폴더 경로 encodeURI 처리)
const B = '/images/b%EC%BB%B7'

const editorialImages = {
  hero: `${B}/sickkiya_young_woman_silhouette_near_large_window_wearing_bla_5c7154f9-87d6-447b-9c99-860a97f2d6c9_0.png`,
  grid2: [
    `${B}/sickkiya_young_woman_wearing_ivory_wrinkle_knit_top_with_blac_c8e5cab6-837f-409e-9d9b-f4ec62c892dc_1.png`,
    `${B}/sickkiya_young_woman_wearing_black_knit_sleeveless_top_and_bl_b19db50e-636a-45d1-83da-57fe5701f8dd_1.png`,
    `${B}/sickkiya_young_woman_wearing_beige_light_trench_jacket_over_c_27e590ef-c697-423d-a4de-dbfeca3c19cf_0.png`,
    `${B}/sickkiya_young_woman_wearing_ivory_wrinkle_knit_top_with_blac_536fea90-5332-4f21-8a61-690a54c23cc8_0 (1).png`,
    `${B}/sickkiya_waist-up_close-up_portrait_of_young_woman_wearing_cr_d1e6d752-7a32-4960-8228-703893405799_2.png`,
    `${B}/sickkiya_young_woman_wearing_beige_light_trench_jacket_over_c_27e590ef-c697-423d-a4de-dbfeca3c19cf_2.png`,
  ],
  grid3a: [
    `${B}/sickkiya_young_woman_silhouette_near_large_window_wearing_bla_3c9b4128-13b9-47cb-89fb-7c5e2fb44e05_1.png`,
    `${B}/sickkiya_young_woman_wearing_black_knit_sleeveless_top_and_bl_10bb1e5a-f1f7-4212-baab-2e32d3863606_0.png`,
    `${B}/sickkiya_young_woman_with_oatmeal_cashmere_blend_scarf_with_r_30839929-77e4-4c39-8518-b4f0c4147b8d_0.png`,
    `${B}/sickkiya_young_woman_wearing_grey_high-waisted_wide_leg_trous_1825857a-7987-4462-af28-b94078f56bc0_2.png`,
    `${B}/sickkiya_waist-up_close-up_portrait_of_young_woman_wearing_cr_d1e6d752-7a32-4960-8228-703893405799_1.png`,
    `${B}/sickkiya_young_woman_wearing_ivory_wrinkle_knit_top_with_blac_536fea90-5332-4f21-8a61-690a54c23cc8_1.png`,
  ],
  wide: `${B}/sickkiya_young_woman_silhouette_near_large_window_wearing_bla_3c9b4128-13b9-47cb-89fb-7c5e2fb44e05_2.png`,
  grid3b: [
    `${B}/sickkiya_young_woman_wearing_beige_light_trench_jacket_over_c_27e590ef-c697-423d-a4de-dbfeca3c19cf_3.png`,
    `${B}/sickkiya_young_woman_wearing_ivory_wrinkle_knit_top_with_blac_536fea90-5332-4f21-8a61-690a54c23cc8_2.png`,
    `${B}/sickkiya_young_woman_wearing_ivory_wrinkle_knit_top_with_blac_536fea90-5332-4f21-8a61-690a54c23cc8_3.png`,
    `${B}/sickkiya_young_woman_silhouette_near_large_window_wearing_bla_3c9b4128-13b9-47cb-89fb-7c5e2fb44e05_3.png`,
    `${B}/sickkiya_young_woman_wearing_black_knit_sleeveless_top_and_bl_10bb1e5a-f1f7-4212-baab-2e32d3863606_3.png`,
    `${B}/sickkiya_young_woman_wearing_black_knit_sleeveless_top_and_bl_b19db50e-636a-45d1-83da-57fe5701f8dd_3.png`,
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

function EditorialImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
      />
    </div>
  )
}

export default function EditorialPage() {
  return (
    <div>
      {/* Title */}
      <FadeInSection className="px-5 md:px-10 pt-16 pb-10 md:pt-24 md:pb-14">
        <h1 className="text-xs tracking-[3px] uppercase text-sub text-center">
          Editorial — Behind the Scenes
        </h1>
      </FadeInSection>

      {/* Hero — Full Width Silhouette */}
      <FadeInSection>
        <Image
          src={editorialImages.hero}
          alt="Enometa Editorial Hero"
          width={1920}
          height={1080}
          sizes="100vw"
          priority
          className="w-full h-auto"
        />
      </FadeInSection>

      {/* Brand Story Text */}
      <FadeInSection className="py-20 md:py-28 text-center px-5">
        <p className="text-sm tracking-[4px] uppercase text-sub leading-loose">
          Every piece begins as a feeling
        </p>
        <p className="text-xs tracking-[2px] text-muted mt-4 max-w-[500px] mx-auto leading-relaxed">
          Before pattern, before fabric — there is an intention.
          These moments capture the quiet process of becoming.
        </p>
      </FadeInSection>

      {/* 2 Column Grid */}
      <FadeInSection className="px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {editorialImages.grid2.map((src, i) => (
            <div key={i} className="aspect-[2/3]">
              <EditorialImage src={src} alt={`Editorial ${i + 1}`} className="w-full h-full" />
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Text Intermission */}
      <FadeInSection className="py-20 md:py-28 text-center px-5">
        <p className="text-sm tracking-[4px] uppercase text-sub">
          Restraint as expression
        </p>
      </FadeInSection>

      {/* 3 Column Grid A */}
      <FadeInSection className="px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {editorialImages.grid3a.map((src, i) => (
            <div key={i} className="aspect-[2/3]">
              <EditorialImage src={src} alt={`Editorial detail ${i + 1}`} className="w-full h-full" />
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Spacing */}
      <div className="h-16 md:h-24" />

      {/* Full Width Mood */}
      <FadeInSection>
        <Image
          src={editorialImages.wide}
          alt="Enometa Editorial Mood"
          width={1920}
          height={1080}
          sizes="100vw"
          className="w-full h-auto"
        />
      </FadeInSection>

      {/* Spacing */}
      <div className="h-16 md:h-24" />

      {/* 3 Column Grid B */}
      <FadeInSection className="px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {editorialImages.grid3b.map((src, i) => (
            <div key={i} className="aspect-[2/3]">
              <EditorialImage src={src} alt={`Editorial closing ${i + 1}`} className="w-full h-full" />
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Bottom CTA */}
      <FadeInSection className="py-20 md:py-28 text-center space-x-8">
        <Link
          href="/lookbook"
          className="inline-block text-sm tracking-[2px] uppercase text-body border-b border-body pb-1 hover:opacity-60 transition-opacity duration-300"
        >
          View Lookbook
        </Link>
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
