import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function saveRefreshToken(userId, token) {
  try {
    const refreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        token,
      },
    });
    return refreshToken;
  } catch (error) {
    console.log(error);
  }
}
