import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

export const GET = async () => {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        posts: {
          select: {
            id: true,
          },
        },
      },
    });
    return NextResponse.json(tags);
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

  const { name } = await req.json();

  if (!name) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const existingTag = await prisma.tag.findUnique({
      where: { tagName: name },
    });

    if (existingTag) {
      return NextResponse.json(
        { error: "Tag with this name already exists." },
        { status: 400 }
      );
    }

    const tag = await prisma.tag.create({
      data: {
        tagName: name,
      },
    });
    return NextResponse.json(tag);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id, newName } = await req.json();

  if (!id || !newName) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const existingTag = await prisma.tag.findUnique({
      where: { id: id },
    });

    if (!existingTag) {
      return NextResponse.json({ error: "Tag not found." }, { status: 404 });
    }

    const duplicateTag = await prisma.tag.findUnique({
      where: { tagName: newName },
    });

    if (duplicateTag) {
      return NextResponse.json(
        { error: "Tag with this name already exists." },
        { status: 400 }
      );
    }

    const updatedTag = await prisma.tag.update({
      where: { id: id },
      data: {
        tagName: newName,
      },
    });
    return NextResponse.json(updatedTag);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

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
    const existingTag = await prisma.tag.findUnique({
      where: { id: id },
    });

    if (!existingTag) {
      return NextResponse.json({ error: "Tag not found." }, { status: 404 });
    }

    const deletedTag = await prisma.tag.update({
      where: { id: id },
      data: {
        isDeleted: true,
      },
    });
    return NextResponse.json(deletedTag);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
