import { LatestPosts } from "@/components/latest-posts";
import { getAllPosts } from '@/lib/queries'
import { cacheLife, cacheTag } from "next/cache";

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

async function getCachedPosts(searchTerm: string, category: string, before: string | null, after: string | null) {
    'use cache'
    cacheLife({
        stale: 3600, // 1 hour until considered stale
        revalidate: 7200, // 2 hours until revalidated
        expire: 86400, // 1 day until expired
    })
    cacheTag('posts')
    return getAllPosts(searchTerm, category, { before, after });
}

export default async function Page(props: {
    params: Params
    searchParams: SearchParams
}) {
    const searchParams = await props.searchParams;
    const searchTerm = typeof searchParams.search === 'string' ? searchParams.search : '';
    const category = typeof searchParams.categories === 'string' ? searchParams.categories : '';
    const before = searchParams.before as string || null;
    const after = searchParams.after as string || null;

    // Get All Posts
    const { posts, pageInfo } = await getCachedPosts(searchTerm, category, before, after);


    const latestPostsProps = {
        posts,
        pageInfo,
        category,
        searchTerm
    }

    return (
        <section className="w-full flex justify-center">
            <div className="w-full max-w-6xl">
                <LatestPosts {...latestPostsProps} />
            </div>
        </section>
    )
}