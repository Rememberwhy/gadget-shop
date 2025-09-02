import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/auth', '/login', '/reset-password', '/update-password', '/thank-you'],
      },
    ],
    sitemap: 'https://hexamridi.tech/sitemap.xml',
  }
}
