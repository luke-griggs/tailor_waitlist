import { NextResponse } from "next/server";
import { getTursoClient } from "@/lib/turso";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { email, source, referrer } = await req.json();

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const client = getTursoClient();

    // Normalize email server-side
    const normalized = email.trim().toLowerCase();

    // Attempt insert; ignore if duplicate
    // Use INSERT OR IGNORE to leverage unique index on email_normalized
    const insert = await client.execute({
      sql: `INSERT OR IGNORE INTO waitlist (email, source, referrer) VALUES (?, ?, ?)` ,
      args: [normalized, source ?? "landing", referrer ?? ""]
    });

    // If no row inserted, it already exists
    if (insert.rowsAffected === 0) {
      return NextResponse.json({ ok: false, error: "Email already registered" }, { status: 409 });
    }

    // Fetch the row id for confirmation
    const row = await client.execute({
      sql: `SELECT id, created_at FROM waitlist WHERE email_normalized = lower(trim(?)) LIMIT 1`,
      args: [normalized]
    });

    const id = row.rows[0]?.id as number | undefined;
    const created_at = row.rows[0]?.created_at as string | undefined;

    // Fire-and-forget confirmation email (do not block response on failure)
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM || "Tailor <hello@example.com>";
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const to = normalized;
      const subject = "You're on the Tailor waitlist 🎉";
      const previewText = "Thanks for signing up — we'll be in touch soon.";
      const html = `
        <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #111;">
          <h2 style="margin:0 0 12px;font-size:20px">Welcome to Tailor 👋</h2>
          <p style="margin:0 0 16px;line-height:1.6">Thanks for joining the waitlist. You're all set!</p>
          <p style="margin:0 0 16px;line-height:1.6">We'll email you as soon as early access opens up.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0" />
          <p style="margin:0;color:#666;font-size:12px">If you didn't request this, you can ignore this email.</p>
        </div>`;
      // Don't await: avoid blocking the response
      resend.emails.send({ from: resendFrom, to, subject, html, headers: { "X-Entity-Ref-ID": String(id ?? "") }, text: previewText }).catch((e) => {
        console.error("Resend email error", e);
      });
    } else {
      console.warn("RESEND_API_KEY not set; skipping confirmation email");
    }

    return NextResponse.json({ ok: true, id, created_at });
  } catch (err: any) {
    console.error("/api/waitlist POST error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });

  try {
    const client = getTursoClient();
    const normalized = email.trim().toLowerCase();
    const row = await client.execute({
      sql: `SELECT 1 as exists FROM waitlist WHERE email_normalized = lower(trim(?)) LIMIT 1`,
      args: [normalized]
    });
    const exists = row.rows.length > 0;
    return NextResponse.json({ ok: true, exists });
  } catch (err: any) {
    console.error("/api/waitlist GET error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
