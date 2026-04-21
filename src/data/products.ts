import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  volume: string;
  image: string;
  notes: string[];
};

export const products: Product[] = [
  {
    id: "soie",
    name: "Élixir de Soie",
    tagline: "Featherweight silk mist",
    description:
      "A weightless veil of silk proteins and rosehip extract that smooths flyaways and crowns each strand in a soft, luminous halo.",
    price: "$68",
    volume: "120 ml",
    image: product1,
    notes: ["Silk Protein", "Rosehip", "Cashmere Musk"],
  },
  {
    id: "huile",
    name: "Huile Précieuse",
    tagline: "Restorative gold oil",
    description:
      "A blend of cold-pressed marula, argan, and Bulgarian rose. One drop transforms dry ends into mirrored, candle-lit shine.",
    price: "$92",
    volume: "50 ml",
    image: product2,
    notes: ["Marula", "Argan", "Bulgarian Rose"],
  },
  {
    id: "masque",
    name: "Masque Nocturne",
    tagline: "Overnight repair ritual",
    description:
      "A slow, indulgent treatment with hydrolyzed keratin and amber resin. Worn through the night, it rebuilds the hair from within.",
    price: "$118",
    volume: "200 ml",
    image: product3,
    notes: ["Keratin", "Amber Resin", "Vanilla Orchid"],
  },
];
