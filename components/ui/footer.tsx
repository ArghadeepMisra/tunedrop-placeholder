import Link from "next/link";

export default function Footer() {
  return (
    <div className="border-t border-white/10 px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between text-white/30 text-sm">
        <span>© 2026 Tunedrop</span>
        <Link href="/" className="hover:text-brand transition-colors">
          tunedrop.org
        </Link>
      </div>
    </div>
  );
}
