import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

export const GET = async () => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        tagName: "asc",
      },
      include: {
        posts: true,
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

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { name } = await req.json();

  if (!name) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const tag = await prisma.tag.create({
      data: {
        tagName: name,
      },
    });
    return NextResponse.json(tag);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
