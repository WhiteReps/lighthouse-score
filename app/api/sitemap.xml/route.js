import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_OWN_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_POST_URL}/api/posts/sitemap/${process.env.NEXT_PUBLIC_SITE_ID}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    
    const posts = await response.json();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
      ${posts.map(post => `
        <url>
          <loc>${baseUrl}/${post.post_slug}</loc>
          <lastmod>${new Date(post.created_at).toISOString()}</lastmod>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error.message);
    return new Response("Error generating sitemap", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
