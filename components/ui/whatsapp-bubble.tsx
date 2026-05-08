import { Link } from "lucide-react";

export default function WhatsAppBubble({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 w-full max-w-lg ${className}`}>
      {/* Chat header */}
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-xs font-bold text-white">
          M
        </div>
        <span className="text-white/50 text-sm">mira sent a link</span>
      </div>

      {/* WhatsApp bubble */}
      <div className="bg-[#1f2c34] rounded-2xl rounded-tl-sm overflow-hidden w-full shadow-xl shadow-[0_0_40px_rgba(24,119,242,0.15)]">
        {/* Rich preview thumbnail */}
        <div className="w-full h-44 bg-gradient-to-br from-brand-dark via-brand to-brand-darker flex items-center justify-center relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative text-center">
            <div className="text-4xl mb-1">🎵</div>
            <p className="text-white/80 text-sm font-medium">Chill Night</p>
          </div>
        </div>

        {/* Link preview meta */}
        <div className="px-5 py-3.5 bg-[#182229]">
          <div className="flex items-center gap-1.5 text-brand text-[11px] mb-2">
            <Link className="w-3 h-3" />
            tunedrop.org
          </div>
          <p className="text-white text-base font-semibold leading-snug">
            Chill Night · 12 songs
          </p>
          <p className="text-white/40 text-sm mt-1">
            curated by @mira · Tunedrop
          </p>
        </div>

        {/* Timestamp */}
        <div className="px-5 py-3 bg-[#1f2c34]">
          <p className="text-white/25 text-xs text-right">11:42 PM ✓✓</p>
        </div>
      </div>
    </div>
  );
}
