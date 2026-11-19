"use client"

import { useAuth } from "@clerk/nextjs"
import type { PrivateMemberProfile } from "@crafter/contracts"
import { Briefcase, Equal, Link2, Lock, MapPin, Sparkles, User } from "lucide-react"
import { type FormEvent, type ReactNode, useState } from "react"

import { revalidateCrafterPagesAction } from "@/app/[lang]/ships/[slug]/actions"
import { AgentFill } from "@/components/onboarding/agent-fill"
import { Field, RolesField, SwitchCard, TextAreaField, TextField } from "@/components/onboarding/fields"
import { HandleField } from "@/components/onboarding/handle-field"
import { LinksFields } from "@/components/onboarding/links-fields"
import { PlacePicker } from "@/components/onboarding/place-picker"
import { useHandleStatus } from "@/components/onboarding/use-handle-status"
import type { Locale } from "@/lib/i18n"
import { onboardingCopy, profileAgentPrompt } from "@/lib/onboarding-copy"
import { draftFromMember, draftToRequest, isDraftReady, samePlace, validateDraft, type LinkKey, type ProfileDraft } from "@/lib/profile-draft"
import { shipsApi } from "@/lib/ships-client"

type Arrangement = "remote" | "onsite" | "hybrid"
const ARRANGEMENTS: Arrangement[] = ["remote", "onsite", "hybrid"]

function Section({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="ob-section">
      <h2>{icon}{title}</h2>
      {children}
    </section>
  )
}

