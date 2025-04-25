'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { uploadImage } from '@/lib/uploadImage'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const categories = [
  'Flipper & Tools',
  'Raspberry Pi & Kits',
  'Wi-Fi & Networking',
  'Radio & SDR',
  'Smart Cards & NFC',
  'Keyloggers & HID',
  'Debugging Tools',
  'Storage & USBs',
  'Wearables & Spy Gear',
  'Accessories',
] as const

type Tab = 'products' | 'orders' | 'analytics'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  name: string
  email: string
  address: string
  items: OrderItem[]
  total: number
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [tab, setTab] = useState<Tab>('products')
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    category: '',
    features: '',
    tags: '',
    image: '',
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [popularProduct, setPopularProduct] = useState('')
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    const checkAdmin = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) return router.push('/login')

      const role = data.user.user_metadata?.role
      if (role !== 'admin') return router.push('/')
      setUser(data.user)
      setLoading(false)
    }
    checkAdmin()
  }, [router])

  useEffect(() => {
    if (!loading) {
      const fetchData = async () => {
        const { data: productsData } = await supabase.from('products').select('*')
        if (productsData) setProducts(productsData)

        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })

        if (ordersData) {
          setOrders(ordersData)

          const revenue = ordersData.reduce((sum, o) => sum + o.total, 0)
          setTotalRevenue(revenue / 100)

          const freq: Record<string, number> = {}
          ordersData.forEach((o) =>
            o.items.forEach((i) => {
              freq[i.name] = (freq[i.name] || 0) + i.quantity
            })
          )
          const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]
          if (top) setPopularProduct(top[0])

          const byDate: Record<string, number> = {}
          ordersData.forEach((o) => {
            const d = new Date(o.created_at).toLocaleDateString()
            byDate[d] = (byDate[d] || 0) + 1
          })
          setChartData({
            labels: Object.keys(byDate),
            datasets: [{
              label: 'Orders Per Day',
              data: Object.values(byDate),
              backgroundColor: 'rgba(0, 255, 170, 0.7)',
            }],
          })
        }
      }
      fetchData()
    }
  }, [loading])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const trimmedCategory = form.category.trim()
    if (!categories.includes(trimmedCategory as any)) {
      alert('Invalid category selected')
      return
    }

    const generatedId = form.id || slugify(form.name)
    const categorySlug = slugify(trimmedCategory)

    let imageUrls: string[] = []
    for (const file of selectedFiles) {
      try {
        const uploadedUrl = await uploadImage(file, `${generatedId}-${file.name}`)
        imageUrls.push(uploadedUrl)
      } catch (err) {
        console.error('Image upload failed:', err)
        alert('One or more image uploads failed.')
        return
      }
    }

    const productToInsert = {
      id: generatedId,
      name: form.name.trim(),
      price: parseInt(form.price),
      image: imageUrls[0] || '',
      imageUrls,
      description: form.description.trim(),
      category: trimmedCategory,
      categorySlug,
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }

    const { data: inserted, error } = await supabase
      .from('products')
      .insert([productToInsert])
      .select()

    if (error) {
      console.error('Insert error:', error)
      alert('Insert failed')
      return
    }

    if (inserted) setProducts((prev) => [...prev, ...inserted])
    setForm({ id: '', name: '', price: '', image: '', description: '', category: '', features: '', tags: '' })
    setSelectedFiles([])
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      console.error('Delete error:', error)
      alert('Failed to delete product')
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="text-white text-center py-10">Verifying admin access...</div>

  return (
    <div className="max-w-5xl mx-auto p-6 text-white font-mono">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-lime-400">🧠 Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 border border-red-400 px-3 py-1 rounded hover:bg-red-500 hover:text-black transition"
        >
          🚪 Log Out
        </button>
      </header>

      <nav className="flex gap-4 mb-6">
        {(['products', 'orders', 'analytics'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 border-b-2 ${tab === t ? 'border-lime-400 text-lime-300' : 'border-transparent text-gray-500 hover:text-lime-300'}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </nav>

      {tab === 'products' && (
        <>
          <form onSubmit={handleSubmit} className="bg-black border border-lime-400 p-6 rounded space-y-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="input" />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price in tetri" type="number" className="input" />
            <select name="category" value={form.category} onChange={handleChange} className="input">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
            <input name="features" value={form.features} onChange={handleChange} placeholder="Features (comma-separated)" className="input" />
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className="input" />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
              className="input"
            />
            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {selectedFiles.map((file, idx) => (
                  <img key={idx} src={URL.createObjectURL(file)} alt="preview" className="h-24 object-contain border rounded" />
                ))}
              </div>
            )}
            <button type="submit" className="w-full bg-lime-500 text-black rounded py-2 font-bold hover:bg-lime-400">
              ➕ Add Product
            </button>
          </form>

          <div className="mt-10 space-y-4">
            {products.map((p) => (
              <div key={p.id} className="bg-black border border-gray-700 p-4 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-lime-300 font-bold">{p.name}</p>
                  <p className="text-sm text-gray-400">₾{(p.price / 100).toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Category: {p.category}</p>
                  {p.image && (
                    <img src={p.image} alt={p.name} className="h-16 w-16 object-contain border mt-2 rounded" />
                  )}
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500 hover:underline text-sm ml-4"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'orders' && (
        <section>
          <h2 className="text-xl font-bold mb-4">📋 Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-400">No orders placed yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="bg-black border border-cyan-500 p-4 rounded-md">
                  <p className="text-sm text-gray-400">
                    🕒 {new Date(o.created_at).toLocaleDateString()} {new Date(o.created_at).toLocaleTimeString()}
                  </p>
                  <p className="font-bold">{o.name} ({o.email})</p>
                  <p className="text-sm mb-2">{o.address}</p>
                  <ul className="text-sm list-disc list-inside">
                    {o.items.map((item) => (
                      <li key={item.id}>{item.name} x {item.quantity} — ₾{(item.price * item.quantity / 100).toFixed(2)}</li>
                    ))}
                  </ul>
                  <p className="font-bold mt-2 text-cyan-300">Total: ₾{(o.total / 100).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === 'analytics' && chartData && (
        <section>
          <h2 className="text-xl font-bold mb-6">📊 Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black border border-pink-500 p-4 rounded-md">
              <h3 className="text-sm text-gray-400">Total Revenue</h3>
              <p className="text-2xl font-bold text-pink-400">₾{totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-black border border-lime-500 p-4 rounded-md">
              <h3 className="text-sm text-gray-400">Number of Orders</h3>
              <p className="text-2xl font-bold text-lime-400">{orders.length}</p>
            </div>
            <div className="bg-black border border-cyan-500 p-4 rounded-md">
              <h3 className="text-sm text-gray-400">Top Product</h3>
              <p className="text-xl font-bold text-cyan-400">{popularProduct}</p>
            </div>
          </div>
          <div className="bg-black border border-pink-500 p-6 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-pink-300">📈 Orders Per Day</h3>
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false }, title: { display: true, text: 'Orders Trend', color: '#f472b6', font: { size: 18 } } }, scales: { x: { ticks: { color: '#ccc' }, grid: { color: '#444' } }, y: { beginAtZero: true, ticks: { color: '#ccc' }, grid: { color: '#444' } } } }} />
          </div>
        </section>
      )}
    </div>
  )
}