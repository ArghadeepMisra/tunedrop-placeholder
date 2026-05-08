import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

function mockFetchResponse(body: unknown, ok = true, status = 200) {
  mockFetch.mockResolvedValueOnce({
    ok,
    status,
    json: async () => (typeof body === "string" ? JSON.parse(body) : body),
  } as Response);
}

function mockFetchReject() {
  mockFetch.mockRejectedValueOnce(new Error("Network error"));
}

function mockFetchInvalidJSON() {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => {
      throw new Error("Unexpected token");
    },
  } as unknown as Response);
}

// Dynamic import after mocks are set up
async function importModule() {
  return await import("@/lib/articles");
}

describe("lib/articles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchJSON", () => {
    it("test #3: successful response returns parsed JSON", async () => {
      const testData = [{ slug: "test", title: "Test" }];
      mockFetchResponse(testData);
      const { getAllArticles } = await importModule();
      const result = await getAllArticles(1, 10);
      expect(result).toBeDefined();
    });

    it("test #4: non-OK response returns empty array (via fetchJSON null)", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({}),
      } as Response);
      const { getAllArticles } = await importModule();
      const result = await getAllArticles();
      expect(result).toEqual([]);
    });

    it("test #5: network failure returns empty array", async () => {
      mockFetchReject();
      const { getAllArticles } = await importModule();
      const result = await getAllArticles();
      expect(result).toEqual([]);
    });

    it("test #6: invalid JSON body returns empty array", async () => {
      mockFetchInvalidJSON();
      const { getAllArticles } = await importModule();
      const result = await getAllArticles();
      expect(result).toEqual([]);
    });
  });

  describe("getAllArticles", () => {
    it("test #7: default params uses page=1&limit=10", async () => {
      mockFetchResponse([]);
      const { getAllArticles } = await importModule();
      await getAllArticles();
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain("page=1");
      expect(url).toContain("limit=10");
    });

    it("test #8: zero results returns empty array", async () => {
      // fetchJSON returns null when no body
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => null,
      } as Response);
      const { getAllArticles } = await importModule();
      const result = await getAllArticles();
      expect(result).toEqual([]);
    });

    it("test #9: custom page=3 limit=5 passes correct params", async () => {
      mockFetchResponse([]);
      const { getAllArticles } = await importModule();
      await getAllArticles(3, 5);
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain("page=3");
      expect(url).toContain("limit=5");
    });

    it("clamps limit above 100 to 100", async () => {
      mockFetchResponse([]);
      const { getAllArticles } = await importModule();
      await getAllArticles(1, 9999);
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain("limit=100");
    });

    it("clamps page below 1 to 1", async () => {
      mockFetchResponse([]);
      const { getAllArticles } = await importModule();
      await getAllArticles(-5, 10);
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain("page=1");
    });

    it("hydrates articles with formattedDate", async () => {
      const article = {
        slug: "test",
        title: "Test",
        excerpt: "Excerpt",
        content: "Content",
        publishedAt: "2026-03-15T12:00:00Z",
        formattedDate: "",
        author: "Author",
        readTime: 5,
        tags: ["music"],
      };
      mockFetchResponse([article]);
      const { getAllArticles } = await importModule();
      const result = await getAllArticles();
      expect(result[0].formattedDate).toBeTruthy();
      expect(result[0].formattedDate).not.toBe("");
    });
  });

  describe("getArticleBySlug", () => {
    it("test #10: found article returns hydrated data with formattedDate", async () => {
      const article = {
        slug: "test-post",
        title: "Test Post",
        excerpt: "An excerpt",
        content: "<p>Hello</p>",
        publishedAt: "2026-03-15T12:00:00Z",
        formattedDate: "",
        author: "Author",
        readTime: 5,
        tags: ["music"],
      };
      mockFetchResponse(article);
      const { getArticleBySlug } = await importModule();
      const result = await getArticleBySlug("test-post");
      expect(result).not.toBeNull();
      expect(result!.formattedDate).toBeTruthy();
      expect(result!.formattedDate).not.toBe("");
    });

    it("test #11: not found returns null", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({}),
      } as Response);
      const { getArticleBySlug } = await importModule();
      const result = await getArticleBySlug("non-existent");
      expect(result).toBeNull();
    });

    it("test #12: empty string slug is sanitized", async () => {
      mockFetchResponse(null);
      const { getArticleBySlug } = await importModule();
      await getArticleBySlug("");
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain("/articles/");
    });

    it("test #12b: special characters in slug are stripped", async () => {
      mockFetchResponse(null);
      const { getArticleBySlug } = await importModule();
      await getArticleBySlug("../etc/passwd");
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).not.toContain("..");
      expect(url).toContain("etcpasswd");
    });
  });

  describe("DOMPurify sanitization — test #22 (security)", () => {
    const ALLOWED_TAGS = ["p", "strong", "em", "a", "ul", "ol", "li", "blockquote", "h1", "h2", "h3", "h4", "pre", "code", "br", "hr", "img"];
    const ALLOWED_ATTR = ["href", "src", "alt", "title", "target", "rel"];
    const config = { ALLOWED_TAGS, ALLOWED_ATTR };

    it("strips XSS payloads from HTML content", async () => {
      const DOMPurify = (await import("isomorphic-dompurify")).default;

      const payloads = [
        '<p>Safe</p><script>alert("xss")</script>',
        '<img src=x onerror=alert(1)>',
        '<a href="javascript:alert(1)">click</a>',
        '<div onclick="steal()">text</div>',
        '<iframe src="https://evil.com"></iframe>',
      ];

      for (const payload of payloads) {
        const sanitized = DOMPurify.sanitize(payload, config);
        expect(sanitized).not.toContain("<script");
        expect(sanitized).not.toContain("onerror");
        expect(sanitized).not.toContain("javascript:");
        expect(sanitized).not.toContain("onclick");
        expect(sanitized).not.toContain("<iframe");
      }
    });

    it("preserves safe HTML tags", async () => {
      const DOMPurify = (await import("isomorphic-dompurify")).default;

      const safe = "<p>Hello</p><strong>Bold</strong><em>Italic</em><a href='https://tunedrop.org'>Link</a>";
      const sanitized = DOMPurify.sanitize(safe, config);

      expect(sanitized).toContain("<p>");
      expect(sanitized).toContain("<strong>");
      expect(sanitized).toContain("<em>");
      expect(sanitized).toContain("<a");
      expect(sanitized).toContain("tunedrop.org");
    });

    it("strips <style> and <svg> (not in allowlist)", async () => {
      const DOMPurify = (await import("isomorphic-dompurify")).default;

      const sanitized = DOMPurify.sanitize("<p>Text</p><style>body{color:red}</style><svg><circle/></svg>", config);

      expect(sanitized).toContain("<p>");
      expect(sanitized).not.toContain("<style");
      expect(sanitized).not.toContain("<svg");
    });
  });

  describe("fmtDate edge cases", () => {
    it("returns empty string for Invalid Date", async () => {
      const { getAllArticles } = await importModule();
      const article = {
        slug: "test", title: "T", excerpt: "E", content: "C",
        publishedAt: "not-a-date", formattedDate: "", author: "A",
        readTime: 1, tags: [],
      };
      mockFetchResponse([article]);
      const result = await getAllArticles();
      expect(result[0].formattedDate).toBe("");
    });

    it("handles epoch 0 date", async () => {
      const { getAllArticles } = await importModule();
      const article = {
        slug: "test", title: "T", excerpt: "E", content: "C",
        publishedAt: "1970-01-01T00:00:00Z", formattedDate: "", author: "A",
        readTime: 1, tags: [],
      };
      mockFetchResponse([article]);
      const result = await getAllArticles();
      expect(result[0].formattedDate).toBeTruthy();
      expect(result[0].formattedDate).not.toBe("");
    });
  });

  describe("fetchJSON timeout handling", () => {
    it("returns null on AbortError", async () => {
      mockFetch.mockRejectedValueOnce(new DOMException("Aborted", "AbortError"));
      const { getAllArticles } = await importModule();
      const result = await getAllArticles();
      expect(result).toEqual([]);
    });
  });
});
