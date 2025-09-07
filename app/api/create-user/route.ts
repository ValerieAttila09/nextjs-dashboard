import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { username, email, password } = body

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          error: "Username / Email / Password are required!"
        }, {
        status: 400
      })
    }

    const user = await prisma.user.create({
      data: { username, email, password }
    })

    return NextResponse.json(user, { status: 201 })

  } catch (error) {
    return NextResponse.json({
      error: "Failed to create user!"
    }, { status: 500 })
  }
}