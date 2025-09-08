import { NextResponse } from "next/server";
import { getTursoClient } from "@/lib/turso";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
  }

  try {
    const normalized = email.trim().toLowerCase();
    const client = getTursoClient();

    const result = await client.execute({
      sql: `UPDATE waitlist SET subscribed = 0 WHERE email_normalized = lower(trim(?))`,
      args: [normalized],
    });

    const found = result.rowsAffected > 0;
    console.info("unsubscribe", { email: normalized, updated: found });

    const html = `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Tailor · Unsubscribed</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Inter, sans-serif; background: #fafafa; color: #111; margin: 0; padding: 40px; }
            .card { max-width: 560px; margin: 0 auto; background: #fff; border: 1px solid #eee; border-radius: 14px; padding: 28px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
            h1 { margin: 0 0 10px; font-size: 22px; }
            p { margin: 0 0 12px; line-height: 1.6; color: #444; }
            .muted { color: #777; font-size: 13px; }
            a { color: #7c3aed; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${found ? "You're unsubscribed" : "Email not found"}</h1>
            <p>${found ? "You've been removed from future emails." : "We couldn't find that address in our waitlist."}</p>
            <p class="muted">If this was a mistake, just sign up again on the <a href="/">homepage</a>.</p>
          </div>
        </body>
      </html>`;

    return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  } catch (err) {
    console.error("/api/unsubscribe error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
