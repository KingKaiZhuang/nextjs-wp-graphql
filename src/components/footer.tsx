"use client"

export function Footer() {
    return (
        <footer className="mt-10 border-t border-slate-200 pt-4 text-xs md:text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
            <div>
                &copy; {new Date().getFullYear()} StackPenguin. 版權所有。
            </div>
            <div className="flex items-center gap-3">
                <span className="hidden md:inline">使用 Next.js 與 WordPress 建置。</span>
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="text-emerald-600">持續學習中。</span>
            </div>
        </footer>
    )
}