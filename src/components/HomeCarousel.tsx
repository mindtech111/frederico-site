"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { type Locale } from "@/i18n/config";

interface CarouselImage {
  _id: string;
  image: { asset: { _ref: string } };
  caption?: { en?: string; de?: string; pt?: string };
  workReference?: { slug: string; category: string };
}

interface Props {
  images: CarouselImage[];
  locale: Locale;
  viewWorkLabel: string;
}

export default function HomeCarousel({ images, locale, viewWorkLabel }: Props) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, images.length]);

  if (!images.length) return null;

  const getCaption = (img: CarouselImage) => {
    if (!img.caption) return null;
    return img.caption[locale] || img.caption.en || null;
  };

  return (
    <div className="relative w-full h-[calc(100vh-56px)] overflow-hidden mt-14">
      {images.map((img, i) => {
        const imageUrl = urlFor(img.image).width(2400).quality(90).url();
        const caption = getCaption(img);
        const href = img.workReference
          ? `/works/${img.workReference.category}/${img.workReference.slug}`
          : null;

        return (
          <div
            key={img._id}
            className={`carousel-slide ${i === current ? "active" : ""}`}
          >
            <Image
              src={imageUrl}
              alt={caption || "Artwork"}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Caption overlay */}
            {caption && (
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <p className="font-serif text-white text-sm drop-shadow-md max-w-md">
                  {caption}
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
      })}

      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === current ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
