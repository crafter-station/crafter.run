export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string } | null
  const email = body?.email?.trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 })
  }

  return new Response(null, { status: 204 })
}
