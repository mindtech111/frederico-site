import { getTranslations } from "next-intl/server";
import { getHomepageHero, getHomepageImages } from "@/lib/queries";
import HomeCarousel from "@/components/HomeCarousel";
import HomeHeroVideo from "@/components/HomeHeroVideo";
import { type Locale } from "@/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const hero = await getHomepageHero();

  // Show video hero if configured
  if (hero?.heroType === "video" && hero.videoUrl) {
    return (
      <HomeHeroVideo
        videoUrl={hero.videoUrl}
        posterImage={hero.posterImage}
        caption={hero.caption}
        workReference={hero.workReference}
        locale={locale as Locale}
        viewWorkLabel={t("viewWork")}
      />
    );
  }

  // Fall back to image carousel
  const images = await getHomepageImages();

  return (
    <HomeCarousel
      images={images}
      locale={locale as Locale}
      viewWorkLabel={t("viewWork")}
    />
  );
}
