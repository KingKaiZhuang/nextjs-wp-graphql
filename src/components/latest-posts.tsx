"use client";

import { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { Post } from '@/lib/types';
import Link from "next/link";
import { ThreeDot } from "react-loading-indicators";


type LatestPostsProps = {
    posts: Post[];
    title?: string;
    searchTerm?: string;
    pageInfo?: { startCursor: string | null, endCursor: string | null, hasNextPage: boolean; hasPreviousPage: boolean; };
    category?: string;
}

export function LatestPosts({ posts, searchTerm, pageInfo, category }: LatestPostsProps) {
    const [isNavigating, setIsNavigating] = useState(false);

    if (!posts || posts.length === 0) {
        return <div>No Posts available.</div>
    }

    return (
        <>
            <div className="mb-8">
                <div className="flex justify-between">
                    <h2 className="text-xl mb-4">Latest Posts</h2>
                    <div>
                        <SearchBar />
                    </div>
                </div>

                <div className="flex flex-col mb-4">
                    {posts.map((post: Post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            onClick={() => setIsNavigating(true)}
                            className="border-b py-4 flex justify-between items-center gap-4 hover:bg-slate-100 active:bg-slate-200 active:scale-[0.99] transition duration-150 ease-out"
                        >
                            <div
                                className="flex-1 text-sm md:text-base leading-snug"
                                dangerouslySetInnerHTML={{ __html: post.title }}
                            />
                            <p className="shrink-0 text-xs text-slate-500">
                                {new Date(post.date).toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" })}
                            </p>
                        </Link>
                    ))}
                </div>

                {isNavigating && (
                    <div className="flex justify-center py-3">
                        <ThreeDot color="#0f766e" size="small" />
                    </div>
                )}
            </div>


            <div className="flex justify-between">
                <div>
                    {pageInfo?.hasPreviousPage && (
                        <Link href={{
                            pathname: '/blog',
                            query: {
                                before: pageInfo.startCursor,
                                ...((searchTerm || category) && { search: searchTerm, categories: category })
                            }
                        }}>
                            Previous
                        </Link>
                    )}
                </div>

                <div>
                    {pageInfo?.hasNextPage && (
                        <Link href={{
                            pathname: '/blog',
                            query: {
                                after: pageInfo.endCursor,
                                ...((searchTerm || category) && { search: searchTerm, categories: category })
                            }
                        }}>
                            Next
                        </Link>
                    )}
                </div>
            </div>

        </>
    )
}