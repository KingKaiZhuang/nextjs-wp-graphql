"use client";

import { ThreeDot } from "react-loading-indicators";
import { useGlobalLoading } from "@/lib/global-loading";

export function RouterLoadingOverlay() {
  const { isLoading } = useGlobalLoading();

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
