import type { ReactNode } from "react";
import { LoadingResetOnMount } from "@/components/loading/loading-reset-on-mount";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingResetOnMount />
      {children}
    </>
  );
}
