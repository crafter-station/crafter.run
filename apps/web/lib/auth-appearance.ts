// The Clerk widget without its own card, header or footer: the page supplies the title and the
// switch link, and every color reads the theme variables so it follows light and dark.
export const authAppearance = {
  elements: {
    rootBox: "w-full",
    cardBox: { width: "100%", maxWidth: "none", border: "none", boxShadow: "none", backgroundColor: "transparent", borderRadius: "0" },
    card: { width: "100%", maxWidth: "none", padding: "0", gap: "20px", backgroundColor: "transparent", boxShadow: "none", border: "none" },
    main: { width: "100%" },
    header: { display: "none" },
    footer: { display: "none" },
    socialButtonsBlockButton:
      "h-11 rounded-md border border-line bg-transparent text-foreground shadow-none transition-colors hover:bg-muted",
    socialButtonsBlockButtonText: "text-[15px] font-medium",
    dividerLine: "bg-line",
    dividerText: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
    formFieldLabel: "text-sm font-medium text-foreground",
    formFieldInput: "h-11 rounded-md border-line bg-transparent text-[15px] shadow-none focus:border-foreground",
    formButtonPrimary:
      "h-11 rounded-md bg-foreground text-[15px] font-medium normal-case text-background shadow-none transition-opacity hover:opacity-90",
    buttonArrowIcon: { display: "none" },
    footerActionLink: "text-foreground underline underline-offset-4",
    identityPreviewEditButton: "text-foreground",
  },
} as const
