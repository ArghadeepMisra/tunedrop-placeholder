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
  return new Date(iso).toLocaleDateString("en-US", dateFormat);
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data as T;
  } catch {
    return null;
  }
}

function hydrate(article: Article): Article {
  return { ...article, formattedDate: fmtDate(article.publishedAt) };
}

export async function getAllArticles(): Promise<Article[]> {
  const articles = await fetchJSON<Article[]>("/articles");
  if (!articles) return [];
  return articles.map(hydrate);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = await fetchJSON<Article>(`/articles/${slug}`);
  if (!article) return null;
  return hydrate(article);
}
