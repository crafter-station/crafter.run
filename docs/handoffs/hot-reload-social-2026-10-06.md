# Hot Reload social previews · October 6, 2026

Hot Reload shipped after the editorial OG system. Its index, edition pages
and menu only set a title/description, so shared links inherited the home
image. They now use their own canonical, localized OG and Twitter metadata.

## Future editions

Add an entry to `apps/web/lib/hot-reload.ts`. The existing dynamic routes,
`lib/hot-reload-seo.ts`, `/og` resolver and sitemap all read that catalog.
There is no per-edition image route or separate list of OG editions.

- Index: the site's original coffee drawing on warm sage paper.
- Edition: number, venue, city, announced date/time, optional partner and
  its own poster. Date/time retain the catalog's published wording.
- Menu: its own title and edition context, with `noindex`; menus and admin
  pages remain outside the sitemap.
- A missing date uses localized “date to be announced” copy. A missing or
  unavailable poster uses the coffee drawing.
- Menu previews exist only when that edition enables a menu and has its
  Luma event configured, matching the page's availability.
- All preview data is public catalog content. Rendering never reads guest
  lists, orders, user sessions or Luma's private API.
- Five locales, 1200×630 PNGs, matching OG/Twitter URLs and canonical paths.
  Root and edition pages enter the sitemap automatically.

Use local event artwork under `public/events/`, which is included in the
deployed `/og` function. PNG, JPEG and WebP work directly. An optional
`socialPoster` can provide a compatible copy if a source poster's codec
cannot be decoded; otherwise the renderer uses `poster`.

The current 10-bit AVIF fails in the local Sharp decoder. Its unchanged
800×800 original is still used by the page. `01-social.png` is a compatible
copy made with macOS `sips`, then losslessly compressed with Sharp. Decoded
RGB pixels match the intermediate original conversion exactly; no crop,
redrawing or color treatment was applied.

- Original `01.avif` SHA-256:
  `60a4f0835de1b2d9a58758ddf518beba313ddfac605144be878a7840823424f5`
- Compatible `01-social.png` SHA-256:
  `c69b9c18766a5d8c5e46564d0494db3baf29d85f4cc1b17497d1aea950bf07ae`

## Validation

- Build and 107 tests / 977 assertions pass. Tests add a temporary future
  edition, exercise stale query copy, its menu, an alternate poster,
  missing dates/art/partner, disabled menus and unknown routes.
- Local `/og`: all 15 index/edition/menu variants render 1200×630 PNGs;
  Latin/CJK samples and the actual decoded poster reviewed visually.
- Sitemap contains the index and catalog editions in all five locales;
  menus are absent. The deployed function trace includes both event
  posters and the coffee drawing.
- Typecheck retains the six existing migration-script diagnostics.
- The local build uses the previously documented cache of actual Google
  Noto responses. It is not part of the repository or deployment.
- Local HTML validation requires the auth secret introduced by Hot Reload's
  middleware; complete anonymous page checks run against Vercel preview
  and production, where the existing configuration is present.

Deployment evidence lives in the chat workspace under
`outputs/crafter-hot-reload-social/`. Preserve the original poster, approved
portraits/fonts, current event pages and order behavior. Makeables stays hidden.
