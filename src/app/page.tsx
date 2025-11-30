import { Hero } from "@/components/hero";
import { SocialIcons } from "@/components/social-icons";
import { Categories } from "@/components/categories";
import { LatestPosts } from "@/components/latest-posts";
import { getCategories, getAllPosts } from "@/lib/queries";
import { cacheLife, cacheTag } from "next/cache";

async function getCachedHomeData() {
  'use cache'
  cacheLife({
    stale: 3600,
    revalidate: 7200,
    expire: 86400,
  })
  cacheTag('posts', 'categories')

  const [categories, postsData] = await Promise.all([
    getCategories(),
    getAllPosts()
  ]);

  return { categories, postsData };
}

export default async function Home() {
  const { categories, postsData } = await getCachedHomeData();
  const { posts, pageInfo } = postsData;

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-6xl">
        <Hero />
        <SocialIcons />
        <Categories categories={categories} />
        <LatestPosts posts={posts} pageInfo={pageInfo} searchTerm="" />
      </div>
    </section>
  );
}
