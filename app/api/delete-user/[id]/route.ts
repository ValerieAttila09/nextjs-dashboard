import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  try {
    const { id } = context.params;

    const user = await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      error: "Failed to delete user!"
    }, { status: 500 });
  }
}