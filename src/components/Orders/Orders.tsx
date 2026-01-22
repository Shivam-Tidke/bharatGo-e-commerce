'use client'

import { useEffect, useState } from 'react'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(data)
  }, [])

  if (!orders.length) {
    return <p className="pt-28 text-center">No orders yet</p>
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
