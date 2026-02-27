import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getTextBySlug } from "@/lib/queries";
import { urlFor } from "@/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { type Locale } from "@/i18n/config";

export default async function TextDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations();
  const item = await getTextBySlug(slug);

  if (!item) notFound();

  const l = locale as Locale;
  const title = item.title?.[l] || item.title?.en || "";
  const body = item.body?.[l] || item.body?.en;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
      <Link
        href={`${prefix}/works/texts`}
        className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-10 inline-block"
      >
        &larr; {t("texts.title")}
      </Link>

      {item.date && (
        <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mt-6 mb-3">
          {new Date(item.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}

      <h1 className="font-serif text-3xl font-light mb-2">{title}</h1>

      {item.author && (
        <p className="font-sans text-[13px] text-[var(--color-text-muted)] mb-8">
          {item.author}
        </p>
      )}

      {item.image && (
        <Image
          src={urlFor(item.image).width(1200).quality(85).url()}
          alt={title}
          width={1200}
          height={675}
          className="w-full h-auto mb-10"
        />
      )}

      {body && <PortableTextRenderer value={body} />}
    </div>
  );
}
