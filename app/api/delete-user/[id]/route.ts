import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: any }
) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const { username, email, password } = body;

    if (!username && !email && !password) {
      return NextResponse.json(
        { error: "At least one field (username, email, password) is required!" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(username && { username }),
        ...(email && { email }),
        ...(password && { password }),
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user!" },
      { status: 500 }
    );
  }
}