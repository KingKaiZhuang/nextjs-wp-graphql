import { NextResponse } from "next/server";
import { getAllPages } from "@/lib/queries";
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
  const wpPages = await getAllPages();

  const staticUrls = [
    {
      loc: `${baseUrl}/`,
      changefreq: "weekly",
      priority: "1.0",
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${baseUrl}/blog`,
      changefreq: "weekly",
      priority: "0.8",
      lastmod: new Date().toISOString(),
    },
  ];

  const dynamicUrls = wpPages.map((page) => ({
    loc: `${baseUrl}/${page.slug}`,
    changefreq: "monthly",
    priority: "0.6",
    lastmod: page.modified ?? page.date,
  }));

  // Filter out dynamic pages that might conflict with static routes (optional safety check)
  const filteredDynamicUrls = dynamicUrls.filter(
    (d) => !staticUrls.some((s) => s.loc === d.loc)
  );

  const allUrls = [...staticUrls, ...filteredDynamicUrls];

  const body = allUrls
    .map(
      (u) => `
  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
