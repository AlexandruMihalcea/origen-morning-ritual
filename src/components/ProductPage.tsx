import { Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Reveal } from "./Reveal";
import { Loader2 } from "lucide-react";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";

export type ProductInfo = {
  step: string;
  label: string;
  name: string;
  tagline: string;
  intro: string;
  benefits: { title: string; body: string }[];
  handle: string;
};

export function ProductPage({ p }: { p: ProductInfo }) {
  const { product, loading } = useShopifyProduct(p.handle);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  const variants = product?.node.variants.edges ?? [];
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const selectedVariant = useMemo(() => {
    const id = selectedVariantId ?? variants[0]?.node.id;
    return variants.find((v) => v.node.id === id)?.node ?? variants[0]?.node;
  }, [selectedVariantId, variants]);

  const image = product?.node.images.edges[0]?.node;
  const price = selectedVariant?.price;

  const handleAdd = async () => {
    if (!product || !selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Link to="/" hash="products" className="text-xs tracking-[0.22em] uppercase text-muted-foreground hover:text-primary transition-colors">
              ← Back to the kit
            </Link>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <Reveal>
              <div className="aspect-[4/5] bg-card rounded-sm relative overflow-hidden grain border border-border/40">
                {image ? (
                  <img
                    src={image.url}
                    alt={image.altText || p.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="serif text-[8rem] md:text-[12rem] text-primary/20 leading-none">{p.step}</div>
                      <div className="eyebrow mt-4">{p.label}</div>
                    </div>
                  </div>
                )}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
                  }}
                />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <span className="eyebrow">Step {p.step} — {p.label}</span>
              <h1 className="serif mt-4 text-5xl md:text-7xl leading-[1.05]">{p.name}</h1>
              <p className="serif italic text-2xl text-primary mt-4">{p.tagline}</p>
              {price && (
                <p className="serif text-3xl mt-6 text-foreground">
                  {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                </p>
              )}
              <p className="mt-8 text-lg leading-[1.8] text-foreground/85">{p.intro}</p>

              {variants.length > 1 && (
                <div className="mt-8">
                  <div className="eyebrow mb-3">Variant</div>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => {
                      const active = (selectedVariantId ?? variants[0]?.node.id) === v.node.id;
                      return (
                        <button
                          key={v.node.id}
                          onClick={() => setSelectedVariantId(v.node.id)}
                          className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-colors ${
                            active
                              ? "border-primary text-primary"
                              : "border-border/60 text-foreground/70 hover:border-primary/60"
                          }`}
                          disabled={!v.node.availableForSale}
                        >
                          {v.node.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={handleAdd}
                  className="btn-gold"
                  disabled={loading || isAdding || !selectedVariant?.availableForSale}
                >
                  {loading || isAdding ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : selectedVariant && !selectedVariant.availableForSale ? (
                    "Sold out"
                  ) : (
                    <>Add to ritual <span>→</span></>
                  )}
                </button>
                <Link to="/the-ritual" className="btn-gold" style={{ borderColor: "color-mix(in oklab, var(--primary) 40%, transparent)" }}>
                  Read the ritual
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="gold-divider my-24" />

          <div className="grid md:grid-cols-3 gap-10">
            {p.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 120}>
                <h3 className="serif text-2xl text-primary">{b.title}</h3>
                <p className="mt-4 text-foreground/80 leading-[1.8]">{b.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
