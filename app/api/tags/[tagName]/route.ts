import NotionService from "@/services/notion-service";
import { NextRequest, NextResponse } from "next/server";

const notionService = new NotionService();

export async function GET(
  request: NextRequest,
  context: { params: { tagName: string } }
) {
  const { tagName } = context.params;

  if (!tagName) {
    return NextResponse.json(
      { error: "Tag name is required" },
      { status: 400 }
    );
  }

  try {
    const posts = await notionService.getPostsByTag(tagName);
    return NextResponse.json(posts);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
