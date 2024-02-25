import prisma from "../app/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getAllUsers() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const data = await prisma.user.findMany();
    const users = data.reverse();

    return users;
  } catch (error: unknown) {
    return null;
  }
}
