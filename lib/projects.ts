export type Media =
  | { kind: "image"; src: string; alt: string; caption?: string }
  // Tall full-page captures: shown in a fixed-height frame you scroll inside.
  | { kind: "page"; src: string; alt: string; caption?: string }
  // A row of phone-width screens.
  | { kind: "phones"; items: { src: string; alt: string }[]; caption?: string }
  // Typographic panel for code work that has no screenshots.
  | { kind: "spec"; caption?: string };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  // Empty cover = render the typographic code tile instead of an image.
  cover: string;
  // A hosted version of the site, shown as a button on the case study.
  live?: { href: string; label: string };
  meta: { label: string; value: string; href?: string }[];
  body: string[];
  media: Media[];
};

const w = (slug: string, file: string) => `/work/${slug}/${file}.webp`;

export const projects: Project[] = [
  {
    slug: "bufete-juridico",
    live: { href: "https://bufetejuridico.biz/en", label: "bufetejuridico.biz" },
    title: "Bufete Jurídico JR",
    summary: "A bilingual website and booking flow for a law firm in La Ceiba, Honduras.",
    tags: ["web design", "next.js", "bilingual", "internship"],
    cover: w("bufete-juridico", "cover"),
    meta: [
      { label: "Context", value: "Internship · IDKWebsites" },
      { label: "Role", value: "Design, front-end" },
      { label: "Stack", value: "Next.js, Tailwind, shared platform widgets" },
    ],
    body: [
      "Bufete Jurídico JR wanted a site that felt calm and trustworthy: deep green, warm copper accents, and a serif that reads well in both English and Spanish.",
      "I worked on the landing page, a service page template and a version of the booking widget, so clients can choose a practice area, an attorney and a time. The live site runs on the IDKWebsites tenant template and stays close to the original design.",
    ],
    media: [
      { kind: "page", src: w("bufete-juridico", "live-full"), alt: "Bufete Jurídico JR live homepage", caption: "Live site, scroll inside the frame" },
      {
        kind: "phones",
        caption: "Live site on a phone",
        items: [
          { src: w("bufete-juridico", "m1"), alt: "Homepage on a phone" },
          { src: w("bufete-juridico", "m2"), alt: "Services on a phone" },
          { src: w("bufete-juridico", "m3"), alt: "About the firm on a phone" },
          { src: w("bufete-juridico", "m4"), alt: "Contact on a phone" },
        ],
      },
      { kind: "image", src: w("bufete-juridico", "booking"), alt: "Consultation booking screen", caption: "Consultation booking, adapted from my booking widget" },
      { kind: "page", src: w("bufete-juridico", "design-full"), alt: "Original landing page design", caption: "Original design" },
      { kind: "page", src: w("bufete-juridico", "service-detail"), alt: "Family law service page design", caption: "Service detail template" },
    ],
  },
  {
    slug: "idkwebsites-platform",
    title: "IDKWebsites Platform",
    summary: "A multi-tenant website and scheduling platform for appointment-based small businesses.",
    tags: ["next.js", "payload cms", "postgres", "internship"],
    cover: "",
    meta: [
      { label: "Context", value: "Internship · IDKWebsites" },
      { label: "Role", value: "Engineering" },
      { label: "Stack", value: "Next.js 15, Payload CMS 3, PostgreSQL, Tailwind" },
      { label: "Repo", value: "multitenant-cms", href: "https://github.com/yimeric7/multitenant-cms" },
    ],
    body: [
      "During my internship I helped on a codebase that runs a website, a booking engine and an admin dashboard for each tenant, such as salons, med spas and consultants. One update reaches every site.",
      "Sites are put together from modular blocks, so each one can look different while owners only edit text and images. The booking widget I designed is part of the shared components that tenant sites like Bufete Jurídico JR use.",
    ],
    media: [
      { kind: "spec", caption: "System at a glance" },
      { kind: "image", src: w("bufete-juridico", "booking"), alt: "Booking widget running in a tenant site", caption: "The shared booking widget, themed for a tenant site" },
    ],
  },
  {
    slug: "mobile-mechanics",
    live: { href: "https://torq-mobile-concept.pages.dev/", label: "torq-mobile-concept.pages.dev" },
    title: "Mobile Mechanics",
    summary: "A website redesign for a 24/7 mobile diesel and heavy-duty truck repair crew in Nebraska.",
    tags: ["web design", "design system", "responsive"],
    cover: w("mobile-mechanics", "cover"),
    meta: [
      { label: "Client", value: "Mobile Mechanics" },
      { label: "Role", value: "Design" },
      { label: "Scope", value: "12 pages, mobile, style guide" },
      { label: "Tools", value: "pen.dev" },
    ],
    body: [
      "The crew comes to the truck, on the roadside or in the yard, day or night. The redesign tries to make that clear right away: one dispatch button, the 90-minute promise, and photos of the trucks they work on.",
      "The design covers the landing page, services, service and city pages, about, contact, FAQ, field notes and legal pages, along with a mobile layout and a small style guide in forest green and copper.",
    ],
    media: [
      { kind: "page", src: w("mobile-mechanics", "landing-full"), alt: "Mobile Mechanics landing page", caption: "Landing page" },
      {
        kind: "phones",
        caption: "Mobile",
        items: [
          { src: w("mobile-mechanics", "m1"), alt: "Mobile landing page" },
          { src: w("mobile-mechanics", "m2"), alt: "Why us section" },
          { src: w("mobile-mechanics", "m3"), alt: "Service area section" },
          { src: w("mobile-mechanics", "m4"), alt: "Lincoln coverage section" },
        ],
      },
      { kind: "page", src: w("mobile-mechanics", "services"), alt: "Mobile Mechanics services page", caption: "Services" },
      { kind: "page", src: w("mobile-mechanics", "about"), alt: "Mobile Mechanics about page", caption: "About" },
      { kind: "image", src: w("mobile-mechanics", "style-guide"), alt: "Mobile Mechanics style guide", caption: "Style guide" },
    ],
  },
  {
    slug: "booking-widget",
    live: { href: "https://booking-widget-demo.pages.dev/", label: "booking-widget-demo.pages.dev" },
    title: "Booking Widget",
    summary: "A simple three-step booking flow that can take on any brand.",
    tags: ["product design", "ui", "component"],
    cover: w("booking-widget", "cover"),
    meta: [
      { label: "Role", value: "Design" },
      { label: "Platforms", value: "Desktop, mobile" },
      { label: "Used in", value: "Bufete Jurídico JR, Petal & Glow, Mitchell & Associates" },
    ],
    body: [
      "Service, then date and time, then details. On desktop the three steps share one tabbed screen with a running summary. On mobile they become three short steps.",
      "It stays quiet on purpose, with neutral greys and one accent, so it can adapt to a client's colors and type without a redesign.",
    ],
    media: [
      { kind: "image", src: w("booking-widget", "desktop"), alt: "Desktop booking widget", caption: "Desktop, one tabbed screen" },
      {
        kind: "phones",
        caption: "Mobile: specialist, services, date & time, details",
        items: [
          { src: w("booking-widget", "m1"), alt: "Step 1: pick a service" },
          { src: w("booking-widget", "m2"), alt: "Step 2: pick services" },
          { src: w("booking-widget", "m3"), alt: "Step 2: pick a date and time" },
          { src: w("booking-widget", "m4"), alt: "Step 3: enter details" },
        ],
      },
    ],
  },
  {
    slug: "encomiendas",
    live: { href: "https://www.encomiendaslatina.com/", label: "encomiendaslatina.com" },
    title: "Encomiendas America Latina",
    summary: "A Spanish-first website for a Lincoln, Nebraska parcel shipper serving families across Latin America.",
    tags: ["web design", "bilingual", "live"],
    cover: w("encomiendas", "cover"),
    meta: [
      { label: "Client", value: "Encomiendas America Latina" },
      { label: "Role", value: "Design" },
    ],
    body: [
      "“Envía con confianza.” The site is made for people sending boxes home: destinations, tracking and drop-off booking near the top, a language switch in the corner, and a WhatsApp button always close by.",
    ],
    media: [
      { kind: "page", src: w("encomiendas", "live-full"), alt: "Encomiendas America Latina homepage", caption: "Live site, scroll inside the frame" },
      {
        kind: "phones",
        caption: "Live site on a phone",
        items: [
          { src: w("encomiendas", "m1"), alt: "Homepage on a phone" },
          { src: w("encomiendas", "m2"), alt: "How it works on a phone" },
          { src: w("encomiendas", "m3"), alt: "Destinations on a phone" },
        ],
      },
    ],
  },
  {
    slug: "roundtrip",
    title: "Roundtrip",
    summary: "A landing page for a service that turns a coffee shop's guest Wi-Fi into a list of regulars.",
    tags: ["landing page", "web design", "front-end"],
    cover: w("roundtrip", "cover"),
    live: { href: "https://roundtrip-landing.pages.dev/", label: "roundtrip-landing.pages.dev" },
    meta: [
      { label: "Type", value: "Concept" },
      { label: "Role", value: "Design, front-end" },
      { label: "Stack", value: "HTML, CSS, JavaScript, Vite" },
      { label: "Repo", value: "coffeeshopidea", href: "https://github.com/Keyik17/coffeeshopidea" },
    ],
    body: [
      "Roundtrip is an idea for neighborhood cafés: guests sign in to the Wi-Fi with a phone number, and the shop can send a few well-timed offers a month to bring them back.",
      "I designed and coded the landing page with a warm, editorial feel: big type over real café photos, a short four-step explanation, example shops, an animated sample dashboard, simple pricing and a FAQ.",
    ],
    media: [
      { kind: "page", src: w("roundtrip", "landing-full"), alt: "Roundtrip landing page", caption: "Landing page, scroll inside the frame" },
      {
        kind: "phones",
        caption: "Mobile",
        items: [
          { src: w("roundtrip", "m1"), alt: "Mobile hero" },
          { src: w("roundtrip", "m2"), alt: "What it does" },
          { src: w("roundtrip", "m3"), alt: "Fill your slow days" },
          { src: w("roundtrip", "m4"), alt: "Live dashboard" },
        ],
      },
    ],
  },
  {
    slug: "petal-glow",
    live: { href: "https://petal-glow-concept.pages.dev/", label: "petal-glow-concept.pages.dev" },
    title: "Petal & Glow",
    summary: "A playful med spa landing page concept with gingham, florals and a collage layout.",
    tags: ["landing page", "art direction", "playful"],
    cover: w("petal-glow", "cover"),
    meta: [
      { label: "Type", value: "Concept" },
      { label: "Role", value: "Design, art direction" },
      { label: "Scope", value: "Landing page, mobile, style guide" },
    ],
    body: [
      "Most med spa sites look like clinics, so this concept tries something softer: a big BLOOM headline over close-up skin, pink gingham, cut-out flowers, and a collage section that reads like a mood board.",
    ],
    media: [
      { kind: "page", src: w("petal-glow", "landing-full"), alt: "Petal & Glow landing page", caption: "Landing page" },
      {
        kind: "phones",
        caption: "Mobile",
        items: [
          { src: w("petal-glow", "m1"), alt: "Mobile landing page" },
          { src: w("petal-glow", "m2"), alt: "Signature treatments" },
          { src: w("petal-glow", "m3"), alt: "Gallery" },
          { src: w("petal-glow", "m4"), alt: "Booking form" },
        ],
      },
      { kind: "image", src: w("petal-glow", "style-guide"), alt: "Petal & Glow style guide", caption: "Style guide" },
    ],
  },
  {
    slug: "section-library",
    title: "Website Section Library",
    summary: "Mix-and-match website sections for a website builder app.",
    tags: ["design system", "components", "responsive"],
    cover: w("idkw-platform", "cover"),
    meta: [
      { label: "Role", value: "Design" },
      { label: "Scope", value: "Heroes, about, services, social, calls to action, mobile" },
    ],
    body: [
      "A set of section designs (heroes, about, services, social and calls to action) meant to be combined in different orders and still feel like one site, on desktop and on phones.",
    ],
    media: [
      { kind: "image", src: w("idkw-platform", "heroes"), alt: "Hero section variants", caption: "Hero sections" },
      { kind: "image", src: w("idkw-platform", "about"), alt: "About section variants", caption: "About sections" },
      { kind: "image", src: w("idkw-platform", "services"), alt: "Services section variants", caption: "Services sections" },
      { kind: "image", src: w("idkw-platform", "social"), alt: "Social and community section variants", caption: "Social sections" },
      { kind: "image", src: w("idkw-platform", "cta"), alt: "Call to action section variants", caption: "Calls to action" },
      { kind: "image", src: w("idkw-platform", "mobile"), alt: "About sections on mobile", caption: "Mobile versions" },
    ],
  },
  {
    slug: "mitchell",
    live: { href: "https://mitchell-concept.pages.dev/", label: "mitchell-concept.pages.dev" },
    title: "Mitchell & Associates",
    summary: "A minimal, editorial website concept for a law firm.",
    tags: ["web design", "design system", "editorial"],
    cover: w("mitchell", "cover"),
    meta: [
      { label: "Type", value: "Concept" },
      { label: "Role", value: "Design" },
      { label: "Scope", value: "Reusable blocks, 5 pages, mobile, style guide" },
    ],
    body: [
      "Black and white, one photograph per screen, and large, thin type. Each section (header, services, about, testimonials, FAQ, call to action, footer) is a reusable block, so new pages can be put together from the same parts.",
    ],
    media: [
      { kind: "page", src: w("mitchell", "blocks-full"), alt: "Mitchell & Associates blocks", caption: "Website blocks" },
      {
        kind: "phones",
        caption: "Mobile",
        items: [
          { src: w("mitchell", "m1"), alt: "Mobile homepage" },
          { src: w("mitchell", "m2"), alt: "About page" },
          { src: w("mitchell", "m3"), alt: "Results page" },
          { src: w("mitchell", "m4"), alt: "Contact page" },
        ],
      },
      { kind: "page", src: w("mitchell", "about"), alt: "About and team page", caption: "About / Team" },
      { kind: "image", src: w("mitchell", "style-guide"), alt: "Style guide", caption: "Style guide" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

// Old addresses that still work and point to the new ones.
export const movedProjects: Record<string, string> = { moku: "mobile-mechanics" };

export const platformSpec = {
  stats: [
    { value: "70+", label: "block variations" },
    { value: "50+", label: "API endpoints" },
    { value: "21", label: "animation themes" },
    { value: "12", label: "CMS collections" },
  ],
  stack: [
    ["Framework", "Next.js 15 (App Router)"],
    ["CMS", "Payload CMS 3"],
    ["Database", "PostgreSQL · Supabase"],
    ["Email", "Resend, per-tenant domains"],
    ["Auth", "Payload JWT + Google OAuth"],
    ["UI", "Tailwind, Radix, Framer Motion"],
    ["Testing", "Vitest, Playwright"],
    ["Hosting", "Vercel"],
  ],
};
