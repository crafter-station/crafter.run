import { SignUp } from "@clerk/nextjs"

import { Container } from "@/components/grid-container"

export default function SignUpPage() {
  return (
    <Container innerClassName="grid min-h-screen place-items-center px-6 py-16">
      <SignUp />
    </Container>
  )
}
