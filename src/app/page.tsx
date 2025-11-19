import { Hero } from "@/components/hero";
import { SocialIcons } from "@/components/social-icons";
import { Categories } from "@/components/categories";
import { LatestPosts } from "@/components/latest-posts";
import { getCategories, getAllPosts } from "@/lib/queries";
import Link from "next/link";

// ⏱️ ISR: Revalidate homepage every 1800 seconds (30 minutes)
// Homepage shows latest posts and categories, so update more frequently
export const revalidate = 1800;

export default async function Home() {
  const categories = await getCategories();
  const { posts, pageInfo } = await getAllPosts();
  
  return (
    <section>
      <Hero />
      <SocialIcons />
      <Categories categories={categories} />
      <LatestPosts posts={posts} pageInfo={pageInfo} searchTerm="" />
      <div className="text-center">
        <Link href={`/blog`} className='hover:underline text-gray-900 py-5 block rounded-md'>
          View all posts
        </Link>
      </div>
    </section>
  );
}
