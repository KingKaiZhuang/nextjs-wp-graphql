'use client';
import { useRouter } from 'next/navigation';

export function SearchBar() {
    const router = useRouter();

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const searchInput = event.currentTarget.elements.namedItem('search') as HTMLInputElement;
        const value = searchInput.value.trim();
        router.push(value ? `/blog?search=${encodeURIComponent(value)}` : '/blog');
    }

    return (
        <form onSubmit={handleSearch} method="GET" className="w-full flex items-center gap-2">
            <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-slate-400 text-xs">
                    🔍
                </span>
                <input
                    type="text"
                    name="search"
                    placeholder="搜尋文章關鍵字..."
                    className="w-full rounded-full border border-slate-300 bg-white py-1.5 pl-7 pr-3 text-sm shadow-sm outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
            </div>
            <button
                type="submit"
                className="hidden sm:inline-flex items-center rounded-full bg-teal-600 px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-teal-700 active:bg-teal-800 disabled:opacity-60"
            >
                搜尋
            </button>
        </form>
    );
}