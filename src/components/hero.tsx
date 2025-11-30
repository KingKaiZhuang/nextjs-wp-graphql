import { cacheLife } from "next/cache";
import Image from "next/image";

export async function Hero() {
    'use cache'
    cacheLife({
        stale: 3600,
        revalidate: 7200,
        expire: 86400,
    })

    return (
        <section className="mb-8 md:mb-10 flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex-1">
                <p className="text-xs tracking-[0.25em] uppercase text-slate-500 mb-3">
                    Welcome
                </p>
                <h1 className="font-semibold text-2xl md:text-3xl tracking-tight mb-3 text-slate-900">
                    嗨，我是 StackPenguin。
                </h1>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
                    這裡主要記錄我在學習的過程中所遇到的技術問題與解決方案，
                    還有使用 WordPress 的一些心得、
                    踩過的坑和一些想法，希望也能對正在學習的你有幫助。
                    也歡迎私訊與我交流！
                </p>
            </div>
            <div className="relative flex-1 max-w-xs mx-auto md:mx-0">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-sky-400/40 via-violet-500/20 to-emerald-400/40 blur-2xl" />
                <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.35)] bg-slate-900">
                    <Image
                        src="/hero.jpg"
                        alt="StackPenguin"
                        width={640}
                        height={650}
                        quality={75}
                        priority
                        fetchPriority="high"
                        sizes="(max-width: 320px) 100vw, 320px"
                        placeholder="blur"
                        blurDataURL="/hero.webp"
                        className="h-full w-full object-cover opacity-95"
                    />
                </div>
            </div>
        </section>
    );
}