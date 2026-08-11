import sharp from "sharp";
import { writeFileSync, copyFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");
const PUBLIC = join(ROOT, "public");
const APP = join(ROOT, "app");

// Brand constants
const BG = "#050505";
const ACCENT = "#F8BC31";
const FG = "#F5F5F5";
const FG_DIM = "#666666";

// Crafter Station logo SVG path
const LOGO_PATH =
  "M116.419 16.3268C109.59 11.5679 97.9222 5.96914 90.2388 3.72965C72.8798 -1.58913 59.1794 1.40491 50.114 4.56947C32.4704 10.7281 21.3721 18.8462 11.412 33.6828C-4.23949 56.6375 -1.96292 93.869 17.1035 114.864C21.3721 119.903 23.6487 119.063 40.1539 107.026C40.723 106.466 38.4465 102.827 35.0316 98.6278C27.3481 89.11 22.7949 71.754 25.0715 61.9563C32.4704 31.1634 70.3187 14.6472 94.7919 31.4433C100.199 35.0825 117.273 50.199 132.64 65.0356C155.691 86.8706 162.52 91.9094 168.212 91.3496C173.903 90.7897 175.895 88.8301 176.464 82.6715C177.318 75.9531 174.757 72.034 161.667 60.2767C152.845 52.1585 145.731 44.8802 145.731 43.4805C145.731 42.3608 151.707 37.6019 159.105 33.1229C206.914 3.1698 258.421 62.7961 218.581 101.987C213.459 107.026 204.353 112.345 198.377 114.024C191.547 115.704 159.959 117.104 120.688 117.104C47.2683 117.104 43.2842 117.943 23.9332 135.02C-0.824636 157.134 -6.51609 194.926 10.8429 222.359C33.3241 258.191 81.7016 267.149 115.85 241.675L128.372 232.157L142.885 241.675C166.504 257.351 185.571 260.431 208.621 252.872C254.722 237.476 271.796 179.809 241.916 141.178C238.501 136.979 236.794 136.699 232.241 138.939C218.297 146.777 218.581 146.217 226.834 163.013C233.094 175.89 234.233 180.929 232.81 190.727C228.826 215.361 210.044 231.877 186.14 231.877C167.643 231.877 161.667 228.238 127.518 195.486C109.59 178.689 93.0845 164.693 90.8079 164.693C86.5393 164.693 77.433 173.371 77.433 177.57C77.433 178.689 85.1165 187.647 94.7919 197.165L112.151 214.241L101.906 222.08C65.7655 249.233 14.2578 216.761 26.2098 174.211C29.9093 161.333 42.9996 147.057 55.5209 142.578C60.3586 140.618 90.2388 139.498 130.648 139.498C204.922 139.498 213.744 138.099 230.818 123.542C281.757 80.9919 252.161 0.930299 185.571 1.21023C166.22 1.21023 155.691 5.12933 137.762 18.2863L128.656 25.0048L116.419 16.3268Z";

function logoSvg(size: number, color: string): Buffer {
  return Buffer.from(`<svg width="${size}" height="${size}" viewBox="0 0 257 257" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="${LOGO_PATH}" fill="${color}"/>
  </svg>`);
}

async function generateOG(
  width: number,
  height: number,
  filename: string
): Promise<void> {
  // Load and process cat poster as background
  const catBg = await sharp(join(PUBLIC, "effecto-poster-original.jpg"))
    .resize(width, height, { fit: "cover" })
    .modulate({ brightness: 0.35, saturation: 0.6 })
    .blur(2)
    .toBuffer();

  // Dark gradient overlay (bottom heavy for text area)
  const gradientOverlay = Buffer.from(`<svg width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${BG}" stop-opacity="0.7"/>
        <stop offset="40%" stop-color="${BG}" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="${BG}" stop-opacity="0.9"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g)"/>
  </svg>`);

  // Logo icon
  const logoSize = 64;
  const logoIcon = logoSvg(logoSize, ACCENT);

  // Text elements
  const textSvg = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&amp;family=JetBrains+Mono:wght@400&amp;display=swap');
    </style>

    <!-- "by crafter station" label -->
    <text x="${width / 2}" y="${height / 2 - 20}"
      font-family="monospace" font-size="14" font-weight="400"
      letter-spacing="6" fill="${FG_DIM}" text-anchor="middle"
      text-transform="uppercase">BY CRAFTER STATION</text>

    <!-- "crafter.run" title -->
    <text x="${width / 2}" y="${height / 2 + 50}"
      font-family="sans-serif" font-size="72" font-weight="700"
      letter-spacing="-3" fill="${FG}" text-anchor="middle">crafter<tspan fill="${ACCENT}">.</tspan>run</text>

    <!-- Tagline -->
    <text x="${width / 2}" y="${height / 2 + 95}"
      font-family="monospace" font-size="16" font-weight="400"
      fill="${FG_DIM}" text-anchor="middle">Visual references &amp; open source projects</text>

    <!-- Subtle border -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="0"
      fill="none" stroke="${FG}" stroke-opacity="0.06" stroke-width="1"/>
  </svg>`);

  const result = await sharp(catBg)
    .composite([
      { input: gradientOverlay, blend: "over" },
      {
        input: logoIcon,
        top: Math.round(height / 2 - 95),
        left: Math.round(width / 2 - logoSize / 2),
        blend: "over",
      },
      { input: textSvg, blend: "over" },
    ])
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(join(PUBLIC, filename));

  console.log(`  ${filename}: ${(result.size / 1024).toFixed(0)}KB`);
}

async function generateFavicon(): Promise<void> {
  const sizes = [16, 32, 48];
  const pngs: Buffer[] = [];

  for (const size of sizes) {
    const padding = Math.round(size * 0.1);
    const iconSize = size - padding * 2;

    const icon = await sharp(logoSvg(iconSize, ACCENT))
      .resize(iconSize, iconSize)
      .toBuffer();

    const png = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 5, g: 5, b: 5, alpha: 1 },
      },
    })
      .composite([{ input: icon, top: padding, left: padding }])
      .png()
      .toBuffer();

    pngs.push(png);
  }

  // Build ICO file manually (ICO format)
  const iconDir = Buffer.alloc(6 + sizes.length * 16);
  iconDir.writeUInt16LE(0, 0); // reserved
  iconDir.writeUInt16LE(1, 2); // type: icon
  iconDir.writeUInt16LE(sizes.length, 4); // count

  let dataOffset = 6 + sizes.length * 16;
  const dataBuffers: Buffer[] = [];

  for (let i = 0; i < sizes.length; i++) {
    const png = pngs[i];
    const size = sizes[i];
    const entryOffset = 6 + i * 16;

    iconDir.writeUInt8(size < 256 ? size : 0, entryOffset); // width
    iconDir.writeUInt8(size < 256 ? size : 0, entryOffset + 1); // height
    iconDir.writeUInt8(0, entryOffset + 2); // color palette
    iconDir.writeUInt8(0, entryOffset + 3); // reserved
    iconDir.writeUInt16LE(1, entryOffset + 4); // color planes
    iconDir.writeUInt16LE(32, entryOffset + 6); // bits per pixel
    iconDir.writeUInt32LE(png.length, entryOffset + 8); // data size
    iconDir.writeUInt32LE(dataOffset, entryOffset + 12); // data offset

    dataBuffers.push(png);
    dataOffset += png.length;
  }

  const ico = Buffer.concat([iconDir, ...dataBuffers]);
  writeFileSync(join(PUBLIC, "favicon.ico"), ico);
  // Next.js convention: app/favicon.ico is auto-detected
  copyFileSync(join(PUBLIC, "favicon.ico"), join(APP, "favicon.ico"));
  console.log(`  favicon.ico: ${(ico.length / 1024).toFixed(1)}KB (${sizes.join(", ")}px)`);
}

async function generateAppleTouchIcon(): Promise<void> {
  const size = 180;
  const padding = Math.round(size * 0.15);
  const iconSize = size - padding * 2;

  const icon = await sharp(logoSvg(iconSize, ACCENT))
    .resize(iconSize, iconSize)
    .toBuffer();

  const result = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 5, g: 5, b: 5, alpha: 1 },
    },
  })
    .composite([{ input: icon, top: padding, left: padding }])
    .png()
    .toFile(join(PUBLIC, "apple-touch-icon.png"));

  console.log(`  apple-touch-icon.png: ${(result.size / 1024).toFixed(1)}KB (180px)`);
}

async function generateIcon192(): Promise<void> {
  const size = 192;
  const padding = Math.round(size * 0.15);
  const iconSize = size - padding * 2;

  const icon = await sharp(logoSvg(iconSize, ACCENT))
    .resize(iconSize, iconSize)
    .toBuffer();

  const result = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 5, g: 5, b: 5, alpha: 1 },
    },
  })
    .composite([{ input: icon, top: padding, left: padding }])
    .png()
    .toFile(join(PUBLIC, "icon-192.png"));

  // Also copy to app/ for Next.js convention
  copyFileSync(join(PUBLIC, "icon-192.png"), join(APP, "icon.png"));
  console.log(`  icon-192.png: ${(result.size / 1024).toFixed(1)}KB (192px)`);
}

async function main() {
  console.log("Generating brand assets...\n");

  console.log("OG Images:");
  await generateOG(1200, 630, "og.png");
  await generateOG(1200, 600, "og-twitter.png");

  console.log("\nFavicon:");
  await generateFavicon();

  console.log("\nIcons:");
  await generateAppleTouchIcon();
  await generateIcon192();

  console.log("\nDone!");
}

main().catch(console.error);
