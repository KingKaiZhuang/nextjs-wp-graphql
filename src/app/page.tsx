import { Hero } from "@/components/hero";
import { SocialIcons } from "@/components/social-icons";
import { Categories } from "@/components/categories";
import { LatestPosts } from "@/components/latest-posts";
import { getCategories, getAllPosts } from "@/lib/queries";
import Link from "next/link";
import { Suspense } from "react";
import { LoadingResetOnMount } from "@/components/loading/loading-reset-on-mount";

// ⏱️ ISR: Revalidate homepage every 1800 seconds (30 minutes)
// Homepage shows latest posts and categories, so update more frequently
export const revalidate = 1800;

export default async function Home() {
  const categories = await getCategories();
  const { posts, pageInfo } = await getAllPosts();
  
  return (
    <Suspense fallback={null}>
      <section>
        <LoadingResetOnMount />
        <Hero />
        <SocialIcons />
        <Categories categories={categories} />
        <LatestPosts posts={posts} pageInfo={pageInfo} searchTerm="" />
      </section>
    </Suspense>
  );
}
