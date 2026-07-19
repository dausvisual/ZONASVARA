import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zonasvara.space"),
  title: {
    default: "ZONASVARA SPACE - Portal Berita Digital",
    template: "%s | ZONASVARA SPACE",
  },
  description: "Suara Fakta, Ruang Informasi. Menghadirkan informasi cepat, akurat, independen dan terpercaya.",
  keywords: ["Berita Nasional", "Berita Terkini", "Portal Berita Terpercaya", "Zonasvara Space", "Berita Indonesia", "Berita Politik", "Berita Ekonomi", "Informasi Terkini"],
  authors: [{ name: "Redaksi ZONASVARA SPACE" }],
  openGraph: {
    title: "ZONASVARA SPACE - Portal Berita Digital",
    description: "Suara Fakta, Ruang Informasi. Menghadirkan informasi cepat, akurat, independen dan terpercaya.",
    url: "https://zonasvara.space",
    siteName: "ZONASVARA SPACE",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo-utama.png",
        width: 1200,
        height: 630,
        alt: "ZONASVARA SPACE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZONASVARA SPACE",
    description: "Suara Fakta, Ruang Informasi. Menghadirkan informasi cepat, akurat, independen dan terpercaya.",
    images: ["/logo-utama.png"],
  },
  alternates: {
    canonical: "/",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${poppins.variable} ${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
