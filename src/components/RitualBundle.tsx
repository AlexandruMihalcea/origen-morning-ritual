import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import matHero from "@/assets/mat-hero.jpg";
import rollerHero from "@/assets/roller-hero.jpg";
import oilHero from "@/assets/oil-hero.jpg";

const BUNDLE_PRODUCTS = [
  {
    handle: "acupressure-mat-sensi-massage-mat-pillow-set-applicator-for-neck-foot",
    name: "The Mat",
    label: "Pressure",
    price: 42,
    image: matHero,
  },
  {
    handle: "anti-ageing-treatment-for-face-and-neck-ecotools-jade-jade-set-2",
    name: "The Roller",
    label: "Cold",
    price: 34,
    image: rollerHero,
  },
  {
    handle: "facial-oil-la-provencale-bio-30-ml",
    name: "The Oil",
    label: "Nourish",
    price: 32,
    image: oilHero,
  },
] as const;

const TOTAL = BUNDLE_PRODUCTS.reduce((s, p) => s + p.price, 0);

export function RitualBundle({ variant = "section" }: { variant?: "section" | "page" }) {
  const mat = useShopifyProduct(BUNDLE_PRODUCTS[0].handle);
  const roller = useShopifyProduct(BUNDLE_PRODUCTS[1].handle);
  const oil = useShopifyProduct(BUNDLE_PRODUCTS[2].handle);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const setOpen = useCartStore((s) => s.setOpen);

  const products = [mat, roller, oil];
  const loading = products.some((p) => p.loading);
  const ready = products.every((p) => p.product?.node.variants.edges[0]?.node);

  const handleAddBundle = async () => {
    for (const { product } of products) {
      const variantNode = product?.node.variants.edges[0]?.node;
      if (!product || !variantNode) continue;
      await addItem({
        product,
        variantId: variantNode.id,
        variantTitle: variantNode.title,
        price: variantNode.price,
        quantity: 1,
        selectedOptions: variantNode.selectedOptions || [],
      });
    }
    setOpen(true);
  };

  const isPage = variant === "page";

  return (
    <section
      className={`${isPage ? "pt-40 pb-32" : "py-32 md:py-44"} px-6 md:px-10 grain relative`}
      style={{
        background: isPage
          ? "var(--background)"
          : "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--primary) 6%, var(--background)) 50%, var(--background) 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">The Complete Ritual</span>
          {isPage ? (
            <h1 className="serif mt-8 text-4xl md:text-6xl leading-[1.05]">
              Pressure. Cold. <span className="italic text-primary">Nourish.</span>
            </h1>
          ) : (
            <h2 className="serif mt-8 text-4xl md:text-6xl leading-[1.05]">
              Pressure. Cold. <span className="italic text-primary">Nourish.</span>
            </h2>
          )}
          <p className="mt-6 text-foreground/75 text-lg leading-[1.7]">
            The full ORIGEN morning ritual — all three steps, one package.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {BUNDLE_PRODUCTS.map((p, i) => (
            <Reveal key={p.handle} delay={i * 120}>
              <div className="border border-border/40 bg-card/40 grain h-full flex flex-col">
                <div className="aspect-[4/5] overflow-hidden bg-card">
                  <img
                    src={p.image}
                    alt={`${p.name} by ORIGEN — Step ${i + 1}, ${p.label}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="eyebrow text-primary">Step 0{i + 1} — {p.label}</div>
                  <h3 className="serif text-2xl mt-3">{p.name}</h3>
                  <p className="serif text-lg text-foreground/70 mt-auto pt-4">£{p.price}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-16 text-center">
          <div className="serif text-3xl md:text-4xl">
            <span className="text-foreground/60">Total</span>{" "}
            <span className="text-primary">£{TOTAL}</span>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={handleAddBundle}
              disabled={loading || isLoading || !ready}
              className="btn-gold text-base"
            >
              {loading || isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Add The Ritual to Cart — £{TOTAL} <span>→</span></>
              )}
            </button>
            <Link
              to="/"
              hash="products"
              className="text-xs tracking-[0.22em] uppercase text-foreground/60 hover:text-primary transition-colors"
            >
              Or shop products individually
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}