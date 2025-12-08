"use client";

import { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { Post } from '@/lib/types';
import Link from "next/link";
import Image from "next/image";

type LatestPostsProps = {
    posts: Post[];
    title?: string;
    searchTerm?: string;
    pageInfo?: { startCursor: string | null, endCursor: string | null, hasNextPage: boolean; hasPreviousPage: boolean; };
    category?: string;
    compact?: boolean;
}

export function LatestPosts({ posts, searchTerm, pageInfo, category, compact = false }: LatestPostsProps) {
    if (!posts || posts.length === 0) {
        return <div>目前沒有文章。</div>
    }

    return (
        <>
            <div className="mb-12">
                {!compact && (
                    <div className="flex flex-col gap-4 items-start justify-between mb-8 sm:flex-row sm:items-center">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 transition-colors">最新文章</h2>
                        <div className="w-full max-w-xs sm:w-auto">
                            <SearchBar />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post: Post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 ease-out hover:-translate-y-1"
                        >
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                {post.featuredImage?.node?.sourceUrl ? (
                                    <Image
                                        src={post.featuredImage.node.sourceUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-slate-300 dark:text-slate-600">
                                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" })}
                                    </time>
                                    {post.categories?.nodes?.[0]?.name && (
                                        <>
                                            <span>•</span>
                                            <span className="text-indigo-500 dark:text-indigo-400">{post.categories.nodes[0].name}</span>
                                        </>
                                    )}
                                </div>
                                <h3
                                    className="mb-3 text-lg font-bold leading-snug text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                                    dangerouslySetInnerHTML={{ __html: post.title }}
                                />
                                <div
                                    className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>


            {!compact && (
                <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-8 transition-colors">
                    <div>
                        {pageInfo?.hasPreviousPage && (
                            <Link
                                href={{
                                    pathname: '/blog',
                                    query: {
                                        before: pageInfo.startCursor,
                                        ...((searchTerm || category) && { search: searchTerm, categories: category })
                                    }
                                }}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                            >
                                ← 上一頁
                            </Link>
                        )}
                    </div>

                    <div>
                        {pageInfo?.hasNextPage && (
                            <Link
                                href={{
                                    pathname: '/blog',
                                    query: {
                                        after: pageInfo.endCursor,
                                        ...((searchTerm || category) && { search: searchTerm, categories: category })
                                    }
                                }}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                            >
                                下一頁 →
                            </Link>
                        )}
                    </div>
                </div>
            )}

        </>
    )
}