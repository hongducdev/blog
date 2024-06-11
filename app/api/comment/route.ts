import { NextResponse } from "next/server";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prismadb";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { postId, content, parentId } = await req.json();

  const emailUser = session?.user?.email as string;

  if (!postId || !content) {
    return NextResponse.json(
      { error: "postId and content are required" },
      { status: 400 }
    );
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        postId,
        content,
        emailUser,
        parentId: parentId || null,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
