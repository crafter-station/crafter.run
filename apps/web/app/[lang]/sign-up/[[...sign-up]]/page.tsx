import { SignUp } from "@clerk/nextjs"

import { Container } from "@/components/grid-container"

export default function SignUpPage() {
  return (
    <main>
    <Container innerClassName="grid min-h-[75vh] place-items-center px-6 py-16">
      <SignUp />
    </Container>
    </main>
  )
}
