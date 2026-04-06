'use client'

import { useState } from 'react'
import Script from 'next/script'

type AddressData = {
  postalCode: string
  address: string
}

type AddressSearchProps = {
  onChange: (data: AddressData) => void
  defaultPostalCode?: string
  defaultAddress?: string
}

export default function AddressSearch({
  onChange,
  defaultPostalCode = '',
  defaultAddress = '',
}: AddressSearchProps) {
  const [postalCode, setPostalCode] = useState(defaultPostalCode)
  const [address, setAddress] = useState(defaultAddress)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const handleSearch = () => {
    if (!scriptLoaded) return

    const daum = (window as any).daum
    if (!daum?.Postcode) return

    new daum.Postcode({
      oncomplete(data: any) {
        const selectedAddress =
          data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress
        const newPostalCode = data.zonecode

        setPostalCode(newPostalCode)
        setAddress(selectedAddress)
        onChange({ postalCode: newPostalCode, address: selectedAddress })
      },
    }).open()
  }

  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Postal code + search button */}
      <div className="flex items-end gap-2">
        <input
          value={postalCode}
          readOnly
          placeholder="우편번호"
          className="flex-1 text-xs py-3 border-b border-border outline-none bg-transparent text-dark placeholder:text-muted"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="shrink-0 px-4 py-2.5 text-xs border border-dark text-dark uppercase tracking-[1px] hover:bg-dark hover:text-white transition-colors duration-300"
        >
          주소 검색
        </button>
      </div>

      {/* Address (read-only, filled by Daum Postcode) */}
      <input
        value={address}
        readOnly
        placeholder="주소"
        className="w-full text-xs py-3 border-b border-border outline-none bg-transparent text-dark placeholder:text-muted"
      />
    </>
  )
}
