import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";
import "./claude-lando.css";

import { LenisProvider } from "@/components/LenisProvider";
import { GsapInit } from "@/components/GsapInit";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgress } from "@/components/ScrollProgress";

// ✅ Configure no .env:
// NEXT_PUBLIC_SITE_URL=https://presencapro.pt
// NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX (opcional)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://presencapro.pt";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PresençaPro — Subscription Websites for EU Businesses",
    template: "%s | PresençaPro",
  },
  description:
    "Premium websites for businesses across the EU. No upfront cost. Hosting + domain included (.com or .pt), SEO-ready, maintenance included. Plans from €30/month.",
  keywords: [
    "website subscription EU",
    "website design Europe",
    "small business website",
    "landing page EU",
    "SEO website",
    "website maintenance",
    "Portugal web design",
  ],
  authors: [{ name: "PresençaPro" }],
  creator: "PresençaPro",

  alternates: {
    canonical: "/",
    // Se depois fizer i18n, adiciona aqui:
    // languages: {
    //   "en": "/",
    //   "pt-PT": "/pt",
    //   "es": "/es",
    //   "fr": "/fr",
    // },
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "PresençaPro",
    title: "PresençaPro — Subscription Websites for EU Businesses",
    description:
      "No upfront cost. Hosting + domain included (.com or .pt). SEO-ready, maintenance included. From €30/month.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PresençaPro",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PresençaPro — Subscription Websites for EU Businesses",
    description:
      "No upfront cost. Hosting + domain included (.com or .pt). From €30/month.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  // Opcional (recomendado): coloca um ícone real depois
  icons: {
    icon: "/favicon.ico",
    // apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* ✅ Google Tag Manager (optional) */}
        {GTM_ID ? (
          <Script id="gtm" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        ) : null}
      </head>

      <body className="bg-[#0F0F0F] text-[#F5F5F5] antialiased">
        {/* ✅ GTM noscript (optional) */}
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}

        <LenisProvider>
          <GsapInit />
          <LoadingScreen />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <StickyMobileCTA />
        </LenisProvider>
      </body>
    </html>
  );
}