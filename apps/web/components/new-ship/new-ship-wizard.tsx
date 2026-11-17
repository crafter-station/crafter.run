"use client"

import type { ShipDetail } from "@crafter/contracts"
import { useAuth, useClerk, useUser } from "@clerk/nextjs"
import { ArrowRight, Check, ChevronLeft, ChevronRight, Eye, FileText, Github, Link2, Loader2, Rocket, Send, Sparkles, Upload, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useCallback, useEffect, useId, useRef, useState } from "react"

import { shipAgentPrompt } from "@/components/copy-agent-prompt"
import { AgentFill } from "@/components/onboarding/agent-fill"
import { Field, TextAreaField, TextField } from "@/components/onboarding/fields"
import { Problem, SlugField } from "@/components/new-ship/fields"
import { BatchReview } from "@/components/new-ship/batch-review"
import { RepoPicker, repoSelectionKey } from "@/components/new-ship/repo-picker"
import { ShipPreview } from "@/components/new-ship/ship-preview"
import { repoInputToUrl, repoKey, type RepoOption } from "@/lib/github-repos"
import type { Locale } from "@/lib/i18n"
import { newShipCopy } from "@/lib/new-ship-copy"
import { importFromGithub } from "@/lib/new-ship-import"
import {
  emptyShipFields,
  ImportError,
  importShipFromLink,
  isShipReady,
  parseRepoUrl,
  slugifyShip,
  validateShip,
  SHIP_LIMITS,
  type ImportResult,
  type ShipFields,
} from "@/lib/new-ship-draft"
import { registerNewShipTools } from "@/lib/new-ship-webmcp"
import { fill } from "@/lib/onboarding-copy"
import { publishShip, saveShipDraft } from "@/lib/publish-ship"
import { uploadShipImage } from "@/lib/ships-client"

const STEP_ICONS = [Link2, FileText, Eye]
const ACCEPTED_IMAGES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_IMAGE_BYTES = 8 * 1024 * 1024
const FIELD_STEP_LAST = 2

async function pageMeta(url: string) {
  const response = await fetch("/api/ship-import", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) })
  if (!response.ok) return null
  const body = (await response.json()) as { meta: { title: string | null; description: string | null; image: string | null; siteName: string | null } | null }
  return body.meta
}

async function importLink(input: string): Promise<ImportResult> {
  const repo = repoInputToUrl(input)
  return repo ? importFromGithub(repo) : importShipFromLink(input, { pageMeta })
}

type Outcome = { ok: true; result: ImportResult } | { ok: false; reason: string }

