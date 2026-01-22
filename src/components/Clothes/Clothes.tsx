'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/src/Types/ApiResponse'
import { X } from 'lucide-react'
import ProductCard from '../Frame/ProductCard/ProductCard'

export default function Clothes() {
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(
                    'https://api.escuelajs.co/api/v1/products/?categoryId=1&offset=0&limit=40'
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
            <h1 className="text-center text-lg font-medium mb-6">Clothes</h1>
            <div className="my-6 flex justify-center">
                <input
                    placeholder="Search a product"
                    className="w-full max-w-sm rounded-md border px-4 py-4"
                />
            </div>

            <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:px-25 xl:px-25 px-10 ">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                    />
                ))}
            </section>

            {selectedProduct && (
                <div className="fixed right-0 top-20 rounded h-full w-96 bg-white border p-4 z-50">
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
                        className="rounded w-50 h-50 object-cover"
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
