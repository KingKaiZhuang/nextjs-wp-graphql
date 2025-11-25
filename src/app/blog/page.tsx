import { LatestPosts } from "@/components/latest-posts";
import { getAllPosts } from '@/lib/queries'
import { LoadingResetOnMount } from "@/components/loading/loading-reset-on-mount";

// ⏱️ ISR: Revalidate listing page every 300 seconds (5 minutes)
// to show new posts and updated metadata faster than individual posts
export const revalidate = 3600;
export const dynamic = "force-static"; 

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


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
    const { posts, pageInfo } = await getAllPosts(searchTerm, category, { before, after });


    const latestPostsProps = {
        posts,
        pageInfo,
        category,
        searchTerm
    }

    return (
        <section>
            <LoadingResetOnMount />
            <LatestPosts {...latestPostsProps} />
        </section>
    )
}