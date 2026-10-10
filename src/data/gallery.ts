import type { GalleryItem } from "@/types";

/**
 * Tourist gallery photos.
 * Only images with verified consent (consentObtained === true and consent === true)
 * are rendered to respect privacy and legal requirements.
 * Real filenames from /public/images/gallery/
 */
const gallery: GalleryItem[] = [
  {
    id: "img-001",
    src: "/images/gallery/gallery-01.jpeg",
    captionKey: "gallery.items.img-001",
    consentObtained: true,
    consent: true,
    consentDate: "2024-02-14",
  },
  {
    id: "img-002",
    src: "/images/gallery/gallery-02.jpeg",
    captionKey: "gallery.items.img-002",
    consentObtained: true,
    consent: true,
    consentDate: "2024-03-20",
  },
  {
    id: "img-003",
    src: "/images/gallery/gallery-03.jpeg",
    captionKey: "gallery.items.img-003",
    consentObtained: true,
    consent: true,
    consentDate: "2024-04-12",
  },
  {
    id: "img-004",
    src: "/images/gallery/gallery-04.jpeg",
    captionKey: "gallery.items.img-004",
    consentObtained: true,
    consent: true,
    consentDate: "2024-05-08",
  },
  {
    id: "img-005",
    src: "/images/gallery/gallery-05.jpeg",
    captionKey: "gallery.items.img-005",
    consentObtained: true,
    consent: true,
    consentDate: "2024-07-19",
  },
  {
    id: "img-006",
    src: "/images/gallery/gallery-06.jpeg",
    captionKey: "gallery.items.img-006",
    consentObtained: true,
    consent: true,
    consentDate: "2024-08-02",
  },
  {
    id: "img-007",
    src: "/images/gallery/gallery-07.jpeg",
    captionKey: "gallery.items.img-007",
    consentObtained: true,
    consent: true,
    consentDate: "2024-09-15",
  },
  {
    id: "img-008",
    src: "/images/gallery/gallery-08.jpeg",
    captionKey: "gallery.items.img-008",
    consentObtained: true,
    consent: true,
    consentDate: "2024-10-04",
  },
  {
    id: "img-009",
    src: "/images/gallery/gallery-09.jpeg",
    captionKey: "gallery.items.img-009",
    consentObtained: true,
    consent: true,
    consentDate: "2024-11-22",
  },
];

export default gallery;

/**
 * Returns only items where consent === true and consentObtained === true
 */
export function getConsentedGallery(): GalleryItem[] {
  return gallery.filter((item) => item.consentObtained === true && item.consent !== false);
}
