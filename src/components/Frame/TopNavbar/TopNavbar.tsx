'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShoppingCart,
  User,
  Package,
  MailOpen,
  CircleUser
} from 'lucide-react'
import { useCart } from '@/src/context/cartContext'

const categories = [
  { name: 'All', slug: '/' },
  { name: 'Clothes', slug: 'clothes' },
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Furnitures', slug: 'furnitures' },
  { name: 'Toys', slug: 'toys' },
]

export default function Topbar() {
  const [open, setOpen] = useState(false)

  const userEmail = 'userintheapp@test.com'
  const { cart, openCart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="">
      <div className="flex fixed top-0 left-0 bg-white p-3 z-50  py-6 flex-col items-center w-full border-b border-gray-200">

        <div className=" max-w-7xl w-full cursor-pointer flex items-center justify-between">

          <nav className=" flex gap-4 xl:px-0 2xl:px-0 px-6 overflow-x-auto text-sm text-gray-600">
            {/* Logo */}
            <Link href="/" className=" md:block hidden text-lg font-semibold">
              Shopi
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.slug}
                className="flex items-center hover:text-black"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <span>{userEmail}</span>
            <Link href="/orders">My Orders</Link>
            <Link href="/account">My Account</Link>

            <button onClick={openCart} className="relative">
              <ShoppingCart size={18} />
              <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-black text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="relative md:hidden pr-4"
          >
            <CircleUser fill='white' size={22} />
          </button>
        </div>



        {open && (
          <div className="absolute right-4 top-14 z-50 w-56 rounded-md border shadow-md md:hidden">

            <Link
              href="/orders"
              className="flex items-center gap-2 px-4 py-2 text-sm"
            >
              <MailOpen size={16} />{userEmail}
            </Link>

            <Link
              href="/orders"
              className="flex items-center gap-2 px-4 py-2 text-sm"
            >
              <Package size={16} /> My Orders
            </Link>

            <Link
              href="/account"
              className="flex items-center gap-2 px-4 py-2 text-sm"
            >
              <User size={16} /> My Account
            </Link>


            <button onClick={openCart} className="relative">
              <ShoppingCart size={18} />
              <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-black text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
