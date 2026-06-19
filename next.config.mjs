import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ];
  },
};

export default withNextIntl(nextConfig);
