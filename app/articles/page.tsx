import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getAllArticles, type Article } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Read Articles Till Release | Tunedrop",
  description:
    "Music stories, artist interviews, and playlist deep dives. Coming soon to tunedrop.org.",
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 hover:border-brand/30 transition-colors duration-150 group">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 via-transparent to-brand-darker/5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none" />

      <div className="relative">
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] uppercase tracking-wider bg-brand/10 text-brand-light border border-brand/20 rounded-full px-2.5 py-0.5 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-brand-light transition-colors duration-150">
          {article.title}
        </h3>

        <p className="text-white/50 leading-relaxed mb-4">{article.excerpt}</p>

        <div className="flex items-center gap-4 text-white/30 text-sm">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {article.formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime} min read
          </span>
        </div>
      </div>
    </article>
  );
}

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <main className="bg-neutral-950 text-white w-full min-h-screen">
      <header className="px-6 md:px-12 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-brand transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8 pb-24">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
          Read Articles{" "}
          <span className="text-brand">Till Release.</span>
        </h1>
        <p className="text-lg text-white/50 leading-relaxed mb-12 max-w-2xl">
          Music stories, artist interviews, and playlist deep dives. Stay tuned
          as we build the feed.
        </p>

        {articles.length > 0 ? (
          <>
            <div className="flex flex-col gap-6">
              {articles.map((article) => (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="block">
                  <ArticleCard article={article} />
                </Link>
              ))}
            </div>

            <div className="mt-16 flex items-center justify-center gap-2">
              <button
                disabled
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/30 text-sm font-medium cursor-not-allowed"
              >
                Previous
              </button>
              <button className="px-4 py-2 rounded-xl border border-brand/40 bg-brand/10 text-brand-light text-sm font-medium">
                1
              </button>
              <button className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-colors text-sm font-medium">
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
            <p className="text-white/30 text-base mb-2">No articles yet.</p>
            <p className="text-white/20 text-sm">
              Articles will appear here once the backend is connected.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-white/30 text-sm">
          <span>© 2026 Tunedrop</span>
          <Link href="/" className="hover:text-brand transition-colors">
            tunedrop.org
          </Link>
        </div>
      </div>
    </main>
  );
}
