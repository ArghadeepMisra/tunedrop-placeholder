import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import React from "react";
import { parsePageParam } from "@/lib/articles";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) =>
    React.createElement("a", { href, ...props }, children),
}));

vi.mock("lucide-react", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  const mockIcon = (name: string) => {
    const Icon = (props: Record<string, unknown>) =>
      React.createElement("span", { "data-icon": name, ...props });
    Icon.displayName = `Mock${name}`;
    return Icon;
  };

  const proxy = new Proxy(actual, {
    get(target, prop: string) {
      if (prop === "createLucideIcon") return target[prop];
      if (typeof target[prop] === "function") return target[prop];
      if (typeof prop === "string" && prop[0] === prop[0]?.toUpperCase?.()) {
        return mockIcon(prop);
      }
      return target[prop];
    },
  });
  return proxy;
});

const mockArticle = {
  slug: "test-post",
  title: "The Future of Music Streaming",
  excerpt: "How AI is changing the way we discover music.",
  content: "<p>Content here</p>",
  publishedAt: "2026-03-15T12:00:00Z",
  formattedDate: "Mar 15, 2026",
  author: "Author Name",
  readTime: 5,
  tags: ["music", "ai", "streaming"],
};

describe("ArticleCard", () => {
  it("test #13: renders all fields — tags, title, excerpt, date, readTime", async () => {
    const { default: ArticleCard } = await import("@/components/ui/article-card");
    render(React.createElement(ArticleCard, { article: mockArticle }));

    expect(screen.getByText("music")).toBeDefined();
    expect(screen.getByText("ai")).toBeDefined();
    expect(screen.getByText("streaming")).toBeDefined();
    expect(screen.getByText("The Future of Music Streaming")).toBeDefined();
    expect(screen.getByText("How AI is changing the way we discover music.")).toBeDefined();
    expect(screen.getByText("Mar 15, 2026")).toBeDefined();
    expect(screen.getByText("5 min read")).toBeDefined();
  });
});

describe("parsePageParam — tests #14-19", () => {
  it("test #14: page=1 returns 1", () => {
    expect(parsePageParam("1")).toBe(1);
  });

  it("test #15: page=3 returns 3 (middle page)", () => {
    expect(parsePageParam("3")).toBe(3);
  });

  it("test #16: page=10 returns 10 (valid high value)", () => {
    expect(parsePageParam("10")).toBe(10);
  });

  it("test #17: empty/undefined defaults to 1", () => {
    expect(parsePageParam(undefined)).toBe(1);
    expect(parsePageParam("")).toBe(1);
  });

  it("test #18: malformed params clamp to 1", () => {
    expect(parsePageParam("abc")).toBe(1);
    expect(parsePageParam("0")).toBe(1);
    expect(parsePageParam("-5")).toBe(1);
    expect(parsePageParam("1.5")).toBe(1);
    expect(parsePageParam("NaN")).toBe(1);
  });

  it("test #19: missing param (undefined) defaults to 1", () => {
    expect(parsePageParam(undefined)).toBe(1);
  });
});

describe("ArticlesError", () => {
  it("test #25: renders error message and Try Again button", async () => {
    const { default: ArticlesError } = await import("@/app/articles/error");
    const resetFn = vi.fn();
    render(React.createElement(ArticlesError, { error: new Error("fail"), reset: resetFn }));

    expect(screen.getByText("Something went wrong.")).toBeDefined();
    expect(screen.getByText("Try Again")).toBeDefined();
    expect(screen.getByText("Back to home")).toBeDefined();
  });

  it("test #26: Try Again calls reset()", async () => {
    const { default: ArticlesError } = await import("@/app/articles/error");
    const resetFn = vi.fn();
    render(React.createElement(ArticlesError, { error: new Error("fail"), reset: resetFn }));

    screen.getByText("Try Again").click();
    expect(resetFn).toHaveBeenCalledOnce();
  });
});

describe("ArticlesLoading", () => {
  it("test #27: renders skeleton cards with pulse animation", async () => {
    const { default: ArticlesLoading } = await import("@/app/articles/loading");
    const { container } = render(React.createElement(ArticlesLoading));

    expect(container.innerHTML.length).toBeGreaterThan(0);
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });
});

describe("Feature pages", () => {
  it("renders /features/feed page with back link and content", async () => {
    const { default: FeedPage } = await import("@/app/features/feed/page");
    const { container } = render(React.createElement(FeedPage));

    expect(container.textContent).toContain("Dynamic Feed");
    expect(screen.getByText("Back to home")).toBeDefined();
  });

  it("renders /features/post-types page with back link and content", async () => {
    const { default: PostTypesPage } = await import("@/app/features/post-types/page");
    const { container } = render(React.createElement(PostTypesPage));

    expect(container.textContent).toContain("Post");
    expect(screen.getByText("Back to home")).toBeDefined();
  });

  it("renders /features/sharing page with back link and content", async () => {
    const { default: SharingPage } = await import("@/app/features/sharing/page");
    const { container } = render(React.createElement(SharingPage));

    expect(container.textContent).toContain("Link Previews");
    expect(screen.getByText("Back to home")).toBeDefined();
  });
});
