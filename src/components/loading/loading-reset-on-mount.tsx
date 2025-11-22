"use client";

import { useEffect } from "react";
import { useGlobalLoading } from "@/lib/loading/global-loading";

export function LoadingResetOnMount() {
  const { setLoading } = useGlobalLoading();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return null;
}
