import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const GET = async () => {
  try {
    const tags = await prisma.tag.findMany();
    return NextResponse.json(tags);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
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
