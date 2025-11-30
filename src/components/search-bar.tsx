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
        <form onSubmit={handleSearch} method="GET" className="group w-full flex items-center gap-2">
            <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500 transition-colors group-focus-within:text-teal-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    name="search"
                    placeholder="搜尋..."
                    className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500"
                />
            </div>
            <button
                type="submit"
                className="hidden sm:inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 active:bg-slate-950"
            >
                搜尋
            </button>
        </form>
    );
}