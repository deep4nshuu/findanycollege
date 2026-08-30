import { prisma } from "@/lib/prisma";
import type { CollegeSearchResult } from "../providers/types";

function createSlug(name: string, externalId: string) {
  const nameSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${nameSlug}-${externalId.slice(0, 8)}`;
}

export async function importProviderSearchResults(
  results: CollegeSearchResult[],
) {
  return Promise.all(
    results.map((result) =>
      prisma.college.upsert({
        where: {
          provider_providerId: {
            provider: result.provider,
            providerId: result.externalId,
          },
        },

        create: {
          name: result.name,
          slug: createSlug(result.name, result.externalId),
          city: result.city,
          state: result.state,

          provider: result.provider,
          providerId: result.externalId,
          providerType: result.type,
          websiteUrl: result.websiteUrl,
          sourceUrl: result.sourceUrl,
          lastSyncedAt: result.fetchedAt,
        },

        update: {
          name: result.name,
          city: result.city,
          state: result.state,

          providerType: result.type,
          websiteUrl: result.websiteUrl,
          sourceUrl: result.sourceUrl,
          lastSyncedAt: result.fetchedAt,
        },

        select: {
          id: true,
          slug: true,
          name: true,
          city: true,
          state: true,
          providerType: true,
        },
      }),
    ),
  );
}