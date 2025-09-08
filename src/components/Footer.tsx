export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white/60 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-semibold text-gray-900">Tailor</div>
            <p className="mt-1 max-w-md">Virtual try-on made simple. Join the waitlist to get early access.</p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-900">Terms</a>
            <a href="mailto:luke@autoneer.ai" className="hover:text-gray-900">Contact</a>
          </nav>
        </div>
        <div className="mt-6 text-xs text-gray-500">© {year} Tailor. All rights reserved.</div>
      </div>
    </footer>
  );
}

