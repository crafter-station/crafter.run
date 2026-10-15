/* WhatsApp mark in DevDay colors: soft ring, ink bubble, green handset. */
export function DevdayWhatsApp() {
  return (
    <svg viewBox="0 0 200 200" className="dd-invite-mark" aria-hidden="true">
      <circle cx="100" cy="100" r="94" fill="none" stroke="var(--dd-line)" strokeWidth="2" />
      <path
        d="M100 30 a70 70 0 1 1 -36.4 129.8 L30 170 l10.6 -32.2 A70 70 0 0 1 100 30 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="100" r="60" fill="currentColor" />
      <path
        d="M78 70 c4 -3 9 -2 11 2 l6 12 c2 4 1 7 -2 10 l-4 4 c4 9 11 16 20 20 l4 -4 c3 -3 6 -4 10 -2 l12 6 c4 2 5 7 2 11 l-4 5 c-4 5 -11 7 -18 4 c-20 -8 -36 -24 -44 -44 c-3 -7 -1 -14 4 -18 Z"
        fill="var(--dd-green)"
      />
    </svg>
  )
}
