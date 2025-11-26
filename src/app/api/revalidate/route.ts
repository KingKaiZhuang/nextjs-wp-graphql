import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const body = await req.json();
  

  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const slug = body.slug as string | null;
  const postType = body.post_type as string | null;
  const event = body.event as string | null;

  console.log("Revalidate triggered for slug:", slug);


  // 依照你的路由結構調整這裡
  if (postType === "post" && slug) {
    // 假設文章在 /blog/[slug]
    revalidatePath(`/blog/${slug}`);
  }

  // 如果有列表頁也想重建
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/test");

  return NextResponse.json({
    revalidated: true,
    event,
    slug,
  });
}
