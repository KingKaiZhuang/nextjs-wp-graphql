"use client";

import Link, { LinkProps } from "next/link";
import type { ReactNode, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useGlobalLoading } from "@/lib/loading/global-loading";

type LoadingLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

export function LoadingLink({ children, onClick, ...props }: LoadingLinkProps) {
  const { setLoading } = useGlobalLoading();
  const pathname = usePathname();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (onClick) {
      onClick(e as any);
    }
    if (!e.defaultPrevented && props.href !== pathname) {
      setLoading(true);
    }
  }

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
