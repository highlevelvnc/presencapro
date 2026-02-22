import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on websites, SEO and conversion for businesses in Portugal and the EU.',
}

export default function BlogIndexPage() {
  const posts = (blogPosts ?? []).slice().sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="label-tag mb-4 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            Insights
          </div>

          <h1 className="font-sans font-bold text-5xl md:text-6xl mb-4 tracking-tight">
            PresençaPro <span className="text-gradient">Blog</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-body">
            Practical articles on performance, SEO and conversion — made for EU local businesses.
          </p>
        </div>

        {/* Empty state (NO 404) */}
        {posts.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center card p-10">
            <h2 className="font-sans font-bold text-xl text-ice mb-2">Coming soon</h2>
            <p className="text-gray-400 font-body text-sm">
              We’re preparing the first articles. In the meantime, check our plans or request a proposal.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/plans" className="btn-primary text-sm py-2.5 px-6">
                View plans <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="btn-secondary text-sm py-2.5 px-6">
                Contact us
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 group">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.slice(0, 3).map((t: string) => (
                    <span key={t} className="badge text-xs">{t}</span>
                  ))}
                </div>

                <h2 className="font-sans font-semibold text-ice group-hover:text-[#FF8C3A] transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-500 font-body text-sm mt-2 line-clamp-3">
                  {post.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-600 font-mono">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(post.date)}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readingTime} min</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}