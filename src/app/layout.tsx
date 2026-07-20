import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ContactPill from "@/components/ui/ContactPill";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Sora — a modern geometric grotesque with strong bold weights. Carries all
// display type (headings) for a confident, professional, contemporary voice.
const display = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const seoTitle =
  "Petrochemical Trading, Imports & Indenting Company in Mumbai | Accord Chemical Corporation";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.accordchemicals.com"),
  title: {
    default: seoTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: seoTitle,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    // 1200×630 red port scene — asset supplied at integration (public/og.png).
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Accord Chemical Corporation — petrochemical trade, moved with precision",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        {/* WHITE-THEME tritone for the Spline hero. Maps the scene onto a
            WHITE-dominant palette: the bright water/ground/ships become white
            (so the scene blends into the white page and the black headline reads
            over it), mid-dark elements become brand RED, and the darkest shadows
            become near-black. Referenced from globals.css:
            `.spline-tint canvas { filter: url(#accord-tritone-white) }`. */}
        <svg
          aria-hidden
          focusable="false"
          width="0"
          height="0"
          style={{ position: "absolute", width: 0, height: 0 }}
        >
          <filter id="accord-tritone-white" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.2126 0.7152 0.0722 0 0
                      0.2126 0.7152 0.0722 0 0
                      0.2126 0.7152 0.0722 0 0
                      0 0 0 1 0"
            />
            {/* Soft 4-tone quadtone, smoothly interpolated (not hard bands) so
                the scene reads muted, not sharp: deepest shadows -> soft charcoal
                (black), dark tones -> a MUTED red, mids -> soft grey, brights ->
                soft white. White base with grey / red / black accents. */}
            <feComponentTransfer>
              <feFuncR
                type="table"
                tableValues="0.16 0.178 0.316 0.705 0.756 0.766 0.793 0.821 0.849 0.877 0.904 0.932 0.96"
              />
              <feFuncG
                type="table"
                tableValues="0.16 0.178 0.207 0.261 0.524 0.766 0.793 0.821 0.849 0.877 0.904 0.932 0.96"
              />
              <feFuncB
                type="table"
                tableValues="0.18 0.198 0.217 0.240 0.528 0.795 0.819 0.843 0.868 0.892 0.916 0.941 0.965"
              />
            </feComponentTransfer>
          </filter>
        </svg>
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <SmoothScroll>{children}</SmoothScroll>
          {/* The ONE floating affordance (§7.6). Back-to-top lives in Footer. */}
          <ContactPill />
        </MotionConfig>
      </body>
    </html>
  );
}
