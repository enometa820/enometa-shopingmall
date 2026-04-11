import { adminGetInquiries } from '@/actions/admin'
import { formatDate } from '@/lib/utils/format'
import { INQUIRY_CATEGORY_LABELS } from '@/types/inquiry'
import type { InquiryCategory } from '@/types/inquiry'
import InquiryReplyForm from './InquiryReplyForm'

export default async function AdminInquiriesPage() {
  const inquiries = await adminGetInquiries()

  return (
    <div>
      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-8">문의 관리</h1>

      {inquiries.length === 0 ? (
        <p className="text-xs text-muted py-8">문의가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq: any) => (
            <div key={inq.id} className="border border-border p-4 md:p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-3">
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <span className="text-xs font-normal">{inq.name}</span>
                  <span className="text-[10px] text-sub hidden md:inline">{inq.email}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-beige">
                    {INQUIRY_CATEGORY_LABELS[inq.category as InquiryCategory]}
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className={`text-[10px] px-2 py-0.5 ${inq.status === 'replied' ? 'bg-green-50 text-green-600' : 'bg-beige text-sub'}`}>
                    {inq.status === 'replied' ? '답변완료' : '대기중'}
                  </span>
                  <span className="text-[10px] text-muted">{formatDate(inq.created_at)}</span>
                </div>
              </div>

              <p className="text-xs text-body leading-relaxed mb-4">{inq.content}</p>

              {inq.reply ? (
                <div className="bg-beige/50 p-3 border-l-2 border-dark">
                  <p className="text-[10px] text-sub mb-1">답변</p>
                  <p className="text-xs">{inq.reply}</p>
                </div>
              ) : (
                <InquiryReplyForm inquiryId={inq.id} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
