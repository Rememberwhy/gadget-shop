import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      {/* Image Wrapper */}
      <div className="h-48 w-full bg-white flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain rounded"
        />
      </div>

      {/* Product Info */}
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-500 mt-1">₾{(product.price / 100).toFixed(2)}</p>
      <p className="text-sm mt-1">{product.description}</p>
      <Link
        href={`/product/${product.id}`}
        className="inline-block mt-3 text-blue-500 hover:underline"
      >
        View Product →
      </Link>
    </div>
  )
}
