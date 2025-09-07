import { PrismaClient, Prisma } from "../lib/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    username: "John Doe",
    email: "johnDoe@gmail.com",
    password: "ggwp123"
  },
  {
    username: "Alice",
    email: "Alice@prisma.io",
    password: "ggwp123"
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();