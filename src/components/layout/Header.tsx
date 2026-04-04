'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart-store'
import SideMenu from './SideMenu'
import CartDrawer from '../cart/CartDrawer'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const itemCount = useCartStore((s) => s.getItemCount())

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ height: 'var(--header-height)' }}>
        <div className="grid grid-cols-3 items-center h-full px-5">
          {/* Left — MENU */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-xs tracking-[1.25px] uppercase font-normal text-body hover:opacity-60 transition-opacity duration-300"
            >
              MENU
            </button>
          </div>

          {/* Center — LOGO */}
          <div className="flex justify-center">
            <Link
              href="/shop"
              className="text-sm tracking-[2px] uppercase font-normal text-dark"
            >
              ENOMETA
            </Link>
          </div>

          {/* Right — CART */}
          <div className="flex justify-end items-center">
            <button
              onClick={() => setCartOpen(true)}
              className="text-xs tracking-[1.25px] uppercase font-normal text-body hover:opacity-60 transition-opacity duration-300"
            >
              CART({itemCount})
            </button>
          </div>
        </div>
      </header>

      {/* Side Menu */}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
