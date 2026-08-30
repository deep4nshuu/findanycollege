"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import { CollegeSearchModal } from "./college-search-modal";

export function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  const handleClick = () => {
    redirect('/sign-in')
  }


  return (
    <main className="min-h-screen bg-[#F2E9D0] text-[#1B2A41]">
      <header className="border-b border-[#A9812F]/30 bg-[#F2E9D0]">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-4">
          <Link
            href="/"
            className="shrink-0 text-xl font-semibold text-[#1B2A41]"
          >
            findAnyCollege
          </Link>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="hidden flex-1 items-center rounded-sm border border-[#1B2A41]/30 bg-white/60 px-4 py-2.5 text-left text-sm text-[#5C5237] transition hover:border-[#A9812F] md:flex"
          >
            Search colleges, exams, and more…
          </button>

          <button
            type="button"
            className="rounded-sm border border-[#1B2A41] bg-[#1B2A41] px-4 py-2 text-sm font-semibold text-[#F2E9D0] transition hover:bg-[#7A2E2E] hover:border-[#7A2E2E]"
            onClick={handleClick}
          >
            Sign in
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#1B2A41] px-5 py-20 text-[#F2E9D0]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 15% 15%, #7A2E2E 0%, transparent 40%), radial-gradient(circle at 85% 85%, #A9812F 0%, transparent 45%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[4px] text-[#D9C68C]">
            Find the right college
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Empowering Students,
            <br />
            Building Futures.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-[#F2E9D0]/80 sm:text-lg">
            Search colleges, compare options, and discover where your exam rank
            can take you.
          </p>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="mx-auto mt-9 flex w-full max-w-2xl items-center rounded-sm border border-[#A9812F] bg-[#F2E9D0] px-5 py-4 text-left text-[#5C5237] shadow-[6px_6px_0_0_#A9812F] transition hover:shadow-[8px_8px_0_0_#A9812F]"
          >
            <span className="mr-3 text-lg text-[#1B2A41]">⌕</span>
            Search your colleges, exams, courses, and more…
          </button>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/predictor?exam=jee-main"
              className="rounded-sm border border-[#F2E9D0]/50 px-5 py-3 font-semibold transition hover:bg-[#F2E9D0] hover:text-[#1B2A41]"
            >
              JEE Main College Predictor
            </Link>

            <Link
              href="/predictor?exam=neet"
              className="rounded-sm border border-[#F2E9D0]/50 px-5 py-3 font-semibold transition hover:bg-[#F2E9D0] hover:text-[#1B2A41]"
            >
              NEET College Predictor
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-12 md:grid-cols-2">
        <article className="rounded-sm border border-[#1B2A41]/20 bg-white/70 p-7 shadow-[4px_4px_0_0_#A9812F]/40">
          <Image src={'/college-predictors.svg'} alt='college-predictor' width={30} height={30} />
          <h2 className="mt-4 text-2xl font-semibold text-[#1B2A41]">
            College Predictor
          </h2>
          <p className="mt-3 leading-7 text-[#5C5237]">
            Estimate your admission chances using your exam, rank, course, and
            category.
          </p>
          <Link
            href="/predictor"
            className="mt-6 inline-flex rounded-sm border border-[#1B2A41] bg-[#1B2A41] px-5 py-3 font-semibold text-[#F2E9D0] transition hover:bg-[#7A2E2E] hover:border-[#7A2E2E]"
          >
            Predict your college
          </Link>
        </article>

        <article className="rounded-sm border border-[#1B2A41]/20 bg-white/70 p-7 shadow-[4px_4px_0_0_#A9812F]/40">
          <Image src={'/college-compare.svg'} alt='college-predictor' width={30} height={30} />
          <h2 className="mt-4 text-2xl font-semibold text-[#1B2A41]">
            Compare Colleges
          </h2>
          <p className="mt-3 leading-7 text-[#5C5237]">
            Compare fees, ratings, placements, courses, and locations for up to
            three colleges.
          </p>
          <Link
            href="/compare"
            className="mt-6 inline-flex rounded-sm border border-[#1B2A41] px-5 py-3 font-semibold text-[#1B2A41] transition hover:bg-[#1B2A41] hover:text-[#F2E9D0]"
          >
            Compare colleges
          </Link>
        </article>
      </section>

      <CollegeSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
    />
    </main>
  );
}