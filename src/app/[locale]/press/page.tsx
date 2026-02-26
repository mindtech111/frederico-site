import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getPress } from "@/lib/queries";
import { urlFor } from "@/sanity/image";
import { type Locale } from "@/i18n/config";

export const runtime = 'edge';

export async function generateMetadata() {
  return { title: "Press" };
}

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const pressItems = await getPress();
  const l = locale as Locale;

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl font-light mb-12 pb-6 border-b border-[var(--color-border)]">
        {t("press.title")}
      </h1>

      <div className="space-y-10">
        {pressItems.map((item: {
          _id: string;
          title: string;
          publication?: string;
          author?: string;
          date?: string;
          type?: string;
          excerpt?: { en?: string; de?: string; pt?: string };
          url?: string;
          pdf?: { asset: { url: string } };
          coverImage?: { asset: { _ref: string } };
        }) => {
          const excerpt = item.excerpt?.[l] || item.excerpt?.en || "";
          const typeLabel = item.type
            ? t(`press.${item.type as "review" | "interview" | "feature" | "catalogue" | "book"}`)
            : "";

          return (
            <article
              key={item._id}
              className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-6 pb-10 border-b border-[var(--color-border)] last:border-0"
            >
              {item.coverImage && (
                <div className="w-[120px] shrink-0">
                  <Image
                    src={urlFor(item.coverImage).width(240).height(300).fit("crop").quality(80).url()}
                    alt={item.title}
                    width={120}
                    height={150}
                    className="w-full h-auto"
                  />
                </div>
              )}
              <div>
                <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mb-2">
                  {[typeLabel, item.date ? new Date(item.date).getFullYear() : ""].filter(Boolean).join(" · ")}
                </p>
                <h2 className="font-serif text-lg mb-1">{item.title}</h2>
                {(item.publication || item.author) && (
                  <p className="font-serif text-sm text-[var(--color-text-muted)] mb-3">
                    {[item.publication, item.author].filter(Boolean).join(", ")}
                  </p>
                )}
                {excerpt && (
                  <p className="font-serif text-sm leading-relaxed mb-4 italic text-[var(--color-text-muted)]">
                    &ldquo;{excerpt}&rdquo;
                  </p>
                )}
                <div className="flex gap-4">
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[11px] tracking-widest uppercase border-b border-current pb-0.5 hover:opacity-60 transition-opacity"
                    >
                      {t("press.readMore")}
                    </a>
                  )}
                  {item.pdf && (
                    <a
                      href={item.pdf.asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[11px] tracking-widest uppercase border-b border-current pb-0.5 hover:opacity-60 transition-opacity"
                    >
                      {t("press.downloadPdf")}
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
