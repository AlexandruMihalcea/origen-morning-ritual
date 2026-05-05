import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/ProductPage";
import { useLanguageStore } from "@/stores/languageStore";
import rollerHero from "@/assets/roller-hero.jpg";
import rollerVideo from "@/assets/roller-video.mp4";
import rollerLifestyle from "@/assets/roller-lifestyle.jpg";
import { seoMeta, jsonLdScript, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/the-roller")({
  head: () => {
    const seo = seoMeta({
      title: "Jade Facial Roller & Gua Sha Set | Step 2 — Cold | ORIGEN",
      description:
        "Cold jade, every morning. Depuff, lift, and awaken the skin with The ORIGEN Roller — natural jade facial roller and gua sha stone. Cruelty-free.",
      path: "/the-roller",
      image: rollerHero as string,
      type: "product",
    });
    return {
      ...seo,
      scripts: [
        jsonLdScript({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "The ORIGEN Roller — Jade Facial Roller & Gua Sha Set",
          description:
            "Natural jade facial roller and gua sha stone to depuff, lift, and awaken the skin.",
          image: `${SITE_URL}${rollerHero as string}`,
          brand: { "@type": "Brand", name: "ORIGEN" },
          offers: {
            "@type": "Offer",
            price: "34.00",
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/the-roller`,
          },
        }),
      ],
    };
  },
  component: RollerPage,
});

function RollerPage() {
  const { t } = useLanguageStore();
  return (
    <ProductPage
      p={{
        step: "02",
        label: t.products.roller.label,
        name: t.products.roller.name,
        tagline: t.products.roller.tagline,
        intro: t.rollerPage.intro,
        benefits: t.rollerPage.benefits as { title: string; body: string }[],
        handle: "anti-ageing-treatment-for-face-and-neck-ecotools-jade-jade-set-2",
        heroImage: rollerHero as string,
        heroVideo: rollerVideo,
        lifestyleImage: rollerLifestyle,
      }}
    />
  );
}
