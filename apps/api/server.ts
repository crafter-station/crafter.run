import "hono"

// The build bundles workspace packages that Vercel's function tracer externalizes.
// @ts-expect-error The generated JavaScript bundle has no declaration file.
import app from "./dist/index.js"

export default app
