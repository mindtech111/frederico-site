import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getWorksByCategory } from "@/lib/queries";
import { urlFor } from "@/sanity/image";
import { type Locale } from "@/i18n/config";
import { WORK_CATEGORIES } from "@/sanity/schemas/work";

export const runtime = 'edge';

const validCategories = WORK_CATEGORIES.map((c) => c.value);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { category } = await params;
  const cat = WORK_CATEGORIES.find((c) => c.value === category);
  return { title: cat?.title || "Works" };
}

export default async function WorksCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;

  if (!validCategories.includes(category as (typeof validCategories)[number])) {
    notFound();
  }

  const t = await getTranslations();
  const works = await getWorksByCategory(category);
  const catLabel = WORK_CATEGORIES.find((c) => c.value === category)?.title || category;

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 border-b border-[var(--color-border)] pb-6">
        <h1 className="font-serif text-3xl font-light">{catLabel}</h1>
      </div>

      {works.length === 0 ? (
        <p className="font-serif text-[var(--color-text-muted)]">{t("works.noWorks")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work: {
            _id: string;
            slug: { current: string };
            title: { en?: string; de?: string; pt?: string };
            mainImage?: { asset: { _ref: string } };
            year?: number;
            medium?: { en?: string; de?: string; pt?: string };
          }) => {
            const title = work.title[locale as Locale] || work.title.en || "";
            const medium = work.medium?.[locale as Locale] || work.medium?.en || "";

            return (
              <Link
                key={work._id}
                href={`${locale === "en" ? "" : `/${locale}`}/works/piece/${work.slug.current}`}
                className="work-card group block"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[var(--color-border)]/20 mb-3">
                  {work.mainImage ? (
                    <Image
                      src={urlFor(work.mainImage).width(800).height(600).quality(85).url()}
                      alt={title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                      No image
                    </div>
                  )}
                </div>
                <h2 className="font-serif text-base">{title}</h2>
                {work.year && (
                  <p className="font-serif text-sm text-[var(--color-text-muted)]">
                    {work.year}{medium ? ` — ${medium}` : ""}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
