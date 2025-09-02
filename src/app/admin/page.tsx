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

interface Product {
  id: string
  name: string
  price: number // tetri
  image?: string
  imageUrls?: string[]
  description?: string
  category: (typeof categories)[number] | string
  categorySlug?: string
  features?: string[]
  tags?: string[]
  created_at?: string
}

interface OrderItem {
  id: string        // product id
  name: string
  price: number     // tetri
  quantity: number
}

interface Order {
  id: string
  name: string
  email: string
  address: string
  items: OrderItem[]
  total: number     // tetri
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [tab, setTab] = useState<Tab>('products')
  const [loading, setLoading] = useState(true)

  // PRODUCTS — create
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
  const [products, setProducts] = useState<Product[]>([])

  // PRODUCTS — edit
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [editProduct, setEditProduct] = useState<{
    name: string
    price: string
    description: string
    category: string
    features: string
    tags: string
    image?: string
  } | null>(null)
  const [editFiles, setEditFiles] = useState<File[]>([])

  // ORDERS / ANALYTICS
  const [orders, setOrders] = useState<Order[]>([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [popularProduct, setPopularProduct] = useState('')
  const [chartData, setChartData] = useState<any>(null)

  // ORDER EDITING
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null)
  const [editItems, setEditItems] = useState<OrderItem[]>([])
  const [editCustomer, setEditCustomer] = useState<{ name: string; email: string; address: string } | null>(null)
  const [editTotal, setEditTotal] = useState<number>(0)
  const [newLineProductId, setNewLineProductId] = useState<string>('')
  const [newLineQty, setNewLineQty] = useState<number>(1)

  const inputBase = 'input w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-lime-400'

  // -------- AUTH GUARD --------
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

  // -------- FETCH DATA --------
  useEffect(() => {
    if (loading) return
    const fetchAll = async () => {
      const { data: productsData } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (productsData) setProducts(productsData as Product[])

      const { data: ordersData } = await supabase
        .from('orders')
        .select('id,name,email,address,items,total,created_at')
        .order('created_at', { ascending: false })

      if (ordersData) {
        setOrders(ordersData as Order[])
        const revenueTetri = ordersData.reduce((sum: number, o: any) => sum + (o.total || 0), 0)
        setTotalRevenue(revenueTetri / 100)
        const freq: Record<string, number> = {}
        ordersData.forEach((o: any) => (o.items || []).forEach((i: OrderItem) => {
          freq[i.name] = (freq[i.name] || 0) + Number(i.quantity || 0)
        }))
        const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]
        if (top) setPopularProduct(top[0])
        const byDate: Record<string, number> = {}
        ordersData.forEach((o: any) => {
          const d = new Date(o.created_at).toLocaleDateString()
          byDate[d] = (byDate[d] || 0) + 1
        })
        setChartData({
          labels: Object.keys(byDate),
          datasets: [{ label: 'Orders Per Day', data: Object.values(byDate), backgroundColor: 'rgba(0, 255, 170, 0.7)' }],
        })
      }
    }
    fetchAll()
  }, [loading])

  // -------- UTIL --------
  const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  // ======== PRODUCTS: CREATE ========
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

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

    const productToInsert: Product = {
      id: generatedId,
      name: form.name.trim(),
      price: parseInt(form.price), // tetri
      image: imageUrls[0] || '',
      imageUrls,
      description: form.description.trim(),
      category: trimmedCategory,
      categorySlug,
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }

    const { data: inserted, error } = await supabase.from('products').insert([productToInsert]).select()
    if (error) {
      console.error('Insert error:', error)
      alert('Insert failed')
      return
    }
    if (inserted) setProducts((prev) => [...inserted as Product[], ...prev])
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

  // ======== PRODUCTS: EDIT ========
  const startEditProduct = (p: Product) => {
    setEditingProductId(p.id)
    setEditProduct({
      name: p.name ?? '',
      price: String(p.price ?? 0),
      description: p.description ?? '',
      category: p.category ?? '',
      features: (p.features ?? []).join(', '),
      tags: (p.tags ?? []).join(', '),
      image: p.image,
    })
    setEditFiles([])
  }

  const cancelEditProduct = () => {
    setEditingProductId(null)
    setEditProduct(null)
    setEditFiles([])
  }

