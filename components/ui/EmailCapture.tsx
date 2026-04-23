"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <p className="text-purple-400 font-medium text-base">
        You&apos;re on the list. 🎵
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500 transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {loading ? "Sending…" : "Notify me"}
      </button>
    </form>
  );
}
