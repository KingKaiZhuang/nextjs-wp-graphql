import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation';
import { getPostsBySlug, getRelatedPosts } from "@/lib/queries"
import { cacheLife, cacheTag } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { LatestPosts } from '@/components/latest-posts';
import PostViews from '@/components/post-views';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getCachedPost(slug: string) {
    'use cache'
    cacheLife({
        stale: 3600,
        revalidate: 7200,
        expire: 86400,
    })
    cacheTag('posts', `post-${slug}`)
    return getPostsBySlug(slug);
}

async function getCachedRelatedPosts(categorySlug: string, currentPostId: string) {
    'use cache'
    cacheLife({
        stale: 3600,
        revalidate: 7200,
        expire: 86400,
    })
    cacheTag('posts', `related-${categorySlug}`)
    return getRelatedPosts(categorySlug, currentPostId);
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const post = await getCachedPost((await params).slug);

    const previousImages = (await parent).openGraph?.images || []
    const featuredImage = post?.featuredImage?.node?.sourceUrl

    return {
        title: post?.title,
        openGraph: {
            images: featuredImage ? [featuredImage, ...previousImages] : ['/open-graph.jpg', ...previousImages],
        },
    }
}

export default async function Page({ params }: {
    params: Promise<{ slug: string }>
}) {
    const post = await getCachedPost((await params).slug);
    if (!post) {
        notFound();
    }

    const relatedPosts = post.categories?.nodes?.[0]?.slug
        ? await getCachedRelatedPosts(post.categories.nodes[0].slug, post.id)
        : [];

    const formattedDate = new Date(post.date);
    const date = formattedDate.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="container mx-auto px-4 pt-8 md:pt-12 max-w-5xl">
                {/* Breadcrumbs */}
                <nav className="flex text-sm text-slate-500 mb-8">
                    <Link href="/" className="hover:text-indigo-600 transition-colors">首頁</Link>
                    <span className="mx-2">/</span>
                    {post.categories?.nodes?.[0] && (
                        <>
                            <Link href={`/blog?categories=${post.categories.nodes[0].slug}`} className="hover:text-indigo-600 transition-colors">
                                {post.categories.nodes[0].name}
                            </Link>
                            <span className="mx-2">/</span>
                        </>
                    )}
                    <span className="text-slate-900 font-medium truncate max-w-[200px]">{post.title}</span>
                </nav>

                {/* Header */}
                <header className="mb-10 max-w-4xl mx-auto">
                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                    />

                    <div className="flex items-center gap-4">
                        {post.author?.node?.avatar?.url ? (
                            <Image
                                src={post.author.node.avatar.url}
                                alt={post.author.node.name}
                                width={48}
                                height={48}
                                className="rounded-full border border-slate-200"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                                {post.author?.node?.name?.charAt(0) || 'A'}
                            </div>
                        )}
                        <div>
                            <div className="font-semibold text-slate-900">{post.author?.node?.name}</div>
                            <div className="flex items-center text-sm text-slate-500">
                                <span>發佈於 {date}</span>
                                <PostViews postId={post.databaseId} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {post.featuredImage?.node?.sourceUrl && (
                    <div className="relative w-full aspect-video md:aspect-[21/9] mb-12 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            unoptimized
                        />
                    </div>
                )}

                {/* Content */}
                <article className="article prose prose-lg prose-slate mx-auto max-w-3xl mb-16">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {/* Footer (Tags & Share) */}
                <div className="max-w-3xl mx-auto border-t border-slate-200 pt-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-semibold text-slate-700 mr-2">標籤：</span>
                        {post.tags?.nodes?.length > 0 ? (
                            post.tags.nodes.map(tag => (
                                <span key={tag.name} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">
                                    {tag.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-slate-400">無標籤</span>
                        )}
                    </div>

                    {/* Mock Share Buttons */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-slate-700">分享：</span>
                        <button className="text-slate-400 hover:text-[#1877F2] transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </button>
                        <button className="text-slate-400 hover:text-[#1DA1F2] transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </button>
                    </div>
                </div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <div className="max-w-5xl mx-auto border-t border-slate-200 pt-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8">相關文章</h3>
                        <LatestPosts posts={relatedPosts} compact={true} />
                    </div>
                )}
            </div>
        </div>
    )
}