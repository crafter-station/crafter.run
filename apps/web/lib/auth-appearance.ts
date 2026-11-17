// Station styling for the Clerk widgets on the sign-in and sign-up pages. Everything reads the
// theme variables, so the widgets follow the light/dark switch without extra work.
export const authAppearance = {
  elements: {
    rootBox: "w-full",
    cardBox: { width: "100%", maxWidth: "none", borderRadius: "0.375rem", border: "1px solid hsl(var(--line))", boxShadow: "none", backgroundColor: "hsl(var(--card))" },
    card: "rounded-none bg-transparent shadow-none",
    headerTitle: "font-heading text-2xl tracking-tight",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton: "rounded-[3px] border-line bg-background shadow-none hover:bg-muted",
    formButtonPrimary: "rounded-[3px] bg-primary text-primary-foreground shadow-none hover:opacity-90",
    formFieldInput: "rounded-[3px] border-line bg-background shadow-none",
    footer: "bg-transparent",
    footerActionLink: "text-foreground underline underline-offset-4",
  },
} as const
