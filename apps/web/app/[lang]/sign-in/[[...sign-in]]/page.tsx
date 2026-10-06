import { SignIn } from "@clerk/nextjs"

import { Container } from "@/components/grid-container"

export default function SignInPage() {
  return (
    <main>
    <Container innerClassName="grid min-h-[75vh] place-items-center px-6 py-16">
      <SignIn />
    </Container>
    </main>
  )
}
