Plan: Unsubscribe Flow for Waitlist

1) Schema update (SQLite/Turso)
- Add a subscribed flag with a default of true (1).
- SQL:
  - ALTER TABLE waitlist ADD COLUMN subscribed INTEGER NOT NULL DEFAULT 1;
- Optional cleanup: ensure unique index remains on email_normalized (no change needed).

2) API: Unsubscribe endpoint
- Add GET /api/unsubscribe that:
  - Accepts an email as a query param (?email=...)
  - Normalizes the email (trim + lowercase)
  - Updates waitlist set subscribed = 0 where email_normalized matches
  - Returns a user-friendly HTML confirmation page (or JSON if requested)
  - Logs whether an existing row was found/updated (for metrics)

3) Confirmation email update
- Include an unsubscribe link at the bottom:
  - Copy: "You can unsubscribe anytime by clicking here"
  - Link to `${BASE_URL}/api/unsubscribe?email=<encoded>`
- Config:
  - Add env var NEXT_PUBLIC_BASE_URL (e.g., https://tailor.yourdomain.com)
  - Fallback to http://localhost:3000 in development if not set

4) Client behavior (no change required)
- Existing form submission continues to POST /api/waitlist
- Unsubscribe is performed server-side via link in the email

5) Test steps
- Run schema migration SQL to add subscribed column
- Start app: bun dev
- Submit a test email via the landing page
- Verify row created with subscribed = 1
- Click the unsubscribe link from the email (or open URL manually)
- Verify row updated with subscribed = 0
- Re-submit the same email to confirm 409 conflict (or adjust behavior later to re-subscribe)

Optional next iterations
- Add a pretty /unsubscribed page route with branding
- Support re-subscribe by toggling subscribed back to 1 on duplicate POST
- Track unsubscribe reason or source

