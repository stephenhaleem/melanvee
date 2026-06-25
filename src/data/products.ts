import product1 from "@/assets/kimi.jpeg";
import product2 from "@/assets/zora.jpeg";
import product3 from "@/assets/WhatsApp Image 2026-04-29 at 4.24.41 AM (1).jpeg";

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
  "Slick your hair into a low bun or cornrow it down. Leave a small section out at the front to blend if you want that soft, melted-in finish.",
  "Slip her on. Adjust the inner straps so she sits snug without pressing, then lock her in with the built-in combs at the crown and nape.",
  "Smooth your leave-out through with a little curl custard or styling cream, finger-fluff where the textures meet and watch the blend happen.",
  "Lay your edges, spritz a little water to wake the curls, and step into your day.",
];

const uPartHowTo = [
  "Slick your hair back into a low bun or cornrow it flat, leaving a U-shaped section out along your natural parting.",
  "Place her on, pull your own hair through the U opening, and adjust the inner straps until she sits right.",
  "Secure with the built-in combs at the crown and nape. She should feel held, not heavy.",
  "Blend your leave-out into the texture with a styling cream until no one can tell where your hair ends and she begins.",
  "Style your parting, lay your edges, and go.",
];

const careRoutine = [
  "Co-wash or use a sulfate-free shampoo every 2 to 3 weeks. Work the product downward, never in circles.",
  "Deep condition every wash. 20 to 30 minutes, rinse cool, let the coils drink.",
  "Detangle damp, with conditioner in, fingers first then a wide-tooth comb. Never rip through dry.",
  "Air dry on a stand. Refresh curls or waves between washes with a water and leave-in mist.",
  "Sleep satin. Store her on a stand, or tucked into her box. She is an investment, treat her like one.",
];

const commonFeatures = [
  "No lace, no glue",
  "Beginner friendly install",
  "Breathable for all-day wear",
  "Styles multiple ways",
  "100% premium virgin human hair",
];

const commonDensity = ['10" to 16": 2 full bundles', '18" to 24": 3 full bundles'];

const commonOther = [
  "Safe to curl, straighten, dye or bleach",
  "100% premium virgin human hair",
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
      "Kimi mimics a true kinky curly texture. Soft, springy 4A to 4B curls with real body and movement, made to sit like they grew out of your own head.",
    longDescription:
      "Kimi Curl is our kinky curly piece. A soft, springy 4A to 4B curl with body and bounce, designed to mimic natural kinky curly hair so closely you forget where yours ends and she begins. She is the quiet confidence wig: relaxed enough for everyday, rich enough for a dinner reservation. A half wig build means she is beginner friendly, quick to install, and forgiving while you learn her.",
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
    type: "Half Wig",
    texture: "4B to 4C",
    tagline: "Tight afro coils",
    shortDescription:
      "Zora is the full unapologetic afro. Dense, coily, beautifully coarse 4B to 4C texture that stands up and shows out.",
    longDescription:
      "Zora Coil is loud, proud and deeply familiar. A true 4B to 4C afro coil, coarser and denser than Kimi, built for when you want your hair to take up space the way it was always meant to. As a half wig she gives you that fullness with the ease of a slip-on. No lace. No glue. No appointment. She protects your own coils while letting you wear them louder.",
    blendsWith: ["Short hair", "Long hair", "Relaxed hair", "Natural hair"],
    startingPriceGBP: 149,
    image: product2,
    notes: ["Half Wig", "4B to 4C Match", "No Lace", "No Glue"],
    features: commonFeatures,
    density: commonDensity,
    lifespan: "1 to 3 years with proper care",
    other: commonOther,
    care: careRoutine,
    howToWear: halfWigHowTo,
    lengths: buildLengths(149),
  },
  {
    id: "Layla-bouncy",
    name: "Layla Bouncy",
    type: "U-Part Wig",
    texture: "Loose Wave",
    tagline: "Voluminous bouncy waves",
    shortDescription:
      "Layla is bounce, body and movement. Soft loose waves with weightless volume, made to swing, catch light and feel effortlessly glamorous.",
    longDescription:
      "Layla Bouncy is our wave piece. A different mood from Kimi and Zora: where they hold a defined coil, Layla flows. Soft, loose, body-rich waves with the kind of bounce that moves when you move. Built as a U-part so you can pull your own hair through and blend seamlessly, she gives you full wig fullness with slip-on ease. The piece you reach for when you want to feel a little more put together without overthinking it.",
    blendsWith: ["Short hair", "Long hair", "Relaxed hair", "Natural hair"],
    startingPriceGBP: 155,
    image: product3,
    notes: ["U-Part", "Loose Wave", "No Lace", "No Glue"],
    features: commonFeatures,
    density: commonDensity,
    lifespan: "1 to 3 years with proper care",
    other: commonOther,
    care: careRoutine,
    howToWear: uPartHowTo,
    lengths: buildLengths(155),
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
