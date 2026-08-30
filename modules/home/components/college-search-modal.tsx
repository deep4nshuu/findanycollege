"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CollegeSuggestion } from "@/modules/colleges/providers/types";

type CollegeSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const topSearches = [
  "IIT Delhi",
  "IIT Bombay",
  "IIT Roorkee",
  "NIT Tiruchirappalli",
  "VIT Vellore",
];

export function CollegeSearchModal({
  isOpen,
  onClose,
}: CollegeSearchModalProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CollegeSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setErrorMessage("");
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          `/api/colleges/search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Search request failed.");
        }

        const data = await response.json();
        setResults(data.results ?? []);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setResults([]);
        setErrorMessage("Unable to search colleges right now.");
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [isOpen, query]);

  function selectCollege(slug: string) {
    setQuery("");
    setResults([]);
    onClose();

    router.push(`/colleges/${slug}`);
  }

  function chooseTopSearch(searchTerm: string) {
    setQuery(searchTerm);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/50 px-4 pt-20"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search college by name..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          />

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        {!query.trim() && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold text-slate-500">
              Top searches
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {topSearches.map((college) => (
                <button
                  key={college}
                  type="button"
                  onClick={() => chooseTopSearch(college)}
                  className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                >
                  {college}
                </button>
              ))}
            </div>
          </section>
        )}

        {query.trim().length > 0 && query.trim().length < 2 && (
          <p className="mt-6 text-sm text-slate-500">
            Enter at least two characters to search.
          </p>
        )}

        {isLoading && (
          <p className="mt-6 text-sm text-slate-500">Searching colleges…</p>
        )}

        {errorMessage && (
          <p className="mt-6 text-sm text-red-600">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && query.trim().length >= 2 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold text-slate-500">
              Search results
            </h2>

            {results.length > 0 ? (
              <div className="mt-2 divide-y divide-slate-100">
                {results.map((college) => (
                  <button
                    key={college.id}
                    type="button"
                    onClick={() => selectCollege(college.slug)}
                    className="flex w-full items-center justify-between gap-4 px-3 py-4 text-left hover:bg-indigo-50"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {college.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {[college.city, college.state]
                          .filter(Boolean)
                          .join(", ") || "Location unavailable"}
                      </p>
                    </div>

                    <span className="text-lg text-indigo-600">→</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                No colleges found for “{query}”.
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}