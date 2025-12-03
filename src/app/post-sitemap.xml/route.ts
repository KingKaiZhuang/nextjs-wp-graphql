import { NextResponse } from "next/server";
import { getAllPostSlugs } from "@/lib/queries";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  const posts = await getAllPostSlugs();

  const urls = posts
    .map(
      (post) => {
        const imageTag = post.featuredImage?.node?.sourceUrl
          ? `
    <image:image>
      <image:loc>${escapeXml(post.featuredImage.node.sourceUrl)}</image:loc>
    </image:image>`
          : "";

        return `
  <url>
    <loc>${escapeXml(`${baseUrl}/blog/${post.slug}`)}</loc>
    <lastmod>${new Date(post.modified ?? post.date ?? new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${imageTag}
  </url>`;
      }
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}