import type { Metadata } from "next";
import { getPageById } from "@/lib/queries";
import { LoadingResetOnMount } from "@/components/loading/loading-reset-on-mount";
import "../../../public/wp/block-library-style.css"
// 可依需要調整重建時間
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "測試頁面 - StackPenguin",
};

export default async function TestPage() {
  // TODO: 把這裡的 3192 換成你實際的 WordPress Page DATABASE_ID
  const page = await getPageById(3192);

  if (!page) {
    return <div>找不到測試頁面</div>;
  }

  return (
    <section>
      <LoadingResetOnMount />
      <h1
        className="font-bold text-2xl mb-4"
        dangerouslySetInnerHTML={{ __html: page.title }}
      />
      <article
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </section>
  );
}
