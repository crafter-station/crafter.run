"use client"

import { Globe, Plus } from "lucide-react"

import { LinkField } from "@/components/onboarding/fields"
import type { OnboardingCopy } from "@/lib/onboarding-copy"
import type { LinkKey, ProfileDraft } from "@/lib/profile-draft"

export function LinksFields({
  links,
  setLink,
  copy,
  showMore,
  onMore,
}: {
  links: ProfileDraft["links"]
  setLink: (key: LinkKey) => (value: string) => void
  copy: OnboardingCopy["links"]
  showMore: boolean
  onMore: () => void
}) {
  const globe = <Globe aria-hidden="true" />
  return (
    <>
      <div className="ob-grid ob-grid-2">
        <LinkField kind="github" label={copy.github} value={links.github} onChange={setLink("github")} copy={copy} />
        <LinkField kind="linkedin" label={copy.linkedin} value={links.linkedin} onChange={setLink("linkedin")} copy={copy} />
        <LinkField kind="x" label={copy.x} value={links.x} onChange={setLink("x")} copy={copy} />
        <LinkField kind="instagram" label={copy.instagram} value={links.instagram} onChange={setLink("instagram")} copy={copy} />
      </div>
      <LinkField kind="website" label={copy.website} value={links.website} onChange={setLink("website")} copy={copy} icon={globe} />
      {showMore ? (
        <div className="ob-grid ob-grid-2">
          <LinkField kind="gitlab" label={copy.gitlab} value={links.gitlab} onChange={setLink("gitlab")} copy={copy} />
          <LinkField kind="website2" label={copy.website2} value={links.website2} onChange={setLink("website2")} copy={copy} icon={globe} />
        </div>
      ) : (
        <div>
          <button type="button" className="ob-suggest" onClick={onMore}>
            <Plus aria-hidden="true" />
            {copy.more}
          </button>
        </div>
      )}
    </>
  )
}
