import { Heart, MessageCircle, Share2, Music } from "lucide-react";

export default function PlaylistCard({ className = "" }: { className?: string }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden border border-brand/20 bg-white/5 backdrop-blur-sm p-5 w-full max-w-md shadow-[0_0_50px_rgba(24,119,242,0.12)] ${className}`}>
      {/* gradient glow border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/10 via-transparent to-brand-darker/10 pointer-events-none" />

      {/* Cover art placeholder */}
      <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-brand-dark via-brand to-brand-darker mb-3 flex items-center justify-center">
        <Music className="w-20 h-20 text-white/30" />
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-bold text-white text-lg leading-tight">Chill Night</p>
          <p className="text-white/40 text-sm mt-0.5">by @mira · 12 songs</p>
        </div>
        <span className="text-xs bg-brand/20 text-brand-light border border-brand/30 rounded-full px-2 py-0.5 font-medium">
          Playlist
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-3 text-white/40">
        <button
          className="flex items-center gap-1.5 hover:text-brand transition-colors text-sm"
          aria-label="Like playlist"
        >
          <Heart className="w-4 h-4" /> 148
        </button>
        <button
          className="flex items-center gap-1.5 hover:text-brand transition-colors text-sm"
          aria-label="Comment on playlist"
        >
          <MessageCircle className="w-4 h-4" /> 23
        </button>
        <button
          className="flex items-center gap-1.5 hover:text-brand transition-colors text-sm ml-auto"
          aria-label="Share playlist"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
