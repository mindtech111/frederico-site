import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getExhibitionBySlug } from "@/lib/queries";
import { urlFor } from "@/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { type Locale } from "@/i18n/config";

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ExhibitionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations();
  const exhibition = await getExhibitionBySlug(slug);

  if (!exhibition) notFound();

  const l = locale as Locale;
  const title = exhibition.title?.[l] || exhibition.title?.en || "";
  const description = exhibition.description?.[l] || exhibition.description?.en;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <Link
        href={`${prefix}/exhibitions`}
        className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-10 inline-block"
      >
        ← {t("common.backToExhibitions")}
      </Link>

      <h1 className="font-serif text-3xl font-light mt-6 mb-3">{title}</h1>
      <div className="font-serif text-sm text-[var(--color-text-muted)] space-y-0.5 mb-10">
        {exhibition.type && (
          <p>{t(`exhibitions.${exhibition.type as "solo" | "group" | "fair"}`)}</p>
        )}
        {exhibition.venue && <p>{exhibition.venue}</p>}
        {exhibition.location && <p>{exhibition.location}</p>}
        {(exhibition.startDate || exhibition.endDate) && (
          <p>
            {[formatDate(exhibition.startDate), formatDate(exhibition.endDate)]
              .filter(Boolean)
              .join(" – ")}
          </p>
        )}
      </div>

      {description && (
        <div className="mb-12 max-w-2xl">
          <PortableTextRenderer value={description} />
        </div>
      )}

      {exhibition.images && exhibition.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {exhibition.images.map((img: { asset: { _ref: string } }, i: number) => (
            <Image
              key={i}
              src={urlFor(img).width(1000).quality(85).url()}
              alt={`${title} — installation view ${i + 1}`}
              width={1000}
              height={750}
              className="w-full h-auto"
            />
          ))}
        </div>
      )}
    </div>
  );
}
