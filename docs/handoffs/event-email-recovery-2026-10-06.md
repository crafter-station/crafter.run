# Event email recovery · October 6, 2026

Follow-up to DevDay #103 and the release recovery #104. The user expected the
same alternate Luma-email flow as Hot Reload. Both pages already used
`LinkLumaEmail`, but a failed Luma lookup hid it.

DevDay entry and Hot Reload ordering now offer the shared email-linking form
to signed-in people when the guest lookup is unavailable, not found or not yet
approved. Unauthenticated people still sign in first. Approved people receive
their event form; closed events do not offer email recovery.

The shared flow adds the address to the current Clerk account and verifies
ownership with a code. Only Clerk-verified addresses are checked by the server;
email verification never substitutes for Luma approval. No primary address is
changed and no attendee is accepted automatically.

An already verified address refreshes the guest check without another OTP.
Successful verification reloads the user, shows a verified state and refreshes
the page. It no longer leaves the form pending if Luma remains unavailable.
Errors remain retryable, and changing address clears the previous code/state.
Long addresses wrap in both the code prompt and verified message.

The recovery and verified copy covers all five languages. The unavailable
notice distinguishes a failed lookup from a missing registration, and the
DevDay database-read failure retains its separate generic error path.

Validation:

- Production build passes; 126 tests / 2696 assertions pass.
- Typecheck still reports only the six existing migration-script errors.
- Isolated rendering checks exercise both actual route components in six
  states: 12 tests / 32 assertions. Private forms remain absent before approval.
- The real client component was tested against synthetic Clerk/navigation
  dependencies: new address, incorrect/correct code, already verified address,
  existing unverified address, switching address and delivery failure.
- Verification completes visibly while the simulated Luma outage remains.
  No real email, account update, attendee submission or database write was made.
- Five languages in both themes at 1280 px and 320 px have no overflow. A long
  address was checked in both the code and verified steps.

The temporary fixtures live under ignored `.work/email-recovery-qa`; they are
not production routes and must never be deployed.

Release receipt: Codex workspace `outputs/crafter-event-email-recovery/RELEASE.md`.
At the initial check, `LUMA_CODEX_API_KEY` remained absent. SQL 0022 execution
was not confirmed. This UI fix does not establish the real authenticated
Luma → Clerk → database → organizer-export flow.
