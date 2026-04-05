import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/cart'
import {
  getCartItems,
  syncCartToSupabase,
  addCartItemToSupabase,
  updateCartItemQuantityInSupabase,
  removeCartItemFromSupabase,
  clearCartInSupabase,
} from '@/actions/cart'

type CartStore = {
  items: CartItem[]
  isLoggedIn: boolean
  isLoading: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  onLogin: () => Promise<void>
  onLogout: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoggedIn: false,
      isLoading: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.product_id === item.product_id &&
              i.size === item.size &&
              i.color === item.color
          )
          if (existing) {
            const newItems = state.items.map((i) =>
              i.product_id === item.product_id &&
              i.size === item.size &&
              i.color === item.color
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
            return { items: newItems }
          }
          return { items: [...state.items, item] }
        })

        // 로그인 상태면 Supabase에도 저장
        if (get().isLoggedIn) {
          addCartItemToSupabase(item)
        }
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.product_id === productId &&
                i.size === size &&
                i.color === color
              )
          ),
        }))

        if (get().isLoggedIn) {
          removeCartItemFromSupabase(productId, size, color)
        }
      },

      updateQuantity: (productId, size, color, quantity) => {
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (i) =>
                    !(
                      i.product_id === productId &&
                      i.size === size &&
                      i.color === color
                    )
                )
              : state.items.map((i) =>
                  i.product_id === productId &&
                  i.size === size &&
                  i.color === color
                    ? { ...i, quantity }
                    : i
                ),
        }))

        if (get().isLoggedIn) {
          updateCartItemQuantityInSupabase(productId, size, color, quantity)
        }
      },

      clearCart: () => {
        set({ items: [] })
        if (get().isLoggedIn) {
          clearCartInSupabase()
        }
      },

      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      // 로그인 시: localStorage 카트 → Supabase 병합 → Supabase에서 다시 불러오기
      onLogin: async () => {
        // 이미 로그인 처리됐으면 중복 실행 방지
        if (get().isLoggedIn) {
          const serverItems = await getCartItems()
          set({ items: serverItems })
          return
        }

        set({ isLoading: true })
        const localItems = get().items

        // 로컬 카트가 있으면 Supabase에 병합 (최초 1회만)
        if (localItems.length > 0) {
          await syncCartToSupabase(localItems)
        }

        // Supabase에서 통합된 카트 불러오기
        const serverItems = await getCartItems()
        set({ items: serverItems, isLoggedIn: true, isLoading: false })
      },

      // 로그아웃 시: 카트 비우고 비로그인 모드
      onLogout: () => {
        set({ items: [], isLoggedIn: false })
      },
    }),
    {
      name: 'enometa-cart',
      partialize: (state) => ({
        items: state.items,
        // isLoggedIn은 persist하지 않음 — 매 세션마다 auth 체크
      }),
    }
  )
)
