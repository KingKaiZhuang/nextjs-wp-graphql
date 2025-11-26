import { LatestPosts } from "@/components/latest-posts";
import { getAllPosts } from '@/lib/queries'
import { LoadingResetOnMount } from "@/components/loading/loading-reset-on-mount";

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
        <section className="w-full flex justify-center">
            <div className="w-full max-w-6xl">
                <LoadingResetOnMount />
                <LatestPosts {...latestPostsProps} />
            </div>
        </section>
    )
}