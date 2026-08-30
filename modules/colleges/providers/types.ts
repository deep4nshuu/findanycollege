export type CollegeSearchResult = {
  externalId: string;
  name: string;
  city: string | null;
  state: string | null;
  type: string | null;
  websiteUrl: string | null;
  sourceUrl: string | null;
  provider: "COLLEGE_DB";
  fetchedAt: Date;
};

export type CollegeSuggestion = {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  state: string | null;
  providerType: string | null;
};

export type SearchCollegesInput = {
  query: string;
  limit?: number;
};

export interface CollegeProvider {
  name: "COLLEGE_DB";

  searchColleges(
    input: SearchCollegesInput,
  ): Promise<CollegeSearchResult[]>;
}