/**
 * Renders a schema.org block. Kept in one place so every page emits structured
 * data the same way, and so the JSON is serialized once with `<` escaped,
 * otherwise a `</script>` inside any content string would close the tag early.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
