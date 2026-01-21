'use client'

import { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { Product } from '@/src/Types/ApiResponse'
import { X } from 'lucide-react'

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(
                    'https://api.escuelajs.co/api/v1/products?offset=0&limit=20'
                )
                const data: Product[] = await res.json()
                setProducts(data)
            } catch (error) {
                console.error('Failed to fetch products')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return <p className="pt-28 text-center">Loading...</p>
    }

    return (
        <main className="mx-auto max-w-7xl px-4 pt-28 pb-10">
            <h1 className="text-center text-lg font-medium mb-6">Home</h1>
            <div className="my-6 flex justify-center">
                <input
                    placeholder="Search a product"
                    className="w-full max-w-md rounded-md border px-4 py-2"
                />
            </div>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                    />
                ))}
            </section>

            {selectedProduct && (
                <div className="fixed inset-y-0 right-0 top-18 w-96 bg-white border-l p-6">
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className="text-lg font-semibold">Detail</h2>
                        <button
                            className="absolute right-4 top-4 text-xl"
                            onClick={() => setSelectedProduct(null)}
                        >
                            <X />
                        </button>

                    </div>
                    <img
                        src={selectedProduct.images?.[0] || 'https://placehold.co/600x400'}
                        className="rounded"
                        alt={selectedProduct.title}
                    />

                    <h2 className="mt-4 text-xl font-semibold">
                        {selectedProduct.title}
                    </h2>

                    <p className="mt-1 font-bold">${selectedProduct.price}</p>

                    <p className="mt-2 text-sm text-gray-600">
                        {selectedProduct.description}
                    </p>
                </div>


            )}
        </main>
    )
}
