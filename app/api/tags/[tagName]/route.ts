import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const GET = async (
  request: NextRequest,
  { params }: { params: { tagName: string } }
) => {
  const tagName = params.tagName;

  if (!tagName) {
    return NextResponse.json({ error: "Tag is required" }, { status: 400 });
  }

  try {
    const tag = await prisma.tag.findUnique({
      where: {
        tagName: tagName,
      },
      include: {
        posts: true,
      },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json(tag);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
