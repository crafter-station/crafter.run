"use client"

import { useAuth } from "@clerk/nextjs"
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronLeft,
  Github,
  Link2,
  MapPin,
  Sparkles,
  User,
  Equal,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react"

import { AgentFill } from "@/components/onboarding/agent-fill"
import { Field, RolesField, SwitchCard, TextAreaField, TextField } from "@/components/onboarding/fields"
import { LinksFields } from "@/components/onboarding/links-fields"
import { HandleField } from "@/components/onboarding/handle-field"
import { PlacePicker } from "@/components/onboarding/place-picker"
import { useHandleStatus } from "@/components/onboarding/use-handle-status"
import { onboardingCopy, fill, profileAgentPrompt } from "@/lib/onboarding-copy"
import { registerOnboardingTools } from "@/lib/onboarding-webmcp"
import { draftToRequest, isDraftReady, samePlace, validateDraft, type LinkKey, type ProfileDraft } from "@/lib/profile-draft"
import { shipsApi } from "@/lib/ships-client"
import type { PrivateMemberProfile } from "@crafter/contracts"
import type { Locale } from "@/lib/i18n"

const STEP_ICONS = [User, MapPin, Briefcase, Link2]
/** The request fields each step owns, so a server-side problem can send the member to the right step. */
const FIELD_STEP: Record<string, number> = {
  handle: 0, displayName: 0,
  originLocation: 1, basedLocation: 1,
  bio: 2, currentRole: 2, rolesOpenTo: 2, isJobSeeking: 2,
  githubUrl: 3, gitlabUrl: 3, linkedinUrl: 3, instagramUrl: 3, xUrl: 3, primaryWebsiteUrl: 3, secondaryWebsiteUrl: 3,
}

