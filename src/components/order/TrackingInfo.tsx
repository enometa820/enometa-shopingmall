import { COURIER_COMPANIES } from '@/types/order'
import type { CourierCompany } from '@/types/order'

type TrackingInfoProps = {
  trackingNumber: string | null
  courierCompany: CourierCompany | null
}

export default function TrackingInfo({ trackingNumber, courierCompany }: TrackingInfoProps) {
  if (!trackingNumber || !courierCompany) return null

  const courier = COURIER_COMPANIES[courierCompany]
  if (!courier) return null

  return (
    <div className="border border-border p-4 mt-4">
      <p className="text-[10px] uppercase tracking-[1.5px] text-sub mb-3">배송 정보</p>
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-sub">택배사</span>
          <span>{courier.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sub">송장번호</span>
          <span>{trackingNumber}</span>
        </div>
      </div>
      <a
        href={courier.trackingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 py-2 text-center border border-border text-xs text-body hover:border-dark transition-colors duration-300"
      >
        배송 조회 →
      </a>
    </div>
  )
}
