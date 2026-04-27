import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export type LengthOption = { inches: number; price: number };

export type Product = {
  id: string;
  name: string;
  type: "Half Wig" | "U-Part Wig";
  texture: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  blendsWith: string[];
  startingPriceGBP: number;
  image: string;
  notes: string[];
  features: string[];
  density: string[];
  lifespan: string;
  other: string[];
  care: string[];
  howToWear: string[];
  lengths: LengthOption[];
};

// +£15 per 2 inches, 14" to 24"
const buildLengths = (base: number): LengthOption[] =>
  [14, 16, 18, 20, 22, 24].map((inches, i) => ({
    inches,
    price: base + i * 15,
  }));

const halfWigHowTo = [
  "Braid your natural hair down in cornrows or flat twists, leaving out a small section at the front to blend.",
  "Slip the half wig on, adjusting the adjustable straps inside for a snug, comfortable fit.",
  "Secure with the built-in combs at the crown and nape.",
  "Blend your leave-out with the wig using a light styling cream or curl custard.",
  "Lay your edges if you like, and you are ready to go.",
];

const uPartHowTo = [
  "Braid your hair down, leaving a U-shaped section out along your natural parting.",
  "Place the wig on your head and pull your own hair through the U-part opening.",
  "Adjust the inner straps and secure with the built-in combs.",
  "Blend your leave-out into the wig with a styling cream for a seamless finish.",
  "Style your parting, lay your edges, and go.",
];

const careRoutine = [
  "Wash gently every 2 to 3 weeks with a sulfate-free shampoo.",
  "Deep condition regularly to keep coils soft and defined.",
  "Detangle gently from ends to roots with fingers or a wide-tooth comb.",
  "Air dry on a wig stand. Avoid high heat when possible.",
  "Store on a wig stand or in the original satin-lined box when not worn.",
];

const commonFeatures = [
  "No lace, no glue",
  "Comfortable, universal cap size",
  "Breathable, all-day wear",
  "Multiple styling options",
  "Beginner friendly install",
];

const commonDensity = [
  '10" to 16": 2 full bundles',
  '18" to 24": 3 full bundles',
];

const commonOther = [
  "Safe to curl, straighten, dye or bleach",
  "100% premium human hair",
  "Blends with short or long hair",
  "Blends with relaxed or natural hair",
];

export const products: Product[] = [
  {
    id: "kimi-curl",
    name: "Kimi Curl",
    type: "Half Wig",
    texture: "4A to 4B",
    tagline: "Defined springy curls",
    shortDescription:
      "A weightless, true-to-texture curl that mimics natural 4A to 4B hair. Soft springy curls with body and movement.",
    longDescription:
      "The Half Wig is the quick option. Beginner friendly, lightweight and versatile, it gives you a natural, salon-fresh look in minutes. Kimi Curl was made to blend effortlessly with short or long hair, relaxed or natural. Slip it on, blend your leave-out and walk out feeling like the softest version of yourself.",
    blendsWith: ["Short hair", "Long hair", "Relaxed hair", "Natural hair"],
    startingPriceGBP: 149,
    image: product1,
    notes: ["Half Wig", "4A to 4B Match", "No Lace", "No Glue"],
    features: commonFeatures,
    density: commonDensity,
    lifespan: "1 to 3 years with proper care",
    other: commonOther,
    care: careRoutine,
    howToWear: halfWigHowTo,
    lengths: buildLengths(149),
  },
  {
    id: "zora-coil",
    name: "Zora Coil",
    type: "U-Part Wig",
    texture: "4B to 4C",
    tagline: "Tight afro coils",
    shortDescription:
      "A protective U-part wig in a true 4B to 4C afro coil. Coarser, denser and fuller than Kimi. Slip it on, lay your edges, and go.",
    longDescription:
      "Our U-Part wig gives you the fullness of a full wig with the ease of a slip-on piece. No lace, no glue, no salon required. Zora Coil is a true 4B to 4C afro texture, made to blend with short or long hair, relaxed or natural. Quick to install, comfortable enough to live in, and protective of your own hair.",
    blendsWith: ["Short hair", "Long hair", "Relaxed hair", "Natural hair"],
    startingPriceGBP: 149,
    image: product2,
    notes: ["U-Part", "4B to 4C Match", "No Lace", "No Glue"],
    features: commonFeatures,
    density: commonDensity,
    lifespan: "1 to 3 years with proper care",
    other: commonOther,
    care: careRoutine,
    howToWear: uPartHowTo,
    lengths: buildLengths(149),
  },
  {
    id: "lola-bouncy",
    name: "Lola Bouncy",
    type: "Half Wig",
    texture: "Loose Wave",
    tagline: "Voluminous bouncy waves",
    shortDescription:
      "Loose, romantic waves with weightless body. The half wig you reach for when you want soft volume that still looks like your own hair.",
    longDescription:
      "The Half Wig is the quick option. Beginner friendly, lightweight and versatile, Lola Bouncy gives you a natural, salon-fresh look in minutes. Soft, romantic waves that blend with short or long hair, relaxed or natural. Made to move, made to live in.",
    blendsWith: ["Short hair", "Long hair", "Relaxed hair", "Natural hair"],
    startingPriceGBP: 155,
    image: product3,
    notes: ["Half Wig", "Loose Wave", "No Lace", "No Glue"],
    features: commonFeatures,
    density: commonDensity,
    lifespan: "1 to 3 years with proper care",
    other: commonOther,
    care: careRoutine,
    howToWear: halfWigHowTo,
    lengths: buildLengths(155),
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
