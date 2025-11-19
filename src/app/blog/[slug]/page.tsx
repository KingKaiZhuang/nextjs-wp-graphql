import type { Metadata, ResolvingMetadata } from 'next'
import { getPostsBySlug, getAllPosts } from "@/lib/queries"

// ⏱️ ISR: Revalidate every 3600 seconds (1 hour)
// Pages will be regenerated in the background every 1 hour
export const revalidate = 3600;

// 📋 Pre-generate static pages for the top 200 most recent posts during build
// Remaining posts (200-1000) will be generated on-demand on first visit
export async function generateStaticParams() {
  try {
    const { posts } = await getAllPosts('', '', {});
    
    // Only pre-generate top 200 posts to keep build time reasonable
    // This keeps build time under 10 minutes while still covering ~80% of traffic
    return posts.slice(0, 50).map(post => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('generateStaticParams failed:', error);
    // If data fetching fails, all pages will be generated on-demand
    return [];
  }
}

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
        return <div>Post not found</div>
    }

    const formattedDate = new Date(post.date);
    const date = formattedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4" dangerouslySetInnerHTML={{ __html: post.title }}></h1>
            <div>Published on <b>{date}</b> by {post?.author?.node?.name}</div>

            <div className="article" dangerouslySetInnerHTML={{ __html: post?.content }} />


        </div>
    )
}