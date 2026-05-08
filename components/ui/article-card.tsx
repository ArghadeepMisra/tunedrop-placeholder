import { Calendar, Clock } from "lucide-react";
import type { Article } from "@/lib/articles";

export default function ArticleCard({ article }: { article: Article }) {
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
