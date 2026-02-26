import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getArtist } from "@/lib/queries";
import { urlFor } from "@/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { type Locale } from "@/i18n/config";

export const runtime = 'edge';

export async function generateMetadata() {
  return { title: "Biography" };
}

export default async function BiographyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const artist = await getArtist();
  const l = locale as Locale;
  const biography = artist?.biography?.[l] || artist?.biography?.en;

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl font-light mb-12 pb-6 border-b border-[var(--color-border)]">
        {t("artist.biography")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12">
        <div>
          {biography ? (
            <PortableTextRenderer value={biography} className="text-base leading-loose" />
          ) : (
            <p className="font-serif text-[var(--color-text-muted)]">Biography coming soon.</p>
          )}
        </div>
        {artist?.portrait && (
          <div className="md:order-last">
            <Image
              src={urlFor(artist.portrait).width(560).quality(90).url()}
              alt="Frederico Theophilo Neto"
              width={560}
              height={700}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
