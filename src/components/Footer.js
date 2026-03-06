import Link from 'next/link';

const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-20 py-20 lg:py-24">
          {/* Brand */}
          <div>
            <p className="font-heading font-light text-2xl italic text-foreground mb-5">
              Alina Vladyka
            </p>
            <p className="text-[13px] text-muted-foreground leading-[1.85] max-w-xs">
              Professional photography capturing life&apos;s most meaningful moments
              with care, craft, and authenticity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground mb-6">
              Navigate
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-muted-foreground hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground mb-6">
              Connect
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="https://instagram.com/alina_vladyka"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[13px] text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                @alina_vladyka
              </a>
              <p className="flex items-start gap-2.5 text-[13px] text-muted-foreground">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Toronto GTA &amp; Kitchener-Waterloo,<br />Ontario, Canada</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground tracking-wide">
            &copy; {year} Alina Vladyka Photography
          </p>
          <Link
            href="/contact"
            className="text-[9px] uppercase tracking-[0.3em] text-gold hover:text-foreground transition-colors duration-300"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </footer>
  );
}
