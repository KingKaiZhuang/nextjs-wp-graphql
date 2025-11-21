import Image from "next/image";

export function Hero() {
    return (
        <section className="mb-8 md:mb-10 flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex-1">
                <p className="text-xs tracking-[0.25em] uppercase text-slate-500 mb-3">
                    WELCOME
                </p>
                <h1 className="font-semibold text-2xl md:text-3xl tracking-tight mb-3 text-slate-900">
                    嗨，我是 StackPenguin。
                </h1>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
                    這裡主要記錄我在前端開發、TypeScript、Next.js 以及
                    使用 WordPress 作為 Headless CMS 時的各種實作筆記、
                    踩過的坑和一些想法，希望也能對正在學習的你有幫助。
                </p>
            </div>
            <div className="relative flex-1 max-w-sm mx-auto md:mx-0">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-sky-400/40 via-violet-500/20 to-emerald-400/40 blur-2xl" />
                <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.35)] bg-slate-900">
                    <Image
                        src="/hero.webp"
                        alt="StackPenguin"
                        width={700}
                        height={102}
                        quality={80}
                        placeholder="blur"
                        blurDataURL="/hero-placeholder.png"
                        loading="eager"
                        className="h-full w-full object-cover opacity-95"
                    />
                </div>
            </div>
        </section>
    );
}