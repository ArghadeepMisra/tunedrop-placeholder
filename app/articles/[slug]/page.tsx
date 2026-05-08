import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug } from "@/lib/articles";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article | Tunedrop" };
  }

  return {
    title: `${article.title} | Tunedrop`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return (
    <main className="bg-neutral-950 text-white w-full min-h-screen">
      <header className="px-6 md:px-12 py-6">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-white/40 hover:text-brand transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to articles
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-8 pb-24">
        {article ? (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] uppercase tracking-wider bg-brand/10 text-brand-light border border-brand/20 rounded-full px-2.5 py-0.5 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-white/40 text-sm mb-12 pb-12 border-b border-white/10">
              <span>{article.author}</span>
              <span>&bull;</span>
              <span>{article.formattedDate}</span>
              <span>&bull;</span>
              <span>{article.readTime} min read</span>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-white/60 leading-relaxed text-lg">
                {article.content}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Coming Soon.
            </h1>
            <p className="text-lg text-white/50 mb-8">
              This article hasn&apos;t been published yet. Check back later!
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand/30 bg-white/5 backdrop-blur-sm text-white hover:bg-brand/10 hover:border-brand/50 hover:shadow-[0_0_30px_rgba(24,119,242,0.3)] transition-all duration-150"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse all articles
            </Link>
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
