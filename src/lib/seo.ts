const SITE_URL = "https://morning-ritual-forge.lovable.app";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
};

export function seoMeta({ title, description, path, image, type = "website" }: SeoOptions) {
  const url = `${SITE_URL}${path}`;
  const absImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : undefined;

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: "ORIGEN" },
    { name: "twitter:card", content: absImage ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (absImage) {
    meta.push({ property: "og:image", content: absImage });
    meta.push({ name: "twitter:image", content: absImage });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

export function jsonLdScript(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

export { SITE_URL };