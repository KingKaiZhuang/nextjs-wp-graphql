import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
// Wordpress 前端樣式
import "../../public/wp/block-library-style.css"
import "../../public/wp/theme.css"
// Stackable 外掛樣式
import "../../public/wp/stackable/frontend_blocks.css"
import "../../public/wp/stackable/frontend_blocks_responsive.css"

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
      <div className="min-h-screen flex flex-col">
            <header className="w-full bg-white px-4 md:px-8">
              <div className="w-full py-2 md:py-2.5">
                <Header />
              </div>
            </header>

            <main className="flex-1 flex justify-center px-4 pt-0 pb-3 md:pt-1 md:pb-4">
              <div className="w-full max-full">
                <div className="px-0 md:px-0 lg:px-0">
                  {children}
                </div>
              </div>
            </main>

            <footer className="w-full bg-white px-4 md:px-8">
              <div className="w-full py-2 md:py-2.5">
              <Footer />
              </div>
            </footer>
            </div>
      </body>
    </html>
  );
}
