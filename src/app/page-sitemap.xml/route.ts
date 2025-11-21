import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function GET() {
  const urls = [
    {
      loc: `${baseUrl}/`,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${baseUrl}/blog`,
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/about`,
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      loc: `${baseUrl}/contact`,
      changefreq: "monthly",
      priority: "0.5",
    },
  ];

  const body = urls
    .map(
      (u) => `
  <url>
    <loc>${u.loc}</loc>
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
