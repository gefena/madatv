import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Life — How the Human Body Works",
  description:
    "Watch the Life documentary series and test your knowledge with interactive quizzes. Available in English and Hebrew.",
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
                🧬 Life Series — Educational Platform · Made with ❤️ for curious minds
              </p>
              <p className="text-xs font-semibold text-gray-400 max-w-2xl mx-auto">
                📺 All video content is streamed directly from{" "}
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline font-bold">YouTube</a>.
                {" "}This site does not host, store, or own any of the video material. All rights belong to the respective copyright holders.
                This platform is for educational purposes only.
              </p>
            </footer>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
