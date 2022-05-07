import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getAllUsers() {
  return prisma.user.findMany({ select: { id: true, createdAt: true } });
}

export async function createUser(userId: User["id"]) {
  return prisma.user.create({
    data: {
      id: userId,
    },
  });
}

export async function uploadUserImage(
  id: User["id"],
  index: number,
  image: string
) {
  const user = await getUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.images.length !== index) {
    const images = [...user.images];
    images.splice(index, 1, image);

    return prisma.user.update({
      where: {
        id,
      },
      data: {
        images: {
          set: images,
        },
      },
    });
  } else {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        images: {
          push: image,
        },
      },
    });
  }
}
