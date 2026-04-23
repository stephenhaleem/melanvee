import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export type LengthOption = { inches: number; price: number };

export type Product = {
  id: string;
  name: string;
  type: string;
  texture: string;
  tagline: string;
  description: string;
  startingPriceGBP: number;
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
    texture: "4A – 4B",
    tagline: "Defined springy curls",
    description:
      "A weightless, true-to-texture curl pattern that mimics natural 4A to 4B hair — soft springy curls with body and movement. Designed as a half wig so it blends seamlessly with your own leave-out. Natural, full, unmistakably you.",
    startingPriceGBP: 149,
    image: product1,
    notes: ["Half Wig", "4A – 4B Match", "No Lace"],
    lengths: buildLengths(149),
  },
  {
    id: "zora-coil",
    name: "Zora Coil",
    type: "U-Part Wig",
    texture: "4B – 4C",
    tagline: "Tight afro coils",
    description:
      "A protective U-part wig in a true 4B to 4C afro coil — coarser, denser, and fuller than Kimi. Slip it on, lay your edges, and walk out. No lace, no salon, no damage to your own hair.",
    startingPriceGBP: 149,
    image: product2,
    notes: ["U-Part", "4B – 4C Match", "No Lace"],
    lengths: buildLengths(149),
  },
  {
    id: "lola-bouncy",
    name: "Lola Bouncy",
    type: "Half Wig",
    texture: "Loose Wave",
    tagline: "Voluminous bouncy waves",
    description:
      "Loose, romantic waves with weightless body. The half wig you reach for when you want soft volume that still looks like your own hair — relaxed, effortless, made to move.",
    startingPriceGBP: 155,
    image: product3,
    notes: ["Half Wig", "Loose Wave", "No Lace"],
    lengths: buildLengths(155),
  },
];
