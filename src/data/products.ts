import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export type LengthOption = { inches: number; price: number };

export type Product = {
  id: string;
  name: string;
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
    tagline: "Defined springy curls",
    description:
      "A weightless, hand-tied curl pattern with bounce and movement. Crafted on an HD lace base for an undetectable hairline that disappears into your skin.",
    startingPrice: "£149",
    image: product1,
    notes: ["HD Lace", "Hand-Tied", "Pre-Plucked"],
    lengths: buildLengths(149),
  },
  {
    id: "zora-coil",
    name: "Zora Coil",
    tagline: "Tight kinky coils",
    description:
      "A protective, true-to-texture kinky coil designed to blend seamlessly with 4B/4C natural hair. Soft, full, and unapologetic.",
    startingPrice: "£149",
    image: product2,
    notes: ["4C Match", "Glueless Fit", "Bleached Knots"],
    lengths: buildLengths(149),
  },
  {
    id: "lola-bouncy",
    name: "Lola Bouncy",
    tagline: "Voluminous bouncy waves",
    description:
      "Loose, romantic waves with weightless body. The wig you reach for when you want to feel soft, slow, and seen.",
    startingPrice: "£155",
    image: product3,
    notes: ["HD Lace", "Loose Wave", "Glueless Fit"],
    lengths: buildLengths(155),
  },
];
