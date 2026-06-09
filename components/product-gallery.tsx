"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryImage = {
  url: string;
  alt?: string;
  caption?: string;
};

export function ProductGallery({
  mainImage,
  gallery = [],
  productName,
}: {
  mainImage: string;
  gallery?: GalleryImage[];
  productName: string;
}) {
  const allImages: GalleryImage[] = [
    { url: mainImage, alt: productName },
    ...gallery.filter((img) => img.url !== mainImage),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const active = allImages[activeIndex] ?? allImages[0];

  if (!active) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/20 border border-border/50">
        <Image
          src={active.url}
          alt={active.alt || productName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border/50 hover:border-primary/50"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productName} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {active.caption && (
        <p className="text-sm text-muted-foreground text-center">{active.caption}</p>
      )}
    </div>
  );
}
