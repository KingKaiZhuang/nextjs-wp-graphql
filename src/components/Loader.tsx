'use client';

import { FourSquare } from "react-loading-indicators";
import type { CSSProperties, JSX } from "react";

const Loader = (): JSX.Element => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-slate-950">
            <div className="flex flex-col items-center animate-in fade-in duration-600">
                <FourSquare
                    color={["#5fdaa8", "#327fcd", "#cd32cd", "#cd8032"]}
                    size="large"
                />
                <p className="mt-5 text-base text-slate-500 dark:text-slate-400 tracking-wide">載入中，請稍候...</p>
            </div>
        </div>
    );
};

export default Loader;
