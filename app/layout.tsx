import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://madatv4kids.vercel.app";

export const metadata: Metadata = {
  title: { default: "MadaTV — Science TV for Kids", template: "%s | MadaTV" },
  description:
    "Watch educational science series, learn key concepts, and test your knowledge with interactive quizzes. Available in English and Hebrew.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: "MadaTV",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <I18nProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t-2 border-indigo-100 bg-white py-8 px-4 text-center space-y-2">
              <p className="text-sm font-black text-indigo-400">
                🔬 MadaTV — Science TV for Kids · Made with ❤️ for curious minds
              </p>
              <p className="text-xs font-semibold text-gray-400 max-w-2xl mx-auto">
                📺 All video content is streamed directly from{" "}
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer nofollow" className="text-red-500 hover:underline font-bold">YouTube</a>.
                {" "}This site does not host, store, or own any of the video material. All rights belong to the respective copyright holders.
                This platform is for educational purposes only.
              </p>
            </footer>
          </div>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
