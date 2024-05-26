import NotionService from "@/services/notion-service";
import { NextRequest, NextResponse } from "next/server";

const notionService = new NotionService();

export async function GET(request: Request, context: any) {
  const { slug } = context.params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const postPage = await notionService.getSingleBlogPost(slug);
    return NextResponse.json(postPage);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 404 });
  }
}
