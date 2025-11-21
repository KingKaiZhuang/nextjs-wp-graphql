"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ThreeDot } from "react-loading-indicators";

export function RouterLoadingOverlay() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 當路由變化時，短暫顯示全螢幕 loading（模擬載入過程）
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // 約 0.4 秒的過場時間

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <ThreeDot color="#0f766e" size="medium" />
        <p className="text-xs text-slate-600">頁面載入中...</p>
      </div>
    </div>
  );
}
