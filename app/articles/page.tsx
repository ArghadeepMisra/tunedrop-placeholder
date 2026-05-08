import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllArticles, parsePageParam } from "@/lib/articles";
import ArticleCard from "@/components/ui/article-card";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Read Articles Till Release | Tunedrop",
  description:
    "Music stories, artist interviews, and playlist deep dives. Coming soon to tunedrop.org.",
};

interface ArticlesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { page: pageParam } = await searchParams;
  const page = parsePageParam(pageParam);
  const limit = 10;
  const articles = await getAllArticles(page, limit);

  const hasNext = articles.length === limit;

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
              {page > 1 ? (
                <Link
                  href={`/articles?page=${page - 1}`}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-colors text-sm font-medium"
                >
                  Previous
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/30 text-sm font-medium cursor-not-allowed">
                  Previous
                </span>
              )}

              <span className="px-4 py-2 rounded-xl border border-brand/40 bg-brand/10 text-brand-light text-sm font-medium">
                {page}
              </span>

              {hasNext ? (
                <Link
                  href={`/articles?page=${page + 1}`}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-colors text-sm font-medium"
                >
                  Next
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/30 text-sm font-medium cursor-not-allowed">
                  Next
                </span>
              )}
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

      <Footer />
    </main>
  );
}
