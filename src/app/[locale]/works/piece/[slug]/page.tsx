import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getWorkBySlug } from "@/lib/queries";
import { urlFor } from "@/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { type Locale } from "@/i18n/config";

function getEmbedUrl(url: string): string {
  // YouTube: https://www.youtube.com/watch?v=ID or https://youtu.be/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  // Vimeo: https://vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  return url;
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations();
  const work = await getWorkBySlug(slug);

  if (!work) notFound();

  const l = locale as Locale;
  const title = work.title?.[l] || work.title?.en || "";
  const medium = work.medium?.[l] || work.medium?.en || "";
  const description = work.description?.[l] || work.description?.en;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
      <Link
        href={`${prefix}/works/${work.category}`}
        className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-10 inline-block"
      >
        ← {t("common.backToWorks")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
        {/* Image */}
        <div>
          {work.category === "videos" && work.videoUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={getEmbedUrl(work.videoUrl)}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={title}
              />
            </div>
          ) : work.mainImage ? (
            <Image
              src={urlFor(work.mainImage).width(1200).quality(90).url()}
              alt={title}
              width={1200}
              height={900}
              className="w-full h-auto"
              priority
            />
          ) : null}

          {/* Additional gallery images */}
          {work.gallery && work.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              {work.gallery.map((img: { asset: { _ref: string } }, i: number) => (
                <Image
                  key={i}
                  src={urlFor(img).width(600).quality(80).url()}
                  alt={`${title} — detail ${i + 1}`}
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="font-serif text-2xl font-light mb-1">{title}</h1>
          <div className="font-serif text-[var(--color-text-muted)] text-sm mb-8 space-y-0.5">
            {work.year && <p>{work.year}</p>}
            {medium && <p>{medium}</p>}
            {work.dimensions && <p>{work.dimensions}</p>}
          </div>

          {description && <PortableTextRenderer value={description} />}
        </div>
      </div>
    </div>
  );
}
