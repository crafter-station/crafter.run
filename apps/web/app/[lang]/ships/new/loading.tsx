import { Container } from "@/components/grid-container"
import { FormPageSkeleton } from "@/components/onboarding/form-page-skeleton"

export default function Loading() {
  return (
    <main className="flex-1">
      <Container innerClassName="station-form-page">
        <FormPageSkeleton withHeader variant="ship" />
      </Container>
    </main>
  )
}
