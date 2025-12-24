"use client";

import { useState } from "react";
import { Photo, Theme } from "@/types";
import Image from "next/image";

interface PhotoGalleryProps {
  photos: Photo[];
  theme: Theme;
  personName: string;
  isAccessible?: boolean;
}

export default function PhotoGallery({ photos, theme, personName, isAccessible }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  if (photos.length === 0) {
    return null;
  }

  const handleImageError = (photoId: string) => {
    setImageError((prev) => ({ ...prev, [photoId]: true }));
  };

  return (
    <>
      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
        aria-labelledby="photos-heading"
      >
        <h2
          id="photos-heading"
          className={`font-bold mb-6 flex items-center gap-3 ${isAccessible ? "text-4xl" : "text-xl"}`}
          style={{ fontFamily: theme.displayFont }}
        >
          <span
            className="inline-block w-8 h-1 rounded-full"
            style={{ backgroundColor: theme.primary }}
          />
          Our Adventures Together
        </h2>

        <div
          className={`grid gap-4 ${
            photos.length === 1
              ? "grid-cols-1"
              : photos.length === 2
              ? "grid-cols-2"
              : "grid-cols-2 md:grid-cols-3"
          }`}
        >
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-square rounded-xl overflow-hidden glass animate-fade-in-up"
              style={{
                animationDelay: `${0.6 + index * 0.1}s`,
                opacity: 0,
                animationFillMode: "forwards",
                backgroundColor: theme.cardBg,
              }}
              aria-label={photo.caption || `Photo with ${personName}`}
            >
              {!imageError[photo.id] ? (
                <Image
                  src={photo.url}
                  alt={photo.caption || `Uncle Mark with ${personName}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => handleImageError(photo.id)}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
                  📷
                </div>
              )}

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                style={{
                  background: `linear-gradient(to top, ${theme.background}ee 0%, transparent 60%)`,
                }}
              >
                {photo.caption && (
                  <p
                    className="p-4 text-sm font-medium"
                    style={{ fontFamily: theme.fontFamily }}
                  >
                    {photo.caption}
                  </p>
                )}
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  borderTop: `2px solid ${theme.primary}`,
                  borderRight: `2px solid ${theme.primary}`,
                }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-scale-in"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl text-white/80 hover:text-white transition-colors"
            style={{ backgroundColor: `${theme.cardBg}` }}
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close photo"
          >
            ×
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {!imageError[selectedPhoto.id] ? (
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || `Uncle Mark with ${personName}`}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto h-auto object-contain rounded-xl"
                  style={{ boxShadow: `0 0 60px ${theme.glowColor}` }}
                  onError={() => handleImageError(selectedPhoto.id)}
                />
              ) : (
                <div
                  className="w-96 h-64 rounded-xl flex items-center justify-center text-6xl"
                  style={{ backgroundColor: theme.cardBg }}
                >
                  📷
                </div>
              )}
            </div>

            {selectedPhoto.caption && (
              <div
                className="absolute bottom-0 left-0 right-0 p-6 text-center rounded-b-xl"
                style={{
                  background: `linear-gradient(to top, ${theme.background}ee 0%, transparent 100%)`,
                }}
              >
                <p
                  className="text-lg font-medium"
                  style={{ fontFamily: theme.fontFamily, color: theme.textColor }}
                >
                  {selectedPhoto.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
