import { SignIn } from "@clerk/nextjs"

import { Container } from "@/components/grid-container"

export default function SignInPage() {
  return (
    <Container innerClassName="grid min-h-screen place-items-center px-6 py-16">
      <SignIn />
    </Container>
  )
}
