import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/authOptions";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { thumbnail, title, slug, icon, tag, content, shortDesc } =
    await req.json();
  const id = params.id;

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        thumbnail,
        title,
        slug,
        icon,
        content,
        shortDesc,
        tag: {
          connect: { tagName: tag },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error editing post" });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }
  const id = params.id;

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error editing post" });
  }
};
