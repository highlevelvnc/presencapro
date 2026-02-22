import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Post not found',
      description: 'This article could not be found.',
      robots: { index: false, follow: false },
    }
  }

  const url = `https://presencapro.pt/blog/${post.slug}`

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url,
      publishedTime: post.date,
      // images: post.ogImage ? [{ url: post.ogImage, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      // images: post.ogImage ? [post.ogImage] : undefined,
    },
  }
}

/**
 * Lightweight markdown-ish renderer (safe enough for your own content).
 * Keeps it simple + consistent with your design system.
 * If you want a real markdown pipeline later, swap this for remark/rehype.
 */
function parseMarkdown(text: string): string {
  // Escape ONLY what we need (you control content, so we keep it light)
  const t = text.replace(/\r\n/g, '\n')

  // Headings
  let html = t
    .replace(/^### (.+)$/gm, '<h3 class="font-sans font-semibold text-base text-ice mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-sans font-bold text-xl text-ice mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-sans font-bold text-3xl text-ice mt-8 mb-4">$1</h1>')

  // Bold / italic / inline code / links
  html = html
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-ice font-semibold">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="font-mono text-xs bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[#FF8C3A]">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#FF6B00] hover:text-[#FF8C3A] transition-colors underline underline-offset-2" target="_blank" rel="noreferrer">$1</a>')

  // Blockquote
  html = html.replace(
    /^> (.+)$/gm,
    '<blockquote class="border-l-2 border-[#FF6B00]/50 pl-4 italic text-gray-400 my-4">$1</blockquote>'
  )

  // Unordered lists (simple)
  // Convert lines starting with "- " into list items; then wrap consecutive <li> blocks into <ul>
  html = html.replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-gray-400 font-body text-sm mb-2"><span class="text-[#FF6B00] mt-1.5 flex-shrink-0">•</span>$1</li>')
  html = html.replace(/(?:<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul class="my-4">${m}</ul>`)

  // Paragraphs: split by blank lines, wrap chunks that aren’t headings/lists/blockquote already.
  const blocks = html.split(/\n{2,}/g).map((b) => b.trim()).filter(Boolean)
  html = blocks
    .map((b) => {
      const isBlock =
        b.startsWith('<h1') ||
        b.startsWith('<h2') ||
        b.startsWith('<h3') ||
        b.startsWith('<ul') ||
        b.startsWith('<blockquote')

      if (isBlock) return b

      // light italic (after other replacements) – keep last to avoid messing with tags
      const withItalic = b.replace(/\*(.+?)\*/g, '<em>$1</em>')

      return `<p class="text-gray-400 font-body text-sm leading-relaxed my-4">${withItalic}</p>`
    })
    .join('\n')

  return html
}

const SALES_EMAIL = 'contact@presencapro.com'
const SALES_MAILTO =
  `mailto:${SALES_EMAIL}` +
  `?subject=${encodeURIComponent('Website request — PresençaPro')}` +
  `&body=${encodeURIComponent(
    'Hi PresençaPro,\n\nI’d like to request a professional website.\n\nBusiness name:\nCountry/City:\nIndustry:\nGoal (leads/bookings/sales):\nTimeline:\n\nThanks!'
  )}`

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2)

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-gray-600 mb-8">
            <Link href="/" className="hover:text-gray-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-400 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-500 truncate">{post.title}</span>
          </nav>

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-ice transition-colors font-body mb-8 group"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            Back to blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((t) => (
              <span key={t} className="badge">
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-ice leading-tight mb-5">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-mono mb-10 pb-8 border-b border-white/5">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {post.readingTime} min read
            </span>
            <span>by {post.author}</span>
          </div>

          {/* Content */}
          <article
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
          />

          {/* In-article CTA */}
          <div className="mt-12 p-7 rounded-2xl glass border border-[#FF6B00]/15 text-center">
            <h3 className="font-sans font-bold text-lg text-ice mb-2">
              Want a website like this?
            </h3>
            <p className="text-gray-400 font-body text-sm mb-5">
              Managed hosting + domain included. Built for performance, SEO and conversions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/plans" className="btn-primary text-sm py-2.5 px-6">
                View plans <ArrowRight size={14} />
              </Link>

              <a href={SALES_MAILTO} className="btn-secondary text-sm py-2.5 px-6">
                Request by email
              </a>
            </div>

            <p className="mt-4 text-xs text-gray-600 font-mono">
              Typical delivery: up to 72 hours after onboarding is complete.
            </p>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="font-sans font-bold text-xl text-ice mb-6">
                Related articles
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                    <div className="card group-hover:border-[#FF6B00]/25">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {p.tags.map((t) => (
                          <span key={t} className="badge text-xs">
                            {t}
                          </span>
                        ))}
                      </div>

                      <h4 className="font-sans font-semibold text-sm text-ice group-hover:text-[#FF8C3A] transition-colors mb-2">
                        {p.title}
                      </h4>

                      <div className="flex items-center gap-1 text-xs text-gray-600 font-mono">
                        <Clock size={11} /> {p.readingTime} min
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}