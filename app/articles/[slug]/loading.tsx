export default function ArticleLoading() {
  return (
    <main className="bg-neutral-950 text-white w-full min-h-screen">
      <header className="px-6 md:px-12 py-6">
        <div className="h-5 w-36 rounded bg-white/10 animate-pulse" />
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-8 pb-24">
        <div className="flex gap-2 mb-6">
          <div className="h-5 w-16 rounded-full bg-white/10 animate-pulse" />
          <div className="h-5 w-20 rounded-full bg-white/10 animate-pulse" />
        </div>

        <div className="h-10 w-full rounded-lg bg-white/5 animate-pulse mb-4" />
        <div className="h-10 w-3/4 rounded-lg bg-white/5 animate-pulse mb-6" />

        <div className="flex gap-4 mb-12">
          <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-28 rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="h-5 w-full rounded bg-white/5 animate-pulse" />
          <div className="h-5 w-full rounded bg-white/5 animate-pulse" />
          <div className="h-5 w-3/4 rounded bg-white/5 animate-pulse" />
          <div className="h-5 w-full rounded bg-white/5 animate-pulse" />
          <div className="h-5 w-1/2 rounded bg-white/5 animate-pulse" />
        </div>
      </div>
    </main>
  );
}
