
import { Category } from "@/lib/types";
import Link from "next/link";

export function Categories({ categories }: { categories: Category[] }) {
    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <section className="mt-6 mb-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-medium tracking-[0.22em] text-slate-500 uppercase">
                    分類
                </h2>
            </div>

            <ul className="flex flex-wrap gap-2 text-xs">
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