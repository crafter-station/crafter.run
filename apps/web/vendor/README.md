`makeables-renderer.js` is a browser bundle of `renderDesignFace` and `designImageUrls` from crafter-station/makeables, built from origin/main e2dbf8d:

```bash
cd makeables && pnpm install --frozen-lockfile && pnpm build:packages
printf "export { renderDesignFace } from \"./packages/renderer/src/face.ts\"\nexport { designImageUrls } from \"./packages/renderer/src/design-assets.ts\"\n" > entry.ts
cd packages/renderer && bun build ../../entry.ts --target=browser --format=esm --minify --conditions=makeables-source --external react --external react-dom --outfile makeables-renderer.js
```

Replace it with the npm package once makeables exports the renderer as a library.
