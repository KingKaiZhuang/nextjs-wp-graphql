import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation';
import { getPostsBySlug, getAllPosts } from "@/lib/queries"
import { cacheLife, cacheTag } from 'next/cache';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getCachedPost(slug: string) {
    'use cache'
    cacheLife({
        stale: 3600, // 1 hour until considered stale
        revalidate: 7200, // 2 hours until revalidated
        expire: 86400, // 1 day until expired
    })
    cacheTag('posts', `post-${slug}`)
    return getPostsBySlug(slug);
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const post = await getCachedPost((await params).slug);

    // optionally access and extend (rather than replace) parent metadata
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

    const formattedDate = new Date(post.date);
    const date = formattedDate.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <section className="w-full flex justify-center px-4">
            <div className="w-full max-w-4xl rounded-2xl md:bg-slate-50 md:px-4 md:py-5 md:px-6 md:py-6">
                <h1
                    className="font-bold text-xl md:text-2xl lg:text-3xl mb-4"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <div className="mb-4 text-lg text-slate-600">
                    發佈於 <b>{date}</b> By {post?.author?.node?.name}
                </div>

                <div className="article" dangerouslySetInnerHTML={{ __html: post?.content }} />
            </div>
        </section>
    )
}