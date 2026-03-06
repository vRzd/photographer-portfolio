import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'About',
  description:
    'Meet Alina Vladyka — professional photographer based in Toronto GTA and Kitchener-Waterloo, Ontario. Learn about her photography philosophy and approach.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ── Page header ─────────────────────────── */}
      <div className="pt-36 pb-20 lg:pt-48 lg:pb-24 px-6 text-center border-b border-border">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-5">The Photographer</p>
        <h1 className="font-heading font-light text-5xl lg:text-7xl italic text-foreground">
          About Alina
        </h1>
      </div>

      {/* ── Main bio ────────────────────────────── */}
      <section className="py-36 lg:py-52 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
            {/* Portrait */}
            <ScrollReveal>
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-surface">
                  <Image
                    src="/instagram/ig-pinned.jpg"
                    alt="Alina Vladyka — family photography, baby first steps"
                    width={2318}
                    height={4116}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-cover object-center"
                    priority
                  />
                </div>
                {/* Scandi decorative offset */}
                <div className="absolute -bottom-5 -right-5 w-24 h-24 border border-border -z-10" />
              </div>
            </ScrollReveal>

            {/* Bio text */}
            <div className="flex flex-col justify-center lg:pt-12">
              <ScrollReveal>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-7">
                  Hello, I&apos;m Alina
                </p>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <h2 className="font-heading font-light text-3xl lg:text-4xl italic text-foreground leading-snug mb-10">
                  Capturing the beauty of<br />genuine, unscripted moments
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <div className="space-y-6 text-[15px] text-muted-foreground leading-[1.9]">
                  <p>
                    I&apos;m Alina Vladyka — a professional photographer based in Toronto GTA and
                    the Kitchener-Waterloo region of Ontario, Canada. Photography, for me, has
                    always been about more than what the eye can see. It&apos;s about preserving
                    what the heart feels.
                  </p>
                  <p>
                    My work spans weddings, portrait sessions, couples, family photography,
                    events, and lifestyle photography. Whatever the occasion, I bring the
                    same commitment to craft, connection, and storytelling.
                  </p>
                  <p>
                    My style is characterized by a timeless aesthetic, natural light, and a
                    warm, relaxed approach that puts my clients completely at ease. I love
                    the quiet moments between the posed ones — the laughter, the stolen
                    glances, the details that make your story uniquely yours.
                  </p>
                  <p>
                    I serve clients across Toronto GTA, Kitchener-Waterloo, and the
                    surrounding region. I also travel for destination sessions and elopements.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={3} className="mt-12">
                <Link
                  href="/contact"
                  className="inline-block px-10 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-colors duration-400"
                >
                  Book a Session
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy — Scandi quote block ─────── */}
      <section className="py-36 lg:py-48 bg-surface border-y border-border px-6">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-10">
              My Philosophy
            </p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            {/* Thin decorative rule */}
            <div className="w-px h-12 bg-border mx-auto mb-10" />
            <blockquote className="font-heading font-light text-3xl lg:text-4xl italic text-foreground leading-snug mb-10">
              &ldquo;Photography is the art of freezing time<br />
              without losing the warmth that made the<br />
              moment worth remembering.&rdquo;
            </blockquote>
            <div className="w-px h-12 bg-border mx-auto mb-10" />
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="text-[15px] text-muted-foreground leading-[1.9]">
              Natural light, genuine emotion, and authentic connection are the
              foundations of everything I do. The best sessions feel more like
              a conversation than a production.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── What to expect ──────────────────────── */}
      <section className="py-36 lg:py-52 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-20 lg:mb-24">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">Approach</p>
            <h2 className="font-heading font-light text-3xl lg:text-4xl italic text-foreground">
              What to expect
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-border">
            {[
              {
                title: 'Calm & Unhurried',
                body: 'Every session is given the time it deserves. I never rush, and I make sure you feel comfortable and confident before we begin.',
              },
              {
                title: 'Genuine Connection',
                body: 'I invest in getting to know you before the camera comes out. The more at ease you feel, the more authentic your images will be.',
              },
              {
                title: 'Timeless Aesthetic',
                body: 'My editing style is clean, natural, and timeless — images that will look just as beautiful in 20 years as they do today.',
              },
              {
                title: 'Expert Light',
                body: 'Whether studio or outdoors, golden hour or overcast skies, I know how to work with light to bring out the best in every scene.',
              },
              {
                title: 'Full Gallery Delivery',
                body: 'A curated selection of high-resolution images delivered in a beautiful online gallery, ready to download and print.',
              },
              {
                title: 'Lasting Memories',
                body: 'At the end of every session, what matters most is that you have images that tell your story exactly as it should be told.',
              },
            ].map((item, i) => (
              <ScrollReveal
                key={item.title}
                delay={i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2}
                className="border-r border-b border-border p-10 lg:p-12"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">
                  0{i + 1}
                </p>
                <h3 className="font-heading text-xl italic text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-[1.85]">{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Locations ───────────────────────────── */}
      <section className="py-28 bg-surface border-t border-border px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {[
              {
                label: 'Primary Location',
                title: 'Toronto GTA',
                body: 'Serving the Greater Toronto Area including Toronto, Mississauga, Brampton, Oakville, Burlington, Markham, and surrounding communities.',
              },
              {
                label: 'Secondary Location',
                title: 'Kitchener-Waterloo',
                body: 'Serving Kitchener, Waterloo, Cambridge, Guelph, and the Waterloo Region. Available for travel sessions throughout Ontario and beyond.',
              },
            ].map((loc, i) => (
              <ScrollReveal key={loc.title} delay={i === 0 ? 0 : 1} className="bg-surface p-12 lg:p-16">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">
                  {loc.label}
                </p>
                <h3 className="font-heading text-2xl italic text-foreground mb-4">
                  {loc.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-[1.85]">{loc.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
