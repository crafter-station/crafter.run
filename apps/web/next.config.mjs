import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@crafter/contracts", "@crafter/db"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["dev.cueva.io"],
  experimental: {
    // The root layout is `app/[lang]/layout.tsx`, a top-level dynamic segment,
    // so an unmatched URL has no locale to render inside. `global-not-found`
    // is Next's convention for exactly that shape; see app/global-not-found.tsx.
    globalNotFound: true,
  },
  // The App Router will not route a directory whose name starts with a dot, so
  // the well-known documents are built under /well-known and surfaced at their
  // real path here. Rewrites are named one by one rather than wildcarded, so
  // nothing else under /.well-known (Clerk, Vercel, domain verification) is
  // swallowed by this app.
  // Blog posts are read from disk at build time by pages and route handlers;
  // the tracer only follows imports, so the content itself has to be declared.
  outputFileTracingIncludes: {
    "/**": ["./content/blog/**/*"],
  },
  async rewrites() {
    return [
      { source: "/.well-known/mcp.json", destination: "/well-known/mcp.json" },
      { source: "/.well-known/ai-plugin.json", destination: "/well-known/ai-plugin.json" },
      // The blog's `.md` twin: a reader or an agent appends the suffix to a
      // post URL and gets its markdown. A rewrite, not a redirect, so the twin
      // keeps the post's own address shape. `sitemap` is excluded because
      // /blog/sitemap.md is its own route, and lib/blog.ts refuses the slug.
      {
        source: "/:lang(en|es|pt|zh|ja)/blog/:slug((?!sitemap\\.md)[a-z0-9][a-z0-9-]*).md",
        destination: "/:lang/blog/md/:slug",
      },
      // Feed aliases. The canonical feed is /:lang/blog/rss.xml; these are the
      // paths people actually guess. All end in a dot extension, which keeps
      // them outside proxy.ts's locale redirect.
      { source: "/blog/rss.xml", destination: "/en/blog/rss.xml" },
      { source: "/blog/feed.xml", destination: "/en/blog/rss.xml" },
      { source: "/blog/atom.xml", destination: "/en/blog/rss.xml" },
      { source: "/:lang(en|es|pt|zh|ja)/blog/feed.xml", destination: "/:lang/blog/rss.xml" },
      { source: "/:lang(en|es|pt|zh|ja)/blog/atom.xml", destination: "/:lang/blog/rss.xml" },
      // Same for the agent index, so /blog/sitemap.md works unprefixed.
      { source: "/blog/sitemap.md", destination: "/en/blog/sitemap.md" },
    ];
  },
  async redirects() {
    return [
      {
        source: "/vibe",
        destination: "https://luma.com/71j27cvx",
        permanent: true,
      },
      {
        source: "/seals",
        destination: "https://www.techseals.nl/eventperu",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/oss",
        permanent: true,
      },
      {
        source: "/:lang(en|es|pt|zh|ja)/projects",
        destination: "/:lang/oss",
        permanent: true,
      },
    ];
  },
};

export default withMDX(withNextIntl(nextConfig));
