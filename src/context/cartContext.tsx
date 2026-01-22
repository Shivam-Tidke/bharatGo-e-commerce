'use client'

import { createContext, useContext, useState } from 'react'
import { Product } from '@/src/Types/ApiResponse'
import { json } from 'stream/consumers'

type CartItem = Product & { quantity: number }

type CartContextType = {
    cart: CartItem[]
    addToCart: (product: Product) => void
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    Checkout: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const Checkout = () =>{
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');

        localStorage.setItem(
            'orders',
            JSON.stringify([...existingOrders, ...cart])
        )

        setCart([])
        setIsOpen(false)
    }


    const addToCart = (product: Product) => {
        setCart((prev) => {
            const found = prev.find((p) => p.id === product.id)
            if (found) {
                return prev.map((p) =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        setIsOpen(true)
    }


    const increaseQuantity = (id: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        )
    }

    const decreaseQuantity = (id: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    

    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, Checkout, removeFromCart, isOpen, openCart:()=> setIsOpen(true), closeCart: () => setIsOpen(false) }}> 
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)!
