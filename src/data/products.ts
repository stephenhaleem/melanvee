import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export type LengthOption = { inches: number; price: number };

export type Product = {
  id: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  startingPrice: string;
  image: string;
  notes: string[];
  lengths: LengthOption[];
};

// +£15 per 2 inches, 14" → 24"
const buildLengths = (base: number): LengthOption[] =>
  [14, 16, 18, 20, 22, 24].map((inches, i) => ({
    inches,
    price: base + i * 15,
  }));

export const products: Product[] = [
  {
    id: "kimi-curl",
    name: "Kimi Curl",
    type: "Half Wig",
    tagline: "Defined springy curls",
    description:
      "A weightless, true-to-texture curl pattern with bounce and movement. Designed as a half wig so it blends seamlessly with your own leave-out — natural, soft, and unmistakably you.",
    startingPrice: "£149",
    image: product1,
    notes: ["Half Wig", "True 3C Curl", "Glueless"],
    lengths: buildLengths(149),
  },
  {
    id: "zora-coil",
    name: "Zora Coil",
    type: "U-Part Wig",
    tagline: "Tight kinky coils",
    description:
      "A protective U-part wig in a true 4B/4C coil. Slip it on, lay your edges, and walk out — no glue, no salon, no damage.",
    startingPrice: "£149",
    image: product2,
    notes: ["U-Part", "4B/4C Match", "Glueless"],
    lengths: buildLengths(149),
  },
  {
    id: "lola-bouncy",
    name: "Lola Bouncy",
    type: "Half Wig",
    tagline: "Voluminous bouncy waves",
    description:
      "Loose, romantic waves with weightless body. The half wig you reach for when you want soft volume that still looks like your own hair.",
    startingPrice: "£155",
    image: product3,
    notes: ["Half Wig", "Loose Wave", "Glueless"],
    lengths: buildLengths(155),
  },
];
