import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany()

    return NextResponse.json(users, { status: 200 })

  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch user!"
    }, { status: 500 })
  }
}