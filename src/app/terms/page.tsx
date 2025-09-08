import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using Tailor's website and waitlist.",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Use</h1>
      <section className="space-y-4 text-gray-800 leading-relaxed">
        <p>
          By accessing Tailor and joining the waitlist, you agree to these terms. Tailor is provided on an "as-is" basis without warranties of any kind.
        </p>

        <h2 className="text-xl font-semibold mt-8">Waitlist</h2>
        <p>
          Joining the waitlist does not guarantee early access. We may limit access, change features, or end the program at our discretion.
        </p>

        <h2 className="text-xl font-semibold mt-8">Communications</h2>
        <p>
          By joining, you consent to receive transactional and product-related emails. You can unsubscribe at any time via the link in our emails.
        </p>

        <h2 className="text-xl font-semibold mt-8">Acceptable Use</h2>
        <p>
          You agree not to misuse the site, attempt unauthorised access, or interfere with normal operation.
        </p>

        <h2 className="text-xl font-semibold mt-8">Intellectual Property</h2>
        <p>
          Tailor and its content are the property of their respective owners and protected by applicable laws.
        </p>

        <h2 className="text-xl font-semibold mt-8">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Tailor shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site.
        </p>

        <h2 className="text-xl font-semibold mt-8">Changes</h2>
        <p>
          We may update these terms from time to time. Continued use after changes constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-xl font-semibold mt-8">Contact</h2>
        <p>
          Questions? Email us at <a className="underline" href="mailto:luke@autoneer.ai">luke@autoneer.ai</a>.
        </p>
      </section>
    </main>
  );
}

