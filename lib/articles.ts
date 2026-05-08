import "server-only";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  formattedDate: string;
  author: string;
  readTime: number;
  tags: string[];
  coverImage?: string;
}

const dateFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", dateFormat);
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";
// NOTE: NEXT_PUBLIC_ prefix inlines this value into client JS bundles.
// Keep API_BASE restricted to public-facing URLs only.
// For authenticated backends, use server-side-only env vars (no NEXT_PUBLIC_ prefix).

// TODO: Add rate limiting to article listing endpoint when backend goes live.
// Infinite pagination without rate limits enables scraping.

async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data as T;
  } catch (err) {
    console.error("fetchJSON error:", err);
    return null;
  }
}

function hydrate(article: Article): Article {
  return { ...article, formattedDate: fmtDate(article.publishedAt) };
}

export async function getAllArticles(page = 1, limit = 10): Promise<Article[]> {
  const safeLimit = Math.min(Math.max(1, limit), 100);
  const safePage = Math.max(1, page);
  const params = new URLSearchParams({ page: String(safePage), limit: String(safeLimit) });
  const articles = await fetchJSON<Article[]>(`/articles?${params}`);
  if (!articles) return [];
  return articles.map(hydrate);
}

export function parsePageParam(pageParam: string | undefined): number {
  const pageNum = parseInt(pageParam ?? "1", 10);
  return Math.max(1, Number.isNaN(pageNum) ? 1 : pageNum);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const safeSlug = slug.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 200);
  const article = await fetchJSON<Article>(`/articles/${safeSlug}`);
  if (!article) return null;
  return hydrate(article);
}
