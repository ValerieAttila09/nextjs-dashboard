import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) => {
  try {
    // Handle if params is a Promise (for Vercel/Next.js 14+)
    const params = "then" in context.params ? await context.params : context.params;
    const { id } = params;

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