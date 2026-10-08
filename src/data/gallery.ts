import type { GalleryItem } from "@/types";

/**
 * Tourist gallery photos.
 *
 * ⚠️  LEGAL REQUIREMENT: consentObtained MUST be true before any item is
 * published. Written consent from the tourist (name, date, scope of use)
 * must be on file before setting consentObtained = true.
 *
 * Caption text lives in messages/*.json  →  gallery.<id>
 */
const gallery: GalleryItem[] = [
  // [PLACEHOLDER] — Add real items once written consent is obtained.
  // Example structure (DO NOT PUBLISH without consent):
  //
  // {
  //   id: "img-001",
  //   src: "/images/gallery/anna-cultural-001.jpg",
  //   captionKey: "gallery.img-001",   // → "Anna, Germany – Cultural Triangle"
  //   consentObtained: true,
  //   consentDate: "2024-06-15",
  //   photographer: undefined,
  // },
];

export default gallery;

/**
 * Returns only images that have verified consent.
 * Always use this in components — never expose unconsented items.
 */
export function getConsentedGallery(): GalleryItem[] {
  return gallery.filter((item) => item.consentObtained === true);
}
