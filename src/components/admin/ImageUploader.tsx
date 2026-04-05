'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

type Props = {
  images: string[]
  onChange: (images: string[]) => void
}

export default function ImageUploader({ images, onChange }: Props) {
  const [uploading, setUploading] = useState(false)

  const uploadFile = useCallback(async (file: File) => {
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file)

    if (error) {
      alert('업로드 실패: ' + error.message)
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    return publicUrl
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'))
    if (files.length === 0) return

    setUploading(true)
    const urls: string[] = []
    for (const file of files) {
      const url = await uploadFile(file)
      if (url) urls.push(url)
    }
    onChange([...images.filter(Boolean), ...urls])
    setUploading(false)
  }, [images, onChange, uploadFile])

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploading(true)
    const urls: string[] = []
    for (const file of files) {
      const url = await uploadFile(file)
      if (url) urls.push(url)
    }
    onChange([...images.filter(Boolean), ...urls])
    setUploading(false)
    e.target.value = ''
  }, [images, onChange, uploadFile])

  return (
    <div>
      <label className="text-[10px] uppercase tracking-[1.5px] text-sub block mb-2">상품 이미지</label>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-border p-6 text-center cursor-pointer hover:border-dark transition-colors mb-3"
        onClick={() => document.getElementById('image-file-input')?.click()}
      >
        <input
          id="image-file-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        {uploading ? (
          <p className="text-xs text-sub">업로드 중...</p>
        ) : (
          <>
            <p className="text-xs text-sub">이미지를 드래그하거나 클릭해서 업로드</p>
            <p className="text-[10px] text-muted mt-1">PNG, JPG, WebP 지원</p>
          </>
        )}
      </div>

      {/* Preview + URL List */}
      <div className="space-y-2">
        {images.map((url, i) => (
          <div key={i} className="flex items-center gap-2">
            {url && (
              <div className="w-10 h-10 bg-gray-100 overflow-hidden flex-shrink-0">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="text"
              value={url}
              onChange={(e) => {
                const next = [...images]
                next[i] = e.target.value
                onChange(next)
              }}
              placeholder="URL 직접 입력도 가능"
              className="flex-1 text-xs py-2 px-3 border border-border outline-none focus:border-dark"
            />
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => onChange(images.filter((_, j) => j !== i))}
                className="text-sub hover:text-body text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...images, ''])}
        className="text-[10px] text-sub mt-2 hover:text-body"
      >
        + URL 직접 추가
      </button>
    </div>
  )
}
