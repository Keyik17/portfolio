export type NewsItem = {
  title: string;
  image: string;
  when: string;
  text: string;
  // First link is the main article; the card image opens it.
  links: [string, string][];
};

// Local events and write-ups, newest first.
export const news: NewsItem[] = [
  {
    title: "1st place, Omaha Startup Weekend",
    image: "/news/cleanos.webp",
    when: "Jun 2026 · Omaha",
    text: "A team of five built CleanOS in 48 hours, a tool that helps local cleaning businesses with invoices, scheduling and other back-office work.",
    links: [
      ["UNeTech", "https://www.unetech.org/2026/06/10/omaha-startup-weekend-how-to-build-a-business-in-48-hours/"],
      ["Silicon Prairie News", "https://siliconprairienews.com/2026/06/startup-weekend-pitch-competition-winner-cleanos-to-launch-a-real-startup-helping-cleaning-businesses-with-ai/"],
    ],
  },
  {
    title: "Wild card winner, JumpStart Challenge",
    image: "/news/jumpstart.webp",
    when: "Oct 2025 · Lincoln",
    text: "Pitched FarmKore with two teammates at Silicon Prairie Startup Week, an always-open online expo where farmers can explore new equipment.",
    links: [
      ["Silicon Prairie News", "https://siliconprairienews.com/2025/10/jumpstart-challenge-winners-announced-at-silicon-prairie-startup-week-in-lincoln/"],
    ],
  },
  {
    title: "Co-speaker, 1 Million Cups Lincoln",
    image: "/news/onemc.webp",
    when: "Feb 2025 · Lincoln",
    text: "Presented AHXE Labs with teammates, on helping service businesses grow without the complexity.",
    links: [
      ["LinkedIn", "https://www.linkedin.com/posts/lincoln-were-back-with-ahxe-labs-join-share-7298214063791058944-nRWo/"],
      ["Instagram", "https://www.instagram.com/p/DGHs0IRIJg5/"],
    ],
  },
  {
    title: "1st place, 10-Hour Challenge hackathon",
    image: "/news/elementra.webp",
    when: "Nov 2024 · Omaha",
    text: "A team of four built Elementra in ten hours, a tool that helps teachers keep track of grades, attendance and behavior. First out of 12 teams.",
    links: [
      ["Write-up", "https://contra.com/p/UsYgqmMk-we-built-a-product-for-teachers-in-10-hrs-and-it-got-first-place"],
      ["Pitch site", "https://contra.com/p/P3Mkqgsr-elementra-or-web-pitch-deck-built-in-framer"],
    ],
  },
];
