import { Hero } from "@/components/hero";
import { SocialIcons } from "@/components/social-icons";
import { Categories } from "@/components/categories";
import { LatestPosts } from "@/components/latest-posts";
import { getCategories, getAllPosts } from "@/lib/queries";
import Link from "next/link";

export default async function Home() {
  const categories = await getCategories();
  const { posts, pageInfo } = await getAllPosts();
  
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
