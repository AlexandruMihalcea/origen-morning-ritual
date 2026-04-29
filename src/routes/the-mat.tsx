import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/ProductPage";

export const Route = createFileRoute("/the-mat")({
  head: () => ({
    meta: [
      { title: "The Mat — ORIGEN" },
      { name: "description", content: "Pressure that grounds. 8,820 acupressure points to release tension and reset the nervous system." },
      { property: "og:title", content: "The Mat — ORIGEN" },
      { property: "og:description", content: "Pressure that grounds." },
    ],
  }),
  component: () => (
    <ProductPage
      p={{
        step: "01",
        label: "Pressure",
        name: "The Mat",
        tagline: "Pressure that grounds.",
        intro:
          "Lie down. Let go. The mat's 8,820 acupressure points release tension held in the back, neck, and shoulders — activating the nervous system and flooding the body with endorphins. Ten minutes is enough to feel the shift.",
        benefits: [
          { title: "8,820 points", body: "Stimulate pressure receptors across the back, neck and shoulders. Tension dissolves where it lives." },
          { title: "Endorphin release", body: "The body responds with its own chemistry — a clean, natural lift that lasts hours after you stand up." },
          { title: "Nervous system reset", body: "Sympathetic to parasympathetic. Cortisol drops. You arrive in your body before the day asks anything of you." },
        ],
        handle: "acupressure-mat-sensi-massage-mat-pillow-set-applicator-for-neck-foot",
      }}
    />
  ),
});