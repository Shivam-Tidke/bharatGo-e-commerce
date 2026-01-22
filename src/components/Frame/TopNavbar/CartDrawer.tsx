'use client'

import { useCart } from "@/src/context/cartContext"
import { X } from "lucide-react"
import { useRouter } from "next/navigation";


export default function CartDrawer() {
  const { cart, isOpen, closeCart, increaseQuantity, decreaseQuantity, removeFromCart, Checkout } = useCart()
  const router = useRouter();

  if (!isOpen) return null

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleCheckout = () => {
    Checkout();
    router.push('/orders');
  }


  return (
    <div className="fixed right-0 top-20 rounded h-full w-96 bg-white border p-4 z-50">
      <button className="absolute right-4 top-4" onClick={closeCart}>
        ✕
      </button>

      <h2 className="text-lg font-semibold mb-4">My Order</h2>

      {cart.map((item) => (
        <div key={item.id} className="flex gap-3 mb-4">
          <img
            src={item.images?.[0]}
            className="h-16 w-16 rounded object-cover"
          />
          <div>
            <p>{item.title}</p>
            <p>${item.price}</p>
             <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => decreaseQuantity(item.id)}
          className="h-6 w-6 rounded bg-gray-200"
        >
          −
        </button>

        <span className="text-sm">{item.quantity}</span>

        <button
          onClick={() => increaseQuantity(item.id)}
          className="h-6 w-6 rounded bg-green-200"
        >
          +
        </button>

      </div>
          </div>
          <button>
            <X size={16} onClick={() => removeFromCart(item.id)} className="h-4 w-4 text-gray-600" />
          </button>
        </div>

      ))}

      <div className="border-t pt-4 mt-auto">
        <p className="font-bold">Total: ${total}</p>
        <button onClick={ handleCheckout }  className="w-full mt-2 bg-black text-white py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  )
}
