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
  async redirects() {
    return [
      {
        source: "/vibe",
        destination: "https://luma.com/71j27cvx",
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
