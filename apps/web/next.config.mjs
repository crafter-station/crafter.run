import { createRequire } from "node:module";
import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";

const require = createRequire(import.meta.url);
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const withMDX = createMDX();
const wgslLoader = require.resolve("@vgpu/wgsl/loader-webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@crafter/contracts", "@crafter/db"],
  // `components/black-hole` imports its shaders the way it imports modules:
  // `import bake from "./bake.wgsl"`, and those files import each other in
  // turn. This loader is what resolves that graph, strips the declarations
  // nothing reached, and hands back compiled WGSL source.
  turbopack: {
    rules: {
      "*.wgsl": {
        loaders: [wgslLoader],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    // Keep the optional Webpack development server compatible with the shaders.
    config.module.rules.push({ test: /\.wgsl$/, use: [wgslLoader] });
    return config;
  },
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
    "/og": [
      "./app/fonts/CrafterSansPreview-Medium.ttf",
      "./app/fonts/CrafterSansTextPreview-Regular.ttf",
      "./app/fonts/NotoSans*-Medium.woff",
      "./public/og/art/*.svg",
      "./public/og/blog/**/*",
      "./public/team/station-ink/*.webp",
      "./public/bounties/**/*",
    ],
  },
  async rewrites() {
    return [
      { source: "/design.md", destination: "https://ui.crafter.run/design.md" },
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
    // Keep the remaining shared links working after the October 2026
    // consolidation. The retired tool boards and /research have no successor.
    const consolidatedPages = [
      ["/team/work-with-us", "/contact"],
      ["/work-with-us", "/contact"],
      ["/projects/next", "/oss#contribute"],
      ["/hackathon", "/events"],
      ["/events-sponsors", "/events/sponsors"],
    ];
    return [
      ...consolidatedPages.flatMap(([source, destination]) => [
        { source, destination: `/en${destination}`, permanent: true },
        {
          source: `/:lang(en|es|pt|zh|ja)${source}`,
          destination: `/:lang${destination}`,
          permanent: true,
        },
      ]),
      { source: "/network", destination: "/universe", permanent: true },
      { source: "/:lang(en|es|pt|zh|ja)/network", destination: "/:lang/universe", permanent: true },
      { source: "/products", destination: "/universe", permanent: true },
      { source: "/:lang(en|es|pt|zh|ja)/products", destination: "/:lang/universe", permanent: true },
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
