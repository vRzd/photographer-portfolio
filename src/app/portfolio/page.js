import { cookies } from 'next/headers';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import PortfolioGrid from '@/components/PortfolioGrid';
import { getImages } from '@/lib/imageService';

export const metadata = {
  title: 'Portfolio',
  description:
    'Explore the photography portfolio of Alina Vladyka — weddings, portraits, couples, family, events, and lifestyle sessions in Toronto GTA and Kitchener-Waterloo.',
};

export default async function PortfolioPage() {
  const images = await getImages();
  const jar = await cookies();
  const isAdmin = verifyToken(jar.get(COOKIE_NAME)?.value);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="pt-36 pb-20 lg:pt-48 lg:pb-24 px-6 text-center border-b border-border">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-5">Work</p>
        <h1 className="font-heading font-light text-5xl lg:text-7xl italic text-foreground mb-6">
          Portfolio
        </h1>
        <p className="text-[15px] text-muted-foreground max-w-sm mx-auto leading-[1.9]">
          A curated collection of sessions captured across Southern Ontario — each
          one a story told through light, emotion, and connection.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <PortfolioGrid images={images} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
