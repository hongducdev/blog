import NotionService from "@/services/notion-service";
import { NextRequest, NextResponse } from "next/server";

const notionService = new NotionService();

export async function GET(request: NextRequest, context: any) {
  const { slug } = context.params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const postPage = await notionService.getSingleBlogPost(slug);
    if (!postPage) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const newViewsCount = postPage.post.views + 1;
    await notionService.updatePostViews(postPage.post.id, newViewsCount);

    const updatedPostPage = await notionService.getSingleBlogPost(slug);

    return NextResponse.json(updatedPostPage);
  } catch (error: unknown) {
    console.error("Error fetching post metadata:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
