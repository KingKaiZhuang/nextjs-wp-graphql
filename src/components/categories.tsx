"use client";

import { useState } from "react";
import { Category } from "@/lib/types";
import Link from "next/link";

export function Categories({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  if (!categories || categories.length === 0) return null;

  return (
    <section className="mt-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-medium tracking-[0.22em] text-slate-500 uppercase">
          分類
        </h2>

        {/* 手機：折疊開關；桌機：隱藏 */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center rounded-full border border-slate-200 px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 md:hidden"
        >
          {open ? "收合" : "全部顯示"}
        </button>
      </div>

      <ul
        className={[
          "flex flex-wrap gap-2 text-xs transition-all",
          // md 以上永遠顯示；手機依 open 決定
          open ? "max-h-96" : "max-h-0 overflow-hidden md:max-h-none",
          "md:max-h-none md:overflow-visible",
        ].join(" ")}
      >
        {categories.map((category: Category) => (
          <li key={category.id} className="flex-shrink-0">
            <Link
              href={`/blog?categories=${category.slug}`}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}