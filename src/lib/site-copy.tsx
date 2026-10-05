import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export const SITE_COPY_FIELDS = [
  {
    section: "Header",
    label: "Announcement bar",
    key: "header.announcement",
    fallback:
      "Free UK & international shipping on orders over £100 · Premium virgin human hair · True 3A to 4C textures · No lace · No glue",
  },
  { section: "Header", label: "Shop button", key: "header.shop_button", fallback: "Shop Now" },
  { section: "Header", label: "Home navigation", key: "header.nav.home", fallback: "Home" },
  { section: "Header", label: "Shop navigation", key: "header.nav.shop", fallback: "Shop" },
  {
    section: "Header",
    label: "Texture navigation",
    key: "header.nav.texture",
    fallback: "Texture",
  },
  {
    section: "Header",
    label: "Wear & Care navigation",
    key: "header.nav.wear_care",
    fallback: "Wear & Care",
  },
  { section: "Header", label: "About navigation", key: "header.nav.about", fallback: "About" },
  {
    section: "Header",
    label: "Collaborate navigation",
    key: "header.nav.collaborate",
    fallback: "Collab",
  },
  {
    section: "Header",
    label: "Contact navigation",
    key: "header.nav.contact",
    fallback: "Contact",
  },
  {
    section: "Footer",
    label: "Tagline",
    key: "footer.tagline",
    fallback: "Made to feel like yours.",
  },
  {
    section: "Footer",
    label: "Description",
    key: "footer.description",
    fallback: "Half wigs and U-part wigs for women of colour. True 3A to 4C textures.",
  },
  {
    section: "Footer",
    label: "Explore heading",
    key: "footer.explore_heading",
    fallback: "Explore",
  },
  {
    section: "Footer",
    label: "Contact heading",
    key: "footer.contact_heading",
    fallback: "Contact",
  },
  {
    section: "Footer",
    label: "Customer care email",
    key: "footer.customer_email",
    fallback: "customercare@melanvee.com",
  },
  {
    section: "Footer",
    label: "Collaboration email",
    key: "footer.collab_email",
    fallback: "woman@melanvee.com",
  },
  {
    section: "Footer",
    label: "WhatsApp contact",
    key: "footer.whatsapp",
    fallback: "WhatsApp: +447760317678 (Mon–Fri) 9am–4pm",
  },
  {
    section: "Footer",
    label: "Location and shipping",
    key: "footer.location",
    fallback: "London · Worldwide shipping",
  },
  {
    section: "Home",
    label: "Hero eyebrow",
    key: "home.hero.eyebrow",
    fallback: "· The Collection",
  },
  {
    section: "Home",
    label: "Hero heading",
    key: "home.hero.heading",
    fallback: "Hair made to feel like yours.",
  },
  {
    section: "Home",
    label: "Hero description",
    key: "home.hero.description",
    fallback:
      "Designed to blend seamlessly with your coils, kinks and curls so you can leave the house in minutes, skip the lace, and wear your hair with confidence.",
  },
  {
    section: "Home",
    label: "Hero shop button",
    key: "home.hero.shop_button",
    fallback: "Shop the Collection",
  },
  {
    section: "Home",
    label: "Hero texture button",
    key: "home.hero.texture_button",
    fallback: "Find Your Texture",
  },
  {
    section: "Home",
    label: "Collection heading",
    key: "home.collection.heading",
    fallback: "Every Texture, Covered.",
  },
  {
    section: "Home",
    label: "Collection description",
    key: "home.collection.description",
    fallback:
      "A growing collection of textures and styles—from tight coils to bouncy kinks, defined curls to blowout textures. Multiple lengths, multiple constructions, all designed to feel like yours.",
  },
  {
    section: "Home",
    label: "Philosophy heading",
    key: "home.philosophy.heading",
    fallback: "Made for our textures.",
  },
  {
    section: "Home",
    label: "Philosophy description",
    key: "home.philosophy.description",
    fallback:
      "MELANVÉE exists for every woman who is tired of salons, tired of wigs that look artificial, tired of damage, tired of spending hours on her hair. The woman who wants to look like herself, not just on a good hair day, but every single day.",
  },
  {
    section: "Home",
    label: "Philosophy link",
    key: "home.philosophy.link",
    fallback: "Read Our Story",
  },
  {
    section: "Home",
    label: "FAQ teaser heading",
    key: "home.faq.heading",
    fallback: "Everything you need to know.",
  },
  {
    section: "Home",
    label: "FAQ teaser description",
    key: "home.faq.description",
    fallback: "Texture matching, install times, shipping, returns, all answered.",
  },
  {
    section: "Home",
    label: "Newsletter heading",
    key: "home.newsletter.heading",
    fallback: "Be first for the launch.",
  },
  {
    section: "Home",
    label: "Newsletter description",
    key: "home.newsletter.description",
    fallback: "Early access, restock alerts, and first looks at new textures.",
  },
  {
    section: "Collection",
    label: "All products option",
    key: "collection.all_products",
    fallback: "All products",
  },
  { section: "About", label: "Page eyebrow", key: "about.eyebrow", fallback: "— Our Story" },
  {
    section: "About",
    label: "Page heading",
    key: "about.heading",
    fallback: "Made for our textures",
  },
  {
    section: "About",
    label: "Tagline",
    key: "about.tagline",
    fallback: "Made to feel like yours.",
  },
  {
    section: "About",
    label: "Founder quote",
    key: "about.quote",
    fallback:
      "For too long, women of colour have been let down by the hair industry—wigs that don't match our textures, lace that doesn't sit, and installs that damage the hair we are trying to protect.",
  },
  {
    section: "About",
    label: "Story paragraph 1",
    key: "about.story_1",
    fallback:
      "MELANVÉE exists for every woman who is tired of salons, tired of wearing wigs that look artificial, tired of damage, tired of spending hours on her hair.",
  },
  {
    section: "About",
    label: "Story paragraph 2",
    key: "about.story_2",
    fallback:
      "For the woman who wants to look like herself—not just on a good hair day, but every single day.",
  },
  {
    section: "About",
    label: "Story paragraph 3",
    key: "about.story_3",
    fallback:
      "What started as three pieces has grown into a full collection—each texture carefully chosen, each piece designed to slip on, blend in, and let you live your day.",
  },
  {
    section: "About",
    label: "Values heading",
    key: "about.values_heading",
    fallback: "What we stand for.",
  },
  {
    section: "About",
    label: "Value 1 title",
    key: "about.value1.title",
    fallback: "True 3A–4C Textures",
  },
  {
    section: "About",
    label: "Value 1 description",
    key: "about.value1.description",
    fallback: "Every pattern is matched to real Type 3 and Type 4 hair—not a generic 'curly'.",
  },
  {
    section: "About",
    label: "Value 2 title",
    key: "about.value2.title",
    fallback: "Lace-Free Fit",
  },
  {
    section: "About",
    label: "Value 2 description",
    key: "about.value2.description",
    fallback:
      "Half wigs, U-part, V-part wigs and crochet hair you can put on yourself in minutes—no lace, no glue, no salon, no damage.",
  },
  {
    section: "About",
    label: "Value 3 title",
    key: "about.value3.title",
    fallback: "Made to Feel Like Yours",
  },
  {
    section: "About",
    label: "Value 3 description",
    key: "about.value3.description",
    fallback: "Soft enough to live in. Natural enough that no one has to know it isn't your own.",
  },
  { section: "FAQ", label: "Page heading", key: "faq.heading", fallback: "Asked & answered." },
  {
    section: "FAQ",
    label: "Page description",
    key: "faq.description",
    fallback:
      "Still wondering something? WhatsApp us Monday to Friday, or email us any time at hello@melanvee.com.",
  },
  {
    section: "FAQ",
    label: "Question 1",
    key: "faq.1.question",
    fallback: "How do I know which texture is right for me?",
  },
  {
    section: "FAQ",
    label: "Answer 1",
    key: "faq.1.answer",
    fallback:
      "Kimi Curl matches 4A to 4B (soft springy curls). Zora Coil matches 4B to 4C (tighter, fuller afro coils). Lola Bouncy is a loose wave for anyone wanting soft volume. Visit our Texture Guide, or WhatsApp us a photo and we will match you.",
  },
  {
    section: "FAQ",
    label: "Question 2",
    key: "faq.2.question",
    fallback: "Do these have lace? Do I need glue?",
  },
  {
    section: "FAQ",
    label: "Answer 2",
    key: "faq.2.answer",
    fallback:
      "No lace, no glue. These are half wigs and U-part wigs. They install in under 5 minutes. Half wigs blend with your own leave-out. The U-part wig sits over your parted hair. No tape, no salon required.",
  },
  {
    section: "FAQ",
    label: "Question 3",
    key: "faq.3.question",
    fallback: "What cap size are the wigs?",
  },
  {
    section: "FAQ",
    label: "Answer 3",
    key: "faq.3.answer",
    fallback:
      "Every piece uses a universal cap size with adjustable inner straps and built-in combs. Circumference is around 22 inches (56cm). Comfortable on most head shapes. See our How to Wear page for the full diagram.",
  },
  {
    section: "FAQ",
    label: "Question 4",
    key: "faq.4.question",
    fallback: "Will it blend with my own hair?",
  },
  {
    section: "FAQ",
    label: "Answer 4",
    key: "faq.4.answer",
    fallback:
      "Yes. Our pieces blend with short or long hair, relaxed or natural. A little styling cream on your leave-out gives a seamless finish.",
  },
  {
    section: "FAQ",
    label: "Question 5",
    key: "faq.5.question",
    fallback: "What is the difference between a half wig and a U-part wig?",
  },
  {
    section: "FAQ",
    label: "Answer 5",
    key: "faq.5.answer",
    fallback:
      "A half wig covers the back half of your head. You leave out a section of your own hair at the front to blend. A U-part has a U-shaped opening at the top so you can pull through your own parting. Both are protective, glueless and beginner friendly.",
  },
  {
    section: "FAQ",
    label: "Question 6",
    key: "faq.6.question",
    fallback: "How long do they last?",
  },
  {
    section: "FAQ",
    label: "Answer 6",
    key: "faq.6.answer",
    fallback:
      "With proper care: 1 to 3 years of regular wear. Wash gently every 2 to 3 weeks, air dry, and store on a wig stand. See our Wear & Care page for the full guide.",
  },
  {
    section: "FAQ",
    label: "Question 7",
    key: "faq.7.question",
    fallback: "Can I dye, bleach or heat-style them?",
  },
  {
    section: "FAQ",
    label: "Answer 7",
    key: "faq.7.answer",
    fallback:
      "Yes. They are 100% premium human hair. Safe to curl, straighten, dye or bleach. We recommend a professional colourist for any colour change. Use a heat protectant for any heat styling.",
  },
  {
    section: "FAQ",
    label: "Question 8",
    key: "faq.8.question",
    fallback: "How long does shipping take?",
  },
  {
    section: "FAQ",
    label: "Answer 8",
    key: "faq.8.answer",
    fallback:
      "UK and Europe: dispatched within 24 to 48 hours, delivered in 3 to 5 working days. Free UK shipping over £100. Rest of world: 5 to 10 working days. All orders are tracked.",
  },
  {
    section: "FAQ",
    label: "Question 9",
    key: "faq.9.question",
    fallback: "What is your returns policy?",
  },
  {
    section: "FAQ",
    label: "Answer 9",
    key: "faq.9.answer",
    fallback:
      "Unworn, unaltered pieces in original packaging can be returned within 14 days of delivery. All returns are subject to a quality inspection. Return shipping is the customer's responsibility, except in cases of damaged or faulty items. See our full Policies page.",
  },
  {
    section: "FAQ",
    label: "Question 10",
    key: "faq.10.question",
    fallback: "What is your exchange policy?",
  },
  {
    section: "FAQ",
    label: "Answer 10",
    key: "faq.10.answer",
    fallback:
      "Exchanges are accepted within 7 days of delivery on unopened, unworn pieces in original packaging. Customer covers return shipping. See our full Policies page.",
  },
  {
    section: "FAQ",
    label: "Question 11",
    key: "faq.11.question",
    fallback: "Do you ship worldwide?",
  },
  {
    section: "FAQ",
    label: "Answer 11",
    key: "faq.11.answer",
    fallback:
      "Yes. We ship to the UK, EU, US, Canada, Africa, and most of the rest of the world. Customs duties are the buyer's responsibility outside the UK and EU.",
  },
  {
    section: "Contact",
    label: "Page heading",
    key: "contact.heading",
    fallback: "We'd love to hear from you.",
  },
  {
    section: "Contact",
    label: "Page description",
    key: "contact.description",
    fallback:
      "Questions about texture, length, or shipping? WhatsApp us Monday to Friday, or drop us an email any time.",
  },
  {
    section: "Contact",
    label: "WhatsApp section label",
    key: "contact.whatsapp_label",
    fallback: "WhatsApp",
  },
  {
    section: "Contact",
    label: "WhatsApp hours",
    key: "contact.whatsapp_hours",
    fallback: "Monday to Friday · Tap to chat · Response time: 9am–4pm",
  },
  {
    section: "Contact",
    label: "Email section label",
    key: "contact.email_label",
    fallback: "Email · Anytime",
  },
  {
    section: "Contact",
    label: "Shipping section label",
    key: "contact.shipping_label",
    fallback: "London · Worldwide",
  },
  {
    section: "Contact",
    label: "Shipping description",
    key: "contact.shipping_description",
    fallback: "Free UK and international shipping for orders over £100",
  },
  {
    section: "Contact",
    label: "Contact success heading",
    key: "contact.success_heading",
    fallback: "Thank you.",
  },
  {
    section: "Contact",
    label: "Contact success description",
    key: "contact.success_description",
    fallback: "We've received your message and will reply within 1–2 working days.",
  },
  {
    section: "Texture Guide",
    label: "Page heading",
    key: "texture.heading",
    fallback: "Find your match.",
  },
  {
    section: "Texture Guide",
    label: "Page eyebrow",
    key: "texture.eyebrow",
    fallback: "· Texture Guide",
  },
  {
    section: "Texture Guide",
    label: "Page description",
    key: "texture.description",
    fallback:
      "MELANVÉE is built for Type 3 and Type 4 hair: the kinks, coils and curls the industry has overlooked. Plus a loose wave for soft, romantic volume.",
  },
  { section: "Texture Guide", label: "4A title", key: "texture.4a.name", fallback: "Soft Coils" },
  {
    section: "Texture Guide",
    label: "Texture 4A description",
    key: "texture.4a.description",
    fallback:
      "Defined springy S-shaped coils. Soft to the touch with visible curl pattern. Shrinks but bounces back.",
  },
  {
    section: "Texture Guide",
    label: "4A product match",
    key: "texture.4a.match",
    fallback: "Kimi Curl",
  },
  {
    section: "Texture Guide",
    label: "4B title",
    key: "texture.4b.name",
    fallback: "Z-Pattern Coils",
  },
  {
    section: "Texture Guide",
    label: "Texture 4B description",
    key: "texture.4b.description",
    fallback:
      "Tighter, less defined coils that bend in sharp Z-angles. Dense and cottony when dry, defined when wet.",
  },
  {
    section: "Texture Guide",
    label: "4B product match",
    key: "texture.4b.match",
    fallback: "Kimi Curl (or Zora for fuller volume)",
  },
  {
    section: "Texture Guide",
    label: "4C title",
    key: "texture.4c.name",
    fallback: "Tight Afro Coils",
  },
  {
    section: "Texture Guide",
    label: "Texture 4C description",
    key: "texture.4c.description",
    fallback:
      "The tightest pattern: coily, dense, with maximum shrinkage. Holds its shape with the most fullness.",
  },
  {
    section: "Texture Guide",
    label: "4C product match",
    key: "texture.4c.match",
    fallback: "Zora Coil",
  },
  {
    section: "Texture Guide",
    label: "Bouncy title",
    key: "texture.bouncy.name",
    fallback: "Bouncy",
  },
  {
    section: "Texture Guide",
    label: "Bouncy description",
    key: "texture.bouncy.description",
    fallback:
      "Full, voluminous hair with natural lift and movement. Soft to the touch with a bounce that holds throughout the day. Looks effortless, feels weightless.",
  },
  {
    section: "Texture Guide",
    label: "Bouncy product match",
    key: "texture.bouncy.match",
    fallback: "Lola Bouncy (or Alima Bouncy)",
  },
  {
    section: "Texture Guide",
    label: "3A title",
    key: "texture.3a.name",
    fallback: "Loose Spirals",
  },
  {
    section: "Texture Guide",
    label: "Texture 3A description",
    key: "texture.3a.description",
    fallback:
      "Big, open spirals with natural shine and movement. Low shrinkage with a curl pattern that falls freely. Light, bouncy and soft.",
  },
  {
    section: "Texture Guide",
    label: "3A product match",
    key: "texture.3a.match",
    fallback: "Beach Curl",
  },
  {
    section: "Texture Guide",
    label: "Best match label",
    key: "texture.best_match",
    fallback: "Best match",
  },
  {
    section: "Texture Guide",
    label: "Match recommendation",
    key: "texture.suggested_match",
    fallback: "Suggested match",
  },
  {
    section: "Texture Guide",
    label: "Help description",
    key: "texture.help",
    fallback:
      "Not sure? WhatsApp us a photo of your hair and we will match you personally, usually within an hour.",
  },
  {
    section: "Wear & Care",
    label: "Page heading",
    key: "wear.heading",
    fallback: "Install. Wear. Love her.",
  },
  { section: "Wear & Care", label: "Page eyebrow", key: "wear.eyebrow", fallback: "Wear & Care" },
  {
    section: "Wear & Care",
    label: "Page description",
    key: "wear.description",
    fallback:
      "No salon visits. No appointments. No damage to your own hair. A simple routine from the moment she arrives, made to keep her soft for one to three years.",
  },
  {
    section: "Wear & Care",
    label: "Half wig steps",
    key: "wear.half_wig_steps",
    fallback:
      "Slick your hair into a low bun, or cornrow it flat. Leave a small section out at the front to blend if you want that soft, melted-in finish.\nSlip her on. Adjust the inner straps until she sits snug without pressing.\nLock her in with the built-in combs at the crown and nape.\nSmooth your leave-out through with curl custard or styling cream. Finger-fluff where the textures meet.\nLay your edges, spritz a little water to wake the curls, and go.",
  },
  {
    section: "Wear & Care",
    label: "U-part wig steps",
    key: "wear.u_part_steps",
    fallback:
      "Slick your hair back into a low bun, or cornrow it flat. Leave a U-shaped section out along your natural parting.\nPlace her on, pull your own hair through the U opening.\nAdjust the inner straps. She should feel held, not heavy. Secure the combs at the crown and nape.\nBlend your leave-out into the texture with a styling cream until no one can tell where your hair ends and she begins.\nStyle your parting, lay your edges, and go.",
  },
  {
    section: "Wear & Care",
    label: "Cap description",
    key: "wear.cap_description",
    fallback:
      "Every MELANVÉE piece is built on a soft, breathable cap with adjustable inner straps and built-in combs. No tightness, no itching, no pressure on your edges. She sits light enough to forget you have her on, secure enough to live your day in.",
  },
  {
    section: "Wear & Care",
    label: "Install section heading",
    key: "wear.install_heading",
    fallback: "The Install",
  },
  {
    section: "Wear & Care",
    label: "Care section heading",
    key: "wear.care_heading",
    fallback: "The Care",
  },
  {
    section: "Wear & Care",
    label: "Care introduction",
    key: "wear.care_intro",
    fallback:
      "She is 100% premium virgin human hair. Loved right, she wears for one to three years.",
  },
  {
    section: "Wear & Care",
    label: "Care step 1 title",
    key: "wear.care1.title",
    fallback: "Wash gently",
  },
  {
    section: "Wear & Care",
    label: "Care step 1 description",
    key: "wear.care1.description",
    fallback:
      "Every 2 to 3 weeks. Co-wash or use sulfate-free shampoo. Work the product downward, root to tip, never in circles.",
  },
  {
    section: "Wear & Care",
    label: "Care step 2 title",
    key: "wear.care2.title",
    fallback: "Deep condition",
  },
  {
    section: "Wear & Care",
    label: "Care step 2 description",
    key: "wear.care2.description",
    fallback:
      "Every wash. Leave a rich conditioner in for 20 to 30 minutes, rinse cool. Let the coils drink.",
  },
  {
    section: "Wear & Care",
    label: "Care step 3 title",
    key: "wear.care3.title",
    fallback: "Detangle softly",
  },
  {
    section: "Wear & Care",
    label: "Care step 3 description",
    key: "wear.care3.description",
    fallback:
      "Damp, with conditioner in. Fingers first, then a wide-tooth comb, always ends to roots. Never rip through dry.",
  },
  {
    section: "Wear & Care",
    label: "Care step 4 title",
    key: "wear.care4.title",
    fallback: "Air dry",
  },
  {
    section: "Wear & Care",
    label: "Care step 4 description",
    key: "wear.care4.description",
    fallback:
      "Squeeze excess water in a microfibre towel, then air dry on a wig stand. Skip the high heat whenever you can.",
  },
  {
    section: "Wear & Care",
    label: "Care step 5 title",
    key: "wear.care5.title",
    fallback: "Refresh between washes",
  },
  {
    section: "Wear & Care",
    label: "Care step 5 description",
    key: "wear.care5.description",
    fallback:
      "A spritz of water with leave-in conditioner wakes her back up. A little styling cream brings definition back to the curl.",
  },
  {
    section: "Wear & Care",
    label: "Care step 6 title",
    key: "wear.care6.title",
    fallback: "Sleep her right",
  },
  {
    section: "Wear & Care",
    label: "Care step 6 description",
    key: "wear.care6.description",
    fallback:
      "Satin bonnet, silk scarf or satin pillow. Store her on a stand, or tuck her back into her box. She is an investment. Treat her like one.",
  },
  {
    section: "Wear & Care",
    label: "Do list",
    key: "wear.do_list",
    fallback:
      "Sulfate-free, moisture-rich products\nDetangle with fingers or a wide-tooth comb\nAir dry on a wig stand\nSleep satin or silk\nHeat style with a heat protectant",
  },
  {
    section: "Wear & Care",
    label: "Don't list",
    key: "wear.dont_list",
    fallback:
      "Scrub or twist when washing\nBrush through dry coils\nUse hot water on any length\nSleep on cotton with her in\nUse alcohol-heavy products",
  },
  {
    section: "Wear & Care",
    label: "Cap comfort heading",
    key: "wear.cap_heading",
    fallback: "Built to breathe.",
  },
  {
    section: "Wear & Care",
    label: "Cap benefit list",
    key: "wear.cap_benefits",
    fallback:
      "Breathable, no itch\nAdjustable inner straps\nCombs at crown and nape\nGentle on your edges",
  },
  {
    section: "Wear & Care",
    label: "Outro heading",
    key: "wear.outro_heading",
    fallback: "Safe to colour, curl or heat style.",
  },
  {
    section: "Wear & Care",
    label: "Outro description",
    key: "wear.outro_description",
    fallback:
      "100% premium virgin human hair. Treat her with gentle products and a heat protectant. For colour changes, we recommend a professional colourist who knows textured hair.",
  },
  {
    section: "Collaborate",
    label: "Page heading",
    key: "collaborate.heading",
    fallback: "Women supporting women.",
  },
  {
    section: "Collaborate",
    label: "Page eyebrow",
    key: "collaborate.eyebrow",
    fallback: "— Work with us",
  },
  {
    section: "Collaborate",
    label: "Page description",
    key: "collaborate.description",
    fallback:
      "MELANVÉE is built by women, for women—and we want to grow with you. Whether you create content, run a community, or just love the brand—there's a way to work together.",
  },
  {
    section: "Collaborate",
    label: "Creator description",
    key: "collaborate.creator",
    fallback:
      "Wear MELANVÉE in a styled video or photo set. Tag us. We'll send a piece in your texture and length.",
  },
  {
    section: "Collaborate",
    label: "Creator tier title",
    key: "collaborate.creator_title",
    fallback: "Content Creator",
  },
  {
    section: "Collaborate",
    label: "Ambassador description",
    key: "collaborate.ambassador",
    fallback:
      "Long-term partnership. Quarterly drops, your own discount code for your community, and revenue share.",
  },
  {
    section: "Collaborate",
    label: "Ambassador tier title",
    key: "collaborate.ambassador_title",
    fallback: "Ambassador",
  },
  {
    section: "Collaborate",
    label: "Affiliate description",
    key: "collaborate.affiliate",
    fallback: "Share your link, earn on every sale. Open to anyone—beginners welcome.",
  },
  {
    section: "Collaborate",
    label: "Affiliate tier title",
    key: "collaborate.affiliate_title",
    fallback: "Affiliate",
  },
  {
    section: "Collaborate",
    label: "Application eyebrow",
    key: "collaborate.application_eyebrow",
    fallback: "— Apply",
  },
  {
    section: "Collaborate",
    label: "Application heading",
    key: "collaborate.application_heading",
    fallback: "Tell us about you.",
  },
  {
    section: "Collaborate",
    label: "Application introduction",
    key: "collaborate.application_intro",
    fallback: "We read every application. Reply within 5–7 days.",
  },
  {
    section: "Policies",
    label: "Page heading",
    key: "policies.heading",
    fallback: "Our policies.",
  },
  {
    section: "Policies",
    label: "Page eyebrow",
    key: "policies.eyebrow",
    fallback: "— The Fine Print",
  },
  {
    section: "Policies",
    label: "Page description",
    key: "policies.description",
    fallback: "Clear, fair, written without jargon. Questions? WhatsApp us.",
  },
  {
    section: "Policies",
    label: "Shipping tab/title",
    key: "policies.shipping_title",
    fallback: "Shipping",
  },
  {
    section: "Policies",
    label: "Returns tab/title",
    key: "policies.returns_title",
    fallback: "Returns",
  },
  {
    section: "Policies",
    label: "Exchange tab/title",
    key: "policies.exchange_title",
    fallback: "Exchange",
  },
  {
    section: "Policies",
    label: "All policies tab",
    key: "policies.all_title",
    fallback: "All Policies",
  },
  {
    section: "Policies",
    label: "Privacy policy title",
    key: "policies.privacy_title",
    fallback: "Privacy Policy",
  },
  {
    section: "Policies",
    label: "Terms title",
    key: "policies.terms_title",
    fallback: "Terms of Service",
  },
  {
    section: "Policies",
    label: "Shipping policy introduction",
    key: "policies.shipping_intro",
    fallback: "All MELANVÉE orders are dispatched promptly upon processing.",
  },
  {
    section: "Policies",
    label: "Returns policy introduction",
    key: "policies.returns_intro",
    fallback:
      "Because our wigs are intimate beauty products, we follow strict hygiene rules, but we want you to feel safe ordering.",
  },
  {
    section: "Policies",
    label: "Exchange policy introduction",
    key: "policies.exchange_intro",
    fallback: "Wrong texture? Wrong length? We will help you find the right one.",
  },
  {
    section: "Collection",
    label: "Page heading",
    key: "collection.heading",
    fallback: "The collection.",
  },
  {
    section: "Collection",
    label: "Page description",
    key: "collection.description",
    fallback:
      "A growing collection of textures and styles—from tight coils to bouncy kinks, defined curls to blowout textures. Multiple lengths, multiple constructions, all designed to feel like yours.",
  },
  {
    section: "Collection",
    label: "Search placeholder",
    key: "collection.search",
    fallback: "Search products...",
  },
  {
    section: "Collection",
    label: "Empty collection heading",
    key: "collection.empty_heading",
    fallback: "No products found",
  },
  {
    section: "Collection",
    label: "Empty collection description",
    key: "collection.empty_description",
    fallback: "Check back soon—the collection is on its way.",
  },
  {
    section: "Collection",
    label: "No search results heading",
    key: "collection.no_results",
    fallback: "No results found",
  },
  {
    section: "Collection",
    label: "No search results description",
    key: "collection.no_results_description",
    fallback: "Try a different search term.",
  },
] as const;

export type SiteCopyKey = (typeof SITE_COPY_FIELDS)[number]["key"];
export const SITE_COPY_DEFAULTS = Object.fromEntries(
  SITE_COPY_FIELDS.map(({ key, fallback }) => [key, fallback]),
) as Record<SiteCopyKey, string>;

const SiteCopyContext = createContext<Partial<Record<SiteCopyKey, string>>>({});

export function SiteCopyProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Partial<Record<SiteCopyKey, string>>>({});

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const { data, error } = await supabase.from("site_copy").select("key, value");
        if (error) {
          console.error("Unable to load website copy:", error.message);
          return;
        }
        if (active && data) {
          setValues(
            Object.fromEntries(data.map(({ key, value }) => [key, value])) as Partial<
              Record<SiteCopyKey, string>
            >,
          );
        }
      } catch (error: unknown) {
        console.error("Unable to load website copy:", error);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, []);

  return <SiteCopyContext.Provider value={values}>{children}</SiteCopyContext.Provider>;
}

export function useSiteCopy() {
  const values = useContext(SiteCopyContext);
  return (key: SiteCopyKey) => values[key] ?? SITE_COPY_DEFAULTS[key];
}
