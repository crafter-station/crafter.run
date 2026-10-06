/* Hot Reload editions. Dates and Luma links are filled in once each edition is
   announced; until then the edition page points at the hack0 calendar. */

export type Announcement = { author: string; role: string; url: string }

export type HotReloadEdition = {
  number: number
  venue: string
  venueUrl?: string
  city: string
  date?: string
  time?: string
  partner?: string
  seats?: number
  poster?: string
  /** Optional compatible copy when the source poster uses an unsupported codec. */
  socialPoster?: string
  lumaUrl?: string
  lumaEventId?: string
  announcements?: Announcement[]
  menu: boolean
}

export const hotReloadEditions: HotReloadEdition[] = [
  {
    number: 1,
    venue: "Don Salazar Specialty Coffee",
    venueUrl: "https://www.donsalazar.com/",
    city: "Miraflores, Lima",
    seats: 20,
    date: "Sábado 17 de octubre",
    time: "10:00 a. m.",
    partner: "Vercel",
    poster: "/events/hot-reload/01.avif",
    socialPoster: "/events/hot-reload/01-social.png",
    lumaUrl: "https://luma.com/7o3puw27",
    lumaEventId: "evt-lzVFBY3M7lMWmH7",
    announcements: [
      {
        author: "Railly Hugo",
        role: "Vercel",
        url: "https://www.linkedin.com/posts/railly-hugo_voy-a-estar-unos-d%C3%ADas-en-lima-y-quiero-share-7513028817230270464-r53p/",
      },
      {
        author: "Carlos Tarmeño",
        role: "Crafter Station",
        url: "https://www.linkedin.com/posts/carlos-tarmeno_hotreload-crafterstation-vercel-share-7513036031965933568-FiA9/",
      },
    ],
    menu: true,
  },
]

export function findEdition(number: string) {
  return hotReloadEditions.find((edition) => String(edition.number) === number)
}
