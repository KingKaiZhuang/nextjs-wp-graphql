import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RouterLoadingOverlay } from "@/components/router-loading-overlay";
import { LoadingProvider } from "@/lib/global-loading";

const inter = Inter({ subsets: ["latin"] });

// ⚠️ 替換為你的實際網域（用於 Open Graph 圖片和社交媒體分享）
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "StackPenguin 部落格",
  description: "分享前端開發、TypeScript 與 Next.js 筆記",
  metadataBase: new URL(baseUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        <LoadingProvider>
          <div className="min-h-screen flex flex-col">
            <RouterLoadingOverlay />
            <header className="w-full bg-white/90 backdrop-blur px-4 md:px-8">
              <div className="mx-auto w-full max-w-6xl py-2 md:py-2.5">
                <Header />
              </div>
            </header>

            <main className="flex-1 flex justify-center px-4 pt-0 pb-3 md:pt-1 md:pb-4">
              <div className="w-full max-w-5xl rounded-3xl bg-white/95 shadow-[0_22px_60px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5 backdrop-blur">
                <div className="px-5 py-5 md:px-10 md:py-8 lg:px-12 lg:py-10">
                  {children}
                  <Footer />
                </div>
              </div>
            </main>
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}
