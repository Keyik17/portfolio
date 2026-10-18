// Local events, wins and talks, newest first. Each one gets a page at /news/<slug>/.
export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  when: string;
  // Shown on the right in the list.
  tag: string;
  cover: string;
  meta: { label: string; value: string }[];
  body: string[];
  images: { src: string; alt: string; caption: string }[];
  links: [string, string][];
};

const team = "Eric Yim, Brian Alvarado, Keyik Annagulyyeva";

export const news: NewsItem[] = [
  {
    slug: "cleanos",
    title: "1st place, Omaha Startup Weekend",
    summary: "CleanOS, built in 48 hours with a team of five.",
    when: "June 2026",
    tag: "Jun 2026 · Omaha",
    cover: "/news/cleanos/team.webp",
    meta: [
      { label: "Event", value: "Omaha Startup Weekend, by Open Range and Techstars" },
      { label: "Result", value: "1st place out of 7 teams" },
      { label: "When", value: "June 5 to 7, 2026" },
      { label: "Where", value: "Catalyst, Omaha" },
      { label: "Team", value: `${team}, Wyatt Riesz, Sarah Vail` },
    ],
    body: [
      "Startup Weekend came back to Nebraska for the first time in about a decade. Around 60 people pitched ideas on Friday night, voted on their favorites and formed seven teams.",
      "Our team built CleanOS, an AI-assisted tool that helps local cleaning businesses with invoices, calendars and other back-office work. It took first place, and the team plans to keep building it.",
    ],
    images: [
      { src: "/news/cleanos/team.webp", alt: "The CleanOS team holding the winning certificate", caption: "The CleanOS team. Photo: Silicon Prairie News" },
      { src: "/news/cleanos/pitch.webp", alt: "Judges asking questions during the pitch competition", caption: "Questions from the judges. Photo: Silicon Prairie News" },
      { src: "/news/cleanos/group.webp", alt: "Startup Weekend participants on stage", caption: "Everyone after the final pitches. Photo: Silicon Prairie News" },
    ],
    links: [
      ["Silicon Prairie News", "https://siliconprairienews.com/2026/06/startup-weekend-pitch-competition-winner-cleanos-to-launch-a-real-startup-helping-cleaning-businesses-with-ai/"],
      ["UNeTech", "https://www.unetech.org/2026/06/10/omaha-startup-weekend-how-to-build-a-business-in-48-hours/"],
    ],
  },
  {
    slug: "farmkore",
    title: "Wild card winner, JumpStart Challenge",
    summary: "FarmKore, which also placed 3rd at the Ten Hour Challenge.",
    when: "October 2025",
    tag: "Oct 2025 · Lincoln",
    cover: "/news/farmkore/ten-hour.webp",
    meta: [
      { label: "Event", value: "Ten Hour Challenge x JumpStart Challenge, Silicon Prairie Startup Week" },
      { label: "Result", value: "3rd place, then the JumpStart wild card prize" },
      { label: "When", value: "September to October 2025" },
      { label: "Where", value: "Don't Panic Labs and The Mill, Lincoln" },
      { label: "Team", value: team },
    ],
    body: [
      "The Ten Hour Challenge asks teams to take on real problems from Nebraska companies in a single day. FarmKore placed third there, then went on to the JumpStart Challenge: a week of prototyping that ended with pitches to judges.",
      "FarmKore is an always-open online expo where farmers can explore new equipment and manufacturers can show what is new. It was named the JumpStart wild card winner, one of three teams sharing the prize pool.",
    ],
    images: [
      { src: "/news/farmkore/ten-hour.webp", alt: "The emcee opening the Ten Hour Challenge", caption: "Kicking off the Ten Hour Challenge. Photo: Silicon Prairie News" },
      { src: "/news/farmkore/jumpstart.webp", alt: "A team pitching to the JumpStart judges", caption: "JumpStart pitches at The Mill. Photo: Silicon Prairie News" },
    ],
    links: [
      ["Silicon Prairie News, JumpStart", "https://siliconprairienews.com/2025/10/jumpstart-challenge-winners-announced-at-silicon-prairie-startup-week-in-lincoln/"],
      ["Silicon Prairie News, Ten Hour", "https://siliconprairienews.com/2025/10/three-teams-win-at-combined-ten-hour-challenge-x-jumpstart-challenge/"],
    ],
  },
  {
    slug: "1-million-cups",
    title: "Co-speaker, 1 Million Cups Lincoln",
    summary: "Talking about AHXE Labs with Eric and Brian.",
    when: "February 2025",
    tag: "Feb 2025 · Lincoln",
    cover: "/news/onemc.webp",
    meta: [
      { label: "Event", value: "1 Million Cups Lincoln" },
      { label: "Role", value: "Co-speaker" },
      { label: "When", value: "February 2025" },
      { label: "Where", value: "Fuse Coworking, Lincoln" },
      { label: "With", value: "Eric Yim, Brian Alvarado" },
    ],
    body: [
      "1 Million Cups is a weekly morning event where local founders share what they are working on and the audience asks questions.",
      "The talk was about AHXE Labs, which helps service-based businesses grow without the complexity, and how the team builds around its customers.",
    ],
    images: [{ src: "/news/onemc.webp", alt: "1 Million Cups Lincoln event graphic", caption: "The event post. Image: 1 Million Cups Lincoln" }],
    links: [
      ["LinkedIn", "https://www.linkedin.com/posts/lincoln-were-back-with-ahxe-labs-join-share-7298214063791058944-nRWo/"],
      ["Instagram", "https://www.instagram.com/p/DGHs0IRIJg5/"],
    ],
  },
  {
    slug: "elementra",
    title: "1st place, 10-Hour Challenge hackathon",
    summary: "Elementra, built in ten hours with a team of four.",
    when: "November 2024",
    tag: "Nov 2024 · Omaha",
    cover: "/news/elementra/team.webp",
    meta: [
      { label: "Event", value: "10-Hour Challenge, hosted by NMotion" },
      { label: "Result", value: "1st place out of 12 teams" },
      { label: "When", value: "November 2024" },
      { label: "Where", value: "Omaha" },
      { label: "Team", value: `Brook Slagle, ${team}` },
    ],
    body: [
      "The theme was AI, and every team had ten hours to go from an idea to a pitch.",
      "Elementra is a student relationship tool for teachers: a dashboard for grades, attendance and behavior, student profiles and an AI assistant for grading, lesson plans and emails. The team made the brand, a Framer landing page and product mockups.",
    ],
    images: [
      { src: "/news/elementra/team.webp", alt: "The Elementra team smiling at the event", caption: "The team. Image: Brook Slagle on Contra" },
      { src: "/news/elementra/first.webp", alt: "Results screen showing Elementra in first place", caption: "Results. Image: Brook Slagle on Contra" },
      { src: "/news/elementra/dashboard.webp", alt: "Elementra teacher dashboard mockup", caption: "Teacher dashboard mockup" },
    ],
    links: [
      ["Write-up", "https://contra.com/p/UsYgqmMk-we-built-a-product-for-teachers-in-10-hrs-and-it-got-first-place"],
      ["Pitch site", "https://contra.com/p/P3Mkqgsr-elementra-or-web-pitch-deck-built-in-framer"],
    ],
  },
];

export const getNews = (slug: string) => news.find((n) => n.slug === slug);
