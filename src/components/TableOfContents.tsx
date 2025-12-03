"use client";

import { useEffect, useState } from "react";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents({ content }: { content: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [headings, setHeadings] = useState<TOCItem[]>([]);

    useEffect(() => {
        // Parse content to find headings
        // Note: This assumes the content HTML is static and doesn't change after mount.
        // Since we are passing the raw HTML string, we can parse it.
        // However, to scroll to elements, they need to exist in the DOM with IDs.
        // The 'content' prop is just for parsing structure.
        // We need to ensure the rendered article has IDs.
        // A better approach for client-side TOC is to query the DOM after render.

        const elements = document.querySelectorAll(".article h2, .article h3");
        const items: TOCItem[] = [];

        elements.forEach((el, index) => {
            if (!el.id) {
                el.id = `heading-${index}`;
            }
            items.push({
                id: el.id,
                text: el.textContent || "",
                level: parseInt(el.tagName.substring(1)),
            });
        });

        setHeadings(items);
    }, [content]);

    if (headings.length === 0) {
        return null;
    }

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-24 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg ring-1 ring-slate-200 transition-all hover:bg-slate-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
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
                <div className="fixed bottom-40 right-8 z-40 w-64 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200 animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">目錄</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-slate-600"
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
                                        className="block text-sm text-slate-600 hover:text-indigo-600 line-clamp-2"
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
