
import { useCart } from "@/src/context/cartContext"
import { Product } from "@/src/Types/ApiResponse"
import { JSX } from "react"

type Props = {
  product: Product
  onSelect: (product: Product) => void
}


export default function ProductCard({ product, onSelect }: Props): JSX.Element {
  const image = product.images?.[0] || 'https://placehold.co/600x400'
  const {addToCart} = useCart();
   
  return (
    <div className="cursor-pointer"  onClick={() => onSelect(product)}>
      <div className="relative h-60 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-cover"
        />
        
        <button
        onClick={(e)=> {
          e.preventDefault();
          e.stopPropagation();  
          addToCart(product)
        }} 
         className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white shadow">
          +
        </button>

        <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-1 text-xs">
          {product.category.name}
        </span>
      </div>

      <div className="mt-2">
        <p className="line-clamp-2 text-sm">{product.title}</p>
        <p className="font-semibold">${product.price}</p>
      </div>
    </div>
  )
}
