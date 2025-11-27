import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation';
import { getPostsBySlug, getAllPosts } from "@/lib/queries"
import { LoadingResetOnMount } from "@/components/loading/loading-reset-on-mount";

export const dynamic = 'force-static'; // Disable static generation
export const revalidate = 3600; // Revalidate every hour

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const post = await getPostsBySlug((await params).slug);

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: post?.title,
        openGraph: {
            images: ['/open-graph.jpg', ...previousImages],
        },
    }
}

export default async function Page({ params }: {
    params: Promise<{ slug: string }>
}) {

    const post = await getPostsBySlug((await params).slug);
    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.date);
    const date = formattedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <section className="w-full flex justify-center px-4">
            <div className="w-full max-w-4xl rounded-2xl md:bg-slate-50 md:px-4 md:py-5 md:px-6 md:py-6">
                <LoadingResetOnMount />
                <h1
                    className="font-bold text-2xl mb-4"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <div className="mb-4 text-sm text-slate-600">
                    Published on <b>{date}</b> by {post?.author?.node?.name}
                </div>

                <div className="article" dangerouslySetInnerHTML={{ __html: post?.content }} />
            </div>
        </section>
    )
}