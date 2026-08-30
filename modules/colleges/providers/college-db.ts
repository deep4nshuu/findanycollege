import { z } from "zod";
import type {
  CollegeProvider,
  CollegeSearchResult,
  SearchCollegesInput,
} from "./types";

const collegeDBResponseSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      city: z.string().nullable().optional(),
      state: z.string().nullable().optional(),
      type: z.string().nullable().optional(),
      website: z.string().nullable().optional(),
    }),
  ),
});

export class CollegeDBProvider implements CollegeProvider {
  name = "COLLEGE_DB" as const;

  async searchColleges({
    query,
    limit = 10,
  }: SearchCollegesInput): Promise<CollegeSearchResult[]> {
    const apiKey = process.env.COLLEGE_DB_API_KEY;

    if (!apiKey) {
      throw new Error("COLLEGE_DB_API_KEY is missing.");
    }

    const url = new URL(
      "https://api.collegedb.in/v1/colleges/search",
    );

    url.searchParams.set("q", query);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: {
        revalidate: 60 * 60 * 24, // Cache provider responses for one day
      },
    });

    if (!response.ok) {
      throw new Error(
        `CollegeDB search failed with status ${response.status}.`,
      );
    }

    const rawData: unknown = await response.json();
    const parsedData = collegeDBResponseSchema.parse(rawData);

    return parsedData.results.slice(0, limit).map((college) => ({
      externalId: college.id,
      name: college.name.trim(),
      city: college.city ?? null,
      state: college.state ?? null,
      type: college.type ?? null,
      websiteUrl: college.website ?? null,
      sourceUrl: null,
      provider: "COLLEGE_DB",
      fetchedAt: new Date(),
    }));
  }
}