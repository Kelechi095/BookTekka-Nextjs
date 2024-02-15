import prisma from "../app/lib/prismadb";

export async function getUserByUsername(arg: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: arg,
      },
    });

    return user;
  } catch (error: any) {
    return null;
  }
}
