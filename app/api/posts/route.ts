import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        isDeleted: false,
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
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

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
