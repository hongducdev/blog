import { NextResponse } from "next/server";
import NotionService from "@/services/notion-service";

const notionService = new NotionService();

export async function GET() {
  try {
    const posts = await notionService.getPublishedPosts();
    return NextResponse.json(posts);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
