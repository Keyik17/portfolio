import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

const experience = [
  ["IDKWebsites, internship", "Platform code, tenant sites, booking widget"],
  ["Senior design capstone", "Nebraska Strategic Ag Coalition platform"],
];

// Local events and write-ups, newest first.
const news = [
  {
    title: "1st place, Omaha Startup Weekend",
    when: "Jun 2026 · Omaha",
    text: "A team of five built CleanOS in 48 hours, a tool that helps local cleaning businesses with invoices, scheduling and other back-office work.",
    links: [
      ["Silicon Prairie News", "https://siliconprairienews.com/2026/06/startup-weekend-pitch-competition-winner-cleanos-to-launch-a-real-startup-helping-cleaning-businesses-with-ai/"],
      ["UNeTech", "https://www.unetech.org/2026/06/10/omaha-startup-weekend-how-to-build-a-business-in-48-hours/"],
    ],
  },
  {
    title: "Wild card winner, JumpStart Challenge",
    when: "Oct 2025 · Lincoln",
    text: "Pitched FarmKore with two teammates at Silicon Prairie Startup Week, an always-open online expo where farmers can explore new equipment.",
    links: [
      ["Silicon Prairie News", "https://siliconprairienews.com/2025/10/jumpstart-challenge-winners-announced-at-silicon-prairie-startup-week-in-lincoln/"],
    ],
  },
  {
    title: "Co-speaker, 1 Million Cups Lincoln",
    when: "Feb 2025 · Lincoln",
    text: "Presented AHXE Labs with teammates, on helping service businesses grow without the complexity.",
    links: [
      ["Instagram", "https://www.instagram.com/p/DGHs0IRIJg5/"],
      ["LinkedIn", "https://www.linkedin.com/posts/lincoln-were-back-with-ahxe-labs-join-share-7298214063791058944-nRWo/"],
    ],
  },
  {
    title: "1st place, 10-Hour Challenge hackathon",
    when: "Nov 2024 · Omaha",
    text: "A team of four built Elementra in ten hours, a tool that helps teachers keep track of grades, attendance and behavior. First out of 12 teams.",
    links: [
      ["Pitch site", "https://contra.com/p/P3Mkqgsr-elementra-or-web-pitch-deck-built-in-framer"],
      ["Write-up", "https://contra.com/p/UsYgqmMk-we-built-a-product-for-teachers-in-10-hrs-and-it-got-first-place"],
    ],
  },
];

const tools = [
  ["Design", "pen.dev, Figma"],
  ["Build", "Next.js, React, TypeScript, Tailwind"],
  ["Platform", "Payload CMS, PostgreSQL, Supabase, Convex"],
  ["Ship", "Vercel, Cloudflare Workers, GitHub Actions"],
];

export default function About() {
  return (
    <div className="about fade">
      <p>
        {site.name}, {site.role.toLowerCase()}.
      </p>
      <p>
        I enjoy simple, clear interfaces.
      </p>
      <p>
        I work on both the front end and the back end. So far that has meant websites for small businesses and building
        B2B SaaS products, from the database and APIs to the screens people use. As a person, I like to think I am funny,
        easy going and quick to learn new things.
      </p>

      <h2>Experience</h2>
      <ul>
        {experience.map(([a, b]) => (
          <li key={a}>
            <span>{a}</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <h2>News</h2>
      <ul className="news">
        {news.map((n) => (
          <li key={n.title}>
            <div className="news-head">
              <span>{n.title}</span>
              <span>{n.when}</span>
            </div>
            <p>{n.text}</p>
            <div className="news-links">
              {n.links.map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noreferrer">
                  {label} <i aria-hidden>↗</i>
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <h2>Tools</h2>
      <ul>
        {tools.map(([a, b]) => (
          <li key={a}>
            <span>{a}</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

    </div>
  );
}
