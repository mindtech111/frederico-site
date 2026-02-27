"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { type Locale } from "@/i18n/config";

interface Props {
  videoUrl: string;
  posterImage?: { asset: { _ref: string } };
  caption?: { en?: string; de?: string; pt?: string };
  workReference?: { slug: string; category: string };
  locale: Locale;
  viewWorkLabel: string;
}

export default function HomeHeroVideo({
  videoUrl,
  posterImage,
  caption,
  workReference,
  locale,
  viewWorkLabel,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure autoplay works even if browser blocks the initial attempt
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay was prevented — the poster image is already visible
    });
  }, []);

  const captionText = caption
    ? caption[locale] || caption.en || null
    : null;

  const posterUrl = posterImage
    ? urlFor(posterImage).width(1920).quality(80).url()
    : undefined;

  const href = workReference
    ? `/works/${workReference.category}/${workReference.slug}`
    : null;

  return (
    <div className="relative w-full h-[calc(100vh-56px)] overflow-hidden mt-14 bg-black">
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Caption overlay */}
      {captionText && (
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <p className="font-serif text-white text-sm drop-shadow-md max-w-md">
            {captionText}
          </p>
          {href && (
            <Link
              href={href}
              className="font-sans text-[11px] tracking-widest uppercase text-white border border-white/60 px-4 py-2 hover:bg-white/10 transition-colors"
            >
              {viewWorkLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
