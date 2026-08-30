import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollegeById } from "@/modules/colleges/services"; 

const sections = [
  { slug: "overview", label: "Overview" },
  { slug: "courses", label: "Courses" },
  { slug: "fees", label: "Fees" },
  { slug: "cut-offs", label: "Cut-offs" },
  { slug: "admissions", label: "Admissions" },
  { slug: "placements", label: "Placements" },
  { slug: "reviews", label: "Reviews" },
] as const;

type SectionSlug = (typeof sections)[number]["slug"];

type CollegePageProps = {
  params: Promise<{
    collegeId: string;
    section?: string[];
  }>;
};

function isSectionSlug(value: string): value is SectionSlug {
  return sections.some((section) => section.slug === value);
}

export default async function CollegePage({
  params,
}: CollegePageProps) {
  const { collegeId, section } = await params;
  const selectedSection = section?.[0] ?? "overview";

  if (!isSectionSlug(selectedSection) || section?.length > 1) {
    notFound();
  }

  const college = await getCollegeById(collegeId);

  if (!college) {
    notFound();
  }

  const location = [college.city, college.state]
    .filter(Boolean)
    .join(", ");

  const collegeType = college.collegeType ?? college.providerType;

  return (
    <main className="min-h-screen bg-[#F2E9D0] text-[#1B2A41]">
      <div className="border-b border-[#1B2A41]/10 bg-white/70">
        <div className="mx-auto max-w-7xl px-5 py-4 text-sm text-[#5C5237]">
          <Link href="/" className="hover:text-[#7A2E2E]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>{college.name}</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-[#1B2A41]">
            {sections.find((item) => item.slug === selectedSection)?.label}
          </span>
        </div>
      </div>

      <section className="border-b border-[#1B2A41]/15 bg-white px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm border border-[#A9812F]/40 bg-[#F2E9D0] text-2xl font-bold text-[#7A2E2E]">
              {college.name.slice(0, 1)}
            </div>

            <div>
              <h1 className="text-3xl font-semibold text-[#1B2A41]">
                {college.name}
              </h1>

              <p className="mt-2 text-lg text-[#5C5237]">
                {location || "Location unavailable"}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
                {collegeType && (
                  <>
                    <span>{collegeType.replaceAll("_", " ")}</span>
                    <span className="text-[#A9812F]">|</span>
                  </>
                )}

                {college.provider && (
                  <>
                    <span>
                      Source: {college.provider.replaceAll("_", " ")}
                    </span>
                    <span className="text-[#A9812F]">|</span>
                  </>
                )}

                {college.lastSyncedAt && (
                  <span>
                    Updated: {college.lastSyncedAt.toLocaleDateString("en-IN")}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {college.websiteUrl && (
              <a
                href={college.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-[#1B2A41] px-4 py-2 text-sm font-semibold hover:bg-[#1B2A41] hover:text-[#F2E9D0]"
              >
                Official website ↗
              </a>
            )}

            <Link
              href="/compare"
              className="rounded-sm bg-[#7A2E2E] px-4 py-2 text-sm font-semibold text-[#F2E9D0] hover:bg-[#1B2A41]"
            >
              Compare college
            </Link>
          </div>
        </div>
      </section>

      <nav className="border-b border-[#1B2A41]/15 bg-white">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5">
          {sections.map((item) => {
            const isActive = item.slug === selectedSection;
            const href =
              item.slug === "overview"
                ? `/colleges/${college.slug}`
                : `/colleges/${college.slug}/${item.slug}`;

            return (
              <Link
                key={item.slug}
                href={href}
                className={`shrink-0 border-b-2 px-1 py-5 text-sm font-semibold transition ${
                  isActive
                    ? "border-[#7A2E2E] text-[#7A2E2E]"
                    : "border-transparent text-[#5C5237] hover:text-[#1B2A41]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 py-10">
        {selectedSection === "overview" && (
          <article className="max-w-4xl rounded-sm border border-[#1B2A41]/15 bg-white/70 p-7">
            <h2 className="text-2xl font-semibold">About {college.name}</h2>

            {college.overview ? (
              <p className="mt-4 whitespace-pre-line leading-7 text-[#5C5237]">
                {college.overview}
              </p>
            ) : (
              <p className="mt-4 leading-7 text-[#5C5237]">
                {college.name} is located in {location || "India"}. Its identity and
                location have been verified through {college.provider?.replaceAll("_", " ") || "our data provider"}.
                Detailed college information is being added from verified official
                sources.
              </p>
            )}
          </article>
        )}

        {selectedSection === "courses" && (
          <section className="max-w-5xl">
            <p className="mb-4 text-sm text-[#5C5237]">
              Course information for {college.name}
            </p>

            {college.courses.length > 0 ? (
              <div className="space-y-4">
                {college.courses.map((course) => (
                  <article
                    key={course.id}
                    className="rounded-sm border border-[#1B2A41]/15 bg-white/70 p-6"
                  >
                    <h2 className="text-xl font-semibold text-[#1B2A41]">
                      {course.name}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#5C5237]">
                      <span>{course.level.replaceAll("_", " ")}</span>

                      {course.durationYears && (
                        <span>Duration: {course.durationYears} years</span>
                      )}

                      {course.seats && <span>Seats: {course.seats}</span>}

                      {course.totalFees && (
                        <span>
                          Total fees: ₹{course.totalFees.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <article className="rounded-sm border border-[#1B2A41]/15 bg-white/70 p-7">
                <h2 className="text-2xl font-semibold">Courses</h2>
                <p className="mt-4 leading-7 text-[#5C5237]">
                  No verified course information is available yet. Course, fee, and
                  eligibility details will be added from official college sources.
                </p>
              </article>
            )}
          </section>
        )}

        {!["overview", "courses"].includes(selectedSection) && (
          <article className="max-w-4xl rounded-sm border border-[#1B2A41]/15 bg-white/70 p-7">
            <h2 className="text-2xl font-semibold">
              {sections.find((item) => item.slug === selectedSection)?.label}
            </h2>

            <p className="mt-4 leading-7 text-[#5C5237]">
              This information is currently being verified from trusted college and
              official admission sources.
            </p>
          </article>
        )}
      </section>
    </main>
  );
}