export function OnboardingWizard({
  locale,
  initial,
  source,
  avatarUrl,
}: {
  locale: Locale
  initial: ProfileDraft
  source: "github" | "account" | "none"
  avatarUrl: string | null
}) {
  const copy = onboardingCopy[locale]
  const { getToken } = useAuth()
  const router = useRouter()
  const [draft, setDraft] = useState(initial)
  const [step, setStep] = useState(0)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attention, setAttention] = useState(false)
  const [showMore, setShowMore] = useState(Boolean(initial.links.gitlab || initial.links.website2))
  const handleStatus = useHandleStatus(draft.handle)
  const submitRef = useRef<HTMLButtonElement>(null)
  const last = copy.steps.length - 1

  const live = useRef({ draft, step, handleStatus })
  live.current = { draft, step, handleStatus }

  const update = useCallback((patch: Partial<ProfileDraft>) => setDraft((current) => ({ ...current, ...patch })), [])
  const setLink = (key: LinkKey) => (value: string) => setDraft((current) => ({ ...current, links: { ...current.links, [key]: value } }))

  useEffect(
    () =>
      registerOnboardingTools({
        steps: copy.steps,
        getStep: () => live.current.step,
        getDraft: () => live.current.draft,
        // The ref is written first so a tool result read right after the call already sees the change.
        setDraft: (next) => {
          live.current.draft = next
          setDraft(next)
        },
        goToStep: (index) => {
          live.current.step = index
          setStep(index)
        },
        handleStatus: () => (live.current.handleStatus === "invalid" ? "unknown" : live.current.handleStatus === "checking" ? "checking" : live.current.handleStatus),
        requestSubmit: () => {
          live.current.step = last
          setStep(last)
          setAttention(true)
        },
      }),
    [copy.steps, last],
  )

  useEffect(() => {
    if (!attention || step !== last) return
    submitRef.current?.focus()
    const timer = window.setTimeout(() => setAttention(false), 3800)
    return () => window.clearTimeout(timer)
  }, [attention, step, last])

  const ready = isDraftReady(draft) && handleStatus !== "taken"

  async function create() {
    const issues = validateDraft(draft)
    const bad = Object.keys(issues)[0]
    if (bad) {
      setStep(FIELD_STEP[bad] ?? 0)
      setError(issues[bad] ?? copy.nav.saveFailed)
      return
    }
    setPending(true)
    setError(null)
    try {
      const token = await getToken()
      if (!token) throw new Error(copy.nav.sessionExpired)
      await shipsApi<{ member: PrivateMemberProfile }>("/v1/me", token, {
        method: "PUT",
        body: JSON.stringify(draftToRequest(draft, avatarUrl)),
      })
      router.push(`/${locale}/ships/new`)
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : copy.nav.saveFailed)
      setPending(false)
    }
  }

  function advance(event?: FormEvent) {
    event?.preventDefault()
    if (pending) return
    setError(null)
    if (step === 0 && !ready) return
    if (step === last) void create()
    else setStep(step + 1)
  }

  return (
    <div className="ob">
      <form className="ob-card" onSubmit={advance} noValidate>
        <div className="ob-progress">
          <ol className="ob-steps" aria-label={copy.eyebrow}>
            {copy.steps.map((name, index) => {
              const StepIcon = STEP_ICONS[index]!
              const state = index === step ? "active" : index < step ? "done" : "todo"
              return (
                <li className="ob-step" data-state={state} key={name} aria-current={index === step ? "step" : undefined}>
                  <button type="button" disabled={index > step || (step === 0 && !ready) || pending} onClick={() => setStep(index)}>
                    <span className="ob-step-dot">{state === "done" ? <Check aria-hidden="true" /> : <StepIcon aria-hidden="true" />}</span>
                    <span>{name}</span>
                  </button>
                  <span className="ob-step-bar" aria-hidden="true" />
                </li>
              )
            })}
          </ol>
          <p className="ob-count">{fill(copy.stepOf, { n: step + 1, total: copy.steps.length })}</p>
        </div>

        <div className="ob-panel" key={step}>
          {step === 0 ? (
            <>
              <h2>{copy.who.title}</h2>
              <p className="ob-lede">{copy.who.lede}</p>
              {source === "github" ? (
                <p className="ob-note"><Github aria-hidden="true" />{copy.who.fromGithub}</p>
              ) : null}
              <div className="ob-handle">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="ob-avatar" src={avatarUrl} alt="" width={56} height={56} referrerPolicy="no-referrer" />
                ) : (
                  <span className="ob-avatar ob-avatar-fallback"><User aria-hidden="true" /></span>
                )}
                <div style={{ flex: 1 }}>
                  <HandleField value={draft.handle} onChange={(handle) => update({ handle })} status={handleStatus} copy={copy.who} autoFocus={!draft.handle} />
                </div>
              </div>
              <TextField
                label={copy.who.name}
                value={draft.displayName}
                onChange={(displayName) => update({ displayName })}
                maxLength={80}
                autoComplete="name"
                placeholder={copy.who.namePlaceholder}
                autoFocus={Boolean(draft.handle) && !draft.displayName}
              />
              {!ready && (draft.handle || draft.displayName) ? <p className="ob-hint">{copy.nav.required}</p> : null}
            </>
          ) : null}

          {step === 1 ? (
            <>
              <h2>{copy.where.title}</h2>
              <p className="ob-lede">{copy.where.lede}</p>
              <Field label={copy.where.from}>
                <PlacePicker value={draft.origin} onChange={(origin) => update({ origin })} locale={locale} copy={copy.where} label={copy.where.from} autoFocus={!draft.origin} />
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
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h2>{copy.work.title}</h2>
              <p className="ob-lede">{copy.work.lede}</p>
              <TextField label={copy.work.role} value={draft.currentRole} onChange={(currentRole) => update({ currentRole })} maxLength={120} placeholder={copy.work.rolePlaceholder} autoFocus />
              <TextAreaField label={copy.work.bio} value={draft.bio} onChange={(bio) => update({ bio })} maxLength={280} rows={3} placeholder={copy.work.bioPlaceholder} />
              <RolesField roles={draft.rolesOpenTo} onChange={(rolesOpenTo) => update({ rolesOpenTo })} copy={copy.work} />
              <SwitchCard checked={draft.isJobSeeking} onChange={(isJobSeeking) => update({ isJobSeeking })} title={copy.work.jobSeeking} hint={copy.work.jobSeekingHint} icon={<Sparkles aria-hidden="true" />} />
            </>
          ) : null}

          {step === 3 ? (
            <>
              <h2>{copy.links.title}</h2>
              <p className="ob-lede">{copy.links.lede}</p>
              <LinksFields links={draft.links} setLink={setLink} copy={copy.links} showMore={showMore} onMore={() => setShowMore(true)} />
            </>
          ) : null}
        </div>

        {error ? <p className="ob-error" role="alert">{error}</p> : null}

        <div className="ob-actions">
          {step > 0 ? (
            <button type="button" className="ob-btn ob-btn-ghost" onClick={() => setStep(step - 1)} disabled={pending}>
              <ChevronLeft aria-hidden="true" />
              {copy.nav.back}
            </button>
          ) : null}
          <span className="ob-spacer" />
          {step > 0 && step < last ? (
            <button type="button" className="ob-btn ob-btn-ghost" onClick={() => setStep(step + 1)}>
              {copy.nav.skip}
            </button>
          ) : null}
          {step === last ? (
            <button type="button" className="ob-btn ob-btn-ghost" onClick={() => void create()} disabled={pending || !ready}>
              {copy.nav.skip}
            </button>
          ) : null}
          <button
            ref={submitRef}
            type="submit"
            className="ob-btn ob-btn-primary"
            data-attention={attention && step === last ? "true" : undefined}
            disabled={pending || (step === 0 && !ready) || (step === last && !ready)}
          >
            {pending ? copy.nav.saving : step === last ? copy.nav.finish : copy.nav.next}
            {step === last ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
          </button>
        </div>
      </form>

      <AgentFill title={copy.agent.title} body={copy.agent.body} prompt={profileAgentPrompt("onboarding")} copyLabel={copy.agent.copy} copiedLabel={copy.agent.copied} />
    </div>
  )
}
