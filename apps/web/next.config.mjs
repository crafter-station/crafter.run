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
  // The App Router will not route a directory whose name starts with a dot, so
  // the well-known documents are built under /well-known and surfaced at their
  // real path here. Rewrites are named one by one rather than wildcarded, so
  // nothing else under /.well-known (Clerk, Vercel, domain verification) is
  // swallowed by this app.
  async rewrites() {
    return [
      { source: "/.well-known/mcp.json", destination: "/well-known/mcp.json" },
      { source: "/.well-known/ai-plugin.json", destination: "/well-known/ai-plugin.json" },
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
