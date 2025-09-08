import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Tailor collects and uses your information.",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="space-y-4 text-gray-800 leading-relaxed">
        <p>
          Tailor collects the minimum information necessary to operate our waitlist and communicate with you about early access and product updates.
        </p>

        <h2 className="text-xl font-semibold mt-8">Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Email address</span>: collected when you join the waitlist to confirm your signup and send updates.
          </li>
          <li>
            <span className="font-medium">Technical metadata</span>: basic request information like referrer and timestamps. We may also use lightweight analytics (e.g., Vercel Analytics) to understand page usage in aggregate.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To manage the waitlist and provide early access.</li>
          <li>To send transactional and product-related emails (you can unsubscribe at any time).</li>
          <li>To improve Tailor and understand usage trends at an aggregate level.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Service Providers</h2>
        <p>
          We use trusted third-party services to operate Tailor:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Database</span>: Turso (libSQL) to store waitlist entries.
          </li>
          <li>
            <span className="font-medium">Email</span>: Resend to send confirmation and update emails.
          </li>
          <li>
            <span className="font-medium">Analytics</span>: Vercel Analytics for privacy-friendly, aggregate usage insights.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Data Retention</h2>
        <p>
          We keep your email on the waitlist until you unsubscribe or until early access concludes. You can unsubscribe at any time using the link at the bottom of our emails.
        </p>

        <h2 className="text-xl font-semibold mt-8">Your Choices</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Unsubscribe at any time via the link in our emails.</li>
          <li>Contact us to request deletion of your waitlist entry.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Contact</h2>
        <p>
          Questions? Email us at <a className="underline" href="mailto:luke@autoneer.ai">luke@autoneer.ai</a>.
        </p>
      </section>
    </main>
  );
}

