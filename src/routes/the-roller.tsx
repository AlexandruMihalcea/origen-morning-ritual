import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/ProductPage";

export const Route = createFileRoute("/the-roller")({
  head: () => ({
    meta: [
      { title: "The Roller — ORIGEN" },
      { name: "description", content: "Cold that sharpens. Reduce puffiness, calm inflammation, wake the body without stimulants." },
      { property: "og:title", content: "The Roller — ORIGEN" },
      { property: "og:description", content: "Cold that sharpens." },
    ],
  }),
  component: () => (
    <ProductPage
      p={{
        step: "02",
        label: "Cold",
        name: "The Roller",
        tagline: "Cold that sharpens.",
        intro:
          "Roll. Reduce. Reset. Cold therapy reduces morning puffiness, calms inflammation, and signals the brain to wake — without the crash that follows stimulants. The simplest tool in the ritual. Often the most addictive.",
        benefits: [
          { title: "Vasoconstriction", body: "Blood vessels narrow then dilate. Circulation moves. The face wakes up first — the rest follows." },
          { title: "De-puff & decongest", body: "Lymphatic drainage in three minutes. The mirror tells the truth: a sharper version of you, immediately." },
          { title: "Earned alertness", body: "No caffeine, no crash. The clarity is yours, generated from inside the body, not borrowed from a cup." },
        ],
        handle: "anti-ageing-treatment-for-face-and-neck-ecotools-jade-jade-set-2",
      }}
    />
  ),
});