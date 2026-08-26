/**
 * Syntax palette for blog snippets.
 *
 * A hand-written theme rather than one of Shiki's bundled ones. The bundled
 * themes are tuned for an editor: a dozen hues carrying information a reader
 * of prose does not need, on a canvas colour that fights the page. This spends
 * colour on the five distinctions that help someone skim a snippet inside an
 * article (keyword, literal, call, key, comment) and leaves everything else at
 * body colour.
 *
 * Two themes because they are compiled into the markup at build time: mdx.tsx
 * emits both as custom properties and `.blog-body` in globals.css picks the
 * side matching the active theme, so no highlighter ships to the browser.
 */
import type { ThemeRegistrationRaw } from "shiki"

type Palette = {
  /** Identifiers, operators, punctuation: everything with no special meaning. */
  fg: string
  comment: string
  keyword: string
  /** String and numeric literals, and type names, which read as constants. */
  literal: string
  /** Called functions, which is what the eye looks for first in a sample. */
  call: string
  /** Object keys and properties: the names a reader copies into their code. */
  property: string
}

const LIGHT: Palette = {
  fg: "#141414",
  comment: "#6b6b6b",
  keyword: "#a8104f",
  literal: "#0f6b2f",
  call: "#6a1fb0",
  property: "#b3261e",
}

const DARK: Palette = {
  fg: "#f5f5f5",
  comment: "#8f8f8f",
  keyword: "#ff6b9d",
  literal: "#5fd383",
  call: "#c79bff",
  property: "#ff7b7b",
}

function build(name: string, type: "light" | "dark", p: Palette): ThemeRegistrationRaw {
  return {
    name,
    type,
    colors: {
      // Transparent: the <pre> owns its background so the block matches the
      // page. A theme that paints its own canvas would reintroduce the card.
      "editor.background": "#00000000",
      "editor.foreground": p.fg,
    },
    settings: [
      { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: p.comment } },
      {
        scope: [
          "keyword",
          "keyword.control",
          "storage",
          "storage.type",
          "storage.modifier",
          "variable.language",
          "keyword.operator.new",
          "keyword.operator.expression",
        ],
        settings: { foreground: p.keyword },
      },
      {
        scope: [
          "string",
          "string.quoted",
          "punctuation.definition.string",
          "constant.numeric",
          "constant.language",
          "constant.character",
          "entity.name.type",
          "entity.name.class",
          "entity.name.tag",
          "support.class",
          "support.type",
        ],
        settings: { foreground: p.literal },
      },
      {
        scope: ["entity.name.function", "support.function", "meta.function-call"],
        settings: { foreground: p.call },
      },
      {
        scope: [
          "variable.other.property",
          "meta.object-literal.key",
          "support.type.property-name",
          "entity.other.attribute-name",
        ],
        settings: { foreground: p.property },
      },
      // Punctuation and operators explicitly back to body colour: several
      // grammars scope them under a parent that would otherwise tint them.
      {
        scope: ["punctuation", "keyword.operator", "meta.brace"],
        settings: { foreground: p.fg },
      },
    ],
  }
}

export const CODE_THEME = {
  light: build("crafter-light", "light", LIGHT),
  dark: build("crafter-dark", "dark", DARK),
}
