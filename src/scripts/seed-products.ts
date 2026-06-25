/**
 * MELANVÉE — Supabase product seed script
 *
 * Run once to migrate the 3 existing products into the database.
 *
 * Usage:
 *   npx tsx src/scripts/seed-products.ts
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const buildLengths = (base: number) =>
  [14, 16, 18, 20, 22, 24].map((inches, i) => ({
    inches,
    price: base + i * 15,
  }));

const products = [
  {
    id: "kimi-curl",
    name: "Kimi Curl",
    type: "Half Wig",
    texture: "4A – 4B",
    tagline: "Defined springy curls",
    description:
      "A weightless, true-to-texture curl pattern that mimics natural 4A to 4B hair — soft springy curls with body and movement. Designed as a half wig so it blends seamlessly with your own leave-out. Natural, full, unmistakably you.",
    starting_price_gbp: 149,
    image_url: null, // Upload images manually via the admin dashboard
    notes: ["Half Wig", "4A – 4B Match", "No Lace"],
    lengths: buildLengths(149),
    in_stock: true,
    sort_order: 1,
  },
  {
    id: "zora-coil",
    name: "Zora Coil",
    type: "U-Part Wig",
    texture: "4B – 4C",
    tagline: "Tight afro coils",
    description:
      "A protective U-part wig in a true 4B to 4C afro coil — coarser, denser, and fuller than Kimi. Slip it on, lay your edges, and walk out. No lace, no salon, no damage to your own hair.",
    starting_price_gbp: 149,
    image_url: null,
    notes: ["U-Part", "4B – 4C Match", "No Lace"],
    lengths: buildLengths(149),
    in_stock: true,
    sort_order: 2,
  },
  {
    id: "Layla-bouncy",
    name: "Layla Bouncy",
    type: "Half Wig",
    texture: "Loose Wave",
    tagline: "Voluminous bouncy waves",
    description:
      "Loose, romantic waves with weightless body. The half wig you reach for when you want soft volume that still looks like your own hair — relaxed, effortless, made to move.",
    starting_price_gbp: 155,
    image_url: null,
    notes: ["Half Wig", "Loose Wave", "No Lace"],
    lengths: buildLengths(155),
    in_stock: true,
    sort_order: 3,
  },
];

async function seed() {
  console.log("Seeding products into Supabase…\n");

  for (const product of products) {
    const { error } = await supabase.from("products").upsert(product, { onConflict: "id" });

    if (error) {
      console.error(`❌ Failed to seed "${product.name}":`, error.message);
    } else {
      console.log(`✅ Seeded: ${product.name}`);
    }
  }

  console.log("\nDone. Now upload product images via the admin dashboard at /admin");
}

seed();
