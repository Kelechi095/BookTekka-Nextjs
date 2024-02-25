import prisma from "../app/lib/prismadb";

export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  } catch (error: unknown) {
    return null;
  }
}
