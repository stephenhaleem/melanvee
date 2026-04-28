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
  "Slick your hair into a low bun or cornrow it down, whichever feels good for you. Leave a small section out at the front to blend if you want that soft, melted-in finish.",
  "Slip her on. Adjust the inner straps so she sits snug without pressing, then lock her in with the built-in combs at the crown and nape.",
  "Smooth your leave-out through with a little curl custard or styling cream, finger-fluff where the textures meet and watch the blend happen.",
  "Lay your edges, spritz a little water to wake the curls, and step into your day.",
];

const uPartHowTo = [
  "Slick your hair back into a low bun or cornrow it flat, leaving a U-shaped section out along your natural parting.",
  "Place her on, pull your own hair through the U opening, and adjust the inner straps until she sits right.",
  "Secure with the built-in combs at the crown and nape. She should feel held, not heavy.",
  "Blend your leave-out into the texture with a styling cream until no one can tell where your hair ends and she begins.",
  "Style your parting, lay your edges, and go. She is yours now.",
];

const careRoutine = [
  "Co-wash or use a sulfate-free shampoo every 2 to 3 weeks. Work the product downward, never in circles.",
  "Deep condition every wash. 20 to 30 minutes, rinse cool, let the coils drink.",
  "Detangle damp, with conditioner in, fingers first then a wide-tooth comb. Never rip through dry.",
  "Air dry on a stand. Refresh curls between washes with a water and leave-in mist.",
  "Sleep satin. Store her on a stand, or tucked into her box. She is an investment, treat her like one.",
];

const commonFeatures = [
  "No lace, no glue",
  "Beginner friendly install",
  "Breathable for all-day wear",
  "Styles multiple ways",
  "100% premium virgin human hair",
];

const commonDensity = [
  '10" to 16": 2 full bundles',
  '18" to 24": 3 full bundles',
];

const commonOther = [
  "Safe to curl, straighten, dye or bleach",
  "100% premium virgin human hair",
  "Blends with short or long hair",
  "Blends with relaxed or natural hair",
  "Black-owned, made with love",
];

export const products: Product[] = [
  {
    id: "kimi-curl",
    name: "Kimi Curl",
    type: "Half Wig",
    texture: "4A to 4B",
    tagline: "Defined springy curls",
    shortDescription:
      "Kimi is the soft girl energy. True 4A to 4B springy curls with body, movement and just the right amount of fluff. She blends like she grew out of your head.",
    longDescription:
      "Kimi Curl is for the days you want to look soft, rested and effortlessly pulled together. A true 4A to 4B springy curl with body and bounce, made to melt into your leave-out so well that no one has to know. She is a half wig, which means she is quick, beginner friendly and forgiving. Slick your hair into a low bun or cornrow it down, slip her on, smooth the blend, and you have gone from wash day to main character in under ten minutes. Kimi is for the girls who grew up being told their curls were a lot, and built brands that prove they were always everything.",
    blendsWith: ["Short hair", "Long hair", "Relaxed hair", "Natural hair"],
    startingPriceGBP: 149,
    image: product1,
    notes: ["Half Wig", "4A to 4B Match", "No Lace", "No Glue", "Black Owned"],
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
      "Zora is the full unapologetic afro. Dense, coily, beautifully coarse 4B to 4C texture that stands up and shows out. For the girls who want their crown loud.",
    longDescription:
      "Zora Coil is loud, proud and deeply familiar. A true 4B to 4C afro coil, coarser and denser than Kimi, built for the girl who wants her hair to take up space the way it was always meant to. She is a U-part, which means she gives you the fullness of a full wig with the ease of a slip-on. No lace. No glue. No appointment. Slick your hair back, pull your edges through the U, and let your real hair meet hers like they have been friends for years. Zora protects your own coils while letting you wear them louder. She was made for us, by us.",
    blendsWith: ["Short hair", "Long hair", "Relaxed hair", "Natural hair"],
    startingPriceGBP: 149,
    image: product2,
    notes: ["U-Part", "4B to 4C Match", "No Lace", "No Glue", "Black Owned"],
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
      "Lola is the Friday night, the brunch reservation, the photo you will send to the group chat. Loose romantic waves with weightless volume, made to move with you.",
    longDescription:
      "Lola Bouncy is your going-out friend. Loose romantic waves, weightless body, the kind of movement that catches light in a good photo. She is a half wig, so she is quick, beginner friendly, and ready whenever you are. Slick your hair into a low bun, slip her on, shake her out, and suddenly it is a whole moment. Lola blends with short hair, long hair, relaxed or natural. She is the piece you reach for when you want to feel a little more yourself, a little more put together, without overthinking it.",
    blendsWith: ["Short hair", "Long hair", "Relaxed hair", "Natural hair"],
    startingPriceGBP: 155,
    image: product3,
    notes: ["Half Wig", "Loose Wave", "No Lace", "No Glue", "Black Owned"],
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
