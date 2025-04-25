import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://hexamridi.tech'

  const staticRoutes = [
    '',
    '/shop',
    '/cart',
    '/checkout',
    '/admin',
  ]

  const productSlugs = ['flipper-zero', 'raspberry-pi', 'wifi-adapter'] // TODO: Replace with Supabase slugs

  const urls = [
    ...staticRoutes.map((path) => `<url><loc>${baseUrl}${path}</loc></url>`),
    ...productSlugs.map((slug) => `<url><loc>${baseUrl}/product/${slug}</loc></url>`),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
