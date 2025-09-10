import { NextResponse } from "next/server";
import { getTursoClient } from "@/lib/turso";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { email, source, referrer } = await req.json();

    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    const client = getTursoClient();

    // Normalize email server-side
    const normalized = email.trim().toLowerCase();

    // Check if email already exists and get subscription status
    const existingEmail = await client.execute({
      sql: `SELECT id, subscribed FROM waitlist WHERE email = ? LIMIT 1`,
      args: [normalized],
    });

    const created_at = new Date().toISOString();
    let id: number | undefined;

    if (existingEmail.rows.length > 0) {
      const row = existingEmail.rows[0];
      const existingId = row.id as number;
      const isSubscribed = row.subscribed as number; // SQLite stores booleans as 0/1

      if (isSubscribed === 1) {
        // Already subscribed
        return NextResponse.json(
          { ok: false, error: "Email already registered" },
          { status: 409 }
        );
      } else {
        // Previously unsubscribed, resubscribe them
        await client.execute({
          sql: `UPDATE waitlist SET subscribed = 1, created_at = ?, source = ?, referrer = ? WHERE id = ?`,
          args: [created_at, source ?? "landing", referrer ?? "", existingId],
        });
        id = existingId;
      }
    } else {
      // New email, insert new entry
      const insert = await client.execute({
        sql: `INSERT INTO waitlist (email, created_at, source, referrer, subscribed) VALUES (?, ?, ?, ?, 1)`,
        args: [normalized, created_at, source ?? "landing", referrer ?? ""],
      });
      id = insert.lastInsertRowid as number | undefined;
    }

    // Send confirmation email (await to ensure execution in serverless env)
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom =
      process.env.RESEND_FROM || "Tailor <waitlist@tailor.clothing>";
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const to = normalized;
      const subject = "You're on the Tailor waitlist 🎉";
      const previewText = "Thanks for signing up — we'll be in touch soon.";
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const unsubscribeUrl = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(to)}`;
      const html = `
        <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #111;">
          <h2 style="margin:0 0 12px;font-size:20px">Welcome to Tailor 👋</h2>
          <p style="margin:0 0 16px;line-height:1.6">Thanks for joining the waitlist. You're all set!</p>
          <p style="margin:0 0 16px;line-height:1.6">We'll email you as soon as early access opens up.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0" />
          <p style="margin:0;color:#666;font-size:12px">If you didn't request this, you can ignore this email.</p>
          <p style="margin:12px 0 0;color:#666;font-size:12px">You can unsubscribe anytime by <a href="${unsubscribeUrl}" style="color:#7c3aed;">clicking here</a>.</p>
        </div>`;
      try {
        await resend.emails.send({
          from: resendFrom,
          to: [to],
          subject: subject,
          html: html,
          headers: { "X-Entity-Ref-ID": String(id ?? "") },
          text: previewText,
        });
      } catch (e) {
        console.error("Resend email error", e);
      }
    } else {
      console.warn("RESEND_API_KEY not set; skipping confirmation email");
    }

    return NextResponse.json({ ok: true, id: Number(id), created_at });
  } catch (err: unknown) {
    console.error("/api/waitlist POST error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email)
    return NextResponse.json(
      { ok: false, error: "Missing email" },
      { status: 400 }
    );

  try {
    const client = getTursoClient();
    const normalized = email.trim().toLowerCase();
    const row = await client.execute({
      sql: `SELECT 1 as exists FROM waitlist WHERE email = ? LIMIT 1`,
      args: [normalized],
    });
    const exists = row.rows.length > 0;
    return NextResponse.json({ ok: true, exists });
  } catch (err: unknown) {
    console.error("/api/waitlist GET error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
