import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Progress } from "@prisma/client";

export function getProgress() {
  return prisma.progress.findFirst({
    include: { locations: true }
  });
}
