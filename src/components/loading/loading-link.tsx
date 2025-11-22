"use client";

import Link, { LinkProps } from "next/link";
import type { ReactNode, MouseEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useGlobalLoading } from "@/lib/loading/global-loading";

type LoadingLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

export function LoadingLink({ children, onClick, href, ...rest }: LoadingLinkProps) {
  const { setLoading } = useGlobalLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (onClick) {
      onClick(e as any);
    }
    if (e.defaultPrevented) return;

    const currentPath = pathname + (searchParams.toString() ? `?${searchParams}` : "");
    const targetPath = typeof href === "string" ? href : href.pathname || "";

    if (targetPath && targetPath !== currentPath) {
      setLoading(true);
    }
  }

  return (
    <Link href={href} {...rest} onClick={handleClick}>
      {children}
    </Link>
  );
}
