import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

// Existing GET method
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

// POST method with authentication
export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
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
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

// PUT method with authentication
export const PUT = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id, thumbnail, title, slug, icon, tag, content, shortDesc } =
    await req.json();

  if (
    !id ||
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
    const post = await prisma.post.update({
      where: {
        id,
      },
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
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

// DELETE method with authentication
export const DELETE = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data: { isDeleted: true },
    });
    return NextResponse.json(post);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