  const handleEditProductChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editProduct) return
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value })
  }

  const saveEditedProduct = async () => {
    if (!editingProductId || !editProduct) return

    // Validate category
    const trimmedCategory = editProduct.category.trim()
    if (!categories.includes(trimmedCategory as any)) {
      alert('Invalid category selected')
      return
    }

    // Optional: upload new images if provided
    let image = editProduct.image || ''
    let imageUrls: string[] | undefined
    if (editFiles.length > 0) {
      const newUrls: string[] = []
      for (const file of editFiles) {
        const uploadedUrl = await uploadImage(file, `${editingProductId}-${file.name}`)
        newUrls.push(uploadedUrl)
      }
      image = newUrls[0] || image
      imageUrls = newUrls
    }

    const updatePayload: Partial<Product> = {
      name: editProduct.name.trim(),
      price: parseInt(editProduct.price),
      description: editProduct.description.trim(),
      category: trimmedCategory,
      categorySlug: slugify(trimmedCategory),
      features: editProduct.features.split(',').map(f => f.trim()).filter(Boolean),
      tags: editProduct.tags.split(',').map(t => t.trim()).filter(Boolean),
      image,
      ...(imageUrls ? { imageUrls } : {}),
    }

    const { data, error } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', editingProductId)
      .select()

    if (error) {
      console.error('Update product error:', error)
      alert('Failed to update product')
      return
    }

    // Optimistic local update
    setProducts(prev =>
      prev.map(p => p.id === editingProductId ? { ...p, ...updatePayload } as Product : p)
    )

    cancelEditProduct()
    alert('Product updated ✅')
  }

  // ======== ORDERS: EDIT ========
  const recalcTotal = (items: OrderItem[]) => {
    const newTotal = items.reduce((sum, i) => sum + (Number(i.price) * Number(i.quantity)), 0)
    setEditTotal(newTotal)
  }

  const startEditOrder = (o: Order) => {
    const cloned = (o.items || []).map(i => ({ ...i }))
    setEditingOrderId(o.id)
    setEditItems(cloned)
    setEditCustomer({ name: o.name, email: o.email, address: o.address })
    recalcTotal(cloned)
    setNewLineProductId('')
    setNewLineQty(1)
  }

  const cancelEditOrder = () => {
    setEditingOrderId(null)
    setEditItems([])
    setEditCustomer(null)
    setEditTotal(0)
    setNewLineProductId('')
    setNewLineQty(1)
  }

  const handleOrderItemChange = (index: number, field: 'price' | 'quantity', value: string) => {
    const updated = [...editItems]
    const numeric = value === '' ? 0 : Number(value)
    updated[index] = { ...updated[index], [field]: numeric }
    setEditItems(updated)
    recalcTotal(updated)
  }

  const removeLine = (index: number) => {
    const updated = editItems.filter((_, i) => i !== index)
    setEditItems(updated)
    recalcTotal(updated)
  }

  const addLineByProductId = async () => {
    const pid = newLineProductId.trim()
    const qty = Number(newLineQty || 0)
    if (!pid || qty <= 0) {
      alert('Provide a valid Product ID and quantity > 0')
      return
    }
    const { data: prod, error } = await supabase
      .from('products')
      .select('id,name,price')
      .eq('id', pid)
      .single()

    if (error || !prod) {
      console.error('Add line error:', error)
      alert('Product not found')
      return
    }

    const updated = [...editItems, { id: prod.id, name: prod.name, price: prod.price, quantity: qty }]
    setEditItems(updated)
    recalcTotal(updated)
    setNewLineProductId('')
    setNewLineQty(1)
  }

  const handleEditCustomerChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editCustomer) return
    setEditCustomer({ ...editCustomer, [e.target.name]: e.target.value })
  }

  const repriceFromCatalog = async () => {
    const ids = editItems.map(i => i.id)
    if (ids.length === 0) return
    const { data: productsData, error } = await supabase
      .from('products')
      .select('id,name,price')
      .in('id', ids)

    if (error) {
      console.error('Reprice error:', error)
      alert('Failed to fetch latest product prices')
      return
    }
    const map = new Map((productsData ?? []).map(p => [p.id, p]))
    const updated = editItems.map(i => {
      const p = map.get(i.id)
      return p ? { ...i, price: p.price, name: p.name } : i
    })
    setEditItems(updated)
    recalcTotal(updated)
  }

  const saveEditedOrder = async () => {
    if (!editingOrderId) return
    const sanitized = editItems.map(i => ({
      ...i,
      price: Number.isFinite(i.price) ? Number(i.price) : 0,
      quantity: Number.isFinite(i.quantity) ? Number(i.quantity) : 0,
    }))
    const payload: Partial<Order> = {
      items: sanitized,
      total: sanitized.reduce((s, i) => s + i.price * i.quantity, 0),
      ...(editCustomer ?? {}),
    }

    const { error } = await supabase
      .from('orders')
      .update({
        ...payload,
        updated_at: new Date().toISOString(),
        adjusted_by: user?.id ?? null,
      } as any)
      .eq('id', editingOrderId)

    if (error) {
      console.error('Update order error:', error)
      alert('Failed to update order')
      return
    }

    setOrders(prev => prev.map(o => (o.id === editingOrderId ? { ...o, ...payload } as Order : o)))
    cancelEditOrder()
    alert('Order updated successfully ✅')
  }

  // -------- AUTH --------
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

      {/* -------------------- PRODUCTS TAB -------------------- */}
      {tab === 'products' && (
        <>
          {/* Create new */}
          <form onSubmit={handleSubmit} className="bg-black border border-lime-400 p-6 rounded space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className={inputBase} />
              <input name="price" value={form.price} onChange={handleChange} placeholder="Price in tetri (e.g. 1999)" type="number" className={inputBase} />
              <select name="category" value={form.category} onChange={handleChange} className={inputBase}>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <input name="id" value={form.id} onChange={handleChange} placeholder="Custom ID (optional)" className={inputBase} />
              <input name="features" value={form.features} onChange={handleChange} placeholder="Features (comma-separated)" className={inputBase} />
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className={inputBase} />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className={`${inputBase} md:col-span-2`} />
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
              className={inputBase}
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

          {/* List + Edit */}
          <div className="mt-10 space-y-4">
            {products.map((p) => {
              const isEditing = editingProductId === p.id
              return (
                <div key={p.id} className={`bg-black border ${isEditing ? 'border-yellow-400' : 'border-gray-700'} p-4 rounded-md`}>
                  {!isEditing ? (
                    <div className="flex justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {p.image && <img src={p.image} alt={p.name} className="h-16 w-16 object-contain border rounded" />}
                        <div>
                          <p className="text-lime-300 font-bold">{p.name}</p>
                          <p className="text-sm text-gray-400">₾{(p.price / 100).toFixed(2)} — <span className="text-gray-500">Category:</span> {p.category}</p>
                          {p.description && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{p.description}</p>}
                          {(p.features?.length || 0) > 0 && <p className="text-[11px] text-gray-500 mt-1">Features: {p.features?.join(', ')}</p>}
                          {(p.tags?.length || 0) > 0 && <p className="text-[11px] text-gray-500">Tags: {p.tags?.join(', ')}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditProduct(p)}
                          className="text-xs px-3 py-1 border border-yellow-400 text-yellow-300 rounded hover:bg-yellow-400 hover:text-black transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-xs px-3 py-1 border border-red-400 text-red-300 rounded hover:bg-red-400 hover:text-black transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input name="name" value={editProduct?.name ?? ''} onChange={handleEditProductChange} placeholder="Name" className={inputBase} />
                        <input name="price" type="number" value={editProduct?.price ?? ''} onChange={handleEditProductChange} placeholder="Price (tetri)" className={inputBase} />
                        <select name="category" value={editProduct?.category ?? ''} onChange={handleEditProductChange} className={inputBase}>
                          <option value="">Select Category</option>
                          {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <input name="features" value={editProduct?.features ?? ''} onChange={handleEditProductChange} placeholder="Features (comma-separated)" className={inputBase} />
                        <input name="tags" value={editProduct?.tags ?? ''} onChange={handleEditProductChange} placeholder="Tags (comma-separated)" className={inputBase} />
                        <textarea name="description" value={editProduct?.description ?? ''} onChange={handleEditProductChange} placeholder="Description" className={`${inputBase} md:col-span-2`} />
                      </div>

                      {/* Replace images (optional) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Current image</p>
                          {p.image ? <img src={p.image} alt={p.name} className="h-24 object-contain border rounded" /> : <p className="text-xs text-gray-500">No image</p>}
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Upload new image(s) (optional)</p>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setEditFiles(Array.from(e.target.files || []))}
                            className={inputBase}
                          />
                          {editFiles.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-2">
                              {editFiles.map((f, idx) => (
                                <img key={idx} src={URL.createObjectURL(f)} alt="new" className="h-16 object-contain border rounded" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button onClick={saveEditedProduct} className="text-xs px-3 py-1 border border-cyan-400 text-cyan-300 rounded hover:bg-cyan-400 hover:text-black transition">
                          💾 Save
                        </button>
                        <button onClick={cancelEditProduct} className="text-xs px-3 py-1 border border-zinc-500 text-zinc-300 rounded hover:bg-zinc-300 hover:text-black transition">
                          ✖ Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* -------------------- ORDERS TAB -------------------- */}
      {tab === 'orders' && (
        <section>
          <h2 className="text-xl font-bold mb-4">📋 Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-400">No orders placed yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => {
                const isEditing = editingOrderId === o.id
                return (
                  <div key={o.id} className={`bg-black border ${isEditing ? 'border-yellow-400' : 'border-cyan-500'} p-4 rounded-md`}>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="text-sm text-gray-400">
                          🕒 {new Date(o.created_at).toLocaleDateString()} {new Date(o.created_at).toLocaleTimeString()}
                        </p>
                        {!isEditing ? (
                          <>
                            <p className="font-bold">{o.name} ({o.email})</p>
                            <p className="text-sm mb-2">{o.address}</p>
                          </>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                            <input className={inputBase} name="name" value={editCustomer?.name ?? ''} onChange={handleEditCustomerChange} placeholder="Name" />
                            <input className={inputBase} name="email" value={editCustomer?.email ?? ''} onChange={handleEditCustomerChange} placeholder="Email" />
                            <input className={`${inputBase} md:col-span-3`} name="address" value={editCustomer?.address ?? ''} onChange={handleEditCustomerChange} placeholder="Address" />
                          </div>
                        )}
                      </div>

                      {!isEditing ? (
                        <button onClick={() => startEditOrder(o)} className="text-xs px-3 py-1 border border-yellow-400 text-yellow-300 rounded hover:bg-yellow-400 hover:text-black transition">
                          ✏️ Edit
                        </button>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          <button onClick={repriceFromCatalog} className="text-xs px-3 py-1 border border-lime-400 text-lime-300 rounded hover:bg-lime-400 hover:text-black transition">
                            ♻️ Reprice from Catalog
                          </button>
                          <button onClick={saveEditedOrder} className="text-xs px-3 py-1 border border-cyan-400 text-cyan-300 rounded hover:bg-cyan-400 hover:text-black transition">
                            💾 Save
                          </button>
                          <button onClick={cancelEditOrder} className="text-xs px-3 py-1 border border-red-400 text-red-300 rounded hover:bg-red-400 hover:text-black transition">
                            ✖ Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    {!isEditing ? (
                      <>
                        <ul className="text-sm list-disc list-inside mt-3">
                          {o.items.map((item) => (
                            <li key={item.id}>
                              {item.name} × {item.quantity} — ₾{((item.price * item.quantity) / 100).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                        <p className="font-bold mt-2 text-cyan-300">Total: ₾{(o.total / 100).toFixed(2)}</p>
                      </>
                    ) : (
                      <div className="mt-3 space-y-2">
                        <div className="grid grid-cols-12 gap-2 text-xs text-gray-400">
                          <div className="col-span-5">Item</div>
                          <div className="col-span-3">Product ID</div>
                          <div className="col-span-2">Qty</div>
                          <div className="col-span-1">Price</div>
                          <div className="col-span-1 text-right">Line</div>
                        </div>
                        {editItems.map((it, idx) => (
                          <div key={it.id + idx} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-5 truncate text-sm">{it.name}</div>
                            <div className="col-span-3 truncate text-[11px] text-gray-400">{it.id}</div>
                            <div className="col-span-2">
                              <input type="number" min={0} className={inputBase} value={it.quantity} onChange={(e) => handleOrderItemChange(idx, 'quantity', e.target.value)} />
                            </div>
                            <div className="col-span-1">
                              <input type="number" min={0} className={inputBase} value={it.price} onChange={(e) => handleOrderItemChange(idx, 'price', e.target.value)} />
                            </div>
                            <div className="col-span-1 text-right text-sm">
                              ₾{((Number(it.price) * Number(it.quantity)) / 100).toFixed(2)}
                            </div>
                            <div className="col-span-12 flex justify-end">
                              <button onClick={() => removeLine(idx)} className="mt-1 text-xs text-red-300 border border-red-400 px-2 py-0.5 rounded hover:bg-red-400 hover:text-black">
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="mt-3 border-t border-zinc-700 pt-3">
                          <div className="grid grid-cols-12 gap-2 items-end">
                            <div className="col-span-6">
                              <input className={inputBase} value={newLineProductId} onChange={(e) => setNewLineProductId(e.target.value)} placeholder="Add line: Product ID" />
                            </div>
                            <div className="col-span-3">
                              <input className={inputBase} type="number" min={1} value={newLineQty} onChange={(e) => setNewLineQty(Number(e.target.value))} placeholder="Qty" />
                            </div>
                            <div className="col-span-3">
                              <button onClick={addLineByProductId} type="button" className="w-full bg-lime-500 text-black rounded py-2 font-bold hover:bg-lime-400">
                                ➕ Add Line
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end mt-3">
                          <div className="text-right">
                            <p className="text-gray-400 text-sm">New Total</p>
                            <p className="font-bold text-yellow-300 text-lg">₾{(editTotal / 100).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
      )}

      {/* -------------------- ANALYTICS TAB -------------------- */}
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
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: 'Orders Trend', color: '#f472b6', font: { size: 18 } },
                },
                scales: {
                  x: { ticks: { color: '#ccc' }, grid: { color: '#444' } },
                  y: { beginAtZero: true, ticks: { color: '#ccc' }, grid: { color: '#444' } },
                },
              }}
            />
          </div>
        </section>
      )}
    </div>
  )
}

// TODO: verifying latest version restored on 2025-09-02