import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Progress } from "@prisma/client";

export function getProgress() {
  return prisma.progress.findFirst({});
}

export function updateProgress(currentStep: number) {
  return prisma.progress.update({
    where: {
      title: "The Hunt",
    },
    data: {
      currentStep,
    },
  });
}
