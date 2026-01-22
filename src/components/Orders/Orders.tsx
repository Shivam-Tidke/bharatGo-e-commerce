'use client'

import { useEffect, useState } from 'react'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(data)
  }, [])

  
  
    if (!orders.length) {
    return (
      <main className="pt-28 flex flex-col items-center justify-center text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="No orders"
          className="h-32 mb-4 opacity-80"
        />
        <h2 className="text-lg font-semibold">My Orders</h2>
        <p className="text-gray-500 mt-2">
          Nothing yet, add some products and check them out :)
        </p>
      </main>
    )
  }

  return (
    <main className="pt-28 max-w-xl mx-auto px-4">
      <h1 className="text-xl font-semibold mb-4 items-center justify-center flex">My Orders</h1>

      {orders.map((item, i) => (
        <div
          key={i}
          className="flex gap-4 border p-4 rounded mb-3"
        >
          <img
            src={item.images?.[0]}
            className="h-16 w-16 rounded object-cover"
          />
          <div>
            <p className="font-medium">{item.title}</p>
            <p>${item.price}</p>
            <p className="text-sm">Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
    </main>
  )
}
