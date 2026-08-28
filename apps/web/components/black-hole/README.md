# Black hole

Vendored from [`vercel-labs/vgpu`][repo], `apps/docs/examples/optimized-black-hole`,
under the MIT license kept alongside it in `LICENSE`. Only the browser half is
here: the example's tests, thumbnail renderer, and `meta.ts` stayed upstream.

A multi-pass renderer that bakes the relativistic ray traversal once into a
G-buffer, then reuses it every frame for the accretion disk, stars,
antialiasing, and HDR bloom. `renderer.ts` owns the browser lifecycle,
`pipeline.ts` builds the passes, and the `.wgsl` files are a module graph
resolved at build time by the loader declared in `next.config.mjs`.

Local changes are marked `crafter:` in a comment. Keep them few and obvious, so
pulling a newer upstream revision stays a diff rather than an archaeology
exercise.

[repo]: https://github.com/vercel-labs/vgpu
