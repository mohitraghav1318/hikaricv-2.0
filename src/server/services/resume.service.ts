import { prisma } from "@/server/db/prisma";

export async function getResumeById(id: string) {
  return prisma.resume.findUnique({
    where: {
      id,
    },
  });
}

export async function getUserResumes(userId: string) {
  return prisma.resume.findMany({
    where: {
      userId,
    },
  });
}