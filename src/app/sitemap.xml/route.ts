// src/app/sitemap.xml/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const base = 'https://hexamridi.tech'
  const nowISO = new Date().toISOString()

  // Public static pages (exclude private/utility routes)
  const staticPublicPaths = [
    '/', '/shop', '/cart', '/checkout', '/contact',
    '/disclaimer', '/home', '/ka', '/privacy-policy',
    '/saturn-test', '/terms',
  ]

  type UrlEntry = {
    loc: string
    lastmod: string
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority: string
  }

  const urls: UrlEntry[] = staticPublicPaths.map((p) => ({
    loc: `${base}${p}`,
    lastmod: nowISO,
    changefreq: 'weekly',
    priority: p === '/' ? '1.0' : '0.7',
  }))

  // ---- Dynamic product pages from Supabase ----
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
    // Use anon key (safe for read-only published products under RLS)
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } })

    // Adjust columns to match your schema
    const { data: products } = await supabase
      .from('products')
      .select('id, slug, updated_at, published')
      .eq('published', true)
      .limit(5000)

    for (const p of products ?? []) {
      const handle = (p as any).slug ?? (p as any).id
      urls.push({
        loc: `${base}/product/${handle}`,
        lastmod: (p as any).updated_at ? new Date((p as any).updated_at).toISOString() : nowISO,
        changefreq: 'weekly',
        priority: '0.8',
      })
    }
  } catch {
    // fail soft → only static URLs
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${u.loc}</loc>\n` +
          `    <lastmod>${u.lastmod}</lastmod>\n` +
          `    <changefreq>${u.changefreq}</changefreq>\n` +
          `    <priority>${u.priority}</priority>\n` +
          `  </url>`
      )
      .join('\n') +
    `\n</urlset>\n`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Cache at the edge/CDN, refresh hourly, serve stale for a day
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
