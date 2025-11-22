"use client";

import { LoadingLink } from "@/components/loading/loading-link";

export function Header() {

    return(
        <header className="flex flex-col gap-4 mb-10 md:mb-14 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white text-xl font-semibold shadow-sm">
                    SP
                </div>
                <div>
                    <LoadingLink href={'/'} className="block text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
                        StackPenguin
                    </LoadingLink>
                    <p className="text-xs md:text-sm text-slate-500">記錄開發心得、實驗與學習筆記。</p>
                </div>
            </div>

            <nav className="flex items-center justify-start md:justify-end text-sm text-slate-700">
                <ul className="flex gap-3 md:gap-5 rounded-full bg-slate-100/70 px-2 py-1.5 ring-1 ring-slate-200">
                    <li>
                        <LoadingLink href={'/'} className="px-3 py-1 rounded-full hover:bg-white hover:text-slate-900 transition">
                            首頁
                        </LoadingLink>
                    </li>
                    <li>
                        <LoadingLink href={'/blog'} className="px-3 py-1 rounded-full hover:bg-white hover:text-slate-900 transition">
                            文章
                        </LoadingLink>
                    </li>
                    <li>
                        <LoadingLink href={'/about'} className="px-3 py-1 rounded-full hover:bg-white hover:text-slate-900 transition">
                            關於我
                        </LoadingLink>
                    </li>
                    <li>
                        <LoadingLink href={'/contact'} className="px-3 py-1 rounded-full hover:bg-white hover:text-slate-900 transition">
                            聯絡
                        </LoadingLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}