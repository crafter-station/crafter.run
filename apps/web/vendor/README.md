`makeables-renderer/` is a browser bundle of crafter-station/makeables `packages/renderer` (`renderDesignFace`, `designImageUrls`, `designAppearance`, `PrismBadge`, `defaultPrismAppearance`), built from origin/main e2dbf8d:

```bash
cd makeables && pnpm install --frozen-lockfile && pnpm build:packages
printf 'export { renderDesignFace, designImageUrls, PrismBadge, defaultPrismAppearance, designAppearance } from "./packages/renderer/dist/index.js"\n' > entry.ts
bun build entry.ts --target=browser --format=esm --minify --splitting --external react --external react-dom --external react/jsx-runtime --outdir out
mv out/entry.js out/index.js
```

The 3D badge loads `facets.bin.gz` from `public/events/hot-reload/badge/prism/`, copied from makeables `apps/web/public/prism/`.

Replace it with the npm package once makeables exports the renderer as a library.
