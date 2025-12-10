import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Suspense } from "react";


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
    <html lang="zh-Hant" className="dark">
      <body className={`${inter.className} antialiased bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 relative`}>

        <div className="min-h-screen flex flex-col relative z-10">
          <Header />
          {/* Spacer for fixed/floating nav. CardNav is absolute/floating (top 2em + 60px height ~= 92px) */}
          <div className="h-[120px]"></div>

          <main className="flex-1 flex justify-center px-4 pt-4 pb-3 md:pt-1 md:pb-4">
            <div className="w-full max-full">
              <div className="px-0 md:px-0 lg:px-0">
                {children}
              </div>
            </div>
          </main>

          <div className="w-full bg-white dark:bg-slate-950 transition-colors px-4 md:px-8">
            <div className="w-full py-2 md:py-2.5">
              <Suspense fallback={<div>載入中...</div>}>
                <Footer />
              </Suspense>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
