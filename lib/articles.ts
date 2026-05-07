export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  readTime: number; // minutes
  tags: string[];
  coverImage?: string;
}

export const articles: Article[] = [
  {
    slug: "building-the-perfect-playlist",
    title: "Building the Perfect Playlist",
    excerpt:
      "A deep dive into the art and science of curating playlists that tell a story and keep listeners hooked from start to finish.",
    content: "Placeholder content for building the perfect playlist.",
    publishedAt: "2026-04-15",
    author: "Tunedrop Team",
    readTime: 6,
    tags: ["Playlists", "Curation", "Tips"],
  },
  {
    slug: "how-social-discovery-changed-music",
    title: "How Social Discovery Changed Music",
    excerpt:
      "From word-of-mouth to algorithmic feeds—exploring how we find new music in the age of social platforms.",
    content: "Placeholder content for social discovery article.",
    publishedAt: "2026-04-22",
    author: "Tunedrop Team",
    readTime: 8,
    tags: ["Discovery", "Social", "Industry"],
  },
  {
    slug: "interview-with-indie-artist-mira",
    title: "Interview with Indie Artist Mira",
    excerpt:
      "We sat down with Mira to talk about her creative process, favorite production tools, and the playlists that inspire her sound.",
    content: "Placeholder content for Mira interview.",
    publishedAt: "2026-05-01",
    author: "Tunedrop Team",
    readTime: 10,
    tags: ["Interview", "Indie", "Artist"],
  },
];

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
