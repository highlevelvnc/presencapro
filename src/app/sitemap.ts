import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://presencapro.pt'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/planos`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/como-funciona`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/legal/termos`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/legal/privacidade`, lastModified: new Date(), priority: 0.3 },
  ]

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
