import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const { thumbnail, title, slug, icon, tag, content, shortDesc } =
    await req.json();

  if (
    !thumbnail ||
    !title ||
    !slug ||
    !icon ||
    !tag ||
    !content ||
    !shortDesc
  ) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.create({
      data: {
        thumbnail,
        title,
        slug,
        icon,
        tag,
        content,
        shortDesc,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
