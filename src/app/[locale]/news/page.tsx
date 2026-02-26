import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getNews } from "@/lib/queries";
import { urlFor } from "@/sanity/image";
import { type Locale } from "@/i18n/config";

export const runtime = 'edge';

export async function generateMetadata() {
  return { title: "News" };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const newsItems = await getNews();
  const l = locale as Locale;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl font-light mb-12 pb-6 border-b border-[var(--color-border)]">
        {t("news.title")}
      </h1>

      <div className="space-y-8">
        {newsItems.map((item: {
          _id: string;
          slug: { current: string };
          title: { en?: string; de?: string; pt?: string };
          date?: string;
          category?: string;
          image?: { asset: { _ref: string } };
        }) => {
          const title = item.title?.[l] || item.title?.en || "";

          return (
            <Link
              key={item._id}
              href={`${prefix}/news/${item.slug.current}`}
              className="group flex gap-6 pb-8 border-b border-[var(--color-border)] last:border-0"
            >
              {item.image && (
                <div className="shrink-0 w-28 h-20 overflow-hidden">
                  <Image
                    src={urlFor(item.image).width(224).height(160).fit("crop").quality(80).url()}
                    alt={title}
                    width={112}
                    height={80}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div>
                {item.date && (
                  <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mb-2">
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
                <h2 className="font-serif text-lg group-hover:opacity-60 transition-opacity">
                  {title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
