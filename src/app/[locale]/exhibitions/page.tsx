import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getExhibitions } from "@/lib/queries";
import { type Locale } from "@/i18n/config";

export async function generateMetadata() {
  return { title: "Exhibitions" };
}

function getExhibitionStatus(startDate?: string, endDate?: string) {
  const now = new Date();
  if (!startDate) return "past";
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  if (start > now) return "upcoming";
  if (!end || end >= now) return "current";
  return "past";
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ExhibitionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const exhibitions = await getExhibitions();
  const l = locale as Locale;
  const prefix = locale === "en" ? "" : `/${locale}`;

  const grouped = {
    current: exhibitions.filter((e: { startDate?: string; endDate?: string }) =>
      getExhibitionStatus(e.startDate, e.endDate) === "current"
    ),
    upcoming: exhibitions.filter((e: { startDate?: string; endDate?: string }) =>
      getExhibitionStatus(e.startDate, e.endDate) === "upcoming"
    ),
    past: exhibitions.filter((e: { startDate?: string; endDate?: string }) =>
      getExhibitionStatus(e.startDate, e.endDate) === "past"
    ),
  };

  const renderGroup = (
    label: string,
    items: Array<{
      _id: string;
      slug: { current: string };
      title: { en?: string; de?: string; pt?: string };
      type?: string;
      venue?: string;
      location?: string;
      startDate?: string;
      endDate?: string;
    }>
  ) => {
    if (!items.length) return null;
    return (
      <div className="mb-14">
        <h2 className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mb-6 pb-3 border-b border-[var(--color-border)]">
          {label}
        </h2>
        <div className="space-y-6">
          {items.map((ex) => {
            const title = ex.title?.[l] || ex.title?.en || "";
            const typeLabel = ex.type ? t(`exhibitions.${ex.type as "solo" | "group" | "fair"}`) : "";
            return (
              <Link
                key={ex._id}
                href={`${prefix}/exhibitions/${ex.slug.current}`}
                className="block group"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="font-serif text-lg group-hover:opacity-60 transition-opacity">
                    {title}
                  </h3>
                  <span className="font-serif text-sm text-[var(--color-text-muted)] shrink-0">
                    {ex.startDate ? new Date(ex.startDate).getFullYear() : ""}
                  </span>
                </div>
                <p className="font-serif text-sm text-[var(--color-text-muted)]">
                  {[typeLabel, ex.venue, ex.location].filter(Boolean).join(" — ")}
                </p>
                {(ex.startDate || ex.endDate) && (
                  <p className="font-serif text-xs text-[var(--color-text-muted)] mt-0.5">
                    {[formatDate(ex.startDate), formatDate(ex.endDate)].filter(Boolean).join(" – ")}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl font-light mb-12 pb-6 border-b border-[var(--color-border)]">
        {t("exhibitions.title")}
      </h1>
      {renderGroup(t("exhibitions.current"), grouped.current)}
      {renderGroup(t("exhibitions.upcoming"), grouped.upcoming)}
      {renderGroup(t("exhibitions.past"), grouped.past)}
    </div>
  );
}
