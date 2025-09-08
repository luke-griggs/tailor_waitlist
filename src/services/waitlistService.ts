export interface WaitlistEntry {
  email: string;
  createdAt?: string;
  id?: number;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const res = await fetch(`/api/waitlist?email=${encodeURIComponent(email)}`);
  if (!res.ok) {
    console.error("checkEmailExists failed", await res.text());
    return false;
  }
  const data = await res.json();
  return Boolean(data.exists);
}

export async function addToWaitlist(email: string): Promise<{ id?: number; created_at?: string }>{
  const res = await fetch(`/api/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "landing" }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || "Failed to join waitlist");
  }

  return res.json();
}
