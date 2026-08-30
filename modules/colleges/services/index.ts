import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getCollegeById = cache(async (slug: string) => {
  return prisma.college.findUnique({
    where: { slug },

    include: {
      courses: {
        include: {
          cutoffs: {
            include: {
              exam: true,
            },
          },
        },
        orderBy: { name: "asc" },
      },

      placements: {
        orderBy: { year: "desc" },
      },

      reviews: {
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });
});