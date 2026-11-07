/**
 * The `*.wgsl` rule in `next.config.mjs` turns a shader import into a compiled
 * source string. TypeScript has no idea that happens, so it is told here.
 */
declare module "*.wgsl" {
  const source: string
  export default source
}
