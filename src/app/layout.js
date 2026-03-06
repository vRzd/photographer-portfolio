import { DM_Sans, Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const dmSans = DM_Sans({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Alina Vladyka Photography',
    template: '%s | Alina Vladyka Photography',
  },
  description:
    'Professional photographer based in Toronto GTA and Kitchener-Waterloo, Ontario. Specializing in weddings, portraits, couples, family, events, and lifestyle photography.',
  keywords: [
    'photographer',
    'Toronto photographer',
    'Kitchener-Waterloo photographer',
    'wedding photographer',
    'portrait photographer',
    'Ontario photography',
    'Alina Vladyka',
  ],
  authors: [{ name: 'Alina Vladyka' }],
  creator: 'Alina Vladyka',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Alina Vladyka Photography',
    title: 'Alina Vladyka Photography',
    description:
      'Professional photographer based in Toronto GTA and Kitchener-Waterloo, Ontario.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alina Vladyka Photography',
    description:
      'Professional photographer based in Toronto GTA and Kitchener-Waterloo, Ontario.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Inline script to set the theme before React hydrates (prevents FOUC)
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();
`.trim();

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${dmSans.variable} ${inter.variable}`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
