import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getTexts } from "@/lib/queries";
import { urlFor } from "@/sanity/image";
import { type Locale } from "@/i18n/config";

export async function generateMetadata() {
  return { title: "Texts" };
}

export default async function TextsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const texts = await getTexts();
  const l = locale as Locale;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl font-light mb-12 pb-6 border-b border-[var(--color-border)]">
        {t("texts.title")}
      </h1>

      {(!texts || texts.length === 0) && (
        <p className="font-serif text-[var(--color-text-muted)]">
          {t("texts.noTexts")}
        </p>
      )}

      <div className="space-y-10">
        {texts?.map(
          (item: {
            _id: string;
            slug: { current: string };
            title: { en?: string; de?: string; pt?: string };
            date?: string;
            author?: string;
            image?: { asset: { _ref: string } };
          }) => {
            const title = item.title?.[l] || item.title?.en || "";

            return (
              <Link
                key={item._id}
                href={`${prefix}/works/texts/${item.slug.current}`}
                className="group block pb-10 border-b border-[var(--color-border)] last:border-0"
              >
                {item.image && (
                  <div className="w-full overflow-hidden mb-5">
                    <Image
                      src={urlFor(item.image)
                        .width(1200)
                        .height(600)
                        .fit("crop")
                        .quality(85)
                        .url()}
                      alt={title}
                      width={1200}
                      height={600}
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
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
                  <h2 className="font-serif text-xl group-hover:opacity-60 transition-opacity">
                    {title}
                  </h2>
                  {item.author && (
                    <p className="font-sans text-[12px] text-[var(--color-text-muted)] mt-1">
                      {item.author}
                    </p>
                  )}
                </div>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}
