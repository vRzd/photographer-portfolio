import ContactForm from '@/components/ContactForm';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'Contact & Booking',
  description:
    'Book a photography session with Alina Vladyka. Serving Toronto GTA and Kitchener-Waterloo, Ontario.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* ── Page header ─────────────────────────── */}
      <div className="pt-36 pb-20 lg:pt-48 lg:pb-24 px-6 text-center border-b border-border">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-5">Get in Touch</p>
        <h1 className="font-heading font-light text-5xl lg:text-7xl italic text-foreground mb-5">
          Book a Session
        </h1>
        <p className="text-[15px] text-muted-foreground max-w-sm mx-auto leading-[1.9]">
          I&apos;d love to hear about your vision. I&apos;ll reply within 24&ndash;48 hours.
        </p>
      </div>

      {/* ── Content ─────────────────────────────── */}
      <section className="py-28 lg:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 lg:gap-32">
            {/* Sidebar */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="space-y-14">
                  {/* Locations */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6">
                      Locations Served
                    </p>
                    <div className="space-y-6">
                      {[
                        {
                          city: 'Toronto GTA',
                          detail: 'Toronto, Mississauga, Brampton,\nOakville, Markham & area',
                        },
                        {
                          city: 'Kitchener-Waterloo',
                          detail: 'Kitchener, Waterloo, Cambridge,\nGuelph & Waterloo Region',
                        },
                      ].map((loc) => (
                        <div key={loc.city} className="flex items-start gap-4">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gold mt-1 shrink-0">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <div>
                            <p className="text-[14px] font-medium text-foreground mb-0.5">{loc.city}</p>
                            <p className="text-[13px] text-muted-foreground leading-relaxed whitespace-pre-line">{loc.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Thin separator */}
                  <div className="w-full h-px bg-border" />

                  {/* Instagram */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-5">
                      Follow Along
                    </p>
                    <a
                      href="https://instagram.com/alina_vladyka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-[14px] text-foreground hover:text-gold transition-colors group"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      @alina_vladyka
                    </a>
                  </div>

                  <div className="w-full h-px bg-border" />

                  {/* Services list */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-5">
                      Services
                    </p>
                    <ul className="space-y-2.5">
                      {['Weddings', 'Portraits', 'Couples', 'Family', 'Events', 'Lifestyle'].map((s) => (
                        <li key={s} className="flex items-center gap-3 text-[14px] text-muted-foreground">
                          <span className="w-4 h-px bg-border" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full h-px bg-border" />

                  {/* Response */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">
                      Response Time
                    </p>
                    <p className="text-[13px] text-muted-foreground leading-[1.85]">
                      I aim to respond to all inquiries within 24&ndash;48 hours.
                      For urgent matters, DM on Instagram.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={1}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
