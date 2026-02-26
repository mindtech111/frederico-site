import { client } from "@/sanity/client";

// ─── Homepage ────────────────────────────────────────────────────────────────

export async function getHomepageImages() {
  return client.fetch(
    `*[_type == "homepageImage" && active == true] | order(order asc) {
      _id, title, image, caption, order,
      workReference->{ "slug": slug.current, "category": category }
    }`
  );
}

// ─── Works ───────────────────────────────────────────────────────────────────

export async function getWorksByCategory(category?: string) {
  const filter = category
    ? `*[_type == "work" && category == $category]`
    : `*[_type == "work"]`;
  return client.fetch(
    `${filter} | order(order asc, year desc) {
      _id, title, slug, category, year, medium, dimensions, mainImage, featured
    }`,
    category ? { category } : {}
  );
}

export async function getWorkBySlug(slug: string) {
  return client.fetch(
    `*[_type == "work" && slug.current == $slug][0] {
      _id, title, slug, category, year, medium, dimensions,
      mainImage, gallery, videoUrl, description, featured
    }`,
    { slug }
  );
}

// ─── Exhibitions ─────────────────────────────────────────────────────────────

export async function getExhibitions() {
  return client.fetch(
    `*[_type == "exhibition"] | order(startDate desc) {
      _id, title, slug, type, venue, location, startDate, endDate, description, images
    }`
  );
}

export async function getExhibitionBySlug(slug: string) {
  return client.fetch(
    `*[_type == "exhibition" && slug.current == $slug][0] {
      _id, title, slug, type, venue, location, startDate, endDate,
      description, images, pressRelease
    }`,
    { slug }
  );
}

// ─── Press ───────────────────────────────────────────────────────────────────

export async function getPress() {
  return client.fetch(
    `*[_type == "press"] | order(date desc) {
      _id, title, publication, author, date, type, excerpt, url, pdf, coverImage
    }`
  );
}

// ─── News ────────────────────────────────────────────────────────────────────

export async function getNews() {
  return client.fetch(
    `*[_type == "news"] | order(date desc) {
      _id, title, slug, date, category, body, image, link
    }`
  );
}

export async function getNewsBySlug(slug: string) {
  return client.fetch(
    `*[_type == "news" && slug.current == $slug][0] {
      _id, title, slug, date, category, body, image, link
    }`,
    { slug }
  );
}

// ─── Artist ──────────────────────────────────────────────────────────────────

export async function getArtist() {
  return client.fetch(
    `*[_type == "artist" && _id == "artist-singleton"][0] {
      biography, portrait, cv, chronology
    }`
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export async function getContact() {
  return client.fetch(
    `*[_type == "contact" && _id == "contact-singleton"][0] {
      email, phone, studio, representation, socialLinks, introText
    }`
  );
}
