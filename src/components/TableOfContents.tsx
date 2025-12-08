"use client";

import { useState } from "react";
import type { TOCItem } from "@/lib/toc";

export function TableOfContents({ headings }: { headings: TOCItem[] }) {
    const [isOpen, setIsOpen] = useState(false);

    if (headings.length === 0) {
        return null;
    }

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-24 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                aria-label="Table of Contents"
            >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* TOC Sidebar/Popover */}
            {isOpen && (
                <div className="fixed bottom-40 right-8 z-40 w-64 rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">目錄</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="max-h-[60vh] overflow-y-auto pr-2">
                        <ul className="space-y-2">
                            {headings.map((heading) => (
                                <li
                                    key={heading.id}
                                    style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                                >
                                    <a
                                        href={`#${heading.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(heading.id)?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                            setIsOpen(false);
                                        }}
                                        className="block text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 transition-colors"
                                    >
                                        {heading.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}
