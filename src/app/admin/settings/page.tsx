'use client'

import { useState, useEffect } from 'react'
import { adminGetSetting, adminUpdateSetting } from '@/actions/admin'

type BankAccount = {
  bankName: string
  accountNumber: string
  accountHolder: string
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<BankAccount>({
    bankName: '',
    accountNumber: '',
    accountHolder: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      const setting = await adminGetSetting('bank_account')
      if (setting?.value) {
        const v = setting.value as Record<string, string>
        setForm({
          bankName: v.bankName || '',
          accountNumber: v.accountNumber || '',
          accountHolder: v.accountHolder || '',
        })
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const result = await adminUpdateSetting('bank_account', form)
    if (result.error) {
      setMessage(`오류: ${result.error}`)
    } else {
      setMessage('저장되었습니다.')
    }
    setSaving(false)
  }

  if (loading) {
    return <p className="text-xs text-sub">로딩 중...</p>
  }

  return (
    <div>
      <h1 className="text-base font-semibold text-dark mb-6">설정</h1>

      <form onSubmit={handleSubmit} className="max-w-[480px] space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[1.25px] text-sub mb-4">
            계좌이체 입금 정보
          </p>
          <p className="text-[11px] text-muted mb-4">
            계좌이체 결제 시 고객에게 안내되는 입금 계좌 정보입니다.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] text-sub mb-1">은행명</label>
              <input
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                placeholder="예: 국민은행"
                className="w-full text-xs py-2.5 px-3 border border-border rounded outline-none focus:border-dark transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] text-sub mb-1">계좌번호</label>
              <input
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                placeholder="예: 123-456-789012"
                className="w-full text-xs py-2.5 px-3 border border-border rounded outline-none focus:border-dark transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] text-sub mb-1">예금주</label>
              <input
                name="accountHolder"
                value={form.accountHolder}
                onChange={handleChange}
                placeholder="예: 홍길동"
                className="w-full text-xs py-2.5 px-3 border border-border rounded outline-none focus:border-dark transition-colors"
              />
            </div>
          </div>
        </div>

        {message && (
          <p className={`text-xs ${message.startsWith('오류') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="py-2.5 px-6 bg-dark text-white text-xs uppercase tracking-[1.5px] hover:bg-accent transition-colors duration-300 disabled:opacity-50"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </form>
    </div>
  )
}
