import { Cormorant, DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const displayFont = Cormorant({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "NeuroBalance | Biblioteca digital de neurociencia aplicada y bienestar mental",
    template: "%s | NeuroBalance",
  },
  description:
    "NeuroBalance desarrolla colecciones digitales sobre neuroplasticidad, regulacion emocional, habitos, bienestar emocional y transformacion personal con base cientifica.",
  keywords: [
    "neurobalance",
    "neurociencia aplicada",
    "bienestar mental",
    "regulacion emocional",
    "habitos",
    "neuroplasticidad",
    "psicologia positiva",
    "biblioteca digital",
    "colecciones digitales",
    "ebooks bienestar",
  ],
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NeuroBalance | Biblioteca digital de neurociencia aplicada y bienestar mental",
    description:
      "Colecciones digitales para comprender la mente, cultivar bienestar real y aplicar herramientas practicas con base cientifica.",
    type: "website",
    locale: "es_ES",
    siteName: "NeuroBalance",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroBalance | Biblioteca digital de neurociencia aplicada",
    description:
      "Colecciones digitales sobre mente, bienestar emocional, habitos y transformacion personal.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}