export function NewShipWizard({ locale, handle, firstShip, repos = [], startInBatch = false }: { locale: Locale; handle: string; firstShip: boolean; repos?: RepoOption[]; startInBatch?: boolean }) {
  const copy = newShipCopy[locale]
  const { getToken } = useAuth()
  const { openUserProfile } = useClerk()
  const { user } = useUser()
  const router = useRouter()
  const githubLinked = user?.externalAccounts.some((account) => account.provider.endsWith("github")) ?? true

  const [step, setStep] = useState(0)
  const [fields, setFieldsState] = useState<ShipFields>(emptyShipFields)
  const [link, setLink] = useState("")
  const [importing, setImporting] = useState(false)
  const [imported, setImported] = useState<ImportResult | null>(null)
  const [loadingRepo, setLoadingRepo] = useState<string | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [showIssues, setShowIssues] = useState(false)
  const [showSocial, setShowSocial] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  const [pending, setPending] = useState<"publish" | "draft" | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [attention, setAttention] = useState(false)
  const [done, setDone] = useState<ShipDetail | null>(null)
  const canBatch = repos.filter((option) => !option.hasShip).length >= 2
  const [batchMode, setBatchMode] = useState<"select" | "review" | null>(startInBatch && canBatch ? "select" : null)
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set())
  const [batchUrls, setBatchUrls] = useState<string[]>([])
  const submitRef = useRef<HTMLButtonElement>(null)
  const draftRef = useRef<Pick<ShipDetail, "id" | "updatedAt"> | null>(null)
  const uploadedRef = useRef<{ file: File; url: string } | null>(null)
  const provenanceRef = useRef<string[]>([])

  const live = useRef({ fields, step })
  live.current = { fields, step }

  const setFields = useCallback((next: ShipFields) => {
    live.current.fields = next
    setFieldsState(next)
  }, [])
  const update = (patch: Partial<ShipFields>) => setFields({ ...live.current.fields, ...patch })

  const issues = validateShip(fields)
  const ready = isShipReady(fields)
  const cover = imagePreview ?? (fields.imageUrl.trim() || null)

  useEffect(() => {
    if (!imageFile) return setImagePreview(null)
    const url = URL.createObjectURL(imageFile)
    setImagePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  const runImport = useCallback(
    async (input: string): Promise<Outcome> => {
      setImporting(true)
      setImportError(null)
      try {
        const result = await importLink(input)
        const merged = { ...live.current.fields, ...result.fields } as ShipFields
        setFields(merged)
        setImageFile(null)
        setImported(result)
        setShowSocial(Boolean(merged.socialPostUrl))
        provenanceRef.current = [result.provenance]
        live.current.step = 1
        setStep(1)
        return { ok: true, result }
      } catch (cause) {
        const key = cause instanceof ImportError ? cause.key : "importFailed"
        setImportError(copy.errors[key])
        return { ok: false, reason: key }
      } finally {
        setImporting(false)
      }
    },
    [copy.errors, setFields],
  )

  useEffect(
    () =>
      registerNewShipTools({
        steps: copy.steps,
        getStep: () => live.current.step,
        getFields: () => live.current.fields,
        setFields,
        importFromLink: (url) => {
          const full = repos.find((repo) => repo.fullName.toLowerCase() === url.trim().toLowerCase())
          setLink(full?.url ?? url)
          return runImport(full?.url ?? url)
        },
        listRepos: () => repos,
        requestSubmit: () => {
          live.current.step = FIELD_STEP_LAST
          setStep(FIELD_STEP_LAST)
          setAttention(true)
        },
        firstShip: () => firstShip,
        importReposBatch: (requested) => {
          const accepted: string[] = []
          const rejected: { repo: string; reason: string }[] = []
          for (const input of requested) {
            const option = repos.find((repo) => repo.fullName.toLowerCase() === input.trim().toLowerCase())
            const url = option?.url ?? repoInputToUrl(input)
            if (!url) rejected.push({ repo: input, reason: "Not a GitHub repository" })
            else if (option?.hasShip) rejected.push({ repo: input, reason: "Already has a Ship" })
            else if (!accepted.includes(url)) accepted.push(url)
          }
          if (accepted.length > 0) {
            setBatchUrls((current) => [...current, ...accepted.filter((url) => !current.includes(url))])
            setBatchMode("review")
          }
          return { accepted, rejected }
        },
      }),
    [copy.steps, firstShip, repos, runImport, setFields],
  )

  useEffect(() => {
    if (!attention || step !== FIELD_STEP_LAST) return
    submitRef.current?.focus()
    const timer = window.setTimeout(() => setAttention(false), 3800)
    return () => window.clearTimeout(timer)
  }, [attention, step])

  function pickImage(file: File | undefined) {
    if (!file) return
    if (!ACCEPTED_IMAGES.includes(file.type) || file.size > MAX_IMAGE_BYTES) return setImageError(true)
    setImageError(false)
    setImageFile(file)
  }

  function clearImage() {
    setImageFile(null)
    setImageError(false)
    update({ imageUrl: "" })
  }

  async function send(mode: "publish" | "draft") {
    if (pending) return
    if (!ready) {
      setShowIssues(true)
      setError(copy.nav.fixFields)
      live.current.step = 1
      setStep(1)
      return
    }
    setPending(mode)
    setError(null)
    try {
      let uploaded: string | undefined
      if (imageFile) {
        const token = await getToken()
        if (!token) throw new Error(copy.nav.sessionExpired)
        if (uploadedRef.current?.file !== imageFile) uploadedRef.current = { file: imageFile, url: await uploadShipImage(imageFile, token) }
        uploaded = uploadedRef.current.url
      }
      const input = { getToken, sessionExpired: copy.nav.sessionExpired, fields, provenance: ["web form", ...provenanceRef.current], imageUrl: uploaded, existing: draftRef.current }
      if (mode === "draft") {
        const ship = await saveShipDraft(input)
        draftRef.current = ship
        router.push(`/${locale}/ships/drafts/${ship.id}`)
        return
      }
      const published = await publishShip(input, (draft) => {
        draftRef.current = draft
      })
      draftRef.current = published
      setDone(published)
      router.refresh()
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : copy.nav.saveFailed
      setError(message)
      if (message.includes("profile")) router.push(`/${locale}/onboarding`)
    } finally {
      setPending(null)
    }
  }

  function advance(event?: FormEvent) {
    event?.preventDefault()
    if (pending || importing) return
    setError(null)
    if (step === 0) {
      if (link.trim()) void runImport(link)
      else setStep(1)
    } else if (step === 1) {
      if (!ready) {
        setShowIssues(true)
        setError(copy.nav.fixFields)
        return
      }
      setStep(2)
    } else void send("publish")
  }

  const repo = parseRepoUrl(fields.repository)
  const repoUrl = repo ? `https://github.com/${repo.owner}/${repo.repo}` : null
  const key = repoKey(fields.repository)
  const topicOn = imported?.hasTopic === true || Boolean(key && repos.some((option) => option.topic && option.fullName.toLowerCase() === key))
  const showTopicTip = Boolean(repoUrl) && !topicOn

  async function pickRepo(option: RepoOption) {
    setLink(option.url)
    setLoadingRepo(option.fullName)
    await runImport(option.url)
    setLoadingRepo(null)
  }

  const selecting = batchMode === "select"

  if (batchMode === "review") {
    return (
      <BatchReview
        locale={locale}
        handle={handle}
        firstShip={firstShip}
        urls={batchUrls}
        repos={repos}
        onBack={(unfinished) => {
          setSelected(new Set(unfinished))
          setBatchMode("select")
        }}
      />
    )
  }

  if (done) return <DoneCard ship={done} locale={locale} copy={copy} repoUrl={repoUrl} topicOn={topicOn} />

  return (
    <div className="ob">
      <form className="ob-card" onSubmit={advance} noValidate>
        <div className="ob-progress">
          <ol className="ob-steps" data-count={copy.steps.length} aria-label={copy.eyebrow}>
            {copy.steps.map((name, index) => {
              const StepIcon = STEP_ICONS[index]!
              const state = index === step ? "active" : index < step ? "done" : "todo"
              return (
                <li className="ob-step" data-state={state} key={name} aria-current={index === step ? "step" : undefined}>
                  <button type="button" disabled={index > step || Boolean(pending) || importing} onClick={() => setStep(index)}>
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
              <h2>{copy.link.title}</h2>
              <p className="ob-lede">{copy.link.lede}</p>
              {repos.length > 0 ? (
                <RepoPicker
                  repos={repos}
                  copy={copy.link}
                  batch={copy.batch}
                  busy={importing}
                  loading={loadingRepo}
                  onPick={(option) => void pickRepo(option)}
                  onStartSelection={() => setBatchMode("select")}
                  selection={
                    batchMode === "select"
                      ? {
                          selected,
                          onToggle: (option) =>
                            setSelected((current) => {
                              const next = new Set(current)
                              const key = repoSelectionKey(option)
                              if (!next.delete(key)) next.add(key)
                              return next
                            }),
                          onSelectAll: (list) => setSelected((current) => new Set([...current, ...list.map(repoSelectionKey)])),
                          onReview: () => {
                            setBatchUrls(repos.filter((option) => selected.has(repoSelectionKey(option)) && !option.hasShip).map((option) => option.url))
                            setBatchMode("review")
                          },
                          onExit: () => setBatchMode(null),
                        }
                      : undefined
                  }
                />
              ) : null}
              {repos.length > 0 && !selecting ? <p className="ns-or">{copy.link.orPaste}</p> : null}
              {selecting ? null : <LinkInput
                autoFocus={repos.length === 0}
                label={copy.link.label}
                placeholder={copy.link.placeholder}
                value={link}
                onChange={setLink}
                invalid={Boolean(importError)}
                disabled={importing}
              />}
              {importError && !selecting ? <p className="ob-error" role="alert">{importError}</p> : null}
              {!githubLinked && !selecting ? (
                <p className="ob-note">
                  <Github aria-hidden="true" />
                  <span>
                    {copy.link.githubUnlinked}{" "}
                    <button type="button" className="ns-inline" onClick={() => openUserProfile()}>{copy.link.githubUnlinkedAction}</button>
                  </span>
                </p>
              ) : null}
            </>
          ) : null}

          {step === 1 ? (
            <>
              <h2>{copy.details.title}</h2>
              <p className="ob-lede">{copy.details.lede}</p>
              {imported ? (
                <p className="ob-note"><Sparkles aria-hidden="true" />{imported.complete ? (imported.source === "github" ? copy.link.fromGithub : copy.link.fromSite) : copy.link.partial}</p>
              ) : null}
              <div className="ob-grid ob-grid-2">
                <TextField
                  label={copy.details.name}
                  value={fields.name}
                  maxLength={SHIP_LIMITS.name}
                  placeholder={copy.details.namePlaceholder}
                  autoFocus={!imported}
                  aria-invalid={showIssues && issues.name ? true : undefined}
                  hint={showIssues && issues.name ? <Problem text={copy.errors[issues.name]} /> : undefined}
                  onChange={(name) => {
                    const auto = fields.slug === "" || fields.slug === slugifyShip(fields.name)
                    update({ name, ...(auto ? { slug: slugifyShip(name) } : {}) })
                  }}
                />
                <SlugField
                  label={copy.details.slug}
                  value={fields.slug}
                  onChange={(slug) => update({ slug: slugifyShip(slug) })}
                  invalid={showIssues && Boolean(issues.slug)}
                  hint={showIssues && issues.slug ? <Problem text={copy.errors[issues.slug]} /> : <p className="ob-hint">{copy.details.slugHint}</p>}
                />
              </div>
              <TextField
                label={copy.details.tagline}
                value={fields.tagline}
                maxLength={SHIP_LIMITS.tagline + 40}
                placeholder={copy.details.taglinePlaceholder}
                aria-invalid={showIssues && issues.tagline ? true : undefined}
                hint={
                  showIssues && issues.tagline ? (
                    <Problem text={copy.errors[issues.tagline]} />
                  ) : (
                    <p className="ob-hint" style={{ justifyContent: "space-between", gap: 12 }}>
                      <span>{copy.details.taglineHint}</span>
                      <span className="ns-count">{fields.tagline.length}/{SHIP_LIMITS.tagline}</span>
                    </p>
                  )
                }
                onChange={(tagline) => update({ tagline })}
              />
              <TextAreaField
                label={copy.details.description}
                value={fields.description}
                maxLength={SHIP_LIMITS.description}
                rows={6}
                placeholder={copy.details.descriptionPlaceholder}
                aria-invalid={showIssues && issues.description ? true : undefined}
                onChange={(description) => update({ description })}
              />
              {showIssues && issues.description ? <Problem text={copy.errors[issues.description]} /> : null}
              <CoverField copy={copy.details} cover={cover} onPick={pickImage} onClear={clearImage} invalid={imageError || (showIssues && Boolean(issues.imageUrl))} error={imageError ? copy.details.imageError : issues.imageUrl && showIssues ? copy.errors[issues.imageUrl] : null} />
              <div className="ob-grid ob-grid-2">
                <TextField
                  label={copy.details.repository}
                  value={fields.repository}
                  type="url"
                  inputMode="url"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="https://github.com/..."
                  aria-invalid={showIssues && issues.repository ? true : undefined}
                  hint={showIssues && issues.repository ? <Problem text={copy.errors[issues.repository]} /> : undefined}
                  onChange={(repository) => update({ repository })}
                />
                <TextField
                  label={copy.details.website}
                  value={fields.website}
                  type="url"
                  inputMode="url"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder={copy.details.urlPlaceholder}
                  aria-invalid={showIssues && issues.website ? true : undefined}
                  hint={showIssues && issues.website ? <Problem text={copy.errors[issues.website]} /> : undefined}
                  onChange={(website) => update({ website })}
                />
              </div>
              {showSocial ? (
                <TextField
                  label={copy.details.social}
                  value={fields.socialPostUrl}
                  type="url"
                  inputMode="url"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="https://"
                  aria-invalid={showIssues && issues.socialPostUrl ? true : undefined}
                  hint={showIssues && issues.socialPostUrl ? <Problem text={copy.errors[issues.socialPostUrl]} /> : <p className="ob-hint">{copy.details.socialHint}</p>}
                  onChange={(socialPostUrl) => update({ socialPostUrl })}
                />
              ) : (
                <div>
                  <button type="button" className="ob-same" onClick={() => setShowSocial(true)}>
                    <ChevronRight aria-hidden="true" />
                    {copy.details.more}
                  </button>
                </div>
              )}
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h2>{copy.preview.title}</h2>
              <p className="ob-lede">{copy.preview.lede}</p>
              <ShipPreview fields={fields} cover={cover} handle={handle} copy={copy.preview} />
              <p className="ob-note ns-notice" data-tone={firstShip ? "review" : "ready"}>
                {firstShip ? <Eye aria-hidden="true" /> : <Rocket aria-hidden="true" />}
                <span>
                  <strong>{firstShip ? copy.preview.reviewTitle : copy.preview.publishTitle}</strong>
                  {firstShip ? copy.preview.reviewBody : copy.preview.publishBody}
                </span>
              </p>
              {showTopicTip && repoUrl ? (
                <div className="ob-hint ns-tip">
                  <Github aria-hidden="true" />
                  <span>{copy.preview.topicTip}</span>
                  <a className="ns-inline" href={repoUrl} target="_blank" rel="noreferrer">{copy.done.autoAction}</a>
                </div>
              ) : null}
            </>
          ) : null}
        </div>

        {error ? <p className="ob-error" role="alert">{error}</p> : null}

        {selecting && step === 0 ? null : <div className="ob-actions">
          {step > 0 ? (
            <button type="button" className="ob-btn ob-btn-ghost" onClick={() => setStep(step - 1)} disabled={Boolean(pending)}>
              <ChevronLeft aria-hidden="true" />
              {copy.nav.back}
            </button>
          ) : null}
          <span className="ob-spacer" />
          {step === 0 ? (
            <button type="button" className="ob-btn ob-btn-ghost" onClick={() => setStep(1)} disabled={importing}>
              {copy.link.manual}
            </button>
          ) : null}
          {step === 2 ? (
            <button type="button" className="ob-btn ob-btn-ghost" onClick={() => void send("draft")} disabled={Boolean(pending)}>
              {pending === "draft" ? copy.nav.savingDraft : copy.nav.saveDraft}
            </button>
          ) : null}
          <button
            ref={submitRef}
            type="submit"
            className="ob-btn ob-btn-primary"
            data-attention={attention && step === FIELD_STEP_LAST ? "true" : undefined}
            disabled={Boolean(pending) || importing || (step === 0 && !link.trim())}
          >
            {step === 0
              ? importing ? <><Loader2 className="animate-spin" aria-hidden="true" />{copy.link.importing}</> : <>{copy.link.import}<Sparkles aria-hidden="true" /></>
              : step === 1
                ? <>{copy.nav.next}<ArrowRight aria-hidden="true" /></>
                : pending === "publish"
                  ? <><Loader2 className="animate-spin" aria-hidden="true" />{firstShip ? copy.nav.reviewing : copy.nav.publishing}</>
                  : <>{firstShip ? copy.nav.review : copy.nav.publish}{firstShip ? <Send aria-hidden="true" /> : <Rocket aria-hidden="true" />}</>}
          </button>
        </div>}
      </form>

      <AgentFill title={copy.agent.title} body={copy.agent.body} prompt={shipAgentPrompt} copyLabel={copy.agent.copy} copiedLabel={copy.agent.copied} />
    </div>
  )
}

function LinkInput({ label, placeholder, value, onChange, invalid, disabled, autoFocus }: { autoFocus: boolean; label: string; placeholder: string; value: string; onChange: (value: string) => void; invalid: boolean; disabled: boolean }) {
  const id = useId()
  return (
    <Field label={label} htmlFor={id}>
      <div className="ob-affix ns-link" aria-invalid={invalid || undefined}>
        <Link2 aria-hidden="true" />
        <input
          id={id}
          value={value}
          type="text"
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          autoFocus={autoFocus}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </Field>
  )
}

function CoverField({
  copy,
  cover,
  onPick,
  onClear,
  invalid,
  error,
}: {
  copy: import("@/lib/new-ship-copy").NewShipCopy["details"]
  cover: string | null
  onPick: (file: File | undefined) => void
  onClear: () => void
  invalid: boolean
  error: string | null
}) {
  const id = useId()
  return (
    <Field label={copy.image} htmlFor={id} hint={error ? <Problem text={error} /> : <p className="ob-hint">{copy.imageHint}</p>}>
      <div className="ns-cover-field" data-invalid={invalid || undefined}>
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" referrerPolicy="no-referrer" />
        ) : null}
        <div className="ns-cover-actions">
          <label className="ob-btn ob-btn-ghost ns-upload" htmlFor={id}>
            <Upload aria-hidden="true" />
            {cover ? copy.imageReplace : copy.imageUpload}
          </label>
          {cover ? (
            <button type="button" className="ob-btn ob-btn-ghost" onClick={onClear}>
              <X aria-hidden="true" />
              {copy.imageRemove}
            </button>
          ) : null}
        </div>
        <input id={id} className="sr-only" type="file" accept={ACCEPTED_IMAGES.join(",")} onChange={(event) => { onPick(event.target.files?.[0]); event.target.value = "" }} />
      </div>
    </Field>
  )
}

function DoneCard({ ship, locale, copy, repoUrl, topicOn }: { ship: ShipDetail; locale: Locale; copy: import("@/lib/new-ship-copy").NewShipCopy; repoUrl: string | null; topicOn: boolean }) {
  const pending = ship.status === "pending"
  return (
    <div className="ob">
      <div className="ob-card ns-done" role="status">
        <span className="ns-done-icon"><Check aria-hidden="true" /></span>
        <div className="ob-panel">
          <h2>{pending ? copy.done.pendingTitle : copy.done.publishedTitle}</h2>
          <p className="ob-lede">{pending ? copy.done.pendingBody : copy.done.publishedBody}</p>
        </div>
        {repoUrl ? (
          <div className="ob-note ns-notice" data-tone="ready">
            {topicOn ? <Check aria-hidden="true" /> : <Github aria-hidden="true" />}
            <span>
              <strong>{topicOn ? copy.done.autoOn : copy.done.topicTitle}</strong>
              {topicOn ? copy.done.autoOnBody : copy.done.topicBody}
              {topicOn ? null : (
                <a className="ob-btn ob-btn-primary ns-auto" href={repoUrl} target="_blank" rel="noreferrer">
                  <Github aria-hidden="true" />
                  {copy.done.autoAction}
                </a>
              )}
            </span>
          </div>
        ) : null}
        <div className="ob-actions">
          <Link className="ob-btn ob-btn-ghost" href={`/${locale}/ships`}>{copy.done.all}</Link>
          <span className="ob-spacer" />
          <a className="ob-btn ob-btn-ghost" href={`/${locale}/ships/new`}>{copy.done.another}</a>
          <a className="ob-btn ob-btn-ghost" href={`/${locale}/ships/new?batch=1`}>{copy.batch.addSeveral}</a>
          {pending ? null : <Link className="ob-btn ob-btn-primary" href={`/${locale}/ships/${ship.slug}`}>{copy.done.view}<ArrowRight aria-hidden="true" /></Link>}
        </div>
      </div>
    </div>
  )
}
