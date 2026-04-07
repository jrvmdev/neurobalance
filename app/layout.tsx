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
  title: "NeuroBalance — Transforma Tu Mente, Transforma Tu Vida",
  description:
    "Colección de guías digitales sobre neuroplasticidad, hábitos y psicología positiva. Conoce cómo piensas, cambia cómo vives.",
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
