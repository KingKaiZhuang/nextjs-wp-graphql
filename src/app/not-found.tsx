import Link from 'next/link';

export default async function Page() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">404</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 transition-colors">找不到此頁面</p>
            <Link href="/" className="px-6 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors font-medium">
                返回首頁
            </Link>
        </div>
    )
}