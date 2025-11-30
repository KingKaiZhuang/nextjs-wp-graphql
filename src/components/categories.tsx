"use client";

import { useState } from "react";
import { Category } from "@/lib/types";
import Link from "next/link";

export function Categories({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  if (!categories?.length) return null;

  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          分類
        </h2>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          {open ? "收合" : "展開全部"}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
          }`}
      >
        <ul className="flex flex-wrap gap-2.5 pb-1">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/blog?categories=${category.slug}`}
                className="group flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md active:scale-95"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 transition-colors group-hover:bg-emerald-500" />
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}