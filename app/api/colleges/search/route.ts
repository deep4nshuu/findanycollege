import { NextRequest, NextResponse } from "next/server";
import { collegeProvider } from "@/modules/colleges/providers";
import { importProviderSearchResults } from "@/modules/colleges/services/provider-search";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json(
      { results: [] },
      { status: 200 },
    );
  }

  try {
    const providerResults = await collegeProvider.searchColleges({
      query,
      limit: 8,
    });

    const colleges = await importProviderSearchResults(providerResults);

    return NextResponse.json({ results: colleges });
  } catch (error) {
    console.error("College search failed:", error);

    return NextResponse.json(
      { message: "Unable to search colleges right now." },
      { status: 502 },
    );
  }
}