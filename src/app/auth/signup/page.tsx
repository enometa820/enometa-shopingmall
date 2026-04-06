'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { createWelcomeCoupon } from '@/actions/coupons'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: 'user' },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // 신규가입 환영 쿠폰 발급
    const { data: { user: newUser } } = await supabase.auth.getUser()
    if (newUser) {
      try {
        await createWelcomeCoupon(newUser.id)
      } catch {
        // 쿠폰 테이블 미생성 시 무시
      }
    }

    router.push('/shop')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-[360px]">
        <h1 className="text-sm tracking-[2px] uppercase text-dark text-center mb-10">
          SIGN UP
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
            className="w-full text-xs py-3 border-b border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (6자 이상)"
            required
            className="w-full text-xs py-3 border-b border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
          />
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호 확인"
            required
            className="w-full text-xs py-3 border-b border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
          />

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-dark text-white text-xs uppercase tracking-[1.5px] hover:bg-accent transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? '가입 중...' : 'SIGN UP'}
          </button>
        </form>

        {/* 구분선 */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 border-t border-border" />
          <span className="text-xs text-muted">또는</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* 소셜 로그인 */}
        <SocialLoginButtons />

        <div className="mt-8 text-center">
          <Link
            href="/auth/login"
            className="text-xs text-sub hover:text-body transition-colors uppercase tracking-wide"
          >
            이미 계정이 있으신가요?
          </Link>
        </div>
      </div>
    </div>
  )
}

function SocialLoginButtons() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleOAuth = async (provider: 'google' | 'kakao') => {
    setLoading(provider)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/shop',
        ...(provider === 'kakao' && {
          queryParams: { scope: 'profile_nickname profile_image' },
        }),
      },
    })
  }

  return (
    <div className="mt-4 space-y-3">
      <button
        type="button"
        onClick={() => handleOAuth('google')}
        disabled={loading !== null}
        className="w-full py-3 flex items-center justify-center gap-2 border border-border text-xs tracking-[1px] text-dark bg-white hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google로 가입
      </button>

      <button
        type="button"
        onClick={() => handleOAuth('kakao')}
        disabled={loading !== null}
        className="w-full py-3 flex items-center justify-center gap-2 text-xs tracking-[1px] text-[#391B1B] bg-[#FEE500] hover:bg-[#FADA0A] transition-colors duration-300 disabled:opacity-50"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#391B1B">
          <path d="M12 3C6.48 3 2 6.36 2 10.5c0 2.67 1.76 5.02 4.41 6.37l-1.12 4.12c-.1.36.3.65.6.44l4.85-3.22c.42.04.84.06 1.26.06 5.52 0 10-3.36 10-7.5S17.52 3 12 3z" />
        </svg>
        카카오로 가입
      </button>
    </div>
  )
}
