import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: any }
) {
  try {
    const { id } = context.params;
    const user = await prisma.user.findUnique({
      where: { id }
    });

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch user!"
    }, { status: 500 });
  }
}