/** Profile settings: one page, the same controls as onboarding, plus the private career preferences. */
export function MemberProfileForm({ locale, member }: { locale: Locale; member: PrivateMemberProfile }) {
  const copy = onboardingCopy[locale]
  const { getToken } = useAuth()
  const [draft, setDraft] = useState<ProfileDraft>(() => draftFromMember(member))
  const [salary, setSalary] = useState({ min: String(member.salaryRange?.min ?? ""), max: String(member.salaryRange?.max ?? ""), currency: member.salaryRange?.currency ?? "" })
  const [arrangements, setArrangements] = useState<Arrangement[]>(member.workArrangements)
  const [onsiteCity, setOnsiteCity] = useState(member.onsiteCity ?? "")
  const [resumeUrl, setResumeUrl] = useState(member.resumeUrl ?? "")
  const [pending, setPending] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showMoreDefault, setShowMoreDefault] = useState(false)
  const handleStatus = useHandleStatus(draft.handle, member.handle)

  const update = (patch: Partial<ProfileDraft>) => {
    setSaved(false)
    setDraft((current) => ({ ...current, ...patch }))
  }
  const setLink = (key: LinkKey) => (value: string) => update({ links: { ...draft.links, [key]: value } })
  const worksOnsite = arrangements.includes("onsite") || arrangements.includes("hybrid")

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSaved(false)
    const filled = [salary.min, salary.max, salary.currency].map((value) => value.trim())
    if (filled.some(Boolean) && !filled.every(Boolean)) return setError(copy.nav.salaryTogether)
    const issues = validateDraft(draft)
    const bad = Object.values(issues)[0]
    if (bad || !isDraftReady(draft) || handleStatus === "taken") return setError(bad ?? copy.nav.required)
    setPending(true)
    try {
      const token = await getToken()
      if (!token) throw new Error(copy.nav.sessionExpired)
      await shipsApi<{ member: PrivateMemberProfile }>("/v1/me", token, {
        method: "PUT",
        body: JSON.stringify({
          ...draftToRequest(draft, member.avatarUrl),
          salaryRange: filled.every(Boolean) ? { min: Number(salary.min), max: Number(salary.max), currency: salary.currency.toUpperCase() } : null,
          workArrangements: arrangements,
          onsiteCity: worksOnsite ? onsiteCity.trim() || null : null,
          resumeUrl: resumeUrl.trim() || null,
        }),
      })
      await revalidateCrafterPagesAction([member.handle, draft.handle])
      setSaved(true)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : copy.nav.saveFailed)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="ob">
      <form className="ob-card" onSubmit={submit} noValidate>
        <Section icon={<User aria-hidden="true" />} title={copy.settings.public}>
          <HandleField value={draft.handle} onChange={(handle) => update({ handle })} status={handleStatus} copy={copy.who} />
          <TextField label={copy.who.name} value={draft.displayName} onChange={(displayName) => update({ displayName })} maxLength={80} />
          <TextField label={copy.work.role} value={draft.currentRole} onChange={(currentRole) => update({ currentRole })} maxLength={120} placeholder={copy.work.rolePlaceholder} />
          <TextAreaField label={copy.work.bio} value={draft.bio} onChange={(bio) => update({ bio })} maxLength={280} rows={3} placeholder={copy.work.bioPlaceholder} />
        </Section>

        <Section icon={<MapPin aria-hidden="true" />} title={copy.settings.location}>
          <Field label={copy.where.from}>
            <PlacePicker value={draft.origin} onChange={(origin) => update({ origin })} locale={locale} copy={copy.where} label={copy.where.from} />
          </Field>
          <Field label={copy.where.based}>
            <PlacePicker value={draft.based} onChange={(based) => update({ based })} locale={locale} copy={copy.where} label={copy.where.based} />
            {draft.origin && !samePlace(draft.origin, draft.based) ? (
              <div>
                <button type="button" className="ob-same" onClick={() => update({ based: draft.origin })}>
                  <Equal aria-hidden="true" />
                  {copy.where.sameAsOrigin}
                </button>
              </div>
            ) : null}
          </Field>
        </Section>

        <Section icon={<Briefcase aria-hidden="true" />} title={copy.settings.work}>
          <RolesField roles={draft.rolesOpenTo} onChange={(rolesOpenTo) => update({ rolesOpenTo })} copy={copy.work} />
          <SwitchCard checked={draft.isJobSeeking} onChange={(isJobSeeking) => update({ isJobSeeking })} title={copy.work.jobSeeking} hint={copy.work.jobSeekingHint} icon={<Sparkles aria-hidden="true" />} />
        </Section>

        <Section icon={<Link2 aria-hidden="true" />} title={copy.settings.links}>
          <LinksFields links={draft.links} setLink={setLink} copy={copy.links} showMore={Boolean(draft.links.gitlab || draft.links.website2) || showMoreDefault} onMore={() => setShowMoreDefault(true)} />
        </Section>

        <Section icon={<Lock aria-hidden="true" />} title={copy.settings.privateEyebrow}>
          <div className="ob-private" style={{ display: "grid", gap: 18 }}>
            <div>
              <p style={{ color: "var(--ob-ink)", fontSize: 18 }}>{copy.settings.privateTitle}</p>
              <p>{copy.settings.privateBody}</p>
            </div>
            <div className="ob-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
              <TextField label={copy.settings.salaryMin} type="number" inputMode="numeric" min={0} max={10000000} value={salary.min} onChange={(min) => setSalary({ ...salary, min })} placeholder="80000" />
              <TextField label={copy.settings.salaryMax} type="number" inputMode="numeric" min={0} max={10000000} value={salary.max} onChange={(max) => setSalary({ ...salary, max })} placeholder="120000" />
              <TextField label={copy.settings.currency} value={salary.currency} onChange={(currency) => setSalary({ ...salary, currency })} maxLength={3} autoComplete="off" placeholder="USD" />
            </div>
            <Field label={copy.settings.openToArrangements}>
              <div className="ob-checks">
                {ARRANGEMENTS.map((arrangement) => (
                  <label className="ob-check" key={arrangement}>
                    <input
                      type="checkbox"
                      checked={arrangements.includes(arrangement)}
                      onChange={(event) => setArrangements((current) => (event.target.checked ? [...current, arrangement] : current.filter((value) => value !== arrangement)))}
                    />
                    {copy.settings[arrangement]}
                  </label>
                ))}
              </div>
            </Field>
            {worksOnsite ? <TextField label={copy.settings.onsiteCity} value={onsiteCity} onChange={setOnsiteCity} maxLength={120} placeholder="Lima, Peru" /> : null}
            <TextField label={copy.settings.resume} type="url" value={resumeUrl} onChange={setResumeUrl} placeholder="https://drive.google.com/..." />
          </div>
        </Section>

        {error ? <p className="ob-error" role="alert">{error}</p> : null}
        {saved ? <p className="ob-saved" role="status">{copy.settings.saved}</p> : null}
        <div className="ob-actions">
          <button type="submit" className="ob-btn ob-btn-primary" disabled={pending}>
            {pending ? copy.nav.saving : copy.settings.save}
          </button>
        </div>
      </form>
      <AgentFill title={copy.settings.agentTitle} body={copy.settings.agentBody} prompt={profileAgentPrompt("settings")} copyLabel={copy.agent.copy} copiedLabel={copy.agent.copied} />
    </div>
  )
}
